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
      <div className="min-h-screen bg-slate-50/60 dark:bg-[#09090b] text-slate-900 dark:text-neutral-100 flex flex-col md:flex-row antialiased selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-slate-900">
        {/* Sidebar */}
        <AdminSidebar adminEmail={adminEmail} />

        {/* Main Workspace Column */}
        <div className="flex-1 flex flex-col min-w-0">
          <AdminTopNav
            adminEmail={adminEmail}
            onOpenSearch={() => setCommandOpen(true)}
          />

          <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>

        {/* Global ⌘K Command Palette */}
        <AdminCommandDialog
          isOpen={commandOpen}
          onClose={() => setCommandOpen(false)}
        />
      </div>
    </SidebarProvider>
  );
}
