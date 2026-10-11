import { prisma } from "@/lib/db/prisma";
import { unstable_cache } from "next/cache";

// Helper with timeout guard to prevent any query from hanging indefinitely
async function withTimeout<T>(promise: Promise<T>, timeoutMs = 8000, fallbackMessage = "Query timed out"): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(fallbackMessage)), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    clearTimeout(timer!);
  }
}

// 1. Overview KPIs (Aggregated platform metrics - cached for 30 seconds)
export const getDashboardOverviewMetrics = unstable_cache(
  async () => {
    try {
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const query = Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
        prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
        prisma.entitlement.count({
          where: {
            expiresAt: { gt: now },
          },
        }),
        prisma.order.aggregate({
          where: { status: "SUCCESS" },
          _sum: { amount: true },
          _count: true,
        }),
        prisma.order.count(),
        prisma.pdfUsage.aggregate({
          _sum: {
            invoiceUses: true,
            briefUses: true,
            contractUses: true,
          },
          _count: true,
        }),
        prisma.toolData.count(),
        prisma.blog.count(),
      ]);

      const [
        totalUsers,
        newUsers7d,
        newUsers30d,
        proUsersCount,
        ordersSuccessAgg,
        totalOrders,
        pdfUsageAgg,
        toolDataCount,
        articlesCount,
      ] = await withTimeout(query, 8000, "Dashboard overview metrics query timed out");

      const totalRevenue = ordersSuccessAgg._sum.amount || 0;
      const successfulOrdersCount = ordersSuccessAgg._count || 0;
      const conversionRate = totalUsers > 0 ? ((proUsersCount / totalUsers) * 100).toFixed(1) : "0";
      const totalPdfGenerations =
        (pdfUsageAgg._sum.invoiceUses || 0) +
        (pdfUsageAgg._sum.briefUses || 0) +
        (pdfUsageAgg._sum.contractUses || 0);

      return {
        success: true,
        data: {
          totalUsers,
          newUsers7d,
          newUsers30d,
          proUsersCount,
          freeUsersCount: Math.max(0, totalUsers - proUsersCount),
          conversionRate,
          totalOrders,
          successfulOrdersCount,
          totalRevenue,
          articlesCount,
          toolUsage: {
            totalPdfGenerations,
            totalSavedItems: toolDataCount,
            activeTrackedSessions: pdfUsageAgg._count || 0,
          },
        },
      };
    } catch (error: any) {
      console.error("Dashboard overview metrics error:", error);
      return {
        success: false,
        error: error?.message || "Failed to load platform metrics.",
        data: null,
      };
    }
  },
  ["dashboard-overview-metrics-v2"],
  { revalidate: 30, tags: ["dashboard-metrics"] }
);

// 2. Recent Users widget data
export async function getRecentUsersMetrics(limit = 6) {
  try {
    const now = new Date();
    const query = prisma.user.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        entitlements: {
          where: { expiresAt: { gt: now } },
          select: { planId: true, expiresAt: true },
        },
      },
    });

    const recentUsers = await withTimeout(query, 8000, "Recent users query timed out");
    return { success: true, data: recentUsers };
  } catch (error: any) {
    console.error("Recent users error:", error);
    return { success: false, error: error?.message || "Failed to load recent users.", data: null };
  }
}

// 3. Recent Orders widget data
export async function getRecentOrdersMetrics(limit = 6) {
  try {
    const query = prisma.order.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        planId: true,
        createdAt: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    const recentOrders = await withTimeout(query, 8000, "Recent orders query timed out");
    return { success: true, data: recentOrders };
  } catch (error: any) {
    console.error("Recent orders error:", error);
    return { success: false, error: error?.message || "Failed to load recent orders.", data: null };
  }
}

// 4. Recent Activity widget data
export async function getRecentActivityMetrics(limit = 6) {
  try {
    const query = prisma.adminAuditLog.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const recentActivity = await withTimeout(query, 8000, "Recent activity query timed out");
    return { success: true, data: recentActivity };
  } catch (error: any) {
    console.error("Recent activity error:", error);
    return { success: false, error: error?.message || "Failed to load recent activity.", data: null };
  }
}

// 5. Backwards-compatible aggregator
export async function getDashboardMetrics() {
  const [overview, users, orders, activity] = await Promise.all([
    getDashboardOverviewMetrics(),
    getRecentUsersMetrics(6),
    getRecentOrdersMetrics(6),
    getRecentActivityMetrics(6),
  ]);

  if (!overview.success || !overview.data) {
    return {
      success: false,
      error: overview.error || "Failed to load overview data.",
      data: null,
    };
  }

  return {
    success: true,
    data: {
      ...overview.data,
      recentUsers: users.data || [],
      recentOrders: orders.data || [],
      recentActivity: activity.data || [],
    },
  };
}
