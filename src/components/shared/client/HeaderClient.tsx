"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  ShieldCheck,
  X,
} from "lucide-react";
import { Button, LanguageSwitcher } from "@/components/common";
import { useLanguage } from "@/lib/LanguageContext";
import { useQuote } from "@/lib/QuoteContext";
import Image from "next/image";

/**
 * Navigation links for the full architectural curtain drawer
 */
const FULL_NAV_ITEMS = [
  {
    key: "nav.home",
    fallback: "Home",
    href: "/",
    image: "/images/generators/generator_38.png",
  },
  {
    key: "nav.services",
    fallback: "Services",
    href: "/services",
    image: "/images/generators/generator_14.png",
  },
  {
    key: "nav.fleet",
    fallback: "Generator",
    href: "/generators",
    image: "/images/generators/generator_10.png",
  },
  {
    key: "nav.insights",
    fallback: "Blog",
    href: "/blog",
    image: "/images/generators/generator_36.png",
  },
  {
    key: "nav.about",
    fallback: "About",
    href: "/about",
    image: "/images/generators/generator_38.png",
  },
  {
    key: "nav.contact",
    fallback: "Contact",
    href: "/contact",
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
 * Implements the floating capsule navbar design:
 * - Floating capsule pill shape (`rounded-full`)
 * - Transparent/translucent glass when at top (`!isScrolled`)
 * - Smooth transition to solid/frosted dark capsule on scroll (`isScrolled`)
 * - Left: Circular white emblem badge (`size-9 sm:size-10 rounded-full bg-white text-[#18181B]`)
 * - Center: Clean editorial text navigation links (Fleet, Services, About, Contact)
 * - Right: Action cluster: Language Switcher, Phone dispatch, Cart, Profile, Drawer switch, and White Pill CTA button
 * - Preserves all user authentication, wishlist, booking, and route data without overlap
 */
export default function Header({ children }: { children?: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { isFullscreen } = useFullscreen();
  const pathname = usePathname();
  const { t } = useLanguage();

  // Scroll detection for transparent-to-solid transition & auto-hide on scroll down / show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const isAtBottom =
        window.innerHeight + currentScrollY >=
        document.documentElement.scrollHeight - 240;

      // Solid background after 20px
      setIsScrolled(currentScrollY > 20);

      // 1. If curtain drawer is open, keep header visible
      if (isMenuOpen) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // 2. When reaching or scrolling inside the footer, ALWAYS keep navbar hidden
      // so it never overlaps or cuts off the footer cards
      if (isAtBottom && currentScrollY > 300) {
        setIsVisible(false);
        lastScrollY.current = currentScrollY;
        return;
      }

      // 3. Always visible at the top of the page (Hero section)
      if (currentScrollY <= 80) {
        setIsVisible(true);
      } else {
        // Scrolling down -> hide navbar immediately
        if (currentScrollY > lastScrollY.current + 6) {
          setIsVisible(false);
        }
        // Scrolling up -> show navbar smoothly (only when not near footer)
        else if (currentScrollY < lastScrollY.current - 10) {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    // Initialize check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  // Lock body scroll when the curtain drawer is open
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

  // Close drawer and restore visibility upon route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsVisible(true);
  }, [pathname]);

  // Hide header on auth pages or in fullscreen mode
  const isAuthPage = pathname === "/login" || pathname === "/signup";
  if (isFullscreen || isAuthPage) {
    return null;
  }

  return (
    <>
      {/* 
        FLOATING CAPSULE NAVBAR
        Floating island pill: fixed top-3.5 sm:top-5 inset-x-0
        - Transparent glass at top -> Solid dark capsule on scroll
        - Auto-hides on scroll down to give 100% viewport clearance for sections & footer
        - Smoothly reveals on scroll up
      */}
      <header
        data-testid="site-header"
        className={cn(
          "fixed top-3 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none transition-all duration-300 transform",
          isVisible || isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-24 opacity-0 pointer-events-none"
        )}
      >
        <nav
          aria-label="Main Navigation"
          className={cn(
            "pointer-events-auto w-full max-w-5xl rounded-full px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between gap-1.5 sm:gap-3 transition-all duration-300 select-none",
            isScrolled || isMenuOpen
              ? "bg-white/95 backdrop-blur-xl border border-[#E8E2D9] shadow-[0_12px_36px_rgba(0,0,0,0.08)] text-[#111315]"
              : "bg-white border border-[#E8E2D9] shadow-[0_8px_24px_rgba(0,0,0,0.06)] text-[#111315]"
          )}
        >
          {/* 
            LEFT COLUMN: OFFICIAL SARVADNYA GENERATOR EMBLEM BADGE
            Clean white rounded-square tile framing the double-orange G + lightning mark
          */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            <Link
              href="/"
              className="size-8.5 sm:size-10 rounded-xl bg-white hover:scale-105 active:scale-95 flex items-center justify-center p-0.5 shrink-0 shadow-md transition-all duration-200 overflow-hidden"
              aria-label="Sarvadnya Generator Home"
            >
              <img
                src="/images/brand/sarvadnya-emblem.png"
                alt="Sarvadnya Generator Logo"
                width={524}
                height={524}
                className="w-full h-full object-contain"
                draggable={false}
              />
            </Link>
            <Link
              href="/"
              className="hidden xl:flex flex-col text-left leading-none gap-0.5 hover:opacity-90 transition-opacity"
            >
              <span className="font-sans font-black text-xs tracking-tight text-[#111315] uppercase whitespace-nowrap">
                Sarvadnya Generator
              </span>
              <span className="font-sans text-[10.5px] text-[#FF5500] font-bold whitespace-nowrap">
                सर्वज्ञ जनरेटर
              </span>
            </Link>
          </div>

          {/* 
            RIGHT COLUMN: ACTION CLUSTER
            Language switcher + Phone + Cart + Profile + Menu toggle
          */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Language Dropdown with light theme for white navbar */}
            <LanguageSwitcher theme="light" />

            {/* Quick Telephone Dispatch Icon */}
            <a
              href="tel:+916262629944"
              className="size-8 sm:size-9 rounded-full bg-[#FAF8F5] hover:bg-[#F4EDE2] border border-[#E8E2D9] text-[#111315] hover:text-[#FF5500] hover:border-[#FF5500]/40 flex items-center justify-center transition-all shadow-2xs shrink-0"
              title="Direct Fleet Dispatch: +91 62626 29944"
              aria-label="Call Direct Fleet Dispatch"
            >
              <Phone className="w-3.5 h-3.5 text-[#FF5500]" />
            </a>

            {/* Cart / Saved Fleet Button */}
            <CartButton />

            {/* User Authentication Profile Dropdown */}
            <ProfileDropdown />

            {/* Architectural Full-Screen Menu Drawer Toggle (High-Contrast Capsule Pill) */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#111315] text-white hover:bg-[#FF5500] hover:text-white size-8.5 sm:size-auto sm:px-5 sm:py-2 text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 shadow-sm shrink-0 whitespace-nowrap active:scale-95 cursor-pointer"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              title={isMenuOpen ? "Close Menu" : "Explore All Fleet & Insights"}
            >
              <svg
                className="w-4 h-3.5 shrink-0 text-white transition-colors"
                viewBox="0 0 18 14"
                fill="none"
                aria-hidden="true"
              >
                <motion.line
                  x1={2}
                  y1={2.5}
                  x2={16}
                  y2={2.5}
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  animate={
                    isMenuOpen
                      ? { x1: 4, y1: 2, x2: 14, y2: 12 }
                      : { x1: 2, y1: 2.5, x2: 16, y2: 2.5 }
                  }
                  transition={{ duration: 0.2 }}
                />
                <motion.line
                  x1={2}
                  y1={7}
                  x2={16}
                  y2={7}
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.line
                  x1={2}
                  y1={11.5}
                  x2={16}
                  y2={11.5}
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  animate={
                    isMenuOpen
                      ? { x1: 4, y1: 12, x2: 14, y2: 2 }
                      : { x1: 2, y1: 11.5, x2: 16, y2: 11.5 }
                  }
                  transition={{ duration: 0.2 }}
                />
              </svg>
              <span className="hidden sm:inline font-sans text-xs sm:text-sm font-bold tracking-tight">
                {isMenuOpen ? t("nav.close", "CLOSE") : t("nav.menu", "MENU")}
              </span>
            </button>
          </div>
        </nav>
      </header>

      {/* 
        NAVBAR-ALIGNED ARCHITECTURAL MENU PANEL
        Matches exact w-full max-w-5xl width of the floating navbar without altering it
      */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Click-outside Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "linear" }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/45"
              aria-hidden="true"
            />

            {/* Dropdown Drawer Aligned to Navbar Width */}
            <div className="fixed top-[4.75rem] sm:top-[5.25rem] inset-x-0 z-40 flex justify-center px-3 sm:px-6 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                className="pointer-events-auto w-full max-w-5xl max-h-[calc(100vh-6rem)] flex flex-col bg-white text-[#111315] border border-[#E8E2D9] rounded-3xl shadow-[0_24px_70px_rgba(0,0,0,0.12)] overflow-y-auto overscroll-contain"
              >
                <div className="w-full px-5 sm:px-8 py-6 sm:py-7 flex flex-col justify-between gap-6">
                  {/* Navigation Grid */}
                  <nav aria-label="Mega menu navigation">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
                      {FULL_NAV_ITEMS.map((item, index) => {
                        const isActive =
                          item.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.href);

                        return (
                          <motion.li
                            key={item.href}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.04 + index * 0.03,
                              duration: 0.25,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="group relative flex items-center justify-between w-full px-3 py-2.5 rounded-2xl hover:bg-black/[0.03] transition-colors text-left"
                            >
                              <div className="flex items-baseline gap-3.5">
                                {/* Monospace Index Numeral */}
                                <span className="font-mono text-xs text-[#FF5500]/75 group-hover:text-[#FF5500] font-bold transition-colors">
                                  0{index + 1}
                                </span>

                                {/* Editorial Title */}
                                <span
                                  className={cn(
                                    "font-sans font-extrabold text-xl sm:text-2xl leading-tight tracking-tight transition-all duration-200",
                                    isActive
                                      ? "text-[#FF5500] translate-x-0.5"
                                      : "text-[#111315] group-hover:text-[#FF5500] group-hover:translate-x-1"
                                  )}
                                >
                                  {t(item.key, item.fallback)}
                                </span>
                              </div>

                              {/* Arrow Glider on Hover */}
                              <ArrowRight
                                className={cn(
                                  "w-5 h-5 text-[#FF5500] transition-all duration-200 shrink-0",
                                  isActive
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                                )}
                              />
                            </Link>
                          </motion.li>
                        );
                      })}
                    </ul>
                  </nav>

                  {/* Drawer Language Selector */}
                  <div className="pt-4 border-t border-[#E8E2D9]">
                    <LanguageSwitcher variant="drawer" theme="light" />
                  </div>

                  {/* Bottom Action Strip */}
                  <div className="pt-4 border-t border-[#E8E2D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
                    {/* Direct Contact Links */}
                    <div className="flex flex-wrap items-center gap-5">
                      <a
                        href="tel:+916262629944"
                        className="font-mono font-bold text-[#111315] hover:text-[#FF5500] transition-colors flex items-center gap-2"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#FF5500]" />
                        +91 62626 29944
                      </a>
                      <a
                        href="mailto:info@sarvadnyagenerators.com"
                        className="text-[#524E48] hover:text-[#111315] transition-colors"
                      >
                        info@sarvadnyagenerators.com
                      </a>
                    </div>

                    {/* Social Media & Quick Quote Action */}
                    <div className="flex items-center gap-3">
                      {SOCIAL_LINKS.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="size-8 rounded-full border border-[#E8E2D9] bg-[#FAF8F5] hover:bg-[#FF5500] hover:text-white hover:border-[#FF5500] flex items-center justify-center text-[#524E48] transition-all shadow-2xs"
                        >
                          {social.icon}
                        </a>
                      ))}
                      <Link
                        href="/contact"
                        onClick={() => setIsMenuOpen(false)}
                        className="rounded-full bg-[#FF5500] hover:bg-[#E04B00] text-white font-bold px-4 py-1.5 transition-all duration-200 ml-2 shadow-xs cursor-pointer"
                      >
                        {t("nav.requestQuote", "Request Quote")}
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * Saved Fleet & Wishlist Cart Button
 */
function CartButton() {
  const { totalItems } = useQuote();

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center size-8 sm:size-9 rounded-full border border-[#E8E2D9] bg-[#FAF8F5] hover:bg-[#F4EDE2] transition-all shadow-2xs text-[#111315] hover:text-[#FF5500] hover:border-[#FF5500]/40 shrink-0 cursor-pointer"
      aria-label="Generator Cart"
      title="View Detailed Cart"
    >
      <ShoppingCart className="w-3.5 h-3.5" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 size-4 rounded-full bg-[#FF5500] text-white text-[9.5px] font-bold flex items-center justify-center tabular-nums shadow-xs">
          {totalItems}
        </span>
      )}
    </Link>
  );
}

/**
 * User Account & Profile Dropdown
 */
function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user, userProfile, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll and listen for Escape key when logout modal is visible
  useEffect(() => {
    if (showLogoutModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showLogoutModal && !isLoggingOut) {
        setShowLogoutModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showLogoutModal, isLoggingOut]);

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      setShowLogoutModal(false);
      setIsOpen(false);
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoggingOut(false);
    }
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
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center size-8 sm:size-9 rounded-full border border-[#E8E2D9] bg-[#FAF8F5] hover:bg-[#F4EDE2] transition-all shadow-2xs text-[#111315] hover:text-[#FF5500] hover:border-[#FF5500]/40 overflow-hidden cursor-pointer"
        aria-label="User Account"
        aria-expanded={isOpen}
      >
        {loading ? (
          <div className="w-3.5 h-3.5 border-2 border-black/20 border-t-[#FF5500] rounded-full animate-spin" />
        ) : user && avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-full h-full object-cover"
          />
        ) : user ? (
          <span className="text-[#111315] font-bold text-xs">{initial}</span>
        ) : (
          <User className="w-3.5 h-3.5 text-[#111315]" />
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="absolute right-0 mt-2.5 w-64 bg-white border border-[#E8E2D9] rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.25)] z-50 overflow-hidden text-[#1F1F1E]">
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
                    href="/cart"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#1F1F1E] hover:bg-black/5 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingCart className="w-4 h-4 text-[#625D55]" />
                    <span>Saved Generators</span>
                  </Link>
                </div>

                <div className="border-t border-[#E8E2D9] p-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setShowLogoutModal(true);
                    }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-sm text-[#E53935] hover:bg-red-50 transition-colors rounded-lg font-medium cursor-pointer"
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

      {/* Clean, Mobile-Responsive Logout Confirmation Modal Portal (Dead-center full screen) */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {showLogoutModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 pointer-events-auto">
              {/* Fullscreen Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  if (!isLoggingOut) setShowLogoutModal(false);
                }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
                aria-hidden="true"
              />

              {/* Modal Dialog Card (Dead-centered across all viewports) */}
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="logout-modal-title"
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-sm sm:max-w-md bg-white border border-[#E8E2D9] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_24px_70px_rgba(0,0,0,0.30)] overflow-hidden z-10 text-[#111315] mx-auto"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setShowLogoutModal(false)}
                  disabled={isLoggingOut}
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl text-[#6E685F] hover:text-[#111315] hover:bg-[#FAF8F5] transition-colors cursor-pointer disabled:opacity-40"
                  aria-label="Close dialog"
                >
                  <X className="size-4 sm:size-5" />
                </button>

                {/* Clean Icon Wrapper */}
                <div className="size-12 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-600 mb-5 shrink-0">
                  <LogOut className="size-6 stroke-[2.2]" />
                </div>

                {/* Title & Description - Strictly clean without any pill dot badges */}
                <h3
                  id="logout-modal-title"
                  className="text-xl sm:text-2xl font-extrabold font-sans text-[#111315] tracking-tight"
                >
                  Are you sure you want to log out?
                </h3>
                <p className="text-xs sm:text-sm text-[#524E48] mt-2.5 leading-relaxed font-sans">
                  You will need to sign in again to access your generator bookings, active quotations, and saved fleet items.
                </p>

                {/* Action Buttons with Distinct Colors */}
                <div className="grid grid-cols-2 gap-3 sm:gap-3.5 mt-7 w-full">
                  {/* Cancel Button - Clean light neutral styling */}
                  <button
                    type="button"
                    onClick={() => setShowLogoutModal(false)}
                    disabled={isLoggingOut}
                    className="w-full py-3 px-4 rounded-xl border border-[#DED8CE] bg-white hover:bg-[#FAF8F5] active:bg-[#F3EFEA] text-[#111315] font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 text-center"
                  >
                    Cancel
                  </button>

                  {/* Logout Button - Bold red high-contrast action styling */}
                  <button
                    type="button"
                    onClick={handleConfirmLogout}
                    disabled={isLoggingOut}
                    className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs sm:text-sm shadow-md shadow-red-600/25 transition-all duration-200 cursor-pointer disabled:opacity-60 flex items-center justify-center gap-2 text-center"
                  >
                    {isLoggingOut ? (
                      <>
                        <div className="size-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Logging out...</span>
                      </>
                    ) : (
                      <>
                        <LogOut className="size-3.5 sm:size-4" />
                        <span>Yes, Logout</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
