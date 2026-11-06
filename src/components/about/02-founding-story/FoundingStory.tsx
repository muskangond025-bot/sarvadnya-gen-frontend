import React from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/common";

/**
 * FoundingStory Component (Server)
 * 
 * Tells the story of Sarvadnya Generators since 2009.
 */
export function FoundingStory() {
  return (
    <section className="w-full py-24 px-6 md:px-10 lg:px-[60px] bg-black">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <div className="flex flex-col gap-8">
          <SectionHeading 
            label="OUR STORY"
            title={<>A Journey of <span className="text-[#00ff8f]">Reliability</span></>}
            align="left"
          />
          
          <div className="flex flex-col gap-6 text-[#bfbfbf] font-['Outfit',sans-serif] text-lg leading-relaxed">
            <p>
              Sarvadnya Generators was founded in 2009 with a clear mission: to provide dependable and affordable power backup solutions for businesses, events, construction sites, and industrial operations across Nashik and nearby regions.
            </p>
            <p>
              What started with a small fleet of just one diesel generator has now grown into a trusted generator rental company. We are known for our reliability, quick service, and customer-focused support, ensuring that our clients never face power interruptions.
            </p>
            <div className="p-8 rounded-[24px] bg-[#00ff8f]/5 border border-[#00ff8f]/20 mt-4">
              <p className="text-white font-medium italic">
                "Our commitment to reliability, transparent pricing, and 24/7 assistance makes us a trusted choice for temporary and long-term power requirements."
              </p>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="relative h-[500px] rounded-[32px] overflow-hidden group">
          <Image 
            src="/images/about/story-main.png" 
            alt="Sarvadnya Generators History" 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Decorative Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />
          
          {/* Floating Badge */}
          <div className="absolute bottom-10 left-10 p-6 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 z-10">
            <div className="text-[#00ff8f] text-4xl font-bold font-['Poppins',sans-serif] mb-1">2009</div>
            <div className="text-white text-sm uppercase tracking-widest font-['Outfit',sans-serif]">The Beginning</div>
          </div>
        </div>
      </div>
    </section>
  );
}
