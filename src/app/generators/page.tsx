import { Metadata } from "next";
import {
  GeneratorHero,
  GeneratorGallery,
  GeneratorCompare,
} from "@/components/generators";
import { FloatingGlow } from "@/components/shared/client";

export const metadata: Metadata = {
  title: "Generator Fleet | Silent DG Sets for Rent in Nashik",
  description: "Browse our wide range of Kirloskar, Cummins, and Mahindra generators. Silent DG sets from 5kVA to 250kVA available for rent in Nashik and Maharashtra.",
};

export default function GeneratorsPage() {
  return (
    <div className="relative min-h-screen bg-[#FAF8F5] overflow-hidden">
      {/* Subtle Warm Amber-Orange Ambient Atmosphere */}
      <FloatingGlow color="#FF5500" size="xl" className="-top-1/4 -right-1/4 opacity-[0.06]" />
      <FloatingGlow color="#FFAA00" size="lg" className="bottom-1/4 -left-1/4 opacity-[0.05]" delay={2} />

      <div className="relative z-10">
        {/* 1. Generator Fleet Hero */}
        <GeneratorHero />
        
        {/* 2. All Generators Gallery & Spec Modals */}
        <GeneratorGallery />

        {/* 3. Compare Section */}
        <div className="pb-32">
          <GeneratorCompare />
        </div>
      </div>
    </div>
  );
}
