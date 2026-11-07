import { Metadata } from "next";
import {
  ForgeHero,
  ForgeContactChannels,
  ForgeSpecificationForm,
  ForgeProcessCards,
} from "@/components/contact";

export const metadata: Metadata = {
  title: "Contact & Power Consultation | Sarvadnya Generators Nashik",
  description:
    "Direct fleet dispatch desk and tailored power rental consultation for weddings, events, and industrial manufacturing across Nashik and Maharashtra.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#0A0B0E] text-[#F2F1ED] overflow-x-hidden">
      {/* 1. Hero: Every deployment starts with a conversation */}
      <ForgeHero />

      {/* 2. Direct Channels: Phone • Email • Concierge & Logistics • Visit Us */}
      <ForgeContactChannels />

      {/* 3. Interactive Specification: Define Your Specification Form */}
      <ForgeSpecificationForm />

      {/* 4. Process: A considered process built around you (3 Cards) - Strict End Section */}
      <ForgeProcessCards />
    </main>
  );
}
