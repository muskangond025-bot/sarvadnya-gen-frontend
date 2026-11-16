import { GeneratorCompareClient } from "./GeneratorCompareClient";
import { SectionHeading } from "@/components/common";
import { generatorsData } from "@/constants/data";
import { ArrowRight, PhoneCall } from "lucide-react";

/**
 * Generator Compare Server Component
 *
 * Renders the comparative fleet overview header, passes available generators to
 * the interactive side-by-side matrix, and anchors the custom sizing consultation strip.
 */
export function GeneratorCompare() {
  const availableGenerators = generatorsData
    .filter((gen) => gen.status !== "retired" && gen.status !== "maintenance")
    .map((gen) => ({
      id: gen.id,
      name: gen.name,
      brand: gen.brand,
      kva: `${parseFloat(gen.power_output_kva)} kVA`,
      type: gen.type.charAt(0).toUpperCase() + gen.type.slice(1),
      pricePerDay: "₹" + parseInt(gen.daily_rate, 10).toLocaleString("en-IN"),
      runtime: `${parseFloat(gen.runtime_hours_full_tank)} hours`,
      fuelType: gen.fuel_type.charAt(0).toUpperCase() + gen.fuel_type.slice(1),
      noiseLevel: `${parseFloat(gen.noise_level_db)} dB`,
      bestFor: gen.highlights?.[0] || "General use",
      hasAutoStart: gen.features?.some((f) => f.toLowerCase().includes("auto")),
      hasRemoteMonitoring: gen.features?.some((f) =>
        f.toLowerCase().includes("remote")
      ),
    }));

  return (
    <section
      id="compare"
      className="w-full py-10 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-[60px] bg-[#FAF8F5] border-t border-[#E8E2D9]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Editorial Matrix Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-6 mb-6 sm:mb-12">
          <div>
            <SectionHeading
              title={
                <>
                  Find the right{" "}
                  <span className="text-[#FF5500]">generator for you</span>
                </>
              }
              align="left"
            />
            <p className="font-sans text-[#625D55] text-sm sm:text-lg leading-relaxed max-w-2xl mt-2 sm:mt-3">
              Compare our generators side by side. We&apos;ve simplified the specs
              so you can easily choose what fits your needs.
            </p>
          </div>
        </div>

        {/* Interactive Side-by-Side Comparison Matrix */}
        <GeneratorCompareClient generators={availableGenerators} />

        {/* Architectural Consultation Strip */}
        <div className="mt-14 sm:mt-20 relative rounded-2xl sm:rounded-3xl bg-[#18181B] text-white p-7 sm:p-10 lg:p-12 overflow-hidden shadow-[0_24px_60px_rgba(24,24,27,0.12)]">
          {/* Subtle Ambient Orange Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#FF5500]/20 blur-[100px]"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-2xl">
              <h3 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight">
                Need help{" "}
                <span className="text-[#FF5500]">choosing?</span>
              </h3>
              <p className="font-sans text-white/70 text-sm sm:text-base lg:text-lg leading-relaxed mt-3">
                Not sure which generator is right for you? Tell us about your
                requirements and our experts will create a personalized quotation
                for you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-[#FF5500]/25 group whitespace-nowrap"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="tel:+916262629944"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white hover:text-[#18181B] text-white border border-white/15 font-bold text-sm sm:text-base transition-all whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4 text-[#FF5500]" />
                <span>Talk to an Expert</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
