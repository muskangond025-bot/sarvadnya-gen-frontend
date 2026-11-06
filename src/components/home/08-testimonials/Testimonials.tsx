import React from "react";
import { TestimonialsClient, FAQItem } from "./TestimonialsClient";

/**
 * Testimonials Component (Server Component)
 * 
 * Re-architected in accordance with:
 * - docs/brain.md Rule 11 (Never manufacture fake customer reviews or ratings)
 * - docs/ui-rules.md Section 13 & 14 (Replace empty/fake testimonials with verified rental FAQs and operational guidance)
 */
export function Testimonials() {
  const faqs: FAQItem[] = [
    {
      question: "How do I choose between 5 kVA and 250 kVA for my application?",
      answer:
        "Capacity depends on total wattage plus starting surges of motors, air conditioners, sound rigs, or industrial pumps. Our team calculates your combined starting and running loads to recommend the optimal kVA rating so your event runs seamlessly without overpaying.",
      category: "Load Sizing & kVA",
    },
    {
      question: "Are your silent generators allowed in residential wedding venues?",
      answer:
        "Yes. All our event generators are housed in CPCB-II compliant acoustic canopies designed to maintain minimal sound levels, making them fully compliant with residential and banquet noise regulations in Nashik and Maharashtra.",
      category: "Acoustic Compliance",
    },
    {
      question: "Do you supply connecting cables and on-site operators?",
      answer:
        "Yes. Every rental package can include heavy-duty copper main cables, distribution switchgear, and a trained DG technician who remains on-site to handle startup, continuous load balancing, and refueling.",
      category: "Technical Logistics",
    },
    {
      question: "What locations are covered for generator rental?",
      answer:
        "We are headquartered in Nashik, Maharashtra, and regularly dispatch rental units across Nashik district, MIDC industrial zones (Ambad, Satpur, Sinnar), and surrounding districts across Maharashtra based on project timeline.",
      category: "Regional Coverage",
    },
  ];

  return <TestimonialsClient faqs={faqs} />;
}
