"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  Fuel,
  Volume2,
  Shield,
  X,
  Check,
  Zap,
  ChevronDown,
} from "lucide-react";
import { generatorsData } from "@/constants/data";
import { SectionHeading } from "@/components/common";

// ============================================
// SIMPLIFIED GENERATOR DATA FOR COMPARISON
// ============================================

// Filter only available generators and simplify data for customers
const AVAILABLE_GENERATORS = generatorsData
  .filter((gen) => gen.status !== "retired" && gen.status !== "maintenance")
  .map((gen) => ({
    id: gen.id,
    name: gen.name,
    brand: gen.brand,
    kva: gen.power_output_kva + " kVA",
    type: gen.type.charAt(0).toUpperCase() + gen.type.slice(1), // Capitalize
    pricePerDay: "₹" + parseInt(gen.daily_rate).toLocaleString("en-IN"),
    // Simplified specs for layman customers
    runtime: gen.runtime_hours_full_tank + " hours",
    fuelType: gen.fuel_type.charAt(0).toUpperCase() + gen.fuel_type.slice(1),
    noiseLevel: gen.noise_level_db + " dB",
    bestFor: gen.highlights?.[0] || "General use",
    hasAutoStart: gen.features?.some((f) => f.toLowerCase().includes("auto")),
    hasRemoteMonitoring: gen.features?.some((f) =>
      f.toLowerCase().includes("remote")
    ),
  }));

// Feature labels for comparison
const COMPARISON_FEATURES = [
  { key: "runtime", label: "How Long It Runs", icon: Clock },
  { key: "fuelType", label: "Fuel Type", icon: Fuel },
  { key: "noiseLevel", label: "Noise Level", icon: Volume2 },
  { key: "hasAutoStart", label: "Auto Start", icon: Zap },
  { key: "hasRemoteMonitoring", label: "Remote Monitoring", icon: Shield },
];

// ============================================
// CUSTOM SCROLLBAR STYLES
// ============================================

const scrollbarStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #00ff8f transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    height: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #00ff8f;
    border-radius: 10px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #00dd7a;
  }
`;

// ============================================
// GENERATOR SELECTOR DROPDOWN
// ============================================

function GeneratorDropdown({
  availableGenerators,
  onSelect,
  placeholder = "Select Generator",
}: {
  availableGenerators: typeof AVAILABLE_GENERATORS;
  onSelect: (id: string) => void;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-6 py-4 text-[18px] text-white/60 hover:text-[#00ff8f] font-['Outfit',sans-serif] transition-colors"
      >
        <span>{placeholder}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[300px] max-h-[400px] overflow-y-auto bg-[#1a1a1a] border border-white/10 rounded-xl z-50 custom-scrollbar shadow-xl">
          {availableGenerators.map((gen) => (
            <button
              key={gen.id}
              onClick={() => {
                onSelect(gen.id);
                setIsOpen(false);
              }}
              className="w-full text-left px-6 py-4 hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[18px] font-bold text-white font-['Poppins',sans-serif]">
                  {gen.kva}
                </span>
                <span className="text-[#00ff8f] text-[14px] font-['Outfit',sans-serif]">
                  {gen.brand} - {gen.type}
                </span>
                <span className="text-white/50 text-[14px] font-['Outfit',sans-serif]">
                  {gen.pricePerDay}/day
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export function GeneratorCompare() {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    AVAILABLE_GENERATORS[0]?.id || "",
    AVAILABLE_GENERATORS[2]?.id || "",
  ]);
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  const selectedGenerators = selectedIds
    .map((id) => AVAILABLE_GENERATORS.find((g) => g.id === id))
    .filter(Boolean) as typeof AVAILABLE_GENERATORS;

  // Get generators not yet selected
  const availableToAdd = AVAILABLE_GENERATORS.filter(
    (g) => !selectedIds.includes(g.id)
  );

  const addGenerator = (id: string) => {
    if (selectedIds.length < 3 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const removeGenerator = (id: string) => {
    if (selectedIds.length > 1) {
      setSelectedIds(selectedIds.filter((gid) => gid !== id));
    }
  };

  const replaceGenerator = (oldId: string, newId: string) => {
    setSelectedIds(selectedIds.map((id) => (id === oldId ? newId : id)));
  };

  const clearAll = () => {
    setSelectedIds([AVAILABLE_GENERATORS[0]?.id || ""]);
  };

  const getSpecValue = (gen: (typeof AVAILABLE_GENERATORS)[0], key: string) => {
    return gen[key as keyof typeof gen];
  };

  return (
    <>
      {/* Inject custom scrollbar styles */}
      <style dangerouslySetInnerHTML={{ __html: scrollbarStyles }} />

      <div className="w-full py-[100px] px-[60px]">
        {/* Header - Left aligned like Services.tsx */}
        <div className="max-w-[1440px] mx-auto">
          <SectionHeading
            label="Compare"
            title={
              <>
                Find the right
                <br />
                <span className="text-[#00ff8f]">generator for you</span>
              </>
            }
            align="left"
          />

          <p className="font-['Outfit',sans-serif] text-[#bfbfbf] text-[18px] leading-[1.6] max-w-[540px] mt-6 mb-12">
            Compare our generators side by side. We&apos;ve simplified the specs
            so you can easily choose what fits your needs.
          </p>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={highlightDifferences}
                onChange={(e) => setHighlightDifferences(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-12 h-6 rounded-full transition-colors ${
                  highlightDifferences ? "bg-[#00ff8f]" : "bg-white/20"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform mt-0.5 ${
                    highlightDifferences
                      ? "translate-x-6 ml-0.5"
                      : "translate-x-0.5"
                  }`}
                />
              </div>
              <span className="text-white text-[18px] font-['Outfit',sans-serif]">
                Highlight Differences
              </span>
            </label>

            <button
              onClick={clearAll}
              className="flex items-center gap-2 text-[#00ff8f] hover:text-white transition-colors font-['Outfit',sans-serif] text-[18px]"
            >
              <X className="w-5 h-5" />
              Clear All
            </button>
          </div>

          {/* Comparison Table with Custom Scrollbar */}
          <div className="overflow-x-auto custom-scrollbar pb-4 border border-white/20 rounded-xl">
            <table className="w-full">
              <thead>
                <tr className="">
                  <th className="text-left  py-8 px-6 text-white/50 font-['Outfit',sans-serif] font-medium text-[18px] w-64 sticky left-0 bg-black z-10">
                    Features
                  </th>
                  {selectedGenerators.map((gen) => (
                    <th
                      key={gen.id}
                      className="py-8 px-6 text-left min-w-[280px]"
                    >
                      <div className="flex flex-col gap-3 ">
                        <span className="text-[28px] font-bold text-white font-['Poppins',sans-serif]">
                          {gen.kva}
                        </span>
                        <span className="text-[#00ff8f] text-[18px] font-['Outfit',sans-serif]">
                          {gen.brand} - {gen.type}
                        </span>
                        <span className="text-white font-['Outfit',sans-serif] text-[20px]">
                          <span className="text-[#00ff8f] font-bold">
                            {gen.pricePerDay}
                          </span>
                          <span className="text-white/50">/day</span>
                        </span>

                        {/* Generator Selector */}
                        <div className="flex gap-4 mt-4">
                          <div className="relative">
                            <select
                              value={gen.id}
                              onChange={(e) =>
                                replaceGenerator(gen.id, e.target.value)
                              }
                              className="px-4 py-2 text-[16px] text-white bg-transparent font-['Outfit',sans-serif] cursor-pointer appearance-none pr-8"
                            >
                              {AVAILABLE_GENERATORS.map((g) => (
                                <option
                                  key={g.id}
                                  value={g.id}
                                  className="bg-black"
                                >
                                  {g.kva} - {g.brand}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                          </div>
                          <button
                            onClick={() => removeGenerator(gen.id)}
                            className="text-[16px] text-[#00ff8f] hover:text-white transition-colors font-['Outfit',sans-serif]"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                  {selectedIds.length < 3 && availableToAdd.length > 0 && (
                    <th className="py-8 px-6 text-left min-w-[280px]">
                      <GeneratorDropdown
                        availableGenerators={availableToAdd}
                        onSelect={addGenerator}
                        placeholder="+ Add Generator"
                      />
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((feature) => (
                  <tr key={feature.key}>
                    <td className="py-6 px-6 sticky left-0 bg-black z-10 ">
                      <div className="flex items-center gap-4 text-white/70">
                        <feature.icon className="w-5 h-5 text-[#00ff8f]" />
                        <span className="font-['Outfit',sans-serif] text-[18px]">
                          {feature.label}
                        </span>
                      </div>
                    </td>
                    {selectedGenerators.map((gen, idx) => {
                      const value = getSpecValue(gen, feature.key);
                      const firstValue =
                        selectedGenerators[0] &&
                        getSpecValue(selectedGenerators[0], feature.key);
                      const isDifferent =
                        highlightDifferences && idx > 0 && value !== firstValue;

                      return (
                        <td
                          key={gen.id}
                          className={` py-6 px-6 text-left ${
                            isDifferent ? "text-[#00ff8f]" : "text-white/80"
                          }`}
                        >
                          {typeof value === "boolean" ? (
                            value ? (
                              <Check className="w-6 h-6 text-[#00ff8f]" />
                            ) : (
                              <X className="w-6 h-6 text-white/30" />
                            )
                          ) : (
                            <span className="font-['Outfit',sans-serif] text-[18px]">
                              {String(value)}
                            </span>
                          )}
                        </td>
                      );
                    })}
                    {selectedIds.length < 3 && availableToAdd.length > 0 && (
                      <td className="py-6 px-6 text-left text-white/20 text-[18px]">
                        —
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Scroll indicator */}
          <div className="flex items-center gap-2 mt-4 text-white/40 text-[14px] font-['Outfit',sans-serif]">
            <span>←</span>
            <span>Scroll to compare</span>
            <span>→</span>
          </div>

          {/* Quotation Section */}
          <div className="mt-[100px]">
            <SectionHeading
              label="Get a Quote"
              title={
                <>
                  Need help
                  <br />
                  <span className="text-[#00ff8f]">choosing?</span>
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
              <Link href="/contact" className="px-[30px] py-[15px] bg-[#00ff8f] hover:bg-[#00dd7a] text-black font-semibold rounded-[8px] transition-colors font-['Outfit',sans-serif] text-[18px]">
                Request Custom Quote
              </Link>
              <a href="tel:+919876543210" className="px-[30px] py-[15px] text-[#00ff8f] hover:text-white transition-colors font-['Outfit',sans-serif] text-[18px] border border-[#00ff8f] hover:border-white">
                Talk to an Expert
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GeneratorCompare;
