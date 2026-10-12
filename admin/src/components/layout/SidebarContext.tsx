"use client";

import * as React from "react";

interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggleCollapsed: () => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsedState] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("tralance_admin_sidebar_collapsed");
      if (saved !== null) {
        setCollapsedState(saved === "true");
      }
    } catch {
    }
  }, []);

  const setCollapsed = React.useCallback((val: boolean) => {
    setCollapsedState(val);
    try {
      localStorage.setItem("tralance_admin_sidebar_collapsed", String(val));
    } catch {
    }
  }, []);

  const toggleCollapsed = React.useCallback(() => {
    setCollapsedState((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("tralance_admin_sidebar_collapsed", String(next));
      } catch {
      }
      return next;
    });
  }, []);

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        toggleCollapsed,
        mobileOpen,
        setMobileOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
