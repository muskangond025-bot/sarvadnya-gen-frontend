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
    <section className="py-32 md:py-48 px-6 md:px-10 lg:px-[60px] bg-[#050505] relative overflow-hidden">
      <FloatingGlow color="#00d1ff" size="xl" className="bottom-0 right-0 opacity-10" delay={5} />
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="mb-24 text-center">
          <SectionHeading 
            label="OUR WORKFLOW"
            title={
              <>
                Precision in <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-[#00ff8f] to-white bg-[length:200%_auto] animate-shimmer">
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
