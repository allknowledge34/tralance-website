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
    <div className="space-y-6">
      {feedback && (
        <div
          className={`p-4 border-2 border-[#171717] dark:border-[#383838] shadow-[3px_3px_0px_0px_#171717] dark:shadow-[3px_3px_0px_0px_#000000] flex items-center gap-3 text-sm font-bold ${
            feedback.type === "success"
              ? "bg-[#6EE7B7]/20 text-[#171717] dark:text-[#6EE7B7]"
              : "bg-[#FF6B6B]/20 text-[#171717] dark:text-[#FF6B6B]"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-[#171717] dark:text-[#6EE7B7]" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-[#FF6B6B]" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-base font-black uppercase tracking-wide">Website Live Preview</CardTitle>
            <p className="text-xs text-subtle font-medium mt-0.5">
              Interactive preview matching the exact header banner rendered on https://www.tralance.pro
            </p>
          </div>
          <Badge variant={settings.isActive ? "success" : "default"}>
            {settings.isActive ? "ACTIVE ON LIVE SITE" : "DISABLED"}
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t-2 border-b-2 border-[#171717] dark:border-[#383838] overflow-hidden bg-white dark:bg-[#121214]">
            {settings.isActive ? (
              <div className="w-full bg-[#FFE52E]/15 dark:bg-[#27272A] py-3.5 px-4 sm:px-8 border-b-2 border-[#171717] dark:border-[#383838]">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 text-center sm:text-left">
                    <SelectedIcon className="w-4 h-4 text-[#FF6B6B] shrink-0" />
                    <span className="text-xs sm:text-sm font-bold text-[#171717] dark:text-[#FFFDF5] tracking-wide">
                      {settings.text || "Your announcement text..."}
                    </span>
                  </div>
                  <span className="inline-flex items-center justify-center px-4 py-1.5 border-2 border-[#171717] text-xs font-black uppercase text-[#171717] bg-[#35B9F5] shadow-[2px_2px_0px_0px_#171717] shrink-0">
                    {settings.btnText || "Learn More"}
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center text-xs font-bold uppercase tracking-wider text-subtle italic">
                Promo banner is currently disabled. Toggle &quot;Enable Promo Bar&quot; below to preview and activate.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-black uppercase tracking-wide">Announcement Settings</CardTitle>
              <p className="text-xs text-subtle font-medium mt-0.5">
                Configure promotional messaging, target URL, and banner icon
              </p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.isActive}
                onChange={(e) => setSettings({ ...settings, isActive: e.target.checked })}
              />
              <div className="w-13 h-7 bg-white dark:bg-[#27272A] border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] peer-checked:bg-[#FFE52E] after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-[#171717] dark:after:bg-[#FFFDF5] after:w-5 after:h-5 after:transition-all peer-checked:after:translate-x-6 peer-checked:after:bg-[#171717]"></div>
            </label>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 pt-0">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#FFFDF5] mb-1.5">
              Promotional Announcement Text
            </label>
            <input
              type="text"
              required
              value={settings.text}
              onChange={(e) => setSettings({ ...settings, text: e.target.value })}
              className="w-full px-4 py-2.5 text-sm font-medium border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] bg-white dark:bg-[#27272A] text-[#171717] dark:text-[#FFFDF5] focus:outline-none focus:border-[#FFE52E]"
              placeholder="e.g. Try YTVoidMode - block distractions across your browser..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#FFFDF5] mb-1.5">
                Call-to-Action Button Label
              </label>
              <input
                type="text"
                required
                value={settings.btnText}
                onChange={(e) => setSettings({ ...settings, btnText: e.target.value })}
                className="w-full px-4 py-2.5 text-sm font-medium border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] bg-white dark:bg-[#27272A] text-[#171717] dark:text-[#FFFDF5] focus:outline-none focus:border-[#FFE52E]"
                placeholder="e.g. Try YTVoidMode"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#FFFDF5] mb-1.5">
                Button Destination URL
              </label>
              <input
                type="url"
                required
                value={settings.btnUrl}
                onChange={(e) => setSettings({ ...settings, btnUrl: e.target.value })}
                className="w-full px-4 py-2.5 text-sm font-medium border-2 border-[#171717] dark:border-[#383838] shadow-[2px_2px_0px_0px_#171717] dark:shadow-[2px_2px_0px_0px_#000000] bg-white dark:bg-[#27272A] text-[#171717] dark:text-[#FFFDF5] focus:outline-none focus:border-[#FFE52E]"
                placeholder="https://chromewebstore.google.com/..."
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#171717] dark:text-[#FFFDF5] mb-2">
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
                  className={`flex items-center gap-2 px-3 py-2 border-2 text-xs font-bold uppercase tracking-wider transition-all ${
                    settings.icon === id
                      ? "border-[#171717] bg-[#FFE52E] text-[#171717] shadow-[2px_2px_0px_0px_#171717]"
                      : "border-[#171717] dark:border-[#383838] bg-white dark:bg-[#27272A] text-subtle hover:bg-[#FFE52E]/30 hover:text-[#171717] dark:hover:text-[#FFFDF5]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-[#FF6B6B]" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t-2 border-[#171717] dark:border-[#383838]">
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
