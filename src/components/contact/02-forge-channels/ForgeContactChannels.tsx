"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Truck,
  MapPin,
  ArrowUpRight,
  MessageSquare,
} from "lucide-react";
import { RollingText } from "../common/RollingText";

/**
 * ForgeContactChannels Component (Bright Luxury Theme)
 *
 * 4-Column architectural grid on bright canvas (#FAF8F5) with hairline dividers
 * and single-line headings/labels so card text does not awkwardly wrap.
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
            className="p-6 sm:p-7 xl:p-9 flex flex-col justify-between group hover:bg-white transition-colors duration-300 min-h-[auto] sm:min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors font-semibold whitespace-nowrap">
                  Phone
                </span>
                <div className="size-8 rounded-full bg-black/5 flex items-center justify-center text-[#111315] group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300 shrink-0">
                  <Phone className="size-4" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 my-2">
                <a
                  href="tel:+916262629944"
                  className="font-serif text-xl xl:text-[22px] text-[#111315] font-normal tracking-tight transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <RollingText text="+91 62626 29944" singleLine />
                  <ArrowUpRight className="size-4 text-[#FF5500] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                </a>
                <span className="text-[11px] font-mono text-[#8C8275] whitespace-nowrap truncate">
                  Tanmay Avhad (Lead Dispatch Desk)
                </span>

                <a
                  href="tel:+919823197881"
                  className="font-serif text-lg xl:text-[20px] text-[#524E48] font-normal tracking-tight transition-colors pt-2.5 inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <RollingText text="+91 98231 97881" singleLine />
                  <ArrowUpRight className="size-3.5 text-[#FF5500] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                </a>
                <span className="text-[11px] font-mono text-[#8C8275] whitespace-nowrap truncate">
                  Gopal Avhad (Technical Operations)
                </span>
              </div>
            </div>

            <p className="text-xs text-[#625D55] mt-6 leading-relaxed font-sans pt-4 border-t border-[#E8E2D9]">
              <span className="whitespace-nowrap">Mon — Sat: 9:00 AM — 7:00 PM</span>
              <br />
              <strong className="text-[#FF5500] font-semibold">
                24/7 Rapid Emergency Dispatch
              </strong>
            </p>
          </motion.li>

          {/* Channel 2: Email */}
          <motion.li
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="p-6 sm:p-7 xl:p-9 flex flex-col justify-between group hover:bg-white transition-colors duration-300 min-h-[auto] sm:min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors font-semibold whitespace-nowrap">
                  Email
                </span>
                <div className="size-8 rounded-full bg-black/5 flex items-center justify-center text-[#111315] group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300 shrink-0">
                  <Mail className="size-4" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 my-2">
                <a
                  href="mailto:info@sarvadnyagenerators.com"
                  className="font-serif text-xl xl:text-[22px] text-[#111315] font-normal tracking-tight transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <RollingText text="Send Us A Message" singleLine />
                  <ArrowUpRight className="size-4 text-[#FF5500] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                </a>
                <span className="text-[11px] font-mono text-[#8C8275] whitespace-nowrap truncate">
                  info@sarvadnyagenerators.com
                </span>

                <div className="flex flex-col text-[11px] text-[#625D55] gap-1 pt-2.5 font-sans">
                  <span className="whitespace-nowrap truncate">
                    Support: support@sarvadnyagenerators.com
                  </span>
                  <span className="whitespace-nowrap truncate">
                    Sales: sales@sarvadnyagenerators.com
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#625D55] mt-6 leading-relaxed font-sans pt-4 border-t border-[#E8E2D9]">
              Response within 1–2 hours for rental inquiries and mobilization.
            </p>
          </motion.li>

          {/* Channel 3: Concierge / Logistics */}
          <motion.li
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="p-6 sm:p-7 xl:p-9 flex flex-col justify-between group hover:bg-white transition-colors duration-300 min-h-[auto] sm:min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors font-semibold whitespace-nowrap">
                  Concierge &amp; Logistics
                </span>
                <div className="size-8 rounded-full bg-black/5 flex items-center justify-center text-[#111315] group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300 shrink-0">
                  <Truck className="size-4" />
                </div>
              </div>

              <div className="flex flex-col gap-2 my-2">
                <h3 className="font-serif text-xl xl:text-[22px] text-[#111315] font-normal tracking-tight whitespace-nowrap">
                  <RollingText text="Statewide Mobilization" singleLine />
                </h3>
                <p className="text-xs text-[#625D55] leading-relaxed mt-1 font-sans">
                  Dedicated heavy hydraulic fleet transport, professional loading,
                  and on-site electrical distribution.
                </p>

                <div className="pt-2">
                  <a
                    href="https://wa.me/916262629944"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FF5500] hover:underline font-bold whitespace-nowrap"
                  >
                    <MessageSquare className="size-3.5 shrink-0" />
                    <span>WhatsApp Quick Dispatch</span>
                  </a>
                </div>
              </div>
            </div>

            <p className="text-xs text-[#625D55] mt-6 leading-relaxed font-sans pt-4 border-t border-[#E8E2D9]">
              Guaranteed &lt; 60 minute emergency response in Nashik.
            </p>
          </motion.li>

          {/* Channel 4: Visit Us / Depots */}
          <motion.li
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="p-6 sm:p-7 xl:p-9 flex flex-col justify-between group hover:bg-white transition-colors duration-300 min-h-[auto] sm:min-h-[300px]"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#8C8275] group-hover:text-[#FF5500] transition-colors font-semibold whitespace-nowrap">
                  Visit Us
                </span>
                <div className="size-8 rounded-full bg-black/5 flex items-center justify-center text-[#111315] group-hover:bg-[#FF5500] group-hover:text-white transition-all duration-300 shrink-0">
                  <MapPin className="size-4" />
                </div>
              </div>

              <div className="flex flex-col gap-2 my-2">
                <h3 className="font-serif text-xl xl:text-[22px] text-[#111315] font-normal tracking-tight whitespace-nowrap">
                  <RollingText text="Nashik Central Depot" singleLine />
                </h3>
                <p className="text-xs text-[#625D55] leading-relaxed mt-1 font-sans">
                  Wadala - Pathardi Rd, behind Sudarshan Lawns, Indira Nagar,
                  Nashik 422009
                </p>
              </div>

              {/* Regional Depots Pills */}
              <div className="flex flex-wrap gap-1.5 pt-3">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/5 border border-black/10 text-[#524E48] font-semibold whitespace-nowrap">
                  MIDC Ambad
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/5 border border-black/10 text-[#524E48] font-semibold whitespace-nowrap">
                  Satpur
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/5 border border-black/10 text-[#524E48] font-semibold whitespace-nowrap">
                  Sinnar
                </span>
              </div>
            </div>

            <p className="text-xs text-[#625D55] mt-6 leading-relaxed font-sans pt-4 border-t border-[#E8E2D9]">
              Equipment inspections &amp; consultations by appointment.
            </p>
          </motion.li>
        </ul>
      </div>
    </section>
  );
}
