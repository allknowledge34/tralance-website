"use client";

import * as React from "react";
import {
  Bell,
  Plus,
  Send,
  Trash2,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  AlertTriangle,
  Megaphone,
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
  if (trimmed.startsWith("/")) return true;
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

  const getTypeStyles = (t: NotificationType) => {
    switch (t) {
      case NotificationType.ANNOUNCEMENT:
        return {
          icon: Megaphone,
          bg: "bg-[#C4B5FD] text-[#171717] border-2 border-[#171717]",
          badge: "bg-[#C4B5FD] text-[#171717]",
        };
      case NotificationType.SUCCESS:
        return {
          icon: CheckCircle2,
          bg: "bg-[#6EE7B7] text-[#171717] border-2 border-[#171717]",
          badge: "bg-[#6EE7B7] text-[#171717]",
        };
      case NotificationType.WARNING:
        return {
          icon: AlertTriangle,
          bg: "bg-[#FFE52E] text-[#171717] border-2 border-[#171717]",
          badge: "bg-[#FFE52E] text-[#171717]",
        };
      default:
        return {
          icon: Bell,
          bg: "bg-[#35B9F5] text-[#171717] border-2 border-[#171717]",
          badge: "bg-[#35B9F5] text-[#171717]",
        };
    }
  };

  const currentTypeStyle = getTypeStyles(type);
  const PreviewIcon = currentTypeStyle.icon;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b-2 border-[#171717] dark:border-[#383838]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#171717] dark:text-white">
            Notifications Center
          </h1>
          <p className="text-sm font-medium text-[#525252] dark:text-[#A3A3A3] mt-1">
            Dispatch in-app product notifications, alerts, and feature updates directly to users&apos; accounts.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)} size="sm" className="gap-2">
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>New Notification</span>
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Notification Campaigns</CardTitle>
            <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mt-0.5">
              Drafts, scheduled, and broadcasted in-app notifications
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#171717] dark:text-white" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="py-16 text-center text-xs font-medium text-[#525252] dark:text-[#A3A3A3] space-y-2">
              <Bell className="w-8 h-8 mx-auto text-[#525252] dark:text-[#A3A3A3]" />
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
                        <p className="font-bold text-[#171717] dark:text-white truncate">
                          {notif.title}
                        </p>
                        <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] truncate mt-0.5">
                          {notif.message}
                        </p>
                        {notif.actionUrl && (
                          <span className="text-[11px] font-bold text-[#171717] dark:text-[#35B9F5] inline-flex items-center gap-0.5 mt-0.5 underline">
                            {notif.actionUrl}
                            <ExternalLink className="w-2.5 h-2.5 stroke-[2.5]" />
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
                      <span className="text-xs font-bold text-[#171717] dark:text-[#E5E5E5]">
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
                      <span className="text-xs font-mono font-bold text-[#171717] dark:text-white">
                        {notif.deliveredCount}
                      </span>
                    </TableCell>

                    <TableCell className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] whitespace-nowrap">
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
                            <Send className="w-3 h-3 stroke-[2.5]" />
                            <span>Send</span>
                          </Button>
                        )}
                        {notif.status === "SCHEDULED" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCancel(notif.id)}
                            className="h-8 text-xs text-[#FF6B6B]"
                          >
                            Cancel
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(notif.id)}
                          className="h-8 text-[#525252] hover:text-[#FF6B6B]"
                          title="Delete notification"
                        >
                          <Trash2 className="w-3.5 h-3.5 stroke-[2.5]" />
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
            <div className="p-3 bg-[#FF6B6B] border-2 border-[#171717] rounded-md text-[#171717] text-xs font-bold shadow-[2px_2px_0px_0px_#171717] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 stroke-[2.5]" />
              <span>{formError}</span>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5]">
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
              className="w-full px-3.5 py-2 text-sm font-medium bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#FFE52E] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5]">
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
              className="w-full px-3.5 py-2.5 text-sm font-medium bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#FFE52E] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] resize-y leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
                Audience Group
              </label>
              <select
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value as NotificationAudience)}
                className="w-full px-3 py-2 text-xs font-bold bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white focus:outline-none shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
              >
                <option value={NotificationAudience.ALL}>All Users</option>
                <option value={NotificationAudience.PRO}>Pro Subscribers Only</option>
                <option value={NotificationAudience.FREE}>Free Tier Only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
                Notification Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as NotificationType)}
                className="w-full px-3 py-2 text-xs font-bold bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white focus:outline-none shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
              >
                <option value={NotificationType.INFO}>Information (Blue)</option>
                <option value={NotificationType.ANNOUNCEMENT}>Announcement (Purple)</option>
                <option value={NotificationType.SUCCESS}>Success (Green)</option>
                <option value={NotificationType.WARNING}>Notice (Amber)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
                Action URL (Optional)
              </label>
              <input
                type="text"
                value={actionUrl}
                onChange={(e) => setActionUrl(e.target.value)}
                placeholder="/pricing or /tools"
                className="w-full px-3 py-2 text-xs font-medium bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white placeholder:text-[#A3A3A3] focus:outline-none shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
              />
            </div>
          </div>

          <div className="pt-2">
            <span className="text-[11px] font-black text-[#171717] dark:text-white uppercase tracking-wider block mb-2">
              User Inbox Preview
            </span>
            <div className="p-4 rounded-md border-2 border-[#171717] dark:border-[#383838] bg-[#FFFDF5] dark:bg-[#18181B] flex items-start gap-3 shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000]">
              <div className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 mt-0.5 shadow-[1.5px_1.5px_0px_0px_#171717] ${currentTypeStyle.bg}`}>
                <PreviewIcon className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-extrabold text-[#171717] dark:text-white text-sm truncate">
                    {title || "Notification Title"}
                  </h4>
                  <span className="text-[10px] font-bold text-[#525252] dark:text-[#A3A3A3]">Just now</span>
                </div>
                <p className="text-xs font-medium text-[#525252] dark:text-[#D4D4D8] mt-1 leading-relaxed">
                  {message || "The notification message text will display here for customer accounts."}
                </p>
                {actionUrl && (
                  <span className="inline-flex items-center gap-1 text-xs font-black text-[#171717] dark:text-[#35B9F5] mt-2.5 underline">
                    <span>Visit Link</span>
                    <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t-2 border-[#171717] dark:border-[#383838]">
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

      <Modal
        isOpen={!!isConfirmSendOpen}
        onClose={() => setIsConfirmSendOpen(null)}
        title="Confirm Notification Broadcast"
        description="Verify audience parameters before sending."
        maxWidth="md"
      >
        <div className="space-y-4 text-sm font-medium">
          <p className="text-[#171717] dark:text-[#E5E5E5]">
            This action will create real <code className="bg-[#FFE52E] dark:bg-[#27272A] border border-[#171717] px-1.5 py-0.5 rounded font-mono text-xs font-bold text-[#171717] dark:text-white">UserNotification</code> records in the database for each user in the targeted group.
          </p>
          <div className="flex justify-end gap-2 pt-4 border-t-2 border-[#171717] dark:border-[#383838]">
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
