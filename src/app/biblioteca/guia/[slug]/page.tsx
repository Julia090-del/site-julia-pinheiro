import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: guide } = await supabase.from('guides').select('*').eq('slug', slug).single();

  if (!guide) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <p className="mb-2 text-xs font-bold uppercase tracking-wide text-green-soft">
        {guide.category_slug}
      </p>
      <h1 className="mb-2 font-serif text-3xl text-green">{guide.title}</h1>
      {guide.subtitle && <p className="mb-8 text-lg text-ink-soft">{guide.subtitle}</p>}

      {guide.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={guide.image} alt="" className="mb-8 aspect-video w-full rounded-2xl object-cover" />
      )}

      <div className="prose prose-neutral max-w-none">
        <pre className="whitespace-pre-wrap rounded-xl bg-white p-4 text-sm text-ink-soft">
          {JSON.stringify(guide.content, null, 2)}
        </pre>
      </div>
    </main>
  );
}
