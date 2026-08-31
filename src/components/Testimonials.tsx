import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { Eyebrow } from "./Eyebrow";

// Ainda não há depoimentos reais de pacientes — este componente existe pronto
// para uso futuro, mas não é renderizado na página enquanto TESTIMONIALS
// estiver vazio. Nunca preencha com depoimentos fictícios.
export type Testimonial = {
  name: string;
  text: string;
};

const TESTIMONIALS: Testimonial[] = [];

export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="bg-cream py-24 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <Eyebrow className="justify-center">Depoimentos</Eyebrow>
          <h2 className="mt-5 font-serif text-3xl text-green sm:text-4xl">
            Quem já acompanha de perto
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Reveal key={t.name} className="rounded-3xl bg-cream-soft p-8">
              <p className="font-serif text-lg italic leading-relaxed text-ink">
                “{t.text}”
              </p>
              <p className="mt-5 text-sm font-semibold text-wine">{t.name}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
