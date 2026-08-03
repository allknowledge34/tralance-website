"use client";

import React, { useState, useMemo } from "react";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CalculatorClient() {
  const [currency, setCurrency] = useState("₹");
  const [livingCost, setLivingCost] = useState<number | "">("");
  const [savingsGoal, setSavingsGoal] = useState<number | "">("");
  const [workingDays, setWorkingDays] = useState<number | "">(20);
  const [workingHours, setWorkingHours] = useState<number | "">(6);
  const [tax, setTax] = useState<number | "">(10);
  const [platformFee, setPlatformFee] = useState<number | "">(10);
  const [showBreakdown, setShowBreakdown] = useState(false);


  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "₹" ? "INR" : currency === "$" ? "USD" : currency === "€" ? "EUR" : "GBP",
      maximumFractionDigits: 0,
    }).format(amount).replace(/INR|USD|EUR|GBP/, currency);
  };


  const results = useMemo(() => {
    const netNeed = (Number(livingCost) || 0) + (Number(savingsGoal) || 0);
    const taxPct = (Number(tax) || 0) / 100;
    const feePct = (Number(platformFee) || 0) / 100;
    
    const deductions = taxPct + feePct;
    
    let grossNeed = 0;
    if (deductions < 1) {
      grossNeed = netNeed / (1 - deductions);
    } else {
      grossNeed = netNeed;
    }

    const days = Number(workingDays) || 1;
    const hours = Number(workingHours) || 1;

    const dailyTarget = grossNeed / days;
    const hourlyRate = dailyTarget / hours;
    
    const taxAmount = grossNeed * taxPct;
    const feeAmount = grossNeed * feePct;
    const totalHours = days * hours;

    return {
      takeHome: netNeed,
      monthlyRevenue: grossNeed,
      dailyTarget: dailyTarget,
      hourlyRate: hourlyRate,
      taxAmount,
      feeAmount,
      totalHours
    };
  }, [livingCost, savingsGoal, workingDays, workingHours, tax, platformFee]);

  const hasEnteredValues = Boolean(livingCost || savingsGoal);

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-20 font-sans">
      
      <header className="mb-16 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
          Freelancer Rate Calculator
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          Determine the exact minimum hourly rate you need to charge to cover your expenses, hit your savings goals, and account for taxes and platform fees.
        </p>
      </header>

      <div className="lg:grid lg:grid-cols-12 lg:gap-16 relative">
        

        <div className="lg:col-span-7 xl:col-span-8 mb-12 lg:mb-0">
          <div className="bg-slate-50/50 dark:bg-[#0B1020] border border-slate-200/60 dark:border-[rgba(255,255,255,0.08)] rounded-[32px] p-8 md:p-10">
            <h2 className="text-xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight">Your Numbers</h2>
            
            <div className="space-y-8">

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Currency</label>
                <div className="flex flex-wrap gap-3">
                  {["₹", "$", "€", "£"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`px-6 py-3 rounded-2xl font-semibold text-lg transition-all duration-200 border hover:-translate-y-0.5 hover:shadow-sm ${
                        currency === c 
                          ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/20" 
                          : "bg-white dark:bg-[#151C2C] border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Monthly Living Cost</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">{currency}</span>
                    <input 
                      type="number"
                      value={livingCost}
                      onChange={(e) => setLivingCost(e.target.value ? Number(e.target.value) : "")}
                      className="w-full pl-10 pr-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151C2C] focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-medium"
                      placeholder="50000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Monthly Savings Goal</label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">{currency}</span>
                    <input 
                      type="number"
                      value={savingsGoal}
                      onChange={(e) => setSavingsGoal(e.target.value ? Number(e.target.value) : "")}
                      className="w-full pl-10 pr-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151C2C] focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-medium"
                      placeholder="20000"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Working Days / Month</label>
                  <input 
                    type="number"
                    value={workingDays}
                    onChange={(e) => setWorkingDays(e.target.value ? Number(e.target.value) : "")}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151C2C] focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-medium"
                    placeholder="20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Working Hours / Day</label>
                  <input 
                    type="number"
                    value={workingHours}
                    onChange={(e) => setWorkingHours(e.target.value ? Number(e.target.value) : "")}
                    className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151C2C] focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-medium"
                    placeholder="6"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Expected Tax (%)</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={tax}
                      onChange={(e) => setTax(e.target.value ? Number(e.target.value) : "")}
                      className="w-full pl-5 pr-10 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151C2C] focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-medium"
                      placeholder="10"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Platform Fee (%)</label>
                  <div className="relative">
                    <input 
                      type="number"
                      value={platformFee}
                      onChange={(e) => setPlatformFee(e.target.value ? Number(e.target.value) : "")}
                      className="w-full pl-5 pr-10 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#151C2C] focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-medium"
                      placeholder="10"
                    />
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


        <div className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-28 space-y-6">
            
            <div className="bg-white dark:bg-[#0B1020] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 shadow-[0_16px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.2)]">
              <h3 className="text-[#64748B] dark:text-slate-400 font-semibold mb-3 uppercase tracking-wider text-xs">Recommended Hourly Rate</h3>
              <div className="mb-10 flex items-baseline">
                {hasEnteredValues ? (
                  <>
                    <span className="text-5xl md:text-[64px] font-extrabold text-blue-600 dark:text-blue-500 tracking-tight leading-none">
                      {formatMoney(results.hourlyRate)}
                    </span>
                    <span className="text-xl text-[#94A3B8] dark:text-slate-500 font-medium ml-2">/hr</span>
                  </>
                ) : (
                  <span className="text-5xl md:text-[64px] font-extrabold text-slate-300 dark:text-slate-700 tracking-tight leading-none">
                    &mdash;
                  </span>
                )}
              </div>

              <div className="space-y-5">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/60 pb-3">
                  <span className="text-[#64748B] dark:text-slate-400 text-sm font-medium">Daily Income Target</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {hasEnteredValues ? formatMoney(results.dailyTarget) : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800/60 pb-3">
                  <span className="text-[#64748B] dark:text-slate-400 text-sm font-medium">Monthly Revenue Needed</span>
                  <span className="font-bold text-blue-600 dark:text-blue-500">
                    {hasEnteredValues ? formatMoney(results.monthlyRevenue) : "—"}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-[#64748B] dark:text-slate-400 text-sm font-medium">Take Home Income</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-500">
                    {hasEnteredValues ? formatMoney(results.takeHome) : "—"}
                  </span>
                </div>
              </div>
            </div>


            {hasEnteredValues && (
              <div className="bg-white dark:bg-[#0B1020] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setShowBreakdown(!showBreakdown)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Calculation Breakdown</span>
                  {showBreakdown ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                <AnimatePresence>
                  {showBreakdown && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-100 dark:border-slate-800/60 mx-5 mt-0 text-sm">
                        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                          <span>Monthly Living Cost</span>
                          <span className="font-medium text-slate-900 dark:text-white">{formatMoney(Number(livingCost) || 0)}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                          <span>Savings Goal</span>
                          <span className="font-medium text-slate-900 dark:text-white">{formatMoney(Number(savingsGoal) || 0)}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                          <span>Tax ({tax || 0}%)</span>
                          <span className="font-medium text-red-500/80">{formatMoney(results.taxAmount)}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                          <span>Platform Fee ({platformFee || 0}%)</span>
                          <span className="font-medium text-red-500/80">{formatMoney(results.feeAmount)}</span>
                        </div>
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex justify-between items-center font-bold text-slate-900 dark:text-white">
                          <span>Revenue Needed</span>
                          <span>{formatMoney(results.monthlyRevenue)}</span>
                        </div>
                        <div className="pt-2 flex justify-between items-center text-slate-600 dark:text-slate-400">
                          <span>Total Billable Hours</span>
                          <span className="font-medium text-slate-900 dark:text-white">{results.totalHours} hrs</span>
                        </div>
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 flex justify-between items-center font-bold text-blue-600 dark:text-blue-400">
                          <span>Recommended Hourly Rate</span>
                          <span>{formatMoney(results.hourlyRate)}/hr</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

          </div>
        </div>

      </div>


      <div className="mt-24 max-w-3xl border-t border-slate-200/60 dark:border-[rgba(255,255,255,0.08)] pt-16 mx-auto">
        <h2 className="text-2xl font-bold mb-10 text-slate-900 dark:text-white text-center tracking-tight">How it Works</h2>
        <div className="grid sm:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#151C2C] flex items-center justify-center font-bold text-slate-900 dark:text-white mb-4 text-xl border border-slate-200/60 dark:border-slate-800">1</div>
            <p className="text-slate-600 dark:text-slate-400 font-medium text-sm leading-relaxed">Enter your monthly living expenses</p>
          </div>
          <div className="hidden sm:flex items-center justify-center text-slate-300 dark:text-slate-700">
            <ArrowRight className="w-6 h-6" />
          </div>
          <div className="flex flex-col items-center sm:hidden text-slate-300 dark:text-slate-700">
            ↓
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-[#151C2C] flex items-center justify-center font-bold text-slate-900 dark:text-white mb-4 text-xl border border-slate-200/60 dark:border-slate-800">2</div>
            <p className="text-slate-600 dark:text-slate-400 font-medium text-sm leading-relaxed">Add your savings goal and work schedule</p>
          </div>
          <div className="hidden sm:flex items-center justify-center text-slate-300 dark:text-slate-700">
            <ArrowRight className="w-6 h-6" />
          </div>
          <div className="flex flex-col items-center sm:hidden text-slate-300 dark:text-slate-700">
            ↓
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-4 text-xl border border-blue-200 dark:border-blue-800/50">3</div>
            <p className="text-slate-600 dark:text-slate-400 font-medium text-sm leading-relaxed">See your recommended hourly rate instantly</p>
          </div>
        </div>
      </div>

    </div>
  );
}
