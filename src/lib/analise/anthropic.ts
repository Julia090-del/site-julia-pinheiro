import Anthropic from '@anthropic-ai/sdk';
import type { AnalysisResult, AnalyzedItem, ManualItemInput } from './types';

const MODEL = 'claude-haiku-4-5';

function getClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY não está configurada.');
  }
  return new Anthropic({ apiKey });
}

const SYSTEM_PROMPT = `Você é um assistente nutricional que estima a composição de refeições a partir de fotos e/ou pesos informados pelo paciente. Você NÃO substitui avaliação profissional — é uma ferramenta educativa de estimativa.

Regras:
- Identifique os alimentos visíveis na foto apenas quando houver evidência suficiente. Se não tiver certeza, diga isso em vez de inventar.
- Para cada alimento, estime o peso em gramas considerando: tamanho aparente da porção, utensílios e prato/recipiente na imagem, proporção entre os alimentos e características do próprio alimento. Deixe claro que é uma estimativa visual, nunca uma medição exata.
- Quando o paciente já informou o peso de um alimento (gramsSource: "informado"), use EXATAMENTE esse peso para os cálculos — não estime pela imagem nesse caso.
- Considere o estado de preparo do alimento (cru, cozido, grelhado, assado, frito etc.) — os valores nutricionais mudam bastante entre eles. Nunca converta genericamente peso cru para cozido.
- Use como referência valores de composição de alimentos de bases confiáveis (ex.: TACO para alimentos brasileiros, USDA FoodData Central em geral).
- Para preparações compostas (ex.: omelete com queijo e tomate), tente identificar os principais componentes visíveis em vez de tratar como um único item genérico, mas não invente ingredientes que não possam ser identificados (óleo usado, molhos escondidos, recheios etc.) — mencione essa limitação em "uncertainNotes" quando relevante.
- Indique um nível de confiança ("alta", "media" ou "baixa") separadamente para a identificação do alimento e para a estimativa de peso.
- Responda APENAS com um JSON válido, sem nenhum texto antes ou depois, seguindo exatamente este formato:

{
  "items": [
    {
      "name": "string, nome do alimento em português",
      "state": "string opcional, ex: cozido, grelhado, cru",
      "estimatedGrams": number,
      "gramsSource": "foto" | "informado",
      "confidenceIdentification": "alta" | "media" | "baixa",
      "confidenceWeight": "alta" | "media" | "baixa",
      "kcal": number,
      "proteinG": number,
      "carbsG": number,
      "fatG": number,
      "notes": "string opcional, só se houver algo relevante a destacar sobre esse item"
    }
  ],
  "uncertainNotes": ["string, limitações gerais da análise, ex: itens não identificados, molhos/óleo não visíveis"]
}

Não inclua totais — eles são somados automaticamente a partir dos itens. Todos os números devem ser números (não strings), arredondados de forma razoável.`;

function buildUserText(manualItems: ManualItemInput[], hasImage: boolean): string {
  const parts: string[] = [];

  if (hasImage) {
    parts.push('Analise a foto da refeição anexada.');
  }

  if (manualItems.length > 0) {
    const list = manualItems.map((i) => `- ${i.name}: ${i.grams} g`).join('\n');
    parts.push(
      `O paciente informou manualmente o peso destes alimentos (use gramsSource "informado" e esse peso exato para eles, não estime pela imagem):\n${list}`
    );
  }

  if (!hasImage && manualItems.length === 0) {
    parts.push('Nenhuma foto ou item foi enviado.');
  }

  return parts.join('\n\n');
}

function parseJsonResponse(text: string): { items: Omit<AnalyzedItem, 'id'>[]; uncertainNotes: string[] } {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('A resposta da IA não veio em formato reconhecível.');
  const parsed = JSON.parse(match[0]);
  if (!Array.isArray(parsed.items)) throw new Error('Resposta da IA sem lista de itens.');
  return {
    items: parsed.items,
    uncertainNotes: Array.isArray(parsed.uncertainNotes) ? parsed.uncertainNotes : [],
  };
}

function withIds(items: Omit<AnalyzedItem, 'id'>[]): AnalyzedItem[] {
  return items.map((item, i) => ({ ...item, id: `${Date.now()}-${i}` }));
}

function computeTotals(items: AnalyzedItem[]) {
  return items.reduce(
    (acc, item) => ({
      kcal: acc.kcal + (item.kcal || 0),
      proteinG: acc.proteinG + (item.proteinG || 0),
      carbsG: acc.carbsG + (item.carbsG || 0),
      fatG: acc.fatG + (item.fatG || 0),
    }),
    { kcal: 0, proteinG: 0, carbsG: 0, fatG: 0 }
  );
}

const DISCLAIMER =
  'Os valores apresentados são estimativas baseadas na imagem e/ou nos pesos informados, e podem variar conforme a quantidade real, o preparo e os ingredientes utilizados. Esta ferramenta é educativa e não substitui uma avaliação nutricional profissional.';

export async function analyzeMeal(params: {
  imageBase64?: string;
  imageMediaType?: string;
  manualItems: ManualItemInput[];
}): Promise<AnalysisResult> {
  const client = getClient();
  const hasImage = !!params.imageBase64;

  const content: Anthropic.MessageParam['content'] = [];
  if (params.imageBase64 && params.imageMediaType) {
    content.push({
      type: 'image',
      source: {
        type: 'base64',
        media_type: params.imageMediaType as 'image/jpeg' | 'image/png' | 'image/webp',
        data: params.imageBase64,
      },
    });
  }
  content.push({ type: 'text', text: buildUserText(params.manualItems, hasImage) });

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content }],
  });

  const textBlock = message.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') throw new Error('A IA não retornou uma resposta de texto.');

  const { items: rawItems, uncertainNotes } = parseJsonResponse(textBlock.text);
  const items = withIds(rawItems);
  const totals = computeTotals(items);

  return { items, totals, uncertainNotes, disclaimer: DISCLAIMER };
}

export async function recalculateSingleItem(input: {
  name: string;
  state?: string;
  grams: number;
}): Promise<AnalyzedItem> {
  const client = getClient();

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 512,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `O paciente corrigiu ou adicionou manualmente este item (sem foto): "${input.name}"${
          input.state ? `, estado: ${input.state}` : ''
        }, peso: ${input.grams} g. Calcule os valores nutricionais só para esse item, com gramsSource "informado" e confidenceWeight "alta" (peso foi informado pelo paciente, não estimado).`,
      },
    ],
  });

  const textBlock = message.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') throw new Error('A IA não retornou uma resposta de texto.');

  const { items } = parseJsonResponse(textBlock.text);
  if (!items[0]) throw new Error('A IA não retornou o item recalculado.');
  return withIds([items[0]])[0];
}
