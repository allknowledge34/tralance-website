"use server";

import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/session";

export async function getToolUsageData() {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const [pdfUsages, toolDataList, totalUsers, proEntitlementsCount] = await Promise.all([
    prisma.pdfUsage.findMany(),
    prisma.toolData.findMany({
      select: {
        id: true,
        toolId: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        user: { select: { email: true, name: true } },
      },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.user.count(),
    prisma.entitlement.count({ where: { expiresAt: { gt: new Date() } } }),
  ]);

  // Aggregate PDF limit counters
  const invoicePdfTotal = pdfUsages.reduce((sum, p) => sum + (p.invoiceUses || 0), 0);
  const briefPdfTotal = pdfUsages.reduce((sum, p) => sum + (p.briefUses || 0), 0);
  const contractPdfTotal = pdfUsages.reduce((sum, p) => sum + (p.contractUses || 0), 0);

  // Group ToolData saves by toolId
  const savesByTool: Record<string, number> = {};
  toolDataList.forEach((td) => {
    savesByTool[td.toolId] = (savesByTool[td.toolId] || 0) + 1;
  });

  const toolsSummary = [
    {
      id: "freelancer-invoice-generator",
      name: "Freelance Invoice Generator",
      route: "/tools/freelance-invoice-generator",
      pdfGenerations: invoicePdfTotal,
      cloudSaves: savesByTool["freelancer-invoice-generator"] || 0,
      limits: "Free: 3 PDFs/month • Pro: Unlimited",
    },
    {
      id: "freelance-contract-generator",
      name: "Freelance Contract Generator",
      route: "/tools/freelance-contract-generator",
      pdfGenerations: contractPdfTotal,
      cloudSaves: savesByTool["freelance-contract-generator"] || 0,
      limits: "Free: 3 PDFs/month • Pro: Unlimited",
    },
    {
      id: "freelance-project-brief-generator",
      name: "Project Brief Generator",
      route: "/tools/freelance-project-brief-generator",
      pdfGenerations: briefPdfTotal,
      cloudSaves: savesByTool["freelance-project-brief-generator"] || 0,
      limits: "Free: 3 PDFs/month • Pro: Unlimited",
    },
    {
      id: "freelance-rate-calculator",
      name: "Freelance Hourly Rate Calculator",
      route: "/tools/freelance-rate-calculator",
      pdfGenerations: 0,
      cloudSaves: savesByTool["freelance-rate-calculator"] || 0,
      limits: "Free: Unlimited client-side • Pro: Cloud Save",
    },
    {
      id: "freelance-scope-of-work-generator",
      name: "Scope of Work Generator",
      route: "/tools/freelance-scope-of-work-generator",
      pdfGenerations: 0,
      cloudSaves: savesByTool["freelance-scope-of-work-generator"] || 0,
      limits: "Free: Unlimited client-side • Pro: Cloud Save",
    },
  ];

  return {
    toolsSummary,
    totalTrackedSessions: pdfUsages.length,
    totalSavedDocuments: toolDataList.length,
    proEntitlementsCount,
    totalUsers,
    recentSavedItems: toolDataList.slice(0, 10),
  };
}
