import {
  GeneratorRangeClient,
  GeneratorItem,
} from "./GeneratorRangeClient";
import { GENERATOR_IMAGES } from "@/constants";

/**
 * Static generators data enriched with clear real-world application matching
 */
const GENERATORS_DATA: GeneratorItem[] = [
  {
    id: "gen-5",
    badge: "5 kVA",
    series: "Entry Series",
    title: "5 kVA Silent Generator",
    description:
      "Compact soundproof power unit designed for residential backup, small retail shops, and private functions requiring clean single-phase power with minimal space footprint.",
    application: "Homes, Boutiques & Private Functions",
    recommendedLoads: "Lighting rigs, sound gear, refrigeration & essential circuits",
    icon: "Zap",
    image: GENERATOR_IMAGES.entry_5kva,
    specs: [
      { label: "Rated Capacity", value: "5 kVA / 4 kW", icon: "Zap" },
      { label: "Output Voltage", value: "230V Single Phase / 50 Hz", icon: "CircleDot" },
      { label: "Fuel System", value: "Diesel / High Efficiency", icon: "Fuel" },
      { label: "Acoustic Standard", value: "CPCB-II Silent (< 75 dBA)", icon: "Volume2" },
    ],
    features: [
      { title: "Compact & Portable", description: "Easy to transport and position in tight spaces" },
      { title: "Low Noise Operation", description: "Acoustic canopy suitable for residential neighborhoods" },
      { title: "Fuel Efficient", description: "Optimized hourly fuel consumption under partial load" },
      { title: "Turnkey Setup", description: "Supplied with safe distribution board and earthing" },
    ],
  },
  {
    id: "gen-30",
    badge: "30 kVA",
    series: "Mid-Range Series",
    title: "30 kVA Silent Generator",
    description:
      "Workhorse unit for healthcare clinics, retail restaurants, and medium outdoor celebrations. Provides stable 3-phase voltage with integrated automatic safety cutoffs.",
    application: "Clinics, Restaurants & Medium Gatherings",
    recommendedLoads: "Commercial AC units, kitchen appliances & stage lighting",
    icon: "Settings",
    image: GENERATOR_IMAGES.midRange_30kva,
    specs: [
      { label: "Rated Capacity", value: "30 kVA / 24 kW", icon: "Zap" },
      { label: "Output Voltage", value: "415V 3-Phase / 230V Single", icon: "CircleDot" },
      { label: "Fuel System", value: "Heavy-Duty Diesel Engine", icon: "Fuel" },
      { label: "Acoustic Standard", value: "CPCB-II Silent Enclosure", icon: "Volume2" },
    ],
    features: [
      { title: "Auto Mains Failure", description: "Automatic changeover switchgear support" },
      { title: "Digital Controller", description: "Real-time voltage, frequency, and load telemetry" },
      { title: "Inrush Handling", description: "Copes with inductive motor starting surges" },
      { title: "Continuous Tank", description: "Extended runtime fuel reservoir for uninterrupted shifts" },
    ],
  },
  {
    id: "gen-65",
    badge: "65 kVA",
    series: "Commercial Series",
    title: "65 kVA Commercial Generator",
    description:
      "Purpose-built for banquet halls, multi-cuisine catering facilities, and commercial commercial complexes requiring dependable continuous power during wedding season or grid shutdowns.",
    application: "Banquet Halls, Lawns & Commercial Offices",
    recommendedLoads: "Multiple 2-ton tower ACs, large audio walls & cold storage",
    icon: "Building2",
    image: GENERATOR_IMAGES.commercial_65kva,
    specs: [
      { label: "Rated Capacity", value: "65 kVA / 52 kW", icon: "Zap" },
      { label: "Output Voltage", value: "415V 3-Phase True Sine Wave", icon: "CircleDot" },
      { label: "Fuel System", value: "Turbocharged Diesel Engine", icon: "Fuel" },
      { label: "Acoustic Standard", value: "CPCB-II Acoustic Weatherproof Canopy", icon: "Volume2" },
    ],
    features: [
      { title: "Heavy Commercial Duty", description: "Engineered for 12+ hour continuous high-load runs" },
      { title: "Clean Sine Wave", description: "Zero harmonic distortion for delicate LED video walls" },
      { title: "Load Balancing", description: "Even distribution across all three operational phases" },
      { title: "Weatherproof Steel", description: "All-weather outdoor canopy with locked access panels" },
    ],
  },
  {
    id: "gen-125",
    badge: "125 kVA",
    series: "Industrial Series",
    title: "125 kVA Industrial Generator",
    description:
      "The premier choice for grand wedding lawns, industrial process plants, and high-wattage concerts. Features high motor starting capability and rigorous voltage regulation.",
    application: "Grand Weddings, Lawns & Industrial Plants",
    recommendedLoads: "Heavy chillers, extensive stage lighting, cranes & production lines",
    icon: "Factory",
    image: GENERATOR_IMAGES.industrial_125kva,
    specs: [
      { label: "Rated Capacity", value: "125 kVA / 100 kW", icon: "Zap" },
      { label: "Output Voltage", value: "415V 3-Phase / 50 Hz ±0.5%", icon: "CircleDot" },
      { label: "Fuel System", value: "Multi-Cylinder Industrial Diesel", icon: "Fuel" },
      { label: "Acoustic Standard", value: "CPCB-II Heavy Acoustic Soundproofing", icon: "Volume2" },
    ],
    features: [
      { title: "100% Prime Continuous", description: "Meets ISO 8528 industrial prime power standards" },
      { title: "Heavy Surge Capacity", description: "Handles high starting currents of industrial motors" },
      { title: "Dual AMF Integration", description: "Seamless automatic grid-to-generator transfer" },
      { title: "On-Site Operator", description: "Supplied with dedicated technician for live supervision" },
    ],
  },
  {
    id: "gen-250",
    badge: "250 kVA",
    series: "Heavy Industrial Series",
    title: "250 kVA Prime Power Station",
    description:
      "High-output power station engineered for healthcare hospitals, major industrial shutdowns, and multi-acre outdoor festivals where power interruption is not an option.",
    application: "Hospitals, Mega Expos & Infrastructure Projects",
    recommendedLoads: "Central HVAC chillers, medical facilities, cranes & plant substations",
    icon: "Power",
    image: GENERATOR_IMAGES.heavyIndustrial_250kva,
    specs: [
      { label: "Rated Capacity", value: "250 kVA / 200 kW", icon: "Zap" },
      { label: "Output Voltage", value: "415V 3-Phase / 50 Hz", icon: "CircleDot" },
      { label: "Fuel System", value: "Heavy Industrial Turbo Diesel", icon: "Fuel" },
      { label: "Acoustic Standard", value: "Heavy-Gauge Sound-Attenuated Enclosure", icon: "Volume2" },
    ],
    features: [
      { title: "Critical Standby", description: "Meets strict reliability thresholds for medical and data facilities" },
      { title: "Synchronization Ready", description: "Can parallel with second DG set for N+1 redundancy" },
      { title: "Large Capacity Tank", description: "24-hour continuous run without requiring mid-shift refueling" },
      { title: "Turnkey Cabling", description: "Includes heavy aluminum/copper cables and distribution boxes" },
    ],
  },
  {
    id: "gen-300",
    badge: "300 kVA",
    series: "Enterprise Series",
    title: "300 kVA Enterprise Power Station",
    description:
      "Maximum continuous fleet output for large-scale manufacturing campuses, multi-day music festivals, and infrastructure developments across Maharashtra.",
    application: "Heavy Manufacturing, Expos & Multi-Megawatt Grids",
    recommendedLoads: "Continuous plant-wide operations, high-voltage transformers & multi-stage festivals",
    icon: "Cpu",
    image: GENERATOR_IMAGES.enterprise_300kva,
    specs: [
      { label: "Rated Capacity", value: "300 kVA / 240 kW", icon: "Zap" },
      { label: "Output Voltage", value: "415V 3-Phase / 50 Hz", icon: "CircleDot" },
      { label: "Fuel System", value: "Electronic Governor Turbo Diesel", icon: "Fuel" },
      { label: "Acoustic Standard", value: "CPCB-II Master Acoustic Canopy", icon: "Volume2" },
    ],
    features: [
      { title: "Plant-Wide Prime", description: "Sufficient capacity to sustain complete industrial production lines" },
      { title: "Digital Sync Bus", description: "Direct synchronization with on-site transformers or secondary DG sets" },
      { title: "24/7 Breakdown Crew", description: "Priority emergency backup unit and dedicated field engineers" },
      { title: "Custom Busbar Rigging", description: "Engineered cabling tailored to your main switchgear panel" },
    ],
  },
];

/**
 * GeneratorRange Component (Server Component)
 *
 * Renders the fleet spectrum section on the warm light architectural background.
 */
export function GeneratorRange() {
  return (
    <section className="w-full bg-[#FAF8F5] border-b border-[#E8E2D9] relative overflow-hidden">
      <div className="relative z-10 w-full">
        <GeneratorRangeClient generators={GENERATORS_DATA} />
      </div>
    </section>
  );
}
