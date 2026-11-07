"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { RollingText } from "../common/RollingText";

/**
 * ForgeSpecificationForm Component (Bright Luxury Theme)
 * 
 * Exact Forge Automotive Section 2 ("Define Your Specification") architecture:
 * - 2-Column luxury split layout on crisp architectural canvas
 * - Sleek bright fieldsets with smooth focus transitions
 * - Signature Forge Rolling character submit button
 * - Preserves all contact and quote inquiry fields
 */
export function ForgeSpecificationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    preferredContact: "phone",
    email: "",
    phone: "",
    location: "",
    capacity: "82.5-125kVA",
    application: "industrial",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enquiry submitted:", formData);
    setIsSubmitted(true);
  };

  return (
    <section id="form" className="relative w-full bg-white text-[#111315] py-24 sm:py-32 px-6 sm:px-10 lg:px-20 z-20 border-b border-[#E8E2D9]">
      
      {/* Ambient Warm Glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#FF5500]/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* LEFT COLUMN: Editorial Heading & Context (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full lg:sticky lg:top-36">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#111315] font-normal leading-[1.1] tracking-tight mb-6"
            >
              Define Your Specification
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-base sm:text-lg text-[#625D55] leading-relaxed font-sans max-w-lg"
            >
              Share your project parameters, load requirements, and site location. Our senior electrical engineers will prepare an exact, CPCB-IV+ compliant turnkey power proposal within 1–2 business hours.
            </motion.p>
          </div>
        </div>

        {/* RIGHT COLUMN: Minimalist Form (7 cols) */}
        <div className="lg:col-span-7 w-full">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 sm:p-14 rounded-3xl bg-[#FAF8F5] border border-[#E8E2D9] text-center flex flex-col items-center justify-center gap-6 shadow-sm"
            >
              <div className="size-16 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 flex items-center justify-center text-[#FF5500]">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="font-serif text-3xl text-[#111315] font-normal">
                Enquiry Received
              </h3>
              <p className="text-[#625D55] text-base max-w-md mx-auto leading-relaxed">
                Thank you for defining your power specification. Tanmay Avhad and our engineering dispatch desk are reviewing your details and will contact you via {formData.preferredContact}.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-7 py-3 rounded-full border border-[#111315]/20 bg-white text-xs font-mono uppercase tracking-widest text-[#111315] hover:border-[#FF5500] hover:text-[#FF5500] transition-colors shadow-2xs cursor-pointer"
              >
                Submit another enquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8 w-full p-8 sm:p-12 rounded-3xl bg-[#FAF8F5] border border-[#E8E2D9] shadow-sm">
              
              {/* Full Name Field */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs uppercase tracking-wider text-[#71695F] font-semibold">
                  Full Name <span className="text-[#FF5500]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma / Industrial Plant Head"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white border border-[#E8E2D9] focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/15 rounded-xl px-5 py-3.5 text-base text-[#111315] placeholder-black/30 outline-none transition-all duration-200 shadow-2xs"
                />
              </div>

              {/* Preferred Contact Method & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Method */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#71695F] font-semibold">
                    Preferred Contact Method
                  </label>
                  <select
                    value={formData.preferredContact}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                    className="w-full bg-white border border-[#E8E2D9] focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/15 rounded-xl px-5 py-3.5 text-base text-[#111315] outline-none transition-all duration-200 shadow-2xs"
                  >
                    <option value="phone">Direct Phone Call</option>
                    <option value="whatsapp">WhatsApp Message</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#71695F] font-semibold">
                    Phone Number <span className="text-[#FF5500]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#E8E2D9] focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/15 rounded-xl px-5 py-3.5 text-base text-[#111315] placeholder-black/30 outline-none transition-all duration-200 shadow-2xs"
                  />
                </div>

              </div>

              {/* Email & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#71695F] font-semibold">
                    Email Address <span className="text-[#FF5500]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#E8E2D9] focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/15 rounded-xl px-5 py-3.5 text-base text-[#111315] placeholder-black/30 outline-none transition-all duration-200 shadow-2xs"
                  />
                </div>

                {/* Site Location */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#71695F] font-semibold">
                    Site Location / Pincode
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ambad MIDC, Nashik 422010"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white border border-[#E8E2D9] focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/15 rounded-xl px-5 py-3.5 text-base text-[#111315] placeholder-black/30 outline-none transition-all duration-200 shadow-2xs"
                  />
                </div>

              </div>

              {/* Required Fleet Capacity & Application Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Generator Capacity */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#71695F] font-semibold">
                    Required Capacity (kVA)
                  </label>
                  <select
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full bg-white border border-[#E8E2D9] focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/15 rounded-xl px-5 py-3.5 text-base text-[#111315] outline-none transition-all duration-200 shadow-2xs"
                  >
                    <option value="5-25kVA">5 – 25 kVA (Commercial & Retail)</option>
                    <option value="30-62.5kVA">30 – 62.5 kVA (Events & Medium Load)</option>
                    <option value="82.5-125kVA">82.5 – 125 kVA (Industrial / Manufacturing)</option>
                    <option value="160-250kVA">160 – 250 kVA (Heavy Continuous Prime)</option>
                    <option value="multiple">Multiple DG Synchronized Fleet</option>
                  </select>
                </div>

                {/* Application */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#71695F] font-semibold">
                    Application / Industry
                  </label>
                  <select
                    value={formData.application}
                    onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                    className="w-full bg-white border border-[#E8E2D9] focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/15 rounded-xl px-5 py-3.5 text-base text-[#111315] outline-none transition-all duration-200 shadow-2xs"
                  >
                    <option value="industrial">Industrial Manufacturing / Plant</option>
                    <option value="wedding">Grand Wedding / VIP Celebration</option>
                    <option value="event">Concert / Public Festival</option>
                    <option value="construction">Infrastructure & Construction Site</option>
                    <option value="emergency">Emergency Breakdown Standby</option>
                  </select>
                </div>

              </div>

              {/* Message / Project Details */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs uppercase tracking-wider text-[#71695F] font-semibold">
                  Project Notes & Specific Requirements (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your expected peak load, daily operating hours, diesel logistics preference, or site constraints..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-[#E8E2D9] focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/15 rounded-xl px-5 py-3.5 text-base text-[#111315] placeholder-black/30 outline-none transition-all duration-200 resize-none shadow-2xs"
                />
              </div>

              {/* Submit Button Matching Forge Style with Rolling Character Animation */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-[#111315] hover:bg-[#FF5500] text-white font-mono text-xs sm:text-sm uppercase tracking-[0.22em] font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                >
                  <RollingText text="Submit Enquiry" charClassName="group-hover:text-white" />
                  <ArrowRight className="size-4 text-[#FF5500] group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>

    </section>
  );
}
