"use client";

import React from "react";
import { InvoiceData } from "@/types/invoice";
import { calculateInvoiceTotals, formatCurrency } from "@/lib/tools/invoice/calculations";
import { Printer } from "lucide-react";

interface InvoicePreviewProps {
  data: InvoiceData;
}

export function InvoicePreview({ data }: InvoicePreviewProps) {
  const totals = calculateInvoiceTotals(data.items, data.discount, data.tax);
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Action Bar (Hidden on print) */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Live Preview</h2>
        <button 
          onClick={handlePrint}
          className="flex items-center gap-2 bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm shadow-primary/20 transition-all"
        >
          <Printer className="w-4 h-4 stroke-[2]" />
          Download / Print
        </button>
      </div>

      {/* Invoice Document */}
      <div className="bg-white text-slate-900 p-8 sm:p-12 md:p-16 rounded-2xl shadow-sm border border-slate-200 flex-grow print:border-none print:shadow-none print:m-0 print:p-0 print:text-black">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start border-b border-slate-200 pb-8 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 uppercase tracking-tight mb-2">Invoice</h1>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{data.invoiceNumber || "INV-XXXX"}</p>
          </div>
          <div className="mt-6 sm:mt-0 sm:text-right">
            <h3 className="font-bold text-lg">{data.freelancerName || "Your Name"}</h3>
            <div className="text-sm text-slate-600 mt-1 whitespace-pre-wrap">
              {data.freelancerAddress}
            </div>
            <p className="text-sm text-slate-600 mt-1">{data.freelancerEmail}</p>
            {data.freelancerPhone && <p className="text-sm text-slate-600">{data.freelancerPhone}</p>}
            {data.freelancerTaxId && <p className="text-sm text-slate-600 mt-1">Tax ID: {data.freelancerTaxId}</p>}
          </div>
        </div>

        {/* Client & Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</h4>
            <h3 className="font-bold text-lg">{data.clientName || "Client Name"}</h3>
            <div className="text-sm text-slate-600 mt-1 whitespace-pre-wrap">
              {data.clientAddress}
            </div>
            <p className="text-sm text-slate-600 mt-1">{data.clientEmail}</p>
          </div>
          <div className="sm:text-right">
            <div className="mb-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Date</h4>
              <p className="text-sm font-medium">{data.invoiceDate || "—"}</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Due Date</h4>
              <p className="text-sm font-medium">{data.dueDate || "—"}</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mb-8 overflow-hidden rounded-xl border border-slate-200 print:border-none">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 print:bg-transparent">
              <tr>
                <th className="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">Description</th>
                <th className="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right w-24">Qty</th>
                <th className="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right w-32">Rate</th>
                <th className="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right w-32">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-4 font-medium text-slate-900">{item.description || "—"}</td>
                  <td className="px-4 py-4 text-slate-600 text-right">{item.quantity}</td>
                  <td className="px-4 py-4 text-slate-600 text-right">{formatCurrency(Number(item.rate), data.currency)}</td>
                  <td className="px-4 py-4 font-bold text-slate-900 text-right">{formatCurrency(item.amount, data.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-full sm:w-80 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="font-semibold text-slate-500">Subtotal</span>
              <span className="font-bold">{formatCurrency(totals.subtotal, data.currency)}</span>
            </div>
            {data.discount !== "" && Number(data.discount) > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span className="font-semibold">Discount ({data.discount}%)</span>
                <span className="font-bold">-{formatCurrency(totals.discountAmount, data.currency)}</span>
              </div>
            )}
            {data.tax !== "" && Number(data.tax) > 0 && (
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-slate-500">Tax ({data.tax}%)</span>
                <span className="font-bold">{formatCurrency(totals.taxAmount, data.currency)}</span>
              </div>
            )}
            <div className="flex justify-between text-lg pt-3 border-t border-slate-200">
              <span className="font-extrabold text-slate-900">Total</span>
              <span className="font-extrabold text-primary">{formatCurrency(totals.total, data.currency)}</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {(data.notes || data.terms) && (
          <div className="border-t border-slate-200 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {data.notes && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Notes</h4>
                <p className="text-sm text-slate-600 whitespace-pre-wrap">{data.notes}</p>
              </div>
            )}
            {data.terms && (
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Payment Terms</h4>
                <p className="text-sm text-slate-600 whitespace-pre-wrap">{data.terms}</p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
