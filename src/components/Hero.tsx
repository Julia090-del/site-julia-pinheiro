import Image from "next/image";
import { Container } from "./Container";
import { getWhatsappLink } from "@/config/site";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-cream pt-32 pb-0 sm:pt-40 lg:pt-0"
    >
      <div
        className="pointer-events-none absolute -right-24 top-20 h-[420px] w-[420px] rounded-full bg-green/8 blur-3xl lg:h-[600px] lg:w-[600px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-0 bottom-0 h-64 w-64 rounded-full bg-wine/10 blur-3xl"
        aria-hidden
      />

      <Container className="relative grid items-center gap-10 lg:min-h-[92svh] lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:py-32">
        <div className="relative z-10 max-w-xl">
          <p className="font-serif text-sm italic tracking-wide text-wine">
            Júlia Pinheiro · Nutricionista · CRN 1: 28621
          </p>
          <h1 className="mt-5 font-serif text-[2.4rem] leading-[1.08] text-green sm:text-[2.9rem] lg:text-[3.4rem]">
            Nutrição eStratégica para resultados que cabem na sua vida.
          </h1>
          <p className="mt-6 text-base leading-relaxed text-ink-soft sm:text-lg">
            Acompanhamento nutricional individualizado para emagrecimento,
            hipertrofia, saúde intestinal, saúde feminina e qualidade de vida —
            construído a partir da sua rotina, não do contrário.
          </p>
          <p className="mt-4 text-sm font-medium tracking-wide text-ink-soft">
            Atendimento presencial em Goiânia · Atendimento online
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={getWhatsappLink("agendar")}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center justify-center rounded-full bg-wine px-7 py-3.5 text-sm font-semibold text-cream shadow-sm transition-all hover:-translate-y-0.5 hover:bg-wine-deep hover:shadow-md"
            >
              Quero começar meu acompanhamento
            </a>
            <a
              href="#metodo"
              className="focus-ring inline-flex items-center justify-center gap-2 text-sm font-semibold text-green transition-colors hover:text-wine"
            >
              Conheça o eStrat+
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-[420px] justify-center lg:max-w-none">
          <div
            className="absolute bottom-0 right-1/2 h-[88%] w-[78%] translate-x-1/2 rounded-t-[220px] bg-gradient-to-b from-green-soft/25 via-taupe-soft to-taupe-soft lg:w-[85%]"
            aria-hidden
          />
          <Image
            src="/images/julia-vinho-cutout.png"
            alt="Júlia Pinheiro, nutricionista"
            width={1000}
            height={1500}
            priority
            sizes="(max-width: 1024px) 80vw, 40vw"
            className="relative z-10 h-auto w-full max-w-[380px] object-contain drop-shadow-[0_30px_40px_rgba(28,34,29,0.18)] lg:max-w-[440px]"
          />
        </div>
      </Container>
    </section>
  );
}
