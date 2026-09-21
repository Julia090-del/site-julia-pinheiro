import { createClient } from '@/lib/supabase/server';
import CreatePatientForm from './CreatePatientForm';

export default async function PacientesPage() {
  const supabase = await createClient();
  const { data: patients } = await supabase
    .from('profiles')
    .select('id, full_name, created_at')
    .eq('role', 'patient')
    .order('created_at', { ascending: false });

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl text-green">Pacientes</h1>
      <CreatePatientForm />

      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-black/10 text-left text-xs uppercase tracking-wide text-ink-soft">
              <th className="px-4 py-3">Nome</th>
              <th className="px-4 py-3">Criado em</th>
            </tr>
          </thead>
          <tbody>
            {(patients ?? []).map((p) => (
              <tr key={p.id} className="border-b border-black/5 last:border-0">
                <td className="px-4 py-3">{p.full_name || '—'}</td>
                <td className="px-4 py-3 text-ink-soft">
                  {new Date(p.created_at).toLocaleDateString('pt-BR')}
                </td>
              </tr>
            ))}
            {(!patients || patients.length === 0) && (
              <tr>
                <td colSpan={2} className="px-4 py-6 text-center text-ink-soft">
                  Nenhum paciente cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
