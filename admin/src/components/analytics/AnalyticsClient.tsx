"use client";

import * as React from "react";
import {
  TrendingUp,
  DollarSign,
  Users,
  CreditCard,
  PieChart,
  BarChart2,
  Percent,
  Calendar,
  CheckCircle2,
} from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Business & Financial Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-0.5">
            Key SaaS metrics, subscription recurring revenue (MRR/ARR), and monetization conversion funnel.
          </p>
        </div>
      </div>

      {/* Top SaaS KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Monthly Recurring (MRR)"
          value={`₹${data.mrr.toLocaleString("en-IN")}`}
          subtitle="Estimated normalized monthly run rate"
          icon={TrendingUp}
          iconColor="text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/50"
        />

        <StatsCard
          title="Annual Run Rate (ARR)"
          value={`₹${data.arr.toLocaleString("en-IN")}`}
          subtitle="Annualized recurring revenue projection"
          icon={DollarSign}
          iconColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50"
        />

        <StatsCard
          title="Average Order Value"
          value={`₹${data.averageOrderValue}`}
          subtitle="Mean transaction spend across checkouts"
          icon={CreditCard}
          iconColor="text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-900/50"
        />

        <StatsCard
          title="Paid Conversion Rate"
          value={`${data.conversionRate}%`}
          subtitle={`${data.totalPro} paid of ${data.usersCount} registered`}
          icon={Percent}
          iconColor="text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/50"
        />
      </div>

      {/* Subscription Breakdown & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tier Distribution Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Subscription Plan Distribution</CardTitle>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              Active entitlement breakdown by pricing plan tier
            </p>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Pro Monthly */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800 dark:text-neutral-200">
                  Pro Monthly (₹49 / month)
                </span>
                <span className="font-mono text-slate-900 dark:text-white">
                  {data.proMonthlyCount} subscriber{data.proMonthlyCount === 1 ? "" : "s"}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all"
                  style={{
                    width: `${data.usersCount > 0 ? (data.proMonthlyCount / data.usersCount) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Pro Yearly */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800 dark:text-neutral-200">
                  Pro Yearly (₹149 / year)
                </span>
                <span className="font-mono text-slate-900 dark:text-white">
                  {data.proYearlyCount} subscriber{data.proYearlyCount === 1 ? "" : "s"}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all"
                  style={{
                    width: `${data.usersCount > 0 ? (data.proYearlyCount / data.usersCount) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            {/* Free Tier */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800 dark:text-neutral-200">
                  Free Tier Users
                </span>
                <span className="font-mono text-slate-900 dark:text-white">
                  {data.freeUsersCount} users
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden">
                <div
                  className="bg-slate-300 dark:bg-neutral-700 h-full rounded-full transition-all"
                  style={{
                    width: `${data.usersCount > 0 ? (data.freeUsersCount / data.usersCount) * 100 : 100}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monetization Funnel Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monetization Conversion Funnel</CardTitle>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              Customer progression from registration to paid checkout
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  1. Registered Users
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 block">
                  {data.usersCount}
                </span>
              </div>
              <span className="text-xs font-bold text-slate-400">100%</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  2. Cashfree Checkouts Created
                </span>
                <span className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 block">
                  {data.totalOrdersCount}
                </span>
              </div>
              <span className="text-xs font-bold text-blue-600">
                {data.usersCount > 0 ? ((data.totalOrdersCount / data.usersCount) * 100).toFixed(1) : 0}%
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                  3. Verified Paid Orders
                </span>
                <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 mt-0.5 block">
                  {data.successfulOrdersCount}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-600">
                {data.conversionRate}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
