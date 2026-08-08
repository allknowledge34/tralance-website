"use client";

import React from "react";
import { InvoiceData, InvoiceItem } from "@/types/invoice";
import { Plus, Trash2 } from "lucide-react";
import { calculateItemAmount } from "@/lib/tools/invoice/calculations";

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
  onReset: () => void;
}

export function InvoiceForm({ data, onChange, onReset }: InvoiceFormProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value === "" ? "" : Number(value) });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      rate: 0,
      amount: 0,
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (id: string) => {
    onChange({ ...data, items: data.items.filter(item => item.id !== id) });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const newItems = data.items.map(item => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        // Recalculate amount if quantity or rate changes
        if (field === "quantity" || field === "rate") {
          updated.amount = calculateItemAmount(updated.quantity, updated.rate);
        }
        return updated;
      }
      return item;
    });
    onChange({ ...data, items: newItems });
  };

  return (
    <div className="bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm print:hidden">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Invoice Details</h2>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to reset all fields? This cannot be undone.")) {
              onReset();
            }
          }}
          className="text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
        >
          Clear / Reset
        </button>
      </div>

      <div className="space-y-10">
        
        <section>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Invoice Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Invoice Number</label>
              <input type="text" name="invoiceNumber" value={data.invoiceNumber} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Currency</label>
              <select name="currency" value={data.currency} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="INR">INR (₹)</option>
                <option value="CAD">CAD ($)</option>
                <option value="AUD">AUD ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Date</label>
              <input type="date" name="invoiceDate" value={data.invoiceDate} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Due Date</label>
              <input type="date" name="dueDate" value={data.dueDate} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Your Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Name / Business Name</label>
              <input type="text" name="freelancerName" value={data.freelancerName} onChange={handleChange} placeholder="e.g. John Doe" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
              <input type="email" name="freelancerEmail" value={data.freelancerEmail} onChange={handleChange} placeholder="you@example.com" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Phone (Optional)</label>
              <input type="text" name="freelancerPhone" value={data.freelancerPhone} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Address</label>
              <textarea name="freelancerAddress" value={data.freelancerAddress} onChange={handleChange} rows={2} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"></textarea>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Tax / GST ID (Optional)</label>
              <input type="text" name="freelancerTaxId" value={data.freelancerTaxId} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Client Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Client Name / Company</label>
              <input type="text" name="clientName" value={data.clientName} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Client Email</label>
              <input type="email" name="clientEmail" value={data.clientEmail} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Client Address</label>
              <textarea name="clientAddress" value={data.clientAddress} onChange={handleChange} rows={2} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"></textarea>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Items / Services</h3>
          
          <div className="space-y-4">
            {data.items.map((item) => (
              <div key={item.id} className="relative bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-4 pr-12 group transition-all">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-6">
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Description</label>
                    <input 
                      type="text" 
                      value={item.description} 
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                      placeholder="Item description"
                      className="w-full bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Qty</label>
                    <input 
                      type="number" 
                      min="0"
                      value={item.quantity} 
                      onChange={(e) => updateItem(item.id, "quantity", e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Rate</label>
                    <input 
                      type="number" 
                      min="0"
                      value={item.rate} 
                      onChange={(e) => updateItem(item.id, "rate", e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                    />
                  </div>
                </div>
                {data.items.length > 1 && (
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <button 
            onClick={addItem}
            className="mt-4 flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:border-primary hover:text-primary dark:hover:border-blue-400 dark:hover:text-blue-400 transition-colors"
          >
            <Plus className="w-4 h-4 stroke-[2]" />
            Add Item
          </button>
        </section>

        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Discount (%)</label>
              <input type="number" min="0" max="100" name="discount" value={data.discount} onChange={handleNumberChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Tax (%)</label>
              <input type="number" min="0" max="100" name="tax" value={data.tax} onChange={handleNumberChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
            </div>
          </div>
        </section>

        <section>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Notes (Optional)</label>
              <textarea name="notes" value={data.notes} onChange={handleChange} rows={2} placeholder="Thank you for your business!" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Payment Terms (Optional)</label>
              <textarea name="terms" value={data.terms} onChange={handleChange} rows={2} placeholder="Please pay within 15 days." className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"></textarea>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
