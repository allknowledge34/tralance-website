"use client";

import React, { useState } from "react";
import { ProfitData } from "@/types/profit-calculator";
import { ProfitForm } from "@/components/tools/profit-calculator/ProfitForm";
import { ProfitResults } from "@/components/tools/profit-calculator/ProfitResults";


const defaultProfitData: ProfitData = {
  projectPrice: "",
  estimatedHours: "",
  currency: "USD",
  platformFeePercent: "",
  processingFeePercent: "",
  softwareCosts: "",
  otherExpenses: "",
  taxPercent: "",
  targetHourlyRate: "",
};

export default function ProfitClient() {
  const [data, setData] = useState<ProfitData>(defaultProfitData);

  const handleReset = () => {
    setData(defaultProfitData);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      
        <div className="lg:col-span-7 xl:col-span-7">
          <ProfitForm data={data} onChange={setData} onReset={handleReset} />
        </div>
        
        <div className="lg:col-span-5 xl:col-span-5">
          <div className="sticky top-28 h-auto pb-12 lg:pb-0">
            <ProfitResults data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
