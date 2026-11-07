import React from "react";
import { FAQAccordionClient } from "./FAQAccordionClient";

const FAQ_ITEMS = [
  { 
    question: "What is the maximum capacity available?", 
    answer: "We offer a wide range of silent DG sets from 5kVA up to 250kVA, suitable for everything from small events to major industrial manufacturing facilities." 
  },
  { 
    question: "Do you provide emergency services in Nashik?", 
    answer: "Yes, we offer guaranteed 60-minute emergency response within Nashik city limits and same-day rapid deployment across Maharashtra." 
  },
  { 
    question: "Are your generators eco-friendly?", 
    answer: "Our entire fleet is CPCB II and CPCB-IV+ certified, ensuring ultra-low emissions, high fuel efficiency, and whisper-silent acoustic performance." 
  },
  {
    question: "What is included in the turnkey rental service?",
    answer: "Every rental package includes on-site logistics, professional commissioning, cable distribution, load testing, automated fuel support, and 24/7 technical operator coverage."
  }
];

/**
 * FAQSection Component
 * 
 * Re-architected to match Homepage FAQ layout:
 * - 2-Column layout: 3D Consultant & White Question Mark on left, FAQ Accordion in free space on right.
 * - Zero cards.
 * - Preserves all services FAQ data.
 */
export function FAQSection() {
  return (
    <section className="py-24 sm:py-32 px-6 md:px-10 lg:px-[60px] bg-transparent relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative z-10">
        <FAQAccordionClient items={FAQ_ITEMS} />
      </div>
    </section>
  );
}
