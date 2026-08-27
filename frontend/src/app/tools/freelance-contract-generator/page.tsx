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
          "text": "A freelance contract is a legally binding agreement between a freelancer and a client that outlines the scope of work, payment terms, deadlines, intellectual property ownership, and other important project details."
        }
      },
      {
        "@type": "Question",
        "name": "Are generated contracts legally binding?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Once both you and your client sign the contract (either physically or via a digital signature tool), it generally becomes a legally binding agreement. However, as laws vary by region, this generated template should be reviewed by legal counsel for complex or high-value projects."
        }
      },
      {
        "@type": "Question",
        "name": "Can I save the contract as a PDF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Once you have filled out your details, simply click the 'Print / Save as PDF' button. Your browser will open the native print dialog where you can choose 'Save as PDF'."
        }
      },
      {
        "@type": "Question",
        "name": "Is my contract data stored or tracked?",
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
          "text": "Yes, you have full control over the payment structure, revision limits, intellectual property terms, confidentiality agreements, and cancellation policies using the tool's settings."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to create an account?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, you do not need to create an account, log in, or provide your email to use the contract generator. It is completely free and open for immediate use."
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
          <div className="prose prose-slate dark:prose-invert prose-lg max-w-none text-slate-600 dark:text-slate-400">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-0">
              How to Create a Freelance Contract
            </h2>
            <p>
              Starting a new freelance project is exciting, but doing the work without a proper agreement in place is risky. A clear contract protects both you and your client by setting expectations from day one. Here is how to use our generator:
            </p>
            <ol className="mt-4 mb-12 space-y-2">
              <li><strong>Enter your details:</strong> Add your business name, email, and address.</li>
              <li><strong>Add client information:</strong> Specify who the contract is for.</li>
              <li><strong>Define the project:</strong> Clearly outline the scope of services and delivery dates to avoid scope creep.</li>
              <li><strong>Set payment terms:</strong> Decide if you want full payment, a 50/50 split, or custom milestones.</li>
              <li><strong>Review the agreement:</strong> The live preview on the right will update immediately as you type.</li>
              <li><strong>Print or save as PDF:</strong> Once you are satisfied, hit the print button to generate a clean, professional PDF document ready for signatures.</li>
            </ol>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-12">
              When Should Freelancers Use a Contract?
            </h2>
            <p>
              You should use a contract for <strong>every single project</strong>, regardless of size or budget. Whether you are building a full web application for a new startup or designing a single logo for a friend's business, a contract removes ambiguity. It transforms a loose conversation into a professional, legally-binding relationship. If a client refuses to sign a basic freelance contract, consider that a massive red flag.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-12">
              What Every Freelance Contract Should Cover
            </h2>
            <p>
              A solid freelance contract doesn't need to be filled with dense legal jargon, but it does need to cover the foundational pillars of the project:
            </p>
            <ul>
              <li><strong>Parties Involved:</strong> Who is hiring who? Include full legal names and addresses.</li>
              <li><strong>Scope of Work:</strong> Exactly what deliverables are expected, and by when.</li>
              <li><strong>Payment Terms:</strong> How much, when, and how will you be paid.</li>
              <li><strong>Revisions:</strong> How many rounds of feedback are included.</li>
              <li><strong>Intellectual Property:</strong> Who owns the final work, and when does ownership transfer.</li>
              <li><strong>Termination:</strong> How either party can cancel the project and what happens to the money.</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-12">
              Understanding Payment Terms
            </h2>
            <p>
              Never start work without an initial deposit. Standard payment structures include:
            </p>
            <ul>
              <li><strong>50/50 Split:</strong> 50% paid upfront to secure your time, and 50% paid upon final delivery. This is the gold standard for most medium-sized projects.</li>
              <li><strong>Milestone Payments:</strong> For larger projects (e.g., 25% upfront, 25% after design approval, 25% after development, 25% at launch).</li>
              <li><strong>Net 15 / Net 30:</strong> This means the client has 15 or 30 days to pay the invoice after it is issued. As a freelancer, you should aim for Net 15 or "Due upon receipt" to maintain healthy cash flow.</li>
            </ul>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-12">
              Scope, Revisions, and Scope Creep
            </h2>
            <p>
              "Scope creep" happens when a client continuously asks for "one more small change" until the project balloons out of control. Your contract must explicitly state what is included. For example, instead of writing "Design a website," write "Design a 5-page website (Home, About, Services, Blog, Contact)." 
            </p>
            <p>
              Always define how many revision rounds are included (usually 2 or 3). State clearly that any additional revisions or features outside the original scope will be billed at your standard hourly rate.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-12">
              Intellectual Property & Ownership
            </h2>
            <p>
              In the freelance world, the creator (you) generally owns the copyright to the work until it is transferred in writing. A professional contract usually states that intellectual property rights transfer to the client <strong>only after full payment is received</strong>. If the client cancels the project halfway through or refuses to pay the final invoice, they cannot legally use the draft work you created.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-12">
              Confidentiality
            </h2>
            <p>
              Clients often share sensitive business information, passwords, or unreleased product details with you. A standard confidentiality clause (often acting as a lightweight NDA) assures the client that you will not leak their trade secrets or share their private data with competitors. 
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-12">
              Cancellation and Termination
            </h2>
            <p>
              Sometimes projects just don't work out. A termination clause explains how either party can walk away safely. Typically, it requires written notice (e.g., 7 or 14 days) and guarantees that you will be paid for the work completed up to the date of cancellation. It also clarifies that initial deposits are non-refundable to cover the time you reserved for the client.
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-12">
              A Realistic Scenario
            </h2>
            <p>
              Imagine you are hired to write 4 blog posts for a tech company. The agreed price is $1,000. You send a contract specifying a 50% deposit ($500) and 2 rounds of revisions. 
            </p>
            <p>
              After delivering the drafts, the client asks you to completely rewrite two posts to target a different audience. Because your contract clearly defined the scope and limited revisions, you can point back to the agreement and calmly state: <em>"I'd be happy to rewrite these with the new target audience in mind, but since this is a change to our original scope, I will need to quote an additional $250 for the extra work."</em>
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 mt-12">
              Common Contract Mistakes
            </h2>
            <ul>
              <li><strong>Vague Deliverables:</strong> "Create marketing materials" is too vague. Specify exact quantities, formats, and sizes.</li>
              <li><strong>Missing Late Fees:</strong> Clients pay faster when they know a 1.5% monthly late fee applies to overdue invoices.</li>
              <li><strong>Starting Without a Signature:</strong> A verbal agreement is notoriously difficult to enforce. Get it signed before you open your laptop.</li>
            </ul>

            <div className="bg-slate-100 dark:bg-white/5 p-6 rounded-xl mt-12 border border-slate-200 dark:border-white/10">
              <p className="text-sm m-0 text-slate-500 dark:text-slate-400">
                <strong>Disclaimer:</strong> The Tralance Freelance Contract Generator provides a general template designed for common freelance situations. We are not a law firm, and this tool does not constitute official legal advice. Depending on your jurisdiction and the complexity of your project, you may want to consult with a licensed attorney to ensure your contract is fully enforceable.
              </p>
            </div>
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
