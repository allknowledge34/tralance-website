"use client";

import * as React from "react";
import {
  Shield,
  Mail,
  CreditCard,
  Database,
  CheckCircle2,
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 bg-[#FFFDF5] dark:bg-[#18181B] border-2 border-[#171717] dark:border-[#383838] shadow-[4px_4px_0px_0px_#171717] dark:shadow-[4px_4px_0px_0px_#000000]">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-[#171717] dark:text-[#FFFDF5]">
            System Settings & Integrations
          </h1>
          <p className="text-sm font-medium text-subtle mt-0.5">
            Overview of server configurations, external integrations, payment gateways, and security credentials.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b-2 border-[#171717] dark:border-[#383838] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center bg-[#35B9F5] border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] shrink-0 text-[#171717]">
                <Shield className="w-4 h-4" />
              </div>
              <CardTitle className="text-base font-black uppercase tracking-wide">Admin Session & Access</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-xs pt-4 font-medium">
            <div className="flex justify-between items-center py-2 border-b-2 border-[#171717] dark:border-[#383838]">
              <span className="text-subtle font-bold uppercase tracking-wider">Authorized Email:</span>
              <span className="font-bold text-[#171717] dark:text-[#FFFDF5]">{adminEmail}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b-2 border-[#171717] dark:border-[#383838]">
              <span className="text-subtle font-bold uppercase tracking-wider">Role:</span>
              <Badge variant="pro">SUPER ADMIN</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b-2 border-[#171717] dark:border-[#383838]">
              <span className="text-subtle font-bold uppercase tracking-wider">Session Architecture:</span>
              <span className="font-mono font-bold text-[#171717] dark:text-[#FFFDF5]">HS256 Jose JWT (24h)</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-subtle font-bold uppercase tracking-wider">Security Middleware:</span>
              <span className="text-[#171717] dark:text-[#6EE7B7] flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-[#171717] dark:text-[#6EE7B7]" /> Enforced on All Routes
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b-2 border-[#171717] dark:border-[#383838] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center bg-[#6EE7B7] border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] shrink-0 text-[#171717]">
                <Database className="w-4 h-4" />
              </div>
              <CardTitle className="text-base font-black uppercase tracking-wide">Neon PostgreSQL Database</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-xs pt-4 font-medium">
            <div className="flex justify-between items-center py-2 border-b-2 border-[#171717] dark:border-[#383838]">
              <span className="text-subtle font-bold uppercase tracking-wider">Host Engine:</span>
              <span className="font-bold text-[#171717] dark:text-[#FFFDF5]">Neon Serverless Postgres</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b-2 border-[#171717] dark:border-[#383838]">
              <span className="text-subtle font-bold uppercase tracking-wider">Region:</span>
              <span className="font-mono font-bold text-[#171717] dark:text-[#FFFDF5]">ap-southeast-1 (AWS)</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b-2 border-[#171717] dark:border-[#383838]">
              <span className="text-subtle font-bold uppercase tracking-wider">Connection Mode:</span>
              <span className="text-[#171717] dark:text-[#6EE7B7] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#171717] dark:text-[#6EE7B7]" /> Pooler + Direct URL SSL
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-subtle font-bold uppercase tracking-wider">Schema Sync Status:</span>
              <Badge variant="success">IN SYNC (Zero Data Loss)</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b-2 border-[#171717] dark:border-[#383838] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center bg-[#C4B5FD] border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] shrink-0 text-[#171717]">
                <CreditCard className="w-4 h-4" />
              </div>
              <CardTitle className="text-base font-black uppercase tracking-wide">Cashfree Payment Gateway</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-xs pt-4 font-medium">
            <div className="flex justify-between items-center py-2 border-b-2 border-[#171717] dark:border-[#383838]">
              <span className="text-subtle font-bold uppercase tracking-wider">Environment:</span>
              <Badge variant="success">PRODUCTION</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b-2 border-[#171717] dark:border-[#383838]">
              <span className="text-subtle font-bold uppercase tracking-wider">API Version:</span>
              <span className="font-mono font-bold text-[#171717] dark:text-[#FFFDF5]">2025-01-01</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b-2 border-[#171717] dark:border-[#383838]">
              <span className="text-subtle font-bold uppercase tracking-wider">App ID:</span>
              <span className="font-mono font-bold text-[#171717] dark:text-[#FFFDF5]">14585324...8541</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-subtle font-bold uppercase tracking-wider">Webhook URL:</span>
              <span className="font-mono font-bold text-[11px] text-[#35B9F5] truncate max-w-[200px]">
                https://www.tralance.pro/api/webhooks/cashfree
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b-2 border-[#171717] dark:border-[#383838] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 flex items-center justify-center bg-[#FFE52E] border-2 border-[#171717] shadow-[2px_2px_0px_0px_#171717] shrink-0 text-[#171717]">
                <Mail className="w-4 h-4" />
              </div>
              <CardTitle className="text-base font-black uppercase tracking-wide">Email Campaign Provider</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 text-xs pt-4 font-medium">
            <div className="flex justify-between items-center py-2 border-b-2 border-[#171717] dark:border-[#383838]">
              <span className="text-subtle font-bold uppercase tracking-wider">Active Engine:</span>
              <span className="font-black text-[#171717] dark:text-[#FFFDF5] uppercase">
                {emailProvider.provider}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b-2 border-[#171717] dark:border-[#383838]">
              <span className="text-subtle font-bold uppercase tracking-wider">Configured Sender:</span>
              <span className="font-mono font-bold text-[#171717] dark:text-[#FFFDF5]">{emailProvider.senderEmail}</span>
            </div>
            <div className="py-2">
              <p className="text-subtle font-bold uppercase tracking-wider mb-1.5">Provider Integration Status:</p>
              <p className="p-3 bg-white dark:bg-[#27272A] text-[#171717] dark:text-[#FFFDF5] border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] text-xs font-medium">
                {emailProvider.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
