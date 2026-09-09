"use client";

import { useState } from "react";
import { savePromoSettings } from "@/app/actions/promo";
import { Sparkles, Save, RotateCcw, Flame } from "lucide-react";

export default function PromoAdminClient({ initialSettings }: { initialSettings: any }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isSaving, setIsSaving] = useState(false);

  const defaultSettings = {
    isActive: false,
    text: "Try YTVoidMode — a cleaner YouTube experience for Chrome",
    btnText: "Try YTVoidMode",
    btnUrl: "https://chromewebstore.google.com/",
    icon: "sparkles"
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await savePromoSettings(settings);
      alert("Settings saved successfully!");
    } catch (error) {
      alert("Error saving settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  return (
    <div className="space-y-12">
      
      <section>
        <h2 className="text-sm font-medium uppercase tracking-widest text-subtle mb-4">Live Preview</h2>
        <div className="border border-[var(--border-strong)] rounded-2xl overflow-hidden bg-[var(--background-secondary)]">
          {settings.isActive ? (
            <>
              <style>{`
                @keyframes subtle-flame {
                  0%, 100% { transform: scale(1) rotate(-2deg); opacity: 0.9; }
                  50% { transform: scale(1.1) rotate(2deg); opacity: 1; filter: drop-shadow(0 0 6px rgba(255, 90, 0, 0.5)); }
                }
                .animate-flame {
                  animation: subtle-flame 2.5s ease-in-out infinite;
                }
              `}</style>
              <div className="w-full bg-blue-50/70 dark:bg-[#060913]/70 backdrop-blur-xl border-b border-blue-200/50 dark:border-[rgba(255,255,255,0.04)] shadow-[0_4px_24px_-8px_rgba(0,102,255,0.08)] dark:shadow-[0_4px_24px_-8px_rgba(0,102,255,0.15)] relative">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/10 dark:via-blue-500/20 to-transparent" />
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-0 w-full min-h-[48px]">
                  <div className="flex items-center justify-center gap-2.5 text-center">
                    <Flame className="w-4 h-4 text-[#FF5A00] animate-flame flex-shrink-0" fill="#FF5A00" />
                    <span className="text-[13px] sm:text-[14px] font-semibold text-slate-900 dark:text-slate-100 tracking-wide leading-tight">
                      {settings.text || "Your text here"}
                    </span>
                  </div>
                  <div className="inline-flex flex-shrink-0 items-center justify-center px-4 py-1.5 rounded-full text-[12px] sm:text-[13px] font-bold text-white bg-[#0066FF] opacity-90 cursor-default shadow-[0_4px_14px_0_rgba(0,102,255,0.25)] sm:absolute sm:right-4 md:right-6 lg:right-8">
                    {settings.btnText || "Button"}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-sm text-subtle italic">
              Promo bar is currently disabled. Toggle it ON to preview.
            </div>
          )}
          <div className="p-4 bg-background border-t border-[var(--border-strong)] flex items-center justify-between text-xs text-subtle opacity-70">
            <span>This is exactly how it will appear on the website</span>
          </div>
        </div>
      </section>

      <section className="bg-[var(--background-secondary)] border border-[var(--border-strong)] rounded-2xl p-6 md:p-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-[var(--border-strong)] pb-6 mb-6">
          <div>
            <h3 className="text-base font-semibold text-foreground">Enable Promo Bar</h3>
            <p className="text-sm text-subtle mt-1">Show or hide the promo bar globally on the website.</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer"
              checked={settings.isActive}
              onChange={(e) => setSettings({ ...settings, isActive: e.target.checked })}
            />
            <div className="w-11 h-6 bg-[var(--border-strong)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Promotional Text</label>
            <input
              type="text"
              value={settings.text}
              onChange={(e) => setSettings({ ...settings, text: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-[var(--border-strong)] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              placeholder="E.g. Try YTVoidMode..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Button Text</label>
              <input
                type="text"
                value={settings.btnText}
                onChange={(e) => setSettings({ ...settings, btnText: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border-strong)] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="E.g. Try Now"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Button URL</label>
              <input
                type="text"
                value={settings.btnUrl}
                onChange={(e) => setSettings({ ...settings, btnUrl: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-[var(--border-strong)] bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                placeholder="https://..."
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 mt-6 border-t border-[var(--border-strong)]">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-subtle hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Defaults
          </button>
          
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-foreground text-background font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </section>

    </div>
  );
}
