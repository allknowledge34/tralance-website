"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="glass dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
      <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-6">
        Send Feedback
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider">Name</label>
          <input
            type="text"
            required
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 text-slate-900 dark:text-white text-sm outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider">Email</label>
          <input
            type="email"
            required
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 text-slate-900 dark:text-white text-sm outline-none focus:border-primary transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-450 dark:text-slate-400 uppercase tracking-wider">Message</label>
          <textarea
            required
            rows={4}
            value={formState.message}
            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
            placeholder="How can we help you?"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 text-slate-900 dark:text-white text-sm outline-none focus:border-primary transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-primary hover:bg-blue-600 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-primary/20 cursor-pointer mt-2"
        >
          Send Message
        </button>
      </form>

      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold text-center"
          >
            Thank you! Your feedback has been received.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
