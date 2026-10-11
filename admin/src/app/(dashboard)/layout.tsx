import { verifySession } from "@/lib/session";
import { AdminLayoutClient } from "@/components/layout/AdminLayoutClient";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await verifySession();
  const adminEmail = (session as { email?: string } | null)?.email || process.env.ADMIN_EMAIL || "admin@tralance.pro";

  return (
    <AdminLayoutClient adminEmail={adminEmail}>
      {children}
    </AdminLayoutClient>
  );
}
