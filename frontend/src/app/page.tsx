import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FreeToolsSection from "@/components/home/FreeToolsSection";
import PricingSection from "@/components/home/PricingSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Tralance – Freelance Tools & Workspace",
  description: "Tralance provides simple tools to help freelancers manage projects, briefs, contracts, invoices, and finances.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <FreeToolsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
