"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { useQuote } from "@/lib/QuoteContext";
import { useAuth } from "@/lib/AuthContext";
import { LoginModal } from "@/components/auth/client/LoginModal";
import Image from "next/image";

/**
 * QuoteDrawer Component
 * 
 * Luxury Slide-Over Quote & Fleet Cart Drawer:
 * - Slides in from the right edge with smooth spring motion
 * - Pure Bright Luxury Theme (#FAF8F5 canvas, #111315 ink, #FF5500 accents, #E8E2D9 borders)
 * - Zero pill badges, zero artificial tags, zero AI slop
 * - Direct duration and quantity adjusters per generator set
 * - Clear subtotal calculation and 1-click progression to Booking / Checkout
 */
export function QuoteDrawer() {
  const router = useRouter();
  const { user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateDays,
    updateQuantity,
    clearQuote,
    totalItems,
    totalDailyEstimate,
  } = useQuote();

  // Close on Escape key press & lock body scroll
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isDrawerOpen) {
        closeDrawer();
      }
    }

    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawerOpen, closeDrawer]);

  const handleProceedToCheckout = () => {
    // Strict Checkout Gate: Require Login Before Proceeding to Checkout
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    closeDrawer();
    // Pass first generator kVA or default to book page
    const primaryKva = items[0]?.kva?.replace(/[^0-9]/g, "") || "";
    if (primaryKva) {
      router.push(`/book?kVA=${encodeURIComponent(primaryKva)}&quote=active`);
    } else {
      router.push("/book");
    }
  };

  return (
    <>
      <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[150] flex justify-end">
          {/* Subtle Ambient Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          {/* Slide-over Drawer Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="relative w-full max-w-lg bg-[#FAF8F5] text-[#111315] shadow-2xl flex flex-col h-full border-l border-[#E8E2D9] z-10 overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Fleet Quote Drawer"
          >
            {/* ---------------------------------------------------- */}
            {/* DRAWER HEADER                                        */}
            {/* ---------------------------------------------------- */}
            <div className="px-6 py-5 bg-white border-b border-[#E8E2D9] flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#111315] font-sans tracking-tight">
                  Fleet Quote
                </h2>
                <p className="text-xs text-[#625D55] font-normal mt-0.5">
                  {totalItems === 0
                    ? "No generators selected"
                    : `${totalItems} generator set${totalItems > 1 ? "s" : ""} selected for deployment`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearQuote}
                    className="text-xs text-[#8C8275] hover:text-[#E53935] px-2 py-1 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeDrawer}
                  className="size-9 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] hover:bg-[#E8E2D9] text-[#111315] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close quote drawer"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* DRAWER BODY: ITEMS LIST OR EMPTY STATE               */}
            {/* ---------------------------------------------------- */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 overscroll-contain">
              {items.length === 0 ? (
                /* Pure Clean Empty State (Zero AI Slop) */
                <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
                  <div className="size-16 rounded-2xl bg-white border border-[#E8E2D9] flex items-center justify-center text-[#8C8275] mb-4 shadow-2xs">
                    <Zap className="size-7 text-[#FF5500]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111315] font-sans">
                    Your quote list is empty
                  </h3>
                  <p className="text-sm text-[#625D55] max-w-xs mt-1.5 leading-relaxed">
                    Select silent diesel generator sets from our fleet to calculate rental rates and initiate booking.
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        closeDrawer();
                        router.push("/generators");
                      }}
                      className="px-6 py-2.5 rounded-xl bg-[#111315] text-white font-bold text-xs hover:bg-[#FF5500] transition-colors shadow-xs cursor-pointer"
                    >
                      Explore Generator Fleet
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        closeDrawer();
                        router.push("/cart");
                      }}
                      className="px-4 py-2.5 rounded-xl border border-[#E8E2D9] text-[#111315] font-semibold text-xs hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                    >
                      Go to Cart Page
                    </button>
                  </div>
                </div>
              ) : (
                /* List of Shortlisted Generators */
                items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-white border border-[#E8E2D9] shadow-2xs flex flex-col gap-3 group transition-all"
                  >
                    {/* Top Row: Thumbnail, Title, and Delete */}
                    <div className="flex items-start gap-3.5">
                      <div className="relative size-18 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] shrink-0 overflow-hidden flex items-center justify-center">
                        <img
                          src={item.image || "/placeholder-gen.jpg"}
                          alt={item.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="text-sm font-bold text-[#111315] truncate font-sans">
                            {item.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-[#8C8275] hover:text-[#E53935] p-1 transition-colors cursor-pointer shrink-0"
                            title="Remove set"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>

                        {/* Specs row */}
                        <p className="text-xs text-[#625D55] mt-0.5">
                          {item.kva} {item.phase ? `• ${item.phase}` : ""} {item.noiseLevel ? `• ${item.noiseLevel} dB` : ""}
                        </p>

                        {/* Unit Daily Rate */}
                        <p className="text-xs font-bold text-[#FF5500] mt-1 font-mono">
                          ₹{item.dailyRate.toLocaleString("en-IN")}{" "}
                          <span className="text-[#8C8275] font-normal text-[11px]">/ day</span>
                        </p>
                      </div>
                    </div>

                    {/* Bottom Controls Row: Duration (Days) & Quantity */}
                    <div className="pt-3 border-t border-[#FAF8F5] flex items-center justify-between gap-3 text-xs">
                      {/* Rental Days Stepper */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#8C8275] font-medium text-[11px]">Days:</span>
                        <div className="flex items-center rounded-lg border border-[#E8E2D9] bg-[#FAF8F5]">
                          <button
                            type="button"
                            onClick={() => updateDays(item.id, item.days - 1)}
                            className="size-6 flex items-center justify-center text-[#111315] hover:bg-[#E8E2D9] rounded-l-lg transition-colors cursor-pointer"
                            aria-label="Decrease days"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-7 text-center font-bold text-xs text-[#111315] tabular-nums">
                            {item.days}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateDays(item.id, item.days + 1)}
                            className="size-6 flex items-center justify-center text-[#111315] hover:bg-[#E8E2D9] rounded-r-lg transition-colors cursor-pointer"
                            aria-label="Increase days"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#8C8275] font-medium text-[11px]">Qty:</span>
                        <div className="flex items-center rounded-lg border border-[#E8E2D9] bg-[#FAF8F5]">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="size-6 flex items-center justify-center text-[#111315] hover:bg-[#E8E2D9] rounded-l-lg transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-7 text-center font-bold text-xs text-[#111315] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="size-6 flex items-center justify-center text-[#111315] hover:bg-[#E8E2D9] rounded-r-lg transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                      </div>

                      {/* Line Item Total */}
                      <div className="text-right ml-auto">
                        <span className="font-extrabold text-[#111315] text-sm font-sans">
                          ₹{(item.dailyRate * item.days * item.quantity).toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ---------------------------------------------------- */}
            {/* DRAWER FOOTER: PRICING BREAKDOWN & CHECKOUT ACTIONS  */}
            {/* ---------------------------------------------------- */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-[#E8E2D9] shrink-0 space-y-4">
                {/* Pricing Summary */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#625D55]">
                    <span>Estimated Rental Subtotal:</span>
                    <span className="font-bold text-[#111315] text-sm tabular-nums">
                      ₹{totalDailyEstimate.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#8C8275]">
                    <span>Transport & On-Site Fuel:</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-1 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-bold text-sm shadow-md shadow-[#FF5500]/20 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99]"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      closeDrawer();
                      router.push("/cart");
                    }}
                    className="w-full py-2 text-center text-xs font-semibold text-[#625D55] hover:text-[#111315] hover:bg-[#FAF8F5] rounded-lg transition-colors cursor-pointer"
                  >
                    View Detailed Cart Page →
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>

    {/* Strict Authentication Gate Modal */}
    <LoginModal
      isOpen={showLoginModal}
      onClose={() => setShowLoginModal(false)}
      onSuccess={() => {
        setShowLoginModal(false);
        closeDrawer();
        const primaryKva = items[0]?.kva?.replace(/[^0-9]/g, "") || "";
        if (primaryKva) {
          router.push(`/book?kVA=${encodeURIComponent(primaryKva)}&quote=active`);
        } else {
          router.push("/book");
        }
      }}
      title="Welcome Back"
      subtitle="Sign in to your Sarvadnya Power account to proceed with fleet booking & reservation."
    />
    </>
  );
}
