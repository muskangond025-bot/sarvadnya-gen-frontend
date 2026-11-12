import type { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/shared/server/LegalDocumentLayout";

export const metadata: Metadata = {
  title: "Cookie Policy | Sarvadnya Generators",
  description:
    "Understanding how we use tracking technologies to improve your power rental discovery experience.",
};

const tableOfContents = [
  { id: "definition", title: "What are Cookies?" },
  { id: "purpose", title: "How We Use Them" },
  { id: "management", title: "Managing Preferences" },
];

const relatedDocs = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function CookiesPage() {
  return (
    <LegalDocumentLayout
      titlePrefix="Cookie"
      titleAccent="Policy"
      subtitle="Enhanced User Experience Protocols"
      tableOfContents={tableOfContents}
      relatedDocs={relatedDocs}
      helpTitle="Cookie Help?"
      helpDescription="Need assistance managing your data preferences?"
    >
      <section id="definition" className="scroll-mt-32 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111315]">
          <span className="text-[#FF5500] font-mono mr-2">1.</span>
          What are Cookies?
        </h2>
        <p className="text-base text-[#403C36] leading-relaxed">
          Cookies are small text files placed on your device to help our
          platform remember your preferences, such as your kVA requirements or
          your recent generator searches.
        </p>
      </section>

      <section
        id="purpose"
        className="scroll-mt-32 pt-10 border-t border-[#E8E2D9] space-y-6"
      >
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111315]">
          <span className="text-[#FF5500] font-mono mr-2">2.</span>
          How We Use Them
        </h2>
        <div className="space-y-6 pt-1">
          <div className="pl-4 border-l-2 border-[#FF5500] space-y-1.5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111315]">
              Essential Cookies
            </h3>
            <p className="text-sm text-[#403C36] leading-relaxed">
              Required for secure login, cart persistence, and real-time
              availability tracking.
            </p>
          </div>
          <div className="pl-4 border-l-2 border-[#FF5500] space-y-1.5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111315]">
              Performance Cookies
            </h3>
            <p className="text-sm text-[#403C36] leading-relaxed">
              Help us understand which generator models are most popular to
              optimize our fleet management.
            </p>
          </div>
        </div>
      </section>

      <section
        id="management"
        className="scroll-mt-32 pt-10 border-t border-[#E8E2D9] space-y-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111315]">
          <span className="text-[#FF5500] font-mono mr-2">3.</span>
          Managing Preferences
        </h2>
        <p className="text-base text-[#403C36] leading-relaxed">
          You can choose to disable cookies through your browser settings.
          However, please note that certain features of the Sarvadnya portal
          (like active rental tracking) may not function correctly without them.
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
