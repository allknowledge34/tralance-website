"use client";

import * as React from "react";
import {
  Search,
  Download,
  Eye,
  Crown,
  Calendar,
  CreditCard,
  Shield,
  Layers,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Modal } from "@/components/ui/modal";
import { getUsers, getUserDetails, exportUsersCSV } from "@/lib/actions/users";

export function UsersClient() {
  const [search, setSearch] = React.useState("");
  const [planFilter, setPlanFilter] = React.useState<"all" | "pro" | "free">("all");
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<{
    users: any[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }>({
    users: [],
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
  });

  // User details modal state
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
  const [userDetails, setUserDetails] = React.useState<any | null>(null);
  const [loadingDetails, setLoadingDetails] = React.useState(false);
  const [exporting, setExporting] = React.useState(false);

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await getUsers({
        search,
        planFilter,
        page,
        pageSize: 12,
      });
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, planFilter, page]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchUsers]);

  const handleOpenDetails = async (id: string) => {
    setSelectedUserId(id);
    setLoadingDetails(true);
    try {
      const details = await getUserDetails(id);
      setUserDetails(details);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const csvData = await exportUsersCSV();
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `tralance_users_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  const now = new Date();

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            User Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-0.5">
            View registered user profiles, entitlement subscriptions, payment history, and tool saves.
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

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-neutral-700 shadow-xs"
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

        {/* Plan Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-neutral-800/80 p-1 rounded-xl text-xs font-medium w-full sm:w-auto justify-center sm:justify-start">
          <button
            onClick={() => { setPlanFilter("all"); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              planFilter === "all"
                ? "bg-white dark:bg-[#161618] text-slate-900 dark:text-white shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-neutral-200"
            }`}
          >
            All Users ({data.totalCount})
          </button>
          <button
            onClick={() => { setPlanFilter("pro"); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              planFilter === "pro"
                ? "bg-white dark:bg-[#161618] text-blue-600 dark:text-blue-400 shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-neutral-200"
            }`}
          >
            Pro Active
          </button>
          <button
            onClick={() => { setPlanFilter("free"); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              planFilter === "free"
                ? "bg-white dark:bg-[#161618] text-slate-900 dark:text-white shadow-xs font-semibold"
                : "text-slate-500 hover:text-slate-800 dark:hover:text-neutral-200"
            }`}
          >
            Free Tier
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-[#121214]/50 backdrop-blur-xs flex items-center justify-center z-10 rounded-xl">
            <Loader2 className="w-6 h-6 animate-spin text-slate-600 dark:text-neutral-300" />
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Account</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Orders / Spend</TableHead>
              <TableHead>Cloud Saves</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-slate-400">
                  {search ? `No users match "${search}".` : "No registered users found."}
                </TableCell>
              </TableRow>
            ) : (
              data.users.map((user) => {
                const activePro = user.entitlements.find(
                  (e: any) => e.expiresAt && new Date(e.expiresAt) > now
                );
                const successfulOrders = user.orders.filter((o: any) => o.status === "SUCCESS");
                const totalSpent = successfulOrders.reduce((sum: number, o: any) => sum + o.amount, 0);
                const hasGoogle = user.accounts?.some((a: any) => a.provider === "google");

                return (
                  <TableRow key={user.id}>
                    {/* User profile */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-neutral-800 overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs text-slate-600 dark:text-neutral-300 border border-slate-200/60 dark:border-neutral-700">
                          {user.image ? (
                            <img src={user.image} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            user.name ? user.name.charAt(0).toUpperCase() : user.email ? user.email.charAt(0).toUpperCase() : "U"
                          )}
                        </div>
                        <div className="truncate max-w-[200px]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-slate-900 dark:text-white truncate">
                              {user.name || "Anonymous User"}
                            </span>
                            {hasGoogle && (
                              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-sm bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/50">
                                G
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400 dark:text-neutral-500 block truncate">
                            {user.email || "No email"}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Subscription */}
                    <TableCell>
                      {activePro ? (
                        <div className="space-y-0.5">
                          <Badge variant="pro">PRO {activePro.planId?.toUpperCase()}</Badge>
                          <span className="text-[11px] text-slate-400 dark:text-neutral-500 block">
                            Expires {new Date(activePro.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      ) : (
                        <Badge variant="free">FREE</Badge>
                      )}
                    </TableCell>

                    {/* Orders / Spend */}
                    <TableCell>
                      <span className="font-mono font-semibold text-slate-800 dark:text-neutral-200">
                        ₹{totalSpent}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-neutral-500 block">
                        {user.orders.length} order{user.orders.length === 1 ? "" : "s"}
                      </span>
                    </TableCell>

                    {/* Cloud Saves */}
                    <TableCell>
                      <span className="text-slate-700 dark:text-neutral-300 font-medium">
                        {user._count?.toolData || 0}
                      </span>
                    </TableCell>

                    {/* Registered Date */}
                    <TableCell className="text-xs text-slate-500 dark:text-neutral-400 whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleOpenDetails(user.id)}
                        className="gap-1.5 text-xs h-8"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400 pt-2">
          <span>
            Page {data.currentPage} of {data.totalPages} ({data.totalCount} total users)
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

      {/* User Details Modal */}
      <Modal
        isOpen={!!selectedUserId}
        onClose={() => {
          setSelectedUserId(null);
          setUserDetails(null);
        }}
        title="User Account Details"
        description="Comprehensive profile, active subscription status, and transaction history."
        maxWidth="2xl"
      >
        {loadingDetails ? (
          <div className="py-16 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400 mb-2" />
            <p className="text-xs text-slate-500">Loading user history...</p>
          </div>
        ) : userDetails ? (
          <div className="space-y-6 text-sm">
            {/* Header Profile Info */}
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200/80 dark:border-neutral-800">
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-base text-slate-700 dark:text-neutral-200 overflow-hidden shrink-0">
                {userDetails.image ? (
                  <img src={userDetails.image} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  userDetails.name ? userDetails.name.charAt(0) : "U"
                )}
              </div>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white truncate">
                    {userDetails.name || "Anonymous User"}
                  </h3>
                  {userDetails.entitlements.some((e: any) => e.expiresAt && new Date(e.expiresAt) > now) ? (
                    <Badge variant="pro">PRO</Badge>
                  ) : (
                    <Badge variant="free">FREE</Badge>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400">{userDetails.email}</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  User ID: <span className="font-mono">{userDetails.id}</span>
                </p>
              </div>
            </div>

            {/* Active Entitlements */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
                Entitlements & Plans
              </h4>
              {userDetails.entitlements.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No entitlement records found.</p>
              ) : (
                <div className="space-y-2">
                  {userDetails.entitlements.map((ent: any) => {
                    const isCurrent = ent.expiresAt && new Date(ent.expiresAt) > now;
                    return (
                      <div
                        key={ent.id}
                        className="flex items-center justify-between p-3 rounded-xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-[#161618]"
                      >
                        <div>
                          <span className="font-semibold text-slate-800 dark:text-neutral-200">
                            Plan: {ent.planId?.toUpperCase()}
                          </span>
                          <span className="text-xs text-slate-400 block">
                            Expires: {ent.expiresAt ? new Date(ent.expiresAt).toLocaleDateString() : "Never"}
                          </span>
                        </div>
                        {isCurrent ? (
                          <Badge variant="success">Active</Badge>
                        ) : (
                          <Badge variant="secondary">Expired</Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Orders History */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
                Cashfree Order History
              </h4>
              {userDetails.orders.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No checkout orders placed yet.</p>
              ) : (
                <div className="max-h-44 overflow-y-auto divide-y divide-slate-100 dark:divide-neutral-800 rounded-xl border border-slate-200/80 dark:border-neutral-800 bg-white dark:bg-[#161618]">
                  {userDetails.orders.map((order: any) => (
                    <div key={order.id} className="p-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-semibold text-slate-800 dark:text-neutral-200">
                          ₹{order.amount} ({order.planId})
                        </span>
                        <span className="text-[11px] text-slate-400 block font-mono">
                          {order.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {order.status === "SUCCESS" && <Badge variant="success">PAID</Badge>}
                        {order.status === "PENDING" && <Badge variant="warning">PENDING</Badge>}
                        {order.status === "FAILED" && <Badge variant="danger">FAILED</Badge>}
                        <span className="text-[11px] text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Tool Records */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
                Cloud Saved Items ({userDetails.toolData?.length || 0})
              </h4>
              {userDetails.toolData?.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No cloud saved documents.</p>
              ) : (
                <div className="max-h-36 overflow-y-auto space-y-1.5">
                  {userDetails.toolData.map((td: any) => (
                    <div
                      key={td.id}
                      className="p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-900 border border-slate-200/60 dark:border-neutral-800 flex items-center justify-between text-xs"
                    >
                      <span className="font-medium text-slate-800 dark:text-neutral-200 truncate max-w-xs">
                        {td.name}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {td.toolId}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
