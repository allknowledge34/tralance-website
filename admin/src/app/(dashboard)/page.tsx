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
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b-2 border-[#171717] dark:border-[#383838]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#171717] dark:text-white">
            Operations Overview
          </h1>
          <p className="text-sm font-medium text-[#525252] dark:text-[#A3A3A3] mt-1">
            Real-time platform metrics, user growth, verified Cashfree payments, and content status.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link href="/blogs/create">
            <Button size="sm" className="gap-1.5">
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>New Article</span>
            </Button>
          </Link>
          <Link href="/broadcasts">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Mail className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Broadcast</span>
            </Button>
          </Link>
          <Link href="/promo">
            <Button size="sm" variant="outline" className="gap-1.5">
              <Megaphone className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Promo Bar</span>
            </Button>
          </Link>
        </div>
      </div>

      <Suspense fallback={<KpisSkeleton />}>
        <DashboardKpisWidget />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Suspense fallback={<HealthSkeleton />}>
          <DashboardHealthWidget />
        </Suspense>

        <Suspense fallback={<RecentActivitySkeleton />}>
          <RecentActivityWidget />
        </Suspense>
      </div>

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
