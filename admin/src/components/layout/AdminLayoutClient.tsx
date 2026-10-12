"use client";

import * as React from "react";
import { SidebarProvider } from "./SidebarContext";
import { AdminSidebar } from "./AdminSidebar";
import { AdminTopNav } from "./AdminTopNav";
import { AdminCommandDialog } from "./AdminCommandDialog";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  adminEmail?: string;
}

export function AdminLayoutClient({ children, adminEmail }: AdminLayoutClientProps) {
  const [commandOpen, setCommandOpen] = React.useState(false);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-[#FFFDF5] dark:bg-[#121214] text-[#171717] dark:text-[#F5F5F5] flex flex-col md:flex-row antialiased selection:bg-[#FFE52E] selection:text-[#171717]">
        <AdminSidebar adminEmail={adminEmail} />

        <div className="flex-1 flex flex-col min-w-0">
          <AdminTopNav
            adminEmail={adminEmail}
            onOpenSearch={() => setCommandOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>

        <AdminCommandDialog
          isOpen={commandOpen}
          onClose={() => setCommandOpen(false)}
        />
      </div>
    </SidebarProvider>
  );
}
