'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Icon } from '@/lib/biblioteca/icons';
import { toggleFavoriteAction } from '@/app/biblioteca/actions';

export type GuideCardData = {
  id: string;
  slug: string;
  title: string;
  image: string | null;
  category_slug: string;
  read_minutes: number | null;
  is_new?: boolean;
  is_featured?: boolean;
};

export default function GuideCard({
  guide,
  categoryName,
  isFavorite = false,
}: {
  guide: GuideCardData;
  categoryName?: string;
  isFavorite?: boolean;
}) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [isPending, startTransition] = useTransition();

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const next = !favorite;
    setFavorite(next);
    startTransition(async () => {
      const res = await toggleFavoriteAction(guide.id, next);
      if (res?.error) setFavorite(!next);
    });
  }

  return (
    <Link
      href={`/biblioteca/guia/${guide.slug}`}
      className="group relative flex-shrink-0 overflow-hidden rounded-2xl border border-black/10 bg-white transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative aspect-[4/5] bg-wine/10">
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
            <span className="rounded-full bg-wine px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cream">
              Novo
            </span>
          )}
          {guide.is_featured && (
            <span className="rounded-full bg-green px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cream">
              Destaque
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleToggleFavorite}
          disabled={isPending}
          aria-label={favorite ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
          className="focus-ring absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-wine backdrop-blur transition hover:bg-white"
        >
          <Icon name="heart" size={14} className={favorite ? 'fill-current' : ''} />
        </button>
      </div>
      <div className="p-4">
        {categoryName && (
          <p className="text-[10.5px] font-bold uppercase tracking-wide text-green-soft">
            {categoryName}
          </p>
        )}
        <h3 className="font-serif text-base leading-tight text-ink">{guide.title}</h3>
        {guide.read_minutes && (
          <p className="mt-1.5 text-xs text-ink-soft/70">{guide.read_minutes} min</p>
        )}
      </div>
    </Link>
  );
}
