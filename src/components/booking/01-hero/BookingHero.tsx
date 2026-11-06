import React from "react";

export function BookingHero() {
  return (
    <section className="pt-32 pb-24 px-6 md:px-10 lg:px-[60px] max-w-[1440px] mx-auto relative overflow-hidden">
      {/* Background Atmospheric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#00ff8f]/[0.05] blur-[120px] rounded-full" />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-20">
        {/* Left Column: Massive Title */}
        <div className="flex-1">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white font-['Poppins',sans-serif] leading-[0.9] tracking-tighter">
            Book Your <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-[#00ff8f] to-white bg-[length:200%_auto] animate-shimmer">
              Power
            </span>
          </h1>
        </div>

        {/* Right Column: Refined Description & Trust Badge */}
        <div className="lg:max-w-[450px] space-y-8">
          <div className="flex items-center gap-3">
            <div className="size-2 rounded-full bg-[#00ff8f] animate-pulse shadow-[0_0_10px_#00ff8f]" />
            <span className="text-[#00ff8f] font-['Outfit',sans-serif] text-sm font-bold uppercase tracking-[0.2em]">
              Live Fleet Status: Active
            </span>
          </div>
          
          <p className="text-[#bfbfbf] font-['Outfit',sans-serif] text-xl md:text-2xl font-light leading-relaxed">
            Select your dates and specify your power requirements. Our intelligent system will match you with the <span className="text-white font-medium">perfect high-performance generator</span> for your project.
          </p>

          <div className="pt-4 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="size-10 rounded-full border-2 border-black bg-white/10 backdrop-blur-md" />
              ))}
            </div>
            <p className="text-white/40 text-sm font-['Outfit',sans-serif]">
              Joined by <span className="text-white font-bold">2,000+</span> satisfied clients
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Line */}
      <div className="mt-20 w-full h-px bg-linear-to-r from-white/10 via-white/5 to-transparent" />
    </section>
  );
}
