export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number | "";
  rate: number | "";
  amount: number;
}

export interface InvoiceData {

  freelancerName: string;
  freelancerEmail: string;
  freelancerPhone: string;
  freelancerAddress: string;
  freelancerTaxId: string;
  

  clientName: string;
  clientEmail: string;
  clientAddress: string;
  

  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  currency: string;
  

  items: InvoiceItem[];
  discount: number | "";
  tax: number | "";
  

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
