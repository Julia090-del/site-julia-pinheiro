import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhoIsItFor } from "@/components/WhoIsItFor";
import { Method } from "@/components/Method";
import { HowItWorks } from "@/components/HowItWorks";
import { MethodIncludes } from "@/components/MethodIncludes";
import { Testimonials } from "@/components/Testimonials";
import { Plans } from "@/components/Plans";
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
        <About />
        <WhoIsItFor />
        <Method />
        <HowItWorks />
        <MethodIncludes />
        {/* Depoimentos aparece automaticamente quando os prints reais forem adicionados */}
        <Testimonials />
        <Plans />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
