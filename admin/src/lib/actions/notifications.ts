"use server";

import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/session";
import { logAdminActivity } from "@/lib/audit";
import { NotificationAudience, NotificationType, NotificationStatus } from "@prisma/client";

export async function getNotifications() {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const notifications = await prisma.adminNotification.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { userNotifications: true },
      },
    },
  });

  return notifications;
}

export async function createNotification(data: {
  title: string;
  message: string;
  actionUrl?: string;
  targetAudience: NotificationAudience;
  type: NotificationType;
  scheduledAt?: string;
}) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const scheduledDate = data.scheduledAt ? new Date(data.scheduledAt) : null;
  const status: NotificationStatus = scheduledDate && scheduledDate > new Date()
    ? NotificationStatus.SCHEDULED
    : NotificationStatus.DRAFT;

  const notification = await prisma.adminNotification.create({
    data: {
      title: data.title,
      message: data.message,
      actionUrl: data.actionUrl || null,
      targetAudience: data.targetAudience,
      type: data.type,
      status,
      scheduledAt: scheduledDate,
    },
  });

  await logAdminActivity({
    action: "NOTIFICATION_CREATE",
    entityType: "NOTIFICATION",
    entityId: notification.id,
    details: `Created ${status} notification "${data.title}" targeting ${data.targetAudience}`,
  });

  return notification;
}

export async function sendNotification(notificationId: string) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const notif = await prisma.adminNotification.findUnique({
    where: { id: notificationId },
  });

  if (!notif) throw new Error("Notification not found");

  const now = new Date();
  const userWhere: import("@prisma/client").Prisma.UserWhereInput = {};

  if (notif.targetAudience === NotificationAudience.PRO) {
    userWhere.entitlements = {
      some: { expiresAt: { gt: now } },
    };
  } else if (notif.targetAudience === NotificationAudience.FREE) {
    userWhere.entitlements = {
      none: { expiresAt: { gt: now } },
    };
  }

  const targetUsers = await prisma.user.findMany({
    where: userWhere,
    select: { id: true },
  });

  if (targetUsers.length === 0) {
    await prisma.adminNotification.update({
      where: { id: notificationId },
      data: {
        status: NotificationStatus.SENT,
        sentAt: now,
        recipientCount: 0,
      },
    });
    return { success: true, count: 0 };
  }

  // Create real user notification records in bulk
  await prisma.$transaction(async (tx) => {
    await tx.userNotification.createMany({
      data: targetUsers.map((u) => ({
        userId: u.id,
        notificationId: notif.id,
        title: notif.title,
        message: notif.message,
        actionUrl: notif.actionUrl,
        type: notif.type,
      })),
    });

    await tx.adminNotification.update({
      where: { id: notif.id },
      data: {
        status: NotificationStatus.SENT,
        sentAt: now,
        recipientCount: targetUsers.length,
      },
    });
  });

  await logAdminActivity({
    action: "NOTIFICATION_SEND",
    entityType: "NOTIFICATION",
    entityId: notif.id,
    details: `Delivered in-app notification "${notif.title}" to ${targetUsers.length} users`,
  });

  return { success: true, count: targetUsers.length };
}

export async function cancelNotification(id: string) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  await prisma.adminNotification.update({
    where: { id },
    data: { status: NotificationStatus.CANCELLED },
  });

  await logAdminActivity({
    action: "NOTIFICATION_CANCEL",
    entityType: "NOTIFICATION",
    entityId: id,
    details: "Cancelled scheduled notification",
  });

  return { success: true };
}

export async function deleteNotification(id: string) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  await prisma.adminNotification.delete({
    where: { id },
  });

  await logAdminActivity({
    action: "NOTIFICATION_DELETE",
    entityType: "NOTIFICATION",
    entityId: id,
    details: "Deleted notification record and associated user notifications",
  });

  return { success: true };
}
