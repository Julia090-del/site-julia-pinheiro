'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/biblioteca/login');
}

export async function toggleFavoriteAction(guideId: string, shouldFavorite: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Não autenticado.' };

  if (shouldFavorite) {
    const { error } = await supabase
      .from('favorites')
      .upsert({ patient_id: user.id, guide_id: guideId }, { onConflict: 'patient_id,guide_id' });
    if (error) return { error: error.message };
  } else {
    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('patient_id', user.id)
      .eq('guide_id', guideId);
    if (error) return { error: error.message };
  }

  revalidatePath('/biblioteca');
  return { ok: true };
}

export async function recordGuideViewAction(guideId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from('guide_views')
    .upsert(
      { patient_id: user.id, guide_id: guideId, viewed_at: new Date().toISOString() },
      { onConflict: 'patient_id,guide_id' }
    );
}

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Não autenticado.');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') throw new Error('Acesso restrito à administradora.');
}

export async function createPatient(formData: FormData) {
  await requireAdmin();

  const fullName = String(formData.get('full_name') || '').trim();
  const email = String(formData.get('email') || '').trim();

  if (!fullName || !email) {
    return { error: 'Preencha nome e e-mail.' };
  }

  const tempPassword = Math.random().toString(36).slice(-6) + Math.random().toString(36).slice(-6);

  const admin = createAdminClient();
  const { error } = await admin.auth.admin.createUser({
    email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: { full_name: fullName },
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/biblioteca/admin/pacientes');
  return { success: true, email, tempPassword };
}
