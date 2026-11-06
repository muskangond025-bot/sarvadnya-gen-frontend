import React from "react";
import { Button } from "@/components/common";
import { SolutionsClient } from "./SolutionsClient";

/**
 * Solutions Component (Server Component)
 * 
 * Re-architected to "How the Rental Process Works" (docs/content.md Section 7.6):
 * - Step 01: Share Your Requirements
 * - Step 02: Discuss Power Sizing
 * - Step 03: Confirm Availability & Quotation
 * 
 * Strict enforcement of user requests & docs/ui-rules.md:
 * - Left-aligned single line title on desktop (NO eyebrow)
 * - Triple-animation fusion in SolutionsClient
 * - Zero clipping & zero overlapping
 */
export function Solutions() {
  const steps = [
    {
      step: "01",
      title: "Share Your Requirements",
      description:
        "Tell us about your wedding, event, or industrial project—including site location, required operational dates, and key machinery to power.",
      actionLabel: "Provide Details",
      metric: "Stage 01 • Intake",
    },
    {
      step: "02",
      title: "Discuss Power Load Sizing",
      description:
        "Our technical team reviews starting inrush currents and continuous running requirements to recommend the exact generator capacity (5–250 kVA).",
      actionLabel: "Capacity Sizing",
      metric: "Stage 02 • Sizing",
    },
    {
      step: "03",
      title: "Confirm Availability & Quotation",
      description:
        "Receive a transparent rental quote including delivery logistics, soundproof canopy setup, and on-site operator assistance before booking.",
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
            From Requirements to Rental Enquiry
          </h2>
          <p className="text-sm sm:text-base text-[#625D55] mt-2 leading-relaxed">
            A clear, transparent workflow to ensure your generator rental is perfectly matched, delivered on time, and professionally supported.
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
