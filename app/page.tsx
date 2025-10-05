import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import Security from "@/components/Security";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main>
      <Hero />
      <Pricing />
      <HowItWorks />
      <Security />
      <Contact />
      <Footer />
    </main>
  );
}
