import { Metadata } from "next";

import ContractClient from "./ContractClient";
import { ToolFAQ } from "@/components/tools/ToolFAQ";

export const metadata: Metadata = {
  title: "Free Freelance Contract Generator | Tralance",
  description: "Create a professional freelance contract in minutes. Add client, project, payment, revision, and ownership terms, then print or save your contract as a PDF.",
  alternates: {
    canonical: "/tools/freelance-contract-generator",
  },
};

export default function FreelanceContractGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Freelance Contract Generator",
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
        "name": "What is a freelance contract?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A freelance contract is a legally binding agreement between a freelancer and a client that outlines the scope of work, payment terms, deadlines, and other important project details."
        }
      },
      {
        "@type": "Question",
        "name": "Can I save the contract as a PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, once you have filled out your details, simply click the 'Print / Save as PDF' button. Your browser will open the print dialog where you can choose 'Save as PDF'."
        }
      },
      {
        "@type": "Question",
        "name": "Is my contract data stored?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The Freelance Contract Generator runs entirely in your web browser. No client data, project details, or personal information is ever sent to or stored on our servers."
        }
      },
      {
        "@type": "Question",
        "name": "Can I customize the contract terms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you have full control over the payment structure, revision limits, intellectual property terms, confidentiality agreements, and cancellation policies."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to create an account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, you do not need to create an account or log in to use the contract generator. It is 100% free and open to use immediately."
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
          Free Freelance Contract Generator
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          Create a professional freelance contract in minutes. Add client, project, payment, revision, and ownership terms, then print or save your contract as a PDF.
        </p>
      </section>

      <ContractClient />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-200/60 dark:border-white/5 print:hidden">
        
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            How to Create a Freelance Contract
          </h2>
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none text-slate-600 dark:text-slate-400">
            <p>
              Starting a new freelance project is exciting, but doing the work without a proper agreement in place is risky. A clear contract protects both you and your client by setting expectations from day one. Here is how to use our generator:
            </p>
            <ol className="mt-4 space-y-2">
              <li><strong>Enter your details:</strong> Add your business name, email, and address.</li>
              <li><strong>Add client information:</strong> Specify who the contract is for.</li>
              <li><strong>Define the project:</strong> Clearly outline the scope of services and delivery dates to avoid scope creep.</li>
              <li><strong>Set payment terms:</strong> Decide if you want full payment, a 50/50 split, or custom milestones.</li>
              <li><strong>Review the agreement:</strong> The live preview on the right will update immediately as you type.</li>
              <li><strong>Print or save as PDF:</strong> Once you are satisfied, hit the print button to generate a clean, professional PDF document ready for signatures.</li>
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
