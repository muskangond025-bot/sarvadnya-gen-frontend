import { Metadata } from "next";
import {
  ServicesHero,
  ServiceVerticals,
  ProcessWorkflow,
  ServicesSuccessStories,
  FAQSection,
  ServicesCTA,
} from "@/components/services";

export const metadata: Metadata = {
  title: "Generator Services & Rental Solutions | Nashik Power Experts",
  description:
    "Explore our range of generator services in Nashik including 24/7 technical support, fuel management, and emergency DG set rentals for industrial and commercial sectors.",
};

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen bg-[#FAF8F5] overflow-x-hidden">
      {/* 1. Services Hero */}
      <ServicesHero />

      {/* 2. Specialized Power Service Verticals */}
      <ServiceVerticals />

      {/* 3. Industrial Deployment Workflow */}
      <ProcessWorkflow />

      {/* 4. High Fidelity Success Stories */}
      <ServicesSuccessStories />

      {/* 5. Frequently Asked Questions (Homepage 2-Column Style) */}
      <FAQSection />

      {/* 6. Emergency Dispatch CTA */}
      <ServicesCTA />
    </main>
  );
}
