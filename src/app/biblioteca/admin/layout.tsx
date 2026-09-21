import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/biblioteca/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/biblioteca');

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <nav className="mb-8 flex gap-5 border-b border-black/10 pb-4 text-sm font-semibold text-ink-soft">
        <Link href="/biblioteca/admin" className="hover:text-green">
          Painel
        </Link>
        <Link href="/biblioteca/admin/pacientes" className="hover:text-green">
          Pacientes
        </Link>
      </nav>
      {children}
    </div>
  );
}
