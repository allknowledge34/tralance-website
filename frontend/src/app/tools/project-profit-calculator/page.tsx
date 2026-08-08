import { Metadata } from "next";

import ProfitClient from "./ProfitClient";

export const metadata: Metadata = {
  title: "Freelancer Project Profit Calculator | Tralance",
  description: "Calculate your actual take-home pay and effective hourly rate from freelance projects after accounting for platform fees, expenses, and taxes.",
  alternates: {
    canonical: "/tools/project-profit-calculator",
  },
};

export default function ProjectProfitCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Freelancer Project Profit Calculator",
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
        "name": "What is an effective hourly rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An effective hourly rate is how much you actually earn per hour worked, after deducting all fees, expenses, and taxes from the project price."
        }
      },
      {
        "@type": "Question",
        "name": "Does this calculator include platform fees?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. You can enter the specific percentage fee charged by your freelance platform (like Upwork or Fiverr) and payment processor (like Stripe or PayPal) to see exactly how much they take from your total revenue."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use different currencies?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, the calculator supports multiple major currencies including USD, EUR, GBP, INR, CAD, and AUD."
        }
      },
      {
        "@type": "Question",
        "name": "Does Tralance store my project information?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. The Freelancer Project Profit Calculator runs entirely in your web browser. No project data, pricing, or financial information is ever sent to or stored on our servers."
        }
      },
      {
        "@type": "Question",
        "name": "Is the tax calculation accurate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The tax calculation provides a simple percentage-based estimate of your taxable income (gross revenue minus deductible expenses). It does not account for complex local tax laws, deductions, or progressive tax brackets, and should not be used as official tax advice."
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

      {/* Hero Section */}
      <section className="pt-20 md:pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          Freelancer Project Profit Calculator
        </h1>
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          See what you actually take home from a freelance project after fees, expenses, and time.
        </p>
      </section>

      <ProfitClient />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-200/60 dark:border-white/5">
        
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            How the Project Profit Calculator Works
          </h2>
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none text-slate-600 dark:text-slate-400">
            <p>
              When quoting a project, the top-line number often looks great. But as a freelancer, you aren&apos;t an employee - you are a business. This means you absorb costs that quickly eat into your profit. Our calculator breaks it down in six simple steps:
            </p>
            <ol className="mt-4 space-y-2">
              <li><strong>Enter what the client is paying:</strong> The total gross revenue of the project.</li>
              <li><strong>Add your expected project hours:</strong> Include non-billable time like communication and revisions.</li>
              <li><strong>Add platform and payment fees:</strong> Account for Upwork/Fiverr cuts (often 10-20%) and Stripe/PayPal fees (often ~3%).</li>
              <li><strong>Add project-related expenses:</strong> Any software licenses, assets, or contractors you need to hire.</li>
              <li><strong>Optionally estimate taxes:</strong> Set aside a percentage for income and self-employment taxes.</li>
              <li><strong>See your estimated take-home and effective hourly rate:</strong> Find out what your time is actually worth.</li>
            </ol>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">What is an effective hourly rate?</h3>
              <p className="text-slate-600 dark:text-slate-400">An effective hourly rate is how much you actually earn per hour worked, after deducting all fees, expenses, and taxes from the project price.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Does this calculator include platform fees?</h3>
              <p className="text-slate-600 dark:text-slate-400">Yes. You can enter the specific percentage fee charged by your freelance platform (like Upwork or Fiverr) and payment processor (like Stripe or PayPal) to see exactly how much they take from your total revenue.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Can I use different currencies?</h3>
              <p className="text-slate-600 dark:text-slate-400">Yes, the calculator supports multiple major currencies including USD, EUR, GBP, INR, CAD, and AUD.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Does Tralance store my project information?</h3>
              <p className="text-slate-600 dark:text-slate-400">No. The Freelancer Project Profit Calculator runs entirely in your web browser. No project data, pricing, or financial information is ever sent to or stored on our servers.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Is the tax calculation accurate?</h3>
              <p className="text-slate-600 dark:text-slate-400">The tax calculation provides a simple percentage-based estimate of your taxable income (gross revenue minus deductible expenses). It does not account for complex local tax laws, deductions, or progressive tax brackets, and should not be used as official tax advice.</p>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}
