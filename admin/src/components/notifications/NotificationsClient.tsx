"use client";

import * as React from "react";
import {
  Bell,
  Plus,
  Send,
  Calendar,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Users,
  ExternalLink,
  Loader2,
  Clock,
  Info,
  AlertTriangle,
  Megaphone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { EmojiPicker } from "@/components/ui/emoji-picker";
import {
  getNotifications,
  createNotification,
  sendNotification,
  cancelNotification,
  deleteNotification,
} from "@/lib/actions/notifications";
import { NotificationAudience, NotificationType } from "@prisma/client";

function isValidActionUrl(url: string): boolean {
  if (!url) return true;
  const trimmed = url.trim();
  if (trimmed.startsWith("/")) return true; // Valid internal route
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function NotificationsClient() {
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [isConfirmSendOpen, setIsConfirmSendOpen] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  // Form state
  const [title, setTitle] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [actionUrl, setActionUrl] = React.useState("");
  const [targetAudience, setTargetAudience] = React.useState<NotificationAudience>(NotificationAudience.ALL);
  const [type, setType] = React.useState<NotificationType>(NotificationType.INFO);

  const loadData = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const resetForm = () => {
    setTitle("");
    setMessage("");
    setActionUrl("");
    setTargetAudience(NotificationAudience.ALL);
    setType(NotificationType.INFO);
    setFormError(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFormError("Notification title is required.");
      return;
    }
    if (!message.trim()) {
      setFormError("Message body is required.");
      return;
    }
    if (actionUrl && !isValidActionUrl(actionUrl)) {
      setFormError("Action URL must be an internal path (e.g. /pricing) or a secure HTTPS link.");
      return;
    }

    setSubmitting(true);
    try {
      await createNotification({
        title: title.trim(),
        message: message.trim(),
        actionUrl: actionUrl.trim() || undefined,
        targetAudience,
        type,
      });
      setIsCreateOpen(false);
      resetForm();
      loadData();
    } catch (err: any) {
      setFormError(err?.message || "Failed to create notification.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSend = async (id: string) => {
    setSubmitting(true);
    try {
      await sendNotification(id);
      setIsConfirmSendOpen(null);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (id: string) => {
    await cancelNotification(id);
    loadData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notification record?")) return;
    await deleteNotification(id);
    loadData();
  };

  // Type visual theme for preview
  const getTypeStyles = (t: NotificationType) => {
    switch (t) {
      case NotificationType.ANNOUNCEMENT:
        return {
          icon: Megaphone,
          bg: "bg-purple-100 dark:bg-purple-950/60",
          text: "text-purple-600 dark:text-purple-400",
          border: "border-purple-200 dark:border-purple-900/40",
          badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
        };
      case NotificationType.SUCCESS:
        return {
          icon: CheckCircle2,
          bg: "bg-emerald-100 dark:bg-emerald-950/60",
          text: "text-emerald-600 dark:text-emerald-400",
          border: "border-emerald-200 dark:border-emerald-900/40",
          badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
        };
      case NotificationType.WARNING:
        return {
          icon: AlertTriangle,
          bg: "bg-amber-100 dark:bg-amber-950/60",
          text: "text-amber-600 dark:text-amber-400",
          border: "border-amber-200 dark:border-amber-900/40",
          badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
        };
      default:
        return {
          icon: Bell,
          bg: "bg-blue-100 dark:bg-blue-950/60",
          text: "text-blue-600 dark:text-blue-400",
          border: "border-blue-200 dark:border-blue-900/40",
          badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
        };
    }
  };

  const currentTypeStyle = getTypeStyles(type);
  const PreviewIcon = currentTypeStyle.icon;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Notifications Center
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
            Dispatch in-app product notifications, alerts, and feature updates directly to users&apos; accounts.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} size="sm" className="gap-2 shadow-xs">
          <Plus className="w-3.5 h-3.5" />
          <span>New Notification</span>
        </Button>
      </div>

      {/* Notifications Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Notification Campaigns</CardTitle>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
              Drafts, scheduled, and broadcasted in-app notifications
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-400 space-y-2">
              <Bell className="w-8 h-8 mx-auto text-slate-300 dark:text-neutral-700" />
              <p>No notifications created yet.</p>
              <Button size="sm" variant="outline" onClick={() => setIsCreateOpen(true)}>
                Create your first notification
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Notification</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recipients</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((notif) => (
                  <TableRow key={notif.id}>
                    <TableCell>
                      <div className="max-w-xs sm:max-w-sm truncate">
                        <p className="font-semibold text-slate-900 dark:text-white truncate">
                          {notif.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-neutral-400 truncate mt-0.5">
                          {notif.message}
                        </p>
                        {notif.actionUrl && (
                          <span className="text-[11px] text-blue-600 dark:text-blue-400 inline-flex items-center gap-0.5 mt-0.5">
                            {notif.actionUrl}
                            <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant={notif.targetAudience === "PRO" ? "pro" : "secondary"}>
                        {notif.targetAudience}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <span className="text-xs font-medium text-slate-700 dark:text-neutral-300">
                        {notif.type}
                      </span>
                    </TableCell>

                    <TableCell>
                      {notif.status === "SENT" && <Badge variant="success">SENT</Badge>}
                      {notif.status === "SENDING" && <Badge variant="warning">SENDING...</Badge>}
                      {notif.status === "SCHEDULED" && <Badge variant="warning">SCHEDULED</Badge>}
                      {notif.status === "DRAFT" && <Badge variant="default">DRAFT</Badge>}
                      {notif.status === "CANCELLED" && <Badge variant="secondary">CANCELLED</Badge>}
                    </TableCell>

                    <TableCell>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">
                        {notif.deliveredCount}
                      </span>
                    </TableCell>

                    <TableCell className="text-xs text-slate-400 whitespace-nowrap">
                      {new Date(notif.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {notif.status === "DRAFT" && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => setIsConfirmSendOpen(notif.id)}
                            className="h-8 text-xs gap-1"
                          >
                            <Send className="w-3 h-3" />
                            <span>Send</span>
                          </Button>
                        )}
                        {notif.status === "SCHEDULED" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancel(notif.id)}
                            className="h-8 text-xs text-amber-600"
                          >
                            Cancel
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(notif.id)}
                          className="h-8 text-slate-400 hover:text-red-500"
                          title="Delete notification"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Notification Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => {
          setIsCreateOpen(false);
          resetForm();
        }}
        title="Create In-App Notification"
        description="Craft an announcement to be delivered directly to users' in-app notification inbox."
        maxWidth="2xl"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-sm">
          {formError && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Title with Emoji Picker */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
                Notification Title
              </label>
              <EmojiPicker onSelect={(emoji) => setTitle((prev) => prev + ` ${emoji} `)} />
            </div>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 📢 New Feature: Unlimited Freelance Contract PDF"
              className="w-full px-3.5 py-2 text-sm bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-neutral-700"
            />
          </div>

          {/* Message with Emoji Picker */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
                Message Body
              </label>
              <EmojiPicker onSelect={(emoji) => setMessage((prev) => prev + ` ${emoji} `)} />
            </div>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Provide a concise description of the update or feature..."
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-neutral-700 resize-y leading-relaxed"
            />
          </div>

          {/* Three Parameters Grid: Audience, Type, Action URL */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                Audience Group
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value as NotificationAudience)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              >
                <option value={NotificationAudience.ALL}>All Users</option>
                <option value={NotificationAudience.PRO}>Pro Subscribers Only</option>
                <option value={NotificationAudience.FREE}>Free Tier Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                Notification Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as NotificationType)}
                className="w-full px-3 py-2 text-xs bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              >
                <option value={NotificationType.INFO}>Information (Blue)</option>
                <option value={NotificationType.ANNOUNCEMENT}>Announcement (Purple)</option>
                <option value={NotificationType.SUCCESS}>Success (Green)</option>
                <option value={NotificationType.WARNING}>Notice (Amber)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                Action URL (Optional)
              </label>
              <input
                type="text"
                value={actionUrl}
                onChange={(e) => setActionUrl(e.target.value)}
                placeholder="/pricing or /tools"
                className="w-full px-3 py-2 text-xs bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Live Inbox Preview Card */}
          <div className="pt-2">
            <span className="text-[11px] font-bold text-slate-400 dark:text-neutral-500 uppercase tracking-wider block mb-2">
              User Inbox Preview
            </span>
            <div className={`p-4 rounded-xl border bg-slate-50 dark:bg-neutral-900 flex items-start gap-3 shadow-xs ${currentTypeStyle.border}`}>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${currentTypeStyle.bg} ${currentTypeStyle.text}`}>
                <PreviewIcon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-sm truncate">
                    {title || "Notification Title"}
                  </h4>
                  <span className="text-[10px] text-slate-400">Just now</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-neutral-300 mt-1 leading-relaxed">
                  {message || "The notification message text will display here for customer accounts."}
                </p>
                {actionUrl && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 mt-2.5 hover:underline">
                    <span>Visit Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-neutral-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsCreateOpen(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Notification Draft"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Final Confirm Send Modal */}
      <Modal
        isOpen={!!isConfirmSendOpen}
        onClose={() => setIsConfirmSendOpen(null)}
        title="Confirm Notification Broadcast"
        description="Verify audience parameters before sending."
        maxWidth="md"
      >
        <div className="space-y-4 text-sm">
          <p className="text-slate-600 dark:text-neutral-300">
            This action will create real <code className="bg-slate-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded font-mono text-xs">UserNotification</code> records in the database for each user in the targeted group.
          </p>
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-neutral-800">
            <Button variant="outline" onClick={() => setIsConfirmSendOpen(null)}>
              Cancel
            </Button>
            <Button
              variant="default"
              disabled={submitting}
              onClick={() => isConfirmSendOpen && handleSend(isConfirmSendOpen)}
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm & Send"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
