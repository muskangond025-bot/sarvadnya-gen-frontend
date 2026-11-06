import {
  AboutHero,
  FoundingStory,
  TrackRecord,
  Community,
  Innovation,
  Timeline,
} from "@/components/about";
import { CTA } from "@/components/home";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Power Journey | Sarvadnya Generators Nashik",
  description:
    "Nashik's trusted partner for Weddings, Grand Events, and Industrial power since 2009. Learn about our commitment to excellence and why we are the preferred choice for reliable generator rentals in Maharashtra.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <AboutHero />
      <FoundingStory />
      <TrackRecord />
      <Community />
      <Innovation />
      <Timeline />
      <CTA />
    </div>
  );
}
