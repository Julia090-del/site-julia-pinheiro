'use server';

import { createClient } from '@/lib/supabase/server';
import { analyzeMeal, recalculateSingleItem } from '@/lib/analise/anthropic';
import type { AnalysisResult, AnalyzedItem, ManualItemInput } from '@/lib/analise/types';

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Não autenticado.');
}

export async function analyzeMealAction(formData: FormData): Promise<
  { ok: true; data: AnalysisResult } | { ok: false; error: string }
> {
  try {
    await requireUser();

    const manualItemsRaw = formData.get('manualItems');
    const manualItems: ManualItemInput[] = manualItemsRaw ? JSON.parse(String(manualItemsRaw)) : [];

    const file = formData.get('photo');
    let imageBase64: string | undefined;
    let imageMediaType: string | undefined;

    if (file instanceof File && file.size > 0) {
      if (file.size > 8 * 1024 * 1024) {
        return { ok: false, error: 'A foto é muito grande (máximo 8 MB). Tente uma foto menor.' };
      }
      const buffer = await file.arrayBuffer();
      imageBase64 = Buffer.from(buffer).toString('base64');
      imageMediaType = file.type || 'image/jpeg';
    }

    if (!imageBase64 && manualItems.length === 0) {
      return { ok: false, error: 'Envie uma foto ou informe pelo menos um alimento.' };
    }

    const data = await analyzeMeal({ imageBase64, imageMediaType, manualItems });
    return { ok: true, data };
  } catch (e) {
    console.error('analyzeMealAction error', e);
    return { ok: false, error: 'Não foi possível analisar a refeição agora. Tente novamente em instantes.' };
  }
}

export async function recalculateItemAction(input: {
  name: string;
  state?: string;
  grams: number;
}): Promise<{ ok: true; item: AnalyzedItem } | { ok: false; error: string }> {
  try {
    await requireUser();
    if (!input.name.trim() || !input.grams || input.grams <= 0) {
      return { ok: false, error: 'Informe o nome do alimento e um peso válido.' };
    }
    const item = await recalculateSingleItem(input);
    return { ok: true, item };
  } catch (e) {
    console.error('recalculateItemAction error', e);
    return { ok: false, error: 'Não foi possível calcular esse item agora.' };
  }
}
