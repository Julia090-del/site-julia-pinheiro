'use server';

import { createClient } from '@/lib/supabase/server';
import { analyzeMeal, recalculateSingleItem } from '@/lib/analise/anthropic';
import type { AnalysisResult, AnalyzedItem, ManualItemInput } from '@/lib/analise/types';

type UsageKind = 'analysis_photo' | 'analysis_manual' | 'correction';

const WEEKLY_LIMITS: Record<UsageKind, number> = {
  analysis_photo: 10,
  analysis_manual: 30,
  correction: 30,
};

const LIMIT_MESSAGES: Record<UsageKind, string> = {
  analysis_photo: `Você já usou suas ${WEEKLY_LIMITS.analysis_photo} análises por foto desta semana. O limite renova conforme os dias passam — tente novamente em breve.`,
  analysis_manual: `Você já usou suas ${WEEKLY_LIMITS.analysis_manual} análises por gramas informadas desta semana. O limite renova conforme os dias passam — tente novamente em breve.`,
  correction: `Você já usou o limite de correções/adições desta semana. Tente novamente em breve.`,
};

async function requireUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Não autenticado.');

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

  return { supabase, userId: user.id, isAdmin: profile?.role === 'admin' };
}

async function checkAndRecordUsage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  isAdmin: boolean,
  kind: UsageKind
): Promise<{ allowed: true } | { allowed: false; error: string }> {
  if (isAdmin) return { allowed: true };

  const limit = WEEKLY_LIMITS[kind];
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { count, error: countError } = await supabase
    .from('meal_analysis_usage')
    .select('*', { count: 'exact', head: true })
    .eq('patient_id', userId)
    .eq('kind', kind)
    .gte('created_at', sevenDaysAgo);

  if (countError) throw countError;

  if ((count ?? 0) >= limit) {
    return { allowed: false, error: LIMIT_MESSAGES[kind] };
  }

  const { error: insertError } = await supabase
    .from('meal_analysis_usage')
    .insert({ patient_id: userId, kind });
  if (insertError) throw insertError;

  return { allowed: true };
}

export type UsageStatus = {
  isAdmin: boolean;
  analysisPhoto: { used: number; limit: number };
  analysisManual: { used: number; limit: number };
  correction: { used: number; limit: number };
};

export async function getUsageStatusAction(): Promise<UsageStatus> {
  const { supabase, userId, isAdmin } = await requireUser();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  async function countFor(kind: UsageKind) {
    if (isAdmin) return 0;
    const { count, error } = await supabase
      .from('meal_analysis_usage')
      .select('*', { count: 'exact', head: true })
      .eq('patient_id', userId)
      .eq('kind', kind)
      .gte('created_at', sevenDaysAgo);
    if (error) throw error;
    return count ?? 0;
  }

  const [photo, manual, correction] = await Promise.all([
    countFor('analysis_photo'),
    countFor('analysis_manual'),
    countFor('correction'),
  ]);

  return {
    isAdmin,
    analysisPhoto: { used: photo, limit: WEEKLY_LIMITS.analysis_photo },
    analysisManual: { used: manual, limit: WEEKLY_LIMITS.analysis_manual },
    correction: { used: correction, limit: WEEKLY_LIMITS.correction },
  };
}

export async function analyzeMealAction(formData: FormData): Promise<
  { ok: true; data: AnalysisResult } | { ok: false; error: string }
> {
  try {
    const { supabase, userId, isAdmin } = await requireUser();

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

    const usageKind: UsageKind = imageBase64 ? 'analysis_photo' : 'analysis_manual';
    const usage = await checkAndRecordUsage(supabase, userId, isAdmin, usageKind);
    if (!usage.allowed) {
      return { ok: false, error: usage.error };
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
    const { supabase, userId, isAdmin } = await requireUser();
    if (!input.name.trim() || !input.grams || input.grams <= 0) {
      return { ok: false, error: 'Informe o nome do alimento e um peso válido.' };
    }

    const usage = await checkAndRecordUsage(supabase, userId, isAdmin, 'correction');
    if (!usage.allowed) {
      return { ok: false, error: usage.error };
    }

    const item = await recalculateSingleItem(input);
    return { ok: true, item };
  } catch (e) {
    console.error('recalculateItemAction error', e);
    return { ok: false, error: 'Não foi possível calcular esse item agora.' };
  }
}
