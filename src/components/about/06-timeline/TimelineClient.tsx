"use client";

import React, { useRef } from "react";
import { SectionHeading } from "@/components/common";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { cn } from "@/lib/utils";
gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string;
  featured: boolean;
}

interface TimelineClientProps {
  items: TimelineItem[];
}

/**
 * TimelineClient Component
 *
 * GSAP scroll-driven timeline with pinned panel.
 */
export function TimelineClient({ items }: TimelineClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const timelineContentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const panel = panelRef.current;
      const dot = dotRef.current;
      const line = lineRef.current;
      const timelineContent = timelineContentRef.current;

      if (!container || !panel || !dot || !line || !timelineContent) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=300%",
          pin: panel,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.to(dot, { top: "90%", ease: "none", duration: 1 }, 0);
      tl.to(line, { height: "90%", ease: "none", duration: 1 }, 0);
      tl.to(timelineContent, { y: "-60%", ease: "none", duration: 1 }, 0);

      const itemElements = timelineContent.querySelectorAll(".timeline-item");
      itemElements.forEach((item, index) => {
        const startTime = index * 0.15;
        tl.fromTo(
          item,
          { opacity: 0.15, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" },
          startTime
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={panelRef}
        className="h-screen w-full flex flex-col items-center justify-start pt-16 bg-black overflow-hidden"
      >
        <SectionHeading
          label="OUR JOURNEY"
          title={
            <>
              Milestones of <span className="text-[#00ff8f]">Excellence</span>
            </>
          }
        />

        <div
          className="relative w-full max-w-6xl flex-1 mt-8 px-8 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)",
          }}
        >
          <div className="absolute left-4 md:left-1/2 top-0 h-full w-1 bg-white/10 transform md:-translate-x-1/2" />
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 w-1 bg-[#00ff8f] transform md:-translate-x-1/2"
            style={{ height: "0%" }}
          />
          <div
            ref={dotRef}
            className="absolute left-4 md:left-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#00ff8f] z-30 transform md:-translate-x-1/2 -translate-y-1/2 shadow-[0_0_50px_rgba(0,255,143,1)]"
            style={{ top: "5%" }}
          />

          <div
            ref={timelineContentRef}
            className="relative flex flex-col gap-16 md:gap-20 py-16"
          >
            {items.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={cn(
                    "timeline-item flex w-full items-start md:items-center gap-8 md:gap-0",
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "w-full md:w-[42%] p-6 md:p-8 rounded-2xl border border-white/10 ml-8 md:ml-0",
                      isLeft ? "md:text-right" : "md:text-left",
                      item.featured
                        ? "bg-linear-to-br from-[#003d21] to-[#0a0a0a]"
                        : "bg-[#0a0a0a]"
                    )}
                  >
                    <span className="text-[#00ff8f] text-2xl md:text-3xl font-bold block mb-2 md:mb-3">
                      {item.year}
                    </span>
                    <p className="text-white/70 text-base md:text-lg leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="hidden md:flex w-[16%] justify-center">
                    <div className="w-5 h-5 rounded-full border-4 border-[#00ff8f]/40 bg-black z-10" />
                  </div>
                  <div
                    className={cn(
                      "hidden md:block w-[42%]",
                      isLeft ? "text-left pl-6" : "text-right pr-6"
                    )}
                  >
                    <span className="text-[#00ff8f] font-bold text-3xl md:text-4xl">
                      {item.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export type { TimelineItem };
