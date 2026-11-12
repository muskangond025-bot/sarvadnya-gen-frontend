"use client";

import { useState, useMemo, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutRange {
  id: string;
  start: string;
  end: string;
}

interface CheckoutConfig {
  dateRangeId: string;
  quantity: number;
  numberOfShifts: number;
  siteLocation?: string;
}

interface CheckoutData {
  selectedRanges: CheckoutRange[];
  generatorConfigs: CheckoutConfig[];
}

const emptySubscribe = () => () => {};
const getClientCheckoutSnapshot = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("checkoutData");
};
const getServerSnapshot = (): string | null => null;

/**
 * Custom Bespoke Multi-Layer Vector SVG: Smart Card, EMV Chip, NFC & Verified Shield
 */
function OnlinePaymentSvg({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 96 68"
      className="w-24 h-17"
      fill="none"
      aria-hidden="true"
    >
      {/* Subtle Ambient Base Shadow Card */}
      <rect
        x="14"
        y="12"
        width="68"
        height="44"
        rx="8"
        fill={active ? "#FFF0E5" : "#F3EFE8"}
        stroke={active ? "#FF5500" : "#D6CFC4"}
        strokeWidth="1.5"
      />
      {/* Primary Sleek Card Body */}
      <rect
        x="8"
        y="6"
        width="72"
        height="46"
        rx="8"
        fill="#18181B"
        stroke={active ? "#FF5500" : "#2E2E32"}
        strokeWidth="1.5"
      />
      {/* Accent Header Stripe */}
      <path
        d="M8 14C8 9.58172 11.5817 6 16 6H72C76.4183 6 80 9.58172 80 14V18H8V14Z"
        fill={active ? "#FF5500" : "#27272A"}
      />
      {/* Metallic Gold EMV Chip */}
      <rect
        x="15"
        y="24"
        width="14"
        height="11"
        rx="2.5"
        fill="#FBBF24"
        stroke="#D97706"
        strokeWidth="1"
      />
      <path
        d="M15 28H29M15 31H29M20 24V35M24 24V35"
        stroke="#B45309"
        strokeWidth="0.9"
      />
      {/* Masked Card Digits Line */}
      <rect x="15" y="42" width="10" height="2.5" rx="1.25" fill="#A1A1AA" />
      <rect x="28" y="42" width="10" height="2.5" rx="1.25" fill="#A1A1AA" />
      <rect x="41" y="42" width="14" height="2.5" rx="1.25" fill="#FFFFFF" />
      {/* Contactless NFC Signal Waves */}
      <path
        d="M62 27.5C63.8 29.2 63.8 31.8 62 33.5"
        stroke={active ? "#FF5500" : "#D4D4D8"}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M65.5 25C68.6 28 68.6 33 65.5 36"
        stroke={active ? "#FF5500" : "#A1A1AA"}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M69 22.5C73.4 26.8 73.4 34.2 69 38.5"
        stroke={active ? "#FF8800" : "#71717A"}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Verified Security Seal Badge */}
      <circle
        cx="78"
        cy="50"
        r="11"
        fill={active ? "#FF5500" : "#FFFFFF"}
        stroke={active ? "#FFFFFF" : "#D6CFC4"}
        strokeWidth="2"
      />
      <path
        d="M73.5 50.2L76.6 53.3L82.8 46.8"
        stroke={active ? "#FFFFFF" : "#18181B"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Custom Bespoke Multi-Layer Vector SVG: Banknote Stack, Band & Rupee Emblem
 */
function CashPaymentSvg({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 96 68"
      className="w-24 h-17"
      fill="none"
      aria-hidden="true"
    >
      {/* Back Note Layer */}
      <rect
        x="16"
        y="16"
        width="70"
        height="40"
        rx="6"
        fill={active ? "#FFF0E5" : "#EFEAE1"}
        stroke={active ? "#FF5500" : "#CFC8BC"}
        strokeWidth="1.5"
      />
      {/* Middle Note Layer */}
      <rect
        x="12"
        y="11"
        width="70"
        height="40"
        rx="6"
        fill={active ? "#FFE0CA" : "#FAF8F5"}
        stroke={active ? "#FF5500" : "#C4BDB2"}
        strokeWidth="1.5"
      />
      {/* Front Currency Note Face */}
      <rect
        x="8"
        y="6"
        width="70"
        height="40"
        rx="6"
        fill="#FFFFFF"
        stroke={active ? "#FF5500" : "#18181B"}
        strokeWidth="1.8"
      />
      {/* Inner Guilloche Frame */}
      <rect
        x="13"
        y="11"
        width="60"
        height="30"
        rx="3"
        stroke={active ? "#FF5500" : "#7A756D"}
        strokeWidth="1"
        strokeDasharray="3 2"
      />
      {/* Currency Strap Band */}
      <rect
        x="35"
        y="5.5"
        width="16"
        height="41"
        fill={active ? "#FF5500" : "#18181B"}
      />
      {/* Central Currency Medallion Circle */}
      <circle
        cx="43"
        cy="26"
        r="11"
        fill="#FFFFFF"
        stroke={active ? "#FF5500" : "#18181B"}
        strokeWidth="1.8"
      />
      {/* Crisp Vector Rupee Symbol (₹) */}
      <path
        d="M39 21.5H47M39 24.8H47M42.2 21.5C44.2 21.5 45.2 22.8 45.2 24.2C45.2 26 43.7 27.5 41.2 27.5H39.2L45.3 32"
        stroke={active ? "#FF5500" : "#18181B"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Corner Denomination Dots */}
      <circle cx="18" cy="16" r="2" fill={active ? "#FF5500" : "#18181B"} />
      <circle cx="68" cy="36" r="2" fill={active ? "#FF5500" : "#18181B"} />
    </svg>
  );
}

export function PaymentsClient() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<"cash" | "online">(
    "online"
  );
  const [confirmedMethod, setConfirmedMethod] = useState<
    "cash" | "online" | null
  >(null);

  const rawCheckout = useSyncExternalStore(
    emptySubscribe,
    getClientCheckoutSnapshot,
    getServerSnapshot
  );

  const orderReview = useMemo<CheckoutData | null>(() => {
    if (!rawCheckout) return null;
    try {
      return JSON.parse(rawCheckout) as CheckoutData;
    } catch {
      return null;
    }
  }, [rawCheckout]);

  const handleProceed = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("checkoutData");
    }
    setConfirmedMethod(selectedMethod);
  };

  const handleCloseConfirmation = () => {
    setConfirmedMethod(null);
    router.push("/");
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Order Review Section (shown when coming from Bulk Order) */}
      {orderReview && orderReview.generatorConfigs?.length > 0 && (
        <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E2D9] border-t-3 border-t-[#FF5500] shadow-xs">
          <h3 className="font-sans text-xl font-extrabold text-[#111315] mb-5">
            Order Review
          </h3>
          <div className="space-y-5">
            {orderReview.selectedRanges.map((range) => (
              <div
                key={range.id}
                className="border-b border-[#E8E2D9] pb-5 last:border-0 last:pb-0"
              >
                <div className="font-sans text-[#111315] font-bold mb-3">
                  {new Date(range.start).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                  {" - "}
                  {new Date(range.end).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </div>
                <div className="space-y-3 pl-4 border-l-2 border-[#FF5500]">
                  {orderReview.generatorConfigs
                    .filter((c) => c.dateRangeId === range.id)
                    .map((config, cIdx) => (
                      <div key={cIdx} className="text-[#403C36] text-sm">
                        <div className="flex justify-between font-semibold">
                          <span>Generator ({config.quantity}x)</span>
                          <span className="font-mono text-[#FF5500] font-bold">
                            {config.numberOfShifts} Shift(s)
                          </span>
                        </div>
                        {config.siteLocation && (
                          <div className="text-[#524E48] text-xs mt-1">
                            Location: {config.siteLocation}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t border-[#E8E2D9] flex justify-between items-center">
            <span className="font-sans text-[#403C36] font-semibold">
              Total Estimated
            </span>
            <span className="font-sans text-xl sm:text-2xl font-extrabold text-[#111315]">
              To be calculated
            </span>
          </div>
        </div>
      )}

      {/* Payment Method Selection Cards */}
      <div
        role="radiogroup"
        aria-label="Payment method"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10"
      >
        {/* Online Payment Option */}
        <button
          type="button"
          role="radio"
          aria-checked={selectedMethod === "online"}
          onClick={() => setSelectedMethod("online")}
          className={cn(
            "text-left cursor-pointer p-7 sm:p-8 rounded-2xl transition-all duration-200 border bg-white flex flex-col justify-between",
            selectedMethod === "online"
              ? "border-2 border-[#FF5500] shadow-[0_18px_45px_rgba(255,85,0,0.12)]"
              : "border-[#E8E2D9] hover:border-[#111315]/40 shadow-xs"
          )}
        >
          <div className="flex items-center gap-3.5 mb-5">
            <div
              className={cn(
                "size-6 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors",
                selectedMethod === "online"
                  ? "border-[#FF5500] bg-[#FF5500]"
                  : "border-[#C4BDB2] bg-white"
              )}
            >
              {selectedMethod === "online" && (
                <div className="size-2.5 rounded-full bg-white" />
              )}
            </div>
            <h3 className="font-sans text-xl font-extrabold text-[#111315] tracking-tight">
              Online Payment
            </h3>
          </div>

          <div className="flex flex-col items-center py-4">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] mb-4 flex items-center justify-center">
              <OnlinePaymentSvg active={selectedMethod === "online"} />
            </div>
            <p className="font-sans text-[#403C36] font-medium text-sm sm:text-base text-center leading-relaxed">
              Secure payment via UPI, Cards, or Net Banking
            </p>
          </div>
        </button>

        {/* Cash Payment Option */}
        <button
          type="button"
          role="radio"
          aria-checked={selectedMethod === "cash"}
          onClick={() => setSelectedMethod("cash")}
          className={cn(
            "text-left cursor-pointer p-7 sm:p-8 rounded-2xl transition-all duration-200 border bg-white flex flex-col justify-between",
            selectedMethod === "cash"
              ? "border-2 border-[#FF5500] shadow-[0_18px_45px_rgba(255,85,0,0.12)]"
              : "border-[#E8E2D9] hover:border-[#111315]/40 shadow-xs"
          )}
        >
          <div className="flex items-center gap-3.5 mb-5">
            <div
              className={cn(
                "size-6 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors",
                selectedMethod === "cash"
                  ? "border-[#FF5500] bg-[#FF5500]"
                  : "border-[#C4BDB2] bg-white"
              )}
            >
              {selectedMethod === "cash" && (
                <div className="size-2.5 rounded-full bg-white" />
              )}
            </div>
            <h3 className="font-sans text-xl font-extrabold text-[#111315] tracking-tight">
              Cash Payment
            </h3>
          </div>

          <div className="flex flex-col items-center py-4">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] mb-4 flex items-center justify-center">
              <CashPaymentSvg active={selectedMethod === "cash"} />
            </div>
            <p className="font-sans text-[#403C36] font-medium text-sm sm:text-base text-center leading-relaxed">
              Pay cash upon delivery or pickup
            </p>
          </div>
        </button>
      </div>

      {/* Primary Action Row */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={handleProceed}
          className="px-8 py-4 bg-[#FF5500] hover:bg-[#E04B00] text-white text-base sm:text-lg font-sans font-bold rounded-xl transition-all duration-200 min-w-[220px] w-full sm:w-auto inline-flex items-center justify-center gap-2.5 shadow-lg shadow-[#FF5500]/25 cursor-pointer active:scale-[0.98]"
        >
          <span>Proceed to Pay</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Premium Order Confirmation Popup Modal */}
      <AnimatePresence>
        {confirmedMethod !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleCloseConfirmation}
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-confirmation-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111315]/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white border border-[#E8E2D9] rounded-3xl p-7 sm:p-9 shadow-[0_30px_80px_rgba(17,19,21,0.28)] overflow-hidden text-center"
            >
              {/* Top Orange Accent Stripe */}
              <div className="absolute inset-x-0 top-0 h-1 bg-[#FF5500]" />

              {/* Dismiss Button */}
              <button
                type="button"
                onClick={handleCloseConfirmation}
                aria-label="Close confirmation"
                className="absolute top-4 right-4 size-9 rounded-full bg-[#FAF8F5] hover:bg-[#EFEAE1] border border-[#E8E2D9] text-[#111315] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Animated Success Crest SVG */}
              <div className="relative mx-auto size-20 rounded-full bg-[#FFF5EE] border-2 border-[#FF5500]/30 flex items-center justify-center mb-6">
                <div className="absolute inset-0 rounded-full bg-[#FF5500]/15 animate-ping [animation-duration:2.2s]" />
                <svg
                  viewBox="0 0 40 40"
                  className="relative z-10 w-10 h-10"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="20" cy="20" r="18" fill="#FF5500" />
                  <motion.path
                    d="M12.5 20.5L17.5 25.5L27.5 15"
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                  />
                </svg>
              </div>

              <h3
                id="payment-confirmation-title"
                className="font-sans text-2xl sm:text-[26px] font-extrabold text-[#111315] tracking-tight mb-3"
              >
                Order Confirmed
              </h3>

              <p className="font-sans text-sm sm:text-base text-[#403C36] leading-relaxed mb-7">
                Order placed successfully using{" "}
                <span className="font-bold text-[#111315]">
                  {confirmedMethod === "online" ? "Online Payment" : "Cash"}
                </span>
                . Our team will contact you shortly to confirm the details.
              </p>

              <button
                type="button"
                onClick={handleCloseConfirmation}
                className="w-full py-3.5 px-6 rounded-xl bg-[#111315] hover:bg-[#FF5500] text-white font-sans font-bold text-sm sm:text-base transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Back to Home</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
