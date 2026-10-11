"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Megaphone,
  Loader2,
  ExternalLink,
  Check,
} from "lucide-react";

export interface UserNotificationItem {
  id: string;
  userId: string;
  notificationId?: string;
  title: string;
  message: string;
  actionUrl?: string | null;
  type: "INFO" | "ANNOUNCEMENT" | "SUCCESS" | "WARNING";
  isRead: boolean;
  readAt?: string | null;
  createdAt: string;
}

interface NotificationBellProps {
  isMobile?: boolean;
}

function formatTimeAgo(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) return "Just now";
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  } catch {
    return "";
  }
}

export function NotificationBell({ isMobile = false }: NotificationBellProps) {
  const { status } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<UserNotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = useCallback(async () => {
    if (status !== "authenticated") {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/notifications", { credentials: "include" });
      if (res.status === 401) {
        setNotifications([]);
        setUnreadCount(0);
        return;
      }
      if (!res.ok) {
        throw new Error("Failed to load notifications");
      }
      const data = await res.json();
      setNotifications(data.notifications || []);
      setUnreadCount(data.unreadCount || 0);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error fetching notifications";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [status]);

  // Initial fetch on authenticated mount
  useEffect(() => {
    if (status === "authenticated") {
      fetchNotifications();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [status, fetchNotifications]);

  // Close dropdown on click outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const toggleDropdown = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState && status === "authenticated") {
      fetchNotifications();
    }
  };

  const handleNotificationClick = async (item: UserNotificationItem) => {
    // Optimistically mark as read
    if (!item.isRead) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));

      try {
        await fetch("/api/notifications", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: item.id }),
        });
      } catch (err) {
        console.error("Failed to mark notification read:", err);
      }
    }

    // Handle navigation
    if (item.actionUrl) {
      setIsOpen(false);
      if (item.actionUrl.startsWith("http")) {
        window.location.href = item.actionUrl;
      } else {
        router.push(item.actionUrl);
      }
    }
  };

  const markAllAsRead = async () => {
    const unreadItems = notifications.filter((n) => !n.isRead);
    if (unreadItems.length === 0) return;

    // Optimistically update
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);

    try {
      await Promise.all(
        unreadItems.map((n) =>
          fetch("/api/notifications", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: n.id }),
          })
        )
      );
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const renderTypeIcon = (type: UserNotificationItem["type"]) => {
    switch (type) {
      case "ANNOUNCEMENT":
        return <Megaphone className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />;
      case "SUCCESS":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />;
      case "WARNING":
        return <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />;
      default:
        return <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />;
    }
  };

  const badgeText = unreadCount > 99 ? "99+" : unreadCount > 0 ? String(unreadCount) : null;

  const baseButtonClasses =
    "rounded-xl border border-slate-200/50 dark:border-[rgba(255,255,255,0.08)] hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-[#AEB7C6] dark:hover:text-white transition-colors cursor-pointer relative";

  const sizeClasses = isMobile
    ? "p-2.5 flex items-center justify-center w-[42px] h-[42px] shrink-0"
    : "p-2.5 flex items-center justify-center";

  return (
    <div className="relative" ref={containerRef}>
      {/* Bell Button */}
      <button
        onClick={toggleDropdown}
        className={`${baseButtonClasses} ${sizeClasses} ${
          isOpen ? "bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white" : ""
        }`}
        aria-label={
          unreadCount > 0
            ? `${unreadCount} unread notification${unreadCount === 1 ? "" : "s"}`
            : "Notifications"
        }
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Bell className="w-5 h-5" />

        {/* Unread Count Badge */}
        {badgeText && (
          <span
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs pointer-events-none animate-in fade-in zoom-in-75 duration-150"
            aria-hidden="true"
          >
            {badgeText}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Notifications"
          className={`
            fixed sm:absolute
            inset-x-4 top-[70px] sm:inset-auto sm:right-0 sm:top-full sm:mt-2
            w-auto sm:w-96
            max-w-[calc(100vw-2rem)]
            bg-white dark:bg-[#0E1528]
            border border-slate-200/90 dark:border-[rgba(255,255,255,0.12)]
            rounded-2xl shadow-2xl
            z-50 overflow-hidden
            animate-in fade-in zoom-in-95 duration-150
          `}
        >
          {/* Dropdown Header */}
          <div className="px-4 py-3.5 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 text-[11px] font-bold bg-primary/10 text-primary dark:bg-primary/20 dark:text-blue-300 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>

            {status === "authenticated" && unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                title="Mark all as read"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* Content Body */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-white/5 scrollbar-thin">
            {status !== "authenticated" ? (
              <div className="py-10 px-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Sign in to view notifications
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4 leading-relaxed">
                  Log in to your Tralance account to receive product updates, billing receipts, and feature releases.
                </p>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold bg-primary hover:bg-primary/90 text-white transition-colors shadow-sm"
                >
                  Sign In
                </Link>
              </div>
            ) : loading && notifications.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin mb-2" />
                <span className="text-xs font-medium">Loading notifications...</span>
              </div>
            ) : error ? (
              <div className="py-8 px-4 text-center">
                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-3">
                  {error}
                </p>
                <button
                  onClick={fetchNotifications}
                  className="text-xs font-bold text-primary hover:underline cursor-pointer"
                >
                  Try again
                </button>
              </div>
            ) : notifications.length === 0 ? (
              <div className="py-12 px-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 flex items-center justify-center mx-auto mb-3">
                  <Bell className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  No notifications yet
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  You are all caught up! Updates and announcement notifications will appear here.
                </p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`
                    p-3.5 transition-colors cursor-pointer flex items-start gap-3 text-left
                    hover:bg-slate-50 dark:hover:bg-white/[0.04]
                    ${
                      !item.isRead
                        ? "bg-blue-50/40 dark:bg-blue-950/20"
                        : "bg-transparent"
                    }
                  `}
                >
                  {/* Type Icon */}
                  <div className="mt-0.5">{renderTypeIcon(item.type)}</div>

                  {/* Text details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-xs tracking-tight ${
                          !item.isRead
                            ? "font-bold text-slate-900 dark:text-white"
                            : "font-semibold text-slate-700 dark:text-slate-200"
                        }`}
                      >
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 whitespace-nowrap shrink-0">
                        {formatTimeAgo(item.createdAt)}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>

                    {item.actionUrl && (
                      <div className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-primary dark:text-blue-400">
                        <span>View details</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  {/* Unread dot indicator */}
                  {!item.isRead && (
                    <div
                      className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5 shadow-xs"
                      aria-label="Unread"
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
