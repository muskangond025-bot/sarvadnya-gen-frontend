"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Truck, MapPin, ArrowUpRight, MessageSquare } from "lucide-react";

/**
 * ForgeContactChannels Component
 * 
 * Exact Forge Automotive Section 1 architecture:
 * - 4-Column full-width architectural grid
 * - Hairline border dividers matching Forge CSS (`border-white/10`)
 * - Preserves ALL previous contact information (Phone numbers, emails, depot addresses, operating hours)
 * - Micro-interactions on hover
 */
export function ForgeContactChannels() {
  return (
    <section className="relative w-full bg-[#0A0B0E] border-t border-b border-white/10 text-[#F2F1ED] z-20">
      <div className="w-full max-w-[1600px] mx-auto">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
          
          {/* Channel 1: Phone */}
          <motion.li
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors duration-300 min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors">
                  Phone
                </span>
                <Phone className="size-4.5 text-[#8C8275] group-hover:text-[#FF5500] transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5 my-2">
                <a
                  href="tel:+916262629944"
                  className="font-serif text-2xl sm:text-[26px] text-[#F2F1ED] hover:text-[#FF5500] font-normal tracking-tight transition-colors flex items-center gap-1.5"
                >
                  <span>+91 62626 29944</span>
                  <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <span className="text-xs font-mono text-[#8C8275]">Tanmay Avhad (Lead Dispatch)</span>

                <a
                  href="tel:+919823197881"
                  className="font-serif text-xl sm:text-2xl text-[#F2F1ED]/80 hover:text-[#FF5500] font-normal tracking-tight transition-colors pt-2"
                >
                  +91 98231 97881
                </a>
                <span className="text-xs font-mono text-[#8C8275]">Gopal Avhad (Technical Operations)</span>
              </div>
            </div>

            <p className="text-xs text-[#8C8275] mt-6 leading-relaxed font-sans pt-4 border-t border-white/5">
              Mon — Sat: 9:00 AM — 7:00 PM <br />
              <span className="text-[#FF5500] font-medium">24/7 Emergency Dispatch for Rented Units</span>
            </p>
          </motion.li>

          {/* Channel 2: Email */}
          <motion.li
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors duration-300 min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors">
                  Email
                </span>
                <Mail className="size-4.5 text-[#8C8275] group-hover:text-[#FF5500] transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5 my-2">
                <a
                  href="mailto:info@sarvadnyagenerators.com"
                  className="font-serif text-2xl sm:text-[26px] text-[#F2F1ED] hover:text-[#FF5500] font-normal tracking-tight transition-colors flex items-center gap-1.5"
                >
                  <span>Send Us A Message</span>
                  <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <span className="text-xs text-[#8C8275] truncate">info@sarvadnyagenerators.com</span>

                <div className="flex flex-col text-xs text-[#8C8275] gap-1 pt-3">
                  <span>Support: support@sarvadnyagenerators.com</span>
                  <span>Sales: sales@sarvadnyagenerators.com</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#8C8275] mt-6 leading-relaxed font-sans pt-4 border-t border-white/5">
              We aim to respond within 1–2 hours for rental inquiries and immediate mobilization.
            </p>
          </motion.li>

          {/* Channel 3: Concierge / Logistics */}
          <motion.li
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors duration-300 min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors">
                  Concierge & Logistics
                </span>
                <Truck className="size-4.5 text-[#8C8275] group-hover:text-[#FF5500] transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5 my-2">
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#F2F1ED] font-normal tracking-tight">
                  Statewide Mobilization
                </h3>
                <p className="text-xs text-[#8C8275] leading-relaxed mt-1">
                  Dedicated heavy hydraulic fleet transport, professional loading, and on-site electrical distribution.
                </p>

                <div className="pt-3">
                  <a
                    href="https://wa.me/916262629944"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF5500] hover:underline"
                  >
                    <MessageSquare className="size-3.5" />
                    <span>WhatsApp Quick Dispatch</span>
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#8C8275] mt-6 leading-relaxed font-sans pt-4 border-t border-white/5">
              Guaranteed &lt; 60 minute emergency response within Nashik urban perimeter.
            </p>
          </motion.li>

          {/* Channel 4: Visit Us / Depots */}
          <motion.li
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="p-8 sm:p-10 lg:p-12 flex flex-col justify-between group hover:bg-white/[0.02] transition-colors duration-300 min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors">
                  Visit Us
                </span>
                <MapPin className="size-4.5 text-[#8C8275] group-hover:text-[#FF5500] transition-colors" />
              </div>

              <div className="flex flex-col gap-1.5 my-2">
                <h3 className="font-serif text-2xl sm:text-[26px] text-[#F2F1ED] font-normal tracking-tight">
                  Nashik Central Depot
                </h3>
                <p className="text-xs text-[#8C8275] leading-relaxed mt-1">
                  Wadala - Pathardi Rd, behind sudarshan lawns, vanvaibhav colony, Indira Nagar, Nashik, Maharashtra 422009
                </p>
              </div>

              {/* Regional Depots Pills matching Forge site selector */}
              <div className="flex flex-wrap gap-1.5 pt-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-white/70">
                  MIDC Ambad
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-white/70">
                  Satpur
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-white/70">
                  Sinnar
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8C8275] mt-6 leading-relaxed font-sans pt-4 border-t border-white/5">
              Equipment inspections & consultations by appointment.
            </p>
          </motion.li>

        </ul>
      </div>
    </section>
  );
}

