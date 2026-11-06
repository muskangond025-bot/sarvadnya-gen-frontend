import Link from "next/link";
import { Logo } from "@/components/common";
import { GeneratorTruckTrack } from "@/components/shared/client";
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
 * Footer Component (Server Component)
 * 
 * Hyper-premium, Awwwards-level industrial structural footer:
 * - Transparent obsidian glass atmosphere with integrated 3D generator truck & bulbs stage
 * - Frosted glass architectural cards floating directly over the dynamic power stage
 * - Exact data, contacts, and navigation links strictly preserved
 */
export function Footer() {
  return (
    <footer className="w-full bg-[#06080A] text-[#FAF8F5] relative overflow-hidden border-t border-white/10 select-none">
      
      {/* 
        INTEGRATED STAGE: Generator Truck & Overhead Bulbs
        Footer content sits elegantly in the middle, between the overhead bulbs and the baseline road
      */}
      <GeneratorTruckTrack>
        {/* Floating Content Stage (Sitting directly over the illuminated vehicle & bulb scene) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-6 sm:pb-8 z-30">
          
          {/* Subtle Watermarked Background Marque */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans font-black text-6xl sm:text-8xl lg:text-[140px] text-white/[0.025] select-none pointer-events-none whitespace-nowrap tracking-tighter">
            SARVADNYA POWER
          </div>

          {/* 3-Column Floating Frosted Glass Architectural Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative z-10">
            
            {/* Card 1: Brand Authority & 24/7 Dispatch Desk (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl bg-[#0C0F14]/75 backdrop-blur-xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all duration-300">
              <div className="flex flex-col gap-5">
                <div className="w-[180px]">
                  <Logo variant="on-dark" />
                </div>
                <p className="text-white/70 text-sm leading-relaxed max-w-md font-sans">
                  Specialized silent generator rental solutions for weddings, grand events, and industrial projects across Nashik and Maharashtra. Dependable power from 5 kVA to 250 kVA.
                </p>

                {/* Direct Dispatch Hotline Button */}
                <div className="pt-2">
                  <a
                    href="tel:+916262629944"
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 hover:bg-[#FF5500] hover:text-white border border-white/15 text-white text-sm font-bold tracking-tight transition-all duration-300 shadow-md group"
                  >
                    <span className="size-2.5 rounded-full bg-[#22C55E] animate-pulse" />
                    <Phone className="w-4 h-4 text-[#FF5500] group-hover:text-white transition-colors" />
                    <span>Direct Dispatch: +91 62626 29944</span>
                  </a>
                </div>
              </div>

              {/* Social Channels Row */}
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/10">
                <span className="text-xs font-mono uppercase text-white/50 tracking-wider">
                  Connect:
                </span>
                <SocialIcon icon={Facebook} href="https://facebook.com" label="Facebook" />
                <SocialIcon icon={Instagram} href="https://instagram.com" label="Instagram" />
                <SocialIcon icon={Linkedin} href="https://linkedin.com" label="LinkedIn" />
              </div>
            </div>

            {/* Card 2: Core Rental Capacities (3 cols) */}
            <div className="lg:col-span-3 rounded-3xl bg-[#0C0F14]/75 backdrop-blur-xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all duration-300">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4 text-[#FF5500]" />
                  <h4 className="text-white font-sans text-xs font-mono uppercase tracking-widest text-[#FF5500]">
                    Rental Solutions
                  </h4>
                </div>
                <nav className="flex flex-col gap-3">
                  <FooterLink href="/services#weddings">Wedding Generator Rentals</FooterLink>
                  <FooterLink href="/services#events">Grand Event & Festival Power</FooterLink>
                  <FooterLink href="/services#industrial">Industrial Continuous DG Sets</FooterLink>
                  <FooterLink href="/generators">Silent Fleet (5–250 kVA)</FooterLink>
                  <FooterLink href="/book">Request a Rental Quote</FooterLink>
                </nav>
              </div>

              {/* Verified Acoustic Badge */}
              <div className="pt-4 mt-6 border-t border-white/10 flex items-center gap-2 text-white/60 text-xs">
                <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0" />
                <span>CPCB-II Acoustic Compliance</span>
              </div>
            </div>

            {/* Card 3: Nashik Depots & Quick Navigation (4 cols) */}
            <div className="lg:col-span-4 rounded-3xl bg-[#0C0F14]/75 backdrop-blur-xl border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl hover:border-white/20 transition-all duration-300">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#FF5500]" />
                  <h4 className="text-white font-sans text-xs font-mono uppercase tracking-widest text-[#FF5500]">
                    Operating Depots
                  </h4>
                </div>
                <div className="flex flex-col gap-3 text-sm text-white/70">
                  <p className="leading-snug">
                    <strong className="text-white block font-medium">Nashik Central Depot:</strong>
                    Wadala - Pathardi Rd, Indira Nagar, Nashik, Maharashtra 422009
                  </p>
                  <p className="leading-snug text-xs text-white/50 pt-1">
                    Mobilizing to MIDC Ambad, Satpur, Sinnar & Statewide Maharashtra
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="mailto:info@sarvadnyagenerators.com"
                  className="text-xs text-white/70 hover:text-[#FF5500] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>info@sarvadnyagenerators.com</span>
                </a>
                <div className="flex items-center gap-4 text-xs text-white/50 pt-2">
                  <Link href="/about" className="hover:text-white transition-colors">About</Link>
                  <Link href="/blog" className="hover:text-white transition-colors">Sizing Guides</Link>
                  <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                  <Link href="/profile" className="hover:text-white transition-colors">Account</Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </GeneratorTruckTrack>

      {/* Sub-Footer / Bottom Legal Bar */}
      <div className="w-full bg-[#040507] border-t border-white/5 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/45">
          <p>&copy; {new Date().getFullYear()} Sarvadnya Generators. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Rental</Link>
            <span className="text-[#FF5500]/70 font-mono">Nashik & Across Maharashtra</span>
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
      className="text-white/70 hover:text-[#FF5500] text-sm transition-all duration-200 flex items-center group w-fit"
    >
      <ArrowRight className="w-3 h-3 text-[#FF5500] opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 mr-1.5 shrink-0" />
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
      className="size-8 rounded-full bg-white/5 hover:bg-[#FF5500] hover:text-white text-white/75 transition-all duration-200 flex items-center justify-center border border-white/10 shadow-xs"
    >
      <Icon className="w-3.5 h-3.5" />
    </a>
  );
}
