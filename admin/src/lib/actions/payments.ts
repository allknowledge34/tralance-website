"use server";

import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/session";
import { logAdminActivity } from "@/lib/audit";

export interface PaymentQueryParams {
  status?: "all" | "SUCCESS" | "PENDING" | "FAILED";
  search?: string;
  page?: number;
  pageSize?: number;
}

export async function getPayments(params: PaymentQueryParams = {}) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const { status = "all", search, page = 1, pageSize = 15 } = params;

  const where: import("@prisma/client").Prisma.OrderWhereInput = {};

  if (status !== "all") {
    where.status = status;
  }

  if (search && search.trim()) {
    where.OR = [
      { id: { contains: search.trim(), mode: "insensitive" } },
      { user: { email: { contains: search.trim(), mode: "insensitive" } } },
      { user: { name: { contains: search.trim(), mode: "insensitive" } } },
      { cashfreePaymentId: { contains: search.trim(), mode: "insensitive" } },
    ];
  }

  const [totalCount, orders, allOrders] = await Promise.all([
    prisma.order.count({ where }),
    prisma.order.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        planId: true,
        cashfreePaymentId: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    }),
    prisma.order.findMany({
      select: {
        amount: true,
        status: true,
      },
    }),
  ]);

  // Aggregate stats across all orders in database
  const successfulOrders = allOrders.filter((o) => o.status === "SUCCESS");
  const pendingOrders = allOrders.filter((o) => o.status === "PENDING");
  const failedOrders = allOrders.filter((o) => o.status === "FAILED");
  const totalRevenue = successfulOrders.reduce((sum, o) => sum + o.amount, 0);
  const successRate = allOrders.length > 0
    ? ((successfulOrders.length / allOrders.length) * 100).toFixed(1)
    : "0";

  return {
    orders,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
    stats: {
      totalRevenue,
      successfulCount: successfulOrders.length,
      pendingCount: pendingOrders.length,
      failedCount: failedOrders.length,
      totalCount: allOrders.length,
      successRate,
    },
  };
}

export async function exportPaymentsCSV() {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      amount: true,
      currency: true,
      status: true,
      planId: true,
      cashfreePaymentId: true,
      createdAt: true,
      user: {
        select: {
          email: true,
          name: true,
        },
      },
    },
  });

  await logAdminActivity({
    action: "PAYMENT_EXPORT_CSV",
    entityType: "SETTINGS",
    details: `Exported ${orders.length} transaction records to CSV`,
  });

  const headers = ["Order ID", "Customer Name", "Customer Email", "Plan", "Amount (INR)", "Status", "Gateway Ref", "Date"];
  const rows = orders.map((o) => [
    `"${o.id}"`,
    `"${o.user?.name || ""}"`,
    `"${o.user?.email || ""}"`,
    `"${o.planId}"`,
    o.amount,
    `"${o.status}"`,
    `"${o.cashfreePaymentId || ""}"`,
    `"${o.createdAt.toISOString()}"`,
  ].join(","));

  return [headers.join(","), ...rows].join("\n");
}
