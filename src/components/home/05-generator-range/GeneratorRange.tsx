import {
  GeneratorRangeClient,
  GeneratorItem,
} from "./GeneratorRangeClient";
import { GENERATOR_IMAGES } from "@/constants";
// Icon imports removed - using string identifiers now

/**
 * Static generators data
 */
const GENERATORS_DATA: GeneratorItem[] = [
  {
    id: "gen-5",
    badge: "5 kVA",
    series: "Entry Series",
    title: "5 kVA Generator",
    description:
      "Suitable for homes, small shops, and basic power backup needs.",
    icon: "Zap",
    image: GENERATOR_IMAGES.entry_5kva,
    specs: [
      { label: "Power", value: "5 kVA", icon: "Zap" },
      { label: "Phase", value: "Single", icon: "CircleDot" },
      { label: "Fuel", value: "Petrol/Diesel", icon: "Fuel" },
      { label: "Noise", value: "Low", icon: "Volume2" },
    ],
    features: [
      {
        title: "Compact & Portable",
        description: "Easy to transport and install",
      },
      {
        title: "Low Noise Operation",
        description: "Quiet for residential areas",
      },
      { title: "Fuel Efficient", description: "Optimized consumption" },
      { title: "Easy Maintenance", description: "Simple servicing" },
    ],
  },
  {
    id: "gen-30",
    badge: "30 kVA",
    series: "Mid-Range Series",
    title: "30 kVA Generator",
    description:
      "Reliable solution for clinics, retail stores, and small industries.",
    icon: "Settings",
    image: GENERATOR_IMAGES.midRange_30kva,
    specs: [
      { label: "Power", value: "30 kVA", icon: "Zap" },
      { label: "Phase", value: "Three", icon: "CircleDot" },
      { label: "Fuel", value: "Diesel", icon: "Fuel" },
      { label: "Noise", value: "Medium", icon: "Volume2" },
    ],
    features: [
      { title: "Auto Start", description: "Automatic power transfer" },
      { title: "Digital Control", description: "Easy monitoring" },
      { title: "Overload Protection", description: "Built-in safety" },
      { title: "Extended Runtime", description: "Large fuel tank" },
    ],
  },
  {
    id: "gen-65",
    badge: "65 kVA",
    series: "Commercial Series",
    title: "65 kVA Generator",
    description: "Ideal for offices, restaurants, and medium commercial usage.",
    icon: "Building2",
    image: GENERATOR_IMAGES.commercial_65kva,
    specs: [
      { label: "Power", value: "65 kVA", icon: "Zap" },
      { label: "Phase", value: "Three", icon: "CircleDot" },
      { label: "Fuel", value: "Diesel", icon: "Fuel" },
      { label: "Noise", value: "Medium", icon: "Volume2" },
    ],
    features: [
      { title: "Heavy Duty Engine", description: "Continuous commercial use" },
      { title: "Remote Monitoring", description: "Track from anywhere" },
      { title: "Load Management", description: "Intelligent distribution" },
      { title: "Weather Resistant", description: "Outdoor design" },
    ],
  },
  {
    id: "gen-125",
    badge: "125 kVA",
    series: "Industrial Series",
    title: "125 kVA Generator",
    description: "Designed for factories and continuous power applications.",
    icon: "Factory",
    image: GENERATOR_IMAGES.industrial_125kva,
    specs: [
      { label: "Power", value: "125 kVA", icon: "Zap" },
      { label: "Phase", value: "Three", icon: "CircleDot" },
      { label: "Fuel", value: "Diesel", icon: "Fuel" },
      { label: "Noise", value: "Standard", icon: "Volume2" },
    ],
    features: [
      { title: "Industrial Grade", description: "24/7 operations" },
      { title: "Peak Load Handling", description: "Manages power surges" },
      { title: "Redundant Systems", description: "Backup mechanisms" },
      { title: "On-site Support", description: "Technical assistance" },
    ],
  },
  {
    id: "gen-250",
    badge: "250 kVA",
    series: "Heavy Industrial Series",
    title: "250 kVA Generator",
    description: "High-capacity generator for hospitals and large facilities.",
    icon: "Power",
    image: GENERATOR_IMAGES.heavyIndustrial_250kva,
    specs: [
      { label: "Power", value: "250 kVA", icon: "Zap" },
      { label: "Phase", value: "Three", icon: "CircleDot" },
      { label: "Fuel", value: "Diesel", icon: "Fuel" },
      { label: "Noise", value: "Standard", icon: "Volume2" },
    ],
    features: [
      { title: "Medical Grade", description: "Hospital critical systems" },
      { title: "Instant Switchover", description: "Zero interruption" },
      { title: "Parallel Operation", description: "Combine with other units" },
      { title: "Priority Support", description: "24/7 emergency team" },
    ],
  },
  {
    id: "gen-300",
    badge: "300 kVA",
    series: "Enterprise Series",
    title: "300 kVA Generator",
    description:
      "Maximum power output for critical and large-scale operations.",
    icon: "Cpu",
    image: GENERATOR_IMAGES.enterprise_300kva,
    specs: [
      { label: "Power", value: "300 kVA", icon: "Zap" },
      { label: "Phase", value: "Three", icon: "CircleDot" },
      { label: "Fuel", value: "Diesel", icon: "Fuel" },
      { label: "Noise", value: "Low (Enclosed)", icon: "Volume2" },
    ],
    features: [
      { title: "Enterprise Ready", description: "Data centers & campuses" },
      { title: "Smart Grid", description: "Syncs with power systems" },
      { title: "Extended Warranty", description: "Comprehensive coverage" },
      { title: "Account Manager", description: "Personalized service" },
    ],
  },
];

/**
 * GeneratorRange Component (Server)
 *
 * Generator carousel section - passes static data to client for interactions.
 */
export function GeneratorRange() {
  return (
    <section className="w-full min-h-[100dvh] flex flex-col justify-center bg-black relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-px bg-white/[0.02]" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.02]" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-white/[0.02]" />
      </div>

      <div className="relative z-10 w-full flex flex-col justify-center">
        <GeneratorRangeClient generators={GENERATORS_DATA} />
      </div>
    </section>
  );
}
