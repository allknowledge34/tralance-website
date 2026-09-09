"use server"

import { prisma } from "@/lib/db/prisma";
import { verifySession } from "@/lib/session";

export async function getPromoSettings() {
  const promo = await prisma.promoBarSettings.findUnique({
    where: { id: "global" }
  });
  
  if (!promo) {
    return {
      isActive: false,
      text: "Try YTVoidMode — a cleaner YouTube experience for Chrome",
      btnText: "Try YTVoidMode",
      btnUrl: "https://chromewebstore.google.com/",
      icon: "sparkles"
    };
  }
  return promo;
}

export async function savePromoSettings(data: any) {
  const session = await verifySession();
  if (!session) {
    throw new Error("Unauthorized: Only admins can update promo settings.");
  }

  // URL Validation
  if (data.btnUrl) {
    try {
      new URL(data.btnUrl);
    } catch (_) {
      throw new Error("Invalid URL format.");
    }
  }

  const promo = await prisma.promoBarSettings.upsert({
    where: { id: "global" },
    update: {
      isActive: data.isActive,
      text: data.text,
      btnText: data.btnText,
      btnUrl: data.btnUrl,
      icon: data.icon,
    },
    create: {
      id: "global",
      isActive: data.isActive,
      text: data.text,
      btnText: data.btnText,
      btnUrl: data.btnUrl,
      icon: data.icon,
    }
  });
  return promo;
}
