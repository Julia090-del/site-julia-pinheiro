import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { getWhatsappLink, siteConfig } from "@/config/site";

export function PresentialOnline() {
  return (
    <section className="bg-cream py-24 sm:py-28">
      <Container className="mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow className="justify-center">Onde acontece</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl text-green sm:text-4xl">
            Presencial em Goiânia ou online, de onde você estiver
          </h2>
        </Reveal>

        <Reveal delay={80} className="mt-12 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-ink/10 bg-cream-soft p-8 text-left">
            <h3 className="font-serif text-lg text-green">Presencial</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Atendimento presencial em {siteConfig.location}, com consulta
              completa e acompanhamento próximo.
            </p>
          </div>
          <div className="rounded-2xl border border-ink/10 bg-cream-soft p-8 text-left">
            <h3 className="font-serif text-lg text-green">Online</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Acompanhamento nutricional completo à distância, para quem
              prefere se cuidar de onde estiver.
            </p>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <a
            href={getWhatsappLink("agendar")}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-10 inline-flex items-center justify-center rounded-full bg-green px-7 py-3.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-green-deep"
          >
            Agendar meu acompanhamento
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
