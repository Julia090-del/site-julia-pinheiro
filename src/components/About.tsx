import Image from "next/image";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { siteConfig } from "@/config/site";

// Quando houver formação, cursos ou certificações para exibir, adicione aqui —
// a lista só aparece na página quando tiver pelo menos um item.
const CREDENTIALS: string[] = [];

export function About() {
  return (
    <section id="sobre" className="bg-cream-soft py-14 sm:py-24 lg:py-28">
      <Container className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-[210px] sm:max-w-xs lg:max-w-none">
          <div
            className="absolute inset-x-6 bottom-0 top-10 rounded-[2.5rem] bg-green/10"
            aria-hidden
          />
          <Image
            src="/images/julia-blazer-preto-cutout.png"
            alt={`${siteConfig.fullName}, nutricionista`}
            width={900}
            height={1350}
            sizes="(max-width: 1024px) 50vw, 32vw"
            className="relative z-10 mx-auto h-auto w-full max-w-[210px] object-contain sm:max-w-[320px]"
          />
        </Reveal>

        <Reveal delay={100}>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-wine">
            Sobre
            <span className="h-px w-6 bg-current" aria-hidden />
          </span>
          <h2 className="mt-5 font-serif text-3xl text-green sm:text-4xl">
            Prazer, eu sou a Júlia.
          </h2>
          <p className="mt-1 text-sm font-medium tracking-wide text-wine">
            Nutricionista · {siteConfig.crn}
          </p>

          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            Sou nutricionista e acredito que uma alimentação saudável precisa
            caber na vida real.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Meu trabalho é entender sua rotina, seus objetivos e suas
            necessidades para construir uma estratégia nutricional
            individualizada, sem transformar a alimentação em um peso.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            No consultório, uno avaliação, estratégia e acompanhamento para
            que você saiba não apenas o que fazer, mas como tornar isso
            possível na sua rotina.
          </p>

          {CREDENTIALS.length > 0 && (
            <ul className="mt-8 space-y-2 border-t border-ink/10 pt-6">
              {CREDENTIALS.map((item) => (
                <li key={item} className="text-sm text-ink-soft">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
