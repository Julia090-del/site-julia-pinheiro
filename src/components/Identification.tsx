import { Container } from "./Container";
import { Reveal } from "./Reveal";

const SCENARIOS = [
  "Começa dietas diferentes, mas não consegue sustentar os resultados.",
  "Treina com dedicação, mas sente que o corpo poderia evoluir mais.",
  "Alimentação desorganizada no meio de uma rotina corrida.",
  "Intestino que não funciona de forma regular.",
  "Cansaço e baixa disposição, mesmo dormindo bem.",
  "Sintomas relacionados à saúde feminina, como TPM e oscilações de energia.",
];

export function Identification() {
  return (
    <section className="bg-cream py-24 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl italic leading-snug text-green sm:text-4xl">
            Talvez o problema nunca tenha sido falta de força de vontade.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            Seguir estratégias que não conversam com a sua rotina real tende a
            dificultar a constância — não a falta de esforço. Alguns cenários
            costumam se repetir:
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-ink/8 sm:grid-cols-2 lg:grid-cols-3">
          {SCENARIOS.map((text, i) => (
            <Reveal key={text} delay={i * 60} className="bg-cream p-8">
              <span className="font-serif text-sm text-wine">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 text-[0.98rem] leading-relaxed text-ink">
                {text}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
