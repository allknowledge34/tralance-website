import { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";

export const metadata: Metadata = {
  title: "Freelancer Hourly Rate Calculator | Tralance",
  description: "Calculate the minimum hourly rate you should charge based on your monthly expenses, savings goal, taxes, platform fees, and working schedule.",
  alternates: {
    canonical: "/tools/freelancer-rate-calculator",
  },
};

export default function FreelancerRateCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Freelancer Hourly Rate Calculator",
    "operatingSystem": "Web browser",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="bg-white dark:bg-[#030303] min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CalculatorClient />
    </div>
  );
}
