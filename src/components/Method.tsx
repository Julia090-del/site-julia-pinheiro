import Image from "next/image";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { getWhatsappLink } from "@/config/site";

const PILLARS = [
  {
    n: "01",
    title: "Estratégia",
    text: "Cada decisão nutricional parte de um raciocínio claro — não de fórmulas prontas ou dietas padronizadas.",
  },
  {
    n: "02",
    title: "Individualidade",
    text: "Seu histórico, sua rotina, suas preferências e seus objetivos moldam o plano — não o contrário.",
  },
  {
    n: "03",
    title: "Acompanhamento",
    text: "Ajustes contínuos ao longo do processo, com suporte real entre uma consulta e outra.",
  },
  {
    n: "04",
    title: "Transformação sustentável",
    text: "Resultados pensados para se manterem, dentro da vida que você já leva — sem restrições extremas.",
  },
];

const THEMES = [
  "Emagrecimento",
  "Hipertrofia",
  "Saúde intestinal",
  "Saúde feminina",
  "Energia e disposição",
  "Sono",
  "Saúde e qualidade de vida",
];

export function Method() {
  return (
    <section id="metodo" className="relative overflow-hidden bg-green py-24 sm:py-32">
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-green-soft/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-wine/15 blur-3xl"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid gap-y-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-x-16">
          <Reveal className="relative mx-auto flex w-full max-w-[300px] justify-center lg:mx-0 lg:max-w-none lg:justify-start lg:self-stretch">
            <div
              className="pointer-events-none absolute inset-0 -z-10 mx-auto h-[85%] w-[85%] self-center rounded-full bg-taupe/15 blur-3xl"
              aria-hidden
            />
            <Image
              src="/images/julia-preto-sentada-cutout.png"
              alt="Júlia Pinheiro, criadora do Método eStrat+"
              width={1000}
              height={1500}
              sizes="(max-width: 1024px) 65vw, 30vw"
              className="relative h-auto w-full max-w-[300px] object-contain drop-shadow-[0_35px_50px_rgba(8,18,13,0.5)] lg:max-w-[400px] lg:translate-y-6"
            />
          </Reveal>

          <div>
            <Reveal>
              <Eyebrow tone="cream" className="text-taupe-soft">
                Método próprio
              </Eyebrow>
              <h2 className="mt-5 font-serif text-4xl text-cream sm:text-5xl">
                eStrat+
              </h2>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-cream-soft/90 sm:text-lg">
                Uma metodologia criada por Júlia Pinheiro para ir além de
                dietas prontas — transformando objetivo, rotina, preferências
                e necessidades individuais em uma estratégia nutricional sob
                medida.
              </p>
            </Reveal>

            <div className="mt-12 grid max-w-lg gap-x-8 gap-y-10 sm:grid-cols-2">
              {PILLARS.map((pillar, i) => (
                <Reveal key={pillar.title} delay={i * 80}>
                  <span className="font-serif text-lg text-wine-soft">
                    {pillar.n}
                  </span>
                  <h3 className="mt-3 font-serif text-xl text-cream">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream-soft/80">
                    {pillar.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal className="mt-20 border-t border-cream/15 pt-14 text-center lg:mt-24">
          <p className="font-serif text-xl italic text-cream sm:text-2xl">
            Um olhar integrado sobre o seu corpo
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {THEMES.map((theme) => (
              <span
                key={theme}
                className="rounded-full border border-cream/25 px-4 py-2 text-sm text-cream-soft"
              >
                {theme}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-cream-soft/70">
            Conforme a sua necessidade, esses temas são trabalhados de forma
            conectada — nunca como especialidades isoladas.
          </p>
          <a
            href={getWhatsappLink("metodo")}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-8 inline-flex items-center gap-2 text-sm font-semibold text-cream underline decoration-wine-soft decoration-2 underline-offset-4 transition-colors hover:text-taupe-soft"
          >
            Falar sobre o eStrat+
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
