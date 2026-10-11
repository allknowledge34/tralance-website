import * as React from "react";
import { Suspense } from "react";
import Link from "next/link";
import { Plus, Mail, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DashboardKpisWidget,
  DashboardHealthWidget,
  RecentUsersWidget,
  RecentOrdersWidget,
  RecentActivityWidget,
  KpisSkeleton,
  HealthSkeleton,
  RecentUsersSkeleton,
  RecentOrdersSkeleton,
  RecentActivitySkeleton,
} from "@/components/dashboard/DashboardWidgets";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Header & Actions Bar — Renders Immediately (0ms) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Operations Overview
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
            Real-time platform metrics, user growth, verified Cashfree payments, and content status.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/blogs/create">
            <Button size="sm" className="gap-1.5 shadow-xs">
              <Plus className="w-3.5 h-3.5" />
              <span>New Article</span>
            </Button>
          </Link>
          <Link href="/broadcasts">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>Broadcast</span>
            </Button>
          </Link>
          <Link href="/promo">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Megaphone className="w-3.5 h-3.5" />
              <span>Promo Bar</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Primary KPI Stats Cards — Streams in separately */}
      <Suspense fallback={<KpisSkeleton />}>
        <DashboardKpisWidget />
      </Suspense>

      {/* 3. Visual Analytics & Health Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Suspense fallback={<HealthSkeleton />}>
          <DashboardHealthWidget />
        </Suspense>

        <Suspense fallback={<RecentActivitySkeleton />}>
          <RecentActivityWidget />
        </Suspense>
      </div>

      {/* 4. Two-Column Tables Section: Recent Registrations & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<RecentUsersSkeleton />}>
          <RecentUsersWidget />
        </Suspense>

        <Suspense fallback={<RecentOrdersSkeleton />}>
          <RecentOrdersWidget />
        </Suspense>
      </div>
    </div>
  );
}
