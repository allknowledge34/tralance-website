"use client";

import React from "react";
import { ProjectBriefData } from "@/types/project-brief";
import { formatCurrency } from "@/lib/tools/profit-calculator/calculations";

interface BriefPreviewProps {
  data: ProjectBriefData;
}

export function BriefPreview({ data }: BriefPreviewProps) {
  const hasRequirements = data.requirements.filter(r => r.trim() !== "").length > 0;
  const hasDeliverables = data.deliverables.filter(d => d.trim() !== "").length > 0;
  const hasReferences = data.references.filter(r => r.trim() !== "").length > 0;
  const hasDesign = data.designPreferences || data.likes || data.dislikes || hasReferences;
  const hasMilestones = data.milestones.some(m => m.name || m.targetDate || m.description);
  const hasCommunication = data.communicationMethod || data.contactPerson || data.communicationNotes;

  return (
    <div id="project-brief-preview" className="bg-white text-black border border-slate-200 p-8 md:p-12 shadow-sm rounded-xl print:w-full print:border-none print:shadow-none print:m-0 print:p-0">
      
      <div className="border-b-4 border-slate-900 pb-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Project Brief</p>
            <h1 className="text-3xl font-extrabold text-slate-900">{data.projectName || "[Project Name]"}</h1>
          </div>
          <div className="text-right text-sm">
            <p className="text-slate-500">Prepared by</p>
            <p className="font-bold">{data.preparedBy}</p>
          </div>
        </div>
        {data.projectType && (
          <div className="mt-4 inline-block bg-slate-100 text-slate-800 px-3 py-1 rounded text-sm font-semibold">
            {data.projectType}
          </div>
        )}
      </div>

      <div className="space-y-10 text-[15px] leading-relaxed">
        
        <section>
          <h2 className="font-bold text-lg mb-3 uppercase tracking-wide border-b border-slate-200 pb-1">1. Project Overview</h2>
          <div className="space-y-4 mt-4">
            <div>
              <h3 className="font-bold text-slate-700">Project Goal:</h3>
              <p className="mt-1 whitespace-pre-wrap">{data.projectGoal || "[Describe the primary goal]"}</p>
            </div>
            {data.targetAudience && (
              <div>
                <h3 className="font-bold text-slate-700">Target Audience:</h3>
                <p className="mt-1 whitespace-pre-wrap">{data.targetAudience}</p>
              </div>
            )}
          </div>
        </section>

        {hasRequirements && (
          <section>
            <h2 className="font-bold text-lg mb-3 uppercase tracking-wide border-b border-slate-200 pb-1">2. Requirements</h2>
            <ul className="list-disc list-inside mt-4 space-y-1">
              {data.requirements.filter(r => r.trim() !== "").map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </section>
        )}

        {hasDeliverables && (
          <section>
            <h2 className="font-bold text-lg mb-3 uppercase tracking-wide border-b border-slate-200 pb-1">3. Deliverables</h2>
            <ul className="list-disc list-inside mt-4 space-y-1">
              {data.deliverables.filter(d => d.trim() !== "").map((del, i) => (
                <li key={i}>{del}</li>
              ))}
            </ul>
          </section>
        )}

        {hasDesign && (
          <section className="print:break-inside-avoid">
            <h2 className="font-bold text-lg mb-3 uppercase tracking-wide border-b border-slate-200 pb-1">4. Design & Style</h2>
            <div className="space-y-4 mt-4">
              {data.designPreferences && (
                <div>
                  <h3 className="font-bold text-slate-700">Style Preferences:</h3>
                  <p className="mt-1 whitespace-pre-wrap">{data.designPreferences}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-6">
                {data.likes && (
                  <div>
                    <h3 className="font-bold text-slate-700">Likes:</h3>
                    <p className="mt-1 whitespace-pre-wrap">{data.likes}</p>
                  </div>
                )}
                {data.dislikes && (
                  <div>
                    <h3 className="font-bold text-slate-700">Dislikes:</h3>
                    <p className="mt-1 whitespace-pre-wrap">{data.dislikes}</p>
                  </div>
                )}
              </div>

              {hasReferences && (
                <div>
                  <h3 className="font-bold text-slate-700">Reference Links:</h3>
                  <ul className="list-none mt-1 space-y-1">
                    {data.references.filter(r => r.trim() !== "").map((ref, i) => (
                      <li key={i}><a href={ref} className="text-blue-600 underline break-all">{ref}</a></li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {(data.startDate || data.deliveryDate || hasMilestones) && (
          <section className="print:break-inside-avoid">
            <h2 className="font-bold text-lg mb-3 uppercase tracking-wide border-b border-slate-200 pb-1">5. Timeline</h2>
            
            <div className="flex gap-12 mt-4 mb-6">
              {data.startDate && (
                <div>
                  <span className="font-bold text-slate-700">Expected Start:</span> {data.startDate}
                </div>
              )}
              {data.deliveryDate && (
                <div>
                  <span className="font-bold text-slate-700">Expected Delivery:</span> {data.deliveryDate}
                </div>
              )}
            </div>

            {hasMilestones && (
              <div className="mt-4">
                <h3 className="font-bold text-slate-700 mb-2">Milestones:</h3>
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-4 font-bold text-sm">Milestone</th>
                        <th className="py-2 px-4 font-bold text-sm">Target Date</th>
                        <th className="py-2 px-4 font-bold text-sm">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {data.milestones.filter(m => m.name || m.targetDate || m.description).map((m, i) => (
                        <tr key={i}>
                          <td className="py-2 px-4">{m.name}</td>
                          <td className="py-2 px-4 whitespace-nowrap">{m.targetDate}</td>
                          <td className="py-2 px-4">{m.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        )}

        {(data.includedRevisions || hasCommunication) && (
          <section className="print:break-inside-avoid">
            <h2 className="font-bold text-lg mb-3 uppercase tracking-wide border-b border-slate-200 pb-1">6. Revisions & Communication</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {data.includedRevisions && (
                <div>
                  <span className="font-bold text-slate-700">Included Revisions:</span> {data.includedRevisions}
                </div>
              )}
              {data.communicationMethod && (
                <div>
                  <span className="font-bold text-slate-700">Primary Channel:</span> {data.communicationMethod}
                </div>
              )}
              {data.contactPerson && (
                <div>
                  <span className="font-bold text-slate-700">Contact Person:</span> {data.contactPerson}
                </div>
              )}
            </div>
            {data.communicationNotes && (
              <div className="mt-4">
                <h3 className="font-bold text-slate-700">Communication Notes:</h3>
                <p className="mt-1 whitespace-pre-wrap">{data.communicationNotes}</p>
              </div>
            )}
          </section>
        )}

        {data.estimatedBudget && (
          <section className="print:break-inside-avoid">
            <h2 className="font-bold text-lg mb-3 uppercase tracking-wide border-b border-slate-200 pb-1">7. Budget</h2>
            <p className="mt-4 text-lg">
              <span className="font-bold text-slate-700">Estimated Budget:</span> {formatCurrency(Number(data.estimatedBudget), data.currency)}
            </p>
          </section>
        )}

        {data.additionalNotes && (
          <section className="print:break-inside-avoid">
            <h2 className="font-bold text-lg mb-3 uppercase tracking-wide border-b border-slate-200 pb-1">8. Additional Notes</h2>
            <p className="mt-4 whitespace-pre-wrap">{data.additionalNotes}</p>
          </section>
        )}

      </div>
      
      <div className="mt-16 pt-4 border-t border-slate-200 text-center text-sm text-slate-500">
        <p>
          This project brief is intended to help clients and freelancers align on project expectations. It is not a legal contract.
        </p>
      </div>

    </div>
  );
}
