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
  ArrowRight,
} from "lucide-react";

/**
 * Footer Component
 *
 * Clean, spacious architectural footer integrated with the GeneratorTruckTrack
 * lighting bulbs and driving truck stage.
 */
export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-[#FAF8F5] text-[#111315] relative overflow-hidden border-t border-[#E8E2D9] select-none flex flex-col">
      {/* Preserves Edison bulbs overhead + 3D Generator Truck Track below */}
      <GeneratorTruckTrack>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-8 sm:pb-10 w-full z-30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Column 1: Brand & Social */}
            <div className="lg:col-span-4 space-y-5">
              <div className="w-fit">
                <Logo variant="default" />
              </div>

              <p className="text-[#403C36] text-sm leading-relaxed max-w-sm">
                {t("footer.brandDesc")}
              </p>

              <div className="flex items-center gap-2.5 pt-1">
                <SocialIcon
                  icon={Facebook}
                  href="https://facebook.com"
                  label="Facebook"
                />
                <SocialIcon
                  icon={Instagram}
                  href="https://instagram.com"
                  label="Instagram"
                />
                <SocialIcon
                  icon={Linkedin}
                  href="https://linkedin.com"
                  label="LinkedIn"
                />
              </div>
            </div>

            {/* Column 2: Rental Solutions */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF5500] font-bold">
                {t("footer.rentalSolutions")}
              </h4>
              <nav className="flex flex-col gap-2.5">
                <FooterLink href="/services#weddings">
                  {t("footer.weddingRentals")}
                </FooterLink>
                <FooterLink href="/services#events">
                  {t("footer.grandEvents")}
                </FooterLink>
                <FooterLink href="/services#industrial">
                  {t("footer.industrialDG")}
                </FooterLink>
                <FooterLink href="/generators">
                  {t("footer.silentFleet")}
                </FooterLink>
                <FooterLink href="/book">
                  {t("footer.requestQuote")}
                </FooterLink>
              </nav>
            </div>

            {/* Column 3: Company Navigation */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#111315] font-bold">
                Explore
              </h4>
              <nav className="flex flex-col gap-2.5">
                <FooterLink href="/about">{t("footer.about")}</FooterLink>
                <FooterLink href="/blog">{t("footer.sizingGuides")}</FooterLink>
                <FooterLink href="/contact">{t("footer.contact")}</FooterLink>
                <FooterLink href="/profile">{t("footer.account")}</FooterLink>
              </nav>
            </div>

            {/* Column 4: Nashik Depot & Direct Dispatch */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#FF5500] font-bold">
                {t("footer.operatingDepots")}
              </h4>

              <div className="space-y-1.5 text-sm text-[#403C36]">
                <p className="font-semibold text-[#111315]">
                  {t("footer.nashikDepot")}
                </p>
                <p className="text-xs leading-relaxed text-[#524E48]">
                  {t("footer.nashikAddress")}
                </p>
              </div>

              <div className="space-y-3 pt-1">
                <a
                  href="mailto:info@sarvadnyagenerators.com"
                  className="text-xs text-[#403C36] hover:text-[#FF5500] transition-colors inline-flex items-center gap-2 font-medium"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FF5500] shrink-0" />
                  <span>info@sarvadnyagenerators.com</span>
                </a>

                <div>
                  <a
                    href="tel:+916262629944"
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#18181B] hover:bg-[#FF5500] text-white text-xs font-bold tracking-tight transition-colors shadow-xs whitespace-nowrap"
                  >
                    <Phone className="w-3.5 h-3.5 shrink-0" />
                    <span>{t("footer.dispatchHotline")}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </GeneratorTruckTrack>

      {/* Clean Legal Sub-Footer */}
      <div className="w-full bg-[#EFEAE1] border-t border-[#E2DDD4] py-4 px-4 sm:px-6 lg:px-8 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#524E48]">
          <p>
            &copy; {new Date().getFullYear()} {t("footer.rightsReserved")}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <Link
              href="/privacy"
              className="hover:text-[#111315] transition-colors"
            >
              {t("footer.privacyPolicy")}
            </Link>
            <Link
              href="/terms"
              className="hover:text-[#111315] transition-colors"
            >
              {t("footer.termsOfRental")}
            </Link>
            <span className="text-[#FF5500] font-mono font-semibold">
              {t("footer.coverageTag")}
            </span>
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
      className="text-[#403C36] hover:text-[#FF5500] text-sm font-medium transition-colors inline-flex items-center group w-fit"
    >
      <ArrowRight className="w-0 h-3.5 text-[#FF5500] opacity-0 overflow-hidden group-hover:w-3.5 group-hover:opacity-100 group-hover:mr-1.5 transition-all duration-200 shrink-0" />
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
      className="size-8 rounded-full bg-white hover:bg-[#FF5500] hover:text-white text-[#111315] transition-colors flex items-center justify-center border border-[#DED8CE] hover:border-[#FF5500] shadow-2xs"
    >
      <Icon className="w-3.5 h-3.5" />
    </a>
  );
}
