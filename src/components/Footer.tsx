import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-green-deep py-14">
      <Container className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Image
            src="/images/logo-jp.png"
            alt="Júlia Pinheiro"
            width={30}
            height={45}
            className="h-8 w-auto"
          />
          <div>
            <p className="font-serif text-lg text-cream">
              {siteConfig.fullName}
            </p>
            <p className="text-sm text-cream-soft/70">
              Nutricionista · {siteConfig.crn}
            </p>
          </div>
        </div>

        <div className="text-sm text-cream-soft/70">
          <p>{siteConfig.location}</p>
          <p>Atendimento presencial e online</p>
        </div>

        <nav className="flex flex-col items-center gap-2 text-sm sm:items-end">
          <a
            href={siteConfig.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring text-cream-soft/80 transition-colors hover:text-cream"
          >
            Instagram · {siteConfig.instagramHandle}
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring text-cream-soft/80 transition-colors hover:text-cream"
          >
            WhatsApp · {siteConfig.phoneDisplay}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="focus-ring text-cream-soft/80 transition-colors hover:text-cream"
          >
            {siteConfig.email}
          </a>
        </nav>
      </Container>

      <p className="mt-10 text-center text-xs text-cream-soft/40">
        © {new Date().getFullYear()} {siteConfig.fullName} — {siteConfig.crn}
      </p>
    </footer>
  );
}
