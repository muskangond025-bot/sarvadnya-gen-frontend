import React from "react";
import { SectionHeading } from "@/components/common";
import { ServicesWeOfferClient, type ServiceVertical } from "./ServicesWeOfferClient";

/**
 * ServicesWeOffer Component (Server Component)
 * 
 * Displays the 3 verified core rental verticals defined in docs/brain.md and docs/content.md:
 * 1. Weddings & Banquets (Silent CPCB-II Acoustic Fleet)
 * 2. Grand Events & Festivals (Dual DG Synchronized Redundancy)
 * 3. Industrial & Project Rentals (Continuous Prime Heavy Duty DG Fleet)
 * 
 * Rendered as an Awwwards-inspired single-stage pinned mask reveal showcase:
 * All cards sit in the exact same place and reveal sequentially from the center.
 */
export function ServicesWeOffer() {
  const verticals: ServiceVertical[] = [
    {
      id: "weddings",
      index: "01",
      tabLabel: "Weddings & Banquets",
      tagline: "ACOUSTIC SOUNDPROOF FLEET",
      title: "Weddings & Banquets",
      subtitle: "Zero Noise Disruption for Lifelong Celebrations",
      description:
        "Ultra-silent CPCB-II compliant diesel generators engineered specifically for marriage lawns, farmhouse celebrations, and luxury banquet halls. Clean sine wave voltage safeguards sensitive stage acoustics, LED video walls, and decorative chandeliers.",
      capacity: "5 kVA to 125 kVA",
      specs: [
        { label: "Acoustic Standard", value: "< 75 dBA @ 1m (CPCB-II)" },
        { label: "Output Voltage", value: "3-Phase 415V / Single-Phase 230V" },
        { label: "Switchgear Support", value: "Automatic Mains Failure (AMF)" },
        { label: "Field Assistance", value: "Turnkey Cabling & On-Site Technician" },
      ],
      primaryImage: "/images/industries/residential.png",
      unitImage: "/images/generators/generator_38.png",
      unitBadge: "CPCB-II ACOUSTIC ENCLOSURE",
      statusBadge: "READY FOR DISPATCH",
      href: "/contact?service=weddings",
      ctaText: "Reserve Wedding Power",
    },
    {
      id: "events",
      index: "02",
      tabLabel: "Grand Events & Festivals",
      tagline: "SYNCHRONIZED DUAL REDUNDANCY",
      title: "Grand Events & Festivals",
      subtitle: "Flawless Execution for High-Capacity Gatherings",
      description:
        "High-output multi-generator synchronized power stations built for music festivals, cultural celebrations, sports expos, and public gatherings. Dual DG synchronization ensures automatic, millisecond failover with zero stage blackout risk.",
      capacity: "30 kVA to 250 kVA",
      specs: [
        { label: "Grid Redundancy", value: "Dual DG N+1 Synchronization" },
        { label: "AV Frequency Stability", value: "50 Hz ± 0.5% True Sine Wave" },
        { label: "Distribution Kit", value: "Weatherproof Distribution Panels & Cable Ramps" },
        { label: "Operational Run", value: "Continuous 24-Hour Fuel Autonomy" },
      ],
      primaryImage: "/images/industries/commercial.png",
      unitImage: "/images/generators/generator_14.png",
      unitBadge: "SYNCHRONIZED DUAL DG",
      statusBadge: "EVENT CREW ON CALL",
      href: "/contact?service=events",
      ctaText: "Plan Event Power Supply",
    },
    {
      id: "industrial",
      index: "03",
      tabLabel: "Industrial & Projects",
      tagline: "PRIME CONTINUOUS INDUSTRIAL FLEET",
      title: "Industrial & Project Rentals",
      subtitle: "Rugged Reliability for Uncompromising Production",
      description:
        "Heavy-duty continuous-rated diesel generator sets built for manufacturing shutdowns, plant maintenance, and critical infrastructure construction sites. Heavy-gauge industrial enclosures withstand extreme outdoor conditions and heavy motor loads.",
      capacity: "62.5 kVA to 250 kVA",
      specs: [
        { label: "Power Rating", value: "100% Prime Continuous (ISO 8528)" },
        { label: "Heavy Inductive Load", value: "Optimized for Motors, Cranes & Chillers" },
        { label: "Protection Standard", value: "Heavy-Gauge Weatherproof Steel Canopy" },
        { label: "Support Coverage", value: "24/7 Dedicated Breakdown Assistance" },
      ],
      primaryImage: "/images/industries/construction.png",
      unitImage: "/images/generators/generator_10.png",
      unitBadge: "HEAVY PRIME CONTINUOUS",
      statusBadge: "24/7 INDUSTRIAL FLEET",
      href: "/contact?service=industrial",
      ctaText: "Request Industrial Fleet",
    },
  ];

  return (
    <section
      id="applications"
      className="w-full py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-b border-[#E8E2D9] relative"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title={
            <span className="block lg:whitespace-nowrap">
              Power Solutions for Events and Industry
            </span>
          }
          description="Tailored silent generator setups configured for venue acoustic requirements, continuous industrial loads, and temporary project timelines."
          align="left"
          className="mb-8 sm:mb-10 max-w-5xl"
        />

        <ServicesWeOfferClient verticals={verticals} />
      </div>
    </section>
  );
}
