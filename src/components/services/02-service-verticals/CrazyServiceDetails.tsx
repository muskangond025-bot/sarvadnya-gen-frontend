"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Shield, ArrowRight, Settings, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: any;
  color: string;
}

const SERVICES: ServiceDetail[] = [
  {
    id: "rental",
    title: "Industrial Rentals",
    description: "High-capacity DG sets from 65kVA to 250kVA for manufacturing plants, construction sites, and corporate parks.",
    features: ["Load Testing", "On-site Installation", "24/7 Monitoring", "Fuel Management"],
    icon: Zap,
    color: "#00ff8f"
  },
  {
    id: "event",
    title: "Event Power",
    description: "Silent generators for weddings, concerts, and festivals. Zero-noise technology to ensure a seamless experience.",
    features: ["Silent Operation", "Decorative Setup", "Power Distribution", "On-site Tech"],
    icon: Shield,
    color: "#00d1ff"
  },
  {
    id: "maintenance",
    title: "AMC & Service",
    description: "Comprehensive Annual Maintenance Contracts (AMC) to keep your existing power infrastructure in top condition.",
    features: ["Preventive Care", "Emergency Repair", "Genuine Spares", "Performance Audit"],
    icon: Settings,
    color: "#ff0080"
  },
  {
    id: "emergency",
    title: "Emergency Response",
    description: "Nashik's fastest emergency deployment. We respond to power failures within 60 minutes.",
    features: ["60-Min Response", "Mobile DG Sets", "Expert Diagnostics", "Immediate Relief"],
    icon: Clock,
    color: "#ffcc00"
  }
];

/**
 * CrazyServiceDetails Component
 * 
 * A high-fidelity, interactive service showcase.
 * Features:
 * - Dynamic card expansion
 * - Industrial data overlays
 * - Multi-colored glow effects
 */
export function CrazyServiceDetails() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {SERVICES.map((service, i) => (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1 }}
          className="group relative h-[450px] rounded-[40px] border border-white/5 bg-[#080808] overflow-hidden"
        >
          {/* Background Glow */}
          <div 
            className="absolute -top-20 -right-20 size-64 blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700"
            style={{ backgroundColor: service.color }}
          />

          <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div 
                className="size-16 rounded-2xl flex items-center justify-center border border-white/10 relative overflow-hidden group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundColor: `${service.color}10` }}
              >
                <service.icon className="size-8 transition-colors duration-500" style={{ color: service.color }} />
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="text-white/20 font-mono text-sm tracking-widest uppercase">Phase_0{i + 1}</span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              <h3 className="text-4xl font-bold text-white font-['Poppins',sans-serif] tracking-tight group-hover:text-transparent group-hover:bg-clip-text transition-all duration-500" style={{ backgroundImage: `linear-gradient(to right, white, ${service.color})` }}>
                {service.title}
              </h3>
              <p className="text-[#bfbfbf] font-['Outfit',sans-serif] text-lg leading-relaxed max-w-sm">
                {service.description}
              </p>
              
              {/* Features Chip */}
              <div className="flex flex-wrap gap-2">
                {service.features.map(f => (
                  <span key={f} className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] text-white/60 font-bold uppercase tracking-wider">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4">
              <button className="flex items-center gap-2 text-white/40 group-hover:text-white transition-colors duration-300">
                <span className="text-sm font-bold uppercase tracking-widest font-['Outfit',sans-serif]">Learn More</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Decorative Corner Element */}
          <div className="absolute bottom-0 right-0 p-8">
            <Zap className="size-32 text-white/[0.02] group-hover:text-white/[0.05] transition-colors duration-700" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
