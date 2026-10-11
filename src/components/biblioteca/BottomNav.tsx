'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@/lib/biblioteca/icons';
import { signOut } from '@/app/biblioteca/actions';

const ITEMS = [
  { href: '/biblioteca', icon: 'home', label: 'Início', isActive: (p: string) => p === '/biblioteca' },
  {
    href: '/biblioteca#conteudos',
    icon: 'bookOpen',
    label: 'Conteúdos',
    isActive: (p: string) => p.startsWith('/biblioteca/guia'),
  },
  {
    href: '/biblioteca/analise-alimentar',
    icon: 'camera',
    label: 'Analisar',
    isActive: (p: string) => p.startsWith('/biblioteca/analise-alimentar'),
  },
  { href: '/biblioteca#favoritos', icon: 'heart', label: 'Favoritos', isActive: () => false },
];

export default function BottomNav({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-ink/20 sm:hidden"
          />
          <div className="fixed bottom-[calc(64px+env(safe-area-inset-bottom,0px))] left-4 right-4 z-50 flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg sm:hidden">
            {isAdmin && (
              <Link
                href="/biblioteca/admin"
                onClick={() => setMenuOpen(false)}
                className="px-5 py-3.5 text-sm font-semibold text-ink"
              >
                Admin
              </Link>
            )}
            <form action={signOut}>
              <button
                type="submit"
                className="w-full border-t border-black/10 px-5 py-3.5 text-left text-sm font-semibold text-wine"
              >
                Sair
              </button>
            </form>
          </div>
        </>
      )}

      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-black/10 bg-cream/95 backdrop-blur sm:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      >
        {ITEMS.map((item) => {
          const active = item.isActive(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10.5px] font-semibold ${
                active ? 'text-wine' : 'text-ink-soft'
              }`}
            >
              <Icon name={item.icon} size={20} />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-[10.5px] font-semibold ${
            menuOpen ? 'text-wine' : 'text-ink-soft'
          }`}
        >
          <Icon name="menu" size={20} />
          Menu
        </button>
      </nav>
    </>
  );
}
