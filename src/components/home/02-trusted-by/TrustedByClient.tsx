"use client";

import React from "react";
import { motion } from "framer-motion";

interface Partner {
  name: string;
  spec: string;
}

export function TrustedByClient({ partners }: { partners: Partner[] }) {
  return (
    <div className="w-full flex flex-wrap justify-center items-center gap-8 md:gap-14 lg:gap-16 pt-2">
      {partners.map((partner, index) => (
        <motion.div
          key={partner.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08, duration: 0.5 }}
          className="flex flex-col items-center group cursor-default"
        >
          <span className="font-sans font-bold text-lg sm:text-xl text-[#1F1F1E] group-hover:text-[#FF5500] transition-colors duration-200">
            {partner.name}
          </span>
          <span className="text-[11px] text-[#625D55] font-medium tracking-tight mt-0.5">
            {partner.spec}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
