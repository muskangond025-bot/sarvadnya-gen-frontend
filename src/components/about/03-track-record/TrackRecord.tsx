import { SectionHeading } from "@/components/common";

/**
 * TrackRecord Component (Server)
 *
 * Stats section with CSS-only hover effects - fully server-rendered.
 */
export function TrackRecord() {
  return (
    <section className="w-full min-h-[100dvh] flex flex-col justify-center items-center py-12 lg:py-16 px-4 sm:px-6 lg:px-8 gap-8 lg:gap-10 relative overflow-hidden">
      <div className="text-center">
        <SectionHeading
          label="OUR IMPACT"
          title={
            <>
              Driven by Reliability,
              <br />
              Measured by <span className="text-[#00ff8f]">Results</span>
            </>
          }
        />
      </div>

      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Card 1: Experience */}
        <div className="bg-[#111] rounded-[32px] p-6 lg:p-8 border border-white/5 flex flex-col justify-between h-full relative overflow-hidden group hover:border-[#00ff8f]/30 transition-all lg:row-span-2">
          <div className="relative z-10">
            <h3 className="text-white text-3xl lg:text-4xl xl:text-5xl font-bold font-['Poppins',sans-serif] leading-tight mb-3 lg:mb-4">
              17+ Years
              <br />
              <span className="text-[#00ff8f]">Industry Expertise</span>
            </h3>
            <p className="text-[#bfbfbf] font-['Outfit',sans-serif] text-base lg:text-lg">Powering Nashik since 2009 with dependable solutions.</p>
          </div>
          <div className="mt-auto relative z-10 flex items-center justify-between pt-6 lg:pt-10">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="size-10 lg:size-12 rounded-full bg-zinc-800 border-2 border-[#111]"
                />
              ))}
            </div>
            <span className="text-white/20 text-6xl lg:text-8xl font-bold font-['Outfit',sans-serif] absolute -right-2 -bottom-4 lg:-right-4 lg:-bottom-8">17</span>
          </div>
        </div>

        {/* Card 2: Clients */}
        <div className="bg-[#151515] rounded-[32px] p-6 lg:p-8 border border-white/5 flex flex-col justify-center items-center h-full min-h-[160px] lg:min-h-[220px] hover:border-[#00ff8f]/30 transition-all text-center">
          <span className="text-white text-5xl lg:text-6xl xl:text-7xl font-bold font-['Outfit',sans-serif] mb-2">
            2000+
          </span>
          <span className="text-[#bfbfbf] text-base lg:text-lg font-['Outfit',sans-serif]">Satisfied Clients</span>
        </div>

        {/* Card 3: Support */}
        <div className="bg-linear-to-br from-[#003d21] to-[#001a0f] rounded-[32px] p-6 lg:p-8 border border-[#00ff8f]/20 flex flex-col justify-center items-center h-full lg:row-span-2 hover:shadow-[0_0_40px_-10px_rgba(0,255,143,0.3)] transition-all text-center">
          <span className="text-white text-6xl lg:text-7xl xl:text-8xl font-bold font-['Outfit',sans-serif] mb-3 lg:mb-4">
            24/7
          </span>
          <span className="text-white/80 text-lg lg:text-xl font-['Poppins',sans-serif] font-medium mb-2">Emergency Support</span>
          <span className="text-white/60 text-xs lg:text-sm font-['Outfit',sans-serif]">Technical assistance always on standby</span>
        </div>

        {/* Card 4: Projects */}
        <div className="bg-[#0a0a0a] rounded-[32px] p-6 lg:p-8 border border-white/5 flex flex-col justify-between h-full min-h-[160px] lg:min-h-[220px] relative overflow-hidden group hover:border-[#00ff8f]/30 transition-all">
          <div className="relative z-10">
            <span className="text-white text-5xl lg:text-6xl font-bold font-['Outfit',sans-serif] block mb-2">
              10k+
            </span>
            <span className="text-[#bfbfbf] text-base lg:text-lg font-['Outfit',sans-serif]">Successful Projects</span>
          </div>
          
          <div className="absolute bottom-2 right-4 lg:bottom-4 lg:right-6 opacity-10">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-white lg:w-[120px] lg:h-[120px]">
              <path d="M12 2v20M2 12h20" />
              <path d="m4.93 4.93 14.14 14.14M4.93 19.07 19.07 4.93" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
