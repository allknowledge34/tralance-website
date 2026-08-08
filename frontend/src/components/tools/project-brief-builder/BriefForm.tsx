"use client";

import React, { useState } from "react";
import { ProjectBriefData, Milestone } from "@/types/project-brief";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";

interface BriefFormProps {
  data: ProjectBriefData;
  onChange: (data: ProjectBriefData) => void;
  onReset: () => void;
}

export function BriefForm({ data, onChange, onReset }: BriefFormProps) {
  const [openSection, setOpenSection] = useState<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const toggleSection = (sectionIndex: number) => {
    setOpenSection(openSection === sectionIndex ? 0 : sectionIndex);
  };

  const SectionHeader = ({ title, index }: { title: string, index: number }) => (
    <button 
      type="button"
      onClick={() => toggleSection(index)}
      className="w-full flex items-center justify-between py-4 text-left border-b border-slate-200 dark:border-white/10"
    >
      <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">{index}. {title}</h3>
      {openSection === index ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
    </button>
  );

  // Dynamic Array Handlers
  const handleArrayChange = (field: "requirements" | "deliverables" | "references", index: number, value: string) => {
    const newArray = [...data[field]];
    newArray[index] = value;
    onChange({ ...data, [field]: newArray });
  };

  const addArrayItem = (field: "requirements" | "deliverables" | "references") => {
    onChange({ ...data, [field]: [...data[field], ""] });
  };

  const removeArrayItem = (field: "requirements" | "deliverables" | "references", index: number) => {
    const newArray = data[field].filter((_, i) => i !== index);
    onChange({ ...data, [field]: newArray });
  };

  // Milestone Handlers
  const handleMilestoneChange = (index: number, field: keyof Milestone, value: string) => {
    const newMilestones = [...data.milestones];
    newMilestones[index] = { ...newMilestones[index], [field]: value };
    onChange({ ...data, milestones: newMilestones });
  };

  const addMilestone = () => {
    onChange({ ...data, milestones: [...data.milestones, { id: crypto.randomUUID(), name: "", targetDate: "", description: "" }] });
  };

  const removeMilestone = (index: number) => {
    const newMilestones = data.milestones.filter((_, i) => i !== index);
    onChange({ ...data, milestones: newMilestones });
  };

  return (
    <div className="bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm print:hidden">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Brief Builder</h2>
        <button
          onClick={() => {
            if (window.confirm("Are you sure you want to start over? Your current project brief will be cleared.")) {
              onReset();
            }
          }}
          className="text-sm font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
        >
          Start Over
        </button>
      </div>

      <div className="space-y-2">
        {/* STEP 1: BASICS */}
        <div>
          <SectionHeader title="Project Basics" index={1} />
          {openSection === 1 && (
            <div className="py-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Project Name *</label>
                <input type="text" name="projectName" value={data.projectName} onChange={handleChange} placeholder="e.g. Acme Website Redesign" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Who are you?</label>
                  <select name="preparedBy" value={data.preparedBy} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                    <option value="Client">Client</option>
                    <option value="Freelancer">Freelancer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Project Type *</label>
                  <select name="projectType" value={data.projectType} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                    <option value="">Select Type</option>
                    <option value="Website">Website</option>
                    <option value="Mobile App">Mobile App</option>
                    <option value="Web App">Web App</option>
                    <option value="Design">Design</option>
                    <option value="Video">Video</option>
                    <option value="Writing">Writing</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Project Goal *</label>
                <p className="text-xs text-slate-500 mb-2">What are you trying to achieve with this project?</p>
                <textarea name="projectGoal" value={data.projectGoal} onChange={handleChange} rows={4} placeholder="e.g. We need to increase conversions by rebuilding our landing page to be faster and more modern." className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Target Audience</label>
                <p className="text-xs text-slate-500 mb-2">Who is this project for?</p>
                <textarea name="targetAudience" value={data.targetAudience} onChange={handleChange} rows={2} placeholder="e.g. Small business owners in the US" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"></textarea>
              </div>
            </div>
          )}
        </div>

        {/* STEP 2: REQUIREMENTS */}
        <div>
          <SectionHeader title="Project Requirements" index={2} />
          {openSection === 2 && (
            <div className="py-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">What needs to be included?</label>
                <p className="text-xs text-slate-500 mb-4">List the specific features or requirements needed for this project (e.g. Homepage, Login System, Payment Integration).</p>
                
                <div className="space-y-3">
                  {data.requirements.map((req, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text" 
                        value={req} 
                        onChange={(e) => handleArrayChange("requirements", index, e.target.value)} 
                        placeholder={`Requirement ${index + 1}`} 
                        className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                      <button 
                        type="button"
                        onClick={() => removeArrayItem("requirements", index)}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <button 
                  type="button" 
                  onClick={() => addArrayItem("requirements")}
                  className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Requirement
                </button>
              </div>
            </div>
          )}
        </div>

        {/* STEP 3: DELIVERABLES */}
        <div>
          <SectionHeader title="Deliverables" index={3} />
          {openSection === 3 && (
            <div className="py-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">What will be delivered?</label>
                <p className="text-xs text-slate-500 mb-4">List the final assets the client will actually receive (e.g. 5-page website, Figma design files, Source code).</p>
                
                <div className="space-y-3">
                  {data.deliverables.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text" 
                        value={item} 
                        onChange={(e) => handleArrayChange("deliverables", index, e.target.value)} 
                        placeholder={`Deliverable ${index + 1}`} 
                        className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                      <button 
                        type="button"
                        onClick={() => removeArrayItem("deliverables", index)}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                
                <button 
                  type="button" 
                  onClick={() => addArrayItem("deliverables")}
                  className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Deliverable
                </button>
              </div>
            </div>
          )}
        </div>

        {/* STEP 4: DESIGN & REFS */}
        <div>
          <SectionHeader title="Design & References" index={4} />
          {openSection === 4 && (
            <div className="py-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Design / Style Preferences</label>
                <textarea name="designPreferences" value={data.designPreferences} onChange={handleChange} rows={2} placeholder="e.g. Minimalist, dark mode, modern typography" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Reference Links</label>
                <div className="space-y-3">
                  {data.references.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="url" 
                        value={item} 
                        onChange={(e) => handleArrayChange("references", index, e.target.value)} 
                        placeholder="https://example.com" 
                        className="flex-1 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                      />
                      <button 
                        type="button"
                        onClick={() => removeArrayItem("references", index)}
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <button 
                  type="button" 
                  onClick={() => addArrayItem("references")}
                  className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Reference
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Things you like</label>
                  <textarea name="likes" value={data.likes} onChange={handleChange} rows={2} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Things you don't want</label>
                  <textarea name="dislikes" value={data.dislikes} onChange={handleChange} rows={2} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"></textarea>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* STEP 5: TIMELINE */}
        <div>
          <SectionHeader title="Timeline" index={5} />
          {openSection === 5 && (
            <div className="py-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Expected Start Date</label>
                  <input type="date" name="startDate" value={data.startDate} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Expected Delivery Date</label>
                  <input type="date" name="deliveryDate" value={data.deliveryDate} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Milestones (Optional)</label>
                <div className="space-y-4">
                  {data.milestones.map((m, index) => (
                    <div key={m.id} className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl relative">
                      <button 
                        type="button"
                        onClick={() => removeMilestone(index)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pr-8">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Name</label>
                          <input type="text" value={m.name} onChange={(e) => handleMilestoneChange(index, "name", e.target.value)} placeholder="e.g. Design Approved" className="w-full bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Target Date</label>
                          <input type="date" value={m.targetDate} onChange={(e) => handleMilestoneChange(index, "targetDate", e.target.value)} className="w-full bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Description</label>
                          <input type="text" value={m.description} onChange={(e) => handleMilestoneChange(index, "description", e.target.value)} placeholder="What gets delivered?" className="w-full bg-white dark:bg-[#0B1020] border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  type="button" 
                  onClick={addMilestone}
                  className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Milestone
                </button>
              </div>
            </div>
          )}
        </div>

        {/* STEP 6: REVISIONS & COMMUNICATION */}
        <div>
          <SectionHeader title="Revisions & Communication" index={6} />
          {openSection === 6 && (
            <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Included Revisions</label>
                <input type="text" name="includedRevisions" value={data.includedRevisions} onChange={handleChange} placeholder="e.g. 2 rounds" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Communication Method</label>
                <select name="communicationMethod" value={data.communicationMethod} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                  <option value="">Select Method</option>
                  <option value="Email">Email</option>
                  <option value="Slack">Slack</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Discord">Discord</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Primary Contact Person</label>
                <input type="text" name="contactPerson" value={data.contactPerson} onChange={handleChange} className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Communication Notes</label>
                <textarea name="communicationNotes" value={data.communicationNotes} onChange={handleChange} rows={2} placeholder="e.g. Weekly sync on Thursdays at 10 AM" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"></textarea>
              </div>
            </div>
          )}
        </div>

        {/* STEP 7: BUDGET */}
        <div>
          <SectionHeader title="Budget (Optional)" index={7} />
          {openSection === 7 && (
            <div className="py-6">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Estimated Budget</label>
              <div className="relative">
                <input type="number" name="estimatedBudget" value={data.estimatedBudget} onChange={handleChange} min="0" placeholder="e.g. 5000" className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl pl-4 pr-24 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                <select name="currency" value={data.currency} onChange={handleChange} className="absolute right-1 top-1 bottom-1 bg-transparent border-l border-slate-200 dark:border-white/10 px-2 text-sm font-medium text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-0 rounded-r-xl">
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="INR">INR</option>
                  <option value="CAD">CAD</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* STEP 8: FINAL QUESTIONS */}
        <div>
          <SectionHeader title="Anything Else?" index={8} />
          {openSection === 8 && (
            <div className="py-6">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Additional Notes</label>
              <p className="text-xs text-slate-500 mb-2">Add anything important that hasn't been mentioned above.</p>
              <textarea name="additionalNotes" value={data.additionalNotes} onChange={handleChange} rows={4} placeholder="e.g. Technical limitations, client preferences, existing systems..." className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"></textarea>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
