import React from 'react';
import { Metadata } from 'next';
import PricingSection from "@/components/home/PricingSection";
import PageTracker from "@/components/analytics/PageTracker";
import PricingFAQ from "@/components/pricing/PricingFAQ";

export const metadata: Metadata = {
  title: 'Pricing | Simple Plans for Freelancers',
  description: 'Start small with Tralance. Get practical freelance tools, templates, and workflows. Upgrade when you need unlimited PDF generation and saved work.',
};

export default function PricingPage() {
  return (
    <main className="flex-grow pb-20 bg-white dark:bg-[#0B1020] relative z-10">
      <PageTracker eventName="pricing_view" />

      <PricingSection />

      <PricingFAQ />
    </main>
  );
}
