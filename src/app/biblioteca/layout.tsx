import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { signOut } from './actions';
import { Icon } from '@/lib/biblioteca/icons';

export default async function BibliotecaLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let role: string | null = null;
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();
    role = profile?.role ?? null;
  }

  return (
    <div className="min-h-screen bg-cream">
      {user && (
        <header className="sticky top-0 z-40 border-b border-black/10 bg-cream/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-4 py-3">
            <Link
              href="/biblioteca"
              className="flex-shrink-0 whitespace-nowrap font-serif text-base text-green sm:text-lg"
            >
              Área eStrat+
            </Link>
            <nav className="flex items-center gap-3 text-sm font-semibold text-ink-soft sm:gap-4">
              <Link
                href="/biblioteca/analise-alimentar"
                aria-label="Análise de Refeição"
                className="flex items-center whitespace-nowrap hover:text-green"
              >
                <Icon name="camera" size={18} className="sm:hidden" />
                <span className="hidden sm:inline">Análise de Refeição</span>
              </Link>
              {role === 'admin' && (
                <Link href="/biblioteca/admin" className="whitespace-nowrap hover:text-green">
                  Admin
                </Link>
              )}
              <form action={signOut}>
                <button type="submit" className="whitespace-nowrap hover:text-wine">
                  Sair
                </button>
              </form>
            </nav>
          </div>
        </header>
      )}
      {children}
    </div>
  );
}
