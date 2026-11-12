import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/common";
import { ArrowUpRight } from "lucide-react";

export function WishlistRecommendations() {
  const recommendations = [
    {
      kva: "30 kVA",
      label: "Commercial Standard",
      desc: "Restaurants, banks, and corporate branches in Nashik.",
    },
    {
      kva: "125 kVA",
      label: "Wedding & Grand Event",
      desc: "Acoustic silent enclosure ideal for lawn marriages & banquets.",
    },
    {
      kva: "250 kVA",
      label: "Industrial Heavyweight",
      desc: "Heavy manufacturing plants & infrastructure projects.",
    },
  ];

  return (
    <section className="py-20 sm:py-24 px-6 md:px-10 lg:px-[60px] bg-[#F3EFEA] border-t border-[#E8E2D9]">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <SectionHeading title="Most Requested Generator Capacities" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <Link
              key={rec.kva}
              href="/generators"
              className="p-6 sm:p-7 rounded-3xl bg-white border border-[#E8E2D9] hover:border-[#FF5500]/45 hover:shadow-[0_12px_36px_-12px_rgba(17,19,21,0.08)] transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-bold text-[#111315] font-sans group-hover:text-[#FF5500] transition-colors">
                  {rec.kva}
                </span>
                <h4 className="text-lg font-semibold text-[#111315] mt-2">
                  {rec.label}
                </h4>
                <p className="text-sm text-[#403C36] mt-1 font-sans leading-relaxed">
                  {rec.desc}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-xs text-[#FF5500] font-semibold">
                <span>View Fleet Models</span>
                <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
