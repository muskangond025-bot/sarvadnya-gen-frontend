import type { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/shared/server/LegalDocumentLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions | Sarvadnya Generators",
  description:
    "Standard operating procedures and legal framework for renting generators with Sarvadnya Generators.",
};

const tableOfContents = [
  { id: "eligibility", title: "Rental Eligibility" },
  { id: "maintenance", title: "Equipment Maintenance" },
  { id: "payment", title: "Payment & Cancellation" },
  { id: "liability", title: "Liability Limitation" },
];

const relatedDocs = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/cookies", label: "Cookie Policy" },
];

export default function TermsPage() {
  return (
    <LegalDocumentLayout
      titlePrefix="Terms &"
      titleAccent="Conditions"
      subtitle="Version 2.4 | May 2026"
      tableOfContents={tableOfContents}
      relatedDocs={relatedDocs}
      helpTitle="Questions?"
      helpDescription="Need clarification on our service agreement? We're here to help."
    >
      <section id="eligibility" className="scroll-mt-32 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111315]">
          <span className="text-[#FF5500] font-mono mr-2">1.</span>
          Rental Eligibility
        </h2>
        <p className="text-base text-[#403C36] leading-relaxed">
          By accessing our services, you confirm that you are at least 18 years
          old or are a legally registered business entity. Customers must
          provide valid identification and site details prior to equipment
          dispatch.
        </p>
      </section>

      <section
        id="maintenance"
        className="scroll-mt-32 pt-10 border-t border-[#E8E2D9] space-y-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111315]">
          <span className="text-[#FF5500] font-mono mr-2">2.</span>
          Equipment Maintenance &amp; Safety
        </h2>
        <p className="text-base text-[#403C36] leading-relaxed">
          Sarvadnya Generators maintains all equipment to industrial standards.
          However, once on-site:
        </p>
        <ul className="space-y-2.5 pl-1">
          <li className="flex items-start gap-3 text-base text-[#403C36]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FF5500] shrink-0" />
            <span>
              The customer is responsible for the physical safety of the
              generator.
            </span>
          </li>
          <li className="flex items-start gap-3 text-base text-[#403C36]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FF5500] shrink-0" />
            <span>Only authorized Sarvadnya technicians may perform repairs.</span>
          </li>
          <li className="flex items-start gap-3 text-base text-[#403C36]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FF5500] shrink-0" />
            <span>
              The customer must ensure a stable, level surface for installation.
            </span>
          </li>
          <li className="flex items-start gap-3 text-base text-[#403C36]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FF5500] shrink-0" />
            <span>
              Fuel quality must be maintained if self-refilling (standard Diesel
              only).
            </span>
          </li>
        </ul>
      </section>

      <section
        id="payment"
        className="scroll-mt-32 pt-10 border-t border-[#E8E2D9] space-y-5"
      >
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111315]">
          <span className="text-[#FF5500] font-mono mr-2">3.</span>
          Payment &amp; Cancellations
        </h2>
        <p className="text-base text-[#403C36] leading-relaxed">
          Rental fees are calculated on a daily (24-hour) basis.
        </p>
        <div className="pl-4 border-l-2 border-[#FF5500] space-y-1.5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111315]">
            Refund Policy
          </h3>
          <p className="text-sm text-[#403C36] leading-relaxed">
            Cancellations made 48 hours prior to dispatch are eligible for a
            full refund. Same-day cancellations may incur a logistics handling
            fee of ₹1,500.
          </p>
        </div>
      </section>

      <section
        id="liability"
        className="scroll-mt-32 pt-10 border-t border-[#E8E2D9] space-y-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111315]">
          <span className="text-[#FF5500] font-mono mr-2">4.</span>
          Liability Limitation
        </h2>
        <p className="text-base text-[#403C36] leading-relaxed">
          While we strive for 99.9% uptime, Sarvadnya Generators is not liable
          for indirect losses, data loss, or business interruption caused by
          power failure beyond our immediate control (e.g., natural disasters,
          grid fluctuations).
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
