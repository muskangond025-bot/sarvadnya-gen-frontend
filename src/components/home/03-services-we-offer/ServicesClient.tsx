"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/common";
import { CheckCircle2, ArrowRight } from "lucide-react";

interface ServiceFeature {
  title: string;
  subtitle: string;
}

interface ServiceItem {
  id: string;
  label: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features?: ServiceFeature[];
  buttonText?: string;
  reversed?: boolean;
}

export function ServicesClient({ services }: { services: ServiceItem[] }) {
  return (
    <div className="flex flex-col gap-32 md:gap-48">
      {services.map((service, index) => (
        <ServiceRow key={service.id} service={service} index={index} />
      ))}
    </div>
  );
}

function ServiceRow({ service, index }: { service: ServiceItem; index: number }) {
  const isReversed = service.reversed;

  return (
    <div className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} items-center justify-between gap-16 lg:gap-24`}>
      {/* Content Column */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 max-w-[600px]"
      >
        <SectionHeading
          label={service.label}
          title={
            <>
              {service.titleLine1} <br />
              <span className="text-[#00ff8f]">{service.titleHighlight}</span>
            </>
          }
          align="left"
          className="mb-10"
        />
        
        <p className="text-[#bfbfbf] font-['Outfit',sans-serif] text-xl leading-relaxed font-light mb-12">
          {service.description}
        </p>

        {/* Features Grid */}
        {service.features && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
            {service.features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (idx * 0.1) }}
                className="flex flex-col gap-3 group"
              >
                <div className="size-12 rounded-2xl bg-[#00ff8f]/5 border border-[#00ff8f]/10 flex items-center justify-center text-[#00ff8f] group-hover:bg-[#00ff8f] group-hover:text-black transition-all duration-500">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1 group-hover:text-[#00ff8f] transition-colors duration-300">{feature.title}</h4>
                  <p className="text-[#888] text-sm tracking-wide uppercase font-medium">{feature.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        {service.buttonText && (
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-bold text-lg hover:bg-[#00ff8f] transition-all duration-300 group shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,143,0.3)]"
          >
            {service.buttonText}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        )}
      </motion.div>

      {/* Image Column */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: isReversed ? -50 : 50 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 relative w-full aspect-square max-w-[600px] group"
      >
        {/* Cinematic Frame */}
        <div className="absolute inset-0 bg-[#00ff8f]/5 rounded-[40px] border border-white/5 backdrop-blur-3xl overflow-hidden group-hover:border-[#00ff8f]/20 transition-all duration-700">
          {/* Animated Glow in corner */}
          <div className="absolute top-[-10%] left-[-10%] size-64 bg-[#00ff8f]/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="absolute inset-0 p-8">
            <div className="relative w-full h-full overflow-hidden rounded-[30px] border border-white/10 shadow-2xl">
              <Image
                src={service.imageSrc}
                alt={service.imageAlt}
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>

        {/* Decorative Floating Element */}
        <div className={`absolute ${isReversed ? "-left-10" : "-right-10"} -bottom-10 size-40 bg-[#00ff8f]/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-[#00ff8f]/20 transition-all duration-700`} />
      </motion.div>
    </div>
  );
}
