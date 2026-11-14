import React from "react";
import { CTAClient, CTAData } from "./CTAClient";
import { SplashCursorBackground } from "@/components/common";

/**
 * CTA Component (Server Component)
 * 
 * Luxury pre-footer conversion section with interactive SplashCursor WebGL fluid dynamics:
 * - Fluid ink ripples reacting to cursor movement and clicks in Sarvadnya Energy Orange (#FF5500)
 * - Contained strictly within the CTA section bounds
 * - Zero purple hues, tuned to pure energy orange palette
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
      {/* 
        Interactive SplashCursor WebGL Fluid Canvas
        Active ONLY within this CTA section with pure Energy Orange fluid dynamics
      */}
      <SplashCursorBackground
        contained={true}
        rainbow={false}
        colors={["#FF5500", "#FF6A00", "#FF7F00", "#FF9933", "#FF4000"]}
        colorSpeed={0.8}
        intensity={1.2}
        size={1.1}
        force={1.1}
        swirl={3.5}
        trail={1.4}
        momentum={1}
        shading={0.8}
        glow={0.2}
        quality="high"
        clickSplash={true}
        intro={false}
        theme="light"
        zIndex={1}
      />

      <CTAClient data={CTA_DATA} />
    </section>
  );
}
