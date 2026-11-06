"use client";

import React from "react";
import { SectionHeading } from "@/components/common";
import { useLanguage } from "@/lib/LanguageContext";
import { TechnologyClient } from "./TechnologyClient";

/**
 * Technology Component (Client Component with Multi-Language Support)
 * 
 * Re-architected to "Service Area & Geographic Coverage" as defined in:
 * - docs/content.md Section 7.8
 * - docs/brain.md Primary Service Area
 * - docs/ui-rules.md Section 12
 */
export function Technology() {
  const { t } = useLanguage();

  const serviceZones = [
    {
      region: "Nashik Urban & Banquet Hub",
      coverage: "Indira Nagar, Gangapur Road, Pathardi, Trambak Road, Deolali Camp",
      highlight: "Immediate 2-to-4 Hour Dispatch for Wedding & Event Venues",
      primary: true,
    },
    {
      region: "Industrial MIDC Hubs",
      coverage: "Ambad MIDC, Satpur MIDC, Sinnar MIDC, Vinchur Industrial Area",
      highlight: "Heavy-Duty Prime Power with Automatic Changeover Systems",
      primary: false,
    },
    {
      region: "Statewide Maharashtra Coverage",
      coverage: "Pune, Chakan MIDC, Mumbai MMR, Chhatrapati Sambhajinagar, Jalgaon",
      highlight: "Long-Term Project Hire & Major Multi-Day Event Power",
      primary: false,
    },
  ];

  return (
    <section className="relative w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <SectionHeading
          title={t("tech.title")}
          description={t("tech.desc")}
          align="center"
          className="mb-12 lg:mb-16"
        />

        <TechnologyClient zones={serviceZones} />
      </div>
    </section>
  );
}
