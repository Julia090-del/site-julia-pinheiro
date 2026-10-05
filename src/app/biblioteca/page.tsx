import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function BibliotecaHomePage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from('categories')
    .select('slug, name, icon')
    .order('sort_order', { ascending: true });

  let query = supabase
    .from('guides')
    .select('slug, title, subtitle, image, category_slug, read_minutes, is_new, is_featured')
    .order('sort_order', { ascending: true });

  if (categoria) query = query.eq('category_slug', categoria);

  const { data: guides } = await query;
  const categoryNameBySlug = new Map((categories || []).map((c) => [c.slug, c.name]));

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-2 font-serif text-3xl text-green">Bem-vinda à sua Área eStrat+.</h1>
      <p className="mb-6 text-ink-soft">
        Guias práticos preparados pela Júlia para facilitar suas escolhas no dia a dia.
      </p>

      <Link
        href="/biblioteca/analise-alimentar"
        className="mb-8 flex items-center gap-4 rounded-2xl border border-green/15 bg-green px-5 py-4 text-cream transition hover:bg-green-deep"
      >
        <span className="text-2xl">📷</span>
        <div className="flex-1">
          <p className="font-serif text-lg">Análise de Refeição</p>
          <p className="text-sm text-cream/80">
            Envie uma foto e tenha uma estimativa de calorias e macronutrientes
          </p>
        </div>
        <span className="text-xl">→</span>
      </Link>

      {categories && categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/biblioteca"
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              !categoria
                ? 'border-green bg-green text-cream'
                : 'border-black/10 bg-white text-ink-soft hover:border-green'
            }`}
          >
            Todos
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/biblioteca?categoria=${encodeURIComponent(c.slug)}`}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                categoria === c.slug
                  ? 'border-green bg-green text-cream'
                  : 'border-black/10 bg-white text-ink-soft hover:border-green'
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}

      {!guides || guides.length === 0 ? (
        <p className="text-ink-soft">Ainda não há guias publicados nesta categoria.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/biblioteca/guia/${guide.slug}`}
              className="group overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-[4/5] bg-green/10">
                {guide.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={guide.image}
                    alt=""
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                )}
                <div className="absolute left-2.5 top-2.5 flex gap-1.5">
                  {guide.is_new && (
                    <span className="rounded-full bg-green px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cream">
                      Novo
                    </span>
                  )}
                  {guide.is_featured && (
                    <span className="rounded-full bg-wine px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cream">
                      Destaque
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <p className="text-[10.5px] font-bold uppercase tracking-wide text-green-soft">
                  {categoryNameBySlug.get(guide.category_slug) || guide.category_slug}
                </p>
                <h3 className="font-serif text-base leading-tight text-ink">{guide.title}</h3>
                {guide.read_minutes && (
                  <p className="mt-1.5 text-xs text-ink-soft/70">{guide.read_minutes} min</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
