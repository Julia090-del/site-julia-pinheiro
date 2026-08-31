import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Identification } from "@/components/Identification";
import { Method } from "@/components/Method";
import { HowItWorks } from "@/components/HowItWorks";
import { Plans } from "@/components/Plans";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { PresentialOnline } from "@/components/PresentialOnline";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Identification />
        <Method />
        <HowItWorks />
        <Plans />
        <About />
        {/* Testimonials será exibido automaticamente quando houver depoimentos reais */}
        <Testimonials />
        <PresentialOnline />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
