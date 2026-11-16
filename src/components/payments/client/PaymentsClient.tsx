"use client";

import { useState, useMemo, useSyncExternalStore, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  X,
  Check,
  Copy,
  Lock,
  Smartphone,
  CreditCard,
  Building2,
  QrCode,
  Loader2,
  Download,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  RotateCcw,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuote } from "@/lib/QuoteContext";
import { useAuth } from "@/lib/AuthContext";
import { LoginModal } from "@/components/auth/client/LoginModal";

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

interface CheckoutContactInfo {
  fullName: string;
  phone: string;
  email: string;
  company?: string;
  siteAddress?: string;
  gstin?: string;
}

interface CheckoutData {
  selectedRanges: CheckoutRange[];
  generatorConfigs: CheckoutConfig[];
  contactInfo?: CheckoutContactInfo;
  advanceToken?: number;
}

interface ReceiptDetails {
  txnId: string;
  bookingId: string;
  date: string;
  amount: number;
  method: string;
  description: string;
  cardNumber?: string;
  cardHolder?: string;
  status?: "paid" | "failed";
}

const emptySubscribe = () => () => {};
const getClientCheckoutSnapshot = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("checkoutData");
};
const getServerSnapshot = (): string | null => null;

/**
 * Custom Multi-Layer Vector SVG: Smart Card, EMV Chip, NFC & Verified Shield
 */
function OnlinePaymentSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 96 68" className="w-20 sm:w-24 h-auto" fill="none" aria-hidden="true">
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
      <path
        d="M8 14C8 9.58172 11.5817 6 16 6H72C76.4183 6 80 9.58172 80 14V18H8V14Z"
        fill={active ? "#FF5500" : "#27272A"}
      />
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
      <rect x="15" y="42" width="10" height="2.5" rx="1.25" fill="#A1A1AA" />
      <rect x="28" y="42" width="10" height="2.5" rx="1.25" fill="#A1A1AA" />
      <rect x="41" y="42" width="14" height="2.5" rx="1.25" fill="#FFFFFF" />
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
 * Custom Multi-Layer Vector SVG: Banknote Stack, Band & Rupee Emblem
 */
function CashPaymentSvg({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 96 68" className="w-20 sm:w-24 h-auto" fill="none" aria-hidden="true">
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
      <rect
        x="35"
        y="5.5"
        width="16"
        height="41"
        fill={active ? "#FF5500" : "#18181B"}
      />
      <circle
        cx="43"
        cy="26"
        r="11"
        fill="#FFFFFF"
        stroke={active ? "#FF5500" : "#18181B"}
        strokeWidth="1.8"
      />
      <path
        d="M39 21.5H47M39 24.8H47M42.2 21.5C44.2 21.5 45.2 22.8 45.2 24.2C45.2 26 43.7 27.5 41.2 27.5H39.2L45.3 32"
        stroke={active ? "#FF5500" : "#18181B"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="18" cy="16" r="2" fill={active ? "#FF5500" : "#18181B"} />
      <circle cx="68" cy="36" r="2" fill={active ? "#FF5500" : "#18181B"} />
    </svg>
  );
}

/**
 * High-Resolution Vector UPI QR Code Display with Central Rupee Badge
 */
function UpiQrPattern() {
  return (
    <svg viewBox="0 0 160 160" className="w-40 sm:w-48 h-auto mx-auto" fill="none">
      <rect width="160" height="160" rx="12" fill="#FFFFFF" />
      {/* Corner Registration Markers */}
      <rect x="12" y="12" width="38" height="38" rx="6" stroke="#111315" strokeWidth="6" />
      <rect x="22" y="22" width="18" height="18" rx="2" fill="#111315" />
      <rect x="110" y="12" width="38" height="38" rx="6" stroke="#111315" strokeWidth="6" />
      <rect x="120" y="22" width="18" height="18" rx="2" fill="#111315" />
      <rect x="12" y="110" width="38" height="38" rx="6" stroke="#111315" strokeWidth="6" />
      <rect x="22" y="120" width="18" height="18" rx="2" fill="#111315" />

      {/* Realistic QR Data Dots */}
      <rect x="60" y="14" width="8" height="8" fill="#111315" />
      <rect x="76" y="14" width="8" height="8" fill="#111315" />
      <rect x="92" y="14" width="8" height="8" fill="#111315" />
      <rect x="60" y="28" width="8" height="8" fill="#111315" />
      <rect x="84" y="28" width="8" height="8" fill="#111315" />
      <rect x="68" y="42" width="8" height="8" fill="#111315" />
      <rect x="84" y="42" width="8" height="8" fill="#111315" />

      <rect x="14" y="60" width="8" height="8" fill="#111315" />
      <rect x="28" y="60" width="8" height="8" fill="#111315" />
      <rect x="42" y="60" width="8" height="8" fill="#111315" />
      <rect x="60" y="60" width="8" height="8" fill="#111315" />
      <rect x="92" y="60" width="8" height="8" fill="#111315" />
      <rect x="108" y="60" width="8" height="8" fill="#111315" />
      <rect x="124" y="60" width="8" height="8" fill="#111315" />
      <rect x="138" y="60" width="8" height="8" fill="#111315" />

      <rect x="14" y="74" width="8" height="8" fill="#111315" />
      <rect x="36" y="74" width="8" height="8" fill="#111315" />
      <rect x="116" y="74" width="8" height="8" fill="#111315" />
      <rect x="134" y="74" width="8" height="8" fill="#111315" />

      <rect x="14" y="92" width="8" height="8" fill="#111315" />
      <rect x="28" y="92" width="8" height="8" fill="#111315" />
      <rect x="44" y="92" width="8" height="8" fill="#111315" />
      <rect x="108" y="92" width="8" height="8" fill="#111315" />
      <rect x="124" y="92" width="8" height="8" fill="#111315" />
      <rect x="138" y="92" width="8" height="8" fill="#111315" />

      <rect x="60" y="110" width="8" height="8" fill="#111315" />
      <rect x="76" y="110" width="8" height="8" fill="#111315" />
      <rect x="92" y="110" width="8" height="8" fill="#111315" />
      <rect x="124" y="110" width="8" height="8" fill="#111315" />
      <rect x="138" y="110" width="8" height="8" fill="#111315" />
      <rect x="68" y="126" width="8" height="8" fill="#111315" />
      <rect x="84" y="126" width="8" height="8" fill="#111315" />
      <rect x="108" y="126" width="8" height="8" fill="#111315" />
      <rect x="60" y="138" width="8" height="8" fill="#111315" />
      <rect x="92" y="138" width="8" height="8" fill="#111315" />
      <rect x="120" y="138" width="8" height="8" fill="#111315" />

      {/* Center Sarvadnya Shield Crest Badge */}
      <circle cx="80" cy="80" r="19" fill="#FFFFFF" stroke="#E8E2D9" strokeWidth="2" />
      <circle cx="80" cy="80" r="15" fill="#FF5500" />
      <path
        d="M74 74H84M74 78H84M78 74C80.5 74 82 75.5 82 77.2C82 79.5 80.2 81 77 81H74.5L82 87"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Authentic Brand SVG Vectors: Google Pay, PhonePe, Paytm
 */
function GooglePayLogo({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

function PhonePeLogo({ className = "size-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11.5" fill="#FFFFFF" />
      <path
        fill="#5F259F"
        fillRule="evenodd"
        d="M10.206 9.941h2.949v4.692c-.402.201-.938.268-1.34.268-1.072 0-1.609-.536-1.609-1.743zm13.47 4.816c-1.523 6.449-7.985 10.442-14.433 8.919C2.794 22.154-1.199 15.691.324 9.243C1.847 2.794 8.309-1.199 14.757.324c6.449 1.523 10.442 7.985 8.919 14.433m-6.231-5.888a.887.887 0 0 0-.871-.871h-1.609l-3.686-4.222c-.335-.335-.804-.536-1.272-.536H7.135a.887.887 0 0 0-.871.871v13.626c0 .47.335.871.871.871h1.609v-4.625h1.876c1.876 0 3.282-1.005 3.282-3.148 0-1.407-.737-2.345-2.01-2.68v-.067c.804-.201 1.34-.871 1.34-1.943 0-1.609-1.206-2.614-3.148-2.614H8.744v4.222h1.407c1.139 0 1.676.536 1.676 1.474 0 .938-.537 1.474-1.676 1.474H8.744v4.423h1.876c2.815 0 4.758-1.609 4.758-4.222 0-1.809-1.005-3.148-2.816-3.483l3.619-4.222h2.01c.47 0 .871.402.871.871z"
      />
    </svg>
  );
}

function PaytmLogo({ className = "h-3.5 w-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        fill="#002970"
        d="M.232 9.4A.234.234 0 0 0 0 9.636v5.924c0 .132.096.238.216.241h1.09c.13 0 .237-.107.237-.24l.004-1.658H2.57c.857 0 1.453-.605 1.453-1.481v-1.538c0-.877-.596-1.484-1.453-1.484H.232zm9.032 0a.239.239 0 0 0-.237.241v2.47c0 .94.657 1.608 1.579 1.608h.675s.016 0 .037.004a.253.253 0 0 1 .222.253c0 .13-.096.235-.219.251l-.018.004-.303.006H9.739a.239.239 0 0 0-.236.24v1.09a.24.24 0 0 0 .236.242h1.75c.92 0 1.577-.669 1.577-1.608v-4.56a.239.239 0 0 0-.236-.24h-1.07a.239.239 0 0 0-.236.24c-.005.787 0 1.525 0 2.255a.253.253 0 0 1-.25.25h-.449a.253.253 0 0 1-.25-.255c.005-.754-.005-1.5-.005-2.25a.239.239 0 0 0-.236-.24zm-4.004.006a.232.232 0 0 0-.238.226v1.023c0 .132.113.24.252.24h1.413c.112.017.2.1.213.23v.14c-.013.124-.1.214-.207.224h-.7c-.93 0-1.594.63-1.594 1.515v1.269c0 .88.57 1.506 1.495 1.506h1.94c.348 0 .63-.27.63-.6v-4.136c0-1.004-.508-1.637-1.72-1.637zm-3.713 1.572h.678c.139 0 .25.115.25.256v.836a.253.253 0 0 1-.25.256h-.1c-.192.002-.386 0-.578 0zm4.67 1.977h.445c.139 0 .252.108.252.24v.932a.203.203 0 0 1-.014.076.25.25 0 0 1-.238.16h-.194c-.134 0-.244-.111-.244-.247v-.921c0-.135.105-.244.241-.244z"
      />
      <path
        fill="#00BAF2"
        d="M15.85 8.167a.204.204 0 0 0-.04.004c-.68.19-.543 1.148-1.781 1.23h-.12a.23.23 0 0 0-.052.005h-.001a.24.24 0 0 0-.184.235v1.09c0 .134.106.241.237.241h.645v4.623c0 .132.104.238.233.238h1.058a.236.236 0 0 0 .233-.238v-4.623h.6c.13 0 .236-.107.236-.241v-1.09a.239.239 0 0 0-.236-.24h-.612V8.386a.218.218 0 0 0-.216-.22zm4.225 1.17c-.398 0-.762.15-1.042.395v-.124a.238.238 0 0 0-.234-.224h-1.07a.24.24 0 0 0-.236.242v5.92a.24.24 0 0 0 .236.242h1.07c.12 0 .217-.091.233-.209v-4.25a.393.393 0 0 1 .371-.408h.196a.41.41 0 0 1 .226.09.405.405 0 0 1 .145.319v4.074l.004.155a.24.24 0 0 0 .237.241h1.07a.239.239 0 0 0 .235-.23l-.001-4.246c0-.14.062-.266.174-.34a.419.419 0 0 1 .196-.068h.198c.23.02.37.2.37.408.005 1.396.004 2.8.004 4.224a.24.24 0 0 0 .237.241h1.07c.13 0 .236-.108.236-.241v-4.543c0-.31-.034-.442-.08-.577a1.601 1.601 0 0 0-1.51-1.09h-.015a1.58 1.58 0 0 0-1.152.5c-.291-.308-.7-.5-1.153-.5z"
      />
    </svg>
  );
}

/**
 * 3D Card EMV Chip Vector
 */
function EmvChipSvg({ className = "w-9 sm:w-10 h-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 34" className={cn("w-9 sm:w-10 h-auto", className)} fill="none">
      <rect width="46" height="34" rx="6" fill="url(#emv-gold)" />
      <rect x="1" y="1" width="44" height="32" rx="5" stroke="#B45309" strokeWidth="1" strokeOpacity="0.5" />
      <path d="M1 12H18M1 22H18M28 12H45M28 22H45" stroke="#92400E" strokeWidth="1" strokeOpacity="0.6" />
      <path d="M18 1H28V33H18V1Z" stroke="#92400E" strokeWidth="1" strokeOpacity="0.6" />
      <rect x="19" y="10" width="8" height="14" rx="2" fill="#FDE68A" stroke="#B45309" strokeWidth="1" />
      <defs>
        <linearGradient id="emv-gold" x1="0" y1="0" x2="46" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FDE047" />
          <stop offset="0.5" stopColor="#EAB308" />
          <stop offset="1" stopColor="#CA8A04" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Contactless Waves Symbol
 */
function ContactlessNfcSvg({ className = "size-4 text-white/70" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-4 text-white/70", className)} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M8.5 16.5a5 5 0 0 1 0-7" />
      <path d="M12 19a8.5 8.5 0 0 1 0-12" />
      <path d="M15.5 21.5a12 12 0 0 1 0-17" />
    </svg>
  );
}

function VisaLogo({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <span className={cn("font-black tracking-wider text-white italic font-sans text-sm sm:text-base", className)}>
      VISA
    </span>
  );
}

function MastercardLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 24" className={className} fill="none">
      <circle cx="13" cy="12" r="10" fill="#EB001B" />
      <circle cx="23" cy="12" r="10" fill="#F79E1B" fillOpacity="0.85" />
    </svg>
  );
}

function RuPayLogo({ className = "h-4 w-auto" }: { className?: string }) {
  return (
    <div className={cn("flex items-center font-bold text-xs tracking-tight italic", className)}>
      <span className="text-[#097939]">Ru</span>
      <span className="text-[#0085C8]">Pay</span>
      <span className="ml-0.5 size-1.5 rounded-full bg-[#FF5500]" />
    </div>
  );
}

export function PaymentsClient() {
  const router = useRouter();
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"cash" | "online">("online");
  const [isGatewayOpen, setIsGatewayOpen] = useState(false);
  const [activeOnlineTab, setActiveOnlineTab] = useState<"upi" | "card" | "netbanking">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState<"idle" | "processing" | "finalizing">("idle");
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [confirmedMethod, setConfirmedMethod] = useState<"cash" | "online" | null>(null);
  const [receiptDetails, setReceiptDetails] = useState<ReceiptDetails | null>(null);
  const [receiptStatus, setReceiptStatus] = useState<"paid" | "failed">("paid");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [cashOrderSubmitted, setCashOrderSubmitted] = useState(false);

  // Card Form State
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Card Network Auto-Detection
  const cardNetwork = useMemo(() => {
    const clean = cardNumber.replace(/\D/g, "");
    if (clean.startsWith("4")) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(clean)) return "mastercard";
    if (/^(60|65|508)/.test(clean) || clean.startsWith("35")) return "rupay";
    return "other";
  }, [cardNumber]);

  // NetBanking State
  const [selectedBank, setSelectedBank] = useState("hdfc");

  // Custom UPI Input
  const [customUpi, setCustomUpi] = useState("");

  // Connect to QuoteContext for realistic payable calculations
  const { items: quoteItems, totalDailyEstimate, clearQuote } = useQuote();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync external store for bulk order checkout data
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

  // Determine payable amount dynamically:
  // 1. If from Quote Cart: 50% Token Advance of subtotal (min ₹5,000)
  // 2. If from Bulk Order: calculated shifts (or ₹15,000 advance)
  // 3. Fallback standard fleet advance: ₹5,000
  const payableAmount = useMemo(() => {
    if (orderReview && typeof orderReview.advanceToken === "number" && orderReview.advanceToken > 0) {
      return orderReview.advanceToken;
    }
    if (totalDailyEstimate && totalDailyEstimate > 0) {
      return Math.max(5000, Math.round(totalDailyEstimate * 0.5));
    }
    if (orderReview && orderReview.generatorConfigs?.length > 0) {
      const totalConfigs = orderReview.generatorConfigs.reduce(
        (sum, c) => sum + c.quantity * c.numberOfShifts,
        0
      );
      return Math.max(8000, totalConfigs * 4500);
    }
    return 5000;
  }, [totalDailyEstimate, orderReview]);

  // Lock body scroll when any modal is open
  useEffect(() => {
    if (isGatewayOpen || confirmedMethod !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isGatewayOpen, confirmedMethod]);

  const handleProceed = () => {
    // Strict Checkout Gate: Require Login Before Proceeding
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (selectedMethod === "online") {
      setIsGatewayOpen(true);
    } else {
      // Cash on Delivery: Alert client in English as requested
      alert(
        "Booking Request Received. Our team will contact you within 30 minutes to confirm site inspection and generator availability. Payment will be payable upon delivery."
      );

      setCashOrderSubmitted(true);

      if (typeof window !== "undefined") {
        localStorage.removeItem("checkoutData");
      }
      clearQuote();

      // No popup receipt modal for cash orders as requested by user
    }
  };

  const handlePayOnlineNow = () => {
    // Strict Checkout Gate: Require Login Before Payment
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setIsProcessing(true);
    setProcessingStage("processing");

    // Stage 1: Processing Payment Authorization (1.2s)
    setTimeout(() => {
      setProcessingStage("finalizing");

      // Stage 2: Finalizing Fleet Allocation (1.2s)
      setTimeout(() => {
        setIsProcessing(false);
        setProcessingStage("idle");
        setIsGatewayOpen(false);

        if (typeof window !== "undefined") {
          localStorage.removeItem("checkoutData");
        }
        clearQuote();

        const txnCode = `TXN_PG_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
        const ref = `SRV-${Date.now().toString().slice(-6)}`;
        const cleanCard = cardNumber.replace(/\D/g, "");
        const maskedCard =
          cleanCard.length >= 4
            ? `•••• •••• •••• ${cleanCard.slice(-4)}`
            : "•••• •••• •••• 4242";

        const prodName =
          orderReview?.generatorConfigs?.[0]
            ? `Bulk Fleet Reservation (${orderReview.generatorConfigs.length} Genset Deployment)`
            : quoteItems[0]?.name ||
              "Standard 125 kVA Silent Commercial Diesel Generator";

        setReceiptDetails({
          txnId: txnCode,
          bookingId: ref,
          date: new Date().toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          amount: payableAmount,
          method:
            activeOnlineTab === "upi"
              ? "Instant UPI / QR"
              : activeOnlineTab === "card"
                ? `Card (${cardNetwork.toUpperCase()})`
                : `Net Banking (${selectedBank.toUpperCase()})`,
          description: prodName,
          cardNumber: activeOnlineTab === "card" ? maskedCard : undefined,
          cardHolder: activeOnlineTab === "card" ? (cardHolder.trim() || "Valued Enterprise Client") : undefined,
          status: "paid",
        });
        setReceiptStatus("paid");
        setConfirmedMethod("online");
      }, 1200);
    }, 1200);
  };

  const handleCopyUpi = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("sarvadnyapower@icici");
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2200);
    }
  };

  const handleDismiss = () => {
    setConfirmedMethod(null);
    setReceiptDetails(null);
  };

  const handleReturnToFleet = () => {
    handleDismiss();
    router.push("/generators");
  };

  const handleDownloadReceipt = () => {
    if (!receiptDetails) return;
    const isPaid = (receiptDetails.status || receiptStatus) === "paid";
    const receiptContent = `========================================================
SARVADNYA GENERATOR SERVICES - OFFICIAL BOOKING RECEIPT
========================================================
Booking Reference: ${receiptDetails.bookingId}
Transaction ID:    ${receiptDetails.txnId}
Date & Time:       ${receiptDetails.date}
Payment Mode:      ${receiptDetails.method}
Equipment/Fleet:   ${receiptDetails.description}
Card Mask:         ${receiptDetails.cardNumber || "N/A (Direct / UPI / NetBanking)"}
Cardholder:        ${receiptDetails.cardHolder || "Enterprise Client"}
Total Amount:      INR ${receiptDetails.amount.toLocaleString("en-IN")}
Official Status:   ${isPaid ? "[ ★ PAID & VERIFIED ★ ]" : "[ ✖ PAYMENT DECLINED / FAILED ✖ ]"}
--------------------------------------------------------
Depot Hub:         Indira Nagar, Nashik, Maharashtra
Dispatch Helpline: +91 62626 29944 / +91 98231 97881
Email:             info@sarvadnyagenerators.com
========================================================
Thank you for choosing Sarvadnya Generators!`;

    const blob = new Blob([receiptContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Sarvadnya_Receipt_${receiptDetails.bookingId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Inline Confirmation for Cash Orders (No intrusive modal) */}
      {cashOrderSubmitted && (
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3.5 shadow-2xs">
          <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm sm:text-base font-sans">
              Booking Request Received Successfully
            </p>
            <p className="text-xs sm:text-sm text-emerald-800 mt-1 leading-relaxed font-sans">
              Our team will contact you within 30 minutes to confirm site inspection and generator availability. Payment will be payable upon delivery.
            </p>
          </div>
        </div>
      )}

      {/* Order Review Section (from Bulk Order or Cart) */}
      {orderReview && orderReview.generatorConfigs?.length > 0 && (
        <div className="mb-8 sm:mb-10 p-5 sm:p-8 rounded-2xl bg-white border border-[#E8E2D9] border-t-3 border-t-[#FF5500] shadow-2xs">
          <h3 className="font-sans text-lg sm:text-xl font-extrabold text-[#111315] mb-4">
            Order Review
          </h3>
          {orderReview.contactInfo && (
            <div className="mb-4 p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs">
              <div className="flex flex-wrap justify-between gap-1 font-bold text-[#111315]">
                <span>
                  Client: {orderReview.contactInfo.fullName}{" "}
                  {orderReview.contactInfo.company ? `(${orderReview.contactInfo.company})` : ""}
                </span>
                <span className="font-mono text-[#FF5500]">{orderReview.contactInfo.phone}</span>
              </div>
              {orderReview.contactInfo.siteAddress && (
                <div className="text-[#524E48] mt-1 truncate">
                  Site: {orderReview.contactInfo.siteAddress}
                </div>
              )}
            </div>
          )}
          <div className="space-y-4">
            {orderReview.selectedRanges.map((range) => (
              <div
                key={range.id}
                className="border-b border-[#E8E2D9] pb-4 last:border-0 last:pb-0"
              >
                <div className="font-sans text-xs sm:text-sm text-[#111315] font-bold mb-2">
                  {new Date(range.start).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  -{" "}
                  {new Date(range.end).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </div>
                <div className="space-y-2 pl-3.5 border-l-2 border-[#FF5500]">
                  {orderReview.generatorConfigs
                    .filter((c) => c.dateRangeId === range.id)
                    .map((config, cIdx) => (
                      <div key={cIdx} className="text-[#403C36] text-xs sm:text-sm">
                        <div className="flex justify-between font-semibold">
                          <span>Generator ({config.quantity}x)</span>
                          <span className="font-mono text-[#FF5500] font-bold">
                            {config.numberOfShifts} Shift(s)
                          </span>
                        </div>
                        {config.siteLocation && (
                          <div className="text-[#524E48] text-[11px] mt-0.5">
                            Site: {config.siteLocation}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-[#E8E2D9] flex justify-between items-center">
            <span className="font-sans text-[#403C36] text-xs sm:text-sm font-semibold">
              Advance Token Required
            </span>
            <span className="font-sans text-lg sm:text-2xl font-extrabold text-[#FF5500]">
              ₹{payableAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      )}

      {/* Quote Cart Summary (if coming from Generator Gallery or Quote Drawer) */}
      {!orderReview && quoteItems.length > 0 && (
        <div className="mb-8 sm:mb-10 p-5 sm:p-7 rounded-2xl bg-white border border-[#E8E2D9] border-t-3 border-t-[#FF5500] shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-sans text-base sm:text-lg font-bold text-[#111315]">
              Fleet Quote Summary ({quoteItems.length} Generator{quoteItems.length > 1 ? "s" : ""})
            </h3>
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-[#FF5500]/10 text-[#FF5500]">
              50% Booking Advance
            </span>
          </div>
          <div className="space-y-2.5">
            {quoteItems.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-xs sm:text-sm text-[#403C36] pb-2 border-b border-[#E8E2D9]/70 last:border-0 last:pb-0"
              >
                <div>
                  <span className="font-bold text-[#111315]">{item.name}</span>{" "}
                  <span className="text-[#8C8275]">({item.kva} kVA × {item.days} day{item.days > 1 ? "s" : ""})</span>
                </div>
                <span className="font-semibold text-[#111315]">
                  ₹{(item.dailyRate * item.days * item.quantity).toLocaleString("en-IN")}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3.5 border-t border-[#E8E2D9] flex justify-between items-center">
            <span className="text-xs sm:text-sm font-semibold text-[#524E48]">
              Advance Token Payable Online
            </span>
            <span className="text-xl sm:text-2xl font-bold text-[#FF5500]">
              ₹{payableAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      )}

      {/* Payment Method Selection Cards */}
      <div
        role="radiogroup"
        aria-label="Payment method"
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-10"
      >
        {/* Online Payment Option */}
        <button
          type="button"
          role="radio"
          aria-checked={selectedMethod === "online"}
          onClick={() => setSelectedMethod("online")}
          className={cn(
            "text-left cursor-pointer p-5 sm:p-8 rounded-2xl transition-all duration-200 border bg-white flex flex-col justify-between active:scale-[0.99]",
            selectedMethod === "online"
              ? "border-2 border-[#FF5500] shadow-[0_14px_38px_rgba(255,85,0,0.12)]"
              : "border-[#E8E2D9] hover:border-[#111315]/40 shadow-2xs"
          )}
        >
          <div className="flex items-center gap-3 sm:gap-3.5 mb-4 sm:mb-5">
            <div
              className={cn(
                "size-5 sm:size-6 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors",
                selectedMethod === "online"
                  ? "border-[#FF5500] bg-[#FF5500]"
                  : "border-[#C4BDB2] bg-white"
              )}
            >
              {selectedMethod === "online" && (
                <div className="size-2 sm:size-2.5 rounded-full bg-white" />
              )}
            </div>
            <div>
              <h3 className="font-sans text-lg sm:text-xl font-extrabold text-[#111315] tracking-tight">
                Online Payment
              </h3>
              <span className="text-[11px] sm:text-xs text-[#FF5500] font-semibold">
                Instant UPI, Cards &amp; Net Banking
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center py-2 sm:py-4">
            <div className="p-3 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] mb-3 sm:mb-4 flex items-center justify-center">
              <OnlinePaymentSvg active={selectedMethod === "online"} />
            </div>
            <p className="font-sans text-[#403C36] font-medium text-xs sm:text-sm text-center leading-relaxed">
              Instant reservation with 256-bit encrypted bank gateway
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
            "text-left cursor-pointer p-5 sm:p-8 rounded-2xl transition-all duration-200 border bg-white flex flex-col justify-between active:scale-[0.99]",
            selectedMethod === "cash"
              ? "border-2 border-[#FF5500] shadow-[0_14px_38px_rgba(255,85,0,0.12)]"
              : "border-[#E8E2D9] hover:border-[#111315]/40 shadow-2xs"
          )}
        >
          <div className="flex items-center gap-3 sm:gap-3.5 mb-4 sm:mb-5">
            <div
              className={cn(
                "size-5 sm:size-6 rounded-full flex items-center justify-center border-2 shrink-0 transition-colors",
                selectedMethod === "cash"
                  ? "border-[#FF5500] bg-[#FF5500]"
                  : "border-[#C4BDB2] bg-white"
              )}
            >
              {selectedMethod === "cash" && (
                <div className="size-2 sm:size-2.5 rounded-full bg-white" />
              )}
            </div>
            <div>
              <h3 className="font-sans text-lg sm:text-xl font-extrabold text-[#111315] tracking-tight">
                Cash Payment
              </h3>
              <span className="text-[11px] sm:text-xs text-[#71695F] font-semibold">
                Pay on Delivery / Handover
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center py-2 sm:py-4">
            <div className="p-3 sm:p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] mb-3 sm:mb-4 flex items-center justify-center">
              <CashPaymentSvg active={selectedMethod === "cash"} />
            </div>
            <p className="font-sans text-[#403C36] font-medium text-xs sm:text-sm text-center leading-relaxed">
              Pay cash upon site equipment inspection and operator dispatch
            </p>
          </div>
        </button>
      </div>

      {/* Primary Action Button */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={handleProceed}
          className="px-7 sm:px-9 py-3.5 sm:py-4 bg-[#FF5500] hover:bg-[#E04B00] text-white text-sm sm:text-base font-sans font-bold rounded-xl transition-all duration-200 min-w-[200px] sm:min-w-[240px] w-full sm:w-auto inline-flex items-center justify-center gap-2.5 shadow-lg shadow-[#FF5500]/25 cursor-pointer active:scale-[0.98]"
        >
          <span>{selectedMethod === "online" ? `Proceed to Pay (₹${payableAmount.toLocaleString("en-IN")})` : "Confirm Cash Order"}</span>
          <ArrowRight className="size-4 sm:size-5" />
        </button>
      </div>

      {/* ======================================================== */}
      {/* OPTION 1: INTERACTIVE ONLINE PAYMENT GATEWAY SHEET MODAL */}
      {/* ======================================================== */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isGatewayOpen && (
              <div className="fixed inset-0 z-[160] flex items-end sm:items-center justify-center p-0 sm:p-4">
                {/* Backdrop with Blur */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => !isProcessing && setIsGatewayOpen(false)}
                  className="fixed inset-0 bg-[#111315]/65 backdrop-blur-sm"
                  aria-hidden="true"
                />

                {/* Gateway Window (Bottom-Sheet on Mobile, Center Modal on Laptop) */}
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className={cn(
                    "relative w-full bg-white border border-[#E8E2D9] rounded-t-3xl sm:rounded-3xl shadow-[0_24px_70px_rgba(17,19,21,0.28)] overflow-hidden z-10 max-h-[92vh] sm:max-h-[90vh] flex flex-col transition-all duration-300",
                    activeOnlineTab === "card" ? "max-w-lg md:max-w-3xl lg:max-w-4xl" : "max-w-lg"
                  )}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="gateway-title"
                >
                  {/* Top Orange Brand Line */}
                  <div className="h-1 bg-gradient-to-r from-[#FF5500] via-[#FF8800] to-[#FF5500] shrink-0" />

                  {/* Header Bar */}
                  <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-[#E8E2D9] flex items-center justify-between shrink-0 bg-[#FAF8F5]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF5500]">
                          Sarvadnya Pay
                        </span>
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#524E48] bg-white border border-[#E8E2D9] px-2 py-0.5 rounded-full">
                          <Lock className="size-2.5 text-[#FF5500]" />
                          256-bit SSL
                        </span>
                      </div>
                      <h2
                        id="gateway-title"
                        className="text-base sm:text-xl font-extrabold text-[#111315] mt-0.5"
                      >
                        Complete Payment
                      </h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-[10px] text-[#71695F] block font-mono uppercase">
                          Amount
                        </span>
                        <span className="text-base sm:text-xl font-extrabold text-[#111315]">
                          ₹{payableAmount.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => !isProcessing && setIsGatewayOpen(false)}
                        className="size-8 sm:size-9 rounded-full bg-white hover:bg-[#EFEAE1] border border-[#E8E2D9] flex items-center justify-center text-[#111315] transition-colors cursor-pointer"
                        aria-label="Close gateway"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  </div>

                  {/* Processing Overlay State (Multi-Stage Animated Authorization) */}
                  {isProcessing ? (
                    <div className="py-14 sm:py-20 px-6 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="relative size-16 flex items-center justify-center">
                        <Loader2 className="size-14 text-[#FF5500] animate-spin" />
                        <Lock className="size-5 text-[#111315] absolute" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF5EE] border border-[#FF5500]/25 text-[#FF5500] text-xs font-mono font-bold uppercase tracking-wider mb-2.5">
                          <span className="size-2 rounded-full bg-[#FF5500] animate-ping" />
                          {processingStage === "finalizing" ? "Stage 2/2 • Finalizing" : "Stage 1/2 • Processing"}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#111315]">
                          {processingStage === "finalizing"
                            ? "Finalizing Fleet Reservation..."
                            : "Processing Payment Authorization..."}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#625D55] mt-1.5 max-w-sm">
                          {processingStage === "finalizing"
                            ? "Securing commercial generator allocation locks & generating official transaction manifest..."
                            : `Connecting to 256-bit bank gateway to authorize ₹${payableAmount.toLocaleString("en-IN")}...`}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-[11px] text-[#8C8275] bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#E8E2D9]">
                        <ShieldCheck className="size-3.5 text-[#FF5500]" />
                        <span>Encrypted SSL Gateway Session Active</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Gateway Tabs */}
                      <div className="grid grid-cols-3 border-b border-[#E8E2D9] shrink-0 text-xs sm:text-sm font-bold bg-[#FAF8F5]">
                        <button
                          type="button"
                          onClick={() => setActiveOnlineTab("upi")}
                          className={cn(
                            "py-3 px-2 flex items-center justify-center gap-1.5 transition-colors border-b-2 cursor-pointer",
                            activeOnlineTab === "upi"
                              ? "border-[#FF5500] text-[#FF5500] bg-white"
                              : "border-transparent text-[#625D55] hover:text-[#111315]"
                          )}
                        >
                          <Smartphone className="size-3.5 sm:size-4" />
                          <span>UPI / QR</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveOnlineTab("card")}
                          className={cn(
                            "py-3 px-2 flex items-center justify-center gap-1.5 transition-colors border-b-2 cursor-pointer",
                            activeOnlineTab === "card"
                              ? "border-[#FF5500] text-[#FF5500] bg-white"
                              : "border-transparent text-[#625D55] hover:text-[#111315]"
                          )}
                        >
                          <CreditCard className="size-3.5 sm:size-4" />
                          <span>Card</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveOnlineTab("netbanking")}
                          className={cn(
                            "py-3 px-2 flex items-center justify-center gap-1.5 transition-colors border-b-2 cursor-pointer",
                            activeOnlineTab === "netbanking"
                              ? "border-[#FF5500] text-[#FF5500] bg-white"
                              : "border-transparent text-[#625D55] hover:text-[#111315]"
                          )}
                        >
                          <Building2 className="size-3.5 sm:size-4" />
                          <span>Net Banking</span>
                        </button>
                      </div>

                      {/* Modal Body: Scrollable & Responsive */}
                      <div className="p-4 sm:p-6 overflow-y-auto max-h-[58vh] sm:max-h-[60vh] space-y-4 sm:space-y-5 text-sm">
                        {/* TAB 1: UPI & QR CODE */}
                        {activeOnlineTab === "upi" && (
                          <div className="space-y-4">
                            <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] text-center">
                              <p className="text-xs font-semibold text-[#524E48] mb-3">
                                Scan with any UPI app (GPay / PhonePe / Paytm / BHIM)
                              </p>
                              <div className="p-3 bg-white rounded-xl shadow-xs inline-block border border-[#E8E2D9]">
                                <UpiQrPattern />
                              </div>
                              <p className="text-[11px] text-[#71695F] mt-2 font-mono">
                                Dynamic UPI QR • Valid for 10:00 mins
                              </p>
                            </div>

                            {/* One-Click Mobile Quick Pay Apps */}
                            <div className="space-y-2">
                              <span className="text-[11px] uppercase font-bold text-[#71695F] tracking-wider block">
                                Or Pay via Installed UPI App
                              </span>
                              <div className="grid grid-cols-3 gap-2">
                                <button
                                  type="button"
                                  onClick={handlePayOnlineNow}
                                  className="py-2.5 px-2 sm:px-3 rounded-xl border border-[#E8E2D9] bg-white hover:border-[#FF5500] hover:bg-[#FAF8F5] flex items-center justify-center gap-1.5 sm:gap-2 transition-all text-xs font-bold text-[#111315] shadow-2xs active:scale-95 cursor-pointer"
                                >
                                  <GooglePayLogo className="size-4 shrink-0" />
                                  <span>GPay</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={handlePayOnlineNow}
                                  className="py-2.5 px-2 sm:px-3 rounded-xl border border-[#E8E2D9] bg-white hover:border-[#FF5500] hover:bg-[#FAF8F5] flex items-center justify-center gap-1.5 sm:gap-2 transition-all text-xs font-bold text-[#111315] shadow-2xs active:scale-95 cursor-pointer"
                                >
                                  <PhonePeLogo className="size-4 shrink-0" />
                                  <span>PhonePe</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={handlePayOnlineNow}
                                  className="py-2.5 px-2 sm:px-3 rounded-xl border border-[#E8E2D9] bg-white hover:border-[#FF5500] hover:bg-[#FAF8F5] flex items-center justify-center gap-1.5 sm:gap-2 transition-all text-xs font-bold text-[#111315] shadow-2xs active:scale-95 cursor-pointer"
                                >
                                  <PaytmLogo className="h-3.5 w-auto shrink-0" />
                                  <span>Paytm</span>
                                </button>
                              </div>
                            </div>

                            {/* Copyable UPI ID */}
                            <div className="p-3 rounded-xl bg-white border border-[#E8E2D9] flex items-center justify-between">
                              <div className="min-w-0">
                                <span className="text-[10px] uppercase font-mono text-[#8C8275] block">
                                  Merchant VPA
                                </span>
                                <span className="font-mono text-xs font-bold text-[#111315] truncate block">
                                  sarvadnyapower@icici
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={handleCopyUpi}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#EFEAE1] border border-[#E8E2D9] text-xs font-bold text-[#111315] transition-colors shrink-0"
                              >
                                {copiedUpi ? (
                                  <>
                                    <Check className="size-3 text-emerald-600" />
                                    <span className="text-emerald-700">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="size-3 text-[#FF5500]" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        )}

                        {/* TAB 2: CREDIT / DEBIT CARDS */}
                        {activeOnlineTab === "card" && (
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center py-1">
                            {/* LEFT SIDE: 3D INTERACTIVE CREDIT / DEBIT CARD */}
                            <div className="md:col-span-6 flex flex-col items-center justify-center">
                              <div className="w-full max-w-[340px] sm:max-w-[360px] mx-auto [perspective:1000px] select-none">
                                <div
                                  onClick={() => setIsCardFlipped((prev) => !prev)}
                                  title="Click to flip card"
                                  className={cn(
                                    "relative w-full aspect-[1.586/1] rounded-2xl transition-transform duration-700 cursor-pointer shadow-xl [transform-style:preserve-3d]",
                                    isCardFlipped ? "[transform:rotateY(180deg)]" : ""
                                  )}
                                >
                                  {/* FRONT FACE */}
                                  <div
                                    className={cn(
                                      "absolute inset-0 w-full h-full rounded-2xl p-4 sm:p-5 flex flex-col justify-between overflow-hidden text-white [backface-visibility:hidden]",
                                      "bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E293B] border border-white/20 shadow-2xl"
                                    )}
                                  >
                                    {/* Holographic Sheen Overlay */}
                                    <div
                                      className="pointer-events-none absolute inset-0 opacity-25"
                                      style={{
                                        background:
                                          "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.45), transparent 60%)",
                                      }}
                                    />

                                    {/* Header: Brand Name + Contactless + Network */}
                                    <div className="relative z-10 flex items-center justify-between">
                                      <div>
                                        <span className="font-sans font-black tracking-wider text-xs sm:text-sm text-white/95 block">
                                          SARVADNYA FLEET
                                        </span>
                                        <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF8533]">
                                          Commercial DG Pass
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <ContactlessNfcSvg className="size-4 sm:size-5 text-white/70" />
                                        {cardNetwork === "visa" && <VisaLogo className="text-white" />}
                                        {cardNetwork === "mastercard" && <MastercardLogo className="h-5" />}
                                        {cardNetwork === "rupay" && <RuPayLogo />}
                                        {cardNetwork === "other" && (
                                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/60">
                                            CARD
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Golden EMV Chip */}
                                    <div className="relative z-10 my-auto py-0.5">
                                      <EmvChipSvg className="w-10 sm:w-11 h-auto" />
                                    </div>

                                    {/* Card Number & Cardholder / Expiry Footer */}
                                    <div className="relative z-10 space-y-2">
                                      <div className="font-mono font-bold tracking-[0.2em] sm:tracking-[0.24em] text-sm sm:text-base text-white/95 drop-shadow-sm tabular-nums">
                                        {cardNumber ? cardNumber.padEnd(19, "•") : "•••• •••• •••• ••••"}
                                      </div>

                                      <div className="flex items-end justify-between pt-1 border-t border-white/10 text-[10px] sm:text-xs">
                                        <div className="truncate max-w-[65%]">
                                          <span className="block text-[8px] uppercase tracking-wider text-white/50 font-mono">
                                            Cardholder
                                          </span>
                                          <span className="font-semibold uppercase tracking-wider text-white truncate block">
                                            {cardHolder.trim() || "ENTERPRISE CLIENT"}
                                          </span>
                                        </div>

                                        <div className="text-right shrink-0">
                                          <span className="block text-[8px] uppercase tracking-wider text-white/50 font-mono">
                                            Expires
                                          </span>
                                          <span className="font-mono font-bold text-white tracking-widest">
                                            {cardExpiry || "MM/YY"}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* BACK FACE */}
                                  <div
                                    className={cn(
                                      "absolute inset-0 w-full h-full rounded-2xl py-4 flex flex-col justify-between overflow-hidden text-white [backface-visibility:hidden] [transform:rotateY(180deg)]",
                                      "bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] border border-white/20 shadow-2xl"
                                    )}
                                  >
                                    {/* Magnetic Stripe */}
                                    <div className="w-full h-8 sm:h-9 bg-[#0B0F19] -mt-1 shadow-inner" />

                                    {/* Signature Panel & CVV Box */}
                                    <div className="px-5 space-y-1">
                                      <div className="flex items-center">
                                        <div className="h-7 sm:h-8 flex-1 bg-white/90 rounded-l flex items-center px-2 text-[#334155] text-[10px] italic font-serif">
                                          Authorized Signature • Not Transferable
                                        </div>
                                        <div className="h-7 sm:h-8 w-14 bg-[#F8FAFC] border-l-2 border-[#CBD5E1] rounded-r flex items-center justify-center font-mono font-bold text-xs sm:text-sm text-[#0F172A] tracking-wider italic">
                                          {cardCvv ? "•".repeat(cardCvv.length) : "•••"}
                                        </div>
                                      </div>
                                      <p className="text-[8px] text-white/40 text-right font-mono">
                                        3-digit CVV on back
                                      </p>
                                    </div>

                                    {/* Back Micro Details & Security Disclaimer */}
                                    <div className="px-5 flex items-end justify-between text-[8px] text-white/50 leading-tight">
                                      <div className="max-w-[70%]">
                                        <p>Commercial DG rental authorization token pass.</p>
                                        <p className="text-[#FF8533] mt-0.5">24x7 Helpline: +91 62626 29944</p>
                                      </div>
                                      <div className="flex items-center gap-1.5 opacity-80">
                                        {cardNetwork === "visa" && <VisaLogo className="text-white text-xs" />}
                                        {cardNetwork === "mastercard" && <MastercardLogo className="h-4" />}
                                        {cardNetwork === "rupay" && <RuPayLogo className="text-white" />}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <p className="text-center text-[11px] text-[#8C8275] mt-2 font-medium">
                                  {isCardFlipped
                                    ? "Viewing CVV security panel (tap to flip front)"
                                    : "Interactive 3D Card (typing CVV automatically flips card)"}
                                </p>
                              </div>
                            </div>

                            {/* RIGHT SIDE: CARD INPUT FIELDS */}
                            <div className="md:col-span-6 space-y-3.5">
                              <div>
                                <label className="text-xs font-bold text-[#111315] block mb-1">
                                  Card Number
                                </label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    maxLength={19}
                                    value={cardNumber}
                                    onChange={(e) => {
                                      const val = e.target.value.replace(/\D/g, "").slice(0, 16);
                                      setCardNumber(val.replace(/(\d{4})/g, "$1 ").trim());
                                    }}
                                    placeholder="4532 8920 1204 9842"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] focus:border-[#FF5500] focus:outline-none font-mono text-sm text-[#111315] placeholder:text-[#A1A1AA] bg-[#FAF8F5]"
                                  />
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                                    {cardNetwork === "visa" && <VisaLogo className="text-[#111315]" />}
                                    {cardNetwork === "mastercard" && <MastercardLogo className="h-4" />}
                                    {cardNetwork === "rupay" && <RuPayLogo />}
                                    {cardNetwork === "other" && (
                                      <div className="flex items-center gap-1 text-[10px] font-bold text-[#8C8275]">
                                        <span>VISA</span>
                                        <span>MC</span>
                                        <span>RUPAY</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div>
                                <label className="text-xs font-bold text-[#111315] block mb-1">
                                  Cardholder Name
                                </label>
                                <input
                                  type="text"
                                  value={cardHolder}
                                  onChange={(e) => setCardHolder(e.target.value)}
                                  placeholder="Enter name as printed on card"
                                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] focus:border-[#FF5500] focus:outline-none text-sm text-[#111315] placeholder:text-[#A1A1AA] bg-[#FAF8F5] uppercase"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="text-xs font-bold text-[#111315] block mb-1">
                                    Expiry Date
                                  </label>
                                  <input
                                    type="text"
                                    maxLength={5}
                                    value={cardExpiry}
                                    onChange={(e) => {
                                      const val = e.target.value.replace(/\D/g, "").slice(0, 4);
                                      if (val.length >= 3) {
                                        setCardExpiry(`${val.slice(0, 2)}/${val.slice(2)}`);
                                      } else {
                                        setCardExpiry(val);
                                      }
                                    }}
                                    placeholder="MM/YY"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] focus:border-[#FF5500] focus:outline-none font-mono text-sm text-[#111315] placeholder:text-[#A1A1AA] bg-[#FAF8F5]"
                                  />
                                </div>
                                <div>
                                  <label className="text-xs font-bold text-[#111315] block mb-1">
                                    CVV (3-digit)
                                  </label>
                                  <input
                                    type="password"
                                    maxLength={4}
                                    value={cardCvv}
                                    onFocus={() => setIsCardFlipped(true)}
                                    onBlur={() => setIsCardFlipped(false)}
                                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                                    placeholder="•••"
                                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] focus:border-[#FF5500] focus:outline-none font-mono text-sm text-[#111315] placeholder:text-[#A1A1AA] bg-[#FAF8F5]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB 3: NET BANKING */}
                        {activeOnlineTab === "netbanking" && (
                          <div className="space-y-3.5">
                            <span className="text-xs font-bold text-[#111315] block">
                              Popular Indian Banks
                            </span>
                            <div className="grid grid-cols-2 gap-2.5">
                              {[
                                { id: "hdfc", name: "HDFC Bank" },
                                { id: "sbi", name: "State Bank of India" },
                                { id: "icici", name: "ICICI Bank" },
                                { id: "axis", name: "Axis Bank" },
                              ].map((bank) => (
                                <button
                                  key={bank.id}
                                  type="button"
                                  onClick={() => setSelectedBank(bank.id)}
                                  className={cn(
                                    "p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer",
                                    selectedBank === bank.id
                                      ? "border-[#FF5500] bg-[#FFF5EE] text-[#FF5500] font-bold"
                                      : "border-[#E8E2D9] bg-white text-[#111315] hover:bg-[#FAF8F5]"
                                  )}
                                >
                                  <span className="text-xs">{bank.name}</span>
                                  {selectedBank === bank.id && (
                                    <Check className="size-3.5 text-[#FF5500]" />
                                  )}
                                </button>
                              ))}
                            </div>

                            <div className="pt-2">
                              <label className="text-xs font-bold text-[#111315] block mb-1">
                                Or Select Another Bank
                              </label>
                              <select
                                value={selectedBank}
                                onChange={(e) => setSelectedBank(e.target.value)}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] text-xs sm:text-sm text-[#111315] focus:border-[#FF5500] focus:outline-none"
                              >
                                <option value="hdfc">HDFC Bank</option>
                                <option value="sbi">State Bank of India (SBI)</option>
                                <option value="icici">ICICI Bank</option>
                                <option value="axis">Axis Bank</option>
                                <option value="kotak">Kotak Mahindra Bank</option>
                                <option value="bob">Bank of Baroda</option>
                                <option value="pnb">Punjab National Bank</option>
                                <option value="canara">Canara Bank</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Sticky Gateway Footer CTA */}
                      <div className="p-4 sm:p-5 border-t border-[#E8E2D9] bg-[#FAF8F5] shrink-0">
                        <button
                          type="button"
                          onClick={handlePayOnlineNow}
                          className="w-full py-3.5 px-6 rounded-xl bg-[#FF5500] hover:bg-[#E04B00] text-white font-sans font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-md shadow-[#FF5500]/25 cursor-pointer active:scale-[0.98]"
                        >
                          <Lock className="size-4" />
                          <span>Pay ₹{payableAmount.toLocaleString("en-IN")} Securely</span>
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* ======================================================== */}
      {/* FINAL ORDER CONFIRMED & DIGITAL RECEIPT MODAL            */}
      {/* ======================================================== */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {confirmedMethod === "online" && receiptDetails && (
              <div className="fixed inset-0 z-[170] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleDismiss}
                  className="fixed inset-0 bg-[#111315]/65 backdrop-blur-md"
                  aria-hidden="true"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: 12 }}
                  transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-md bg-white border border-[#E8E2D9] rounded-3xl p-6 sm:p-8 shadow-[0_30px_80px_rgba(17,19,21,0.28)] overflow-hidden text-center z-10 max-h-[92vh] overflow-y-auto"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="payment-confirmation-title"
                >
                  {/* Top Orange Accent Stripe */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-[#FF5500]" />

                  {/* Dismiss Button */}
                  <button
                    type="button"
                    onClick={handleDismiss}
                    aria-label="Close confirmation"
                    className="absolute top-4 right-4 size-8 sm:size-9 rounded-full bg-[#FAF8F5] hover:bg-[#EFEAE1] border border-[#E8E2D9] text-[#111315] flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>

                  {/* Animated Success or Failure Badge */}
                  {receiptStatus === "paid" ? (
                    <div className="relative mx-auto size-16 sm:size-20 rounded-full bg-emerald-50 border-2 border-emerald-500/30 flex items-center justify-center mb-4">
                      <div className="absolute inset-0 rounded-full bg-emerald-500/15 animate-ping [animation-duration:2.2s]" />
                      <svg viewBox="0 0 40 40" className="relative z-10 size-9 sm:size-10" fill="none" aria-hidden="true">
                        <circle cx="20" cy="20" r="18" fill="#10B981" />
                        <motion.path
                          d="M12.5 20.5L17.5 25.5L27.5 15"
                          stroke="#FFFFFF"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="relative mx-auto size-16 sm:size-20 rounded-full bg-red-50 border-2 border-red-500/30 flex items-center justify-center mb-4">
                      <div className="absolute inset-0 rounded-full bg-red-500/15 animate-ping [animation-duration:2.2s]" />
                      <svg viewBox="0 0 40 40" className="relative z-10 size-9 sm:size-10" fill="none" aria-hidden="true">
                        <circle cx="20" cy="20" r="18" fill="#EF4444" />
                        <motion.path
                          d="M14 14L26 26M26 14L14 26"
                          stroke="#FFFFFF"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                        />
                      </svg>
                    </div>
                  )}

                  <h3
                    id="payment-confirmation-title"
                    className="font-sans text-xl sm:text-2xl font-extrabold text-[#111315] tracking-tight mb-1"
                  >
                    {receiptStatus === "paid" ? "Payment Successful" : "Payment Declined"}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-[#403C36] leading-relaxed mb-4">
                    {receiptStatus === "paid"
                      ? "Transaction verified with bank gateway. Dispatch schedule & logistics locked."
                      : "The banking authorization failed or was rejected. No funds were debited."}
                  </p>

                  {/* Stamp Simulator Switcher for Reviewing Both States */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <span className="text-[10px] uppercase font-mono text-[#8C8275] tracking-wider">
                      Stamp State:
                    </span>
                    <button
                      type="button"
                      onClick={() => setReceiptStatus("paid")}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer",
                        receiptStatus === "paid"
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-[#FAF8F5] border border-[#E8E2D9] text-[#71695F] hover:text-[#111315]"
                      )}
                    >
                      ★ Paid Stamp
                    </button>
                    <button
                      type="button"
                      onClick={() => setReceiptStatus("failed")}
                      className={cn(
                        "px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer",
                        receiptStatus === "failed"
                          ? "bg-red-600 text-white shadow-xs"
                          : "bg-[#FAF8F5] border border-[#E8E2D9] text-[#71695F] hover:text-[#111315]"
                      )}
                    >
                      ✖ Failed Stamp
                    </button>
                  </div>

                  {/* Official Receipt Card with Authentic Ink Watermark Stamp */}
                  <div className="relative p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] text-left space-y-2.5 mb-5 text-xs sm:text-sm overflow-hidden shadow-inner">
                    {/* INK WATERMARK STAMP (Green for Paid/Reserved, Red for Failed) */}
                    {receiptStatus === "paid" ? (
                      <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 -rotate-12">
                        <div className="border-3 border-dashed border-emerald-600 bg-emerald-50/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl text-center shadow-lg">
                          <span className="text-[9px] font-mono font-bold tracking-widest text-emerald-800 uppercase block">
                            GATEWAY VERIFIED
                          </span>
                          <span className="text-xl sm:text-2xl font-black font-sans uppercase tracking-widest text-emerald-600 block leading-tight">
                            ★ PAID ★
                          </span>
                          <span className="text-[8px] font-mono font-bold text-emerald-700 block tracking-wider">
                            SARVADNYA POWER
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 pointer-events-none select-none z-10 -rotate-12">
                        <div className="border-3 border-dashed border-red-600 bg-red-50/95 backdrop-blur-xs px-3.5 py-1.5 rounded-xl text-center shadow-lg">
                          <span className="text-[9px] font-mono font-bold tracking-widest text-red-800 uppercase block">
                            TRANSACTION ALERT
                          </span>
                          <span className="text-xl sm:text-2xl font-black font-sans uppercase tracking-widest text-red-600 block leading-tight">
                            ✖ FAILED ✖
                          </span>
                          <span className="text-[8px] font-mono font-bold text-red-700 block tracking-wider">
                            DECLINED BY BANK
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Product Name */}
                    <div className="pb-2 border-b border-[#E8E2D9]">
                      <span className="text-[#71695F] font-mono text-[10px] sm:text-[11px] uppercase tracking-wider block">
                        Equipment / Fleet
                      </span>
                      <span className="font-bold text-[#111315] text-xs sm:text-sm block mt-0.5">
                        {receiptDetails.description}
                      </span>
                    </div>

                    {/* Order Reference */}
                    <div className="flex justify-between items-center pb-2 border-b border-[#E8E2D9]">
                      <span className="text-[#71695F] font-mono text-[10px] sm:text-[11px] uppercase">
                        Order / Booking Ref
                      </span>
                      <span className="font-mono font-bold text-[#111315]">
                        {receiptDetails.bookingId}
                      </span>
                    </div>

                    {/* Transaction ID */}
                    <div className="flex justify-between items-center pb-2 border-b border-[#E8E2D9]">
                      <span className="text-[#71695F] font-mono text-[10px] sm:text-[11px] uppercase">
                        Transaction ID
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#111315] truncate max-w-[170px]">
                        {receiptDetails.txnId}
                      </span>
                    </div>

                    {/* Card Number (Masked, if provided) */}
                    {receiptDetails.cardNumber && (
                      <div className="flex justify-between items-center pb-2 border-b border-[#E8E2D9]">
                        <span className="text-[#71695F] font-mono text-[10px] sm:text-[11px] uppercase">
                          Card Number
                        </span>
                        <span className="font-mono font-bold text-[#111315]">
                          {receiptDetails.cardNumber}
                        </span>
                      </div>
                    )}

                    {/* Cardholder */}
                    {receiptDetails.cardHolder && (
                      <div className="flex justify-between items-center pb-2 border-b border-[#E8E2D9]">
                        <span className="text-[#71695F] font-mono text-[10px] sm:text-[11px] uppercase">
                          Cardholder
                        </span>
                        <span className="font-bold text-[#111315] uppercase">
                          {receiptDetails.cardHolder}
                        </span>
                      </div>
                    )}

                    {/* Amount Paid */}
                    <div className="flex justify-between items-center pb-2 border-b border-[#E8E2D9]">
                      <span className="text-[#71695F] font-mono text-[10px] sm:text-[11px] uppercase">
                        Amount
                      </span>
                      <span
                        className={cn(
                          "font-bold text-sm sm:text-base",
                          receiptStatus === "paid" ? "text-emerald-700" : "text-red-700"
                        )}
                      >
                        ₹{receiptDetails.amount.toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Payment Mode */}
                    <div className="flex justify-between items-center pb-2 border-b border-[#E8E2D9]">
                      <span className="text-[#71695F] font-mono text-[10px] sm:text-[11px] uppercase">
                        Payment Mode
                      </span>
                      <span className="font-semibold text-[#111315]">
                        {receiptDetails.method}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="flex justify-between items-center">
                      <span className="text-[#71695F] font-mono text-[10px] sm:text-[11px] uppercase">
                        Date & Time
                      </span>
                      <span className="font-mono text-xs text-[#111315]">
                        {receiptDetails.date}
                      </span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={handleDownloadReceipt}
                      className="w-full py-3 px-4 rounded-xl border border-[#E8E2D9] hover:border-[#111315] bg-white text-[#111315] font-sans font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                    >
                      <Download className="size-4 text-[#FF5500]" />
                      <span>Download Receipt (TXT / PDF)</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleReturnToFleet}
                      className="w-full py-3.5 px-6 rounded-xl bg-[#111315] hover:bg-[#FF5500] text-white font-sans font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>Back to Generator Fleet</span>
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* Strict Authentication Gate Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setShowLoginModal(false);
          // If online was selected, open gateway once signed in
          if (selectedMethod === "online") {
            setIsGatewayOpen(true);
          }
        }}
        title="Welcome Back"
        subtitle="Sign in to your Sarvadnya Power account to securely complete payment & confirm fleet dispatch."
      />
    </div>
  );
}
