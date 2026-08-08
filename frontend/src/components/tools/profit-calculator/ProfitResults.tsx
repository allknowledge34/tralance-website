"use client";

import React from "react";
import { ProfitData } from "@/types/profit-calculator";
import { calculateProfit, getProjectWorthStatus, formatCurrency } from "@/lib/tools/profit-calculator/calculations";
import { Info, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

interface ProfitResultsProps {
  data: ProfitData;
}

export function ProfitResults({ data }: ProfitResultsProps) {
  const results = calculateProfit(data);
  const status = getProjectWorthStatus(results.effectiveHourlyRate, data.targetHourlyRate);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Results</h2>
      </div>

      <div className="bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-white/10 p-6 md:p-8 rounded-2xl shadow-sm flex-grow">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-xl border border-blue-100 dark:border-blue-800/30">
            <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Estimated Take-Home</h3>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {formatCurrency(results.takeHome, data.currency)}
            </p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/10 p-5 rounded-xl border border-emerald-100 dark:border-emerald-800/30">
            <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">Effective Hourly Rate</h3>
            <p className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {formatCurrency(results.effectiveHourlyRate, data.currency)}<span className="text-base font-semibold text-slate-500 dark:text-slate-400">/hr</span>
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Breakdown</h4>
          <div className="space-y-3 text-sm">
            
            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Gross Project Revenue</span>
              <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(results.grossRevenue, data.currency)}</span>
            </div>

            {results.platformFeeAmount > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5 text-red-600 dark:text-red-400">
                <span>Platform Fees ({data.platformFeePercent}%)</span>
                <span>-{formatCurrency(results.platformFeeAmount, data.currency)}</span>
              </div>
            )}

            {results.processingFeeAmount > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5 text-red-600 dark:text-red-400">
                <span>Payment Processing Fees ({data.processingFeePercent}%)</span>
                <span>-{formatCurrency(results.processingFeeAmount, data.currency)}</span>
              </div>
            )}

            {(data.softwareCosts !== "" && data.softwareCosts > 0 || data.otherExpenses !== "" && data.otherExpenses > 0) && (
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5 text-red-600 dark:text-red-400">
                <span>Software / Project Expenses</span>
                <span>-{formatCurrency((Number(data.softwareCosts) || 0) + (Number(data.otherExpenses) || 0), data.currency)}</span>
              </div>
            )}

            {results.taxAmount > 0 && (
              <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5 text-amber-600 dark:text-amber-500">
                <span>Estimated Tax ({data.taxPercent}%)</span>
                <span>-{formatCurrency(results.taxAmount, data.currency)}</span>
              </div>
            )}

            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
              <span className="font-semibold text-slate-600 dark:text-slate-400">Total Costs</span>
              <span className="font-bold text-slate-900 dark:text-white">{formatCurrency(results.totalCosts, data.currency)}</span>
            </div>

          </div>
        </div>

        {status && (
          <div className="mb-8">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Project Worth Indicator</h4>
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              status === "Above Target" ? "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/30 text-emerald-800 dark:text-emerald-300" :
              status === "Near Target" ? "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800/30 text-blue-800 dark:text-blue-300" :
              "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/30 text-amber-800 dark:text-amber-300"
            }`}>
              <div className="shrink-0 mt-0.5">
                {status === "Above Target" && <TrendingUp className="w-5 h-5" />}
                {status === "Near Target" && <CheckCircle2 className="w-5 h-5" />}
                {status === "Below Target" && <AlertCircle className="w-5 h-5" />}
              </div>
              <div>
                <p className="font-bold text-sm mb-1">
                  Your effective rate is {status.toLowerCase()}.
                </p>
                <p className="text-sm opacity-90">
                  Target: {formatCurrency(Number(data.targetHourlyRate), data.currency)}/hr <span className="mx-1">•</span> 
                  Effective: {formatCurrency(results.effectiveHourlyRate, data.currency)}/hr
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-auto bg-slate-50 dark:bg-white/5 p-4 rounded-xl flex items-start gap-3">
          <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <strong>Disclaimer:</strong> This calculator provides estimates only and does not constitute tax or financial advice. Estimated tax is calculated as a simple percentage of taxable income (gross revenue minus deductible expenses) for estimation purposes only.
          </p>
        </div>

      </div>
    </div>
  );
}
