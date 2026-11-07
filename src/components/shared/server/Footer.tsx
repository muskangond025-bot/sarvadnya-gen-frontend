"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/common";
import { GeneratorTruckTrack } from "@/components/shared/client";
import { useLanguage } from "@/lib/LanguageContext";
import { 
  Facebook, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

/**
 * Footer Component
 * 
 * Hyper-premium, Awwwards-level industrial structural footer:
 * - Single-screen viewport-balanced architecture (fits cleanly in 100vh / ~640px height)
 * - Transparent obsidian glass atmosphere with integrated 3D generator truck & bulbs stage
 * - Frosted glass architectural cards floating directly over the dynamic power stage
 * - Full realtime multi-language support (English, Hindi, Marathi)
 * - Exact data, contacts, and navigation links strictly preserved
 */
export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#FAF8F5] text-[#1F1F1E] relative overflow-hidden border-t border-[#E8E2D9] select-none min-h-[100dvh] lg:h-[100dvh] lg:max-h-[720px] flex flex-col justify-between">
      
      {/* 
        INTEGRATED BRIGHT STAGE: Bulbs + Open Free-Space Typography + Generator Truck Track
        Entire stage rendered on a clean, bright architectural canvas (NO CARDS)
      */}
      <GeneratorTruckTrack>
        {/* Floating Content Stage (Directly in open free space, ZERO CARDS) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 w-full flex-1 flex flex-col justify-center z-30">
          
          {/* Subtle Watermarked Background Marque */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans font-black text-5xl sm:text-7xl lg:text-[110px] text-black/[0.035] select-none pointer-events-none whitespace-nowrap tracking-tighter">
            SARVADNYA POWER
          </div>

          {/* 3-Column Open Architectural Flow in Free Space (NO BOXES, NO CARD FRAMES) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start relative z-10">
            
            {/* Column 1: Brand Authority & 24/7 Dispatch Desk (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full py-1">
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="w-[145px] sm:w-[160px]">
                  <Logo variant="default" />
                </div>
                <p className="text-[#524E48] text-xs sm:text-[13px] leading-relaxed max-w-md font-sans">
                  {t("footer.brandDesc")}
                </p>

                {/* Direct Dispatch Hotline Button */}
                <div>
                  <a
                    href="tel:+916262629944"
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1F1F1E] hover:bg-[#FF5500] text-white border border-[#1F1F1E] text-xs font-bold tracking-tight transition-all duration-300 shadow-sm group"
                  >
                    <span className="size-2 rounded-full bg-[#22C55E] animate-pulse" />
                    <Phone className="w-3.5 h-3.5 text-[#FF5500] group-hover:text-white transition-colors" />
                    <span>{t("footer.dispatchHotline")}</span>
                  </a>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="flex items-center gap-2.5 pt-3 mt-4 border-t border-black/10">
                <span className="text-[11px] font-mono uppercase text-[#7A756D] tracking-wider">
                  {t("footer.connect")}
                </span>
                <SocialIcon icon={Facebook} href="https://facebook.com" label="Facebook" />
                <SocialIcon icon={Instagram} href="https://instagram.com" label="Instagram" />
                <SocialIcon icon={Linkedin} href="https://linkedin.com" label="LinkedIn" />
              </div>
            </div>

            {/* Column 2: Core Rental Capacities (3 cols) */}
            <div className="lg:col-span-3 flex flex-col justify-between h-full py-1 lg:border-l lg:border-black/10 lg:pl-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-3.5 h-3.5 text-[#FF5500]" />
                  <h4 className="font-sans text-[11px] font-mono uppercase tracking-widest text-[#FF5500] font-bold">
                    {t("footer.rentalSolutions")}
                  </h4>
                </div>
                <nav className="flex flex-col gap-1.5 sm:gap-2">
                  <FooterLink href="/services#weddings">{t("footer.weddingRentals")}</FooterLink>
                  <FooterLink href="/services#events">{t("footer.grandEvents")}</FooterLink>
                  <FooterLink href="/services#industrial">{t("footer.industrialDG")}</FooterLink>
                  <FooterLink href="/generators">{t("footer.silentFleet")}</FooterLink>
                  <FooterLink href="/book">{t("footer.requestQuote")}</FooterLink>
                </nav>
              </div>

              {/* Verified Acoustic Badge */}
              <div className="pt-3 mt-4 border-t border-black/10 flex items-center gap-2 text-[#524E48] text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                <span>{t("footer.cpcbCompliance")}</span>
              </div>
            </div>

            {/* Column 3: Nashik Depots & Quick Navigation (4 cols) */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full py-1 lg:border-l lg:border-black/10 lg:pl-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#FF5500]" />
                  <h4 className="font-sans text-[11px] font-mono uppercase tracking-widest text-[#FF5500] font-bold">
                    {t("footer.operatingDepots")}
                  </h4>
                </div>
                <div className="flex flex-col gap-1.5 text-xs text-[#524E48]">
                  <p className="leading-snug">
                    <strong className="text-[#1F1F1E] block font-semibold">{t("footer.nashikDepot")}</strong>
                    {t("footer.nashikAddress")}
                  </p>
                  <p className="leading-snug text-[11px] text-[#7A756D] pt-0.5">
                    {t("footer.mobilizing")}
                  </p>
                </div>
              </div>

              <div className="pt-3 mt-4 border-t border-black/10 flex flex-col gap-1.5">
                <a
                  href="mailto:info@sarvadnyagenerators.com"
                  className="text-xs text-[#524E48] hover:text-[#FF5500] transition-colors flex items-center gap-1.5 font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>info@sarvadnyagenerators.com</span>
                </a>
                <div className="flex items-center gap-3 text-xs text-[#7A756D] pt-1">
                  <Link href="/about" className="hover:text-[#1F1F1E] transition-colors">{t("footer.about")}</Link>
                  <Link href="/blog" className="hover:text-[#1F1F1E] transition-colors">{t("footer.sizingGuides")}</Link>
                  <Link href="/contact" className="hover:text-[#1F1F1E] transition-colors">{t("footer.contact")}</Link>
                  <Link href="/profile" className="hover:text-[#1F1F1E] transition-colors">{t("footer.account")}</Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </GeneratorTruckTrack>

      {/* Sub-Footer / Bottom Legal Bar */}
      <div className="w-full bg-[#EFEAE1] border-t border-black/10 py-2.5 sm:py-3 px-4 sm:px-6 lg:px-8 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] sm:text-xs text-[#7A756D]">
          <p>&copy; {new Date().getFullYear()} {t("footer.rightsReserved")}</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-[#1F1F1E] transition-colors">{t("footer.privacyPolicy")}</Link>
            <Link href="/terms" className="hover:text-[#1F1F1E] transition-colors">{t("footer.termsOfRental")}</Link>
            <span className="text-[#FF5500] font-mono font-medium">{t("footer.coverageTag")}</span>
          </div>
        </div>
      </div>

    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-[#524E48] hover:text-[#FF5500] text-xs font-medium transition-all duration-200 flex items-center group w-fit"
    >
      <ArrowRight className="w-3 h-3 text-[#FF5500] opacity-0 -ml-2.5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 mr-1 shrink-0" />
      <span>{children}</span>
    </Link>
  );
}

function SocialIcon({ icon: Icon, href, label }: { icon: any; href: string; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className="size-7 rounded-full bg-black/5 hover:bg-[#FF5500] hover:text-white text-[#1F1F1E] transition-all duration-200 flex items-center justify-center border border-black/10 shadow-2xs"
    >
      <Icon className="w-3.5 h-3.5" />
    </a>
  );
}
