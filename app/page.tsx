import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Integrations } from "@/components/landing/Integrations";
import { TrustedBy } from "@/components/landing/TrustedBy";
import { Features } from "@/components/landing/Features";
import { DashboardShowcase } from "@/components/landing/DashboardShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { WhyShopPilot } from "@/components/landing/WhyShopPilot";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#F3F1EA] antialiased">
      <Navbar />
      <Hero />
      <Integrations />
      <TrustedBy />
      <Features />
      <DashboardShowcase />
      <HowItWorks />
      <WhyShopPilot />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}