"use client";

import React from "react";
import { ProfitData } from "@/types/profit-calculator";

interface ProfitFormProps {
  data: ProfitData;
  onChange: (data: ProfitData) => void;
  onReset: () => void;
}

export function ProfitForm({ data, onChange, onReset }: ProfitFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Prevent negative values, allow empty strings for clearing inputs safely
    const val = value === "" ? "" : Math.max(0, Number(value));
    onChange({ ...data, [name]: val });
  };

  return (
    <div className="bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Project Details</h2>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to clear all fields?")) {
              onReset();
            }
          }}
          className="text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-10">
        
        {/* Project Information & Time */}
        <section>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Project & Time</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Project Price / Total Payment</label>
              <div className="relative">
                <input 
                  type="number" 
                  name="projectPrice" 
                  value={data.projectPrice} 
                  onChange={handleNumberChange}
                  min="0"
                  placeholder="e.g. 2000"
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-4 pr-24 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                />
                <select 
                  name="currency" 
                  value={data.currency} 
                  onChange={handleChange}
                  className="absolute right-1 top-1 bottom-1 bg-transparent border-l border-slate-200 dark:border-white/10 px-2 text-sm font-medium text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-0 rounded-r-xl"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                  <option value="CAD">CAD</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Estimated Project Hours</label>
              <input 
                type="number" 
                name="estimatedHours" 
                value={data.estimatedHours} 
                onChange={handleNumberChange}
                min="0"
                placeholder="e.g. 40"
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
              />
            </div>
          </div>
        </section>

        {/* Fees */}
        <section>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Fees</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Platform Fee (%)</label>
              <input 
                type="number" 
                name="platformFeePercent" 
                value={data.platformFeePercent} 
                onChange={handleNumberChange}
                min="0"
                max="100"
                placeholder="e.g. 10 (Upwork/Fiverr)"
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Processing Fee (%)</label>
              <input 
                type="number" 
                name="processingFeePercent" 
                value={data.processingFeePercent} 
                onChange={handleNumberChange}
                min="0"
                max="100"
                placeholder="e.g. 3 (Stripe/PayPal)"
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
              />
            </div>
          </div>
        </section>

        {/* Expenses */}
        <section>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Project Expenses</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Software / Tools Cost</label>
              <input 
                type="number" 
                name="softwareCosts" 
                value={data.softwareCosts} 
                onChange={handleNumberChange}
                min="0"
                placeholder="e.g. 50"
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Other Expenses</label>
              <input 
                type="number" 
                name="otherExpenses" 
                value={data.otherExpenses} 
                onChange={handleNumberChange}
                min="0"
                placeholder="e.g. 100"
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
              />
            </div>
          </div>
        </section>

        {/* Optional */}
        <section>
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Optional</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Tax Estimate (%)</label>
              <input 
                type="number" 
                name="taxPercent" 
                value={data.taxPercent} 
                onChange={handleNumberChange}
                min="0"
                max="100"
                placeholder="e.g. 20"
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">My Target Hourly Rate</label>
              <input 
                type="number" 
                name="targetHourlyRate" 
                value={data.targetHourlyRate} 
                onChange={handleNumberChange}
                min="0"
                placeholder="e.g. 25"
                className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
