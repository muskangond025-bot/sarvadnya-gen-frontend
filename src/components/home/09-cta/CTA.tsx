import React from "react";
import { CTAClient, CTAData } from "./CTAClient";
import { SlicedWavesBackground } from "@/components/common/SlicedWavesBackground";

/**
 * CTA Component (Server Component)
 * 
 * Luxury pre-footer hero section with interactive SlicedWaves light ribbons.
 */
const CTA_DATA: CTAData = {
  title: "Get Reliable Silent Power for Your Event or Site",
  description:
    "Connect directly with our fleet dispatch desk to check generator availability (5–250 kVA) and receive a fast, transparent quote.",
  primaryButtonText: "Request a Rental Quote",
  secondaryButtonText: "Call +91 62626 29944",
  contactPhone: "+91 62626 29944",
  contactEmail: "info@sarvadnyaagenerators.com",
};

export function CTA() {
  return (
    <section className="relative w-full py-20 lg:py-28 bg-[#FAF8F5] overflow-hidden border-t border-[#E8E2D9]">
      {/* Interactive SlicedWaves Background for Footer Hero / Pre-Footer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto opacity-60">
        <SlicedWavesBackground
          color1="#ff9d4d"
          color2="#ff2d78"
          color3="#3060ff"
          ribbons={3}
          spacing={28}
          perspective={0.45}
          blur={0.6}
          glow={1}
          position={0.78}
          mouseInteraction
          barWidth={0.5}
          ribbonHeight={0.26}
          spread={0.1}
          amplitude={0.1}
          frequency={1}
          curve={0.5}
          slices={0}
          speed={1}
          brightness={1.25}
          rotation={0}
          grain={0.08}
          fade={0}
          opacity={1}
          intro
          lightMode
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5]/40 to-[#FAF8F5] pointer-events-none" />
      </div>

      <CTAClient data={CTA_DATA} />
    </section>
  );
}
