"use client";

import { useId, useState } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/cn";
import { getWhatsappLink } from "@/config/site";

const FAQ_ITEMS = [
  {
    q: "Como funciona a primeira consulta?",
    a: "Na primeira consulta, com duração aproximada de 1h30, conversamos sobre sua rotina, alimentação, preferências, objetivos e histórico de saúde para construir a estratégia inicial.",
  },
  {
    q: "Quanto tempo dura a consulta?",
    a: "Aproximadamente 1h30 — o tempo necessário para entender seu contexto com profundidade, sem pressa.",
  },
  {
    q: "O acompanhamento é apenas para emagrecimento?",
    a: "Não. O Método eStrat+ trabalha de forma integrada temas como emagrecimento, hipertrofia, saúde intestinal, energia, sono e saúde feminina, conforme a necessidade de cada pessoa.",
  },
  {
    q: "Você atende online?",
    a: "Sim. O acompanhamento acontece presencialmente em Goiânia ou online, com a mesma estrutura de suporte e materiais.",
  },
  {
    q: "Com que frequência acontecem as consultas?",
    a: "As consultas de retorno acontecem mensalmente, com suporte contínuo entre um encontro e outro.",
  },
  {
    q: "Vou receber um plano alimentar?",
    a: "Sim, um plano alimentar individualizado, construído a partir da sua estratégia e ajustado ao longo do acompanhamento.",
  },
  {
    q: "Existe suporte entre as consultas?",
    a: "Sim, o suporte acontece pelo WhatsApp e por uma plataforma de acompanhamento.",
  },
  {
    q: "Qual acompanhamento devo escolher: mensal, trimestral ou semestral?",
    a: "Isso depende do seu objetivo e do seu momento atual. Fale com a Júlia pelo WhatsApp para entender juntas qual formato faz mais sentido para você.",
  },
];

function FaqRow({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-b border-ink/10 py-5">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex w-full items-center justify-between gap-6 text-left"
      >
        <span className="font-serif text-lg text-green sm:text-xl">{q}</span>
        <span
          className={cn(
            "shrink-0 text-2xl font-light text-wine transition-transform duration-300",
            open && "rotate-45"
          )}
          aria-hidden
        >
          +
        </span>
      </button>
      <div
        id={id}
        className={cn(
          "grid transition-all duration-300 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="mt-3 max-w-2xl text-[0.95rem] leading-relaxed text-ink-soft">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="duvidas" className="bg-cream-soft py-24 sm:py-28">
      <Container className="max-w-3xl">
        <Reveal className="text-center">
          <Eyebrow className="justify-center">Dúvidas frequentes</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl text-green sm:text-4xl">
            Perguntas que costumam aparecer
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-12">
          {FAQ_ITEMS.map((item) => (
            <FaqRow key={item.q} q={item.q} a={item.a} />
          ))}
        </Reveal>

        <Reveal delay={140} className="mt-10 text-center">
          <p className="text-sm text-ink-soft">
            Ainda com dúvidas sobre qual caminho faz mais sentido para você?
          </p>
          <a
            href={getWhatsappLink("geral")}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-3 inline-flex items-center gap-2 text-sm font-semibold text-wine hover:text-wine-deep"
          >
            Conversar no WhatsApp →
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
