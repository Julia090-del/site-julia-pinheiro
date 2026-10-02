'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function DefinirSenhaPage() {
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('A senha precisa ter pelo menos 8 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('As senhas não são iguais.');
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      setError('Não foi possível definir a senha. Peça um novo link de acesso.');
      return;
    }

    setDone(true);
    setTimeout(() => {
      window.location.href = '/biblioteca';
    }, 1500);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="mb-1 font-serif text-2xl text-green">Área eStrat+</h1>
        <p className="mb-6 text-sm text-ink-soft">Defina sua senha de acesso.</p>

        {!ready && !done && (
          <p className="text-sm text-ink-soft">
            Carregando o link de acesso... Se esta mensagem não sumir em alguns segundos, o link pode ter
            expirado — peça um novo.
          </p>
        )}

        {done && <p className="text-sm text-green-deep">Senha definida! Entrando...</p>}

        {ready && !done && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Nova senha
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-ring rounded-lg border border-black/15 px-3 py-2.5 text-sm"
                placeholder="••••••••"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm" className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
                Confirme a senha
              </label>
              <input
                id="confirm"
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="focus-ring rounded-lg border border-black/15 px-3 py-2.5 text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-wine">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="focus-ring mt-2 rounded-full bg-green px-6 py-3 text-sm font-bold text-cream transition hover:bg-green-deep disabled:opacity-60"
            >
              {loading ? 'Salvando...' : 'Salvar senha'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
