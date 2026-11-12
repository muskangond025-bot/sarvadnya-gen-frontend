import React from "react";

export function BookingHero() {
  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 pb-8 sm:pb-10 border-b border-[#E8E2D9]">
        {/* Headline */}
        <div>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#111315] tracking-tight leading-[1.06]">
            Book Your <span className="text-[#FF5500]">Power</span>
          </h1>
        </div>

        {/* Concise Description */}
        <div className="lg:max-w-lg">
          <p className="font-sans text-[#625D55] text-sm sm:text-base lg:text-lg leading-relaxed">
            Select your dates and specify your power requirements. Choose from our fleet of reliable{" "}
            <span className="text-[#111315] font-semibold">
              high-performance generators
            </span>{" "}
            for your project.
          </p>
        </div>
      </div>
    </section>
  );
}
