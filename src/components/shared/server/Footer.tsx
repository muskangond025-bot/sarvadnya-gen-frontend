"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/common";
import { GeneratorTruckTrack } from "@/components/shared/client";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
} from "lucide-react";

/**
 * Footer Component
 *
 * Clean, spacious bright-theme footer with glassmorphic icons, underline newsletter
 * input, Quick Links, Contact Info, Legal + Language Bar, and overhead bulbs + truck stage.
 */
export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="w-full bg-[#FAF8F5] text-[#111315] relative overflow-x-clip border-t border-[#E8E2D9] select-none flex flex-col">
      {/* Driving 3D Generator Truck & Roadway Stage */}
      <GeneratorTruckTrack>
        {/* Generous top clearance (pt-16 sm:pt-20 lg:pt-24) ensures overhead bulbs never clip or overlap headings */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-10 w-full z-30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Column 1: Brand & Glassmorphic Socials (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div className="w-fit">
                <Logo variant="default" />
              </div>

              <p className="text-[#403C36] text-sm leading-relaxed max-w-sm">
                Providing reliable power solutions across India since 2010. We
                specialize in high-performance generator rentals and maintenance
                for industrial and residential needs.
              </p>

              <div className="flex items-center gap-2.5 pt-1">
                <SocialIcon
                  icon={Facebook}
                  href="https://facebook.com"
                  label="Facebook"
                />
                <SocialIcon
                  icon={Twitter}
                  href="https://twitter.com"
                  label="Twitter"
                />
                <SocialIcon
                  icon={Linkedin}
                  href="https://linkedin.com"
                  label="LinkedIn"
                />
                <SocialIcon
                  icon={Instagram}
                  href="https://instagram.com"
                  label="Instagram"
                />
              </div>
            </div>

            {/* Column 2: Quick Links (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="flex items-center gap-2 font-sans text-sm font-bold text-[#111315]">
                <Zap className="w-4 h-4 text-[#111315]/70 shrink-0" />
                <span>Quick Links</span>
              </h4>
              <nav className="flex flex-col gap-2.5">
                <FooterLink href="/">Home</FooterLink>
                <FooterLink href="/about">About Us</FooterLink>
                <FooterLink href="/generators">Generator Fleet</FooterLink>
                <FooterLink href="/services">Our Services</FooterLink>
                <FooterLink href="/contact">Contact Us</FooterLink>
              </nav>
            </div>

            {/* Column 3: Contact Info with Glassmorphic Icons (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-sans text-sm font-bold text-[#111315]">
                Contact Info
              </h4>

              <div className="space-y-4 text-sm">
                {/* Call Support */}
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-xl bg-white/45 backdrop-blur-md border border-white/75 shadow-[0_4px_14px_rgba(17,19,21,0.06)] flex items-center justify-center text-[#111315]/75 shrink-0 mt-0.5">
                    <Phone className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#111315]">
                      Call Support
                    </p>
                    <p className="text-xs text-[#403C36] mt-0.5 leading-relaxed">
                      <a
                        href="tel:+916262629944"
                        className="hover:text-[#111315] transition-colors whitespace-nowrap"
                      >
                        +91 62626 29944
                      </a>{" "}
                      /{" "}
                      <a
                        href="tel:+919823197881"
                        className="hover:text-[#111315] transition-colors whitespace-nowrap"
                      >
                        +91 98231 97881
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email Us */}
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-xl bg-white/45 backdrop-blur-md border border-white/75 shadow-[0_4px_14px_rgba(17,19,21,0.06)] flex items-center justify-center text-[#111315]/75 shrink-0 mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#111315]">Email Us</p>
                    <a
                      href="mailto:info@sarvadnyagenerators.com"
                      className="text-xs text-[#403C36] hover:text-[#111315] transition-colors mt-0.5 block whitespace-nowrap"
                    >
                      info@sarvadnyagenerators.com
                    </a>
                  </div>
                </div>

                {/* Our Location */}
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-xl bg-white/45 backdrop-blur-md border border-white/75 shadow-[0_4px_14px_rgba(17,19,21,0.06)] flex items-center justify-center text-[#111315]/75 shrink-0 mt-0.5">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#111315]">
                      Our Location
                    </p>
                    <p className="text-xs text-[#403C36] mt-0.5 leading-relaxed">
                      Wadala - Pathardi Rd, Indira Nagar, Nashik
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Open Line-Based Newsletter (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-sans text-sm font-bold text-[#111315]">
                Newsletter
              </h4>

              <p className="text-xs text-[#403C36] leading-relaxed">
                Subscribe to get the latest updates on power management and
                generator maintenance tips.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 py-2.5 border-b border-[#111315]/30 text-xs font-semibold text-[#111315]">
                  <CheckCircle2 className="w-4 h-4 text-[#111315] shrink-0" />
                  <span>Subscribed successfully!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-3">
                  <div className="flex items-center gap-2 pb-2 border-b border-[#111315]/25 focus-within:border-[#111315] transition-colors">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      aria-label="Your email address"
                      required
                      className="flex-1 min-w-0 bg-transparent py-1 text-xs sm:text-sm text-[#111315] placeholder:text-[#7A756D] focus:outline-none"
                    />
                    <button
                      type="submit"
                      aria-label="Subscribe to newsletter"
                      className="size-8 rounded-full bg-white/55 hover:bg-[#111315] text-[#111315] hover:text-white backdrop-blur-md border border-black/15 flex items-center justify-center transition-all shrink-0 cursor-pointer shadow-2xs"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#524E48]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#111315]/65 shrink-0" />
                    <span>Secure &amp; Encrypted</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </GeneratorTruckTrack>

      {/* Sub-Footer Legal Bar (Clear of floating bottom-right chat/WhatsApp widget) */}
      <div className="w-full bg-[#EFEAE1] border-t border-[#E2DDD4] py-4 px-4 sm:px-6 lg:px-8 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#524E48] pr-16 sm:pr-24">
          <p>&copy; 2026 Sarvadnya Generators. All rights reserved.</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <Link
              href="/privacy"
              className="hover:text-[#111315] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="hover:text-[#111315] transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#111315] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-[#403C36] hover:text-[#111315] text-sm font-medium transition-colors inline-flex items-center group w-fit"
    >
      <ArrowRight className="w-0 h-3.5 text-[#111315] opacity-0 overflow-hidden group-hover:w-3.5 group-hover:opacity-100 group-hover:mr-1.5 transition-all duration-200 shrink-0" />
      <span>{children}</span>
    </Link>
  );
}

function SocialIcon({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="size-8 rounded-xl bg-white/45 backdrop-blur-md hover:bg-white/85 text-[#111315]/75 hover:text-[#111315] transition-all flex items-center justify-center border border-white/75 shadow-[0_4px_14px_rgba(17,19,21,0.06)]"
    >
      <Icon className="w-3.5 h-3.5" />
    </a>
  );
}
