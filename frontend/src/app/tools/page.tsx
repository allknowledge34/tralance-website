import { Metadata } from "next";
import { toolsConfig } from "@/lib/tools/config";
import { ToolCard } from "@/components/tools/ToolCard";

export const metadata: Metadata = {
  title: "Freelancer Tools | Tralance",
  description: "Simple, privacy-first tools built to help freelancers manage the practical side of independent work.",
  alternates: {
    canonical: "/tools",
  },
};

export default function ToolsHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Freelancer Tools",
    "description": metadata.description,
    "url": "https://tralance.pro/tools"
  };

  return (
    <div className="bg-[#FAFBFC] dark:bg-[#050505] min-h-screen pb-24 transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          Freelancer Tools
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Simple, privacy-first tools built to help freelancers manage the practical side of independent work. No unnecessary logins. Your data stays on your device.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsConfig.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </div>
  );
}
