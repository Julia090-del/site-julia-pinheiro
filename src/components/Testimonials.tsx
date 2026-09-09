import Image from "next/image";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { siteConfig } from "@/config/site";

// Prints reais de avaliações do Google. Adicione os arquivos em
// public/images/testimonials/ e uma entrada aqui para cada um — a seção só
// aparece na página quando esta lista tiver pelo menos um item.
type Testimonial = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    src: "/images/testimonials/gabriel-borges.jpg",
    alt: "Avaliação de Gabriel Borges Campos no Google: Excelente profissional!!! Muito atenciosa e dedicada. Recomendo muito!",
    width: 1054,
    height: 343,
  },
  {
    src: "/images/testimonials/hilda-martins.jpg",
    alt: "Avaliação de Hilda Martins no Google: Excelente profissional! Julia pinheiro é super atenciosa, explica tudo com muita clareza e montou um plano alimentar que se encaixa de verdade na minha rotina.",
    width: 1067,
    height: 581,
  },
  {
    src: "/images/testimonials/luciana-saporetti.jpg",
    alt: "Avaliação de Luciana Saporetti no Google: Atendimento excelente! Dieta alinhada ao dia a dia, preferências alimentares para que consiga manter uma reeducação alimentar saudável.",
    width: 1062,
    height: 480,
  },
];

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section id="depoimentos" className="bg-cream py-14 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <Eyebrow className="justify-center">Depoimentos</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl text-green sm:text-4xl">
            Resultados que vão além da balança
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            Cada pessoa tem uma história e um objetivo diferente. E é isso que
            torna cada acompanhamento único.
          </p>
        </Reveal>

        <Reveal
          delay={80}
          className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.src}
              className="w-[82vw] shrink-0 snap-center overflow-hidden rounded-2xl border border-ink/10 shadow-[0_20px_45px_-30px_rgba(28,34,29,0.3)] sm:w-[360px]"
            >
              <Image
                src={t.src}
                alt={t.alt}
                width={t.width}
                height={t.height}
                sizes="(max-width: 640px) 82vw, 360px"
                className="h-auto w-full object-contain"
              />
            </div>
          ))}
        </Reveal>

        <Reveal delay={140} className="mt-10 text-center">
          <p className="text-sm text-ink-soft">
            Quer conhecer mais experiências?
          </p>
          <a
            href={siteConfig.googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-3 inline-flex items-center gap-2 text-sm font-semibold text-wine hover:text-wine-deep"
          >
            Ver avaliações no Google →
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
