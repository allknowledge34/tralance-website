"use client";

import * as React from "react";
import {
  Settings,
  Shield,
  Mail,
  CreditCard,
  Database,
  Cloud,
  CheckCircle2,
  AlertCircle,
  Key,
  Server,
  Lock,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SettingsProps {
  adminEmail: string;
  emailProvider: {
    configured: boolean;
    provider: string;
    senderEmail: string;
    description: string;
  };
}

export function SettingsClient({ adminEmail, emailProvider }: SettingsProps) {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            System Settings & Integrations
          </h1>
          <p className="text-sm text-slate-500 dark:text-neutral-400 mt-0.5">
            Overview of server configurations, external integrations, payment gateways, and security credentials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Administrator Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-base">Admin Session & Access</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500">Authorized Email:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{adminEmail}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500">Role:</span>
              <Badge variant="pro">SUPER ADMIN</Badge>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500">Session Architecture:</span>
              <span className="font-mono text-slate-800 dark:text-neutral-200">HS256 Jose JWT (24h)</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Security Middleware:</span>
              <span className="text-emerald-600 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Enforced on All Routes
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Database Configuration Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-600" />
              <CardTitle className="text-base">Neon PostgreSQL Database</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500">Host Engine:</span>
              <span className="font-semibold text-slate-900 dark:text-white">Neon Serverless Postgres</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500">Region:</span>
              <span className="font-mono text-slate-800 dark:text-neutral-200">ap-southeast-1 (AWS)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500">Connection Mode:</span>
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Pooler + Direct URL SSL
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Schema Sync Status:</span>
              <Badge variant="success">IN SYNC (Zero Data Loss)</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Cashfree Payment Gateway Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-indigo-600" />
              <CardTitle className="text-base">Cashfree Payment Gateway</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500">Environment:</span>
              <Badge variant="success">PRODUCTION</Badge>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500">API Version:</span>
              <span className="font-mono text-slate-900 dark:text-white">2025-01-01</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500">App ID:</span>
              <span className="font-mono text-slate-600 dark:text-neutral-300">14585324...8541</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Webhook URL:</span>
              <span className="font-mono text-[11px] text-blue-600 truncate max-w-[200px]">
                https://www.tralance.pro/api/webhooks/cashfree
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Email Delivery Provider Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-600" />
              <CardTitle className="text-base">Email Campaign Provider</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500">Active Engine:</span>
              <span className="font-semibold text-slate-900 dark:text-white uppercase">
                {emailProvider.provider}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100 dark:border-neutral-800">
              <span className="text-slate-500">Configured Sender:</span>
              <span className="font-mono text-slate-900 dark:text-white">{emailProvider.senderEmail}</span>
            </div>
            <div className="py-2">
              <p className="text-slate-500 mb-1">Provider Integration Status:</p>
              <p className="p-2.5 rounded-lg bg-slate-50 dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 border border-slate-200/60 dark:border-neutral-800 text-[11px]">
                {emailProvider.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
