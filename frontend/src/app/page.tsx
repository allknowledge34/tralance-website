import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import AppScreenshots from "@/components/home/AppScreenshots";
import FreeToolsSection from "@/components/home/FreeToolsSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Tralance – Workspace & Tools for Freelancers",
  description: "Tralance is a privacy-first workspace providing simple tools to help freelancers manage projects, briefs, contracts, invoices, and finances.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="flex-grow">
      <Hero />
      <FreeToolsSection />
      <AppScreenshots />
      <ComparisonSection />
      <FAQSection />
      <FinalCTA />
    </main>
  );
}
