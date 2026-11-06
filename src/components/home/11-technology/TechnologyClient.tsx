"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/common";

export interface ServiceZone {
  region: string;
  coverage: string;
  highlight: string;
  primary?: boolean;
}

export type TechFeature = ServiceZone;
export const TECH_FEATURES: any[] = [];

interface TechnologyClientProps {
  zones: ServiceZone[];
}

export function TechnologyClient({ zones }: TechnologyClientProps) {
  return (
    <div className="w-full flex flex-col gap-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {zones.map((zone, index) => (
          <motion.div
            key={zone.region}
            initial={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`bg-white border rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-colors shadow-xs ${
              zone.primary ? "border-[#FF5500] ring-1 ring-[#FF5500]/20" : "border-[#E8E2D9] hover:border-[#1F1F1E]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="size-10 rounded-lg bg-[#FAF8F5] border border-[#E8E2D9] flex items-center justify-center text-[#FF5500]">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              <h3 className="font-sans font-bold text-xl text-[#1F1F1E] mb-2">
                {zone.region}
              </h3>

              <p className="text-sm text-[#625D55] leading-relaxed mb-4">
                {zone.coverage}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8E2D9] flex items-start gap-2 text-xs text-[#1F1F1E] font-medium">
              <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
              <span>{zone.highlight}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-6 rounded-xl bg-white border border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Navigation className="w-5 h-5 text-[#FF5500] shrink-0" />
          <span className="text-sm text-[#625D55]">
            Planning a project outside Nashik? We coordinate specialized trailer transports and cable rigging across Maharashtra.
          </span>
        </div>
        <Button href="/contact" variant="outline" size="sm" className="shrink-0 w-full sm:w-auto">
          Check Service Availability
        </Button>
      </div>
    </div>
  );
}
