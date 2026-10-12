"use client";

import * as React from "react";
import {
  FileText,
  Bookmark,
  ExternalLink,
  Layers,
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000]">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-[#171717] dark:text-[#FFFDF5]">
            Freelancer Tool Usage Analytics
          </h1>
          <p className="text-sm font-medium text-subtle mt-0.5">
            Monitor real-world PDF generation volume, cloud document saves, and usage limits across all 5 tools.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard
          title="Total PDF Generations"
          value={totalPdf}
          subtitle="Aggregated across invoices, briefs & contracts"
          icon={FileText}
          accentColor="yellow"
        />

        <StatsCard
          title="Total Cloud Saved Records"
          value={data.totalSavedDocuments}
          subtitle="Pro feature cloud persistence storage"
          icon={Bookmark}
          accentColor="purple"
        />

        <StatsCard
          title="Tracked User Sessions"
          value={data.totalTrackedSessions}
          subtitle="Unique identifiers tracked in PdfUsage table"
          icon={Layers}
          accentColor="mint"
        />
      </div>

      <Card>
        <CardHeader className="pb-3 border-b-2 border-[#171717] dark:border-[#383838]">
          <CardTitle className="text-base font-black uppercase tracking-wide">Tool Utilization Breakdown</CardTitle>
          <p className="text-xs font-medium text-subtle">
            Real usage statistics tracked per tool in Neon PostgreSQL
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FFF9D2] dark:bg-[#27272A] border-b-2 border-[#171717] dark:border-[#383838]">
                <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Tool Name & Public Link</TableHead>
                <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">PDF Generations</TableHead>
                <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Cloud Saved Items</TableHead>
                <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Configured Tier Limits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.toolsSummary.map((tool) => (
                <TableRow key={tool.id} className="border-b-2 border-[#171717] dark:border-[#383838] hover:bg-[#FFE52E]/10 transition-colors">
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#171717] dark:text-[#FFFDF5]">
                          {tool.name}
                        </span>
                        <a
                          href={`https://www.tralance.pro${tool.route}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 border border-[#171717] dark:border-[#383838] bg-[#FFE52E] text-[#171717] shadow-[1px_1px_0px_0px_#171717] hover:bg-[#FFE52E]/80 transition-colors"
                          title="Open tool on website"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-subtle">
                        {tool.id}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="font-black text-sm text-[#171717] dark:text-[#FFFDF5]">
                      {tool.pdfGenerations}
                    </span>
                    <span className="text-xs font-medium text-subtle block">PDFs printed</span>
                  </TableCell>

                  <TableCell>
                    <span className="font-black text-sm text-[#171717] dark:text-[#FFFDF5]">
                      {tool.cloudSaves}
                    </span>
                    <span className="text-xs font-medium text-subtle block">saved records</span>
                  </TableCell>

                  <TableCell>
                    <Badge variant="default" className="text-[11px] font-bold">
                      {tool.limits}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3 border-b-2 border-[#171717] dark:border-[#383838]">
          <CardTitle className="text-base font-black uppercase tracking-wide">Recent Cloud Document Saves</CardTitle>
          <p className="text-xs font-medium text-subtle">
            Latest saved document records from Pro freelancers
          </p>
        </CardHeader>
        <CardContent className="p-0">
          {data.recentSavedItems.length === 0 ? (
            <div className="py-12 text-center text-xs font-bold uppercase tracking-wider text-subtle">
              <Bookmark className="w-8 h-8 mx-auto mb-2 text-subtle opacity-50" />
              No saved documents in database yet.
            </div>
          ) : (
            <div className="divide-y-2 divide-[#171717] dark:divide-[#383838]">
              {data.recentSavedItems.map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between text-xs hover:bg-[#FFE52E]/10 transition-colors">
                  <div>
                    <span className="font-bold text-[#171717] dark:text-[#FFFDF5] block">
                      {item.name}
                    </span>
                    <span className="text-subtle font-mono text-[11px] font-medium">
                      Tool: {item.toolId} • User: {item.user?.email || "Unknown"}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-subtle">
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
