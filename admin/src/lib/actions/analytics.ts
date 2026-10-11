"use server";

import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/session";

export async function getAnalyticsMetrics() {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const now = new Date();

  const [usersCount, entitlements, successfulOrders, allOrders] = await Promise.all([
    prisma.user.count(),
    prisma.entitlement.findMany({
      where: { expiresAt: { gt: now } },
    }),
    prisma.order.findMany({
      where: { status: "SUCCESS" },
      select: { amount: true, planId: true, createdAt: true },
    }),
    prisma.order.findMany({
      select: { status: true, amount: true, createdAt: true },
    }),
  ]);

  const proMonthlyCount = entitlements.filter((e) => e.planId === "monthly").length;
  const proYearlyCount = entitlements.filter((e) => e.planId === "yearly").length;
  const totalPro = entitlements.length;
  const freeUsersCount = Math.max(0, usersCount - totalPro);

  // MRR estimation: (Monthly * 49) + (Yearly * 149 / 12)
  const mrr = Math.round(proMonthlyCount * 49 + (proYearlyCount * 149) / 12);
  const arr = mrr * 12;

  const totalGrossRevenue = successfulOrders.reduce((sum, o) => sum + o.amount, 0);
  const averageOrderValue = successfulOrders.length > 0
    ? Math.round(totalGrossRevenue / successfulOrders.length)
    : 0;

  return {
    usersCount,
    totalPro,
    freeUsersCount,
    proMonthlyCount,
    proYearlyCount,
    mrr,
    arr,
    totalGrossRevenue,
    averageOrderValue,
    totalOrdersCount: allOrders.length,
    successfulOrdersCount: successfulOrders.length,
    conversionRate: usersCount > 0 ? ((totalPro / usersCount) * 100).toFixed(1) : "0",
  };
}
