'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Icon } from '@/lib/biblioteca/icons';
import GuideCard, { type GuideCardData } from './GuideCard';

type Category = { slug: string; name: string; icon: string | null };

type Guide = GuideCardData & { subtitle: string | null; updated_at: string | null };

const QUICK_SHORTCUTS: { icon: string; label: string; slug: string }[] = [
  { icon: 'utensils', label: 'Vou comer fora', slug: 'guia-de-restaurantes' },
  { icon: 'droplet', label: 'Vou beber', slug: 'guia-de-bebidas-alcoolicas' },
  { icon: 'compass', label: 'Vou viajar', slug: 'guia-de-viagens' },
  { icon: 'heart', label: 'Vontade de doce', slug: 'controle-vontade-de-doces' },
  { icon: 'leaf', label: 'Comi demais', slug: 'comi-demais-e-agora' },
  { icon: 'shoppingBag', label: 'Vou ao supermercado', slug: 'estou-no-supermercado' },
  { icon: 'sparkles', label: 'Tenho uma festa', slug: 'guia-de-festas-e-eventos' },
];

const NUTRIO_URL = 'https://apps.apple.com/app/id6742196335';

export default function BibliotecaHome({
  firstName,
  categories,
  guides,
  favoriteIds,
  recentGuides,
}: {
  firstName: string;
  categories: Category[];
  guides: Guide[];
  favoriteIds: string[];
  recentGuides: Guide[];
}) {
  const searchParams = useSearchParams();
  const [categoria, setCategoria] = useState(searchParams.get('categoria') ?? '');
  const [search, setSearch] = useState('');

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);
  const categoryNameBySlug = useMemo(
    () => new Map(categories.map((c) => [c.slug, c.name])),
    [categories]
  );

  const favoriteGuides = useMemo(
    () => guides.filter((g) => favoriteSet.has(g.id)),
    [guides, favoriteSet]
  );

  const recentUpdates = useMemo(
    () =>
      [...guides]
        .filter((g) => g.updated_at)
        .sort((a, b) => (b.updated_at! > a.updated_at! ? 1 : -1))
        .slice(0, 6),
    [guides]
  );

  const filteredGuides = useMemo(() => {
    const q = search.trim().toLowerCase();
    return guides.filter((g) => {
      const matchesCategory = !categoria || g.category_slug === categoria;
      const matchesSearch =
        !q || g.title.toLowerCase().includes(q) || (g.subtitle ?? '').toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [guides, categoria, search]);

  return (
    <main id="conteudos" className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
      {/* Saudação */}
      <p className="mb-1 font-serif text-sm italic text-wine">Área eStrat+</p>
      <h1 className="mb-1.5 font-serif text-2xl text-green sm:text-3xl">
        Olá{firstName ? `, ${firstName}` : ''}!
      </h1>
      <p className="mb-7 text-ink-soft">
        Estratégias para transformar sua alimentação no dia a dia.
      </p>

      {/* Acesso rápido */}
      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-ink-soft/70">
        O que você precisa hoje?
      </p>
      <div className="mb-8 -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1">
        {QUICK_SHORTCUTS.map((s) => (
          <Link
            key={s.slug}
            href={`/biblioteca/guia/${s.slug}`}
            className="flex flex-shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-wine/30 hover:text-wine"
          >
            <Icon name={s.icon} size={16} className="text-wine" />
            {s.label}
          </Link>
        ))}
      </div>

      {/* Análise de refeição + plano alimentar */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/biblioteca/analise-alimentar"
          className="flex flex-1 items-center gap-4 rounded-2xl border border-wine/15 bg-wine px-5 py-4 text-cream transition hover:bg-wine-deep"
        >
          <Icon name="camera" size={22} />
          <div className="flex-1">
            <p className="font-serif text-lg">Analisar minha refeição</p>
            <p className="text-sm text-cream/80">Envie uma foto e tenha uma estimativa</p>
          </div>
          <Icon name="arrowRight" size={18} />
        </Link>
        <a
          href={NUTRIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white px-5 py-4 text-ink transition hover:border-green/30 sm:flex-col sm:items-start sm:justify-center sm:gap-1"
        >
          <Icon name="smartphone" size={20} className="text-green-soft" />
          <span className="font-serif text-sm leading-tight sm:text-base">
            Acessar meu
            <br className="hidden sm:block" /> plano alimentar
          </span>
        </a>
      </div>

      {/* Busca */}
      <div className="mb-9">
        <div className="relative">
          <Icon
            name="search"
            size={17}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft/50"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="O que você está procurando?"
            className="focus-ring w-full rounded-full border border-black/10 bg-white py-3 pl-11 pr-4 text-sm placeholder:text-ink-soft/50"
          />
        </div>
      </div>

      {/* Continue de onde parou */}
      {recentGuides.length > 0 && !search && (
        <section className="mb-9">
          <h2 className="mb-3 font-serif text-lg text-green">Continue de onde parou</h2>
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1">
            {recentGuides.map((g) => (
              <div key={g.id} className="w-[150px] flex-shrink-0 sm:w-[170px]">
                <GuideCard
                  guide={g}
                  categoryName={categoryNameBySlug.get(g.category_slug)}
                  isFavorite={favoriteSet.has(g.id)}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Favoritos */}
      {favoriteGuides.length > 0 && !search && (
        <section id="favoritos" className="mb-9 scroll-mt-20">
          <h2 className="mb-3 flex items-center gap-2 font-serif text-lg text-green">
            <Icon name="heart" size={17} className="text-wine" />
            Meus favoritos
          </h2>
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1">
            {favoriteGuides.map((g) => (
              <div key={g.id} className="w-[150px] flex-shrink-0 sm:w-[170px]">
                <GuideCard guide={g} categoryName={categoryNameBySlug.get(g.category_slug)} isFavorite />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Novidades */}
      {!search && !categoria && (
        <section className="mb-9">
          <h2 className="mb-3 font-serif text-lg text-green">Novidades</h2>
          <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1">
            {recentUpdates.map((g) => (
              <div key={g.id} className="w-[150px] flex-shrink-0 sm:w-[170px]">
                <GuideCard
                  guide={g}
                  categoryName={categoryNameBySlug.get(g.category_slug)}
                  isFavorite={favoriteSet.has(g.id)}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Categorias */}
      {categories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategoria('')}
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
              !categoria
                ? 'border-wine bg-wine text-cream'
                : 'border-black/10 bg-white text-ink-soft hover:border-wine/40'
            }`}
          >
            Todos
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCategoria(c.slug)}
              className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                categoria === c.slug
                  ? 'border-wine bg-wine text-cream'
                  : 'border-black/10 bg-white text-ink-soft hover:border-wine/40'
              }`}
            >
              {c.icon && <Icon name={c.icon} size={14} />}
              {c.name}
            </button>
          ))}
        </div>
      )}

      {/* Grid principal */}
      {filteredGuides.length === 0 ? (
        <p className="text-ink-soft">Nenhum guia encontrado.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredGuides.map((g) => (
            <GuideCard
              key={g.id}
              guide={g}
              categoryName={categoryNameBySlug.get(g.category_slug)}
              isFavorite={favoriteSet.has(g.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
