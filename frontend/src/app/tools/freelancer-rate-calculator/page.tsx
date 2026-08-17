import { Metadata } from "next";
import CalculatorClient from "./CalculatorClient";
import { ToolFAQ } from "@/components/tools/ToolFAQ";

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why shouldn't I just charge what other freelancers are charging?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Other freelancers have different living expenses, different tax brackets, and different business models. If you base your rate on someone else's prices, you might end up operating at a loss. Always calculate your rate based on your own financial realities first."
        }
      },
      {
        "@type": "Question",
        "name": "Should I lower my rate to get my first clients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While it's common to start slightly lower to build a portfolio, dropping below your minimum calculated rate means you are effectively paying to work. If you must lower your rate, do so intentionally on a short-term basis, and raise it as soon as you have a few solid testimonials."
        }
      },
      {
        "@type": "Question",
        "name": "How much should I set aside for an emergency buffer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Freelance income can be unpredictable. Most financial advisors recommend independent workers maintain a liquid emergency fund covering 3 to 6 months of living expenses. Build a monthly contribution to this fund directly into your rate calculation."
        }
      },
      {
        "@type": "Question",
        "name": "Are platform fees really that important to include?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. If you work through a platform that takes a 20% cut, and you don't account for that in your pricing, you will instantly lose one-fifth of your expected income. Always pass platform fees onto your pricing structure."
        }
      }
    ]
  };

  return (
    <div className="bg-white dark:bg-[#030303] min-h-screen pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <CalculatorClient />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-200/60 dark:border-white/5">
        
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            The Complete Guide to Calculating Your Freelance Hourly Rate
          </h2>
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none text-slate-600 dark:text-slate-400">
            <p>
              One of the most common mistakes new freelancers make is setting their hourly rate by simply taking their desired annual salary and dividing it by 2,000 working hours. This approach completely ignores the realities of running an independent business. 
            </p>
            <p>
              As a freelancer, you don&apos;t just do the work-you are the marketing department, the accounting department, and the administrative staff. Your hourly rate must cover all of this non-billable time, plus your business expenses, taxes, and personal savings.
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4">Billable vs. Non-Billable Hours</h3>
            <p>
              <strong>Billable hours</strong> are the hours you actually spend working on client projects that generate revenue. <strong>Non-billable hours</strong> include pitching clients, sending proposals, updating your portfolio, accounting, and continuing education. Most successful freelancers find that only about 50% to 60% of their working hours are actually billable. Your rate must be high enough that those billable hours cover the cost of your non-billable time.
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4">A Realistic Worked Example</h3>
            <p>
              Let&apos;s look at a practical example of how to calculate a minimum sustainable rate. Imagine a freelance designer with the following financial reality:
            </p>
            <ul className="mt-4 space-y-2">
              <li><strong>Monthly Living Expenses:</strong> $3,000 (rent, groceries, utilities, health insurance)</li>
              <li><strong>Monthly Savings Goal:</strong> $500 (emergency fund, retirement, personal goals)</li>
              <li><strong>Business Expenses:</strong> $300 (software subscriptions, internet, marketing)</li>
              <li><strong>Taxes:</strong> ~25% (income and self-employment taxes)</li>
              <li><strong>Platform Fees:</strong> 10% (e.g., using a freelance marketplace)</li>
              <li><strong>Working Hours:</strong> 40 hours per week</li>
            </ul>
            <p className="mt-4">
              <strong>Step 1: Calculate Total Required Net Income</strong><br />
              Expenses ($3,000) + Savings ($500) + Business Expenses ($300) = <strong>$3,800 net income needed per month</strong>.
            </p>
            <p className="mt-4">
              <strong>Step 2: Adjust for Taxes and Fees</strong><br />
              Because taxes (25%) and platform fees (10%) take 35% of the gross income, the freelancer only keeps 65%. To find the gross revenue needed, divide the net income by 0.65:<br />
              $3,800 / 0.65 = <strong>$5,846 gross revenue needed per month</strong>.
            </p>
            <p className="mt-4">
              <strong>Step 3: Calculate Billable Hours</strong><br />
              Working 40 hours a week is roughly 160 hours a month. If only 60% of that time is billable (client work), the freelancer has about <strong>96 billable hours per month</strong>.
            </p>
            <p className="mt-4">
              <strong>Step 4: Determine the Minimum Hourly Rate</strong><br />
              Divide the gross revenue needed by the billable hours:<br />
              $5,846 / 96 hours = <strong>$60.89 per hour</strong>.
            </p>
            <p className="mt-4">
              In this scenario, if the freelancer charges anything less than $61 per hour, they will not meet their financial obligations. 
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4">How Experience Affects Pricing</h3>
            <p>
              The calculator provides your <em>minimum</em> baseline rate. However, as you gain experience, you become faster and more efficient. A task that used to take you 5 hours might now take 2 hours. If you continue charging the same hourly rate, your income will actually drop as you get better! As your expertise grows, you should transition from minimum hourly pricing to value-based pricing, project-based flat rates, or simply raise your hourly rate to reflect the premium quality and speed you provide.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <ToolFAQ faqs={[
            {
              q: "Why shouldn't I just charge what other freelancers are charging?",
              a: "Other freelancers have different living expenses, different tax brackets, and different business models. If you base your rate on someone else's prices, you might end up operating at a loss. Always calculate your rate based on your own financial realities first."
            },
            {
              q: "Should I lower my rate to get my first clients?",
              a: "While it's common to start slightly lower to build a portfolio, dropping below your minimum calculated rate means you are effectively paying to work. If you must lower your rate, do so intentionally on a short-term basis, and raise it as soon as you have a few solid testimonials."
            },
            {
              q: "How much should I set aside for an emergency buffer?",
              a: "Freelance income can be unpredictable. Most financial advisors recommend independent workers maintain a liquid emergency fund covering 3 to 6 months of living expenses. Build a monthly contribution to this fund directly into your rate calculation."
            },
            {
              q: "Are platform fees really that important to include?",
              a: "Yes. If you work through a platform that takes a 20% cut, and you don't account for that in your pricing, you will instantly lose one-fifth of your expected income. Always pass platform fees onto your pricing structure."
            }
          ]} />
        </div>

      </section>
    </div>
  );
}
