import React from "react";
import { CTAClient, CTAData } from "./CTAClient";

/**
 * CTA Component (Server Component)
 * 
 * Simple, quick to understand, light-ivory conversion section.
 */
const CTA_DATA: CTAData = {
  title: "Get Reliable Silent Power for Your Event or Site",
  description:
    "Connect directly with our fleet dispatch desk to check generator availability (5–250 kVA) and receive a fast, transparent quote.",
  primaryButtonText: "Request a Rental Quote",
  secondaryButtonText: "Call +91 62626 29944",
  contactPhone: "+91 62626 29944",
  contactEmail: "info@sarvadnyagenerators.com",
};

export function CTA() {
  return (
    <section className="relative w-full py-16 lg:py-24 bg-[#FAF8F5] overflow-hidden">
      <CTAClient data={CTA_DATA} />
    </section>
  );
}
