"use client";

import React from "react";
import { Button } from "@/components/common";
import { useLanguage } from "@/lib/LanguageContext";
import { SolutionsClient } from "./SolutionsClient";

/**
 * Solutions Component (Client Component with Multi-Language Support)
 * 
 * Re-architected to "How the Rental Process Works" (docs/content.md Section 7.6):
 * - Step 01: Share Your Requirements
 * - Step 02: Discuss Power Sizing
 * - Step 03: Confirm Availability & Quotation
 */
export function Solutions() {
  const { t } = useLanguage();

  const steps = [
    {
      step: "01",
      title: t("solutions.step1Title"),
      description: t("solutions.step1Desc"),
      actionLabel: "Provide Details",
      metric: "Stage 01 • Intake",
    },
    {
      step: "02",
      title: t("solutions.step2Title"),
      description: t("solutions.step2Desc"),
      actionLabel: "Capacity Sizing",
      metric: "Stage 02 • Sizing",
    },
    {
      step: "03",
      title: t("solutions.step3Title"),
      description: t("solutions.step3Desc"),
      actionLabel: "Dispatch Confirmation",
      metric: "Stage 03 • Dispatch",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-b border-[#E8E2D9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-12">
        {/* Left-Aligned, Single-Line Desktop Header (No Eyebrow) */}
        <div className="max-w-4xl text-left">
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#1F1F1E] tracking-tight leading-[1.18] lg:whitespace-nowrap">
            {t("solutions.title")}
          </h2>
          <p className="text-sm sm:text-base text-[#625D55] mt-2 leading-relaxed">
            {t("solutions.desc")}
          </p>
        </div>

        {/* Triple-Animation Out-of-the-Box Interactive Cards */}
        <SolutionsClient steps={steps} />

        <div className="flex justify-start pt-2">
          <Button href="/book" variant="primary" size="lg">
            Start Your Rental Enquiry
          </Button>
        </div>
      </div>
    </section>
  );
}
