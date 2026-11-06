import Link from "next/link";
import { Logo } from "@/components/common";
import { 
  Facebook, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

/**
 * Footer Component (Server Component)
 * 
 * High-end, Awwwards-inspired industrial structural footer.
 * Strictly adheres to docs/brain.md, docs/content.md, and docs/ui-rules.md:
 * - 30% Dark Charcoal (#1F1F1E) structural foundation
 * - Energy Orange (#FF5500) interactive accents
 * - Verified Nashik, Maharashtra business domain
 * - Manrope typography
 */
export function Footer() {
  return (
    <footer className="w-full bg-[#1F1F1E] text-[#FAF8F5] pt-16 lg:pt-20 border-t border-[#2B2B2B] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14 pb-14 border-b border-white/10">
          
          {/* Brand & Purpose Column */}
          <div className="flex flex-col gap-6">
            <div className="w-[170px]">
              <Logo />
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Specialized silent generator rental solutions for weddings, grand events, and industrial projects across Nashik and Maharashtra. Dependable power from 5 kVA to 250 kVA.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <SocialIcon icon={Facebook} href="https://facebook.com" label="Facebook" />
              <SocialIcon icon={Instagram} href="https://instagram.com" label="Instagram" />
              <SocialIcon icon={Linkedin} href="https://linkedin.com" label="LinkedIn" />
            </div>
          </div>

          {/* Core Rental Services */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-sans text-base font-semibold tracking-tight uppercase">
              Rental Solutions
            </h4>
            <nav className="flex flex-col gap-3">
              <FooterLink href="/services#weddings">Wedding Generator Rentals</FooterLink>
              <FooterLink href="/services#events">Grand Event Power</FooterLink>
              <FooterLink href="/services#industrial">Industrial DG Sets</FooterLink>
              <FooterLink href="/generators">Silent Fleet (5–250 kVA)</FooterLink>
              <FooterLink href="/book">Request a Rental Quote</FooterLink>
            </nav>
          </div>

          {/* Quick Navigation */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-sans text-base font-semibold tracking-tight uppercase">
              Company & Guides
            </h4>
            <nav className="flex flex-col gap-3">
              <FooterLink href="/about">About Sarvadnya</FooterLink>
              <FooterLink href="/blog">Power Sizing Guides</FooterLink>
              <FooterLink href="/contact">Contact & Location</FooterLink>
              <FooterLink href="/wishlist">Saved Fleet Inquiries</FooterLink>
              <FooterLink href="/profile">Customer Account</FooterLink>
            </nav>
          </div>

          {/* Verified Contact Details */}
          <div className="flex flex-col gap-5">
            <h4 className="text-white font-sans text-base font-semibold tracking-tight uppercase">
              Nashik Headquarters
            </h4>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF5500] shrink-0 mt-1" />
                <span className="text-white/70 leading-snug">
                  Wadala - Pathardi Rd, Indira Nagar, Nashik, Maharashtra 422009
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF5500] shrink-0" />
                <a 
                  href="tel:+916262629944" 
                  className="text-white/80 hover:text-[#FF5500] transition-colors"
                >
                  +91 62626 29944 / +91 98231 97881
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FF5500] shrink-0" />
                <a 
                  href="mailto:info@sarvadnyagenerators.com" 
                  className="text-white/80 hover:text-[#FF5500] transition-colors"
                >
                  info@sarvadnyagenerators.com
                </a>
              </div>
              <div className="flex items-center gap-2 pt-2 text-white/50 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#FF5500]" />
                <span>Verified CPCB-II Acoustic Compliance</span>
              </div>
            </div>
          </div>

        </div>

        {/* Sub-Footer / Legal Bar */}
        <div className="py-7 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Sarvadnya Generators. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Rental</Link>
            <span>Nashik & Across Maharashtra</span>
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
      className="text-white/70 hover:text-[#FF5500] text-sm transition-colors flex items-center group w-fit"
    >
      <ArrowRight className="w-3 h-3 text-[#FF5500] opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 mr-1.5" />
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
      className="size-9 rounded-lg bg-white/5 hover:bg-[#FF5500] hover:text-[#1F1F1E] text-white/80 transition-colors flex items-center justify-center border border-white/10"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}
