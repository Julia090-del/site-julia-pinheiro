"use client";

import { useId, useState } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/cn";
import { getWhatsappLink } from "@/config/site";

const FAQ_ITEMS = [
  {
    q: "A consulta é presencial ou online?",
    a: "Presencial em Goiânia ou online — você escolhe o formato que fizer mais sentido para a sua rotina.",
  },
  {
    q: "Como funciona a avaliação da composição corporal?",
    a: "Fazemos uma avaliação da sua composição corporal como parte do acompanhamento, usada como referência para ajustar a estratégia ao longo do tempo.",
  },
  {
    q: "Preciso levar exames?",
    a: "Se você já tiver exames recentes, é interessante trazê-los — eles ajudam a personalizar ainda mais a estratégia. Não é obrigatório para começar.",
  },
  {
    q: "Como funciona o acompanhamento entre as consultas?",
    a: "Você tem suporte pelo WhatsApp e por uma plataforma de acompanhamento, para tirar dúvidas e ajustar a estratégia quando necessário.",
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
    <section id="faq" className="bg-cream-soft py-14 sm:py-24">
      <Container className="max-w-3xl">
        <Reveal className="text-center">
          <Eyebrow className="justify-center">Dúvidas frequentes</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-semibold text-green sm:text-4xl">
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
