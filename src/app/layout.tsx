import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { siteConfig } from "@/config/site";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Júlia Pinheiro | Nutricionista em Goiânia e Online",
    template: "%s | Júlia Pinheiro Nutricionista",
  },
  description:
    "Acompanhamento nutricional personalizado com Júlia Pinheiro para emagrecimento, hipertrofia, saúde intestinal, saúde feminina e qualidade de vida. Atendimento em Goiânia e online.",
  keywords: [
    "nutricionista Goiânia",
    "nutricionista online",
    "acompanhamento nutricional",
    "emagrecimento",
    "hipertrofia",
    "saúde feminina",
    "Método eStrat+",
  ],
  authors: [{ name: siteConfig.fullName }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    siteName: "Júlia Pinheiro Nutricionista",
    title: "Júlia Pinheiro | Nutricionista em Goiânia e Online",
    description:
      "Acompanhamento nutricional personalizado e estratégico com o Método eStrat+. Atendimento presencial em Goiânia e online.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Júlia Pinheiro Nutricionista" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Júlia Pinheiro | Nutricionista em Goiânia e Online",
    description:
      "Acompanhamento nutricional personalizado e estratégico com o Método eStrat+. Atendimento presencial em Goiânia e online.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#faf6ee",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    jobTitle: "Nutricionista",
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Goiânia",
      addressRegion: "GO",
      addressCountry: "BR",
    },
    sameAs: [siteConfig.instagramUrl],
    worksFor: {
      "@type": "MedicalBusiness",
      name: "Júlia Pinheiro Nutricionista",
      medicalSpecialty: "Nutrition",
    },
  };

  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="min-h-svh bg-cream font-sans text-ink antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
