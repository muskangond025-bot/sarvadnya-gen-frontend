import React from "react";
import { ProcessWorkflowClient } from "./ProcessWorkflowClient";

export interface WorkflowStage {
  number: string;
  phase: string;
  title: string;
  desc: string;
  deliverable: string;
  iconName: "audit" | "allocation" | "deployment" | "assurance";
}

const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    number: "01",
    phase: "PHASE 01 • SIZING",
    title: "Intelligent Power Audit",
    desc: "Certified electrical engineers analyze peak kVA draw, harmonic loads, and space constraints to eliminate power drop risks.",
    deliverable: "Zero-Margin Sizing Accuracy",
    iconName: "audit",
  },
  {
    number: "02",
    phase: "PHASE 02 • ALLOCATION",
    title: "Custom Fleet Matching",
    desc: "Dedicated CPCB-IV+ compliant silent DG unit matched from our 5–250 kVA fleet, complete with automatic transfer switches.",
    deliverable: "CPCB-IV+ Silent Acoustic",
    iconName: "allocation",
  },
  {
    number: "03",
    phase: "PHASE 03 • MOBILIZATION",
    title: "Rapid Heavy Deployment",
    desc: "Heavy hydraulic transport, specialized unloading, industrial cabling distribution, and certified on-site electrical commissioning.",
    deliverable: "< 60 Min Nashik Hub Dispatch",
    iconName: "deployment",
  },
  {
    number: "04",
    phase: "PHASE 04 • OPERATIONS",
    title: "24/7 Turnkey Assurance",
    desc: "Dedicated on-site technical engineer, continuous live digital telemetry, and automated diesel fuel management.",
    deliverable: "99.98% Guaranteed Grid Uptime",
    iconName: "assurance",
  },
];

export function ProcessWorkflow() {
  return (
    <section className="py-24 sm:py-32 px-6 md:px-10 lg:px-[60px] bg-transparent relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111315] font-['Poppins',sans-serif] tracking-tight">
            Precision-Engineered <span className="text-[#FF5500]">Deployment Pipeline</span>
          </h2>
          <p className="text-[#625D55] font-['Outfit',sans-serif] text-base sm:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            From initial site telemetry to active power assurance, every stage is executed with industrial-grade reliability and zero margin for downtime.
          </p>
        </div>

        {/* High-Fidelity Interactive Pipeline */}
        <ProcessWorkflowClient stages={WORKFLOW_STAGES} />
      </div>
    </section>
  );
}
