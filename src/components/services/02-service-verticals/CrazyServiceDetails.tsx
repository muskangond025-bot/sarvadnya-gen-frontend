"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cog, Package, Truck, Wrench, ArrowRight } from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  actionText?: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "industrial",
    title: "Industrial Rentals",
    description: "High-capacity silent DG sets from 65kVA to 250kVA engineered for continuous manufacturing, infrastructure, and heavy engineering.",
    icon: Cog,
    href: "/generators",
    actionText: "Learn More",
  },
  {
    id: "events",
    title: "Event Silent Power",
    description: "Acoustic-shielded silent generators for luxury weddings, grand concerts, and VIP festivals with certified zero noise disruption.",
    icon: Package,
    href: "/contact",
    actionText: "Learn More",
  },
  {
    id: "emergency",
    title: "Emergency Dispatch",
    description: "Nashik's fastest 60-minute emergency deployment. Mobile DG units mobilized immediately to prevent unexpected power failure.",
    icon: Truck,
    href: "tel:+916262629944",
    actionText: "Learn More",
  },
  {
    id: "maintenance",
    title: "AMC & Maintenance",
    description: "Comprehensive Annual Maintenance Contracts, automated fuel logistics, and 24/7 dedicated certified engineers on site.",
    icon: Wrench,
    href: "/contact",
    actionText: "Learn More",
  },
];

/**
 * CrazyServiceDetails Component
 * 
 * Exact Bootstrap Brain Service-8 Pattern:
 * - Standalone solid icons directly on background (no card boxes)
 * - Centered bold titles
 * - Centered narrative descriptions
 * - Centered "Learn More ->" action links
 */
export function CrazyServiceDetails() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
      {SERVICES.map((service, i) => {
        const IconComponent = service.icon;
        const isPhone = service.href.startsWith("tel:");

        return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
            className="flex flex-col items-center text-center group"
          >
            {/* Standalone Solid Icon (Matching BootstrapBrain Service-8) */}
            <div className="mb-6 flex items-center justify-center text-[#FF5500] transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
              <IconComponent className="size-14 sm:size-16 stroke-[1.8]" />
            </div>

            {/* Bold Title */}
            <h3 className="text-2xl sm:text-[26px] font-bold text-[#111315] font-['Poppins',sans-serif] tracking-tight mb-4 group-hover:text-[#FF5500] transition-colors duration-300">
              {service.title}
            </h3>

            {/* Description Text */}
            <p className="text-[#625D55] font-['Outfit',sans-serif] text-base sm:text-lg leading-relaxed mb-6 max-w-xs mx-auto">
              {service.description}
            </p>

            {/* Learn More Action Link */}
            {isPhone ? (
              <a
                href={service.href}
                className="inline-flex items-center gap-2 text-[#FF5500] hover:text-[#E04400] font-bold text-base transition-colors group/link mt-auto"
              >
                <span>{service.actionText}</span>
                <ArrowRight className="size-4 group-hover/link:translate-x-1.5 transition-transform duration-300" />
              </a>
            ) : (
              <Link
                href={service.href}
                className="inline-flex items-center gap-2 text-[#FF5500] hover:text-[#E04400] font-bold text-base transition-colors group/link mt-auto"
              >
                <span>{service.actionText}</span>
                <ArrowRight className="size-4 group-hover/link:translate-x-1.5 transition-transform duration-300" />
              </Link>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
