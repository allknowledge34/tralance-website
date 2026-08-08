export interface ContractData {
  // Section 1 - Details
  contractTitle: string;
  contractNumber: string;
  agreementDate: string;
  effectiveDate: string;

  // Section 2 - Freelancer
  freelancerName: string;
  freelancerEmail: string;
  freelancerPhone: string;
  freelancerAddress: string;
  freelancerWebsite: string;

  // Section 3 - Client
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;

  // Section 4 - Project
  projectName: string;
  projectDescription: string;
  startDate: string;
  deliveryDate: string;

  // Section 5 - Payment
  currency: string;
  projectFee: number | "";
  paymentStructure: "Full Payment" | "50% Advance / 50% on Completion" | "Custom";
  advancePaymentPercent: number | ""; // For custom
  paymentDueDays: number | "";

  // Section 6 - Terms
  includedRevisions: number | "";
  additionalRevisionFee: string;
  latePaymentFee: string;
  cancellationNotice: string;
  refundPolicy: string;
  ownershipTerms: string;
  confidentialityTerms: string;

  // Section 7 - Additional
  additionalNotes: string;
}
