import React from "react";
import Link from "next/link";
import { SectionHeading } from "@/components/common";
import { ArrowUpRight } from "lucide-react";

export function WishlistRecommendations() {
  const recommendations = [
    { kva: "30 kVA", label: "Commercial Standard", desc: "Restaurants, banks, and corporate branches in Nashik." },
    { kva: "125 kVA", label: "Wedding & Grand Event", desc: "Acoustic silent enclosure ideal for lawn marriages & banquets." },
    { kva: "250 kVA", label: "Industrial Heavyweight", desc: "Heavy manufacturing plants & infrastructure projects." },
  ];

  return (
    <section className="py-24 px-6 md:px-10 lg:px-[60px] bg-[#050505] border-t border-white/5">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <SectionHeading
            label="RECOMMENDED ALTERNATIVES"
            title="Most Requested Generator Capacities"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((rec) => (
            <Link
              key={rec.kva}
              href="/generators"
              className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#00ff8f]/30 hover:bg-white/[0.04] transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-bold text-white font-['Poppins',sans-serif] group-hover:text-[#00ff8f] transition-colors">
                  {rec.kva}
                </span>
                <h4 className="text-lg font-semibold text-white/90 mt-2">{rec.label}</h4>
                <p className="text-sm text-white/50 mt-1 font-['Outfit',sans-serif]">{rec.desc}</p>
              </div>
              <div className="mt-6 flex items-center gap-1 text-xs text-[#00ff8f] font-semibold">
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
