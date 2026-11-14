import React from "react";
import Image from "next/image";

/**
 * FoundingStory Component (Server)
 * 
 * Ultra-Premium Editorial Layout:
 * - Exactly the authentic original data (Title, 2 narrative paragraphs, quote, 2009 badge, image)
 * - Zero extra data, zero pill badges
 * - Luxury museum-grade spatial hierarchy with hairline dividers and warm accents
 */
export function FoundingStory() {
  return (
    <section id="story" className="w-full py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Narrative & Bespoke Pull-Quote (Col 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
          <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-[#111315] font-['Poppins',sans-serif] tracking-tight leading-[1.12]">
            A Journey of <span className="text-[#FF5500]">Reliability</span>
          </h2>

          <div className="flex flex-col gap-5 sm:gap-6 text-[#3A3630] font-['Outfit',sans-serif] text-base sm:text-lg leading-[1.8] font-normal">
            <p>
              Sarvadnya Generators was founded in 2009 with a clear mission: to provide dependable and affordable power backup solutions for businesses, events, construction sites, and industrial operations across Nashik and nearby regions.
            </p>
            <p>
              What started with a small fleet of just one diesel generator has now grown into a trusted generator rental company. We are known for our reliability, quick service, and customer-focused support, ensuring that our clients never face power interruptions.
            </p>

            {/* Bespoke Luxury Pull-Quote */}
            <div className="relative pl-6 sm:pl-8 py-3 border-l-2 border-[#FF5500] mt-3">
              <span className="text-4xl sm:text-5xl text-[#FF5500] font-serif leading-none block select-none mb-1 opacity-80" aria-hidden="true">&ldquo;</span>
              <p className="text-[#111315] font-serif italic text-base sm:text-lg lg:text-xl leading-relaxed">
                Our commitment to reliability, transparent pricing, and 24/7 assistance makes us a trusted choice for temporary and long-term power requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Museum-Grade Visual Plinth with Atelier 2009 Badge (Col 5) */}
        <div className="lg:col-span-5 relative">
          <div className="relative h-[360px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden border border-[#E8E2D9] shadow-[0_24px_60px_-15px_rgba(17,19,21,0.12)] bg-[#FAF8F5] group">
            <Image 
              src="/images/about/story-main.png" 
              alt="Sarvadnya Generators History" 
              fill 
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center filter saturate-[0.9] contrast-[1.05] transition-transform duration-700 group-hover:scale-[1.03]"
            />
            {/* Subtle Gradient Scrim for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111315]/50 via-transparent to-transparent pointer-events-none" />

            {/* Atelier Frosted Glass Floating Badge */}
            <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 px-6 py-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#E8E2D9] shadow-2xl z-10 flex items-center gap-4 sm:gap-5">
              <div className="text-[#FF5500] text-3xl sm:text-4xl font-extrabold font-['Poppins',sans-serif] tracking-tight leading-none">
                2009
              </div>
              <div className="w-px h-8 sm:h-9 bg-[#E8E2D9]" />
              <div className="flex flex-col">
                <span className="text-[#111315] text-xs sm:text-sm font-bold uppercase tracking-[0.2em] font-['Outfit',sans-serif]">
                  The Beginning
                </span>
                <span className="text-[11px] text-[#71695F] font-medium font-['Outfit',sans-serif]">
                  Sarvadnya Generators
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
