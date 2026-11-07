import { GeneratorCompareClient } from "./GeneratorCompareClient";
import { SectionHeading } from "@/components/common";
import { generatorsData } from "@/constants/data";

/**
 * Generator Compare Server Component
 *
 * Renders static content (headings, descriptions) and passes data to client component
 */
export function GeneratorCompare() {
  // Filter available generators
  const availableGenerators = generatorsData
    .filter((gen) => gen.status !== "retired" && gen.status !== "maintenance")
    .map((gen) => ({
      id: gen.id,
      name: gen.name,
      brand: gen.brand,
      kva: gen.power_output_kva + " kVA",
      type: gen.type.charAt(0).toUpperCase() + gen.type.slice(1),
      pricePerDay: "₹" + parseInt(gen.daily_rate).toLocaleString("en-IN"),
      runtime: gen.runtime_hours_full_tank + " hours",
      fuelType: gen.fuel_type.charAt(0).toUpperCase() + gen.fuel_type.slice(1),
      noiseLevel: gen.noise_level_db + " dB",
      bestFor: gen.highlights?.[0] || "General use",
      hasAutoStart: gen.features?.some((f) => f.toLowerCase().includes("auto")),
      hasRemoteMonitoring: gen.features?.some((f) =>
        f.toLowerCase().includes("remote")
      ),
    }));

  return (
    <div className="w-full py-16 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-[60px]">
      <div className="max-w-[1440px] mx-auto">
        {/* Static Header */}
        <SectionHeading
          title={
            <>
              Find the right
              <br />
              <span className="text-[#FF5500]">generator for you</span>
            </>
          }
          align="left"
        />

        {/* Static Description */}
        <p className="font-['Outfit',sans-serif] text-[#625D55] text-[18px] leading-[1.6] max-w-[540px] mt-6 mb-12">
          Compare our generators side by side. We&apos;ve simplified the specs
          so you can easily choose what fits your needs.
        </p>

        {/* Dynamic Client Component */}
        <GeneratorCompareClient generators={availableGenerators} />

        {/* Static Quotation Section */}
        <div className="mt-[100px]">
          <SectionHeading
            title={
              <>
                Need help
                <br />
                <span className="text-[#FF5500]">choosing?</span>
              </>
            }
            align="left"
          />
          <p className="font-['Outfit',sans-serif] text-[#625D55] text-[18px] leading-[1.6] max-w-[540px] mt-6 mb-10">
            Not sure which generator is right for you? Tell us about your
            requirements and our experts will create a personalized quotation
            for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 sm:gap-6 w-full sm:w-auto">
            <a 
              href="/contact" 
              className="px-6 sm:px-[30px] py-3.5 sm:py-[15px] bg-[#FF5500] hover:bg-[#E04400] text-white font-semibold rounded-[8px] transition-colors font-['Outfit',sans-serif] text-base sm:text-[18px] shadow-sm inline-block text-center w-full sm:w-auto"
            >
              Request Custom Quote
            </a>
            <a 
              href="tel:+916262629944" 
              className="px-6 sm:px-[30px] py-3.5 sm:py-[15px] bg-white border border-[#E8E2D9] text-[#111315] hover:text-[#FF5500] hover:border-[#FF5500]/50 transition-colors font-['Outfit',sans-serif] text-base sm:text-[18px] rounded-[8px] inline-block shadow-xs text-center w-full sm:w-auto"
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
