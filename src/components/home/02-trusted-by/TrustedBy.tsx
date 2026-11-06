"use client";

import React from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { TrustedByClient } from "./TrustedByClient";

/**
 * TrustedBy Component (Client Component with Multi-Language Support)
 * 
 * Showcases industry-leading engine & alternator brands powering the Sarvadnya fleet.
 * Refined light-theme editorial presentation following docs/design-system.md.
 */
export function TrustedBy() {
  const { t } = useLanguage();

  const partners = [
    { name: "Kirloskar", spec: "CPCB Silent DG Sets" },
    { name: "Cummins", spec: "Heavy Industrial Prime Power" },
    { name: "Mahindra Powerol", spec: "Fuel-Efficient Event Sets" },
    { name: "Perkins", spec: "High-Stability Synchronized Power" },
  ];

  return (
    <section className="relative w-full py-10 lg:py-12 bg-[#FAF8F5] border-b border-[#E8E2D9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#625D55]">
            {t("trusted.heading")}
          </span>
          <TrustedByClient partners={partners} />
        </div>
      </div>
    </section>
  );
}
