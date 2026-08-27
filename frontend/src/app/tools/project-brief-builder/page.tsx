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
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4">Brief vs. Proposal vs. Contract</h3>
            <p>
              It is easy to confuse these three documents, but they each serve a distinct purpose in the freelance workflow:
            </p>
            <ul>
              <li><strong>The Brief</strong> defines the <em>problem</em>. It outlines exactly what needs to be built, the goals, the target audience, and the overall scope. It is often written by the client, or collaboratively during a discovery call.</li>
              <li><strong>The Proposal</strong> presents the <em>solution</em>. The freelancer writes this to explain how they plan to execute the brief, how long it will take, and how much it will cost.</li>
              <li><strong>The Contract</strong> is the <em>legal agreement</em>. Once the proposal is accepted, the contract formally binds both parties to the agreed terms, covering payment schedules, intellectual property, and liabilities.</li>
            </ul>
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

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4">A Realistic Scenario: Bad Brief vs. Good Brief</h3>
            <p>
              Imagine receiving a project inquiry with a vague brief like: <em>&quot;Build me a website like Apple.&quot;</em> This brief is useless. It provides no constraints, no context, and no clear deliverables. A freelancer cannot accurately estimate how many hours this will take or what the client considers a success.
            </p>
            <p>
              Contrast this with a useful, structured brief: <em>&quot;Design and build a 5-page e-commerce website on Shopify. Pages include: Home, About, Shop, Single Product, and Contact. The target audience is affluent millennials. The design should use a minimalist black-and-white aesthetic. We need the final site launched by October 15th, with a maximum budget of $4,000.&quot;</em>
            </p>
            <p>
              The second brief makes estimation, communication, and scope control dramatically easier. The freelancer knows exactly what is expected and can confidently write a proposal to match.
            </p>
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

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-10 mb-4">Using the Brief to Prevent Scope Creep</h3>
            <p>
              During a project, a client will often ask for significant additional work that wasn&apos;t initially discussed. This is called scope creep. If you don&apos;t have a brief, it&apos;s very difficult to push back because the boundaries of the project were never formally defined.
            </p>
            <p>
              For example, imagine you agreed to build the 5-page e-commerce site mentioned earlier. Halfway through the project, the client says, <em>&quot;Can we also add a custom forum where users can talk to each other?&quot;</em>
            </p>
            <p>
              Instead of doing the work for free or getting into an argument, you can simply refer back to the brief and reply professionally: <em>&quot;I would love to build out a custom forum for you! However, since a community forum wasn&apos;t included in our original project brief, it falls outside the current scope. I can put together a separate estimate for that feature, or we can tackle it in Phase 2 once the main site is launched.&quot;</em>
            </p>
            <p>
              Remember, while the brief cleanly documents the agreed project scope to prevent these issues, it is not a substitute for a legal contract. Always sign a contract before beginning work.
            </p>
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
