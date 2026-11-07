import React from "react";
import { SectionHeading } from "@/components/common";
import { ProcessWorkflowClient } from "./ProcessWorkflowClient";
import { FloatingGlow } from "@/components/shared/client";

const WORKFLOW_STEPS = [
  { number: "01", title: "Site Assessment", desc: "Our engineers analyze your load requirements and installation constraints." },
  { number: "02", title: "Custom Solution", desc: "We deploy an optimized configuration from our 5kVA to 250kVA fleet." },
  { number: "03", title: "Rapid Setup", desc: "Industrial-grade transportation and professional site commissioning." },
  { number: "04", title: "Power Management", desc: "Ongoing monitoring and fuel optimization for maximum efficiency." },
];

export function ProcessWorkflow() {
  return (
    <section className="py-24 sm:py-32 px-6 md:px-10 lg:px-[60px] bg-transparent relative overflow-hidden">
      <FloatingGlow color="#FFAA00" size="xl" className="bottom-0 right-0 opacity-[0.05]" delay={5} />
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="mb-20 sm:mb-24 text-center">
          <SectionHeading 
            title={
              <>
                Precision in <br />
                <span className="text-[#FF5500]">
                  Operational Execution
                </span>
              </>
            }
          />
        </div>
        <ProcessWorkflowClient steps={WORKFLOW_STEPS} />
      </div>
    </section>
  );
}
