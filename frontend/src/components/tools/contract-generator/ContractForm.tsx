"use client";

import React, { useState } from "react";
import { ContractData } from "@/types/contract-generator";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ContractFormProps {
  data: ContractData;
  onChange: (data: ContractData) => void;
  onReset: () => void;
}

const SectionHeader = ({ title, index, openSection, toggleSection }: { title: string, index: number, openSection: number, toggleSection: (index: number) => void }) => (
  <button 
    type="button"
    onClick={() => toggleSection(index)}
    className="w-full flex items-center justify-between py-4 text-left border-b border-slate-200 dark:border-white/10"
  >
    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{index}. {title}</h3>
    {openSection === index ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
  </button>
);

export function ContractForm({ data, onChange, onReset }: ContractFormProps) {
  const [openSection, setOpenSection] = useState<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const val = value === "" ? "" : Math.max(0, Number(value));
    onChange({ ...data, [name]: val });
  };

  const toggleSection = (sectionIndex: number) => {
    setOpenSection(openSection === sectionIndex ? 0 : sectionIndex);
  };

  return (
    <div className="bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm print:hidden">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Contract Builder</h2>
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

      <div className="space-y-2">
        <div>
          <SectionHeader title="Contract Details" index={1} openSection={openSection} toggleSection={toggleSection} />
          {openSection === 1 && (
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Contract Title</label>
                <input type="text" name="contractTitle" value={data.contractTitle} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Contract Number</label>
                <input type="text" name="contractNumber" value={data.contractNumber} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Agreement Date</label>
                <input type="date" name="agreementDate" value={data.agreementDate} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
            </div>
          )}
        </div>
        <div>
          <SectionHeader title="Freelancer Information" index={2} openSection={openSection} toggleSection={toggleSection} />
          {openSection === 2 && (
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Full Name / Business Name *</label>
                <input type="text" name="freelancerName" value={data.freelancerName} onChange={handleChange} placeholder="Jane Doe Design LLC" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email *</label>
                <input type="email" name="freelancerEmail" value={data.freelancerEmail} onChange={handleChange} placeholder="jane@example.com" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Phone (Optional)</label>
                <input type="text" name="freelancerPhone" value={data.freelancerPhone} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Address (Optional)</label>
                <input type="text" name="freelancerAddress" value={data.freelancerAddress} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
            </div>
          )}
        </div>

        <div>
          <SectionHeader title="Client Information" index={3} openSection={openSection} toggleSection={toggleSection} />
          {openSection === 3 && (
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Client Name / Company *</label>
                <input type="text" name="clientName" value={data.clientName} onChange={handleChange} placeholder="Acme Corp" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Client Email *</label>
                <input type="email" name="clientEmail" value={data.clientEmail} onChange={handleChange} placeholder="contact@acme.com" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Client Phone (Optional)</label>
                <input type="text" name="clientPhone" value={data.clientPhone} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Client Address (Optional)</label>
                <input type="text" name="clientAddress" value={data.clientAddress} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
            </div>
          )}
        </div>

        <div>
          <SectionHeader title="Project Details" index={4} openSection={openSection} toggleSection={toggleSection} />
          {openSection === 4 && (
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Project Name *</label>
                <input type="text" name="projectName" value={data.projectName} onChange={handleChange} placeholder="Website Redesign" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Project Description / Scope</label>
                <textarea name="projectDescription" value={data.projectDescription} onChange={handleChange} rows={4} placeholder="Describe the specific deliverables and services..." className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Start Date</label>
                <input type="date" name="startDate" value={data.startDate} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Expected Delivery Date</label>
                <input type="date" name="deliveryDate" value={data.deliveryDate} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
            </div>
          )}
        </div>

        <div>
          <SectionHeader title="Payment Terms" index={5} openSection={openSection} toggleSection={toggleSection} />
          {openSection === 5 && (
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Total Project Fee *</label>
                <div className="relative">
                  <input type="number" name="projectFee" value={data.projectFee} onChange={handleNumberChange} min="0" placeholder="e.g. 5000" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-4 pr-24 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                  <select name="currency" value={data.currency} onChange={handleChange} className="absolute right-1 top-1 bottom-1 bg-transparent border-l border-slate-200 dark:border-white/10 px-2 text-sm font-medium text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-0 rounded-r-xl">
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Payment Structure</label>
                <select name="paymentStructure" value={data.paymentStructure} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                  <option value="Full Payment">Full Payment on Completion</option>
                  <option value="50% Advance / 50% on Completion">50% Advance / 50% on Completion</option>
                  <option value="Custom">Custom Milestones</option>
                </select>
              </div>
              
              {data.paymentStructure === "Custom" && (
                <div className="sm:col-span-2 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Advance Payment (%)</label>
                  <input type="number" name="advancePaymentPercent" value={data.advancePaymentPercent} onChange={handleNumberChange} min="0" max="100" placeholder="e.g. 30" className="w-full bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                  <p className="text-xs text-slate-500 mt-2">The remainder will be due upon project completion.</p>
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Payment Due Days (Net)</label>
                <input type="number" name="paymentDueDays" value={data.paymentDueDays} onChange={handleNumberChange} min="0" placeholder="e.g. 15" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
            </div>
          )}
        </div>

        <div>
          <SectionHeader title="Project Terms" index={6} openSection={openSection} toggleSection={toggleSection} />
          {openSection === 6 && (
            <div className="py-6 grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Included Revisions</label>
                <input type="number" name="includedRevisions" value={data.includedRevisions} onChange={handleNumberChange} min="0" placeholder="e.g. 2" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Additional Revision Fee (Optional)</label>
                <input type="text" name="additionalRevisionFee" value={data.additionalRevisionFee} onChange={handleChange} placeholder="e.g. $50/hr" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Ownership / IP Terms</label>
                <textarea name="ownershipTerms" value={data.ownershipTerms} onChange={handleChange} rows={3} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Confidentiality Terms</label>
                <textarea name="confidentialityTerms" value={data.confidentialityTerms} onChange={handleChange} rows={3} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Cancellation Policy</label>
                <textarea name="refundPolicy" value={data.refundPolicy} onChange={handleChange} rows={3} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"></textarea>
              </div>
            </div>
          )}
        </div>

        <div>
          <SectionHeader title="Additional Notes" index={7} openSection={openSection} toggleSection={toggleSection} />
          {openSection === 7 && (
            <div className="py-6">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Notes (Optional)</label>
              <textarea name="additionalNotes" value={data.additionalNotes} onChange={handleChange} rows={4} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"></textarea>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
