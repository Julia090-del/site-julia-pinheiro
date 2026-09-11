import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/cn";
import { getWhatsappLink } from "@/config/site";

const PLANS = [
  {
    id: "mensal" as const,
    name: "Mensal",
    caption: "Para começar com encontros frequentes",
    description:
      "Indicado para quem está iniciando o acompanhamento e quer construir a eStratégia com proximidade e ajustes recorrentes.",
    items: ["Consulta mensal", "Plano alimentar individualizado", "Suporte contínuo pelo WhatsApp"],
    highlighted: false,
  },
  {
    id: "trimestral" as const,
    name: "Trimestral",
    caption: "Equilíbrio entre consistência e evolução",
    description:
      "Um intervalo pensado para observar a evolução da eStratégia com mais consistência e menos interrupções.",
    items: ["Acompanhamento de 3 meses", "Ajustes ao longo do trimestre", "Suporte contínuo pelo WhatsApp"],
    highlighted: true,
  },
  {
    id: "semestral" as const,
    name: "Semestral",
    caption: "Para consolidar resultados no longo prazo",
    description:
      "Indicado para quem busca continuidade e a consolidação de hábitos e resultados ao longo de um período mais longo.",
    items: ["Acompanhamento de 6 meses", "eStratégia de longo prazo", "Suporte contínuo pelo WhatsApp"],
    highlighted: false,
  },
];

export function Plans() {
  return (
    <section id="acompanhamento" className="bg-cream py-14 sm:py-24">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <Eyebrow className="justify-center">Modalidades</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl font-semibold text-green sm:text-4xl">
            Acompanhamento nutricional
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft">
            Três formatos de acompanhamento contínuo. A diferença principal
            está no período — fale com a Júlia pelo WhatsApp para entender
            qual se encaixa melhor no seu momento.
          </p>
        </Reveal>

        <div className="-mx-6 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {PLANS.map((plan, i) => (
            <Reveal
              key={plan.id}
              delay={i * 90}
              className="w-[82vw] shrink-0 snap-center sm:w-[360px] lg:w-auto"
            >
              <div
                className={cn(
                  "flex h-full flex-col rounded-3xl border p-8 transition-shadow",
                  plan.highlighted
                    ? "border-wine/30 bg-cream-soft shadow-[0_20px_45px_-25px_rgba(122,38,52,0.35)] lg:-translate-y-3"
                    : "border-ink/10 bg-cream hover:shadow-[0_20px_45px_-30px_rgba(28,34,29,0.25)]"
                )}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-flex w-fit rounded-full bg-wine/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-wine">
                    Opção intermediária
                  </span>
                )}
                <h3 className="font-serif text-2xl font-semibold text-green">{plan.name}</h3>
                <p className="mt-1 text-sm font-medium text-wine">
                  {plan.caption}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {plan.description}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-green" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsappLink(plan.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "focus-ring mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors",
                    plan.highlighted
                      ? "bg-wine text-cream hover:bg-wine-deep"
                      : "bg-green/10 text-green hover:bg-green hover:text-cream"
                  )}
                >
                  Agendar consulta
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
