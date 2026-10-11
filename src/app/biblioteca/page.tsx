import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/server';
import BibliotecaHome from '@/components/biblioteca/BibliotecaHome';

export default async function BibliotecaHomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [{ data: profile }, { data: categories }, { data: guides }, { data: favorites }, { data: views }] =
    await Promise.all([
      supabase.from('profiles').select('full_name').eq('id', user.id).single(),
      supabase.from('categories').select('slug, name, icon').order('sort_order', { ascending: true }),
      supabase
        .from('guides')
        .select('id, slug, title, subtitle, image, category_slug, read_minutes, is_new, is_featured, updated_at')
        .order('sort_order', { ascending: true }),
      supabase.from('favorites').select('guide_id').eq('patient_id', user.id),
      supabase
        .from('guide_views')
        .select('guide_id, viewed_at')
        .eq('patient_id', user.id)
        .order('viewed_at', { ascending: false })
        .limit(6),
    ]);

  const guideById = new Map((guides ?? []).map((g) => [g.id, g]));
  const recentGuides = (views ?? [])
    .map((v) => guideById.get(v.guide_id))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <Suspense fallback={null}>
      <BibliotecaHome
        firstName={profile?.full_name?.split(' ')[0] ?? ''}
        categories={categories ?? []}
        guides={guides ?? []}
        favoriteIds={(favorites ?? []).map((f) => f.guide_id)}
        recentGuides={recentGuides}
      />
    </Suspense>
  );
}
