"use client";

import React, { useState, useMemo } from "react";
import { Lock, ChevronDown, TrendingUp, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CalcMode = "simple" | "credit";

interface SemesterData {
  sgpa: string;
  credits: string;
  backlogs: string;
}

export default function CgpaPlannerClient() {
  const [totalSemesters, setTotalSemesters] = useState<number | null>(null);
  const [mode, setMode] = useState<CalcMode>("credit");
  const [semestersData, setSemestersData] = useState<SemesterData[]>([]);
  const [targetCgpa, setTargetCgpa] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  const handleSelectSemesters = (count: number) => {
    setTotalSemesters(count);
    setSemestersData(Array(count).fill({ sgpa: "", credits: "20", backlogs: "0" }));
  };

  const updateSemester = (index: number, field: keyof SemesterData, value: string) => {
    const newData = [...semestersData];
    newData[index] = { ...newData[index], [field]: value };
    setSemestersData(newData);
  };


  const results = useMemo(() => {
    if (!totalSemesters) return null;

    const validSemesters = semestersData.filter(s => s.sgpa !== "" && !isNaN(Number(s.sgpa)));
    const completedCount = validSemesters.length;
    const remainingCount = totalSemesters - completedCount;
    
    let sumSgpa = 0;
    let sumCredits = 0;
    let sumWeightedSgpa = 0;
    let totalBacklogs = 0;
    let maxSgpaVal = 0;
    let minSgpaVal = 10;
    
    const sgpaHistory: number[] = [];
    const backlogHistory: number[] = [];

    validSemesters.forEach((sem) => {
      const sgpa = Number(sem.sgpa);
      const credits = Number(sem.credits) || 0;
      const backlogs = Number(sem.backlogs) || 0;
      
      sumSgpa += sgpa;
      sumCredits += credits;
      sumWeightedSgpa += (sgpa * credits);
      totalBacklogs += backlogs;
      
      if (sgpa > maxSgpaVal) maxSgpaVal = sgpa;
      if (sgpa < minSgpaVal) minSgpaVal = sgpa;
      
      sgpaHistory.push(sgpa);
    });

    semestersData.forEach(sem => {
        backlogHistory.push(Number(sem.backlogs) || 0);
    });

    if (minSgpaVal === 10 && completedCount === 0) minSgpaVal = 0;

    const currentCgpa = completedCount > 0 
      ? (mode === "credit" ? sumWeightedSgpa / sumCredits : sumSgpa / completedCount)
      : 0;
      
    const averageSgpa = completedCount > 0 ? sumSgpa / completedCount : 0;
    const avgCreditsPerSem = completedCount > 0 ? sumCredits / completedCount : 20;

    // Target Calculation
    let requiredFutureSgpa = 0;
    let maxPossibleCgpa = 0;
    let isPossible = false;
    let hasTarget = false;

    if (targetCgpa !== "" && !isNaN(Number(targetCgpa))) {
      hasTarget = true;
      const target = Number(targetCgpa);

      if (remainingCount > 0) {
        if (mode === "credit") {
          const expectedRemainingCredits = remainingCount * avgCreditsPerSem;
          const targetTotalWeighted = target * (sumCredits + expectedRemainingCredits);
          const requiredRemainingWeighted = targetTotalWeighted - sumWeightedSgpa;
          requiredFutureSgpa = requiredRemainingWeighted / expectedRemainingCredits;
          
          maxPossibleCgpa = (sumWeightedSgpa + (10.0 * expectedRemainingCredits)) / (sumCredits + expectedRemainingCredits);
        } else {
          const targetPoints = target * totalSemesters;
          const requiredPoints = targetPoints - sumSgpa;
          requiredFutureSgpa = requiredPoints / remainingCount;
          
          maxPossibleCgpa = (sumSgpa + (10.0 * remainingCount)) / totalSemesters;
        }
        isPossible = requiredFutureSgpa <= 10.0;
      } else {
        isPossible = currentCgpa >= target;
        maxPossibleCgpa = currentCgpa;
      }
    }


    const insights: string[] = [];
    if (completedCount >= 2) {
      const last = sgpaHistory[completedCount - 1];
      const prev = sgpaHistory[completedCount - 2];
      if (last > prev + 0.5) insights.push(`Great improvement in Semester ${completedCount} compared to the previous one.`);
      else if (last < prev - 0.5) insights.push(`Semester ${completedCount} slightly reduced your overall average.`);
    }
    if (totalBacklogs > 0) {
      insights.push(`Clearing your ${totalBacklogs} active backlog${totalBacklogs > 1 ? 's' : ''} will significantly boost your CGPA.`);
    }
    if (hasTarget && remainingCount > 0 && isPossible) {
      insights.push(`Maintaining an SGPA above ${requiredFutureSgpa.toFixed(2)} in your remaining semesters is required to achieve your goal.`);
    }
    if (insights.length === 0 && completedCount > 0) {
      insights.push("Keep up the consistent work across your semesters.");
    }

    return {
      completedCount,
      remainingCount,
      totalCredits: sumCredits,
      totalBacklogs,
      currentCgpa,
      averageSgpa,
      maxSgpaVal,
      minSgpaVal,
      hasTarget,
      isPossible,
      requiredFutureSgpa,
      maxPossibleCgpa,
      insights,
      sgpaHistory,
      backlogHistory
    };
  }, [semestersData, targetCgpa, totalSemesters, mode]);


  const chartHeight = 120;
  const chartWidth = 300;
  const padding = 20;

  const faqs = [
    { q: "What is SGPA?", a: "Semester Grade Point Average (SGPA) is the weighted average of your grades in a single specific semester." },
    { q: "What is CGPA?", a: "Cumulative Grade Point Average (CGPA) is the overall average of all your semesters combined, representing your entire academic performance." },
    { q: "How are backlogs counted?", a: "An uncleared backlog usually results in a 0 grade point for that subject, which lowers the SGPA of that semester. Clearing it later replaces the old grade and boosts your overall CGPA." },
    { q: "Does this calculator store my data?", a: "No. This planner is completely offline and runs instantly in your browser. Your data is cleared when you refresh the page. We do not store any of your academic records." },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-20 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <header className="mb-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900 dark:text-white">
          CGPA Planner
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          Track your semester performance, calculate your CGPA instantly, understand how backlogs affect your graduation score, and plan your academic target.
        </p>
      </header>

      {!totalSemesters ? (
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight">How many semesters does your course have?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[4, 6, 8, 10].map(count => (
              <button
                key={count}
                onClick={() => handleSelectSemesters(count)}
                className="bg-white dark:bg-[#0B1020] border border-slate-200/60 dark:border-[rgba(255,255,255,0.08)] rounded-3xl p-8 text-center transition-all duration-300 hover:shadow-[0_16px_50px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_16px_50px_rgba(0,0,0,0.2)] hover:-translate-y-1 group"
              >
                <div className="text-5xl font-extrabold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors tracking-tighter">{count}</div>
                <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Semesters</div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 relative">
          
          <div className="lg:col-span-7 xl:col-span-7 mb-12 lg:mb-0">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Semester Records</h2>
              
              <div className="flex bg-slate-100/50 dark:bg-[#0B1020] border border-slate-200/60 dark:border-[rgba(255,255,255,0.05)] rounded-2xl p-1.5 relative w-full sm:w-auto">
                <div 
                  className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white dark:bg-slate-800 rounded-xl shadow-sm transition-transform duration-300 ease-out"
                  style={{ transform: mode === "credit" ? 'translateX(100%)' : 'translateX(0)' }}
                />
                <button
                  className={`relative flex-1 px-4 py-2 text-sm font-semibold transition-colors z-10 ${mode === "simple" ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                  onClick={() => setMode("simple")}
                >
                  Simple Average
                </button>
                <button
                  className={`relative flex-1 px-4 py-2 text-sm font-semibold transition-colors z-10 ${mode === "credit" ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}
                  onClick={() => setMode("credit")}
                >
                  Credit Weighted
                </button>
              </div>
            </div>
            
            <div className="space-y-4 mb-12">
              {semestersData.map((sem, index) => (
                <div key={index} className="bg-white dark:bg-[#0B1020] border border-slate-200/60 dark:border-[rgba(255,255,255,0.08)] rounded-[20px] p-5 md:p-6 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Semester {index + 1}</h3>
                  
                  <div className="grid grid-cols-3 gap-4 md:gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">SGPA</label>
                      <input 
                        type="number"
                        step="0.01"
                        value={sem.sgpa}
                        onChange={(e) => updateSemester(index, "sgpa", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#151C2C] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-medium text-sm"
                        placeholder="e.g. 8.5"
                      />
                    </div>
                    
                    <div className={mode === "simple" ? "opacity-50 pointer-events-none transition-opacity" : "transition-opacity"}>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Credits</label>
                      <input 
                        type="number"
                        value={sem.credits}
                        onChange={(e) => updateSemester(index, "credits", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#151C2C] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-medium text-sm"
                        placeholder="20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Backlogs</label>
                      <input 
                        type="number"
                        min="0"
                        value={sem.backlogs}
                        onChange={(e) => updateSemester(index, "backlogs", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#151C2C] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-medium text-sm"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-[#0B1020] border border-slate-200/60 dark:border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 shadow-sm">
              <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-white tracking-tight">Future Goal</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 font-medium">Desired Graduation CGPA</p>
              
              <div className="mb-6">
                <input 
                  type="number"
                  step="0.01"
                  value={targetCgpa}
                  onChange={(e) => setTargetCgpa(e.target.value)}
                  className="w-full max-w-xs px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#151C2C] focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:ring-blue-500/20 dark:focus:border-blue-500 outline-none transition-all text-slate-900 dark:text-white font-medium text-lg"
                  placeholder="e.g. 8.50"
                />
              </div>

              <AnimatePresence mode="wait">
                {results?.hasTarget && results.remainingCount > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="pt-6 border-t border-slate-100 dark:border-slate-800/60"
                  >
                    {results.isPossible ? (
                      <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                        To graduate with a <strong className="text-slate-900 dark:text-white font-bold">{Number(targetCgpa).toFixed(2)} CGPA</strong>, you need an average SGPA of <strong className="text-blue-600 dark:text-blue-500 font-bold">{results.requiredFutureSgpa.toFixed(2)}</strong> during your remaining {results.remainingCount} semester{results.remainingCount > 1 ? 's' : ''}.
                      </p>
                    ) : (
                      <div className="bg-slate-50 dark:bg-[#151C2C] rounded-2xl p-5 border border-slate-100 dark:border-slate-800/60">
                        <div className="flex items-start">
                          <Info className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0 mt-0.5" />
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            With the remaining semesters and a maximum SGPA limit of 10.0, your highest possible CGPA is <strong className="text-slate-900 dark:text-white">{results.maxPossibleCgpa.toFixed(2)}</strong>.
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          <div className="lg:col-span-5 xl:col-span-5">
            <div className="sticky top-28 space-y-8">
              
              <div className="bg-white dark:bg-[#0B1020] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] rounded-[32px] p-8 shadow-[0_16px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_50px_rgba(0,0,0,0.2)]">
                <h3 className="text-slate-500 dark:text-slate-400 font-bold mb-3 uppercase tracking-widest text-xs">Academic Summary</h3>
                <div className="mb-10">
                  {results?.completedCount ? (
                    <span className="text-6xl md:text-[80px] font-extrabold text-slate-900 dark:text-white tracking-tighter leading-none">
                      {results.currentCgpa.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-6xl md:text-[80px] font-extrabold text-slate-200 dark:text-slate-800 tracking-tighter leading-none">
                      0.00
                    </span>
                  )}
                  <p className="text-sm font-semibold text-slate-400 dark:text-slate-500 mt-2 uppercase tracking-wide">Current Estimated CGPA</p>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-8 mb-10 pt-8 border-t border-slate-100 dark:border-slate-800/60">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Average SGPA</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">{results?.completedCount ? results.averageSgpa.toFixed(2) : "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Backlog Papers</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">{results?.totalBacklogs || "0"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Total Credits</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">{results?.totalCredits || "0"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Semesters</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">{results?.completedCount || "0"} / {totalSemesters}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Highest SGPA</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">{results?.maxSgpaVal ? results.maxSgpaVal.toFixed(2) : "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Expected Final</div>
                    <div className="text-xl font-bold text-slate-900 dark:text-white">{results?.currentCgpa ? results.currentCgpa.toFixed(2) : "—"}</div>
                  </div>
                </div>

                {results && results.completedCount > 0 && (
                  <div className="pt-8 border-t border-slate-100 dark:border-slate-800/60">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-6 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-slate-400" />
                      Performance Trend
                    </h4>
                    
                    <div className="relative w-full h-[120px]">
                      <svg className="w-full h-full" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="currentColor" className="text-blue-500/20" />
                            <stop offset="100%" stopColor="currentColor" className="text-blue-500/0" />
                          </linearGradient>
                        </defs>
                        {(() => {
                          const maxVal = 10;
                          const minVal = 0;
                          const range = maxVal - minVal;
                          const stepX = (chartWidth - padding * 2) / Math.max(1, results.sgpaHistory.length - 1);
                          
                          let pathD = `M ${padding} ${chartHeight - padding - ((results.sgpaHistory[0] - minVal) / range) * (chartHeight - padding * 2)}`;
                          
                          results.sgpaHistory.forEach((val, i) => {
                            if (i === 0) return;
                            const x = padding + i * stepX;
                            const y = chartHeight - padding - ((val - minVal) / range) * (chartHeight - padding * 2);
                            pathD += ` L ${x} ${y}`;
                          });

                          return (
                            <>
                              <path d={`${pathD} L ${padding + (results.sgpaHistory.length - 1) * stepX} ${chartHeight - padding} L ${padding} ${chartHeight - padding} Z`} fill="url(#gradient)" />
                              <path d={pathD} fill="none" stroke="currentColor" className="text-blue-500" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                              {results.sgpaHistory.map((val, i) => {
                                const x = padding + i * stepX;
                                const y = chartHeight - padding - ((val - minVal) / range) * (chartHeight - padding * 2);
                                return (
                                  <circle key={i} cx={x} cy={y} r="4" fill="white" stroke="currentColor" className="text-blue-500" strokeWidth="2" />
                                );
                              })}
                            </>
                          );
                        })()}
                      </svg>
                    </div>
                  </div>
                )}
              </div>

              {results && results.insights.length > 0 && (
                <div className="bg-slate-50 dark:bg-[#0B1020] border border-slate-200/60 dark:border-[rgba(255,255,255,0.08)] rounded-[24px] p-6 shadow-sm">
                  <h3 className="text-slate-900 dark:text-white font-bold mb-4 text-sm">Academic Insights</h3>
                  <ul className="space-y-3">
                    {results.insights.map((insight, idx) => (
                      <li key={idx} className="flex items-start text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        <span className="text-blue-500 mr-2 mt-0.5 font-bold">✓</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-slate-50/50 dark:bg-slate-900/30 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5">
                <div className="flex items-center mb-2">
                  <Lock className="w-4 h-4 text-slate-400 mr-2" />
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-300 uppercase tracking-widest">Privacy Assured</h4>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed font-medium">
                  Everything is calculated locally. No login. No cloud. No tracking. No academic records are stored.
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

      <div className="mt-24 max-w-3xl border-t border-slate-200/60 dark:border-[rgba(255,255,255,0.08)] pt-16 mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-[#0B1020] border border-slate-200/60 dark:border-[rgba(255,255,255,0.08)] rounded-2xl overflow-hidden transition-colors hover:border-slate-300 dark:hover:border-slate-700">
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-slate-900 dark:text-white">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === index ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
