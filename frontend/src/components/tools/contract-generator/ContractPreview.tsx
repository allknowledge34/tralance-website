"use client";

import React from "react";
import { ContractData } from "@/types/contract-generator";
import { formatCurrency } from "@/lib/tools/profit-calculator/calculations";

interface ContractPreviewProps {
  data: ContractData;
}

export function ContractPreview({ data }: ContractPreviewProps) {
  return (
    <div className="bg-white text-black border border-slate-200 p-8 md:p-12 shadow-sm rounded-xl print:w-full print:border-none print:shadow-none print:m-0 print:p-0">
      
      {/* Header */}
      <div className="text-center mb-10 border-b-2 border-black pb-6">
        <h1 className="text-2xl font-bold uppercase tracking-widest">{data.contractTitle || "Freelance Service Agreement"}</h1>
        <div className="mt-4 text-sm flex justify-between px-4 text-slate-600">
          <span><strong>Contract No:</strong> {data.contractNumber || "_______________"}</span>
          <span><strong>Effective Date:</strong> {data.agreementDate || "_______________"}</span>
        </div>
      </div>

      <div className="space-y-8 text-[15px] leading-relaxed">
        
        {/* 1. Parties */}
        <section>
          <h2 className="font-bold text-lg mb-3 uppercase tracking-wide">1. The Parties</h2>
          <p>
            This Agreement is entered into on <strong>{data.agreementDate || "[Date]"}</strong>, by and between:
          </p>
          <div className="grid grid-cols-2 gap-8 mt-4 pl-4 border-l-2 border-slate-200">
            <div>
              <p className="font-bold">Freelancer:</p>
              <p>{data.freelancerName || "[Freelancer Name]"}</p>
              <p>{data.freelancerAddress}</p>
              <p>{data.freelancerEmail || "[Email]"}</p>
              <p>{data.freelancerPhone}</p>
            </div>
            <div>
              <p className="font-bold">Client:</p>
              <p>{data.clientName || "[Client Name]"}</p>
              <p>{data.clientAddress}</p>
              <p>{data.clientEmail || "[Email]"}</p>
              <p>{data.clientPhone}</p>
            </div>
          </div>
        </section>

        {/* 2. Services */}
        <section>
          <h2 className="font-bold text-lg mb-3 uppercase tracking-wide">2. Services & Scope</h2>
          <p>
            The Freelancer agrees to provide the following services for the project titled <strong>"{data.projectName || "[Project Name]"}"</strong>:
          </p>
          <div className="mt-2 pl-4 border-l-2 border-slate-200 whitespace-pre-wrap text-slate-800 italic">
            {data.projectDescription || "[Enter project description/scope here]"}
          </div>
        </section>

        {/* 3. Schedule */}
        <section>
          <h2 className="font-bold text-lg mb-3 uppercase tracking-wide">3. Timeline & Delivery</h2>
          <p>
            The project shall commence on <strong>{data.startDate || "[Start Date]"}</strong>. The expected final delivery date for the completed services is <strong>{data.deliveryDate || "[Delivery Date]"}</strong>. Both parties agree to communicate any delays promptly.
          </p>
        </section>

        {/* 4. Compensation */}
        <section>
          <h2 className="font-bold text-lg mb-3 uppercase tracking-wide">4. Compensation & Payment</h2>
          <p>
            The Client agrees to pay the Freelancer a total fee of <strong>{data.projectFee ? formatCurrency(Number(data.projectFee), data.currency) : "[Total Fee]"}</strong> for the services described above.
          </p>
          <p className="mt-2">Payment shall be structured as follows:</p>
          <ul className="list-disc list-inside mt-2 ml-4">
            {data.paymentStructure === "Full Payment" && (
              <li>100% of the total fee due upon completion of the project.</li>
            )}
            {data.paymentStructure === "50% Advance / 50% on Completion" && (
              <>
                <li>50% upfront advance payment required before work commences.</li>
                <li>50% remaining balance due upon final delivery.</li>
              </>
            )}
            {data.paymentStructure === "Custom" && (
              <>
                <li>{data.advancePaymentPercent || "[X]"}% upfront advance payment required before work commences.</li>
                <li>The remaining balance is due upon project completion or according to agreed milestones.</li>
              </>
            )}
          </ul>
          <p className="mt-2">
            Invoices are payable within <strong>{data.paymentDueDays || "[X]"} net days</strong> of receipt.
          </p>
        </section>

        {/* 5. Revisions */}
        <section>
          <h2 className="font-bold text-lg mb-3 uppercase tracking-wide">5. Revisions</h2>
          <p>
            The total project fee includes up to <strong>{data.includedRevisions === "" ? "[X]" : data.includedRevisions}</strong> round(s) of revisions. Additional revisions requested by the Client outside the original scope will be billed at {data.additionalRevisionFee ? <strong>{data.additionalRevisionFee}</strong> : "a mutually agreed upon rate"}.
          </p>
        </section>

        {/* 6. Ownership */}
        <section>
          <h2 className="font-bold text-lg mb-3 uppercase tracking-wide">6. Intellectual Property & Ownership</h2>
          <p>
            {data.ownershipTerms || "Upon full and final payment, the Client will hold full exclusive rights to the finalized deliverables. The Freelancer retains the right to display the completed work in their portfolio."}
          </p>
        </section>

        {/* 7. Confidentiality */}
        <section>
          <h2 className="font-bold text-lg mb-3 uppercase tracking-wide">7. Confidentiality</h2>
          <p>
            {data.confidentialityTerms || "Both parties agree to keep all proprietary information, trade secrets, and non-public data exchanged during this project strictly confidential."}
          </p>
        </section>

        {/* 8. Cancellation */}
        <section>
          <h2 className="font-bold text-lg mb-3 uppercase tracking-wide">8. Cancellation</h2>
          <p>
            {data.refundPolicy || "Either party may terminate this agreement with written notice. In the event of cancellation by the Client, the Freelancer will be compensated for all work completed up to the date of termination. Advance payments are non-refundable."}
          </p>
        </section>

        {/* 9. Additional Notes */}
        {data.additionalNotes && (
          <section>
            <h2 className="font-bold text-lg mb-3 uppercase tracking-wide">9. Additional Provisions</h2>
            <div className="whitespace-pre-wrap">
              {data.additionalNotes}
            </div>
          </section>
        )}

      </div>

      {/* Signatures */}
      <div className="mt-16 grid grid-cols-2 gap-12">
        <div className="border-t border-black pt-2">
          <p className="font-bold text-sm uppercase">Freelancer Signature</p>
          <p className="mt-1">{data.freelancerName || "____________________"}</p>
          <p className="mt-6 text-sm">Date: ________________</p>
        </div>
        <div className="border-t border-black pt-2">
          <p className="font-bold text-sm uppercase">Client Signature</p>
          <p className="mt-1">{data.clientName || "____________________"}</p>
          <p className="mt-6 text-sm">Date: ________________</p>
        </div>
      </div>
      
      <div className="mt-16 pt-4 border-t border-slate-200 text-center print:hidden">
        <p className="text-xs text-slate-400 italic">
          Disclaimer: This contract generator provides a general template for informational purposes and does not constitute legal advice. Consider consulting a qualified legal professional for agreements that require legal review.
        </p>
      </div>

    </div>
  );
}
