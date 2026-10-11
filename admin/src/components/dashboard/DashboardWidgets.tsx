import * as React from "react";
import Link from "next/link";
import {
  Users,
  CreditCard,
  Crown,
  Wrench,
  ArrowUpRight,
  Shield,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getDashboardOverviewMetrics,
  getRecentUsersMetrics,
  getRecentOrdersMetrics,
  getRecentActivityMetrics,
} from "@/lib/actions/dashboard";

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ==========================================
// 1. KPI Stats Cards Widget
// ==========================================
export async function DashboardKpisWidget() {
  const res = await getDashboardOverviewMetrics();

  if (!res.success || !res.data) {
    return (
      <div className="p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <div className="text-sm">
          <p className="font-semibold">Unable to load metrics</p>
          <p className="text-xs text-red-500 mt-0.5">{res.error || "Database query failed."}</p>
        </div>
      </div>
    );
  }

  const data = res.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-in fade-in duration-300">
      <StatsCard
        title="Total Registered Users"
        value={data.totalUsers}
        change={`+${data.newUsers7d} this week`}
        changeType={data.newUsers7d > 0 ? "increase" : "neutral"}
        subtitle={`${data.newUsers30d} new users in last 30 days`}
        icon={Users}
        iconColor="text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/50"
      />

      <StatsCard
        title="Active Pro Subscribers"
        value={data.proUsersCount}
        change={`${data.conversionRate}% conversion`}
        changeType={Number(data.conversionRate) > 0 ? "increase" : "neutral"}
        subtitle={`${data.freeUsersCount} free tier registered users`}
        icon={Crown}
        iconColor="text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/50"
      />

      <StatsCard
        title="Cashfree Revenue (INR)"
        value={`₹${data.totalRevenue.toLocaleString("en-IN")}`}
        change={`${data.successfulOrdersCount} paid orders`}
        changeType={data.successfulOrdersCount > 0 ? "increase" : "neutral"}
        subtitle={`${data.totalOrders} total checkout attempts`}
        icon={CreditCard}
        iconColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50"
      />

      <StatsCard
        title="Freelancer Tool Activity"
        value={data.toolUsage.totalPdfGenerations}
        change={`${data.toolUsage.totalSavedItems} cloud saves`}
        changeType="neutral"
        subtitle="Total verified PDF generations"
        icon={Wrench}
        iconColor="text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900/50"
      />
    </div>
  );
}

// ==========================================
// 2. User & Subscription Health Widget
// ==========================================
export async function DashboardHealthWidget() {
  const res = await getDashboardOverviewMetrics();
  if (!res.success || !res.data) return null;
  const data = res.data;

  return (
    <Card className="lg:col-span-2 animate-in fade-in duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div>
          <CardTitle>User & Subscription Health</CardTitle>
          <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
            Verified breakdown of customer tiers from database entitlement records.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between text-xs font-semibold mb-2">
            <span className="text-slate-700 dark:text-slate-300">
              Pro Users ({data.proUsersCount})
            </span>
            <span className="text-slate-500 dark:text-neutral-400">
              Free Tier ({data.freeUsersCount})
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden flex">
            <div
              className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full transition-all duration-500"
              style={{
                width: `${data.totalUsers > 0 ? (data.proUsersCount / data.totalUsers) * 100 : 0}%`,
              }}
            />
            <div
              className="bg-slate-300 dark:bg-neutral-700 h-full transition-all duration-500"
              style={{
                width: `${data.totalUsers > 0 ? (data.freeUsersCount / data.totalUsers) * 100 : 100}%`,
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-neutral-800/80">
          <div>
            <p className="text-xs text-slate-400 dark:text-neutral-500">Live Articles</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
              {data.articlesCount}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 dark:text-neutral-500">Paid Conversion</p>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {data.conversionRate}%
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400 dark:text-neutral-500">Payment Gateway</p>
            <p className="text-sm font-semibold text-slate-800 dark:text-neutral-200 mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Cashfree v3
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ==========================================
// 3. System Audit Quick Widget
// ==========================================
export async function RecentActivityWidget() {
  const res = await getRecentActivityMetrics(6);

  return (
    <Card className="animate-in fade-in duration-300">
      <CardHeader>
        <CardTitle className="text-base">System Audit Status</CardTitle>
        <p className="text-xs text-slate-500 dark:text-neutral-400">
          Latest administrative operations
        </p>
      </CardHeader>
      <CardContent>
        {!res.success || !res.data || res.data.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            <Shield className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-neutral-700" />
            No administrative actions logged yet.
          </div>
        ) : (
          <div className="space-y-3">
            {res.data.map((log) => (
              <div key={log.id} className="flex items-start gap-2.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                <div className="flex-1 truncate">
                  <p className="font-semibold text-slate-800 dark:text-neutral-200 truncate">
                    {log.action}
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-neutral-500">
                    {log.adminEmail} • {formatDate(log.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-neutral-800">
          <Link
            href="/activity-logs"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
          >
            <span>View all activity logs</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// ==========================================
// 4. Recent Users Widget
// ==========================================
export async function RecentUsersWidget() {
  const res = await getRecentUsersMetrics(6);

  return (
    <Card className="animate-in fade-in duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-base">Recent Registrations</CardTitle>
          <p className="text-xs text-slate-500 dark:text-neutral-400">
            Latest verified customer accounts
          </p>
        </div>
        <Link href="/users">
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            <span>View All</span>
            <ArrowUpRight className="w-3 h-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {!res.success || !res.data || res.data.length === 0 ? (
          <p className="p-6 text-center text-xs text-slate-400">No registered users found.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-neutral-800/80">
            {res.data.map((user) => {
              const isPro = user.entitlements && user.entitlements.length > 0;
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 hover:bg-slate-50/60 dark:hover:bg-neutral-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-neutral-300">
                      {user.image ? (
                        <img src={user.image} alt="Avatar" className="w-full h-full object-cover" />
                      ) : user.name ? (
                        user.name.charAt(0).toUpperCase()
                      ) : user.email ? (
                        user.email.charAt(0).toUpperCase()
                      ) : (
                        "U"
                      )}
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        {user.name || "Anonymous User"}
                      </p>
                      <p className="text-xs text-slate-400 dark:text-neutral-500 truncate">
                        {user.email || "No email"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {isPro ? <Badge variant="pro">PRO</Badge> : <Badge variant="free">FREE</Badge>}
                    <span className="text-xs text-slate-400 dark:text-neutral-500 hidden sm:inline">
                      {formatDate(user.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ==========================================
// 5. Recent Orders Widget
// ==========================================
export async function RecentOrdersWidget() {
  const res = await getRecentOrdersMetrics(6);

  return (
    <Card className="animate-in fade-in duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-base">Recent Cashfree Orders</CardTitle>
          <p className="text-xs text-slate-500 dark:text-neutral-400">
            Live payment records & status
          </p>
        </div>
        <Link href="/payments">
          <Button variant="ghost" size="sm" className="text-xs gap-1">
            <span>View All</span>
            <ArrowUpRight className="w-3 h-3" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        {!res.success || !res.data || res.data.length === 0 ? (
          <p className="p-6 text-center text-xs text-slate-400">No orders recorded yet.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-neutral-800/80">
            {res.data.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 hover:bg-slate-50/60 dark:hover:bg-neutral-800/30 transition-colors"
              >
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold text-slate-900 dark:text-white">
                      ₹{order.amount}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-neutral-400 font-medium">
                      ({order.planId})
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-neutral-500 truncate mt-0.5">
                    {order.user?.email || "Unknown user"}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {order.status === "SUCCESS" && <Badge variant="success">PAID</Badge>}
                  {order.status === "PENDING" && <Badge variant="warning">PENDING</Badge>}
                  {order.status === "FAILED" && <Badge variant="danger">FAILED</Badge>}
                  <span className="text-xs text-slate-400 dark:text-neutral-500 hidden sm:inline">
                    {formatDate(order.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ==========================================
// Purposeful, Brief Skeletons
// ==========================================
export function KpisSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="p-6 rounded-2xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-[#161618] space-y-3"
        >
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-9 w-9 rounded-xl" />
          </div>
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-3 w-36" />
        </div>
      ))}
    </div>
  );
}

export function HealthSkeleton() {
  return (
    <Card className="lg:col-span-2 animate-pulse">
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3 w-72" />
      </CardHeader>
      <CardContent className="space-y-6">
        <Skeleton className="h-4 w-full rounded-full" />
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-neutral-800">
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
          <Skeleton className="h-10 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}

export function RecentActivitySkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="space-y-2">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-3 w-48" />
      </CardHeader>
      <CardContent className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex gap-2 items-center">
            <Skeleton className="h-2 w-2 rounded-full" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function RecentUsersSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="flex justify-between items-center">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-6 w-16" />
      </CardHeader>
      <CardContent className="p-0 divide-y divide-slate-100 dark:divide-neutral-800">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <Skeleton className="h-9 w-9 rounded-full" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function RecentOrdersSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader className="flex justify-between items-center">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-6 w-16" />
      </CardHeader>
      <CardContent className="p-0 divide-y divide-slate-100 dark:divide-neutral-800">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 flex justify-between items-center">
            <div className="space-y-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
