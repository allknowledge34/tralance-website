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

import {
  parseAndValidateCustomEmails,
  type BroadcastRecipientType,
  type EmailValidationResult,
} from "@/lib/utils/email-validation";

export type { BroadcastRecipientType, EmailValidationResult };

export async function getRegisteredUsersForSelection(search?: string) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const where: import("@prisma/client").Prisma.UserWhereInput = {
    email: { not: null },
  };

  if (search && search.trim()) {
    where.OR = [
      { name: { contains: search.trim(), mode: "insensitive" } },
      { email: { contains: search.trim(), mode: "insensitive" } },
    ];
  }

  const users = await prisma.user.findMany({
    where,
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
      entitlements: {
        where: { expiresAt: { gt: new Date() } },
        select: { id: true, planId: true },
        take: 1,
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return users.map((u) => ({
    id: u.id,
    name: u.name || "Anonymous User",
    email: u.email!,
    image: u.image,
    isPro: u.entitlements.length > 0,
    plan: u.entitlements[0]?.planId ? u.entitlements[0].planId.toUpperCase() : "FREE",
  }));
}

export interface RecipientCountOptions {
  recipientType?: BroadcastRecipientType;
  targetAudience?: NotificationAudience;
  selectedUserIds?: string[];
  customEmailsText?: string;
}

export async function getEligibleRecipientCount(
  audienceOrOptions: NotificationAudience | RecipientCountOptions
): Promise<number> {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  if (typeof audienceOrOptions === "string") {
    return getRegisteredAudienceCount(audienceOrOptions);
  }

  const { recipientType = "ALL_REGISTERED", targetAudience, selectedUserIds, customEmailsText } = audienceOrOptions;

  if (recipientType === "CUSTOM") {
    const { validEmails } = parseAndValidateCustomEmails(customEmailsText || "");
    if (validEmails.length === 0) return 0;

    const suppressions = await prisma.emailSuppression.findMany({
      where: { email: { in: validEmails } },
      select: { email: true },
    });
    const suppressedSet = new Set(suppressions.map((s) => s.email.toLowerCase()));
    return validEmails.filter((e) => !suppressedSet.has(e)).length;
  }

  if (recipientType === "SELECTED_USERS") {
    if (!selectedUserIds || selectedUserIds.length === 0) return 0;
    const users = await prisma.user.findMany({
      where: { id: { in: selectedUserIds }, email: { not: null } },
      select: { email: true },
    });
    const emails = users.map((u) => u.email!.toLowerCase());
    const suppressions = await prisma.emailSuppression.findMany({
      where: { email: { in: emails } },
      select: { email: true },
    });
    const suppressedSet = new Set(suppressions.map((s) => s.email.toLowerCase()));
    return emails.filter((e) => !suppressedSet.has(e)).length;
  }

  if (recipientType === "PRO_REGISTERED") {
    return getRegisteredAudienceCount(NotificationAudience.PRO);
  }

  if (recipientType === "FREE_REGISTERED") {
    return getRegisteredAudienceCount(NotificationAudience.FREE);
  }

  return getRegisteredAudienceCount(targetAudience || NotificationAudience.ALL);
}

async function getRegisteredAudienceCount(audience: NotificationAudience = NotificationAudience.ALL): Promise<number> {
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
  return totalUsers.filter((u) => u.email && !suppressedSet.has(u.email.toLowerCase())).length;
}

export async function createCampaign(data: {
  name: string;
  subject: string;
  senderName: string;
  senderEmail: string;
  previewText?: string;
  htmlContent: string;
  recipientType?: BroadcastRecipientType;
  targetAudience?: NotificationAudience;
  selectedUserIds?: string[];
  customEmailsText?: string;
  scheduledAt?: string;
}) {
  const session = await verifySession();
  if (!session) throw new Error("Unauthorized");

  const recipientType = data.recipientType || "ALL_REGISTERED";
  let targetAudience = data.targetAudience || NotificationAudience.ALL;
  let customEmails: string[] | null = null;
  let recipientCount = 0;

  if (recipientType === "CUSTOM") {
    const parsed = parseAndValidateCustomEmails(data.customEmailsText || "");
    if (parsed.invalidEmails.length > 0) {
      throw new Error(
        `Invalid email address format: ${parsed.invalidEmails.slice(0, 3).join(", ")}${
          parsed.invalidEmails.length > 3 ? ` and ${parsed.invalidEmails.length - 3} more` : ""
        }. Please correct or remove invalid addresses.`
      );
    }
    if (parsed.validEmails.length === 0) {
      throw new Error("Please provide at least one valid recipient email address.");
    }
    if (parsed.validEmails.length > 2000) {
      throw new Error("Maximum limit of 2,000 custom recipient addresses per broadcast exceeded.");
    }

    const suppressions = await prisma.emailSuppression.findMany({
      where: { email: { in: parsed.validEmails } },
      select: { email: true },
    });
    const suppressedSet = new Set(suppressions.map((s) => s.email.toLowerCase()));
    const eligible = parsed.validEmails.filter((e) => !suppressedSet.has(e));

    recipientCount = eligible.length;
    customEmails = parsed.validEmails;
  } else if (recipientType === "SELECTED_USERS") {
    if (!data.selectedUserIds || data.selectedUserIds.length === 0) {
      throw new Error("Please select at least one registered user for this campaign.");
    }
    const selectedUsers = await prisma.user.findMany({
      where: { id: { in: data.selectedUserIds }, email: { not: null } },
      select: { email: true },
    });
    const userEmails = Array.from(new Set(selectedUsers.map((u) => u.email!.toLowerCase())));
    const suppressions = await prisma.emailSuppression.findMany({
      where: { email: { in: userEmails } },
      select: { email: true },
    });
    const suppressedSet = new Set(suppressions.map((s) => s.email.toLowerCase()));
    const eligible = userEmails.filter((e) => !suppressedSet.has(e));

    recipientCount = eligible.length;
    customEmails = userEmails;
  } else {
    if (recipientType === "PRO_REGISTERED") {
      targetAudience = NotificationAudience.PRO;
    } else if (recipientType === "FREE_REGISTERED") {
      targetAudience = NotificationAudience.FREE;
    } else {
      targetAudience = NotificationAudience.ALL;
    }
    recipientCount = await getRegisteredAudienceCount(targetAudience);
  }

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
      targetAudience,
      recipientType,
      customEmails: customEmails ? JSON.stringify(customEmails) : null,
      status,
      scheduledAt: scheduledDate,
      totalRecipients: recipientCount,
    },
  });

  await logAdminActivity({
    action: "CAMPAIGN_CREATE",
    entityType: "CAMPAIGN",
    entityId: campaign.id,
    details: `Created email campaign "${data.name}" (${recipientType}, ${status}) with ${recipientCount} targeted recipients`,
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

  let emails: string[] = [];

  if (
    (campaign.recipientType === "CUSTOM" || campaign.recipientType === "SELECTED_USERS") &&
    campaign.customEmails
  ) {
    try {
      emails = JSON.parse(campaign.customEmails) as string[];
    } catch {
      emails = campaign.customEmails
        .split(/[\r\n,;\s]+/)
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
    }
  } else {
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

    emails = users.map((u) => u.email!).filter(Boolean);
  }

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
      sentAt: new Date(),
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
    details: `Live broadcast "${campaign.name}" (${campaign.recipientType}) sent to ${batchResult.sent}/${batchResult.total} recipients (Failed: ${batchResult.failed})`,
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
