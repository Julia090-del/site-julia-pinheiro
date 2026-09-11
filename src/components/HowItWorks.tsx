import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

const STEPS = [
  {
    n: "01",
    title: "Avaliação",
    text: "Conhecemos sua rotina, hábitos, objetivos e composição corporal.",
  },
  {
    n: "02",
    title: "eStratégia",
    text: "Definimos as eStratégias mais adequadas para você.",
  },
  {
    n: "03",
    title: "Plano personalizado",
    text: "Um planejamento feito de acordo com sua rotina e preferências.",
  },
  {
    n: "04",
    title: "Acompanhamento",
    text: "A evolução é acompanhada e a eStratégia é ajustada quando necessário.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-cream-soft py-14 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <Eyebrow className="justify-center">Como funciona</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl text-green sm:text-4xl">
            Um método pensado para você.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            Cada acompanhamento começa entendendo onde você está e para onde
            quer chegar.
          </p>
        </Reveal>

        <div className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div
            className="absolute top-5 hidden h-px w-full bg-green/15 lg:block"
            aria-hidden
          />
          {STEPS.map((step, i) => (
            <Reveal
              key={step.n}
              delay={i * 80}
              className="relative flex items-start gap-4 lg:block lg:gap-0"
            >
              <span className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-soft font-serif text-base text-green ring-1 ring-green/20">
                {step.n}
              </span>
              <div className="lg:mt-4">
                <h3 className="font-serif text-lg text-green">
                  {step.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={320} className="mt-10 text-center">
          <a
            href="#pre-consulta"
            className="focus-ring inline-flex items-center justify-center rounded-full bg-green px-7 py-3.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-green-deep"
          >
            Quero começar
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
