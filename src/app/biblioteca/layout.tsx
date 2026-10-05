import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { signOut } from './actions';

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
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/biblioteca" className="font-serif text-lg text-green">
              Área eStrat+
            </Link>
            <nav className="flex items-center gap-4 text-sm font-semibold text-ink-soft">
              <Link href="/biblioteca/analise-alimentar" className="hover:text-green">
                Análise de Refeição
              </Link>
              {role === 'admin' && (
                <Link href="/biblioteca/admin" className="hover:text-green">
                  Admin
                </Link>
              )}
              <form action={signOut}>
                <button type="submit" className="hover:text-wine">
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
