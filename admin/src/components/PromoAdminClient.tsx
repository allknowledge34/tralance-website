"use client";

import { useState } from "react";
import { savePromoSettings } from "@/app/actions/promo";
import { Sparkles, Save, RotateCcw, Flame, Gift, Star, Zap, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  flame: Flame,
  sparkles: Sparkles,
  gift: Gift,
  star: Star,
  zap: Zap,
};

export default function PromoAdminClient({ initialSettings }: { initialSettings: any }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const defaultSettings = {
    isActive: false,
    text: "Try YTVoidMode — a cleaner YouTube experience for Chrome",
    btnText: "Try YTVoidMode",
    btnUrl: "https://chromewebstore.google.com/",
    icon: "flame",
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);
    try {
      if (!settings.text.trim()) {
        throw new Error("Promotional text cannot be empty.");
      }
      if (settings.btnUrl) {
        new URL(settings.btnUrl);
      }
      await savePromoSettings(settings);
      setFeedback({ type: "success", message: "Promo bar settings successfully saved and applied to live site!" });
    } catch (error: any) {
      setFeedback({ type: "error", message: error.message || "Failed to save promo bar settings." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    setFeedback(null);
  };

  const SelectedIcon = iconMap[settings.icon] || Flame;

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm animate-in slide-in-from-top-2 duration-200 ${
            feedback.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
              : "bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          )}
          <span className="font-medium">{feedback.message}</span>
        </div>
      )}

      {/* Live Preview Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base">Website Live Preview</CardTitle>
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              Interactive preview matching the exact header banner rendered on https://www.tralance.pro
            </p>
          </div>
          <Badge variant={settings.isActive ? "success" : "secondary"}>
            {settings.isActive ? "ACTIVE ON LIVE SITE" : "DISABLED"}
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t border-b border-slate-200 dark:border-neutral-800 overflow-hidden bg-slate-50 dark:bg-neutral-900/50">
            {settings.isActive ? (
              <div className="w-full bg-blue-50/90 dark:bg-[#060913]/90 backdrop-blur-xl border-b border-blue-200/50 dark:border-[rgba(255,255,255,0.04)] py-3 px-4 sm:px-8">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-center sm:text-left">
                    <SelectedIcon className="w-4 h-4 text-[#FF5A00] shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 tracking-wide">
                      {settings.text || "Your announcement text..."}
                    </span>
                  </div>
                  <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold text-white bg-[#0066FF] shadow-sm shrink-0">
                    {settings.btnText || "Learn More"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center text-xs text-slate-400 italic">
                Promo banner is currently disabled. Toggle &quot;Enable Promo Bar&quot; below to preview and activate.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Settings Form */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Announcement Settings</CardTitle>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                Configure promotional messaging, target URL, and banner icon
              </p>
            </div>

            {/* Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.isActive}
                onChange={(e) => setSettings({ ...settings, isActive: e.target.checked })}
              />
              <div className="w-12 h-6 bg-slate-200 dark:bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-0">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
              Promotional Announcement Text
            </label>
            <input
              type="text"
              required
              value={settings.text}
              onChange={(e) => setSettings({ ...settings, text: e.target.value })}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#161618] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="e.g. Try YTVoidMode - block distractions across your browser..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                Call-to-Action Button Label
              </label>
              <input
                type="text"
                required
                value={settings.btnText}
                onChange={(e) => setSettings({ ...settings, btnText: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#161618] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder="e.g. Try YTVoidMode"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                Button Destination URL
              </label>
              <input
                type="url"
                required
                value={settings.btnUrl}
                onChange={(e) => setSettings({ ...settings, btnUrl: e.target.value })}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#161618] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
                placeholder="https://chromewebstore.google.com/..."
              />
            </div>
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-2">
              Banner Icon
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { id: "flame", label: "Flame", Icon: Flame },
                { id: "sparkles", label: "Sparkles", Icon: Sparkles },
                { id: "gift", label: "Gift", Icon: Gift },
                { id: "star", label: "Star", Icon: Star },
                { id: "zap", label: "Zap", Icon: Zap },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSettings({ ...settings, icon: id })}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                    settings.icon === id
                      ? "border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800"
                      : "border-slate-200 dark:border-neutral-800 bg-white dark:bg-[#161618] text-slate-600 dark:text-neutral-400 hover:border-slate-300"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#FF5A00]" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-neutral-800">
            <Button type="button" variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </Button>

            <Button onClick={handleSave} disabled={isSaving} size="sm" className="gap-2">
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save & Publish Changes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
