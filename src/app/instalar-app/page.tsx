'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/lib/biblioteca/icons';

export default function InstalarAppPage() {
  const [origin, setOrigin] = useState('');
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const link = `${origin}/biblioteca`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard indisponível — o link já fica visível e selecionável
    }
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10 sm:py-14">
      <p className="mb-1 font-serif text-sm italic text-wine">Área eStrat+</p>
      <h1 className="mb-3 font-serif text-2xl text-green sm:text-3xl">
        Como acessar pelo celular e instalar como app
      </h1>
      <p className="mb-8 max-w-[55ch] text-ink-soft">
        Um guia rápido para entrar na Área eStrat+ e deixá-la com cara de aplicativo no seu celular —
        sem precisar baixar nada de loja nenhuma.
      </p>

      <div className="mb-10 flex items-center gap-2 rounded-2xl border border-black/10 bg-white p-3.5">
        <a
          href={link || '/biblioteca'}
          className="min-w-0 flex-1 truncate text-sm font-semibold text-green-deep"
        >
          {link.replace(/^https?:\/\//, '') || 'biblioteca'}
        </a>
        <button
          type="button"
          onClick={handleCopy}
          className="focus-ring flex-shrink-0 rounded-full bg-green px-4 py-2 text-xs font-bold text-cream transition hover:bg-green-deep"
        >
          {copied ? 'Copiado!' : 'Copiar link'}
        </button>
      </div>

      <section className="mb-11">
        <div className="mb-3.5 flex items-baseline gap-3">
          <span className="font-serif text-xl text-wine">1</span>
          <h2 className="font-serif text-lg text-green">Primeiro acesso</h2>
        </div>
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <p className="mb-4 text-sm text-ink-soft">
            Você vai receber um e-mail e uma senha provisória da Júlia. Use esses dados para entrar
            pela primeira vez — depois você pode trocar a senha se quiser.
          </p>
          <div className="flex justify-between border-b border-black/10 py-2.5 text-sm">
            <span className="text-ink-soft">E-mail</span>
            <span className="font-semibold">enviado pela Júlia</span>
          </div>
          <div className="flex justify-between py-2.5 text-sm">
            <span className="text-ink-soft">Senha</span>
            <span className="font-semibold">enviada pela Júlia</span>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3.5 flex items-baseline gap-3">
          <span className="font-serif text-xl text-wine">2</span>
          <h2 className="font-serif text-lg text-green">Instalar como aplicativo</h2>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            type="button"
            onClick={() => setPlatform('ios')}
            className={`focus-ring flex-1 rounded-full border px-4 py-2.5 text-sm font-bold transition ${
              platform === 'ios'
                ? 'border-green bg-green text-cream'
                : 'border-black/10 bg-white text-ink-soft'
            }`}
          >
            iPhone
          </button>
          <button
            type="button"
            onClick={() => setPlatform('android')}
            className={`focus-ring flex-1 rounded-full border px-4 py-2.5 text-sm font-bold transition ${
              platform === 'android'
                ? 'border-green bg-green text-cream'
                : 'border-black/10 bg-white text-ink-soft'
            }`}
          >
            Android
          </button>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white p-5">
          {platform === 'ios' ? (
            <ol className="flex flex-col divide-y divide-black/10">
              {[
                <>
                  Abra o link acima <b className="text-green-deep">direto no Safari</b> (não funciona
                  pelo Chrome no iPhone — é uma limitação da Apple).
                </>,
                <>Faça login com o e-mail e a senha que a Júlia te enviou.</>,
                <>
                  Toque no ícone de <b className="text-green-deep">compartilhar</b> (quadrado com uma
                  seta pra cima), na barra de baixo da tela.
                </>,
                <>
                  Role a lista de opções para baixo e toque em{' '}
                  <b className="text-green-deep">&quot;Adicionar à Tela de Início&quot;</b>.
                </>,
                <>
                  Toque em <b className="text-green-deep">&quot;Adicionar&quot;</b> no canto superior
                  direito.
                </>,
              ].map((text, i) => (
                <li key={i} className="flex gap-3 py-2.5 text-sm leading-relaxed">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cream-soft text-[11px] font-bold text-green-deep">
                    {i + 1}
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          ) : (
            <ol className="flex flex-col divide-y divide-black/10">
              {[
                <>
                  Abra o link acima no <b className="text-green-deep">Chrome</b>.
                </>,
                <>Faça login com o e-mail e a senha que a Júlia te enviou.</>,
                <>
                  Deve aparecer um aviso{' '}
                  <b className="text-green-deep">&quot;Adicionar à tela inicial&quot;</b> — toque nele.
                </>,
                <>
                  Se não aparecer, toque nos <b className="text-green-deep">3 pontinhos</b> (⋮) no
                  canto superior direito e procure <b className="text-green-deep">&quot;Instalar app&quot;</b>.
                </>,
                <>Confirme a instalação.</>,
              ].map((text, i) => (
                <li key={i} className="flex gap-3 py-2.5 text-sm leading-relaxed">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-cream-soft text-[11px] font-bold text-green-deep">
                    {i + 1}
                  </span>
                  <span>{text}</span>
                </li>
              ))}
            </ol>
          )}

          <div className="mt-4 flex items-center gap-4 border-t border-black/10 pt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icons/icon-512.png"
              alt="Ícone da Área eStrat+"
              className="h-14 w-14 flex-shrink-0 rounded-2xl shadow-sm"
            />
            <p className="text-xs text-ink-soft">
              É esse o ícone que vai aparecer na sua tela inicial. Toque nele sempre que quiser
              acessar — abre direto, em tela cheia, como um aplicativo.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-10 flex gap-3 rounded-xl border border-green/15 bg-green/5 px-5 py-4 text-sm text-green-deep">
        <Icon name="info" size={18} className="mt-0.5 flex-shrink-0 text-green-soft" />
        <p>
          <b>Alguma dúvida ou travou em algum passo?</b> É só chamar a Júlia diretamente — ela te
          ajuda por aqui mesmo.
        </p>
      </div>
    </main>
  );
}
