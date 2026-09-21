import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { count: patientCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'patient');
  const { count: guideCount } = await supabase
    .from('guides')
    .select('*', { count: 'exact', head: true });

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-green">Painel administrativo</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <p className="font-serif text-3xl text-green">{patientCount ?? 0}</p>
          <p className="text-sm text-ink-soft">Pacientes</p>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <p className="font-serif text-3xl text-green">{guideCount ?? 0}</p>
          <p className="text-sm text-ink-soft">Guias</p>
        </div>
      </div>
    </div>
  );
}
