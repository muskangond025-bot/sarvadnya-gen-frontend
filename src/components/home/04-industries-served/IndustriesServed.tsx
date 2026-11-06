import React from "react";
import { IndustriesServedClient, AssuranceItem } from "./IndustriesServedClient";

/**
 * IndustriesServed Component (Server Component)
 * 
 * Re-architected with Endcap.design-inspired editorial print grid:
 * - Asymmetric staggered column offset (100px column 2 shift)
 * - Large aspect-ratio photography with smooth 0.65s scale hover
 * - Floating directional corner badge
 * - 1px hairline caption with index numerals (01, 02, 03, 04)
 */
export function IndustriesServed() {
  const assurances: AssuranceItem[] = [
    {
      index: "01",
      category: "Electrical Load Engineering",
      title: "Engineered Load Assessment",
      description:
        "We evaluate your peak motor starting currents and continuous load demands before dispatch to ensure zero tripping during live operations.",
      backgroundImage: "/images/industries/commercial.png",
      equipmentImage: "/images/generators/generator_38.png",
      href: "/services",
    },
    {
      index: "02",
      category: "Acoustic Attenuation",
      title: "CPCB-II Acoustic Compliance",
      description:
        "Enclosed canopy silencers engineered to meet strict urban decibel standards, keeping celebrations and sound recordings disturbance-free.",
      backgroundImage: "/images/industries/residential.png",
      equipmentImage: "/images/generators/generator_14.png",
      href: "/services",
    },
    {
      index: "03",
      category: "Distribution Infrastructure",
      title: "Turnkey Cabling & Switchgear",
      description:
        "Complete power distribution logistics including heavy-gauge copper cabling, main changeover switches, and safety earth pits.",
      backgroundImage: "/images/industries/construction.png",
      equipmentImage: "/images/generators/generator_10.png",
      href: "/services",
    },
    {
      index: "04",
      category: "Operational Assistance",
      title: "On-Site Operator Support",
      description:
        "Trained DG technicians remain on-site through the duration of your event or industrial shift to manage refueling and continuous monitoring.",
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
            Plan Your Power Requirements with Confidence
          </h2>
          <p className="text-sm sm:text-base text-[#625D55] mt-3 leading-relaxed max-w-2xl">
            Dependable temporary power delivered with complete electrical accessories, verified load safety, and dedicated on-site support across Nashik.
          </p>
        </div>

        {/* Endcap.design-Inspired Asymmetric Editorial Card Grid */}
        <IndustriesServedClient items={assurances} />
      </div>
    </section>
  );
}
