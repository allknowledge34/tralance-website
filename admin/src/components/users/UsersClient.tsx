"use client";

import * as React from "react";
import {
  Search,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b-2 border-[#171717] dark:border-[#383838]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#171717] dark:text-white">
            User Management
          </h1>
          <p className="text-sm font-medium text-[#525252] dark:text-[#A3A3A3] mt-1">
            View registered user profiles, entitlement subscriptions, payment history, and tool saves.
          </p>
        </div>

        <Button
          onClick={handleExportCSV}
          disabled={exporting}
          variant="outline"
          size="sm"
          className="gap-2 shrink-0"
        >
          {exporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5 stroke-[2.5]" />}
          <span>Export CSV</span>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#171717] dark:text-[#A3A3A3] stroke-[2.5]" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-8 py-2 text-sm font-medium bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#FFE52E] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#171717] dark:text-[#A3A3A3] p-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] p-1 rounded-md shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] text-xs font-bold w-full sm:w-auto justify-center sm:justify-start">
          <button
            onClick={() => { setPlanFilter("all"); setPage(1); }}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              planFilter === "all"
                ? "bg-[#FFE52E] text-[#171717] border-2 border-[#171717] shadow-[1px_1px_0px_0px_#171717] font-black"
                : "text-[#525252] hover:text-[#171717] dark:text-[#A3A3A3] dark:hover:text-white border-2 border-transparent"
            }`}
          >
            All Users ({data.totalCount})
          </button>
          <button
            onClick={() => { setPlanFilter("pro"); setPage(1); }}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              planFilter === "pro"
                ? "bg-[#35B9F5] text-[#171717] border-2 border-[#171717] shadow-[1px_1px_0px_0px_#171717] font-black"
                : "text-[#525252] hover:text-[#171717] dark:text-[#A3A3A3] dark:hover:text-white border-2 border-transparent"
            }`}
          >
            Pro Active
          </button>
          <button
            onClick={() => { setPlanFilter("free"); setPage(1); }}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer ${
              planFilter === "free"
                ? "bg-[#E5E7EB] text-[#171717] border-2 border-[#171717] shadow-[1px_1px_0px_0px_#171717] font-black"
                : "text-[#525252] hover:text-[#171717] dark:text-[#A3A3A3] dark:hover:text-white border-2 border-transparent"
            }`}
          >
            Free Tier
          </button>
        </div>
      </div>

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-[#FFFDF5]/70 dark:bg-[#121214]/70 backdrop-blur-xs flex items-center justify-center z-10 rounded-lg">
            <Loader2 className="w-6 h-6 animate-spin text-[#171717] dark:text-white" />
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
                <TableCell colSpan={6} className="text-center py-12 text-[#525252] dark:text-[#A3A3A3] font-medium">
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
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#35B9F5] shadow-[1.5px_1.5px_0px_0px_#171717] overflow-hidden shrink-0 flex items-center justify-center font-black text-xs text-[#171717]">
                          {user.image ? (
                            <img src={user.image} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            user.name ? user.name.charAt(0).toUpperCase() : user.email ? user.email.charAt(0).toUpperCase() : "U"
                          )}
                        </div>
                        <div className="truncate max-w-[200px]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[#171717] dark:text-white truncate">
                              {user.name || "Anonymous User"}
                            </span>
                            {hasGoogle && (
                              <span className="text-[10px] font-black px-1.5 py-0.2 rounded border border-[#171717] bg-[#35B9F5] text-[#171717] shadow-[1px_1px_0px_0px_#171717]">
                                G
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] block truncate">
                            {user.email || "No email"}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      {activePro ? (
                        <div className="space-y-0.5">
                          <Badge variant="pro">PRO {activePro.planId?.toUpperCase()}</Badge>
                          <span className="text-[11px] font-medium text-[#525252] dark:text-[#A3A3A3] block">
                            Expires {new Date(activePro.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      ) : (
                        <Badge variant="free">FREE</Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <span className="font-mono font-bold text-[#171717] dark:text-white">
                        ₹{totalSpent}
                      </span>
                      <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] block">
                        {user.orders.length} order{user.orders.length === 1 ? "" : "s"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="text-[#171717] dark:text-[#E5E5E5] font-bold">
                        {user._count?.toolData || 0}
                      </span>
                    </TableCell>

                    <TableCell className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] whitespace-nowrap">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleOpenDetails(user.id)}
                        className="gap-1.5 text-xs h-8"
                      >
                        <Eye className="w-3.5 h-3.5 stroke-[2.5]" />
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

      {data.totalPages > 1 && (
        <div className="flex items-center justify-between text-xs font-bold text-[#525252] dark:text-[#A3A3A3] pt-2">
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
              <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
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
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Button>
          </div>
        </div>
      )}

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
            <Loader2 className="w-8 h-8 animate-spin text-[#171717] dark:text-white mb-2" />
            <p className="text-xs font-bold text-[#525252] dark:text-[#A3A3A3]">Loading user history...</p>
          </div>
        ) : userDetails ? (
          <div className="space-y-6 text-sm">
            <div className="flex items-center gap-4 p-4 rounded-md bg-[#FFF9D2] dark:bg-[#202024] border-2 border-[#171717] dark:border-[#383838] shadow-[3px_3px_0px_0px_#171717] dark:shadow-[3px_3px_0px_0px_#000000]">
              <div className="w-12 h-12 rounded-md border-2 border-[#171717] bg-[#35B9F5] shadow-[2px_2px_0px_0px_#171717] flex items-center justify-center font-black text-base text-[#171717] overflow-hidden shrink-0">
                {userDetails.image ? (
                  <img src={userDetails.image} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  userDetails.name ? userDetails.name.charAt(0) : "U"
                )}
              </div>
              <div className="truncate">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-[#171717] dark:text-white truncate">
                    {userDetails.name || "Anonymous User"}
                  </h3>
                  {userDetails.entitlements.some((e: any) => e.expiresAt && new Date(e.expiresAt) > now) ? (
                    <Badge variant="pro">PRO</Badge>
                  ) : (
                    <Badge variant="free">FREE</Badge>
                  )}
                </div>
                <p className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">{userDetails.email}</p>
                <p className="text-[11px] font-bold text-[#525252] dark:text-[#A3A3A3] mt-1">
                  User ID: <span className="font-mono">{userDetails.id}</span>
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black text-[#171717] dark:text-white uppercase tracking-wider mb-2">
                Entitlements & Plans
              </h4>
              {userDetails.entitlements.length === 0 ? (
                <p className="text-xs text-[#525252] dark:text-[#A3A3A3] italic">No entitlement records found.</p>
              ) : (
                <div className="space-y-2">
                  {userDetails.entitlements.map((ent: any) => {
                    const isCurrent = ent.expiresAt && new Date(ent.expiresAt) > now;
                    return (
                      <div
                        key={ent.id}
                        className="flex items-center justify-between p-3 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
                      >
                        <div>
                          <span className="font-bold text-[#171717] dark:text-white">
                            Plan: {ent.planId?.toUpperCase()}
                          </span>
                          <span className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] block">
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

            <div>
              <h4 className="text-xs font-black text-[#171717] dark:text-white uppercase tracking-wider mb-2">
                Cashfree Order History
              </h4>
              {userDetails.orders.length === 0 ? (
                <p className="text-xs text-[#525252] dark:text-[#A3A3A3] italic">No checkout orders placed yet.</p>
              ) : (
                <div className="max-h-44 overflow-y-auto divide-y-2 divide-[#171717]/10 dark:divide-[#383838] rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]">
                  {userDetails.orders.map((order: any) => (
                    <div key={order.id} className="p-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-bold text-[#171717] dark:text-white">
                          ₹{order.amount} ({order.planId})
                        </span>
                        <span className="text-[11px] font-semibold text-[#525252] dark:text-[#A3A3A3] block font-mono">
                          {order.id}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {order.status === "SUCCESS" && <Badge variant="success">PAID</Badge>}
                        {order.status === "PENDING" && <Badge variant="warning">PENDING</Badge>}
                        {order.status === "FAILED" && <Badge variant="danger">FAILED</Badge>}
                        <span className="text-[11px] font-semibold text-[#525252] dark:text-[#A3A3A3]">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h4 className="text-xs font-black text-[#171717] dark:text-white uppercase tracking-wider mb-2">
                Cloud Saved Items ({userDetails.toolData?.length || 0})
              </h4>
              {userDetails.toolData?.length === 0 ? (
                <p className="text-xs text-[#525252] dark:text-[#A3A3A3] italic">No cloud saved documents.</p>
              ) : (
                <div className="max-h-36 overflow-y-auto space-y-2">
                  {userDetails.toolData.map((td: any) => (
                    <div
                      key={td.id}
                      className="p-2.5 rounded-md bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[1.5px_1.5px_0px_0px_#171717] dark:shadow-[1.5px_1.5px_0px_0px_#000000] flex items-center justify-between text-xs"
                    >
                      <span className="font-bold text-[#171717] dark:text-white truncate max-w-xs">
                        {td.name}
                      </span>
                      <span className="text-[11px] font-bold text-[#525252] dark:text-[#A3A3A3] font-mono">
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
