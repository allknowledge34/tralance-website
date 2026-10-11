"use client";

import * as React from "react";
import {
  History,
  Shield,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAuditLogs } from "@/lib/actions/auditLogs";

export function ActivityLogsClient() {
  const [data, setData] = React.useState<any>({
    logs: [],
    totalCount: 0,
    totalPages: 1,
    currentPage: 1,
  });
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  const fetchLogs = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAuditLogs(page, 20);
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  React.useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Administrative Activity Logs
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-0.5">
            Immutable audit trail of all sensitive administrator operations, content updates, and broadcasts.
          </p>
        </div>
      </div>

      {/* Audit Log Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Audit Log Records ({data.totalCount})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
          ) : data.logs.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-400">
              <Shield className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-neutral-700" />
              No administrative events recorded in audit log yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action & Entity</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Administrator</TableHead>
                  <TableHead className="text-right">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.logs.map((log: any) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <span className="font-mono text-xs font-bold text-slate-900 dark:text-white block">
                          {log.action}
                        </span>
                        <Badge variant="secondary" className="text-[10px]">
                          {log.entityType}
                        </Badge>
                      </div>
                    </TableCell>

                    <TableCell>
                      <p className="text-xs text-slate-700 dark:text-neutral-300 max-w-md">
                        {log.details || "No additional context"}
                      </p>
                      {log.entityId && (
                        <span className="text-[10px] font-mono text-slate-400 block mt-0.5">
                          ID: {log.entityId}
                        </span>
                      )}
                    </TableCell>

                    <TableCell>
                      <span className="text-xs font-medium text-slate-800 dark:text-neutral-200 block truncate max-w-xs">
                        {log.adminEmail}
                      </span>
                      {log.ipAddress && (
                        <span className="text-[10px] font-mono text-slate-400">
                          IP: {log.ipAddress}
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="text-right text-xs text-slate-500 whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination Footer */}
      {data.totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
          <span>
            Page {data.currentPage} of {data.totalPages} ({data.totalCount} audit events)
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
