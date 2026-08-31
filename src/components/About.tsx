import Image from "next/image";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { siteConfig } from "@/config/site";

// Quando houver formação, cursos ou certificações para exibir, adicione aqui —
// a lista só aparece na página quando tiver pelo menos um item.
const CREDENTIALS: string[] = [];

export function About() {
  return (
    <section id="sobre" className="bg-cream-soft py-24 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-xs lg:max-w-none">
          <div
            className="absolute inset-x-6 bottom-0 top-10 rounded-[2.5rem] bg-green/10"
            aria-hidden
          />
          <Image
            src="/images/julia-blazer-preto-cutout.png"
            alt={`${siteConfig.fullName}, nutricionista`}
            width={900}
            height={1350}
            sizes="(max-width: 1024px) 70vw, 32vw"
            className="relative z-10 mx-auto h-auto w-full max-w-[320px] object-contain"
          />
        </Reveal>

        <Reveal delay={100}>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-wine">
            Sobre
            <span className="h-px w-6 bg-current" aria-hidden />
          </span>
          <h2 className="mt-5 font-serif text-3xl text-green sm:text-4xl">
            {siteConfig.fullName}
          </h2>
          <p className="mt-1 text-sm font-medium tracking-wide text-wine">
            Nutricionista · {siteConfig.crn}
          </p>

          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            O trabalho da Júlia parte de uma ideia simples: nutrição não
            deveria ser mais uma fonte de peso na rotina. Cada acompanhamento
            nasce da escuta ativa — hábitos, preferências, histórico e
            objetivos — transformados em uma estratégia aplicável ao dia a
            dia real de cada pessoa, sem abordagens genéricas.
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Esse é o raciocínio por trás do Método eStrat+: olhar para a
            pessoa como um todo, e não apenas para um número na balança.
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
