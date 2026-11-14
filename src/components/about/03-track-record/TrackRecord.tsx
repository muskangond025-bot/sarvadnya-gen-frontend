import React from "react";

/**
 * TrackRecord Component (Server)
 *
 * Ultra-Premium Operational Impact Section:
 * - Zero text pill badges, zero decorative fluff or placeholder data
 * - Symmetric, architectural 4-column luxury metric architecture
 * - Pure typographic hierarchy with crisp hairline borders (#E8E2D9)
 */
export function TrackRecord() {
  const stats = [
    {
      value: "17+",
      label: "Years Experience",
      desc: "Continuous silent power rental operations across Maharashtra since 2009.",
    },
    {
      value: "2,000+",
      label: "Satisfied Clients",
      desc: "Trusted by premier industrial plants, wedding venues, and corporate enterprises.",
    },
    {
      value: "24/7",
      label: "Emergency Support",
      desc: "Immediate on-site technical dispatch with active standby backup readiness.",
    },
    {
      value: "10,000+",
      label: "Successful Deployments",
      desc: "Proven track record of zero critical downtime power operations delivered.",
    },
  ];

  return (
    <section className="w-full py-20 sm:py-28 px-4 sm:px-6 lg:px-12 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        
        {/* Title Block (Zero Pill Badges) */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111315] font-['Poppins',sans-serif] tracking-tight leading-[1.12]">
            Driven by Reliability, <br className="hidden sm:inline" />
            <span className="text-[#FF5500]">Measured by Results.</span>
          </h2>
        </div>

        {/* 4-Pillar Luxury Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-[#E8E2D9] shadow-xs hover:border-[#FF5500]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#111315] tracking-tight font-['Poppins',sans-serif] block group-hover:text-[#FF5500] transition-colors">
                  {stat.value}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-[#111315] mt-4 font-['Poppins',sans-serif]">
                  {stat.label}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#625D55] font-['Outfit',sans-serif] mt-2 leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
