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
      
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          Freelancer Tools
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Simple, privacy-first tools built to help freelancers manage the practical side of independent work. No unnecessary logins. Your data stays on your device.
        </p>
      </section>
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {toolsConfig.map((tool) => (
            <div key={tool.id} className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333333%-16px)]">
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
