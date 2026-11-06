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
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Cinematic Background Atmosphere */}
      <FloatingGlow color="#00ff8f" size="xl" className="-top-1/4 -right-1/4 opacity-10" />
      <FloatingGlow color="#00d1ff" size="lg" className="bottom-1/4 -left-1/4 opacity-10" delay={2} />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]" />

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
