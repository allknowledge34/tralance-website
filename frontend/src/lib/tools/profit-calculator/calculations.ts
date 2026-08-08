import { ProfitData, ProfitResults } from "@/types/profit-calculator";
import { safeNumber, formatCurrency } from "../invoice/calculations";

export function calculateProfit(data: ProfitData): ProfitResults {
  const projectPrice = Math.max(0, safeNumber(data.projectPrice));
  const estimatedHours = Math.max(0, safeNumber(data.estimatedHours));
  
  const platformFeePercent = Math.max(0, safeNumber(data.platformFeePercent));
  const processingFeePercent = Math.max(0, safeNumber(data.processingFeePercent));
  const taxPercent = Math.max(0, safeNumber(data.taxPercent));
  
  const softwareCosts = Math.max(0, safeNumber(data.softwareCosts));
  const otherExpenses = Math.max(0, safeNumber(data.otherExpenses));

  // Revenue
  const grossRevenue = projectPrice;

  // Percentage Fees
  const platformFeeAmount = grossRevenue * (platformFeePercent / 100);
  const processingFeeAmount = grossRevenue * (processingFeePercent / 100);

  // Total Non-Tax Expenses
  const totalExpenses = platformFeeAmount + processingFeeAmount + softwareCosts + otherExpenses;

  // Taxable Amount (Gross Revenue minus deductible expenses)
  const taxableAmount = Math.max(0, grossRevenue - totalExpenses);

  // Tax
  const taxAmount = taxableAmount * (taxPercent / 100);

  // Total Costs
  const totalCosts = totalExpenses + taxAmount;

  // Take Home
  const takeHome = grossRevenue - totalCosts;

  // Effective Hourly Rate
  let effectiveHourlyRate = 0;
  if (estimatedHours > 0) {
    effectiveHourlyRate = takeHome / estimatedHours;
  }

  return {
    grossRevenue,
    platformFeeAmount,
    processingFeeAmount,
    totalExpenses,
    taxableAmount,
    taxAmount,
    totalCosts,
    takeHome,
    effectiveHourlyRate,
  };
}

export function getProjectWorthStatus(effectiveRate: number, targetRate: number | ""): "Below Target" | "Near Target" | "Above Target" | null {
  const target = safeNumber(targetRate);
  if (target <= 0 || effectiveRate <= 0) return null;

  // Define "Near Target" as within 10% of the target rate
  const lowerBound = target * 0.9;
  const upperBound = target * 1.1;

  if (effectiveRate < lowerBound) {
    return "Below Target";
  } else if (effectiveRate > upperBound) {
    return "Above Target";
  } else {
    return "Near Target";
  }
}

// Re-export formatCurrency for convenience
export { formatCurrency };
