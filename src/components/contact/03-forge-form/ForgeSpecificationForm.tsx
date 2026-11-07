"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ShieldCheck, Zap, Clock, ArrowRight } from "lucide-react";

/**
 * ForgeSpecificationForm Component
 * 
 * Exact Forge Automotive Section 2 ("Define Your Specification") architecture:
 * - 2-Column luxury split layout
 * - Minimalist dark fieldsets with smooth focus highlights
 * - Preserves all contact and quote inquiry fields
 * - Interactive feedback on submission
 */
export function ForgeSpecificationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    preferredContact: "phone",
    email: "",
    phone: "",
    location: "",
    depot: "nashik-central",
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
    <section id="form" className="relative w-full bg-[#0E1013] text-[#F2F1ED] py-24 sm:py-32 px-6 sm:px-10 lg:px-20 z-20">
      
      {/* Ambient Copper/Amber Glow */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#FF5500]/[0.035] blur-[160px] pointer-events-none" />

      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* LEFT COLUMN: Editorial Heading & Context (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full lg:sticky lg:top-36">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF5500] font-semibold block mb-4"
            >
              Tailored Power Quotation
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#F2F1ED] font-normal leading-[1.1] tracking-tight mb-6"
            >
              Define Your Specification
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-base sm:text-lg text-[#8C8275] leading-relaxed font-sans mb-10 max-w-lg"
            >
              Share your project parameters, load requirements, and site location. Our senior electrical engineers will prepare an exact, CPCB-IV+ compliant turnkey power proposal within 1–2 business hours.
            </motion.p>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-8 border-t border-white/10 flex flex-col gap-4 text-xs font-mono text-[#8C8275]">
            <div className="flex items-center gap-3">
              <Zap className="size-4 text-[#FF5500] shrink-0" />
              <span>5 kVA — 250 kVA Immediate Fleet Allocation</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="size-4 text-[#FF5500] shrink-0" />
              <span>&lt; 60 Min Emergency Dispatch In Nashik Urban Area</span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="size-4 text-[#FF5500] shrink-0" />
              <span>CPCB-IV+ Silent Acoustic Standards Certified</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Minimalist Form (7 cols) */}
        <div className="lg:col-span-7 w-full">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 sm:p-14 rounded-3xl bg-white/[0.03] border border-white/15 text-center flex flex-col items-center justify-center gap-6"
            >
              <div className="size-16 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 flex items-center justify-center text-[#FF5500]">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="font-serif text-3xl text-white font-normal">
                Enquiry Received
              </h3>
              <p className="text-[#8C8275] text-base max-w-md mx-auto leading-relaxed">
                Thank you for defining your power specification. Tanmay Avhad and our engineering dispatch desk are reviewing your details and will contact you via {formData.preferredContact}.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full border border-white/20 text-xs font-mono uppercase tracking-widest text-white/80 hover:text-white hover:border-[#FF5500] transition-colors"
              >
                Submit another enquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
              
              {/* Full Name Field */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-xs uppercase tracking-wider text-[#8C8275]">
                  Full Name <span className="text-[#FF5500]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma / Industrial Plant Head"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/10 focus:border-[#FF5500] rounded-xl px-5 py-4 text-base text-white placeholder-white/20 outline-none transition-all duration-200"
                />
              </div>

              {/* Preferred Contact Method & Contact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Method */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8C8275]">
                    Preferred Contact Method
                  </label>
                  <select
                    value={formData.preferredContact}
                    onChange={(e) => setFormData({ ...formData, preferredContact: e.target.value })}
                    className="w-full bg-[#16181C] border border-white/10 focus:border-[#FF5500] rounded-xl px-5 py-4 text-base text-white outline-none transition-all duration-200"
                  >
                    <option value="phone">Direct Phone Call</option>
                    <option value="whatsapp">WhatsApp Message</option>
                    <option value="email">Email</option>
                  </select>
                </div>

                {/* Phone Number */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8C8275]">
                    Phone Number <span className="text-[#FF5500]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/10 focus:border-[#FF5500] rounded-xl px-5 py-4 text-base text-white placeholder-white/20 outline-none transition-all duration-200"
                  />
                </div>

              </div>

              {/* Email & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Email Address */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8C8275]">
                    Email Address <span className="text-[#FF5500]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/10 focus:border-[#FF5500] rounded-xl px-5 py-4 text-base text-white placeholder-white/20 outline-none transition-all duration-200"
                  />
                </div>

                {/* Site Location */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8C8275]">
                    Site Location / Pincode
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ambad MIDC, Nashik 422010"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/10 focus:border-[#FF5500] rounded-xl px-5 py-4 text-base text-white placeholder-white/20 outline-none transition-all duration-200"
                  />
                </div>

              </div>

              {/* Required Fleet Capacity & Application Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Generator Capacity */}
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8C8275]">
                    Required Capacity (kVA)
                  </label>
                  <select
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full bg-[#16181C] border border-white/10 focus:border-[#FF5500] rounded-xl px-5 py-4 text-base text-white outline-none transition-all duration-200"
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
                  <label className="font-mono text-xs uppercase tracking-wider text-[#8C8275]">
                    Application / Industry
                  </label>
                  <select
                    value={formData.application}
                    onChange={(e) => setFormData({ ...formData, application: e.target.value })}
                    className="w-full bg-[#16181C] border border-white/10 focus:border-[#FF5500] rounded-xl px-5 py-4 text-base text-white outline-none transition-all duration-200"
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
                <label className="font-mono text-xs uppercase tracking-wider text-[#8C8275]">
                  Project Notes & Specific Requirements (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your expected peak load, daily operating hours, diesel logistics preference, or site constraints..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/10 focus:border-[#FF5500] rounded-xl px-5 py-4 text-base text-white placeholder-white/20 outline-none transition-all duration-200 resize-none"
                />
              </div>

              {/* Submit Button Matching Forge Style */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full bg-[#FF5500] hover:bg-[#E04B00] text-white font-mono text-xs sm:text-sm uppercase tracking-[0.22em] font-bold shadow-xl shadow-[#FF5500]/20 transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] cursor-pointer group"
                >
                  <span>Submit Enquiry</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>

    </section>
  );
}

