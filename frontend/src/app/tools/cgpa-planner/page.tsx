import { Metadata } from "next";
import CgpaPlannerClient from "./CgpaPlannerClient";

export const metadata: Metadata = {
  title: "CGPA Planner – Semester Wise SGPA to CGPA Calculator",
  description: "Free Semester-wise CGPA Planner. Calculate CGPA from SGPA, monitor backlog impact, estimate your target CGPA, and plan future semesters. Works completely offline.",
  alternates: {
    canonical: "/tools/cgpa-planner",
  },
};

export default function CgpaPlannerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CGPA Planner",
    "operatingSystem": "Web browser",
    "applicationCategory": "EducationalApplication",
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
      <CgpaPlannerClient />
    </div>
  );
}
