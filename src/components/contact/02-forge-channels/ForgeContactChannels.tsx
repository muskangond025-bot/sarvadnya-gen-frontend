"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Truck, MapPin, ArrowUpRight, MessageSquare } from "lucide-react";
import { RollingText } from "../common/RollingText";

/**
 * ForgeContactChannels Component (Bright Luxury Theme)
 * 
 * Exact Forge Automotive Section 1 architecture:
 * - 4-Column full-width architectural grid on bright canvas (#FAF8F5)
 * - Hairline border dividers (#E8E2D9)
 * - Signature Forge Staggered Character Rolling animation on hover for phone numbers and titles
 * - Preserves ALL previous contact information (Phone numbers, emails, depot addresses, operating hours)
 */
export function ForgeContactChannels() {
  return (
    <section className="relative w-full bg-[#FAF8F5] border-b border-[#E8E2D9] text-[#111315] z-20">
      <div className="w-full max-w-[1600px] mx-auto">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#E8E2D9]">
          
          {/* Channel 1: Phone */}
          <motion.li
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between group hover:bg-white transition-colors duration-300 min-h-[auto] sm:min-h-[320px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors font-semibold">
                  Phone
                </span>
                <div className="size-8 rounded-full bg-black/5 flex items-center justify-center text-[#111315] group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300">
                  <Phone className="size-4" />
                </div>
              </div>

              <div className="flex flex-col gap-2 my-2">
                <a
                  href="tel:+916262629944"
                  className="font-serif text-xl sm:text-[26px] text-[#111315] font-normal tracking-tight transition-colors inline-flex items-center gap-1.5"
                >
                  <RollingText text="+91 62626 29944" />
                  <ArrowUpRight className="size-4 text-[#FF5500] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>
                <span className="text-xs font-mono text-[#8C8275]">Tanmay Avhad (Lead Dispatch Desk)</span>

                <a
                  href="tel:+919823197881"
                  className="font-serif text-lg sm:text-2xl text-[#524E48] font-normal tracking-tight transition-colors pt-2.5 inline-flex items-center gap-1.5"
                >
                  <RollingText text="+91 98231 97881" />
                  <ArrowUpRight className="size-3.5 text-[#FF5500] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>
                <span className="text-xs font-mono text-[#8C8275]">Gopal Avhad (Technical Operations)</span>
              </div>
            </div>

            <p className="text-xs text-[#625D55] mt-6 leading-relaxed font-sans pt-4 border-t border-[#E8E2D9]">
              Mon — Sat: 9:00 AM — 7:00 PM <br />
              <strong className="text-[#FF5500] font-semibold">24/7 Rapid Emergency Dispatch for Rented Units</strong>
            </p>
          </motion.li>

          {/* Channel 2: Email */}
          <motion.li
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between group hover:bg-white transition-colors duration-300 min-h-[auto] sm:min-h-[320px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors font-semibold">
                  Email
                </span>
                <div className="size-8 rounded-full bg-black/5 flex items-center justify-center text-[#111315] group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300">
                  <Mail className="size-4" />
                </div>
              </div>

              <div className="flex flex-col gap-2 my-2">
                <a
                  href="mailto:info@sarvadnyagenerators.com"
                  className="font-serif text-xl sm:text-[26px] text-[#111315] font-normal tracking-tight transition-colors inline-flex items-center gap-1.5"
                >
                  <RollingText text="Send Us A Message" />
                  <ArrowUpRight className="size-4 text-[#FF5500] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>
                <span className="text-xs font-mono text-[#8C8275] truncate">info@sarvadnyagenerators.com</span>

                <div className="flex flex-col text-xs text-[#625D55] gap-1 pt-2.5 font-sans">
                  <span>Support: support@sarvadnyagenerators.com</span>
                  <span>Sales: sales@sarvadnyagenerators.com</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#625D55] mt-6 leading-relaxed font-sans pt-4 border-t border-[#E8E2D9]">
              We aim to respond within 1–2 hours for rental inquiries and immediate mobilization.
            </p>
          </motion.li>

          {/* Channel 3: Concierge / Logistics */}
          <motion.li
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between group hover:bg-white transition-colors duration-300 min-h-[auto] sm:min-h-[320px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors font-semibold">
                  Concierge & Logistics
                </span>
                <div className="size-8 rounded-full bg-black/5 flex items-center justify-center text-[#111315] group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300">
                  <Truck className="size-4" />
                </div>
              </div>

              <div className="flex flex-col gap-2 my-2">
                <h3 className="font-serif text-xl sm:text-[26px] text-[#111315] font-normal tracking-tight">
                  <RollingText text="Statewide Mobilization" />
                </h3>
                <p className="text-xs text-[#625D55] leading-relaxed mt-1 font-sans">
                  Dedicated heavy hydraulic fleet transport, professional loading, and on-site electrical distribution.
                </p>

                <div className="pt-2">
                  <a
                    href="https://wa.me/916262629944"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF5500] hover:underline font-bold"
                  >
                    <MessageSquare className="size-3.5" />
                    <span>WhatsApp Quick Dispatch</span>
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#625D55] mt-6 leading-relaxed font-sans pt-4 border-t border-[#E8E2D9]">
              Guaranteed &lt; 60 minute emergency response within Nashik urban perimeter.
            </p>
          </motion.li>

          {/* Channel 4: Visit Us / Depots */}
          <motion.li
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between group hover:bg-white transition-colors duration-300 min-h-[auto] sm:min-h-[320px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors font-semibold">
                  Visit Us
                </span>
                <div className="size-8 rounded-full bg-black/5 flex items-center justify-center text-[#111315] group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300">
                  <MapPin className="size-4" />
                </div>
              </div>

              <div className="flex flex-col gap-2 my-2">
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#111315] font-normal tracking-tight">
                  <RollingText text="Nashik Central Depot" />
                </h3>
                <p className="text-xs text-[#625D55] leading-relaxed mt-1 font-sans">
                  Wadala - Pathardi Rd, behind sudarshan lawns, vanvaibhav colony, Indira Nagar, Nashik 422009
                </p>
              </div>

              {/* Regional Depots Pills matching Forge site selector */}
              <div className="flex flex-wrap gap-1.5 pt-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/5 border border-black/10 text-[#524E48] font-semibold">
                  MIDC Ambad
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/5 border border-black/10 text-[#524E48] font-semibold">
                  Satpur
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/5 border border-black/10 text-[#524E48] font-semibold">
                  Sinnar
                </span>
              </div>
            </div>

            <p className="text-xs text-[#625D55] mt-6 leading-relaxed font-sans pt-4 border-t border-[#E8E2D9]">
              Equipment inspections & consultations by appointment.
            </p>
          </motion.li>

        </ul>
      </div>
    </section>
  );
}
