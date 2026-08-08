"use client";

import React, { useState } from "react";
import { ContractData } from "@/types/contract-generator";
import { ContractForm } from "@/components/tools/contract-generator/ContractForm";
import { ContractPreview } from "@/components/tools/contract-generator/ContractPreview";
import { Lock, Printer } from "lucide-react";

const defaultContractData: ContractData = {
  contractTitle: "Freelance Service Agreement",
  contractNumber: "AGR-001",
  agreementDate: new Date().toISOString().split('T')[0],
  effectiveDate: "",
  freelancerName: "",
  freelancerEmail: "",
  freelancerPhone: "",
  freelancerAddress: "",
  freelancerWebsite: "",
  clientName: "",
  clientEmail: "",
  clientPhone: "",
  clientAddress: "",
  projectName: "",
  projectDescription: "",
  startDate: "",
  deliveryDate: "",
  currency: "USD",
  projectFee: "",
  paymentStructure: "Full Payment",
  advancePaymentPercent: "",
  paymentDueDays: 15,
  includedRevisions: 2,
  additionalRevisionFee: "",
  latePaymentFee: "",
  cancellationNotice: "",
  refundPolicy: "",
  ownershipTerms: "",
  confidentialityTerms: "",
  additionalNotes: "",
};

export default function ContractClient() {
  const [data, setData] = useState<ContractData>(defaultContractData);

  const handleReset = () => {
    setData(defaultContractData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Side: Form */}
        <div className="lg:col-span-5 xl:col-span-4 print:hidden">
          <div className="sticky top-28 h-auto max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 pb-12">
            <ContractForm data={data} onChange={setData} onReset={handleReset} />
          </div>
        </div>
        
        {/* Right Side: Preview */}
        <div className="lg:col-span-7 xl:col-span-8 print:col-span-12">
          <div className="flex justify-end mb-4 print:hidden">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4 stroke-[2.5]" />
              Print / Save as PDF
            </button>
          </div>
          <div className="bg-slate-50 dark:bg-[#0B1020] rounded-2xl p-4 sm:p-8 border border-slate-200 dark:border-white/10 print:p-0 print:border-none print:bg-white">
            <ContractPreview data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
