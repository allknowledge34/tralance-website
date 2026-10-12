"use client";

import * as React from "react";
import {
  CreditCard,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000]">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-[#171717] dark:text-[#FFFDF5]">
            Payments & Subscriptions
          </h1>
          <p className="text-sm font-medium text-subtle mt-0.5">
            Verified server-side Cashfree transaction records, revenue volume, and subscription events.
          </p>
        </div>

        <Button
          onClick={handleExportCSV}
          disabled={exporting}
          variant="outline"
          size="sm"
          className="gap-2 shrink-0 bg-[#FFE52E] text-[#171717] hover:bg-[#FFE52E]/80 border-2 border-[#171717]"
        >
          {exporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
          <span>Export CSV</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Verified Revenue"
          value={`₹${data.stats.totalRevenue.toLocaleString("en-IN")}`}
          subtitle="Total successfully collected via Cashfree"
          icon={CreditCard}
          accentColor="mint"
        />

        <StatsCard
          title="Paid Orders"
          value={data.stats.successfulCount}
          subtitle={`${data.stats.successRate}% conversion checkout rate`}
          icon={CheckCircle2}
          accentColor="blue"
        />

        <StatsCard
          title="Pending Checkouts"
          value={data.stats.pendingCount}
          subtitle="Orders awaiting customer payment completion"
          icon={Clock}
          accentColor="yellow"
        />

        <StatsCard
          title="Gateway Engine"
          value="Cashfree v3"
          subtitle="API Version: 2025-01-01 (Production)"
          icon={ShieldCheck}
          accentColor="purple"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-subtle" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by order ID, email, or name..."
            className="w-full pl-10 pr-8 py-2 text-sm font-medium bg-white dark:bg-[#27272A] border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] text-[#171717] dark:text-[#FFFDF5] placeholder:text-subtle focus:outline-none focus:border-[#FFE52E]"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle hover:text-[#171717] dark:hover:text-[#FFFDF5]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] p-1 text-xs font-bold uppercase tracking-wider w-full sm:w-auto justify-center sm:justify-start flex-wrap">
          <button
            onClick={() => { setStatusFilter("all"); setPage(1); }}
            className={`px-3 py-1.5 border-2 transition-all ${
              statusFilter === "all"
                ? "bg-[#FFE52E] text-[#171717] border-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717]"
                : "border-transparent text-subtle hover:bg-[#FFE52E]/20 hover:text-[#171717]"
            }`}
          >
            All Orders ({data.stats.totalCount})
          </button>
          <button
            onClick={() => { setStatusFilter("SUCCESS"); setPage(1); }}
            className={`px-3 py-1.5 border-2 transition-all ${
              statusFilter === "SUCCESS"
                ? "bg-[#6EE7B7] text-[#171717] border-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717]"
                : "border-transparent text-subtle hover:bg-[#6EE7B7]/20 hover:text-[#171717]"
            }`}
          >
            Paid ({data.stats.successfulCount})
          </button>
          <button
            onClick={() => { setStatusFilter("PENDING"); setPage(1); }}
            className={`px-3 py-1.5 border-2 transition-all ${
              statusFilter === "PENDING"
                ? "bg-[#FFE52E] text-[#171717] border-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717]"
                : "border-transparent text-subtle hover:bg-[#FFE52E]/20 hover:text-[#171717]"
            }`}
          >
            Pending ({data.stats.pendingCount})
          </button>
          <button
            onClick={() => { setStatusFilter("FAILED"); setPage(1); }}
            className={`px-3 py-1.5 border-2 transition-all ${
              statusFilter === "FAILED"
                ? "bg-[#FF6B6B] text-[#171717] border-[#171717] shadow-[1.5px_1.5px_0px_0px_#171717]"
                : "border-transparent text-subtle hover:bg-[#FF6B6B]/20 hover:text-[#171717]"
            }`}
          >
            Failed ({data.stats.failedCount})
          </button>
        </div>
      </div>

      <div className="relative border-2 border-[#171717] dark:border-[#383838] shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000] bg-[#FFFDF5] dark:bg-[#18181B]">
        {loading && (
          <div className="absolute inset-0 bg-white/70 dark:bg-[#121214]/70 flex items-center justify-center z-10">
            <Loader2 className="w-7 h-7 animate-spin text-[#171717] dark:text-[#FFE52E]" />
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow className="bg-[#FFF9D2] dark:bg-[#27272A] border-b-2 border-[#171717] dark:border-[#383838]">
              <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Order ID</TableHead>
              <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Customer</TableHead>
              <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Plan</TableHead>
              <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Amount</TableHead>
              <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Status</TableHead>
              <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-subtle font-bold uppercase tracking-wider text-xs">
                  {search ? `No orders matched "${search}".` : "No payment orders found."}
                </TableCell>
              </TableRow>
            ) : (
              data.orders.map((order: any) => (
                <TableRow key={order.id} className="border-b-2 border-[#171717] dark:border-[#383838] hover:bg-[#FFE52E]/10 transition-colors">
                  <TableCell className="font-mono text-xs font-bold text-[#171717] dark:text-[#FFFDF5]">
                    <span className="px-1.5 py-0.5 bg-white dark:bg-[#27272A] border border-[#171717] dark:border-[#383838]">
                      {order.id}
                    </span>
                  </TableCell>

                  <TableCell>
                    <div className="truncate max-w-[220px]">
                      <span className="font-bold text-[#171717] dark:text-[#FFFDF5] block truncate">
                        {order.user?.name || "Customer"}
                      </span>
                      <span className="text-xs font-medium text-subtle block truncate">
                        {order.user?.email || "No email"}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="pro" className="capitalize font-black">
                      {order.planId}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <span className="font-mono font-black text-sm text-[#171717] dark:text-[#FFFDF5]">
                      ₹{order.amount}
                    </span>
                  </TableCell>

                  <TableCell>
                    {order.status === "SUCCESS" && <Badge variant="success">PAID</Badge>}
                    {order.status === "PENDING" && <Badge variant="warning">PENDING</Badge>}
                    {order.status === "FAILED" && <Badge variant="danger">FAILED</Badge>}
                  </TableCell>

                  <TableCell className="text-xs font-mono font-medium text-subtle whitespace-nowrap">
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

      {data.totalPages > 1 && (
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-subtle pt-2">
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
