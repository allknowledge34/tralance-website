"use client";

import React, { useState, useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

export type ConsentState = {
  essential: boolean;
  analytics: boolean;
  advertising: boolean;
};

const DEFAULT_CONSENT: ConsentState = {
  essential: true,
  analytics: false,
  advertising: false,
};

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [tempConsent, setTempConsent] = useState<ConsentState>(DEFAULT_CONSENT);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tralance_cookie_consent");
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setConsent(JSON.parse(stored));
      } else {
         
        setShowBanner(true);
      }
    } catch (e) {
       
      setShowBanner(true);
    }

    const handleOpenPreferences = () => {
       
      setShowBanner(false);
       
      setShowPreferences(true);
      try {
        const stored = localStorage.getItem("tralance_cookie_consent");
        if (stored) {
           
          setTempConsent(JSON.parse(stored));
        }
      } catch(e) {}
    };

    window.addEventListener("openCookieSettings", handleOpenPreferences);
    return () => window.removeEventListener("openCookieSettings", handleOpenPreferences);
  }, []);

  const saveConsent = (newConsent: ConsentState) => {
    setConsent(newConsent);
    localStorage.setItem("tralance_cookie_consent", JSON.stringify(newConsent));
    setShowBanner(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, advertising: true });
  };

  const handleRejectOptional = () => {
    saveConsent({ essential: true, analytics: false, advertising: false });
  };

  const handleSavePreferences = () => {
    saveConsent(tempConsent);
  };

  return (
    <>
      {consent?.analytics && (
        <GoogleAnalytics gaId="G-QZ3VZDMVPR" />
      )}
      
      {consent?.advertising && (
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5744857349829100"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}

      {showBanner && !showPreferences && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#0A0A0A] border-t border-slate-200 dark:border-white/10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pointer-events-auto">
          <div className="max-w-[1400px] mx-auto px-4 py-4 md:py-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 lg:gap-8">
            <div className="flex-grow text-sm text-slate-900 dark:text-slate-300">
              <strong className="block md:inline font-bold text-base mb-1 md:mb-0 md:mr-2">This website uses cookies to provide a better user experience.</strong>
              <span>By clicking accept, you agree to the policies outlined in the </span>
              <button onClick={() => setShowPreferences(true)} className="text-blue-600 dark:text-blue-400 hover:underline inline">Cookie Settings</button>.
            </div>
            <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full lg:w-auto flex-shrink-0">
              <button 
                onClick={() => setShowPreferences(true)}
                className="flex-1 sm:flex-none px-4 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#E51937] border border-[#E51937] hover:bg-[#E51937]/5 rounded transition-colors whitespace-nowrap"
              >
                Customize Cookies
              </button>
              <button 
                onClick={handleRejectOptional}
                className="flex-1 sm:flex-none px-4 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#E51937] border border-[#E51937] hover:bg-[#E51937]/5 rounded transition-colors whitespace-nowrap"
              >
                Decline Optional Cookies
              </button>
              <button 
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-none px-6 py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white bg-[#E51937] hover:bg-[#C8102E] rounded transition-colors whitespace-nowrap"
              >
                Accept All Cookies
              </button>
            </div>
          </div>
        </div>
      )}

      {showPreferences && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#12182B] w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Cookie Preferences</h2>
              <button onClick={() => setShowPreferences(false)} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Strictly Necessary</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Required for the website to function, securely maintain active sessions, and save these consent settings. Cannot be disabled.</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-12 h-6 bg-[#E51937] rounded-full relative opacity-50 cursor-not-allowed">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-200 dark:bg-white/5 w-full"></div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Analytics</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Helps us understand how visitors interact with the website by collecting and reporting information anonymously (Google Analytics).</p>
                </div>
                <div className="flex-shrink-0">
                  <button 
                    onClick={() => setTempConsent(prev => ({...prev, analytics: !prev.analytics}))}
                    className={`w-12 h-6 rounded-full relative transition-colors ${tempConsent.analytics ? 'bg-[#E51937]' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${tempConsent.analytics ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              </div>

              <div className="h-px bg-slate-200 dark:bg-white/5 w-full"></div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Advertising</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Allows us to serve relevant advertisements through third-party networks (Google AdSense).</p>
                </div>
                <div className="flex-shrink-0">
                  <button 
                    onClick={() => setTempConsent(prev => ({...prev, advertising: !prev.advertising}))}
                    className={`w-12 h-6 rounded-full relative transition-colors ${tempConsent.advertising ? 'bg-[#E51937]' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${tempConsent.advertising ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#0B1020] flex justify-end gap-3">
              <button 
                onClick={handleRejectOptional}
                className="px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl transition-colors"
              >
                Reject Optional
              </button>
              <button 
                onClick={handleSavePreferences}
                className="px-6 py-2.5 text-sm font-bold text-white bg-[#E51937] hover:bg-[#C8102E] rounded-xl shadow-sm transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
