import React from "react";
import { SectionHeading } from "@/components/common";
import { FAQAccordionClient } from "./FAQAccordionClient";

const FAQ_ITEMS = [
  { 
    question: "What is the maximum capacity available?", 
    answer: "We offer a wide range of silent DG sets from 5kVA up to 250kVA, suitable for everything from small events to major industrial plants." 
  },
  { 
    question: "Do you provide emergency services in Nashik?", 
    answer: "Yes, we offer 60-minute emergency response within Nashik city limits and same-day deployment across Maharashtra." 
  },
  { 
    question: "Are your generators eco-friendly?", 
    answer: "Our entire fleet is CPCB II / IV+ certified, ensuring low emissions and fuel efficiency while maintaining high performance." 
  },
];

export function FAQSection() {
  return (
    <section className="py-32 px-6 md:px-10 lg:px-[60px] bg-[#050505] relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto relative z-10">
        <div className="text-center mb-20">
          <SectionHeading 
            label="KNOWLEDGE BASE"
            title="Frequently Asked Questions"
          />
        </div>
        <FAQAccordionClient items={FAQ_ITEMS} />
      </div>
    </section>
  );
}
