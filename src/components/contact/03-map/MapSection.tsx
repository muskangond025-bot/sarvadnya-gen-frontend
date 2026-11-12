"use client";

import React from "react";
import { MapPin, ArrowUpRight, Phone, Clock } from "lucide-react";

/**
 * MapSection Component (Bright Luxury Architectural Theme)
 *
 * Embeds the live Nashik Central Depot Google Map inside an editorial bright
 * frame with direct directions and dispatch zone metadata.
 */
export function MapSection() {
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.626564619376!2d73.818818!3d19.981447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd96f6e0b0b0b1%3A0x0!2zMTnCsDU4JzUzLjIiTiA3M8KwNDknMDcuNyJF!5e0!3m2!1sen!2sin!4v1715764000000!5m2!1sen!2sin";
  const directionsUrl = "https://maps.google.com/?q=19.981447,73.818818";

  return (
    <section
      id="map"
      aria-label="Sarvadnya Generators Location"
      className="relative w-full bg-[#FAF8F5] text-[#111315] border-t border-[#E8E2D9] py-16 sm:py-24 px-4 sm:px-10 lg:px-20 z-20"
    >
      <div className="max-w-[1500px] mx-auto">
        {/* Top Editorial Location Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#FF5500] font-bold mb-2.5">
              Visit Us
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#111315]">
              Nashik Central Depot
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#625D55] max-w-2xl leading-relaxed">
              Wadala - Pathardi Rd, behind Sudarshan Lawns, Indira Nagar, Nashik
              422009
            </p>
          </div>

          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-white hover:bg-[#111315] text-[#111315] hover:text-white border border-[#E8E2D9] hover:border-[#111315] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-2xs shrink-0 self-start md:self-auto"
          >
            <MapPin className="w-4 h-4 text-[#FF5500]" />
            <span>Open in Google Maps</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Clean Framed Interactive Map */}
        <div className="rounded-3xl overflow-hidden border border-[#E8E2D9] bg-white shadow-sm">
          <div className="w-full h-[340px] sm:h-[420px] lg:h-[460px] relative bg-[#F3EFEA]">
            <iframe
              title="Sarvadnya Generators Location"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

          {/* Crisp Utility Bottom Bar */}
          <div className="px-6 py-4 bg-white border-t border-[#E8E2D9] flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[#403C36]">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <div className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span className="font-medium text-[#111315]">
                  Indira Nagar • MIDC Ambad • Satpur • Sinnar
                </span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF5500] shrink-0" />
                <span>Mon — Sat: 9:00 AM — 7:00 PM</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="tel:+916262629944"
                className="inline-flex items-center gap-1.5 font-semibold text-[#111315] hover:text-[#FF5500] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF5500]" />
                <span>+91 62626 29944</span>
              </a>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#FF5500] hover:text-[#E04B00] transition-colors"
              >
                <span>Get Directions</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
