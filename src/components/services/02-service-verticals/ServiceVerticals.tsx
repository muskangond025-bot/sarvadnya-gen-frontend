import React from "react";
import { CrazyServiceDetails } from "./CrazyServiceDetails";

/**
 * ServiceVerticals Component
 * 
 * Redesigned to match Bootstrap Brain Service-8:
 * - High-resolution engineering photograph in background
 * - Bright translucent wash overlay
 * - Clean open space layout (zero card boxes)
 * - Distinctive data-related icons, bold titles, and Learn More links
 */
export function ServiceVerticals() {
  return (
    <section className="relative py-24 sm:py-32 px-6 md:px-10 lg:px-[60px] overflow-hidden bg-[#FAF8F5]">
      {/* Full-Bleed Generator Engine Background (Matching User Uploaded Machine) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-40 sm:opacity-50"
        style={{
          backgroundImage: "url('/images/services/generator_engine_bg.jpg')",
        }}
      />

      {/* Bright Translucent Wash (Ensures typography readability while clearly displaying generator machinery) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/85 via-[#FAF8F5]/60 to-[#FAF8F5]/90 backdrop-blur-[0.5px] pointer-events-none" />

      {/* Subtle Warm Amber Core Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] bg-[#FF5500]/[0.04] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111315] font-['Poppins',sans-serif] tracking-tight">
            Specialized Power <span className="text-[#FF5500]">Service Verticals</span>
          </h2>
          <p className="text-[#625D55] font-['Outfit',sans-serif] text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            Turnkey silent generator rentals and mission-critical power solutions engineered for zero downtime across Nashik and Maharashtra.
          </p>
        </div>

        {/* Services Showcase (No Cards, Free Space, BootstrapBrain Service-8 Style) */}
        <CrazyServiceDetails />
      </div>
    </section>
  );
}
