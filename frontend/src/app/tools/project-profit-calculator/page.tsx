import { Metadata } from "next";

import ProfitClient from "./ProfitClient";
import { ToolFAQ } from "@/components/tools/ToolFAQ";

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

        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            A Realistic Freelance Project Example
          </h2>
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none text-slate-600 dark:text-slate-400">
            <p>
              To understand the difference between gross revenue and actual profit, let&apos;s look at a realistic scenario. Imagine a freelancer lands a <strong>$1,500 website design project</strong> on a popular freelance platform. They estimate the project will take them 25 hours to complete.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">The Deductions</h3>
            <ul className="mt-4 space-y-2">
              <li><strong>Platform Fees:</strong> The freelance platform takes a 10% cut (<strong>-$150</strong>).</li>
              <li><strong>Payment Processing:</strong> The withdrawal method takes a 2% conversion/transfer fee (<strong>-$27</strong>).</li>
              <li><strong>Project Expenses:</strong> The freelancer needs to purchase a premium stock photo license and a premium font for this specific client (<strong>-$80</strong>).</li>
              <li><strong>Estimated Taxes:</strong> The freelancer sets aside 25% of their net profit (Gross minus expenses and fees) for income and self-employment taxes (<strong>-$310.75</strong>).</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">The Reality Check</h3>
            <p>
              After subtracting the $150 platform fee, the $27 payment fee, the $80 in expenses, and the $310.75 in taxes, the actual take-home profit is <strong>$932.25</strong>. 
            </p>
            <p>
              While the project was sold for $1,500 at an assumed rate of $60/hour ($1,500 / 25 hours), the <strong>effective hourly rate</strong>-the amount the freelancer actually gets to keep-is only <strong>$37.29 per hour</strong> ($932.25 / 25 hours).
            </p>
            <p>
              This is why calculating project profit is critical. If your minimum living expenses require you to earn $50 an hour, a $1,500 project might look sufficient at first glance, but you would actually be operating at a loss once the hidden costs are factored in.
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4">The Trap of Non-Billable Hours</h3>
            <p>
              Freelancers notoriously underestimate how much time a project actually takes. While you might only spend 15 hours designing, writing, or coding, you must also account for emails, client calls, writing proposals, onboarding, project management, and final handoffs. These administrative tasks are non-billable hours that still consume your time.
            </p>
            <p>
              For example, if you add just 5 hours of admin and communication time to a 20-hour project, your total time investment becomes 25 hours. This mathematically reduces your effective hourly rate by 20%, even though the core deliverables haven&apos;t changed. Always estimate and include administrative time in your project quotes.
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4">How to Quote for Profit (The Buffer Method)</h3>
            <p>
              To ensure you hit your target income, you must quote with a &quot;buffer&quot; that absorbs platform fees, payment processing, taxes, and unexpected minor expenses. You can use this calculator to reverse-engineer your quotes.
            </p>
            <p>
              For instance, if your goal is to take home $1,000 for a project, quoting exactly $1,000 means you will likely only keep around $650 after a 20% platform fee and a 15% estimated tax deduction. Instead, you need to quote closer to $1,475. This allows the platform and taxes to take their cut, leaving you with your desired $1,000. <em>(Note: Your exact buffer will depend on your specific overhead, local tax laws, and business structure.)</em>
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4">The Financial Impact of Scope Creep</h3>
            <p>
              Scope creep happens when a client asks for &quot;just one more small change&quot; outside the original agreement. Doing unpaid extra work is mathematically disastrous for your profit margins.
            </p>
            <p>
              If your take-home profit is $900 on a 20-hour project, your effective rate is $45/hr. If you spend 5 unpaid hours doing extra revisions, your project time jumps to 25 hours. Your profit is still $900, but your effective rate instantly drops to $36/hr. To protect your profitability, use the Project Profit Calculator to determine your true rate, track your hours carefully, and always charge appropriately for work that falls outside the agreed scope.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <ToolFAQ faqs={[
            {
              q: "What is an effective hourly rate?",
              a: "An effective hourly rate is how much you actually earn per hour worked, after deducting all fees, expenses, and taxes from the project price."
            },
            {
              q: "Does this calculator include platform fees?",
              a: "Yes. You can enter the specific percentage fee charged by your freelance platform (like Upwork or Fiverr) and payment processor (like Stripe or PayPal) to see exactly how much they take from your total revenue."
            },
            {
              q: "Can I use different currencies?",
              a: "Yes, the calculator supports multiple major currencies including USD, EUR, GBP, INR, CAD, and AUD."
            },
            {
              q: "Does Tralance store my project information?",
              a: "No. The Freelancer Project Profit Calculator runs entirely in your web browser. No project data, pricing, or financial information is ever sent to or stored on our servers."
            },
            {
              q: "Is the tax calculation accurate?",
              a: "The tax calculation provides a simple percentage-based estimate of your taxable income (gross revenue minus deductible expenses). It does not account for complex local tax laws, deductions, or progressive tax brackets, and should not be used as official tax advice."
            }
          ]} />
        </div>

      </section>
    </div>
  );
}
