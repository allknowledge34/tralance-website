import { InvoiceItem, InvoiceTotals } from "@/types/invoice";

export function safeNumber(value: number | string | ""): number {
  if (value === "" || value === null || value === undefined) return 0;
  const num = typeof value === "string" ? parseFloat(value) : value;
  return isNaN(num) ? 0 : num;
}

export function calculateItemAmount(quantity: number | "", rate: number | ""): number {
  const q = safeNumber(quantity);
  const r = safeNumber(rate);
  return q * r;
}

export function calculateInvoiceTotals(
  items: InvoiceItem[],
  discountPercent: number | "",
  taxPercent: number | ""
): InvoiceTotals {
  // Calculate Subtotal
  const subtotal = items.reduce((acc, item) => acc + safeNumber(item.amount), 0);

  // Calculate Discount (as a percentage of subtotal)
  const dPercent = safeNumber(discountPercent);
  const discountAmount = subtotal * (dPercent / 100);

  // Taxable Amount (Subtotal minus discount)
  const taxableAmount = Math.max(0, subtotal - discountAmount);

  // Calculate Tax (as a percentage of taxable amount)
  const tPercent = safeNumber(taxPercent);
  const taxAmount = taxableAmount * (tPercent / 100);

  // Final Total
  const total = taxableAmount + taxAmount;

  return {
    subtotal,
    discountAmount,
    taxableAmount,
    taxAmount,
    total,
  };
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  } catch (e) {
    // Fallback if currency code is invalid
    return `${currency} ${amount.toFixed(2)}`;
  }
}
