"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useFullscreen } from "@/lib/FullscreenContext";
import { useAuth } from "@/lib/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  User,
  LogOut,
  Phone,
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/common";
import Image from "next/image";

/**
 * Navigation links preserving all existing routes and data.
 */
const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    caption: "Silent Fleet & Power Solutions",
    image: "/images/generators/generator_38.png",
  },
  {
    label: "Generator Fleet",
    href: "/generators",
    caption: "5 kVA to 250 kVA Acoustic Units",
    image: "/images/generators/generator_10.png",
  },
  {
    label: "Rental Services",
    href: "/services",
    caption: "Weddings, Events & Industrial Plants",
    image: "/images/generators/generator_14.png",
  },
  {
    label: "Rental Insights",
    href: "/blog",
    caption: "Technical Load Sizing & Operational Advice",
    image: "/images/generators/generator_36.png",
  },
  {
    label: "About Sarvadnya",
    href: "/about",
    caption: "Decades of Precision Power Engineering",
    image: "/images/generators/generator_38.png",
  },
  {
    label: "Contact & Logistics",
    href: "/contact",
    caption: "Nashik Depots & Statewide Maharashtra",
    image: "/images/generators/generator_10.png",
  },
];

const SOCIAL_LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/916262629944",
    icon: (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.122-.518-1.554-.645-2.535-2.227-2.613-2.33-.077-.104-.632-.843-.632-1.608 0-.765.399-1.142.541-1.298.144-.156.314-.195.42-.195.105 0 .211.001.303.006.097.004.228-.037.356.27.132.316.452 1.103.492 1.185.04.082.067.177.013.284-.053.106-.08.172-.16.265-.079.094-.167.21-.239.282-.08.081-.163.169-.07.329.093.16.413.682.887 1.104.611.543 1.127.712 1.287.792.16.08.254.07.348-.039.094-.109.4-.467.507-.627.106-.16.213-.133.359-.08.146.053.931.439 1.091.519.16.08.267.12.306.186.04.066.04.385-.104.79z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg className="size-4.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.67 1.67 0 1 0 0-3.34 1.67 1.67 0 0 0 0 3.34m1.39 9.74v-8.37H5.07v8.37h2.78z" />
      </svg>
    ),
  },
];

/**
 * Header Component (Client Component)
 *
 * Implements the exact architecture, 3-column layout, and animation language
 * of spykercars.com (Awwwards SOTD by The Brink Agency):
 * - Fixed Top Chrome Bar with 3-column grid (Left: Menu Switch, Center: Logo, Right: Actions)
 * - Full-screen / Curtain Drawer with staggered large-format editorial navigation
 * - Photorealistic equipment stage preview on hover
 * - Bottom industrial telemetry & direct logistics contacts
 * - Preserves all user authentication, wishlist, booking, and route data
 */
export default function Header({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const { isFullscreen } = useFullscreen();
  const pathname = usePathname();

  // Scroll detection for frosted glass backdrop transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when the Spyker-style curtain drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close drawer upon route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Hide header on auth pages or in fullscreen mode
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  if (isFullscreen || isAuthPage) {
    return null;
  }

  return (
    <>
      {/* 
        SPYKER TOP BAR: Fixed Chrome Header
        Matches spykercars.com: `fixed inset-x-0 top-0 z-50` with grid-cols-[1fr_auto_1fr]
      */}
      <header
        data-testid="site-header"
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 pointer-events-auto",
          isScrolled || isMenuOpen
            ? "bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D9] shadow-[0_4px_20px_rgba(31,31,30,0.04)]"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <nav className="grid w-full grid-cols-[1fr_auto_1fr] items-center py-3.5 sm:py-4">
            
            {/* 
              LEFT COLUMN: SPYKER BESPOKE MENU SWITCH BUTTON
              Exact analog trigger button with animated lines and text label
            */}
            <div className="flex items-center justify-self-start gap-3">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="heritage-interactive-trigger group relative z-50 flex items-center gap-2.5 py-1.5 px-2.5 sm:px-3 rounded-full border border-[#E8E2D9] bg-white/90 hover:bg-white hover:border-[#1F1F1E] transition-all shadow-xs cursor-pointer select-none"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {/* Precision Mechanical Switch Toggle Icon */}
                <div className="relative size-4 sm:size-4.5 flex flex-col items-center justify-center gap-1">
                  <motion.span
                    animate={
                      isMenuOpen
                        ? { rotate: 45, y: 5, backgroundColor: "#FF5500" }
                        : { rotate: 0, y: 0, backgroundColor: "#1F1F1E" }
                    }
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="w-3.5 sm:w-4 h-[1.75px] rounded-full block transition-colors"
                  />
                  <motion.span
                    animate={
                      isMenuOpen
                        ? { opacity: 0, scaleX: 0 }
                        : { opacity: 1, scaleX: 1, backgroundColor: "#1F1F1E" }
                    }
                    transition={{ duration: 0.2 }}
                    className="w-3.5 sm:w-4 h-[1.75px] rounded-full block transition-colors"
                  />
                  <motion.span
                    animate={
                      isMenuOpen
                        ? { rotate: -45, y: -5, backgroundColor: "#FF5500" }
                        : { rotate: 0, y: 0, backgroundColor: "#1F1F1E" }
                    }
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="w-3.5 sm:w-4 h-[1.75px] rounded-full block transition-colors"
                  />
                </div>

                {/* Spyker-style Uppercase Monospace Menu Text Label */}
                <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#1F1F1E] group-hover:text-[#FF5500] transition-colors">
                  {isMenuOpen ? "CLOSE" : "MENU"}
                </span>
              </button>

              {/* Desktop Subtle Direct Link Shortcuts */}
              <div className="hidden xl:flex items-center gap-5 ml-2 text-xs font-medium text-[#625D55]">
                <Link
                  href="/generators"
                  className="hover:text-[#1F1F1E] transition-colors"
                >
                  Fleet (5–250 kVA)
                </Link>
                <Link
                  href="/services"
                  className="hover:text-[#1F1F1E] transition-colors"
                >
                  Services
                </Link>
              </div>
            </div>

            {/* 
              CENTER COLUMN: EXACT SPYKER CENTERED EMBLEM / BRAND LOGO
              Matches spykercars.com: `id="header-logo-placeholder" class="justify-self-center"`
            */}
            <div className="justify-self-center flex items-center justify-center relative z-50">
              {children}
            </div>

            {/* 
              RIGHT COLUMN: QUICK ACTION TELEMETRY & AUTH CLUSTER
              Cart / Saved Fleet, User Profile, Direct Dispatch Contact & Quote
            */}
            <div className="relative z-50 flex items-center justify-self-end gap-2 sm:gap-3">
              {/* Telephone Fast Dispatch Trigger (Hidden on tiny screens) */}
              <a
                href="tel:+916262629944"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E2D9] bg-white hover:border-[#1F1F1E] hover:bg-[#FAF8F5] transition-all text-xs font-semibold text-[#1F1F1E] shadow-xs"
                title="Direct Fleet Dispatch"
              >
                <Phone className="w-3.5 h-3.5 text-[#FF5500]" />
                <span className="font-mono tracking-tight">+91 62626 29944</span>
              </a>

              {/* Cart / Saved Fleet Inquiries Button with Monospace Counter */}
              <CartButton />

              {/* User Authentication Profile Dropdown */}
              <ProfileDropdown />

              {/* Primary Quote CTA Button */}
              <div className="hidden sm:block">
                <Button href="/book" variant="primary" size="sm">
                  Request Quote
                </Button>
              </div>
            </div>

          </nav>
        </div>
      </header>

      {/* 
        SPYKER FULL-SCREEN ARCHITECTURAL CURTAIN DRAWER
        Matches spykercars.com:
        - `role="dialog" aria-label="Navigation menu"`
        - Sliding curtain transition from top
        - Left 50%: Staggered large-format editorial navigation links + social icons
        - Right 50%: Photorealistic equipment stage with telemetry
        - Bottom strip: Direct email, dispatch desk, and verified assurances
      */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "linear" }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Sliding Curtain Drawer Panel */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed inset-x-0 top-0 z-40 w-screen max-h-screen md:max-h-[94vh] flex flex-col bg-white border-b border-[#B2B2B2] shadow-2xl overflow-y-auto overscroll-contain"
            >
              {/* Drawer Content Container with Top Offset for Header */}
              <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-24 sm:pt-28 pb-8 flex flex-col justify-between flex-1">
                
                {/* Main 2-Column Split Stage */}
                <div className="flex flex-col md:flex-row items-stretch gap-8 lg:gap-14 pb-8">
                  
                  {/* LEFT HALF: Large-Format Editorial Navigation Links */}
                  <div className="flex w-full md:w-1/2 flex-col justify-between">
                    <nav>
                      <ul className="flex flex-col gap-2.5 sm:gap-3.5">
                        {NAV_ITEMS.map((item, index) => {
                          const isActive =
                            item.href === "/"
                              ? pathname === "/"
                              : pathname.startsWith(item.href);

                          return (
                            <motion.li
                              key={item.href}
                              initial={{ opacity: 0, x: -18 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: 0.12 + index * 0.045,
                                duration: 0.4,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              onMouseEnter={() => setHoveredIndex(index)}
                            >
                              <Link
                                href={item.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="group/navlink relative flex items-baseline justify-between w-full py-1 text-left"
                              >
                                <div className="flex items-baseline gap-3 sm:gap-4">
                                  {/* Monospace Index Numeral */}
                                  <span className="font-mono text-xs sm:text-sm text-[#FF5500] font-bold">
                                    0{index + 1}
                                  </span>

                                  {/* Huge Editorial Headline Typography */}
                                  <span
                                    className={cn(
                                      "font-sans font-extrabold text-2xl sm:text-3xl lg:text-[38px] leading-tight tracking-tight transition-all duration-300",
                                      isActive
                                        ? "text-[#FF5500] translate-x-1"
                                        : "text-[#1F1F1E] group-hover/navlink:text-[#FF5500] group-hover/navlink:translate-x-1.5"
                                    )}
                                  >
                                    {item.label}
                                  </span>
                                </div>

                                {/* Arrow Glider on Hover */}
                                <ArrowRight
                                  className={cn(
                                    "w-5 h-5 text-[#FF5500] transition-all duration-300 shrink-0",
                                    isActive
                                      ? "opacity-100 translate-x-0"
                                      : "opacity-0 -translate-x-2 group-hover/navlink:opacity-100 group-hover/navlink:translate-x-0"
                                  )}
                                />
                              </Link>
                            </motion.li>
                          );
                        })}
                      </ul>
                    </nav>

                    {/* Social Media & WhatsApp Links Row (data-navigation-social-item) */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                      className="mt-8 pt-6 border-t border-[#E8E2D9] flex items-center gap-6"
                    >
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#625D55]">
                        Connect:
                      </span>
                      <div className="flex items-center gap-4">
                        {SOCIAL_LINKS.map((social) => (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            className="size-8 rounded-full border border-[#E8E2D9] bg-[#FAF8F5] flex items-center justify-center text-[#1F1F1E] hover:text-[#FF5500] hover:border-[#FF5500] hover:bg-white transition-all shadow-2xs"
                          >
                            {social.icon}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* RIGHT HALF: Photorealistic Equipment Showcase Stage (Hidden on Mobile) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="relative hidden md:flex flex-col justify-between w-1/2 aspect-square lg:aspect-3/2 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] p-7 overflow-hidden shadow-sm"
                  >
                    {/* Ambient Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FF5500]/10 blur-3xl rounded-full pointer-events-none" />

                    {/* Top Stage Tag */}
                    <div className="relative z-10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
                        <span className="font-mono uppercase font-bold text-[#1F1F1E] tracking-wider">
                          Sarvadnya Silent DG Fleet
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-[#625D55]">
                        Nashik Depot Ready
                      </span>
                    </div>

                    {/* Dynamic Equipment Image changing with hovered link */}
                    <div className="relative z-10 w-full h-44 lg:h-52 my-3 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={hoveredIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                          className="relative w-4/5 h-full filter drop-shadow-[0_15px_20px_rgba(31,31,30,0.18)]"
                        >
                          <Image
                            src={NAV_ITEMS[hoveredIndex]?.image || "/images/generators/generator_10.png"}
                            alt={NAV_ITEMS[hoveredIndex]?.label || "Generator"}
                            fill
                            sizes="(max-width: 1024px) 35vw, 400px"
                            className="object-contain"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Caption / Specification Snippet */}
                    <div className="relative z-10 pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-xs text-[#625D55]">
                      <span className="font-medium text-[#1F1F1E]">
                        {NAV_ITEMS[hoveredIndex]?.caption}
                      </span>
                      <span className="font-mono text-[#FF5500] font-semibold">
                        CPCB-II Acoustic
                      </span>
                    </div>
                  </motion.div>

                </div>

                {/* 
                  BOTTOM INFORMATION STRIP
                  Matches Spyker's bottom data rows: direct email, HQ, and verified assurances
                */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                  className="pt-6 border-t border-[#E8E2D9] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#625D55] font-mono uppercase text-[10px] tracking-wider">
                      Direct Dispatch Hotline
                    </span>
                    <a
                      href="tel:+916262629944"
                      className="font-bold text-[#1F1F1E] hover:text-[#FF5500] transition-colors"
                    >
                      +91 62626 29944
                    </a>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#625D55] font-mono uppercase text-[10px] tracking-wider">
                      Fleet Inquiry Desk
                    </span>
                    <a
                      href="mailto:info@sarvadnyagenerators.com"
                      className="font-bold text-[#1F1F1E] hover:text-[#FF5500] transition-colors truncate"
                    >
                      info@sarvadnyagenerators.com
                    </a>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="text-[#625D55] font-mono uppercase text-[10px] tracking-wider">
                      Operating Depot
                    </span>
                    <span className="font-bold text-[#1F1F1E]">
                      Nashik Urban & MIDC Industrial Zones
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[#1F1F1E] font-semibold sm:justify-end">
                    <ShieldCheck className="w-4 h-4 text-[#FF5500] shrink-0" />
                    <span>24/7 On-Site Operator & Rigging</span>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Saved Fleet & Wishlist Cart Button with Monospace Counter
 */
function CartButton() {
  return (
    <Link
      href="/wishlist"
      className="relative flex items-center justify-center size-8 sm:size-9 rounded-full border border-[#E8E2D9] bg-white hover:border-[#1F1F1E] hover:bg-[#FAF8F5] transition-all shadow-xs text-[#1F1F1E] hover:text-[#FF5500]"
      aria-label="Wishlist & Inquiries"
      title="Saved Fleet Inquiries"
    >
      <ShoppingCart className="w-4 h-4" />
      <span
        aria-hidden="true"
        className="absolute -top-1 -right-1 size-4 rounded-full bg-[#FF5500] text-white font-mono text-[9px] font-bold flex items-center justify-center tabular-nums shadow-xs"
      >
        0
      </span>
    </Link>
  );
}

/**
 * User Account & Profile Dropdown (Preserving all AuthContext states)
 */
function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userProfile, loading, signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    setIsOpen(false);
    router.push("/");
  };

  const displayName =
    userProfile?.name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";
  const displayEmail = userProfile?.email || user?.email || "";
  const avatarUrl =
    userProfile?.profile_image_url || user?.user_metadata?.avatar_url;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center size-8 sm:size-9 rounded-full border border-[#E8E2D9] bg-white hover:border-[#1F1F1E] hover:bg-[#FAF8F5] transition-all shadow-xs overflow-hidden cursor-pointer"
        aria-label="User Account"
      >
        {loading ? (
          <div className="w-3.5 h-3.5 border-2 border-[#1F1F1E]/30 border-t-[#FF5500] rounded-full animate-spin" />
        ) : user && avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-full h-full object-cover"
          />
        ) : user ? (
          <span className="text-[#1F1F1E] font-bold text-xs">{initial}</span>
        ) : (
          <User className="w-4 h-4 text-[#1F1F1E]" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E8E2D9] rounded-xl shadow-lg z-50 overflow-hidden">
            {user ? (
              <>
                <div className="p-4 border-b border-[#E8E2D9]">
                  <div className="flex items-center gap-3">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={displayName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#FF5500] flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{initial}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[#1F1F1E] font-medium font-sans truncate text-sm">
                        {displayName}
                      </p>
                      <p className="text-[#625D55] text-xs truncate">
                        {displayEmail}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1F1F1E] hover:bg-black/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-4 h-4 text-[#625D55]" />
                    <span>My Account</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1F1F1E] hover:bg-black/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingCart className="w-4 h-4 text-[#625D55]" />
                    <span>Saved Generators</span>
                  </Link>
                </div>

                <div className="border-t border-[#E8E2D9] p-1.5">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-[#E53935] hover:bg-red-50 transition-colors rounded-lg font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="p-4 space-y-2.5">
                <Button href="/login" variant="primary" size="sm" fullWidth>
                  Sign In
                </Button>
                <Link
                  href="/signup"
                  className="block text-center text-[#625D55] hover:text-[#1F1F1E] text-xs font-sans transition-colors pt-1"
                  onClick={() => setIsOpen(false)}
                >
                  Create an Account
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
