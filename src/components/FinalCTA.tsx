import Image from "next/image";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { getWhatsappLink } from "@/config/site";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-wine-deep py-24 sm:py-32">
      <Image
        src="/images/logo-jp.png"
        alt=""
        aria-hidden
        width={600}
        height={900}
        className="pointer-events-none absolute -right-16 -top-10 h-[420px] w-auto opacity-[0.06] mix-blend-luminosity sm:h-[560px]"
      />

      <Container className="relative max-w-2xl text-center">
        <Reveal>
          <h2 className="font-serif text-3xl leading-tight text-cream sm:text-4xl lg:text-[2.6rem]">
            Você não precisa de mais uma dieta.
            <br />
            <span className="italic text-taupe-soft">
              Precisa de uma estratégia feita para você.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream-soft/85">
            Conheça o Método eStrat+ e comece um acompanhamento construído em
            torno da sua rotina, dos seus objetivos e da sua saúde.
          </p>
          <a
            href={getWhatsappLink("agendar")}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-9 inline-flex items-center justify-center rounded-full bg-cream px-8 py-4 text-sm font-semibold text-wine-deep shadow-sm transition-all hover:-translate-y-0.5 hover:bg-taupe-soft"
          >
            Quero começar meu acompanhamento
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
