import { TimelineClient, TimelineItem } from "./TimelineClient";

/**
 * Static timeline data
 */
const timelineItems: TimelineItem[] = [
  {
    id: "founded",
    year: "2009",
    title: "The Beginning",
    description:
      "Founded with a mission to provide dependable power backup. Started with just one diesel generator serving local needs.",
    featured: false,
  },
  {
    id: "growth",
    year: "2014",
    title: "Building Trust",
    description:
      "Expanded our fleet and started serving major construction sites and events across Nashik.",
    featured: true,
  },
  {
    id: "reliability",
    year: "2019",
    title: "Service Excellence",
    description:
      "Established 24/7 emergency technical support and reached a milestone of 1000+ satisfied clients.",
    featured: false,
  },
  {
    id: "current",
    year: "2024",
    title: "Industry Leader",
    description:
      "Managing 10,000+ successful projects with a diverse fleet ranging from 5 kVA to 125 kVA.",
    featured: true,
  },
  {
    id: "vision",
    year: "2029",
    title: "Future Vision",
    description:
      "Expanding fleet capacity across Maharashtra and introducing advanced, fuel-efficient power systems.",
    featured: false,
  },
];

/**
 * Timeline Component (Server)
 *
 * Passes static data to client for GSAP animations.
 */
export function Timeline() {
  return <TimelineClient items={timelineItems} />;
}
