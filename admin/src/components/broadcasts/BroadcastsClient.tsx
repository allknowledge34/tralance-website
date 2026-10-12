"use client";

import * as React from "react";
import {
  Mail,
  Plus,
  Send,
  AlertTriangle,
  CheckCircle2,
  Users,
  Loader2,
  Trash2,
  Info,
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
  getRegisteredUsersForSelection,
} from "@/lib/actions/broadcasts";
import {
  parseAndValidateCustomEmails,
  type BroadcastRecipientType,
} from "@/lib/utils/email-validation";
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

type CampaignItem = Awaited<ReturnType<typeof getCampaigns>>["campaigns"][number];
type ProviderStatusType = Awaited<ReturnType<typeof getCampaigns>>["providerStatus"];
type RegisteredUserItem = Awaited<ReturnType<typeof getRegisteredUsersForSelection>>[number];
type SuppressionItem = Awaited<ReturnType<typeof getEmailSuppressions>>[number];

export function BroadcastsClient() {
  const [campaigns, setCampaigns] = React.useState<CampaignItem[]>([]);
  const [providerStatus, setProviderStatus] = React.useState<ProviderStatusType | null>(null);
  const [suppressionsCount, setSuppressionsCount] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  const [isCreateOpen, setIsCreateOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [senderName, setSenderName] = React.useState("Tralance Team");
  const [senderEmail, setSenderEmail] = React.useState("noreply@tralance.pro");
  const [previewText, setPreviewText] = React.useState("");
  const [htmlContent, setHtmlContent] = React.useState(defaultTemplate);
  const [recipientType, setRecipientType] = React.useState<BroadcastRecipientType>("ALL_REGISTERED");
  const [customEmailsInput, setCustomEmailsInput] = React.useState("");
  const [registeredUsers, setRegisteredUsers] = React.useState<RegisteredUserItem[]>([]);
  const [userSearchQuery, setUserSearchQuery] = React.useState("");
  const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);
  const [loadingUsers, setLoadingUsers] = React.useState(false);
  const [registeredAudienceCount, setRegisteredAudienceCount] = React.useState(0);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  const [showDiscardConfirm, setShowDiscardConfirm] = React.useState(false);

  const [testModalCampaign, setTestModalCampaign] = React.useState<CampaignItem | null>(null);
  const [testEmailAddress, setTestEmailAddress] = React.useState("");
  const [sendingTest, setSendingTest] = React.useState(false);
  const [testResult, setTestResult] = React.useState<string | null>(null);

  const [liveConfirmCampaign, setLiveConfirmCampaign] = React.useState<CampaignItem | null>(null);
  const [sendingLive, setSendingLive] = React.useState(false);

  const [isSuppressionsOpen, setIsSuppressionsOpen] = React.useState(false);
  const [suppressionsList, setSuppressionsList] = React.useState<SuppressionItem[]>([]);
  const [newSuppressionEmail, setNewSuppressionEmail] = React.useState("");

  const [isSetupGuideOpen, setIsSetupGuideOpen] = React.useState(false);

  const refreshData = React.useCallback(async () => {
    try {
      const res = await getCampaigns();
      setCampaigns(res.campaigns);
      setProviderStatus(res.providerStatus);
      setSuppressionsCount(res.suppressionsCount);
    } catch (err) {
      console.error(err);
    }
  }, []);

  React.useEffect(() => {
    let ignore = false;
    getCampaigns()
      .then((res) => {
        if (!ignore) {
          setCampaigns(res.campaigns);
          setProviderStatus(res.providerStatus);
          setSuppressionsCount(res.suppressionsCount);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (!ignore) {
          setLoading(false);
        }
      });
    return () => {
      ignore = true;
    };
  }, []);

  const customValidation = React.useMemo(() => {
    if (recipientType !== "CUSTOM") {
      return { validEmails: [], invalidEmails: [], duplicateCount: 0, totalParsed: 0 };
    }
    return parseAndValidateCustomEmails(customEmailsInput);
  }, [recipientType, customEmailsInput]);

  React.useEffect(() => {
    if (!isCreateOpen || recipientType !== "SELECTED_USERS" || registeredUsers.length > 0) return;

    let ignore = false;
    getRegisteredUsersForSelection()
      .then((users) => {
        if (!ignore) {
          setRegisteredUsers(users);
          setLoadingUsers(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load registered users:", err);
        if (!ignore) {
          setLoadingUsers(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [isCreateOpen, recipientType, registeredUsers.length]);

  const filteredRegisteredUsers = React.useMemo(() => {
    if (!userSearchQuery.trim()) return registeredUsers;
    const q = userSearchQuery.toLowerCase();
    return registeredUsers.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [registeredUsers, userSearchQuery]);

  const estimatedRecipients = React.useMemo(() => {
    if (recipientType === "CUSTOM") return customValidation.validEmails.length;
    if (recipientType === "SELECTED_USERS") return selectedUserIds.length;
    return registeredAudienceCount;
  }, [recipientType, customValidation.validEmails.length, selectedUserIds.length, registeredAudienceCount]);

  React.useEffect(() => {
    if (!isCreateOpen) return;
    if (recipientType === "CUSTOM" || recipientType === "SELECTED_USERS") return;

    let aud: NotificationAudience = NotificationAudience.ALL;
    if (recipientType === "PRO_REGISTERED") aud = NotificationAudience.PRO;
    else if (recipientType === "FREE_REGISTERED") aud = NotificationAudience.FREE;

    let ignore = false;
    getEligibleRecipientCount(aud)
      .then((count) => {
        if (!ignore) setRegisteredAudienceCount(count);
      })
      .catch(() => {
        if (!ignore) setRegisteredAudienceCount(0);
      });

    return () => {
      ignore = true;
    };
  }, [isCreateOpen, recipientType]);

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
      refreshData();
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
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setTestResult(`Error: ${msg}`);
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
      refreshData();
    } catch (err: unknown) {
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
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b-2 border-[#171717] dark:border-[#383838]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#171717] dark:text-white">
            Email Broadcasts
          </h1>
          <p className="text-sm font-medium text-[#525252] dark:text-[#A3A3A3] mt-1">
            Deliver announcement campaigns to registered users with live preview, emoji & image support, and safety suppression lists.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={openSuppressionsModal} className="gap-1.5">
            <Ban className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Suppression List ({suppressionsCount})</span>
          </Button>
          <Button onClick={() => setIsCreateOpen(true)} size="sm" className="gap-2">
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Create Campaign</span>
          </Button>
        </div>
      </div>

      {providerStatus && (
        <div className={`p-4 rounded-md border-2 border-[#171717] dark:border-[#383838] shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000] transition-all ${
          providerStatus.configured
            ? "bg-[#6EE7B7] text-[#171717]"
            : "bg-[#FFF9D2] dark:bg-[#1C1C20] text-[#171717] dark:text-[#E5E5E5]"
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-md border-2 border-[#171717] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#171717] ${
                providerStatus.configured
                  ? "bg-[#6EE7B7] text-[#171717]"
                  : "bg-[#FFE52E] text-[#171717]"
              }`}>
                {providerStatus.configured ? <CheckCircle2 className="w-5 h-5 stroke-[2.5]" /> : <AlertTriangle className="w-5 h-5 stroke-[2.5]" />}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-sm text-[#171717] dark:text-white">
                    Delivery Gateway: {providerStatus.provider.toUpperCase()}
                  </span>
                  <Badge variant={providerStatus.configured ? "success" : "warning"}>
                    {providerStatus.configured ? "Production Connected" : "SIMULATED MODE (TESTING ONLY)"}
                  </Badge>
                </div>
                <p className="text-xs font-medium text-[#171717] dark:text-[#A3A3A3] mt-1">
                  {providerStatus.configured
                    ? `${providerStatus.description} • Verified sender: ${providerStatus.senderEmail}`
                    : "No external email API key configured in .env. Dispatches are safely logged to the database and audit trail without dispatching real emails to customer inboxes."}
                </p>

                {providerStatus.missingRequirements && providerStatus.missingRequirements.length > 0 && (
                  <div className="mt-2.5 pt-2.5 border-t-2 border-[#171717]/20 dark:border-[#383838] text-xs space-y-1">
                    <p className="font-bold flex items-center gap-1.5 text-[#171717] dark:text-[#FFE52E]">
                      <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                      Required setup to activate live sending:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-[11px] font-semibold text-[#171717] dark:text-[#E5E5E5]">
                      {providerStatus.missingRequirements.map((req: string, idx: number) => (
                        <li key={idx}>
                          <code className="bg-[#FFE52E] dark:bg-[#27272A] border border-[#171717] px-1 py-0.5 rounded font-mono text-[#171717] dark:text-white">
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
              className="text-xs gap-1.5 shrink-0"
            >
              <Info className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>DNS & API Setup Guide</span>
            </Button>
          </div>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Campaign History</CardTitle>
            <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] mt-0.5">
              Drafts, test dispatches, and sent campaign records
            </p>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-[#171717] dark:text-white" />
            </div>
          ) : campaigns.length === 0 ? (
            <div className="py-16 text-center text-xs font-medium text-[#525252] dark:text-[#A3A3A3] space-y-2">
              <Mail className="w-8 h-8 mx-auto text-[#525252] dark:text-[#A3A3A3]" />
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
                        <p className="font-bold text-[#171717] dark:text-white truncate">
                          {c.name}
                        </p>
                        <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3] truncate mt-0.5">
                          Subject: {c.subject}
                        </p>
                        <span className="text-[11px] font-semibold text-[#525252] dark:text-[#A3A3A3] block mt-0.5">
                          From: {c.senderName} ({c.senderEmail})
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      {c.recipientType === "CUSTOM" ? (
                        <Badge variant="warning" className="text-[11px] gap-1">
                          <Mail className="w-3 h-3 stroke-[2.5]" /> Custom ({c.totalRecipients})
                        </Badge>
                      ) : c.recipientType === "SELECTED_USERS" ? (
                        <Badge variant="secondary" className="text-[11px] gap-1">
                          <Users className="w-3 h-3 stroke-[2.5]" /> Selected ({c.totalRecipients})
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
                      <div className="text-xs font-bold font-mono">
                        <span className="text-[#171717] dark:text-white">
                          {c.sentCount}
                        </span>
                        <span className="text-[#525252] dark:text-[#A3A3A3]"> / {c.totalRecipients}</span>
                        {c.failedCount > 0 && (
                          <span className="text-[#FF6B6B] block text-[11px]">
                            {c.failedCount} failed
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="text-xs font-semibold text-[#525252] dark:text-[#A3A3A3] whitespace-nowrap">
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
                          <Send className="w-3 h-3 stroke-[2.5]" />
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

      <Modal
        isOpen={isCreateOpen}
        onClose={handleModalClose}
        title="Create Email Broadcast Campaign"
        description="Design clean HTML marketing or announcement emails with responsive preview, emoji & image insertion, and audience targeting."
        maxWidth="5xl"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
                Campaign Internal Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. October Feature Update"
                className="w-full px-3.5 py-2 text-sm font-medium bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#FFE52E] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
                Recipient Type <span className="text-[#FF6B6B]">*</span>
              </label>
              <select
                value={recipientType}
                onChange={(e) => {
                  const nextType = e.target.value as BroadcastRecipientType;
                  setRecipientType(nextType);
                  setFormError(null);
                  if (nextType === "SELECTED_USERS" && registeredUsers.length === 0) {
                    setLoadingUsers(true);
                  }
                }}
                className="w-full px-3.5 py-2 text-sm font-bold bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white focus:outline-none shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
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

          {formError && (
            <div className="p-3 rounded-md bg-[#FF6B6B] border-2 border-[#171717] text-[#171717] text-xs font-bold shadow-[2px_2px_0px_0px_#171717] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 stroke-[2.5]" />
              <span>{formError}</span>
            </div>
          )}

          {recipientType === "CUSTOM" && (
            <div className="space-y-2 p-4 rounded-md bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[3px_3px_0px_0px_#171717] dark:shadow-[3px_3px_0px_0px_#000000] animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 stroke-[2.5]" />
                  Custom Recipient Email Addresses <span className="text-[#FF6B6B]">*</span>
                </label>
                <span className="text-[11px] font-bold text-[#525252] dark:text-[#A3A3A3]">
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
                className="w-full px-3.5 py-2.5 text-xs font-mono font-medium bg-[#FFFDF5] dark:bg-[#121214] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-neutral-100 placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#FFE52E] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
              />

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded border-2 border-[#171717] font-bold text-[11px] shadow-[1px_1px_0px_0px_#171717] ${
                      customValidation.validEmails.length > 0
                        ? "bg-[#6EE7B7] text-[#171717]"
                        : "bg-[#E5E7EB] text-[#525252]"
                    }`}
                  >
                    <Check className="w-3 h-3 stroke-[2.5]" />
                    {customValidation.validEmails.length} valid recipient
                    {customValidation.validEmails.length === 1 ? "" : "s"}
                  </span>

                  {customValidation.duplicateCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded border-2 border-[#171717] font-bold text-[11px] shadow-[1px_1px_0px_0px_#171717] bg-[#FFE52E] text-[#171717]">
                      <Info className="w-3 h-3 stroke-[2.5]" />
                      {customValidation.duplicateCount} duplicate
                      {customValidation.duplicateCount === 1 ? "" : "s"} merged
                    </span>
                  )}
                </div>

                <span className="text-[11px] font-bold text-[#525252] dark:text-[#A3A3A3]">
                  Max limit: 2,000 recipients
                </span>
              </div>

              {customValidation.invalidEmails.length > 0 && (
                <div className="p-3 rounded-md bg-[#FF6B6B] border-2 border-[#171717] text-[#171717] text-xs space-y-1 shadow-[2px_2px_0px_0px_#171717]">
                  <div className="flex items-center gap-1.5 font-black">
                    <AlertTriangle className="w-4 h-4 shrink-0 stroke-[2.5]" />
                    Invalid Email Address
                    {customValidation.invalidEmails.length === 1 ? "" : "es"} Detected (
                    {customValidation.invalidEmails.length})
                  </div>
                  <p className="text-[11px] font-bold">
                    The following entries do not match valid email address format and must be corrected before saving:
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1 max-h-24 overflow-y-auto">
                    {customValidation.invalidEmails.map((inv, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-white text-[#171717] border border-[#171717] rounded font-mono text-[11px] font-bold shadow-[1px_1px_0px_0px_#171717]"
                      >
                        {inv}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {recipientType === "SELECTED_USERS" && (
            <div className="space-y-3 p-4 rounded-md bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[3px_3px_0px_0px_#171717] dark:shadow-[3px_3px_0px_0px_#000000] animate-in fade-in duration-150">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 stroke-[2.5]" />
                  Select Registered Users ({selectedUserIds.length} selected)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const filteredIds = filteredRegisteredUsers.map((u) => u.id);
                      setSelectedUserIds(Array.from(new Set([...selectedUserIds, ...filteredIds])));
                    }}
                    className="text-[11px] font-bold text-[#171717] dark:text-[#35B9F5] hover:underline cursor-pointer"
                  >
                    Select All Filtered
                  </button>
                  <span className="text-[#171717] dark:text-[#383838]">•</span>
                  <button
                    type="button"
                    onClick={() => setSelectedUserIds([])}
                    className="text-[11px] font-bold text-[#525252] dark:text-[#A3A3A3] hover:underline cursor-pointer"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search registered users by name or email..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="w-full px-3 py-1.5 pl-8 text-xs font-medium bg-[#FFFDF5] dark:bg-[#121214] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white placeholder:text-[#A3A3A3] focus:outline-none shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
                />
                <Search className="w-3.5 h-3.5 text-[#171717] dark:text-[#A3A3A3] absolute left-2.5 top-2.5 stroke-[2.5]" />
              </div>

              <div className="max-h-48 overflow-y-auto divide-y-2 divide-[#171717]/10 dark:divide-[#383838] border-2 border-[#171717] dark:border-[#383838] rounded-md bg-[#FFFDF5] dark:bg-[#141416]">
                {loadingUsers ? (
                  <div className="py-6 flex items-center justify-center text-xs font-bold text-[#525252] dark:text-[#A3A3A3] gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading registered users...
                  </div>
                ) : filteredRegisteredUsers.length === 0 ? (
                  <div className="py-6 text-center text-xs font-bold text-[#525252] dark:text-[#A3A3A3]">
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
                            ? "bg-[#FFE52E]/30 dark:bg-[#28282E]"
                            : "hover:bg-[#FFE52E]/10 dark:hover:bg-[#1C1C20]"
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
                            className="rounded border-2 border-[#171717] text-[#171717] focus:ring-0 cursor-pointer"
                          />
                          <div className="text-xs">
                            <span className="font-bold text-[#171717] dark:text-white">
                              {u.name}
                            </span>
                            <span className="text-[#525252] dark:text-[#A3A3A3] ml-2 font-mono text-[11px]">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5]">
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
                className="w-full px-3.5 py-2 text-sm font-medium bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFE52E] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5]">
                  Preheader / Preview Text
                </label>
                <EmojiPicker onSelect={(emoji) => setPreviewText((prev) => prev + ` ${emoji} `)} />
              </div>
              <input
                type="text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                placeholder="Short summary displayed in the email inbox list..."
                className="w-full px-3.5 py-2 text-sm font-medium bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#FFE52E] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
                Sender Name
              </label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3.5 py-2 text-sm font-medium bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white focus:outline-none shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
                Sender Address
              </label>
              <input
                type="email"
                required
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-sm font-medium bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white focus:outline-none shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000]"
              />
            </div>
          </div>

          <EmailComposer
            initialHtml={htmlContent}
            onChange={setHtmlContent}
            defaultTemplate={defaultTemplate}
          />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t-2 border-[#171717] dark:border-[#383838]">
            <span className="text-xs font-bold text-[#525252] dark:text-[#A3A3A3]">
              Audience Estimate: <strong className="text-[#171717] dark:text-white">{estimatedRecipients} recipients</strong>
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

      {showDiscardConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 dark:bg-black/80 animate-in fade-in duration-150">
          <div className="bg-[#FFFDF5] dark:bg-[#18181B] rounded-lg p-6 max-w-sm w-full border-2 border-[#171717] dark:border-[#383838] shadow-[8px_8px_0px_0px_#171717] dark:shadow-[8px_8px_0px_0px_#000000] space-y-3 text-sm">
            <h3 className="text-base font-extrabold text-[#171717] dark:text-white">
              Discard Unsaved Changes?
            </h3>
            <p className="text-xs font-medium text-[#525252] dark:text-[#A3A3A3]">
              You have unsaved changes in this campaign draft. If you close now, your progress will be discarded.
            </p>
            <div className="flex justify-end gap-2 pt-3 border-t-2 border-[#171717] dark:border-[#383838]">
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

      <Modal
        isOpen={!!testModalCampaign}
        onClose={() => setTestModalCampaign(null)}
        title="Send Test Broadcast"
        description="Verify how the email renders in your personal inbox before broadcasting to real users."
        maxWidth="md"
      >
        <form onSubmit={handleSendTest} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#E5E5E5] mb-1">
              Test Recipient Email Address
            </label>
            <input
              type="email"
              required
              value={testEmailAddress}
              onChange={(e) => setTestEmailAddress(e.target.value)}
              placeholder="yourname@gmail.com"
              className="w-full px-3.5 py-2 text-sm font-medium bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white focus:outline-none shadow-[2px_2px_0px_0px_#171717]"
            />
          </div>

          {testResult && (
            <div className={`p-3 rounded-md text-xs font-bold border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] flex items-center gap-2 ${
              testResult.includes("success")
                ? "bg-[#6EE7B7] text-[#171717]"
                : "bg-[#FF6B6B] text-[#171717]"
            }`}>
              <Info className="w-4 h-4 shrink-0 stroke-[2.5]" />
              <span>{testResult}</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4 border-t-2 border-[#171717] dark:border-[#383838]">
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

      <Modal
        isOpen={!!liveConfirmCampaign}
        onClose={() => setLiveConfirmCampaign(null)}
        title="Confirm Live Broadcast Dispatch"
        description="Verify audience parameters before triggering real delivery."
        maxWidth="md"
      >
        <div className="space-y-4 text-sm font-medium">
          <div className="p-4 rounded-md bg-[#FFF9D2] dark:bg-[#202024] border-2 border-[#171717] dark:border-[#383838] shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#171717] dark:text-[#FFE52E] shrink-0 mt-0.5 stroke-[2.5]" />
            <div className="text-xs text-[#171717] dark:text-[#E5E5E5] space-y-2 w-full">
              <p className="font-extrabold text-sm">Safety Verification Required</p>
              <p>
                You are about to launch a real email broadcast for campaign:
                <br />
                <strong className="text-[#171717] dark:text-white text-xs">
                  &quot;{liveConfirmCampaign?.name}&quot;
                </strong>
              </p>

              <div className="p-3 bg-[#FFFDF5] dark:bg-[#18181B] rounded border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] space-y-1.5 text-[11px] font-sans">
                <div>
                  <span className="text-[#525252] dark:text-[#A3A3A3] font-bold">Subject:</span>{" "}
                  <strong className="text-[#171717] dark:text-white font-extrabold">
                    {liveConfirmCampaign?.subject}
                  </strong>
                </div>
                <div>
                  <span className="text-[#525252] dark:text-[#A3A3A3] font-bold">From:</span>{" "}
                  <span className="font-mono font-bold text-[#171717] dark:text-white">
                    {liveConfirmCampaign?.senderName} &lt;{liveConfirmCampaign?.senderEmail}&gt;
                  </span>
                </div>
                <div>
                  <span className="text-[#525252] dark:text-[#A3A3A3] font-bold">Target Group:</span>{" "}
                  <strong className="text-[#171717] dark:text-white">
                    {liveConfirmCampaign?.recipientType === "CUSTOM"
                      ? "Custom Email Addresses (Manual Entry)"
                      : liveConfirmCampaign?.recipientType === "SELECTED_USERS"
                      ? "Selected Registered Users"
                      : `All Registered Users (${liveConfirmCampaign?.targetAudience || "ALL"})`}
                  </strong>
                </div>
                <div>
                  <span className="text-[#525252] dark:text-[#A3A3A3] font-bold">Total Recipients:</span>{" "}
                  <strong className="text-[#171717] dark:text-[#6EE7B7] text-xs font-black">
                    {liveConfirmCampaign?.totalRecipients} recipients
                  </strong>
                </div>

                {liveConfirmCampaign?.customEmails && (() => {
                  try {
                    const emails = JSON.parse(liveConfirmCampaign.customEmails) as string[];
                    return (
                      <div className="pt-1 border-t-2 border-[#171717]/10 dark:border-[#383838]">
                        <span className="text-[#525252] dark:text-[#A3A3A3] font-bold block mb-1">Recipient Preview:</span>
                        <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                          {emails.slice(0, 5).map((em, i) => (
                            <span
                              key={i}
                              className="px-1.5 py-0.5 rounded border border-[#171717] bg-[#FFE52E] text-[#171717] font-mono font-bold text-[10px]"
                            >
                              {em}
                            </span>
                          ))}
                          {emails.length > 5 && (
                            <span className="text-[10px] font-bold text-[#525252] dark:text-[#A3A3A3] self-center">
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

              <p className="text-[11px] font-black text-[#171717] dark:text-[#FFE52E]">
                Live delivery sends real emails through Resend API. This action cannot be undone.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t-2 border-[#171717] dark:border-[#383838]">
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
              className="bg-[#FFE52E] text-[#171717]"
            >
              {sendingLive ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm & Send"}
            </Button>
          </div>
        </div>
      </Modal>

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
              className="flex-1 px-3.5 py-2 text-sm font-medium bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] rounded-md text-[#171717] dark:text-white focus:outline-none shadow-[2px_2px_0px_0px_#171717]"
            />
            <Button type="submit" size="sm">
              Add Email
            </Button>
          </form>

          <div className="max-h-60 overflow-y-auto divide-y-2 divide-[#171717]/10 dark:divide-[#383838] border-2 border-[#171717] dark:border-[#383838] rounded-md bg-[#FFFDF5] dark:bg-[#18181B]">
            {suppressionsList.length === 0 ? (
              <p className="p-4 text-center text-xs font-semibold text-[#525252] dark:text-[#A3A3A3]">
                No suppressed email addresses.
              </p>
            ) : (
              suppressionsList.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-3 text-xs"
                >
                  <div>
                    <span className="font-bold text-[#171717] dark:text-white">
                      {s.email}
                    </span>
                    <span className="text-[#525252] dark:text-[#A3A3A3] block text-[11px] font-medium">
                      Reason: {s.reason}
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveSuppression(s.email)}
                    className="text-[#525252] hover:text-[#FF6B6B] p-1 cursor-pointer"
                    title="Remove from suppression list"
                  >
                    <Trash2 className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isSetupGuideOpen}
        onClose={() => setIsSetupGuideOpen(false)}
        title="Live Email Gateway (Resend) Setup Guide"
        description="Follow these steps to activate production transactional email broadcasts for Tralance."
        maxWidth="2xl"
      >
        <div className="space-y-4 text-xs font-medium text-[#171717] dark:text-[#E5E5E5]">
          <div className="p-3 rounded-md bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[3px_3px_0px_0px_#171717] space-y-2">
            <h4 className="font-black text-[#171717] dark:text-white text-sm">
              1. Add Server Environment Variables
            </h4>
            <p className="text-[#525252] dark:text-[#A3A3A3]">
              In your server environment (<code className="font-mono text-[11px] bg-[#FFE52E] dark:bg-[#27272A] border border-[#171717] px-1 py-0.5 rounded text-[#171717] dark:text-white">.env</code> on host or Vercel Environment Variables):
            </p>
            <pre className="p-2.5 rounded-md bg-[#171717] text-[#FFE52E] border-2 border-[#171717] font-mono text-[11px] overflow-x-auto">
{`RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxx"
RESEND_FROM_EMAIL="updates@tralance.pro"
RESEND_FROM_NAME="Tralance Team"
RESEND_WEBHOOK_SECRET="whsec_xxxxxxxx"`}
            </pre>
          </div>

          <div className="p-3 rounded-md bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[3px_3px_0px_0px_#171717] space-y-2">
            <h4 className="font-black text-[#171717] dark:text-white text-sm">
              2. Domain DNS Records (tralance.pro)
            </h4>
            <p className="text-[#525252] dark:text-[#A3A3A3]">
              In your domain DNS registrar (Cloudflare / Namecheap / Route 53):
            </p>
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="p-2 rounded border-2 border-[#171717] dark:border-[#383838] bg-[#FFF9D2] dark:bg-[#141416]">
                <span className="font-bold text-[#171717] dark:text-[#35B9F5]">TXT (SPF): </span>
                <code>v=spf1 include:resend.com ~all</code>
              </div>
              <div className="p-2 rounded border-2 border-[#171717] dark:border-[#383838] bg-[#FFF9D2] dark:bg-[#141416]">
                <span className="font-bold text-[#171717] dark:text-[#35B9F5]">CNAME (DKIM): </span>
                <code>resend._domainkey.tralance.pro → dkim.resend.com</code>
              </div>
              <div className="p-2 rounded border-2 border-[#171717] dark:border-[#383838] bg-[#FFF9D2] dark:bg-[#141416]">
                <span className="font-bold text-[#171717] dark:text-[#35B9F5]">TXT (DMARC): </span>
                <code>_dmarc.tralance.pro → v=DMARC1; p=none;</code>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-md bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[3px_3px_0px_0px_#171717] space-y-2">
            <h4 className="font-black text-[#171717] dark:text-white text-sm">
              3. Configure Resend Webhook
            </h4>
            <p className="text-[#525252] dark:text-[#A3A3A3]">
              In Resend Dashboard &gt; Webhooks, point to your admin webhook endpoint:
            </p>
            <code className="block p-2 rounded border-2 border-[#171717] dark:border-[#383838] bg-[#FFF9D2] dark:bg-[#141416] font-mono text-[11px] text-[#171717] dark:text-[#35B9F5] font-bold">
              https://tralance-admin-six.vercel.app/api/webhooks/resend
            </code>
            <p className="text-[11px] text-[#525252] dark:text-[#A3A3A3]">
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
