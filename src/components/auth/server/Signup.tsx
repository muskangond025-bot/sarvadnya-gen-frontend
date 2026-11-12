import Link from "next/link";
import { SignupClient } from "../client/SignupClient";
import { Users, Award, CheckCircle2, ArrowLeft } from "lucide-react";

/**
 * Signup Server Component (Full-Screen Non-Scrolling Free-Space Layout)
 *
 * Matches Login layout identically on #FAF8F5 bright atmospheric canvas
 * while keeping all existing signup trust metrics and copy intact.
 */
export function Signup() {
  const stats = [
    { label: "Clients", value: "500+", icon: <Users className="text-[#FF5500]" size={15} /> },
    { label: "Experience", value: "12+ Yrs", icon: <Award className="text-[#FF5500]" size={15} /> },
    { label: "Rentals", value: "1000+", icon: <CheckCircle2 className="text-[#FF5500]" size={15} /> },
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
      <div className="relative z-10 flex-1 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-6 lg:py-0">
        {/* Left Zone: Open Brand Narrative & Trust Metrics */}
        <div className="lg:col-span-6 flex flex-col items-start text-left space-y-5 sm:space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl xl:text-[52px] font-extrabold text-[#111315] tracking-tight leading-[1.06]">
              Power Your Projects <br className="hidden sm:block" />
              With <span className="text-[#FF5500]">Reliable Rentals</span>
            </h1>

            <p className="text-[#2D2A26] text-sm sm:text-base xl:text-lg max-w-md leading-relaxed">
              Create your account to manage rentals, invoices, and support from
              one premium dashboard.
            </p>
          </div>

          {/* Sleek Editorial Statistics Strip */}
          <div className="flex flex-wrap items-center gap-y-3 pt-1">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center">
                <div className="pr-5 sm:pr-6">
                  <div className="flex items-center gap-1.5 text-[#524E48] mb-0.5">
                    {stat.icon}
                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                      {stat.label}
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#111315] tracking-tight">
                    {stat.value}
                  </div>
                </div>
                {i < stats.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden sm:inline-block w-px h-9 bg-[#111315]/15 mr-5 sm:mr-6"
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Zone: Card-Free Open Signup Stack in Free Space */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="w-full max-w-md">
            <SignupClient />
          </div>
        </div>
      </div>
    </section>
  );
}
