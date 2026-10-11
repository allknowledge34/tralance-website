"use server";

import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/session";
import { logAdminActivity } from "@/lib/audit";
import { getEmailProviderStatus, sendEmail, sendCampaignBatch } from "@/lib/email/provider";
import { CampaignStatus, NotificationAudience } from "@prisma/client";

export async function getCampaigns() {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const [campaigns, suppressionsCount] = await Promise.all([
    prisma.emailCampaign.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { recipientLogs: true },
        },
      },
      take: 50,
    }),
    prisma.emailSuppression.count(),
  ]);

  const providerStatus = getEmailProviderStatus();

  return {
    campaigns,
    providerStatus,
    suppressionsCount,
  };
}

export async function getEligibleRecipientCount(audience: NotificationAudience) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const now = new Date();
  const where: import("@prisma/client").Prisma.UserWhereInput = {
    email: { not: null },
  };

  if (audience === NotificationAudience.PRO) {
    where.entitlements = {
      some: { expiresAt: { gt: now } },
    };
  } else if (audience === NotificationAudience.FREE) {
    where.entitlements = {
      none: { expiresAt: { gt: now } },
    };
  }

  const [totalUsers, suppressions] = await Promise.all([
    prisma.user.findMany({
      where,
      select: { email: true },
    }),
    prisma.emailSuppression.findMany({
      select: { email: true },
    }),
  ]);

  const suppressedSet = new Set(suppressions.map((s) => s.email.toLowerCase()));
  const eligibleCount = totalUsers.filter((u) => u.email && !suppressedSet.has(u.email.toLowerCase())).length;

  return eligibleCount;
}

export async function createCampaign(data: {
  name: string;
  subject: string;
  senderName: string;
  senderEmail: string;
  previewText?: string;
  htmlContent: string;
  targetAudience: NotificationAudience;
  scheduledAt?: string;
}) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const recipientCount = await getEligibleRecipientCount(data.targetAudience);
  const scheduledDate = data.scheduledAt ? new Date(data.scheduledAt) : null;
  const status = scheduledDate && scheduledDate > new Date() ? CampaignStatus.SCHEDULED : CampaignStatus.DRAFT;

  const campaign = await prisma.emailCampaign.create({
    data: {
      name: data.name,
      subject: data.subject,
      senderName: data.senderName,
      senderEmail: data.senderEmail,
      previewText: data.previewText || null,
      htmlContent: data.htmlContent,
      targetAudience: data.targetAudience,
      status,
      scheduledAt: scheduledDate,
      totalRecipients: recipientCount,
    },
  });

  await logAdminActivity({
    action: "CAMPAIGN_CREATE",
    entityType: "CAMPAIGN",
    entityId: campaign.id,
    details: `Created email campaign "${data.name}" (${status}) with ${recipientCount} targeted recipients`,
  });

  return campaign;
}

export async function sendTestBroadcast({
  campaignId,
  testEmail,
}: {
  campaignId: string;
  testEmail: string;
}) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const campaign = await prisma.emailCampaign.findUnique({
    where: { id: campaignId },
  });

  if (!campaign) throw new Error("Campaign not found");

  const result = await sendEmail({
    to: testEmail,
    subject: `[TEST] ${campaign.subject}`,
    html: campaign.htmlContent,
    senderName: campaign.senderName,
    senderEmail: campaign.senderEmail,
    isTest: true,
    campaignId: campaign.id,
  });

  // Record test send in recipient logs
  await prisma.emailRecipientLog.create({
    data: {
      campaignId: campaign.id,
      email: testEmail,
      status: result.success ? "SENT" : "FAILED",
      messageId: result.messageId || null,
      error: result.error || null,
      sentAt: result.success ? new Date() : null,
    },
  });

  await logAdminActivity({
    action: "CAMPAIGN_TEST_SEND",
    entityType: "CAMPAIGN",
    entityId: campaign.id,
    details: `Dispatched test email to ${testEmail} (Result: ${result.success ? "SUCCESS" : result.error}, MsgId: ${result.messageId || "N/A"})`,
  });

  return result;
}

export async function sendLiveBroadcast(campaignId: string) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  // Atomic state guard against race conditions
  const updateGuard = await prisma.emailCampaign.updateMany({
    where: {
      id: campaignId,
      status: { in: [CampaignStatus.DRAFT, CampaignStatus.SCHEDULED] },
    },
    data: {
      status: CampaignStatus.SENDING,
    },
  });

  if (updateGuard.count === 0) {
    throw new Error("Campaign is already in progress or completed.");
  }

  const campaign = await prisma.emailCampaign.findUnique({
    where: { id: campaignId },
  });

  if (!campaign) throw new Error("Campaign not found");

  const now = new Date();
  const where: import("@prisma/client").Prisma.UserWhereInput = {
    email: { not: null },
  };

  if (campaign.targetAudience === NotificationAudience.PRO) {
    where.entitlements = {
      some: { expiresAt: { gt: now } },
    };
  } else if (campaign.targetAudience === NotificationAudience.FREE) {
    where.entitlements = {
      none: { expiresAt: { gt: now } },
    };
  }

  const users = await prisma.user.findMany({
    where,
    select: { email: true },
  });

  const emails = users.map((u) => u.email!).filter(Boolean);

  // Send batch through robust delivery controller
  const batchResult = await sendCampaignBatch({
    campaignId: campaign.id,
    recipients: emails,
    subject: campaign.subject,
    html: campaign.htmlContent,
    senderName: campaign.senderName,
    senderEmail: campaign.senderEmail,
  });

  const finalStatus =
    batchResult.failed > 0 && batchResult.sent === 0 ? CampaignStatus.FAILED : CampaignStatus.SENT;

  await prisma.emailCampaign.update({
    where: { id: campaignId },
    data: {
      status: finalStatus,
      sentAt: now,
      totalRecipients: batchResult.total,
      sentCount: batchResult.sent,
      failedCount: batchResult.failed,
      errorDetails: batchResult.failed > 0 ? `${batchResult.failed} deliveries failed` : null,
    },
  });

  await logAdminActivity({
    action: "CAMPAIGN_LIVE_BROADCAST",
    entityType: "CAMPAIGN",
    entityId: campaign.id,
    details: `Live broadcast "${campaign.name}" sent to ${batchResult.sent}/${batchResult.total} recipients (Failed: ${batchResult.failed})`,
  });

  return { success: true, sentCount: batchResult.sent, failedCount: batchResult.failed };
}

export async function getEmailSuppressions() {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  return await prisma.emailSuppression.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });
}

export async function addEmailSuppression(email: string, reason = "ADMIN_MANUAL") {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const suppression = await prisma.emailSuppression.upsert({
    where: { email: email.toLowerCase() },
    update: { reason },
    create: { email: email.toLowerCase(), reason },
  });

  await logAdminActivity({
    action: "EMAIL_SUPPRESSION_ADD",
    entityType: "SETTINGS",
    entityId: suppression.id,
    details: `Added ${email} to suppression list (${reason})`,
  });

  return suppression;
}

export async function removeEmailSuppression(email: string) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  await prisma.emailSuppression.deleteMany({
    where: { email: email.toLowerCase() },
  });

  await logAdminActivity({
    action: "EMAIL_SUPPRESSION_REMOVE",
    entityType: "SETTINGS",
    details: `Removed ${email} from suppression list`,
  });

  return { success: true };
}
