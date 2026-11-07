"use client";

import React from "react";
import { IndustriesServedClient, AssuranceItem } from "./IndustriesServedClient";
import { useLanguage } from "@/lib/LanguageContext";

/**
 * IndustriesServed Component
 * 
 * Re-architected with Endcap.design-inspired editorial print grid:
 * - Asymmetric staggered column offset (100px column 2 shift)
 * - Large aspect-ratio photography with smooth 0.65s scale hover
 * - Floating directional corner badge
 * - 1px hairline caption with index numerals (01, 02, 03, 04)
 * - Realtime multi-language support (English, Hindi, Marathi)
 */
export function IndustriesServed() {
  const { t } = useLanguage();

  const assurances: AssuranceItem[] = [
    {
      index: "01",
      category: t("industries.item1.cat"),
      title: t("industries.item1.title"),
      description: t("industries.item1.desc"),
      backgroundImage: "/images/industries/commercial.png",
      equipmentImage: "/images/generators/generator_38.png",
      href: "/services",
    },
    {
      index: "02",
      category: t("industries.item2.cat"),
      title: t("industries.item2.title"),
      description: t("industries.item2.desc"),
      backgroundImage: "/images/industries/residential.png",
      equipmentImage: "/images/generators/generator_14.png",
      href: "/services",
    },
    {
      index: "03",
      category: t("industries.item3.cat"),
      title: t("industries.item3.title"),
      description: t("industries.item3.desc"),
      backgroundImage: "/images/industries/construction.png",
      equipmentImage: "/images/generators/generator_10.png",
      href: "/services",
    },
    {
      index: "04",
      category: t("industries.item4.cat"),
      title: t("industries.item4.title"),
      description: t("industries.item4.desc"),
      backgroundImage: "/images/industries/healthcare.png",
      equipmentImage: "/images/generators/generator_36.png",
      href: "/services",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-b border-[#E8E2D9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        {/* Left-Aligned Editorial Section Heading */}
        <div className="max-w-4xl text-left">
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1F1F1E] tracking-tight leading-[1.15]">
            {t("industries.title")}
          </h2>
          <p className="text-sm sm:text-base text-[#625D55] mt-3 leading-relaxed max-w-2xl">
            {t("industries.desc")}
          </p>
        </div>

        {/* Endcap.design-Inspired Asymmetric Editorial Card Grid */}
        <IndustriesServedClient items={assurances} />
      </div>
    </section>
  );
}
