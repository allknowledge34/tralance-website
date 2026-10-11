"use client";

import * as React from "react";
import {
  Mail,
  Plus,
  Send,
  Eye,
  Smartphone,
  Monitor,
  AlertTriangle,
  CheckCircle2,
  Users,
  Shield,
  Loader2,
  Trash2,
  Info,
  Clock,
  Sparkles,
  Ban,
  Check,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { EmojiPicker } from "@/components/ui/emoji-picker";
import { EmailComposer } from "./EmailComposer";
import {
  getCampaigns,
  createCampaign,
  sendTestBroadcast,
  sendLiveBroadcast,
  getEligibleRecipientCount,
  getEmailSuppressions,
  addEmailSuppression,
  removeEmailSuppression,
  parseAndValidateCustomEmails,
  getRegisteredUsersForSelection,
  type BroadcastRecipientType,
} from "@/lib/actions/broadcasts";
import { NotificationAudience } from "@prisma/client";

const defaultTemplate = `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background-color: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0;">
  <div style="text-align: center; margin-bottom: 24px;">
    <h1 style="color: #0f172a; font-size: 24px; font-weight: 700; margin: 0;">Tralance Update</h1>
    <p style="color: #64748b; font-size: 14px; margin-top: 4px;">Private, offline-first tools for freelancers</p>
  </div>
  <div style="line-height: 1.6; font-size: 15px; margin-bottom: 24px;">
    <p>Hello,</p>
    <p>We are excited to announce a new update to Tralance. We have streamlined freelance workflow tools to help you manage clients, generate professional PDFs, and keep your business records organized.</p>
  </div>
  <div style="text-align: center; margin: 32px 0;">
    <a href="https://www.tralance.pro/tools" style="background-color: #0f172a; color: #ffffff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; display: inline-block;">Explore Tools</a>
  </div>
  <div style="border-top: 1px solid #f1f5f9; padding-top: 20px; font-size: 12px; color: #94a3b8; text-align: center;">
    <p>© 2026 Tralance • Operated by DmilX</p>
    <p>You received this email because you created an account on Tralance.</p>
  </div>
</div>`;

export function BroadcastsClient() {
  const [campaigns, setCampaigns] = React.useState<any[]>([]);
  const [providerStatus, setProviderStatus] = React.useState<any>(null);
  const [suppressionsCount, setSuppressionsCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  // Creation modal state
  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [senderName, setSenderName] = React.useState("Tralance Team");
  const [senderEmail, setSenderEmail] = React.useState("noreply@tralance.pro");
  const [previewText, setPreviewText] = React.useState("");
  const [htmlContent, setHtmlContent] = React.useState(defaultTemplate);
  const [targetAudience, setTargetAudience] = React.useState<NotificationAudience>(NotificationAudience.ALL);
  const [recipientType, setRecipientType] = React.useState<BroadcastRecipientType>("ALL_REGISTERED");
  const [customEmailsInput, setCustomEmailsInput] = React.useState("");
  const [registeredUsers, setRegisteredUsers] = React.useState<any[]>([]);
  const [userSearchQuery, setUserSearchQuery] = React.useState("");
  const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);
  const [loadingUsers, setLoadingUsers] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [estimatedRecipients, setEstimatedRecipients] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);

  // Unsaved changes confirm
  const [showDiscardConfirm, setShowDiscardConfirm] = React.useState(false);

  // Test email modal
  const [testModalCampaign, setTestModalCampaign] = React.useState<any | null>(null);
  const [testEmailAddress, setTestEmailAddress] = React.useState("");
  const [sendingTest, setSendingTest] = React.useState(false);
  const [testResult, setTestResult] = React.useState<string | null>(null);

  // Live broadcast confirmation modal
  const [liveConfirmCampaign, setLiveConfirmCampaign] = React.useState<any | null>(null);
  const [sendingLive, setSendingLive] = React.useState(false);

  // Suppressions modal
  const [isSuppressionsOpen, setIsSuppressionsOpen] = React.useState(false);
  const [suppressionsList, setSuppressionsList] = React.useState<any[]>([]);
  const [newSuppressionEmail, setNewSuppressionEmail] = React.useState("");

  // Setup guide modal
  const [isSetupGuideOpen, setIsSetupGuideOpen] = React.useState(false);

  const loadData = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCampaigns();
      setCampaigns(res.campaigns);
      setProviderStatus(res.providerStatus);
      setSuppressionsCount(res.suppressionsCount);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  // Real-time custom emails validation
  const customValidation = React.useMemo(() => {
    if (recipientType !== "CUSTOM") {
      return { validEmails: [], invalidEmails: [], duplicateCount: 0, totalParsed: 0 };
    }
    return parseAndValidateCustomEmails(customEmailsInput);
  }, [recipientType, customEmailsInput]);

  // Lazy fetch registered users when "Selected Registered Users" is chosen
  React.useEffect(() => {
    if (isCreateOpen && recipientType === "SELECTED_USERS" && registeredUsers.length === 0) {
      setLoadingUsers(true);
      getRegisteredUsersForSelection()
        .then((users) => setRegisteredUsers(users))
        .catch((err) => console.error("Failed to load registered users:", err))
        .finally(() => setLoadingUsers(false));
    }
  }, [isCreateOpen, recipientType, registeredUsers.length]);

  const filteredRegisteredUsers = React.useMemo(() => {
    if (!userSearchQuery.trim()) return registeredUsers;
    const q = userSearchQuery.toLowerCase();
    return registeredUsers.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [registeredUsers, userSearchQuery]);

  // Update estimated recipients dynamically
  React.useEffect(() => {
    if (!isCreateOpen) return;

    if (recipientType === "CUSTOM") {
      setEstimatedRecipients(customValidation.validEmails.length);
    } else if (recipientType === "SELECTED_USERS") {
      setEstimatedRecipients(selectedUserIds.length);
    } else {
      let aud: NotificationAudience = NotificationAudience.ALL;
      if (recipientType === "PRO_REGISTERED") aud = NotificationAudience.PRO;
      else if (recipientType === "FREE_REGISTERED") aud = NotificationAudience.FREE;
      getEligibleRecipientCount(aud)
        .then((count) => setEstimatedRecipients(count))
        .catch(() => setEstimatedRecipients(0));
    }
  }, [isCreateOpen, recipientType, customValidation.validEmails.length, selectedUserIds.length]);

  const handleModalClose = () => {
    if (
      name.trim() ||
      subject.trim() ||
      htmlContent !== defaultTemplate ||
      customEmailsInput.trim() ||
      selectedUserIds.length > 0
    ) {
      setShowDiscardConfirm(true);
    } else {
      setIsCreateOpen(false);
    }
  };

  const confirmDiscard = () => {
    setShowDiscardConfirm(false);
    setIsCreateOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setSubject("");
    setPreviewText("");
    setSenderName("Tralance Team");
    setSenderEmail("noreply@tralance.pro");
    setHtmlContent(defaultTemplate);
    setTargetAudience(NotificationAudience.ALL);
    setRecipientType("ALL_REGISTERED");
    setCustomEmailsInput("");
    setSelectedUserIds([]);
    setUserSearchQuery("");
    setFormError(null);
  };

  const isSubmitDisabled =
    submitting ||
    !name.trim() ||
    !subject.trim() ||
    !htmlContent.trim() ||
    (recipientType === "CUSTOM" &&
      (customValidation.validEmails.length === 0 || customValidation.invalidEmails.length > 0)) ||
    (recipientType === "SELECTED_USERS" && selectedUserIds.length === 0);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitDisabled) return;

    setSubmitting(true);
    setFormError(null);
    try {
      let aud: NotificationAudience = NotificationAudience.ALL;
      if (recipientType === "PRO_REGISTERED") aud = NotificationAudience.PRO;
      else if (recipientType === "FREE_REGISTERED") aud = NotificationAudience.FREE;

      await createCampaign({
        name,
        subject,
        senderName,
        senderEmail,
        previewText,
        htmlContent,
        recipientType,
        targetAudience: aud,
        customEmailsText: recipientType === "CUSTOM" ? customEmailsInput : undefined,
        selectedUserIds: recipientType === "SELECTED_USERS" ? selectedUserIds : undefined,
      });
      setIsCreateOpen(false);
      resetForm();
      loadData();
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Failed to create campaign draft";
      setFormError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testModalCampaign || !testEmailAddress) return;

    setSendingTest(true);
    setTestResult(null);
    try {
      const res = await sendTestBroadcast({
        campaignId: testModalCampaign.id,
        testEmail: testEmailAddress,
      });
      if (res.success) {
        setTestResult(
          `Test email dispatched successfully (${res.simulated ? "Simulated Mode" : "Production"}).`
        );
      } else {
        setTestResult(`Failed: ${res.error}`);
      }
    } catch (err: any) {
      setTestResult(`Error: ${err.message}`);
    } finally {
      setSendingTest(false);
    }
  };

  const handleSendLive = async () => {
    if (!liveConfirmCampaign) return;

    setSendingLive(true);
    try {
      await sendLiveBroadcast(liveConfirmCampaign.id);
      setLiveConfirmCampaign(null);
      loadData();
    } catch (err) {
      console.error(err);
    } finally {
      setSendingLive(false);
    }
  };

  const openSuppressionsModal = async () => {
    setIsSuppressionsOpen(true);
    const list = await getEmailSuppressions();
    setSuppressionsList(list);
  };

  const handleAddSuppression = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSuppressionEmail.trim()) return;
    await addEmailSuppression(newSuppressionEmail.trim(), "ADMIN_MANUAL");
    setNewSuppressionEmail("");
    const list = await getEmailSuppressions();
    setSuppressionsList(list);
    setSuppressionsCount(list.length);
  };

  const handleRemoveSuppression = async (email: string) => {
    await removeEmailSuppression(email);
    const list = await getEmailSuppressions();
    setSuppressionsList(list);
    setSuppressionsCount(list.length);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Email Broadcasts
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-1">
            Deliver announcement campaigns to registered users with live preview, emoji & image support, and safety suppression lists.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={openSuppressionsModal} className="gap-1.5 shadow-xs">
            <Ban className="w-3.5 h-3.5 text-slate-500" />
            <span>Suppression List ({suppressionsCount})</span>
          </Button>
          <Button onClick={() => setIsCreateOpen(true)} size="sm" className="gap-2 shadow-xs">
            <Plus className="w-3.5 h-3.5" />
            <span>Create Campaign</span>
          </Button>
        </div>
      </div>

      {/* Provider Status Alert — Unmistakably clear simulated mode */}
      {providerStatus && (
        <div className={`p-4 rounded-2xl border shadow-xs transition-all ${
          providerStatus.configured
            ? "border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20"
            : "border-amber-200/90 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20"
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                providerStatus.configured
                  ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400"
              }`}>
                {providerStatus.configured ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    Delivery Gateway: {providerStatus.provider.toUpperCase()}
                  </span>
                  <Badge variant={providerStatus.configured ? "success" : "warning"}>
                    {providerStatus.configured ? "Production Connected" : "SIMULATED MODE (TESTING ONLY)"}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600 dark:text-neutral-400 mt-1">
                  {providerStatus.configured
                    ? `${providerStatus.description} • Verified sender: ${providerStatus.senderEmail}`
                    : "No external email API key configured in .env. Dispatches are safely logged to the database and audit trail without dispatching real emails to customer inboxes."}
                </p>

                {providerStatus.missingRequirements && providerStatus.missingRequirements.length > 0 && (
                  <div className="mt-2.5 pt-2.5 border-t border-amber-200/80 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                    <p className="font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Required setup to activate live sending:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-amber-800 dark:text-amber-300">
                      {providerStatus.missingRequirements.map((req: string, idx: number) => (
                        <li key={idx}>
                          <code className="bg-amber-100/80 dark:bg-amber-900/50 px-1 py-0.5 rounded font-mono">
                            {req}
                          </code>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSetupGuideOpen(true)}
              className="text-xs gap-1.5 shrink-0 bg-white dark:bg-neutral-900 border-amber-300 dark:border-amber-800 hover:bg-amber-50"
            >
              <Info className="w-3.5 h-3.5 text-amber-600" />
              <span>DNS & API Setup Guide</span>
            </Button>
          </div>
        </div>
      )}

      {/* Campaigns History Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Campaign History</CardTitle>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
              Drafts, test dispatches, and sent campaign records
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
            </div>
          ) : campaigns.length === 0 ? (
            <div className="py-16 text-center text-xs text-slate-400 space-y-2">
              <Mail className="w-8 h-8 mx-auto text-slate-300 dark:text-neutral-700" />
              <p>No email campaigns created yet.</p>
              <Button size="sm" variant="outline" onClick={() => setIsCreateOpen(true)}>
                Create your first campaign
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign Name & Subject</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delivered</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="max-w-xs sm:max-w-md truncate">
                        <p className="font-semibold text-slate-900 dark:text-white truncate">
                          {c.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-neutral-400 truncate mt-0.5">
                          Subject: {c.subject}
                        </p>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          From: {c.senderName} ({c.senderEmail})
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      {c.recipientType === "CUSTOM" ? (
                        <Badge variant="warning" className="text-[11px] font-medium gap-1">
                          <Mail className="w-3 h-3" /> Custom ({c.totalRecipients})
                        </Badge>
                      ) : c.recipientType === "SELECTED_USERS" ? (
                        <Badge variant="secondary" className="text-[11px] font-medium gap-1">
                          <Users className="w-3 h-3" /> Selected ({c.totalRecipients})
                        </Badge>
                      ) : (
                        <Badge
                          variant={
                            c.targetAudience === "PRO" || c.recipientType === "PRO_REGISTERED"
                              ? "pro"
                              : "secondary"
                          }
                        >
                          {c.recipientType === "PRO_REGISTERED" || c.targetAudience === "PRO"
                            ? "PRO Users"
                            : c.recipientType === "FREE_REGISTERED"
                            ? "FREE Users"
                            : "All Users"}
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      {c.status === "SENT" && <Badge variant="success">SENT</Badge>}
                      {c.status === "SENDING" && <Badge variant="warning">SENDING...</Badge>}
                      {c.status === "SCHEDULED" && <Badge variant="warning">SCHEDULED</Badge>}
                      {c.status === "DRAFT" && <Badge variant="default">DRAFT</Badge>}
                      {c.status === "FAILED" && <Badge variant="danger">FAILED</Badge>}
                    </TableCell>

                    <TableCell>
                      <div className="text-xs">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {c.sentCount}
                        </span>
                        <span className="text-slate-400"> / {c.totalRecipients}</span>
                        {c.failedCount > 0 && (
                          <span className="text-red-500 block text-[11px]">
                            {c.failedCount} failed
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-xs text-slate-400 whitespace-nowrap">
                      {new Date(c.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setTestModalCampaign(c);
                            setTestResult(null);
                          }}
                          className="h-8 text-xs gap-1"
                          title="Send test email to verify layout"
                        >
                          <Send className="w-3 h-3" />
                          <span>Test</span>
                        </Button>

                        {c.status === "DRAFT" && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => setLiveConfirmCampaign(c)}
                            className="h-8 text-xs gap-1"
                          >
                            <span>Live Broadcast</span>
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Campaign Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={handleModalClose}
        title="Create Email Broadcast Campaign"
        description="Design clean HTML marketing or announcement emails with responsive preview, emoji & image insertion, and audience targeting."
        maxWidth="5xl"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-sm">
          {/* Top metadata grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                Campaign Internal Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. October Feature Update"
                className="w-full px-3.5 py-2 text-sm bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-neutral-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                Recipient Type <span className="text-red-500">*</span>
              </label>
              <select
                value={recipientType}
                onChange={(e) => {
                  setRecipientType(e.target.value as BroadcastRecipientType);
                  setFormError(null);
                }}
                className="w-full px-3.5 py-2 text-sm bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-neutral-700"
              >
                <option value="ALL_REGISTERED">
                  All Registered Users ({recipientType === "ALL_REGISTERED" ? estimatedRecipients : "..."} eligible)
                </option>
                <option value="PRO_REGISTERED">Active Pro Subscribers Only</option>
                <option value="FREE_REGISTERED">Free Tier Users Only</option>
                <option value="SELECTED_USERS">
                  Selected Registered Users ({selectedUserIds.length} selected)
                </option>
                <option value="CUSTOM">Custom Email Addresses (Manual Entry)</option>
              </select>
            </div>
          </div>

          {/* Form Level Error Alert */}
          {formError && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Custom Emails Multiline Input & Live Validation */}
          {recipientType === "CUSTOM" && (
            <div className="space-y-2 p-4 rounded-xl bg-slate-50 dark:bg-[#1c1c1f] border border-slate-200/80 dark:border-neutral-800 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-xs font-semibold text-slate-800 dark:text-neutral-200 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  Custom Recipient Email Addresses <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-slate-400">
                  Separated by commas, spaces, or new lines
                </span>
              </div>

              <textarea
                rows={4}
                required
                value={customEmailsInput}
                onChange={(e) => {
                  setCustomEmailsInput(e.target.value);
                  setFormError(null);
                }}
                placeholder={"client@example.com\npartner@example.org, vendor@company.com"}
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-white dark:bg-[#121214] border border-slate-200 dark:border-neutral-700 rounded-lg text-slate-900 dark:text-neutral-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-neutral-600"
              />

              {/* Validation & Count Stats */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium ${
                      customValidation.validEmails.length > 0
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                        : "bg-slate-200 text-slate-600 dark:bg-neutral-800 dark:text-neutral-400"
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    {customValidation.validEmails.length} valid recipient
                    {customValidation.validEmails.length === 1 ? "" : "s"}
                  </span>

                  {customValidation.duplicateCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-medium bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                      <Info className="w-3 h-3" />
                      {customValidation.duplicateCount} duplicate
                      {customValidation.duplicateCount === 1 ? "" : "s"} merged
                    </span>
                  )}
                </div>

                <span className="text-[11px] text-slate-400">
                  Max limit: 2,000 recipients
                </span>
              </div>

              {/* Invalid Addresses Alert */}
              {customValidation.invalidEmails.length > 0 && (
                <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                    Invalid Email Address
                    {customValidation.invalidEmails.length === 1 ? "" : "es"} Detected (
                    {customValidation.invalidEmails.length})
                  </div>
                  <p className="text-[11px] text-red-600 dark:text-red-400">
                    The following entries do not match valid email address format and must be corrected before saving:
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1 max-h-24 overflow-y-auto">
                    {customValidation.invalidEmails.map((inv, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-200 rounded font-mono text-[11px]"
                      >
                        {inv}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Selected Registered Users Picker */}
          {recipientType === "SELECTED_USERS" && (
            <div className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-[#1c1c1f] border border-slate-200/80 dark:border-neutral-800 animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <label className="text-xs font-semibold text-slate-800 dark:text-neutral-200 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  Select Registered Users ({selectedUserIds.length} selected)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const filteredIds = filteredRegisteredUsers.map((u) => u.id);
                      setSelectedUserIds(Array.from(new Set([...selectedUserIds, ...filteredIds])));
                    }}
                    className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Select All Filtered
                  </button>
                  <span className="text-slate-300 dark:text-neutral-700">•</span>
                  <button
                    type="button"
                    onClick={() => setSelectedUserIds([])}
                    className="text-[11px] text-slate-500 dark:text-neutral-400 hover:underline"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>

              {/* Search Filter */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search registered users by name or email..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="w-full px-3 py-1.5 pl-8 text-xs bg-white dark:bg-[#121214] border border-slate-200 dark:border-neutral-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>

              {/* Users List Box */}
              <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-neutral-800 border border-slate-200 dark:border-neutral-700/60 rounded-lg bg-white dark:bg-[#141416]">
                {loadingUsers ? (
                  <div className="py-6 flex items-center justify-center text-xs text-slate-400 gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading registered users...
                  </div>
                ) : filteredRegisteredUsers.length === 0 ? (
                  <div className="py-6 text-center text-xs text-slate-400">
                    No registered users found matching &quot;{userSearchQuery}&quot;
                  </div>
                ) : (
                  filteredRegisteredUsers.map((u) => {
                    const isSelected = selectedUserIds.includes(u.id);
                    return (
                      <label
                        key={u.id}
                        className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors ${
                          isSelected
                            ? "bg-slate-50 dark:bg-neutral-800/50"
                            : "hover:bg-slate-50/60 dark:hover:bg-neutral-900"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUserIds((prev) => [...prev, u.id]);
                              } else {
                                setSelectedUserIds((prev) => prev.filter((id) => id !== u.id));
                              }
                            }}
                            className="rounded border-slate-300 text-slate-900 focus:ring-0"
                          />
                          <div className="text-xs">
                            <span className="font-medium text-slate-900 dark:text-white">
                              {u.name}
                            </span>
                            <span className="text-slate-400 ml-2 font-mono text-[11px]">
                              {u.email}
                            </span>
                          </div>
                        </div>
                        <Badge variant={u.isPro ? "pro" : "secondary"} className="text-[10px] px-1.5 py-0">
                          {u.plan}
                        </Badge>
                      </label>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Subject Line with Emoji Picker */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
                  Email Subject Line
                </label>
                <EmojiPicker onSelect={(emoji) => setSubject((prev) => prev + ` ${emoji} `)} />
              </div>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. 🚀 Introducing Unlimited Freelance Contracts on Tralance"
                className="w-full px-3.5 py-2 text-sm bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-neutral-700"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
                  Preheader / Preview Text
                </label>
                <EmojiPicker onSelect={(emoji) => setPreviewText((prev) => prev + ` ${emoji} `)} />
              </div>
              <input
                type="text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                placeholder="Short summary displayed in the email inbox list..."
                className="w-full px-3.5 py-2 text-sm bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-neutral-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                Sender Name
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                Sender Address
              </label>
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Dedicated Rich Composer with Image, Emoji & Live Preview */}
          <EmailComposer
            initialHtml={htmlContent}
            onChange={setHtmlContent}
            defaultTemplate={defaultTemplate}
          />

          {/* Sticky Modal Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-neutral-800">
            <span className="text-xs text-slate-500 dark:text-neutral-400">
              Audience Estimate: <strong className="text-slate-900 dark:text-white">{estimatedRecipients} recipients</strong>
            </span>
            <div className="flex gap-2 w-full sm:w-auto justify-end">
              <Button type="button" variant="outline" onClick={handleModalClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitDisabled}>
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Campaign Draft"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Discard Confirmation Dialog */}
      {showDiscardConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#18181b] rounded-2xl p-6 max-w-sm w-full border border-slate-200 dark:border-neutral-800 shadow-2xl space-y-3 text-sm">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Discard Unsaved Changes?
            </h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              You have unsaved changes in this campaign draft. If you close now, your progress will be discarded.
            </p>
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-neutral-800">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowDiscardConfirm(false)}
              >
                Keep Editing
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={confirmDiscard}
              >
                Discard Draft
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Test Email Dispatch Modal */}
      <Modal
        isOpen={!!testModalCampaign}
        onClose={() => setTestModalCampaign(null)}
        title="Send Test Broadcast"
        description="Verify how the email renders in your personal inbox before broadcasting to real users."
        maxWidth="md"
      >
        <form onSubmit={handleSendTest} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
              Test Recipient Email Address
            </label>
            <input
              type="email"
              required
              value={testEmailAddress}
              onChange={(e) => setTestEmailAddress(e.target.value)}
              placeholder="yourname@gmail.com"
              className="w-full px-3.5 py-2 text-sm bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          {testResult && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              testResult.includes("success")
                ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                : "bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
            }`}>
              <Info className="w-4 h-4 shrink-0" />
              <span>{testResult}</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-neutral-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => setTestModalCampaign(null)}
            >
              Close
            </Button>
            <Button type="submit" disabled={sendingTest}>
              {sendingTest ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Test"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Final Live Broadcast Confirmation Modal */}
      <Modal
        isOpen={!!liveConfirmCampaign}
        onClose={() => setLiveConfirmCampaign(null)}
        title="Confirm Live Broadcast Dispatch"
        description="Verify audience parameters before triggering real delivery."
        maxWidth="md"
      >
        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/90 dark:border-amber-900/40 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 dark:text-amber-200 space-y-2 w-full">
              <p className="font-semibold text-sm">Safety Verification Required</p>
              <p>
                You are about to launch a real email broadcast for campaign:
                <br />
                <strong className="text-amber-950 dark:text-amber-100 text-xs">
                  &quot;{liveConfirmCampaign?.name}&quot;
                </strong>
              </p>

              <div className="p-3 bg-white/80 dark:bg-neutral-900/80 rounded-lg border border-amber-200/80 dark:border-amber-900/60 space-y-1.5 text-[11px] font-sans">
                <div>
                  <span className="text-slate-500 dark:text-neutral-400">Subject:</span>{" "}
                  <strong className="text-slate-800 dark:text-neutral-200">
                    {liveConfirmCampaign?.subject}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-neutral-400">From:</span>{" "}
                  <span className="font-mono text-slate-700 dark:text-neutral-300">
                    {liveConfirmCampaign?.senderName} &lt;{liveConfirmCampaign?.senderEmail}&gt;
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-neutral-400">Target Group:</span>{" "}
                  <strong className="text-slate-800 dark:text-neutral-200">
                    {liveConfirmCampaign?.recipientType === "CUSTOM"
                      ? "Custom Email Addresses (Manual Entry)"
                      : liveConfirmCampaign?.recipientType === "SELECTED_USERS"
                      ? "Selected Registered Users"
                      : `All Registered Users (${liveConfirmCampaign?.targetAudience || "ALL"})`}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-neutral-400">Total Recipients:</span>{" "}
                  <strong className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold">
                    {liveConfirmCampaign?.totalRecipients} recipients
                  </strong>
                </div>

                {/* Show custom recipient preview if applicable */}
                {liveConfirmCampaign?.customEmails && (() => {
                  try {
                    const emails = JSON.parse(liveConfirmCampaign.customEmails) as string[];
                    return (
                      <div className="pt-1 border-t border-slate-100 dark:border-neutral-800">
                        <span className="text-slate-400 block mb-1">Recipient Preview:</span>
                        <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                          {emails.slice(0, 5).map((em, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 font-mono text-[10px]"
                            >
                              {em}
                            </span>
                          ))}
                          {emails.length > 5 && (
                            <span className="text-[10px] text-slate-400 self-center">
                              +{emails.length - 5} more
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  } catch {
                    return null;
                  }
                })()}
              </div>

              <p className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">
                Live delivery sends real emails through Resend API. This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-neutral-800">
            <Button
              variant="outline"
              onClick={() => setLiveConfirmCampaign(null)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              disabled={sendingLive}
              onClick={handleSendLive}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {sendingLive ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm & Send"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Suppressions Management Modal */}
      <Modal
        isOpen={isSuppressionsOpen}
        onClose={() => setIsSuppressionsOpen(false)}
        title="Email Suppression List"
        description="Manage emails that will be automatically excluded from all marketing broadcasts."
        maxWidth="lg"
      >
        <div className="space-y-4 text-sm">
          <form onSubmit={handleAddSuppression} className="flex gap-2">
            <input
              type="email"
              required
              value={newSuppressionEmail}
              onChange={(e) => setNewSuppressionEmail(e.target.value)}
              placeholder="user@example.com"
              className="flex-1 px-3.5 py-2 text-sm bg-white dark:bg-[#161618] border border-slate-200 dark:border-neutral-800 rounded-xl text-slate-900 dark:text-white focus:outline-none"
            />
            <Button type="submit" size="sm">
              Add Email
            </Button>
          </form>

          <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-neutral-800 border border-slate-200 dark:border-neutral-800 rounded-xl">
            {suppressionsList.length === 0 ? (
              <p className="p-4 text-center text-xs text-slate-400">
                No suppressed email addresses.
              </p>
            ) : (
              suppressionsList.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-3 text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {s.email}
                    </span>
                    <span className="text-slate-400 block text-[11px]">
                      Reason: {s.reason}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveSuppression(s.email)}
                    className="text-slate-400 hover:text-red-500 p-1"
                    title="Remove from suppression list"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>

      {/* DNS & API Setup Guide Modal */}
      <Modal
        isOpen={isSetupGuideOpen}
        onClose={() => setIsSetupGuideOpen(false)}
        title="Live Email Gateway (Resend) Setup Guide"
        description="Follow these steps to activate production transactional email broadcasts for Tralance."
        maxWidth="2xl"
      >
        <div className="space-y-4 text-xs text-slate-700 dark:text-neutral-300">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
              1. Add Server Environment Variables
            </h4>
            <p className="text-slate-500 dark:text-neutral-400">
              In your server environment (<code className="font-mono text-[11px] bg-slate-200 dark:bg-neutral-800 px-1 py-0.5 rounded">.env</code> on host or Vercel Environment Variables):
            </p>
            <pre className="p-2.5 rounded-lg bg-slate-950 text-slate-100 font-mono text-[11px] overflow-x-auto">
{`RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
RESEND_FROM_EMAIL="updates@tralance.pro"
RESEND_FROM_NAME="Tralance Team"
RESEND_WEBHOOK_SECRET="whsec_xxxxxxxx" # Optional for webhook signature verification`}
            </pre>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
              2. Domain DNS Records (tralance.pro)
            </h4>
            <p className="text-slate-500 dark:text-neutral-400">
              In your domain DNS registrar (Cloudflare / Namecheap / Route 53):
            </p>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="p-2 rounded bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
                <span className="font-bold text-blue-600 dark:text-blue-400">TXT (SPF): </span>
                <code>v=spf1 include:resend.com ~all</code>
              </div>
              <div className="p-2 rounded bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
                <span className="font-bold text-blue-600 dark:text-blue-400">CNAME (DKIM): </span>
                <code>resend._domainkey.tralance.pro → dkim.resend.com</code>
              </div>
              <div className="p-2 rounded bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800">
                <span className="font-bold text-blue-600 dark:text-blue-400">TXT (DMARC): </span>
                <code>_dmarc.tralance.pro → v=DMARC1; p=none;</code>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 space-y-2">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
              3. Configure Resend Webhook
            </h4>
            <p className="text-slate-500 dark:text-neutral-400">
              In Resend Dashboard &gt; Webhooks, point to your admin webhook endpoint:
            </p>
            <code className="block p-2 rounded bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 font-mono text-[11px] text-blue-600 dark:text-blue-400">
              https://tralance-admin-six.vercel.app/api/webhooks/resend
            </code>
            <p className="text-[11px] text-slate-400">
              Events to listen for: <strong>email.delivered, email.bounced, email.complained</strong>. Bounces and spam complaints are automatically added to the suppression list.
            </p>
          </div>

          <div className="flex justify-end pt-2">
            <Button size="sm" onClick={() => setIsSetupGuideOpen(false)}>
              Got it
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
