'use client';

import { useState, useTransition } from 'react';
import { Icon } from '@/lib/biblioteca/icons';
import { toggleFavoriteAction } from '@/app/biblioteca/actions';

export default function FavoriteToggleButton({
  guideId,
  initialFavorite,
}: {
  guideId: string;
  initialFavorite: boolean;
}) {
  const [favorite, setFavorite] = useState(initialFavorite);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    const next = !favorite;
    setFavorite(next);
    startTransition(async () => {
      const res = await toggleFavoriteAction(guideId, next);
      if (res?.error) setFavorite(!next);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className="focus-ring inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-wine transition hover:border-wine/40"
    >
      <Icon name="heart" size={14} className={favorite ? 'fill-current' : ''} />
      {favorite ? 'Salvo' : 'Salvar'}
    </button>
  );
}
