export interface ContractData {

  contractTitle: string;
  contractNumber: string;
  agreementDate: string;
  effectiveDate: string;


  freelancerName: string;
  freelancerEmail: string;
  freelancerPhone: string;
  freelancerAddress: string;
  freelancerWebsite: string;


  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;


  projectName: string;
  projectDescription: string;
  startDate: string;
  deliveryDate: string;


  currency: string;
  projectFee: number | "";
  paymentStructure: "Full Payment" | "50% Advance / 50% on Completion" | "Custom";
  advancePaymentPercent: number | ""; // For custom
  paymentDueDays: number | "";


  includedRevisions: number | "";
  additionalRevisionFee: string;
  latePaymentFee: string;
  cancellationNotice: string;
  refundPolicy: string;
  ownershipTerms: string;
  confidentialityTerms: string;


  additionalNotes: string;
}
