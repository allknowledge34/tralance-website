"use client";

import * as React from "react";
import {
  ExternalLink,
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000]">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-[#171717] dark:text-[#FFFDF5]">
            Pages & SEO Matrix
          </h1>
          <p className="text-sm font-medium text-subtle mt-0.5">
            Audit meta titles, descriptions, canonical URLs, and indexing robots across the public website.
          </p>
        </div>

        <a
          href="https://www.tralance.pro/sitemap.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-[#171717] text-xs font-black uppercase tracking-wider text-[#171717] bg-[#FFE52E] shadow-[2.5px_2.5px_0px_0px_#171717] hover:bg-[#FFE52E]/90 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all shrink-0"
        >
          <span>Live Sitemap.xml</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b-2 border-[#171717] dark:border-[#383838]">
          <CardTitle className="text-base font-black uppercase tracking-wide">Public Website Pages ({pagesMatrix.length})</CardTitle>
          <p className="text-xs font-medium text-subtle">
            SEO metadata configuration for production routes on https://www.tralance.pro
          </p>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#FFF9D2] dark:bg-[#27272A] border-b-2 border-[#171717] dark:border-[#383838]">
                <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Route Path</TableHead>
                <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Meta Title</TableHead>
                <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Meta Description</TableHead>
                <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5]">Indexing</TableHead>
                <TableHead className="font-black uppercase tracking-wider text-xs text-[#171717] dark:text-[#FFFDF5] text-right">Live Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagesMatrix.map((page) => (
                <TableRow key={page.path} className="border-b-2 border-[#171717] dark:border-[#383838] hover:bg-[#FFE52E]/10 transition-colors">
                  <TableCell className="font-mono text-xs font-bold text-[#171717] dark:text-[#FFFDF5]">
                    <span className="px-2 py-0.5 bg-white dark:bg-[#27272A] border border-[#171717] dark:border-[#383838] shadow-[1px_1px_0px_0px_#171717]">
                      {page.path}
                    </span>
                  </TableCell>

                  <TableCell className="text-xs font-bold text-[#171717] dark:text-[#FFFDF5] max-w-xs truncate">
                    {page.title}
                  </TableCell>

                  <TableCell className="text-xs font-medium text-subtle max-w-sm truncate">
                    {page.description}
                  </TableCell>

                  <TableCell>
                    <Badge variant="success" className="text-[10px] font-black uppercase">
                      {page.robots}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <a
                      href={`https://www.tralance.pro${page.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 border-2 border-[#171717] dark:border-[#383838] bg-[#35B9F5] text-[#171717] shadow-[2px_2px_0px_0px_#171717] hover:bg-[#35B9F5]/80 active:translate-x-[1px] active:translate-y-[1px] active:shadow-none inline-flex items-center transition-all"
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
