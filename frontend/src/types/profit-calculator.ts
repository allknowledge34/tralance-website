export interface ProfitData {
  projectPrice: number | "";
  estimatedHours: number | "";
  currency: string;
  
  platformFeePercent: number | "";
  processingFeePercent: number | "";
  
  softwareCosts: number | "";
  otherExpenses: number | "";
  
  taxPercent: number | "";
  
  targetHourlyRate: number | "";
}

export interface ProfitResults {
  grossRevenue: number;
  platformFeeAmount: number;
  processingFeeAmount: number;
  totalExpenses: number;
  taxableAmount: number;
  taxAmount: number;
  totalCosts: number;
  takeHome: number;
  effectiveHourlyRate: number;
}
