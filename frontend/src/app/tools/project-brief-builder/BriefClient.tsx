"use client";

import React, { useState } from "react";
import { ProjectBriefData } from "@/types/project-brief";
import { BriefForm } from "@/components/tools/project-brief-builder/BriefForm";
import { BriefPreview } from "@/components/tools/project-brief-builder/BriefPreview";
import { Printer, Copy, CheckCircle2, Share2 } from "lucide-react";

const defaultBriefData: ProjectBriefData = {
  projectName: "",
  preparedBy: "Client",
  projectType: "",
  projectGoal: "",
  targetAudience: "",
  requirements: [""],
  deliverables: [""],
  designPreferences: "",
  references: [""],
  likes: "",
  dislikes: "",
  startDate: "",
  deliveryDate: "",
  milestones: [{ id: crypto.randomUUID(), name: "", targetDate: "", description: "" }],
  includedRevisions: "",
  communicationMethod: "",
  contactPerson: "",
  communicationNotes: "",
  estimatedBudget: "",
  currency: "USD",
  additionalNotes: "",
};

export default function BriefClient() {
  const [data, setData] = useState<ProjectBriefData>(defaultBriefData);
  const [copied, setCopied] = useState(false);

  const handleReset = () => {
    setData({
      ...defaultBriefData,
      milestones: [{ id: crypto.randomUUID(), name: "", targetDate: "", description: "" }]
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    const previewEl = document.getElementById("project-brief-preview");
    if (previewEl) {
      try {
        await navigator.clipboard.writeText(previewEl.innerText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text", err);
      }
    }
  };

  const handleShare = async () => {
    if (typeof navigator.share === "function") {
      const previewEl = document.getElementById("project-brief-preview");
      try {
        await navigator.share({
          title: data.projectName || 'Project Brief',
          text: previewEl ? previewEl.innerText.substring(0, 500) + "...\n\n[Full brief saved locally]" : "Project Brief",
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
    

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
       
        <div className="lg:col-span-5 xl:col-span-4 print:hidden">
          <div className="sticky top-28 h-auto max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 pb-12">
            <BriefForm data={data} onChange={setData} onReset={handleReset} />
          </div>
        </div>
        
        <div className="lg:col-span-7 xl:col-span-8 print:col-span-12">
          <div className="flex flex-wrap justify-end gap-3 mb-4 print:hidden">
            
            {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
               <button
                 onClick={handleShare}
                 className="flex items-center gap-2 bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 px-4 py-2 rounded-xl font-semibold transition-colors"
               >
                 <Share2 className="w-4 h-4 stroke-[2.5]" />
                 Share
               </button>
            )}

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 px-4 py-2 rounded-xl font-semibold transition-colors w-[110px] justify-center"
            >
              {copied ? <><CheckCircle2 className="w-4 h-4 text-green-500" /> Copied!</> : <><Copy className="w-4 h-4 stroke-[2.5]" /> Copy</>}
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4 stroke-[2.5]" />
              Print / Save as PDF
            </button>
          </div>
          <div className="bg-slate-50 dark:bg-[#0B1020] rounded-2xl p-4 sm:p-8 border border-slate-200 dark:border-white/10 print:p-0 print:border-none print:bg-white">
            <BriefPreview data={data} />
          </div>
          
          
        </div>
      </div>
    </div>
  );
}
