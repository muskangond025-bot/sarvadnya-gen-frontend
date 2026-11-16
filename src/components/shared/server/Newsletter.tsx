"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

/**
 * Newsletter Component
 *
 * Open, card-free editorial subscription band placed directly on the bright canvas.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="relative w-full pt-14 sm:pt-20 pb-6 border-t border-[#DED8CE]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        {/* Left Editorial Statement */}
        <div className="lg:col-span-6 space-y-4">
          <div className="w-14 h-[3px] bg-[#FF5500]" />
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111315] tracking-tight leading-[1.12]">
            Stay Empowered With{" "}
            <span className="text-[#FF5500]">Field Insights.</span>
          </h2>
          <p className="text-[#2D2A26] text-base sm:text-lg leading-relaxed max-w-xl">
            Receive practical kVA sizing notes, preventive service checklists,
            and power management updates directly from our Nashik engineering
            desk.
          </p>
        </div>

        {/* Right Subscription Area */}
        <div className="lg:col-span-6 w-full">
          {subscribed ? (
            <div className="py-5 border-b-2 border-[#FF5500] flex items-center gap-3 text-[#111315] text-base font-semibold">
              <CheckCircle2 size={20} className="text-[#FF5500] shrink-0" />
              <span>
                Subscribed! You will receive our next field guide directly in
                your inbox.
              </span>
            </div>
          ) : (
            <>
              {/* MOBILE ONLY (< sm): Free space editorial subscribe button & expandable text area */}
              <div className="block sm:hidden w-full">
                {!mobileExpanded ? (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setMobileExpanded(true)}
                      className="bg-[#18181B] hover:bg-[#FF5500] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-colors inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-sm group"
                    >
                      <span>Subscribe</span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </button>
                    <div className="flex items-center gap-2 text-[#403C36] text-xs font-medium">
                      <ShieldCheck size={14} className="text-[#FF5500] shrink-0" />
                      <span>We respect your privacy. Unsubscribe at any time.</span>
                    </div>
                  </div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSubmit}
                    className="w-full space-y-4"
                  >
                    {/* Free-Space Text Area directly on the canvas (No enclosed box) */}
                    <div className="pb-2 border-b-2 border-[#18181B] focus-within:border-[#FF5500] transition-colors">
                      <textarea
                        rows={2}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address..."
                        autoFocus
                        required
                        className="w-full bg-transparent text-[#111315] text-base font-medium placeholder:text-[#6E685F] focus:outline-none resize-none leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        className="bg-[#18181B] hover:bg-[#FF5500] text-white px-7 py-3 rounded-full font-bold text-sm transition-colors inline-flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-xs"
                      >
                        <span>Subscribe</span>
                        <ArrowRight size={15} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setMobileExpanded(false)}
                        className="text-xs font-bold text-[#625D55] hover:text-[#111315] py-2 px-3 transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-[#403C36] text-xs font-medium">
                      <ShieldCheck size={14} className="text-[#FF5500] shrink-0" />
                      <span>We respect your privacy. Unsubscribe at any time.</span>
                    </div>
                  </motion.form>
                )}
              </div>

              {/* DESKTOP ONLY (sm and above): 100% UNCHANGED original open architectural underline input */}
              <form onSubmit={handleSubmit} className="hidden sm:block space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pb-3 border-b-2 border-[#18181B] focus-within:border-[#FF5500] transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address for newsletter"
                    className="flex-1 bg-transparent py-2 text-[#111315] text-base sm:text-lg font-medium focus:outline-none placeholder:text-[#6E685F]"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-[#18181B] hover:bg-[#FF5500] text-white px-7 py-3.5 rounded-full font-bold text-sm transition-colors inline-flex items-center justify-center gap-2 group shrink-0 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[#403C36] text-xs font-medium">
                  <ShieldCheck size={14} className="text-[#FF5500] shrink-0" />
                  <span>We respect your privacy. Unsubscribe at any time.</span>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
