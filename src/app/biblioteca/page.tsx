import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function BibliotecaHomePage() {
  const supabase = await createClient();
  const { data: guides } = await supabase
    .from('guides')
    .select('slug, title, subtitle, image, category_slug, read_minutes')
    .order('sort_order', { ascending: true });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-2 font-serif text-3xl text-green">Bem-vinda à sua biblioteca.</h1>
      <p className="mb-8 text-ink-soft">
        Guias práticos preparados pela Júlia para facilitar suas escolhas no dia a dia.
      </p>

      {!guides || guides.length === 0 ? (
        <p className="text-ink-soft">Ainda não há guias publicados. Volte em breve.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/biblioteca/guia/${guide.slug}`}
              className="group overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="aspect-[4/5] bg-green/10">
                {guide.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={guide.image}
                    alt=""
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-4">
                <p className="text-[11px] font-bold uppercase tracking-wide text-green-soft">
                  {guide.category_slug}
                </p>
                <h3 className="font-serif text-base text-ink">{guide.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
