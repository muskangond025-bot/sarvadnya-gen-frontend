import { TimelineClient, TimelineItem } from "./TimelineClient";

/**
 * Static timeline data for Sarvadnya Generators
 */
const timelineItems: TimelineItem[] = [
  {
    id: "founded",
    year: "2009",
    chapter: "Chapter one",
    title: "The Beginning",
    description:
      "Sarvadnya was founded in Nashik with a clear mission to provide dependable, affordable power backup. We started with one diesel generator serving local industrial shifts and wedding celebrations.",
    featured: false,
  },
  {
    id: "growth",
    year: "2014",
    chapter: "Chapter two",
    title: "Building Trust",
    description:
      "Expanded our fleet with soundproof canopy sets and began powering major construction sites, infrastructure projects, and flagship cultural events across the district.",
    featured: true,
  },
  {
    id: "reliability",
    year: "2019",
    chapter: "Chapter three",
    title: "Service Excellence",
    description:
      "Established 24/7 emergency technical dispatch, custom transport trailers, and celebrated our milestone of 1,000+ satisfied clients across Maharashtra with zero power failures.",
    featured: false,
  },
  {
    id: "current",
    year: "2024",
    chapter: "Chapter four",
    title: "Industry Leader",
    description:
      "Surpassing 10,000+ successful deployments with an acoustic-enclosed fleet ranging from 5 kVA to 250 kVA, CPCB-IV+ certified with multi-megawatt synchronization.",
    featured: true,
  },
  {
    id: "vision",
    year: "2029",
    chapter: "Chapter five",
    title: "Future Horizons",
    description:
      "Expanding active fleet hubs across all 36 districts of Maharashtra, introducing hybrid battery-diesel setups, telematics monitoring, and clean power innovations.",
    featured: false,
  },
];

/**
 * Timeline Component (Server)
 */
export function Timeline() {
  return <TimelineClient items={timelineItems} />;
}
