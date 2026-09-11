import { Container } from "./Container";
import { Reveal } from "./Reveal";

const ITEMS = [
  "Avaliação nutricional individualizada",
  "Avaliação da composição corporal",
  "Plano alimentar personalizado",
  "eStratégias para sua rotina",
  "Materiais de apoio",
  "Acompanhamento da evolução",
  "Ajustes conforme suas necessidades",
];

export function MethodIncludes() {
  return (
    <section className="bg-cream py-10 sm:py-20">
      <Container className="max-w-2xl">
        <Reveal className="text-center">
          <h2 className="font-serif text-2xl text-green sm:text-3xl">
            Mais do que um plano alimentar.
          </h2>
        </Reveal>

        <Reveal
          delay={80}
          className="mx-auto mt-8 grid max-w-xl gap-x-8 gap-y-3 sm:grid-cols-2"
        >
          {ITEMS.map((item) => (
            <div key={item} className="flex items-start gap-2.5">
              <span className="mt-0.5 text-sm text-wine" aria-hidden>
                ✓
              </span>
              <span className="text-sm leading-relaxed text-ink">{item}</span>
            </div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
