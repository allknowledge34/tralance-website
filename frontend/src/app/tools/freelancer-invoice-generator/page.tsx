import { Metadata } from "next";
import InvoiceClient from "./InvoiceClient";
import { ToolFAQ } from "@/components/tools/ToolFAQ";

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do I need special software to create an invoice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. While accounting software is helpful for large businesses, independent freelancers can perfectly manage their billing using a simple invoice generator and saving the resulting PDFs for their records."
        }
      },
      {
        "@type": "Question",
        "name": "What does \"Net 30\" mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "\"Net 30\" is a payment term meaning the client has 30 days from the date of the invoice to submit payment. Other common terms include Net 15, Net 60, or \"Due upon receipt\" (meaning payment is expected immediately)."
        }
      },
      {
        "@type": "Question",
        "name": "How do I number my invoices?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can use any sequential numbering system you prefer, as long as you don't use the same number twice. Many freelancers use the year followed by the invoice number (e.g., 2026-001, 2026-002) or the client's initials followed by a number (e.g., ACME-001)."
        }
      },
      {
        "@type": "Question",
        "name": "Does Tralance save my client's data?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Our invoice generator is entirely browser-based. When you type in your business details and your client's information, it stays locally on your device. We never see, transmit, or store your financial data."
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
      
      <InvoiceClient />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 border-t border-slate-200/60 dark:border-white/5">
        
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            The Freelancer&apos;s Guide to Professional Invoicing
          </h2>
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none text-slate-600 dark:text-slate-400">
            <p>
              An invoice is more than just a request for payment-it&apos;s a legally binding document and often the final professional interaction you have with a client during a project cycle. A clear, well-structured invoice reduces friction, prevents payment delays, and reinforces your reputation as a serious business owner.
            </p>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4">What Every Freelance Invoice Should Contain</h3>
            <p>To ensure you get paid on time without unnecessary back-and-forth, your invoice must clearly communicate exactly what is being billed, who is paying, and when payment is expected. At a minimum, include:</p>
            <ul className="mt-4 space-y-2">
              <li><strong>Invoice Number:</strong> A unique identifier (e.g., INV-2026-001) for accounting and tax purposes.</li>
              <li><strong>Your Business Information:</strong> Your name, business name, address, email, and tax ID if required in your jurisdiction.</li>
              <li><strong>Client Information:</strong> The client&apos;s exact company name, address, and the specific contact person handling the payment.</li>
              <li><strong>Itemized Services:</strong> A clear, line-by-line description of the work completed, along with quantities (or hours) and rates.</li>
              <li><strong>Taxes and Discounts:</strong> Clearly display any applied discounts or required sales tax / VAT.</li>
              <li><strong>Total Amount Due:</strong> The final, bolded total in the correct currency.</li>
              <li><strong>Payment Terms & Due Date:</strong> Explicit instructions on how to pay (bank transfer details, PayPal, Stripe link) and when the payment is due (e.g., &quot;Net 15&quot; or &quot;Due upon receipt&quot;).</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4">When to Send an Invoice</h3>
            <p>
              The timing of your invoice depends entirely on the agreement you signed with your client. Common invoicing schedules include:
            </p>
            <ul className="mt-4 space-y-2">
              <li><strong>Upfront (Deposit):</strong> Before work begins, usually 25% to 50% of the total project fee.</li>
              <li><strong>Milestone-Based:</strong> Sent after completing specific phases of a large project.</li>
              <li><strong>Upon Completion:</strong> Sent immediately after the final deliverables are approved.</li>
              <li><strong>Retainer / Recurring:</strong> Sent on a specific day every month (e.g., the 1st) for ongoing services.</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4">Common Invoicing Mistakes</h3>
            <p>
              Freelancers often experience delayed payments due to easily avoidable errors. The most common mistake is <strong>vagueness</strong>. If a line item just says &quot;Design Work - $500&quot;, the client&apos;s accounting department might push back asking for clarification. Instead, write &quot;Homepage UI Design - 10 hours @ $50/hr&quot;. 
            </p>
            <p>
              Another major mistake is <strong>forgetting payment instructions</strong>. Never assume the client knows how to pay you. Always include your bank routing details, SWIFT code, or a direct link to your payment gateway in the Notes or Terms section of the invoice.
            </p>
            
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4">Handling Late Payments</h3>
            <p>
              If a due date passes without payment, don&apos;t panic, but don&apos;t ignore it either. Follow a structured follow-up process:
            </p>
            <ol className="mt-4 space-y-2">
              <li><strong>Day 1 after due date:</strong> Send a polite, friendly reminder email. (Often, the client just forgot or the email slipped through the cracks).</li>
              <li><strong>Day 7 after due date:</strong> Send a firmer follow-up, attaching the invoice again.</li>
              <li><strong>Day 15 after due date:</strong> Call the client or their accounting department directly. Apply a late fee if it was stipulated in your original contract.</li>
            </ol>
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Frequently Asked Questions
          </h2>
          <ToolFAQ faqs={[
            {
              q: "Do I need special software to create an invoice?",
              a: "No. While accounting software is helpful for large businesses, independent freelancers can perfectly manage their billing using a simple invoice generator and saving the resulting PDFs for their records."
            },
            {
              q: "What does \"Net 30\" mean?",
              a: "\"Net 30\" is a payment term meaning the client has 30 days from the date of the invoice to submit payment. Other common terms include Net 15, Net 60, or \"Due upon receipt\" (meaning payment is expected immediately)."
            },
            {
              q: "How do I number my invoices?",
              a: "You can use any sequential numbering system you prefer, as long as you don't use the same number twice. Many freelancers use the year followed by the invoice number (e.g., 2026-001, 2026-002) or the client's initials followed by a number (e.g., ACME-001)."
            },
            {
              q: "Does Tralance save my client's data?",
              a: "No. Our invoice generator is entirely browser-based. When you type in your business details and your client's information, it stays locally on your device. We never see, transmit, or store your financial data."
            }
          ]} />
        </div>

      </section>
    </div>
  );
}
