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
    <div className="w-full py-[100px] px-[60px]">
      <div className="max-w-[1440px] mx-auto">
        {/* Static Header */}
        <SectionHeading
          label="Compare"
          title={
            <>
              Find the right
              <br />
              <span className="text-brand-green">generator for you</span>
            </>
          }
          align="left"
        />

        {/* Static Description */}
        <p className="font-['Outfit',sans-serif] text-[#bfbfbf] text-[18px] leading-[1.6] max-w-[540px] mt-6 mb-12">
          Compare our generators side by side. We&apos;ve simplified the specs
          so you can easily choose what fits your needs.
        </p>

        {/* Dynamic Client Component */}
        <GeneratorCompareClient generators={availableGenerators} />

        {/* Static Quotation Section */}
        <div className="mt-[100px]">
          <SectionHeading
            label="Get a Quote"
            title={
              <>
                Need help
                <br />
                <span className="text-brand-green">choosing?</span>
              </>
            }
            align="left"
          />
          <p className="font-['Outfit',sans-serif] text-[#bfbfbf] text-[18px] leading-[1.6] max-w-[540px] mt-6 mb-10">
            Not sure which generator is right for you? Tell us about your
            requirements and our experts will create a personalized quotation
            for you.
          </p>
          <div className="flex flex-wrap gap-6">
            <button className="px-[30px] py-[15px] bg-brand-green hover:bg-brand-green-dark text-black font-semibold rounded-[8px] transition-colors font-['Outfit',sans-serif] text-[18px]">
              Request Custom Quote
            </button>
            <button className="px-[30px] py-[15px] text-brand-green hover:text-white transition-colors font-['Outfit',sans-serif] text-[18px]">
              Talk to an Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
