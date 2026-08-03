import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import AppScreenshots from "@/components/home/AppScreenshots";
import FreeToolsSection from "@/components/home/FreeToolsSection";
import ComparisonSection from "@/components/home/ComparisonSection";
import FAQSection from "@/components/home/FAQSection";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata: Metadata = {
  title: "Tralance – Offline Freelance Finance Tracker",
  description: "Tralance is an offline-first income & expense tracker built for freelancers. 100% private, no cloud needed. Manage budgets, projects, and savings on your device",
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
