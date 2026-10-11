import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Icon } from '@/lib/biblioteca/icons';
import GuideContent from '@/components/biblioteca/GuideContent';
import GuideCard from '@/components/biblioteca/GuideCard';
import FavoriteToggleButton from '@/components/biblioteca/FavoriteToggleButton';
import { recordGuideViewAction } from '@/app/biblioteca/actions';
import type { GuideRow } from '@/lib/biblioteca/types';

function formatDateShort(iso: string | null) {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '');
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: guide } = await supabase
    .from('guides')
    .select('*')
    .eq('slug', slug)
    .single<GuideRow & { id: string }>();

  if (!guide) notFound();

  const { data: category } = await supabase
    .from('categories')
    .select('slug, name, icon')
    .eq('slug', guide.category_slug)
    .single();

  const { data: related } = await supabase
    .from('guides')
    .select('id, slug, title, subtitle, image, category_slug, read_minutes, is_new, is_featured')
    .eq('category_slug', guide.category_slug)
    .neq('slug', guide.slug)
    .order('sort_order', { ascending: true })
    .limit(6);

  let isFavorite = false;
  if (user) {
    const [{ data: favorite }] = await Promise.all([
      supabase
        .from('favorites')
        .select('guide_id')
        .eq('patient_id', user.id)
        .eq('guide_id', guide.id)
        .maybeSingle(),
      recordGuideViewAction(guide.id),
    ]);
    isFavorite = Boolean(favorite);
  }

  const content = guide.content || {};

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href={`/biblioteca?categoria=${encodeURIComponent(guide.category_slug)}`}
          className="mb-5 inline-flex items-center gap-1.5 text-sm font-bold text-green-soft"
        >
          <Icon name="chevronLeft" size={16} />
          Voltar para {category?.name || 'a Área eStrat+'}
        </Link>

        <div className="mb-3 flex flex-wrap items-center gap-1.5 text-xs text-ink-soft/70">
          <Link href="/biblioteca" className="font-semibold text-ink-soft">
            Início
          </Link>
          <Icon name="chevronRight" size={12} />
          <Link href={`/biblioteca?categoria=${encodeURIComponent(guide.category_slug)}`} className="font-semibold text-ink-soft">
            {category?.name}
          </Link>
          <Icon name="chevronRight" size={12} />
          <span>{guide.title}</span>
        </div>

        <div className="mb-2 flex items-start justify-between gap-3">
          <p className="font-serif text-sm italic text-wine">
            {category?.name}
            {guide.is_new ? ' · Novo' : ''}
          </p>
          <FavoriteToggleButton guideId={guide.id} initialFavorite={isFavorite} />
        </div>
        <h1 className="mb-2 font-serif text-2xl text-wine sm:text-3xl">{guide.title}</h1>
        {guide.subtitle && <p className="mb-6 max-w-[60ch] text-lg text-ink-soft">{guide.subtitle}</p>}

        {guide.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={guide.image}
            alt={guide.title}
            className="mb-6 aspect-video w-full rounded-2xl object-cover"
          />
        )}

        {content.intro && <p className="mb-6 max-w-[70ch] text-base text-ink-soft">{content.intro}</p>}

        <div className="mb-8 flex flex-wrap items-center gap-4 border-t border-black/10 pt-5 text-xs text-ink-soft/70">
          <span className="inline-flex items-center gap-1.5">
            <Icon name="clock" size={14} />
            {guide.read_minutes ? `${guide.read_minutes} min` : ''} de leitura
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="info" size={14} />
            Atualizado em {formatDateShort(guide.updated_at)}
          </span>
        </div>

        <GuideContent content={content} />

        <div className="mt-10 flex gap-3 rounded-xl border border-green/15 bg-green/5 px-5 py-4 text-sm text-green-deep">
          <Icon name="info" size={20} className="flex-shrink-0 text-green-soft" />
          <div>
            {content.disclaimer ||
              'Este conteúdo é educativo e não substitui uma avaliação individualizada. Ajustes para o seu caso específico devem ser feitos junto à Júlia no acompanhamento.'}
          </div>
        </div>
      </div>

      {related && related.length > 0 && (
        <section className="border-t border-black/5 bg-cream-soft py-10">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-5 font-serif text-2xl text-wine">Você também pode gostar</h2>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {related.map((g) => (
                <div key={g.slug} className="w-[220px] flex-shrink-0">
                  <GuideCard guide={g} categoryName={category?.name} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
