'use client';

import { useState, useTransition } from 'react';
import { createPatient } from '../../actions';

export default function CreatePatientForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ error?: string; success?: boolean; email?: string; tempPassword?: string } | null>(
    null
  );

  function handleSubmit(formData: FormData) {
    setResult(null);
    startTransition(async () => {
      const res = await createPatient(formData);
      setResult(res);
      if (res.success) {
        const form = document.getElementById('create-patient-form') as HTMLFormElement | null;
        form?.reset();
      }
    });
  }

  return (
    <div className="mb-8 rounded-2xl border border-black/10 bg-white p-5">
      <h2 className="mb-4 font-serif text-lg text-green">Criar acesso de paciente</h2>
      <form id="create-patient-form" action={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">Nome</label>
          <input
            name="full_name"
            required
            className="focus-ring rounded-lg border border-black/15 px-3 py-2.5 text-sm"
            placeholder="Nome do paciente"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide text-ink-soft">E-mail</label>
          <input
            name="email"
            type="email"
            required
            className="focus-ring rounded-lg border border-black/15 px-3 py-2.5 text-sm"
            placeholder="paciente@exemplo.com"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="focus-ring rounded-full bg-green px-6 py-2.5 text-sm font-bold text-cream hover:bg-green-deep disabled:opacity-60"
        >
          {isPending ? 'Criando...' : 'Criar acesso'}
        </button>
      </form>

      {result?.error && <p className="mt-3 text-sm text-wine">{result.error}</p>}

      {result?.success && (
        <div className="mt-4 rounded-xl bg-green/10 p-4 text-sm text-green-deep">
          <p className="font-semibold">Acesso criado! Envie estes dados ao paciente:</p>
          <p className="mt-2">
            E-mail: <strong>{result.email}</strong>
          </p>
          <p>
            Senha provisória: <strong>{result.tempPassword}</strong>
          </p>
          <p className="mt-2 text-xs text-ink-soft">
            Essa senha só aparece uma vez aqui — copie e envie ao paciente agora.
          </p>
        </div>
      )}
    </div>
  );
}
