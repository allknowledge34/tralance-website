"use server";

import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/session";
import { logAdminActivity } from "@/lib/audit";

export interface UserQueryParams {
  search?: string;
  planFilter?: "all" | "pro" | "free";
  page?: number;
  pageSize?: number;
  sortBy?: "createdAt" | "name" | "email";
  sortOrder?: "asc" | "desc";
}

export async function getUsers(params: UserQueryParams = {}) {
  const session = await verifySession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const {
    search,
    planFilter = "all",
    page = 1,
    pageSize = 15,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params;

  const now = new Date();
  const where: import('@prisma/client').Prisma.UserWhereInput = {};

  if (search && search.trim()) {
    where.OR = [
      { name: { contains: search.trim(), mode: "insensitive" } },
      { email: { contains: search.trim(), mode: "insensitive" } },
    ];
  }

  if (planFilter === "pro") {
    where.entitlements = {
      some: {
        expiresAt: { gt: now },
      },
    };
  } else if (planFilter === "free") {
    where.entitlements = {
      none: {
        expiresAt: { gt: now },
      },
    };
  }

  const [totalCount, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        emailVerified: true,
        createdAt: true,
        accounts: {
          select: { provider: true },
        },
        entitlements: {
          select: {
            id: true,
            planId: true,
            expiresAt: true,
            createdAt: true,
          },
        },
        orders: {
          select: {
            id: true,
            amount: true,
            status: true,
            planId: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            toolData: true,
          },
        },
      },
    }),
  ]);

  return {
    users,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    currentPage: page,
  };
}

export async function getUserDetails(userId: string) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      emailVerified: true,
      createdAt: true,
      accounts: {
        select: { provider: true },
      },
      entitlements: {
        orderBy: { createdAt: "desc" },
      },
      orders: {
        orderBy: { createdAt: "desc" },
      },
      toolData: {
        orderBy: { updatedAt: "desc" },
        take: 10,
        select: {
          id: true,
          name: true,
          toolId: true,
          updatedAt: true,
        },
      },
    },
  });

  return user;
}

export async function exportUsersCSV() {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      entitlements: {
        select: { planId: true, expiresAt: true },
      },
      orders: {
        where: { status: "SUCCESS" },
        select: { amount: true },
      },
    },
  });

  await logAdminActivity({
    action: "USER_EXPORT_CSV",
    entityType: "USER",
    details: `Exported ${users.length} user records to CSV`,
  });

  const now = new Date();
  const headers = ["User ID", "Name", "Email", "Plan", "Pro Expiration", "Total Paid (INR)", "Registered Date"];
  const rows = users.map((u) => {
    const activePro = u.entitlements.find((e) => e.expiresAt && e.expiresAt > now);
    const plan = activePro ? activePro.planId.toUpperCase() : "FREE";
    const expiry = activePro?.expiresAt ? activePro.expiresAt.toISOString().split("T")[0] : "N/A";
    const totalSpent = u.orders.reduce((sum, o) => sum + o.amount, 0);

    return [
      `"${u.id}"`,
      `"${u.name || ""}"`,
      `"${u.email || ""}"`,
      `"${plan}"`,
      `"${expiry}"`,
      totalSpent,
      `"${u.createdAt.toISOString()}"`,
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}
