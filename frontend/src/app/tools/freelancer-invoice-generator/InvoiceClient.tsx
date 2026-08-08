"use client";

import React, { useState } from "react";
import { InvoiceData } from "@/types/invoice";
import { InvoiceForm } from "@/components/tools/invoice/InvoiceForm";
import { InvoicePreview } from "@/components/tools/invoice/InvoicePreview";

const defaultInvoiceData: InvoiceData = {
  freelancerName: "",
  freelancerEmail: "",
  freelancerPhone: "",
  freelancerAddress: "",
  freelancerTaxId: "",
  clientName: "",
  clientEmail: "",
  clientAddress: "",
  invoiceNumber: "INV-001",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: "",
  currency: "USD",
  items: [
    {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    }
  ],
  discount: "",
  tax: "",
  notes: "",
  terms: "",
};

export default function InvoiceClient() {
  const [data, setData] = useState<InvoiceData>(defaultInvoiceData);

  const handleReset = () => {
    setData({
      ...defaultInvoiceData,
      items: [
        {
          id: crypto.randomUUID(),
          description: "",
          quantity: 1,
          rate: 0,
          amount: 0,
        }
      ]
    });
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

        <div className="lg:col-span-5 xl:col-span-4 print:hidden">
          <div className="sticky top-28">
            <div className="mb-6">
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">Invoice Generator</h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your invoice data stays completely in your browser. We don&apos;t save or collect any information you enter here.
              </p>
            </div>
            <InvoiceForm data={data} onChange={setData} onReset={handleReset} />
          </div>
        </div>
        

        <div className="lg:col-span-7 xl:col-span-8">
          <div className="sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto hidden-scrollbar pb-12 print:h-auto print:overflow-visible print:pb-0">
            <InvoicePreview data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
