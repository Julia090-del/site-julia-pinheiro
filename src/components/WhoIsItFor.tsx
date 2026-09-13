import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

const ITEMS = [
  {
    title: "Emagrecimento",
    text: "Estratégias para redução de gordura corporal de forma individualizada e sustentável.",
  },
  {
    title: "Estética e composição corporal",
    text: "Nutrição para melhorar composição corporal, definição e resultados estéticos.",
  },
  {
    title: "Performance e hipertrofia",
    text: "Estratégias para desempenho, recuperação e ganho de massa muscular.",
  },
  {
    title: "Saúde e qualidade de vida",
    text: "Alimentação ajustada às suas necessidades e rotina.",
  },
];

export function WhoIsItFor() {
  return (
    <section className="bg-cream py-12 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <Eyebrow className="justify-center">Para quem é</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-semibold text-green sm:text-4xl">
            Seu objetivo é o ponto de partida.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 70}
              className="rounded-2xl bg-cream-soft p-5 sm:p-6"
            >
              <h3 className="font-serif text-base font-semibold leading-snug text-green sm:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft sm:text-sm">
                {item.text}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
