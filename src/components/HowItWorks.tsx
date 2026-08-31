import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

const STEPS = [
  {
    n: "01",
    title: "Entender você",
    text: "Consulta completa de aproximadamente 1h30 para compreender rotina, alimentação, preferências, objetivos e necessidades.",
  },
  {
    n: "02",
    title: "Criar sua estratégia",
    text: "Construção de um plano alimentar individualizado e de uma estratégia compatível com a sua vida real.",
  },
  {
    n: "03",
    title: "Acompanhar",
    text: "Suporte pelo WhatsApp e por plataforma de acompanhamento ao longo de todo o processo.",
  },
  {
    n: "04",
    title: "Ajustar e evoluir",
    text: "Encontros mensais para observar a evolução e realizar os ajustes necessários na estratégia.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-cream-soft py-24 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <Eyebrow className="justify-center">Como funciona</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl text-green sm:text-4xl">
            O acompanhamento, passo a passo
          </h2>
        </Reveal>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div
            className="absolute top-6 hidden h-px w-full bg-green/15 lg:block"
            aria-hidden
          />
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 90} className="relative">
              <span className="relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream-soft font-serif text-lg text-green ring-1 ring-green/20">
                {step.n}
              </span>
              <h3 className="mt-5 font-serif text-xl text-green">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {step.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
