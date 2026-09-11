"use client";

import { useState, type FormEvent } from "react";
import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";
import { getWhatsappLink, siteConfig } from "@/config/site";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-2 w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 transition-colors focus:border-green focus:outline-none focus:ring-1 focus:ring-green";

const labelClass = "block text-sm font-medium text-green";

export function PreConsultForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!siteConfig.formspreeEndpoint) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(siteConfig.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="pre-consulta" className="bg-cream py-14 sm:py-24">
        <Container className="max-w-xl">
          <Reveal className="rounded-3xl border border-green/15 bg-cream-soft p-8 text-center sm:p-12">
            <h2 className="font-serif text-2xl text-green sm:text-3xl">
              Recebido!
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft sm:text-base">
              Suas informações chegaram até a Júlia. Ela vai analisar com
              calma e entrar em contato em breve.
            </p>
            <a
              href={getWhatsappLink("preconsulta")}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-green px-7 py-3.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-green-deep"
            >
              Falar no WhatsApp agora
            </a>
          </Reveal>
        </Container>
      </section>
    );
  }

  return (
    <section id="pre-consulta" className="bg-cream py-14 sm:py-24">
      <Container className="max-w-xl">
        <Reveal className="text-center">
          <Eyebrow className="justify-center">Pré-consulta</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl text-green sm:text-4xl">
            Vamos começar?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-base">
            Quero entender um pouco mais sobre você, seus objetivos e o que
            busca no acompanhamento nutricional.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-5 rounded-3xl border border-ink/10 bg-cream-soft p-6 sm:p-8"
          >
            <input
              type="hidden"
              name="_subject"
              value="Nova pré-consulta pelo site"
            />

            <div>
              <label htmlFor="nome" className={labelClass}>
                Nome completo *
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                required
                autoComplete="name"
                placeholder="Seu nome"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="whatsapp" className={labelClass}>
                WhatsApp *
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                required
                autoComplete="tel"
                placeholder="(62) 99999-9999"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="objetivo" className={labelClass}>
                Você busca acompanhamento para: *
              </label>
              <select
                id="objetivo"
                name="objetivo"
                required
                defaultValue=""
                className={fieldClass}
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>
                <option value="Emagrecimento">Emagrecimento</option>
                <option value="Composição corporal / estética">
                  Composição corporal / estética
                </option>
                <option value="Hipertrofia / performance">
                  Hipertrofia / performance
                </option>
                <option value="Saúde e qualidade de vida">
                  Saúde e qualidade de vida
                </option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div>
              <label htmlFor="formato" className={labelClass}>
                Prefere atendimento presencial ou online? *
              </label>
              <select
                id="formato"
                name="formato"
                required
                defaultValue=""
                className={fieldClass}
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>
                <option value="Presencial">Presencial</option>
                <option value="Online">Online</option>
                <option value="Ainda não decidi">Ainda não decidi</option>
              </select>
            </div>

            <div>
              <label htmlFor="observacoes" className={labelClass}>
                O que você gostaria de melhorar hoje na sua alimentação ou
                rotina?{" "}
                <span className="font-normal text-ink-soft">(opcional)</span>
              </label>
              <textarea
                id="observacoes"
                name="observacoes"
                rows={3}
                placeholder="Conte um pouco..."
                className={`${fieldClass} resize-none`}
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-wine">
                Não conseguimos enviar agora. Tente novamente em instantes ou
                fale direto pelo{" "}
                <a
                  href={getWhatsappLink("preconsulta")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                >
                  WhatsApp
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-wine px-7 py-3.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:bg-wine-deep disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {status === "submitting"
                ? "Enviando..."
                : "Quero iniciar meu acompanhamento →"}
            </button>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
