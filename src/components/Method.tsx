import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

export function Method() {
  return (
    <section id="metodo" className="relative overflow-hidden bg-green py-12 sm:py-24">
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-green-soft/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-wine/15 blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-xl text-center">
          <Eyebrow tone="cream" className="justify-center text-taupe-soft">
            O método
          </Eyebrow>
          <h2 className="mt-5 font-serif text-4xl text-cream sm:text-5xl">
            Método eStrat+
          </h2>
          <p className="mt-4 font-serif text-xl italic text-taupe-soft sm:text-2xl">
            Minha forma de conduzir o acompanhamento nutricional.
          </p>
          <p className="mt-6 text-base leading-relaxed text-cream-soft/90 sm:text-lg">
            Uma abordagem baseada em eStratégia, individualidade e
            acompanhamento contínuo. Mais do que entregar um plano alimentar,
            meu objetivo é construir uma eStratégia que você consiga aplicar
            na sua rotina e ajustar ao longo do processo.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
