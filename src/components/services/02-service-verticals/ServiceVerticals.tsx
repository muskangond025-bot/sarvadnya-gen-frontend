import React from "react";
import { SectionHeading } from "@/components/common";
import { CrazyServiceDetails } from "./CrazyServiceDetails";
import { FloatingGlow } from "@/components/shared/client";

export function ServiceVerticals() {
  return (
    <section className="py-32 px-6 md:px-10 lg:px-[60px] relative overflow-hidden">
      <FloatingGlow color="#00ff8f" size="lg" className="top-1/2 left-0 opacity-10" delay={0} />
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="mb-24">
          <SectionHeading 
            label="CORE CAPABILITIES"
            title={
              <>
                Specialized Power <br />
                <span className="text-[#00ff8f]">Service Verticals</span>
              </>
            }
          />
        </div>
        <CrazyServiceDetails />
      </div>
    </section>
  );
}
