"use client";

import * as React from "react";
import {
  Search,
  Globe,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  FileText,
  Shield,
  Layers,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const pagesMatrix = [
  {
    path: "/",
    title: "Tralance - Offline-First Freelance Management",
    description: "Practical tools for freelancers to manage projects, money, clients, and the work behind them with privacy at the core.",
    robots: "index, follow",
    sitemap: true,
    og: true,
  },
  {
    path: "/pricing",
    title: "Pricing Plans - Tralance Pro",
    description: "Affordable Pro plans: Monthly ₹49, Annual ₹149. Unlimited PDF downloads and cloud backup for freelance professionals.",
    robots: "index, follow",
    sitemap: true,
    og: true,
  },
  {
    path: "/tools",
    title: "Freelancer Tools Suite - Tralance",
    description: "Discover free privacy-friendly calculators, invoice generators, brief builders, and contracts.",
    robots: "index, follow",
    sitemap: true,
    og: true,
  },
  {
    path: "/tools/freelancer-invoice-generator",
    title: "Freelance Invoice Generator | Tralance",
    description: "Create professional freelance invoices with GST, international currencies, tax calculation, and instant PDF download.",
    robots: "index, follow",
    sitemap: true,
    og: true,
  },
  {
    path: "/tools/freelance-contract-generator",
    title: "Freelance Contract Generator | Tralance",
    description: "Generate legally sound freelance agreements, protect intellectual property, and define clear milestone payment terms.",
    robots: "index, follow",
    sitemap: true,
    og: true,
  },
  {
    path: "/tools/freelance-rate-calculator",
    title: "Freelance Hourly Rate Calculator | Tralance",
    description: "Calculate your ideal billable hourly rate based on target net income, billable hours, expenses, and taxes.",
    robots: "index, follow",
    sitemap: true,
    og: true,
  },
  {
    path: "/tools/freelance-project-brief-generator",
    title: "Freelance Project Brief Generator | Tralance",
    description: "Structure clear client onboarding briefs, deliverables, timelines, and technical requirements.",
    robots: "index, follow",
    sitemap: true,
    og: true,
  },
  {
    path: "/tools/freelance-scope-of-work-generator",
    title: "Freelance Scope of Work Generator | Tralance",
    description: "Prevent scope creep with structured milestones, deliverables checklists, and revision boundaries.",
    robots: "index, follow",
    sitemap: true,
    og: true,
  },
  {
    path: "/blog",
    title: "Freelance Blog & Guides | Tralance",
    description: "Practical articles, freelance client management strategies, pricing blueprints, and productivity workflows.",
    robots: "index, follow",
    sitemap: true,
    og: true,
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Tralance",
    description: "Our commitment to data minimization, local storage, and transparent zero-sale privacy practices.",
    robots: "index, follow",
    sitemap: true,
    og: true,
  },
  {
    path: "/terms",
    title: "Terms of Service | Tralance",
    description: "Terms governing use of the Tralance platform, Pro subscriptions, and tool generation.",
    robots: "index, follow",
    sitemap: true,
    og: true,
  },
  {
    path: "/refund",
    title: "Refund Policy | Tralance",
    description: "Cancellation, subscription management, and refund guidelines for Tralance Pro payments.",
    robots: "index, follow",
    sitemap: true,
    og: true,
  },
];

export function SeoClient() {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Pages & SEO Matrix
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-0.5">
            Audit meta titles, descriptions, canonical URLs, and indexing robots across the public website.
          </p>
        </div>

        <a
          href="https://www.tralance.pro/sitemap.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 text-xs font-medium text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <span>Live Sitemap.xml</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Pages Matrix Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Public Website Pages ({pagesMatrix.length})</CardTitle>
          <p className="text-xs text-slate-500 dark:text-neutral-400">
            SEO metadata configuration for production routes on https://www.tralance.pro
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route Path</TableHead>
                <TableHead>Meta Title</TableHead>
                <TableHead>Meta Description</TableHead>
                <TableHead>Indexing</TableHead>
                <TableHead className="text-right">Live Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagesMatrix.map((page) => (
                <TableRow key={page.path}>
                  <TableCell className="font-mono text-xs font-semibold text-slate-900 dark:text-white">
                    {page.path}
                  </TableCell>

                  <TableCell className="text-xs font-medium text-slate-800 dark:text-neutral-200 max-w-xs truncate">
                    {page.title}
                  </TableCell>

                  <TableCell className="text-xs text-slate-500 dark:text-neutral-400 max-w-sm truncate">
                    {page.description}
                  </TableCell>

                  <TableCell>
                    <Badge variant="success" className="text-[10px]">
                      {page.robots}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <a
                      href={`https://www.tralance.pro${page.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-400 hover:text-blue-600 inline-flex items-center rounded-lg transition-colors"
                      title="Inspect Live Page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
