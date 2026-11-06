import React from "react";
import { servicesData } from "@/constants/data";
import { ServicesClient } from "./ServicesClient";

/**
 * Services Component (Server)
 *
 * Detailed service breakdown sections with high-fidelity alternating rows.
 */
export function Services() {
  return (
    <section className="w-full py-32 md:py-48 bg-black relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] size-[800px] bg-[#00ff8f]/[0.02] blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] right-[-10%] size-[600px] bg-[#00ff8f]/[0.01] blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[60px] relative z-10">
        <ServicesClient services={servicesData} />
      </div>
    </section>
  );
}
