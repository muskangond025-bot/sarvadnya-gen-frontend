import { Suspense } from "react";
import Link from "next/link";
import { LoginClient } from "../client/LoginClient";
import { CheckCircle2, ShieldCheck, Zap, ArrowLeft } from "lucide-react";

/**
 * Login Server Component (Full-Screen Non-Scrolling Free-Space Layout)
 *
 * Full-bleed bright atmospheric background with balanced 2-column open typography
 * and card-free floating pill controls sized cleanly for zero scrolling on desktop.
 */
export function Login() {
  const features = [
    {
      icon: <ShieldCheck className="text-[#FF5500]" size={15} />,
      label: "Verified Rentals",
    },
    {
      icon: <Zap className="text-[#FF5500]" size={15} />,
      label: "Fast Booking",
    },
    {
      icon: <CheckCircle2 className="text-[#FF5500]" size={15} />,
      label: "24/7 Support",
    },
  ];

  return (
    <section className="relative w-full min-h-screen lg:h-screen lg:overflow-hidden bg-[#FAF8F5] text-[#111315] flex flex-col px-5 sm:px-10 lg:px-16 py-5 sm:py-7">
      {/* Full-Screen Scenic Atmospheric Background Image + Bright Wash */}
      <div
        aria-hidden="true"
        className="fixed inset-0 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: "url('/images/auth_bg.png')",
        }}
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(115deg, rgba(250,248,245,0.86) 0%, rgba(250,248,245,0.68) 52%, rgba(247,239,229,0.82) 100%)",
        }}
      />

      {/* Minimal Top Navigation */}
      <div className="relative z-10 max-w-6xl w-full mx-auto shrink-0">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] font-bold text-[#403C36] hover:text-[#FF5500] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Balanced 2-Column Free-Space Canvas (No Cards, Fits 100vh Cleanly) */}
      <div className="relative z-10 flex-1 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-6 lg:py-0">
        {/* Left Zone: Open Brand Narrative & Editorial Highlights */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-5 sm:space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl xl:text-[54px] font-extrabold text-[#111315] tracking-tight leading-[1.06]">
              Empower Your <br className="hidden sm:block" />
              <span className="text-[#FF5500]">Business</span>
            </h1>
            <p className="text-[#2D2A26] text-sm sm:text-base xl:text-lg max-w-md leading-relaxed">
              Manage bookings, rental requests, and support from one premium
              dashboard.
            </p>
          </div>

          {/* Sleek Editorial Feature Highlights Strip */}
          <div className="flex flex-wrap items-center gap-y-2 pt-1">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="inline-flex items-center gap-2 pr-4">
                  <span className="size-6 rounded-full bg-white/85 backdrop-blur-sm shadow-2xs flex items-center justify-center shrink-0">
                    {feature.icon}
                  </span>
                  <span className="text-[#111315] text-xs sm:text-[13px] font-semibold tracking-tight whitespace-nowrap">
                    {feature.label}
                  </span>
                </div>
                {index < features.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden sm:inline-block w-px h-3.5 bg-[#111315]/20 mr-4"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Zone: Card-Free Open Login Stack in Free Space */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="w-full max-w-sm">
            <Suspense
              fallback={
                <div className="flex justify-center py-12">
                  <div className="w-9 h-9 border-4 border-white/50 border-t-[#FF5500] rounded-full animate-spin" />
                </div>
              }
            >
              <LoginClient />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
