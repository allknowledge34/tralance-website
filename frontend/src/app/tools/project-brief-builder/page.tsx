import { Metadata } from "next";

import BriefClient from "./BriefClient";
import { ToolFAQ } from "@/components/tools/ToolFAQ";

export const metadata: Metadata = {
  title: "Freelance Project Brief Builder | Tralance",
  description: "Create a clear freelance project brief with requirements, deliverables, timeline, budget, and project details. Built for clients and freelancers.",
  alternates: {
    canonical: "/tools/project-brief-builder",
  },
};

export default function ProjectBriefBuilderPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Freelance Project Brief Builder",
    "description": metadata.description,
    "operatingSystem": "Web browser",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a freelance project brief?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A freelance project brief is a structured document that clearly outlines a project's goals, requirements, deliverables, timelines, and budget, ensuring the client and freelancer have a shared understanding before work starts."
        }
      },
      {
        "@type": "Question",
        "name": "Who should create the project brief?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Either party can create it. Clients often use a brief to explain what they need to potential freelancers. Freelancers use briefs to document exactly what they will deliver before they send a contract."
        }
      },
      {
        "@type": "Question",
        "name": "Is a project brief the same as a contract?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. A brief outlines the technical and creative expectations for the work. A contract is a legally binding agreement covering ownership, liability, and payment terms."
        }
      },
      {
        "@type": "Question",
        "name": "Can a client create the brief?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. This tool is designed to help clients who have an idea but need a structured way to explain it to a professional."
        }
      },
      {
        "@type": "Question",
        "name": "Can I save the brief as a PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can click 'Print / Save as PDF' to format the brief as a clean, professional document."
        }
      },
      {
        "@type": "Question",
        "name": "Is my project information stored?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The Project Brief Builder runs entirely in your web browser. No project details, budgets, or ideas are ever sent to our servers."
        }
      },
      {
        "@type": "Question",
        "name": "Can I edit the brief after creating it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the live preview updates immediately as you edit the form on the left. Once you close the tab, however, the data is cleared to protect your privacy."
        }
      }
    ]
  };

  return (
    <div className="bg-[#FAFBFC] dark:bg-[#050505] min-h-screen transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="pt-20 md:pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center print:hidden">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          Freelance Project Brief Builder
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          Turn your project idea into a clear brief that both clients and freelancers can understand.
        </p>
      </section>
      <BriefClient />
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-200/60 dark:border-white/5 print:hidden">
        
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            What Is a Project Brief?
          </h2>
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none text-slate-600 dark:text-slate-400">
            <p>
              A project brief is a structured document that gives clients and freelancers one shared understanding of what needs to be done. It acts as the blueprint for the project, translating vague ideas into specific requirements, deliverables, and timelines.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Why Project Briefs Matter
          </h2>
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none text-slate-600 dark:text-slate-400">
            <p>Whether you are hiring a professional or doing the work yourself, diving into a project without a brief often leads to problems. Taking ten minutes to write a brief ensures:</p>
            <ul className="mt-4 space-y-2">
              <li><strong>Clearer expectations:</strong> Everyone knows exactly what success looks like.</li>
              <li><strong>Fewer misunderstandings:</strong> Requirements are documented instead of assumed.</li>
              <li><strong>Easier project planning:</strong> Breaking the work into milestones becomes much easier.</li>
              <li><strong>Clearer deliverables:</strong> You know exactly what files or assets change hands at the end.</li>
              <li><strong>Fewer scope-related disagreements:</strong> If it isn&apos;t in the brief, it&apos;s a new request that requires a new budget.</li>
            </ul>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            How to Create a Good Project Brief
          </h2>
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none text-slate-600 dark:text-slate-400">
            <ol className="space-y-4">
              <li><strong>Explain the goal:</strong> Start with the &quot;why&quot;. Why is this project happening, and what business problem does it solve?</li>
              <li><strong>List the requirements:</strong> What specific features or functional necessities must the final product have?</li>
              <li><strong>Define deliverables:</strong> What tangible assets (e.g. source code, a PDF, a live website) will be handed over?</li>
              <li><strong>Add references:</strong> Include links to competitors, inspiration, or previous work so everyone understands the desired aesthetic.</li>
              <li><strong>Set a realistic timeline:</strong> Establish the target start and end dates.</li>
              <li><strong>Clarify revisions and communication:</strong> Agree on how feedback will be given and through which channels (e.g. Slack vs Email).</li>
              <li><strong>Add the budget:</strong> If appropriate, set the financial constraints so expectations align immediately.</li>
            </ol>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <ToolFAQ faqs={faqSchema.mainEntity.map((faq: any) => ({ q: faq.name, a: faq.acceptedAnswer.text }))} />
        </div>

      </section>
    </div>
  );
}
