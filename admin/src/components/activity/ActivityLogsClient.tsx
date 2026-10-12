"use client";

import * as React from "react";
import {
  Shield,
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000]">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-[#171717] dark:text-[#FFFDF5]">
            Administrative Activity Logs
          </h1>
          <p className="text-sm font-medium text-subtle mt-0.5">
            Immutable audit trail of all sensitive administrator operations, content updates, and broadcasts.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b-2 border-[#171717] dark:border-[#383838]">
          <CardTitle className="text-base font-black uppercase tracking-wide">Audit Log Records ({data.totalCount})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 flex items-center justify-center">
              <Loader2 className="w-7 h-7 animate-spin text-[#171717] dark:text-[#FFE52E]" />
            </div>
          ) : data.logs.length === 0 ? (
            <div className="py-16 text-center text-xs font-bold uppercase tracking-wider text-subtle">
              <Shield className="w-8 h-8 mx-auto mb-2 text-subtle opacity-50" />
              No administrative events recorded in audit log yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-[#FFF9D2] dark:bg-[#27272A] border-b-2 border-[#171717] dark:border-[#383838]">
                  <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Action & Entity</TableHead>
                  <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Details</TableHead>
                  <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Administrator</TableHead>
                  <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5] text-right">Timestamp</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.logs.map((log: any) => (
                  <TableRow key={log.id} className="border-b-2 border-[#171717] dark:border-[#383838] hover:bg-[#FFE52E]/10 transition-colors">
                    <TableCell>
                      <div className="space-y-1">
                        <span className="font-mono text-xs font-black text-[#171717] dark:text-[#FFFDF5] block">
                          {log.action}
                        </span>
                        <Badge variant="default" className="text-[10px] font-bold">
                          {log.entityType}
                        </Badge>
                      </div>
                    </TableCell>

                    <TableCell>
                      <p className="text-xs font-medium text-[#171717] dark:text-[#FFFDF5] max-w-md">
                        {log.details || "No additional context"}
                      </p>
                      {log.entityId && (
                        <span className="text-[10px] font-mono font-bold text-subtle block mt-0.5">
                          ID: {log.entityId}
                        </span>
                      )}
                    </TableCell>

                    <TableCell>
                      <span className="text-xs font-bold text-[#171717] dark:text-[#FFFDF5] block truncate max-w-xs">
                        {log.adminEmail}
                      </span>
                      {log.ipAddress && (
                        <span className="text-[10px] font-mono font-bold text-subtle">
                          IP: {log.ipAddress}
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="text-right text-xs font-mono font-bold text-subtle whitespace-nowrap">
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

      {data.totalPages > 1 && (
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-subtle pt-2">
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
