import { verifySession } from "@/lib/session";
import { getEmailProviderStatus } from "@/lib/email/provider";
import { SettingsClient } from "@/components/settings/SettingsClient";

export const metadata = {
  title: "System Settings | Tralance Admin",
};

export default async function SettingsPage() {
  const session = await verifySession();
  const adminEmail = (session as { email?: string } | null)?.email || process.env.ADMIN_EMAIL || "admin@tralance.pro";
  const emailProvider = getEmailProviderStatus();

  return <SettingsClient adminEmail={adminEmail} emailProvider={emailProvider} />;
}
