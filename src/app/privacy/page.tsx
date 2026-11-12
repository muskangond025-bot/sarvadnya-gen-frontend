import type { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/shared/server/LegalDocumentLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Sarvadnya Generators",
  description:
    "Our commitment to protecting your personal data and ensuring transparency in our power rental services.",
};

const tableOfContents = [
  { id: "collection", title: "Information We Collect" },
  { id: "usage", title: "How We Use Data" },
  { id: "security", title: "Data Security" },
  { id: "contact", title: "Contact Us" },
];

const relatedDocs = [
  { href: "/terms", label: "Terms of Service" },
  { href: "/cookies", label: "Cookie Policy" },
];

export default function PrivacyPage() {
  return (
    <LegalDocumentLayout
      titlePrefix="Privacy"
      titleAccent="Policy"
      subtitle="Last Updated: May 15, 2026"
      tableOfContents={tableOfContents}
      relatedDocs={relatedDocs}
      helpTitle="Need Help?"
      helpDescription="Our support team is available 24/7 for any legal or service queries."
    >
      <section id="collection" className="scroll-mt-32 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111315]">
          <span className="text-[#FF5500] font-mono mr-2">1.</span>
          Information We Collect
        </h2>
        <p className="text-base text-[#403C36] leading-relaxed">
          At Sarvadnya Generators, we collect information that is essential for
          providing you with high-performance power solutions. This includes:
        </p>
        <ul className="space-y-2.5 pl-1">
          <li className="flex items-start gap-3 text-base text-[#403C36]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FF5500] shrink-0" />
            <span>Contact details (Name, Email, Mobile Number)</span>
          </li>
          <li className="flex items-start gap-3 text-base text-[#403C36]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FF5500] shrink-0" />
            <span>Business Information (Company Name, GST details)</span>
          </li>
          <li className="flex items-start gap-3 text-base text-[#403C36]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FF5500] shrink-0" />
            <span>Logistics Data (Site address for generator delivery)</span>
          </li>
          <li className="flex items-start gap-3 text-base text-[#403C36]">
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#FF5500] shrink-0" />
            <span>Usage Data (Power consumption logs for maintenance)</span>
          </li>
        </ul>
      </section>

      <section
        id="usage"
        className="scroll-mt-32 pt-10 border-t border-[#E8E2D9] space-y-5"
      >
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111315]">
          <span className="text-[#FF5500] font-mono mr-2">2.</span>
          How We Use Your Data
        </h2>
        <p className="text-base text-[#403C36] leading-relaxed">
          Your data is primarily used to facilitate reliable generator rentals
          and maintain the safety of our equipment.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-2">
          <div className="pl-4 border-l-2 border-[#FF5500] space-y-1.5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111315]">
              Service Delivery
            </h3>
            <p className="text-sm text-[#403C36] leading-relaxed">
              Processing bookings, delivering equipment to your specific site,
              and managing rental durations.
            </p>
          </div>
          <div className="pl-4 border-l-2 border-[#FF5500] space-y-1.5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#111315]">
              Technical Support
            </h3>
            <p className="text-sm text-[#403C36] leading-relaxed">
              Coordinating technician visits and fuel refills based on your
              operational schedule.
            </p>
          </div>
        </div>
      </section>

      <section
        id="security"
        className="scroll-mt-32 pt-10 border-t border-[#E8E2D9] space-y-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111315]">
          <span className="text-[#FF5500] font-mono mr-2">3.</span>
          Data Security
        </h2>
        <p className="text-base text-[#403C36] leading-relaxed">
          We employ military-grade encryption and secure database protocols to
          ensure your business data remains confidential. We do not sell or
          share your information with third-party marketing firms.
        </p>
      </section>

      <section
        id="contact"
        className="scroll-mt-32 pt-10 border-t border-[#E8E2D9] space-y-4"
      >
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111315]">
          <span className="text-[#FF5500] font-mono mr-2">4.</span>
          Contact Our Privacy Team
        </h2>
        <p className="text-base text-[#403C36] leading-relaxed">
          If you have any questions regarding your data, please contact our
          transparency officer at:{" "}
          <a
            href="mailto:privacy@sarvadnyagenerators.com"
            className="font-semibold text-[#111315] hover:text-[#FF5500] border-b border-[#FF5500]/60 pb-0.5 transition-colors"
          >
            privacy@sarvadnyagenerators.com
          </a>
        </p>
      </section>
    </LegalDocumentLayout>
  );
}
