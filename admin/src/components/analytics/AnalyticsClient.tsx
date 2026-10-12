"use client";

import * as React from "react";
import {
  TrendingUp,
  DollarSign,
  CreditCard,
  Percent,
} from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface AnalyticsProps {
  data: {
    usersCount: number;
    totalPro: number;
    freeUsersCount: number;
    proMonthlyCount: number;
    proYearlyCount: number;
    mrr: number;
    arr: number;
    totalGrossRevenue: number;
    averageOrderValue: number;
    totalOrdersCount: number;
    successfulOrdersCount: number;
    conversionRate: string;
  };
}

export function AnalyticsClient({ data }: AnalyticsProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000]">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-[#171717] dark:text-[#FFFDF5]">
            Business & Financial Analytics
          </h1>
          <p className="text-sm font-medium text-subtle mt-0.5">
            Key SaaS metrics, subscription recurring revenue (MRR/ARR), and monetization conversion funnel.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Monthly Recurring (MRR)"
          value={`₹${data.mrr.toLocaleString("en-IN")}`}
          subtitle="Estimated normalized monthly run rate"
          icon={TrendingUp}
          accentColor="blue"
        />

        <StatsCard
          title="Annual Run Rate (ARR)"
          value={`₹${data.arr.toLocaleString("en-IN")}`}
          subtitle="Annualized recurring revenue projection"
          icon={DollarSign}
          accentColor="mint"
        />

        <StatsCard
          title="Average Order Value"
          value={`₹${data.averageOrderValue}`}
          subtitle="Mean transaction spend across checkouts"
          icon={CreditCard}
          accentColor="purple"
        />

        <StatsCard
          title="Paid Conversion Rate"
          value={`${data.conversionRate}%`}
          subtitle={`${data.totalPro} paid of ${data.usersCount} registered`}
          icon={Percent}
          accentColor="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b-2 border-[#171717] dark:border-[#383838] pb-3">
            <CardTitle className="text-base font-black uppercase tracking-wide">Subscription Plan Distribution</CardTitle>
            <p className="text-xs font-medium text-subtle">
              Active entitlement breakdown by pricing plan tier
            </p>
          </CardHeader>
          <CardContent className="space-y-6 pt-5">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#171717] dark:text-[#FFFDF5]">
                  Pro Monthly (₹49 / month)
                </span>
                <span className="font-mono text-[#171717] dark:text-[#FFFDF5]">
                  {data.proMonthlyCount} subscriber{data.proMonthlyCount === 1 ? "" : "s"}
                </span>
              </div>
              <div className="w-full h-3.5 bg-white dark:bg-[#27272A] border-2 border-[#171717] dark:border-[#383838] overflow-hidden">
                <div
                  className="bg-[#35B9F5] h-full border-r-2 border-[#171717] dark:border-[#383838] transition-all"
                  style={{
                    width: `${data.usersCount > 0 ? (data.proMonthlyCount / data.usersCount) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#171717] dark:text-[#FFFDF5]">
                  Pro Yearly (₹149 / year)
                </span>
                <span className="font-mono text-[#171717] dark:text-[#FFFDF5]">
                  {data.proYearlyCount} subscriber{data.proYearlyCount === 1 ? "" : "s"}
                </span>
              </div>
              <div className="w-full h-3.5 bg-white dark:bg-[#27272A] border-2 border-[#171717] dark:border-[#383838] overflow-hidden">
                <div
                  className="bg-[#C4B5FD] h-full border-r-2 border-[#171717] dark:border-[#383838] transition-all"
                  style={{
                    width: `${data.usersCount > 0 ? (data.proYearlyCount / data.usersCount) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                <span className="text-[#171717] dark:text-[#FFFDF5]">
                  Free Tier Users
                </span>
                <span className="font-mono text-[#171717] dark:text-[#FFFDF5]">
                  {data.freeUsersCount} users
                </span>
              </div>
              <div className="w-full h-3.5 bg-white dark:bg-[#27272A] border-2 border-[#171717] dark:border-[#383838] overflow-hidden">
                <div
                  className="bg-neutral-300 dark:bg-neutral-600 h-full border-r-2 border-[#171717] dark:border-[#383838] transition-all"
                  style={{
                    width: `${data.usersCount > 0 ? (data.freeUsersCount / data.usersCount) * 100 : 100}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b-2 border-[#171717] dark:border-[#383838] pb-3">
            <CardTitle className="text-base font-black uppercase tracking-wide">Monetization Conversion Funnel</CardTitle>
            <p className="text-xs font-medium text-subtle">
              Customer progression from registration to paid checkout
            </p>
          </CardHeader>
          <CardContent className="space-y-4 pt-5">
            <div className="p-4 bg-white dark:bg-[#27272A] border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-subtle block">
                  1. Registered Users
                </span>
                <span className="text-xl font-black text-[#171717] dark:text-[#FFFDF5] mt-0.5 block">
                  {data.usersCount}
                </span>
              </div>
              <span className="text-xs font-black uppercase px-2 py-0.5 border-2 border-[#171717] bg-[#FFE52E] text-[#171717]">100%</span>
            </div>

            <div className="p-4 bg-white dark:bg-[#27272A] border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-subtle block">
                  2. Cashfree Checkouts Created
                </span>
                <span className="text-xl font-black text-[#171717] dark:text-[#FFFDF5] mt-0.5 block">
                  {data.totalOrdersCount}
                </span>
              </div>
              <span className="text-xs font-black uppercase px-2 py-0.5 border-2 border-[#171717] bg-[#35B9F5] text-[#171717]">
                {data.usersCount > 0 ? ((data.totalOrdersCount / data.usersCount) * 100).toFixed(1) : 0}%
              </span>
            </div>

            <div className="p-4 bg-[#6EE7B7]/25 dark:bg-[#6EE7B7]/15 border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] flex items-center justify-between">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#171717] dark:text-[#6EE7B7] block">
                  3. Verified Paid Orders
                </span>
                <span className="text-xl font-black text-[#171717] dark:text-[#6EE7B7] mt-0.5 block">
                  {data.successfulOrdersCount}
                </span>
              </div>
              <span className="text-xs font-black uppercase px-2 py-0.5 border-2 border-[#171717] bg-[#6EE7B7] text-[#171717]">
                {data.conversionRate}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
