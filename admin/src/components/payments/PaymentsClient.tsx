"use client";

import * as React from "react";
import {
  CreditCard,
  Download,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { StatsCard } from "@/components/ui/stats-card";
import { getPayments, exportPaymentsCSV } from "@/lib/actions/payments";

export function PaymentsClient() {
  const [statusFilter, setStatusFilter] = React.useState<"all" | "SUCCESS" | "PENDING" | "FAILED">("all");
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [exporting, setExporting] = React.useState(false);

  const [data, setData] = React.useState<any>({
    orders: [],
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
    stats: {
      totalRevenue: 0,
      successfulCount: 0,
      pendingCount: 0,
      failedCount: 0,
      totalCount: 0,
      successRate: "0",
    },
  });

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await getPayments({
        status: statusFilter,
        search,
        page,
        pageSize: 15,
      });
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search, page]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchData]);

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const csv = await exportPaymentsCSV();
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `tralance_payments_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Payments & Subscriptions
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-0.5">
            Verified server-side Cashfree transaction records, revenue volume, and subscription events.
          </p>
        </div>

        <Button
          onClick={handleExportCSV}
          disabled={exporting}
          variant="outline"
          size="sm"
          className="gap-2 shrink-0 shadow-xs"
        >
          {exporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
          <span>Export CSV</span>
        </Button>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Verified Revenue"
          value={`₹${data.stats.totalRevenue.toLocaleString("en-IN")}`}
          subtitle="Total successfully collected via Cashfree"
          icon={CreditCard}
          iconColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50"
        />

        <StatsCard
          title="Paid Orders"
          value={data.stats.successfulCount}
          subtitle={`${data.stats.successRate}% conversion checkout rate`}
          icon={CheckCircle2}
          iconColor="text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/50"
        />

        <StatsCard
          title="Pending Checkouts"
          value={data.stats.pendingCount}
          subtitle="Orders awaiting customer payment completion"
          icon={Clock}
          iconColor="text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-100 dark:border-amber-900/50"
        />

        <StatsCard
          title="Gateway Engine"
          value="Cashfree v3"
          subtitle="API Version: 2025-01-01 (Production)"
          icon={ShieldCheck}
          iconColor="text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-100 dark:border-indigo-900/50"
        />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by order ID, email, or name..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-neutral-800/80 p-1 rounded-xl text-xs font-medium w-full sm:w-auto justify-center sm:justify-start">
          <button
            onClick={() => { setStatusFilter("all"); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === "all"
                ? "bg-white dark:bg-[#161618] text-slate-900 dark:text-white shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-neutral-200"
            }`}
          >
            All Orders ({data.stats.totalCount})
          </button>
          <button
            onClick={() => { setStatusFilter("SUCCESS"); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === "SUCCESS"
                ? "bg-white dark:bg-[#161618] text-emerald-600 shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-neutral-200"
            }`}
          >
            Paid ({data.stats.successfulCount})
          </button>
          <button
            onClick={() => { setStatusFilter("PENDING"); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === "PENDING"
                ? "bg-white dark:bg-[#161618] text-amber-600 shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-neutral-200"
            }`}
          >
            Pending ({data.stats.pendingCount})
          </button>
          <button
            onClick={() => { setStatusFilter("FAILED"); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === "FAILED"
                ? "bg-white dark:bg-[#161618] text-red-600 shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-neutral-200"
            }`}
          >
            Failed ({data.stats.failedCount})
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-[#121214]/50 backdrop-blur-xs flex items-center justify-center z-10 rounded-xl">
            <Loader2 className="w-6 h-6 animate-spin text-slate-600 dark:text-neutral-300" />
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-slate-400">
                  {search ? `No orders matched "${search}".` : "No payment orders found."}
                </TableCell>
              </TableRow>
            ) : (
              data.orders.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs font-semibold text-slate-800 dark:text-neutral-200">
                    {order.id}
                  </TableCell>

                  <TableCell>
                    <div className="truncate max-w-[220px]">
                      <span className="font-semibold text-slate-900 dark:text-white block truncate">
                        {order.user?.name || "Customer"}
                      </span>
                      <span className="text-xs text-slate-400 block truncate">
                        {order.user?.email || "No email"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {order.planId}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      ₹{order.amount}
                    </span>
                  </TableCell>

                  <TableCell>
                    {order.status === "SUCCESS" && <Badge variant="success">PAID</Badge>}
                    {order.status === "PENDING" && <Badge variant="warning">PENDING</Badge>}
                    {order.status === "FAILED" && <Badge variant="danger">FAILED</Badge>}
                  </TableCell>

                  <TableCell className="text-xs text-slate-500 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
          <span>
            Page {data.currentPage} of {data.totalPages} ({data.totalCount} orders)
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="gap-1 h-8"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= data.totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="gap-1 h-8"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
