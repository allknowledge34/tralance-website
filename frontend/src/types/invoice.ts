export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number | "";
  rate: number | "";
  amount: number;
}

export interface InvoiceData {
  // Freelancer Info
  freelancerName: string;
  freelancerEmail: string;
  freelancerPhone: string;
  freelancerAddress: string;
  freelancerTaxId: string;
  
  // Client Info
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  
  // Invoice Info
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  
  // Items & Calculations
  items: InvoiceItem[];
  discount: number | "";
  tax: number | "";
  
  // Additional Info
  notes: string;
  terms: string;
}

export interface InvoiceTotals {
  subtotal: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  total: number;
}
