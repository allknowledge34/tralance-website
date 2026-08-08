import { Metadata } from "next";
import InvoiceClient from "./InvoiceClient";

export const metadata: Metadata = {
  title: "Free Freelancer Invoice Generator | Tralance",
  description: "Create professional invoices instantly in your browser. No login required, no data collection. Clean, privacy-first invoice generator for freelancers.",
  alternates: {
    canonical: "/tools/freelancer-invoice-generator",
  },
};

export default function FreelancerInvoiceGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Freelancer Invoice Generator",
    "description": metadata.description,
    "operatingSystem": "Web browser",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="bg-[#FAFBFC] dark:bg-[#050505] min-h-screen transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InvoiceClient />
    </div>
  );
}
