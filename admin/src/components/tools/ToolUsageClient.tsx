"use client";

import * as React from "react";
import {
  Wrench,
  FileText,
  Bookmark,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/ui/stats-card";

interface ToolUsageProps {
  data: {
    toolsSummary: Array<{
      id: string;
      name: string;
      route: string;
      pdfGenerations: number;
      cloudSaves: number;
      limits: string;
    }>;
    totalTrackedSessions: number;
    totalSavedDocuments: number;
    proEntitlementsCount: number;
    totalUsers: number;
    recentSavedItems: Array<{
      id: string;
      toolId: string;
      name: string;
      updatedAt: Date;
      user: { email: string | null; name: string | null };
    }>;
  };
}

export function ToolUsageClient({ data }: ToolUsageProps) {
  const totalPdf = data.toolsSummary.reduce((sum, t) => sum + t.pdfGenerations, 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Freelancer Tool Usage Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-0.5">
            Monitor real-world PDF generation volume, cloud document saves, and usage limits across all 5 tools.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="Total PDF Generations"
          value={totalPdf}
          subtitle="Aggregated across invoices, briefs & contracts"
          icon={FileText}
          iconColor="text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-100 dark:border-blue-900/50"
        />

        <StatsCard
          title="Total Cloud Saved Records"
          value={data.totalSavedDocuments}
          subtitle="Pro feature cloud persistence storage"
          icon={Bookmark}
          iconColor="text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-100 dark:border-purple-900/50"
        />

        <StatsCard
          title="Tracked User Sessions"
          value={data.totalTrackedSessions}
          subtitle="Unique identifiers tracked in PdfUsage table"
          icon={Layers}
          iconColor="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-100 dark:border-emerald-900/50"
        />
      </div>

      {/* Tools Breakdown Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Tool Utilization Breakdown</CardTitle>
          <p className="text-xs text-slate-500 dark:text-neutral-400">
            Real usage statistics tracked per tool in Neon PostgreSQL
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tool Name & Public Link</TableHead>
                <TableHead>PDF Generations</TableHead>
                <TableHead>Cloud Saved Items</TableHead>
                <TableHead>Configured Tier Limits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.toolsSummary.map((tool) => (
                <TableRow key={tool.id}>
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {tool.name}
                        </span>
                        <a
                          href={`https://www.tralance.pro${tool.route}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                          title="Open tool on website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {tool.id}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="font-bold text-slate-800 dark:text-neutral-200">
                      {tool.pdfGenerations}
                    </span>
                    <span className="text-xs text-slate-400 block">PDFs printed</span>
                  </TableCell>

                  <TableCell>
                    <span className="font-bold text-slate-800 dark:text-neutral-200">
                      {tool.cloudSaves}
                    </span>
                    <span className="text-xs text-slate-400 block">saved records</span>
                  </TableCell>

                  <TableCell>
                    <Badge variant="secondary" className="text-[11px] font-normal">
                      {tool.limits}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Recent Cloud Saves Feed */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Cloud Document Saves</CardTitle>
          <p className="text-xs text-slate-500 dark:text-neutral-400">
            Latest saved document records from Pro freelancers
          </p>
        </CardHeader>
        <CardContent className="p-0">
          {data.recentSavedItems.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <Bookmark className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-neutral-700" />
              No saved documents in database yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-neutral-800/80">
              {data.recentSavedItems.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between text-xs hover:bg-slate-50/50 dark:hover:bg-neutral-800/30 transition-colors">
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white block">
                      {item.name}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Tool: {item.toolId} • User: {item.user?.email || "Unknown"}
                    </span>
                  </div>
                  <span className="text-slate-400">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
