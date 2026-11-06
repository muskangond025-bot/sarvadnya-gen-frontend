import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Cookie, FileLock, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms & Conditions | Sarvadnya Generators",
  description: "Standard operating procedures and legal framework for renting generators with Sarvadnya Generators.",
};

export default function TermsPage() {
  const tableOfContents = [
    { title: "Rental Eligibility", id: "eligibility" },
    { title: "Equipment Maintenance", id: "maintenance" },
    { title: "Payment & Cancellation", id: "payment" },
    { title: "Liability Limitation", id: "liability" },
  ];

  return (
    <main className="min-h-screen bg-black pt-32 pb-24 px-6 md:px-10 lg:px-[60px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Main Content Area */}
          <div className="flex-1 max-w-4xl">
            {/* Header Section */}
            <header className="mb-20">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-2 rounded-full bg-[#00ff8f] shadow-[0_0_10px_#00ff8f]" />
                <span className="text-[#00ff8f] font-['Outfit',sans-serif] text-sm font-bold uppercase tracking-[0.2em]">
                  Service Agreement
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white font-['Poppins',sans-serif] leading-tight mb-8">
                Terms & <span className="text-[#00ff8f]">Conditions</span>
              </h1>
              <p className="text-white/40 text-lg font-['Outfit',sans-serif]">
                Version 2.4 | May 2026
              </p>
            </header>

            {/* Content Sections */}
            <div className="space-y-24 font-['Outfit',sans-serif] text-[#bfbfbf] leading-relaxed text-lg">
              <section id="eligibility" className="space-y-6 scroll-mt-32">
                <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif]">1. Rental Eligibility</h2>
                <p>
                  By accessing our services, you confirm that you are at least 18 years old or are a legally registered business entity. Customers must provide valid identification and site details prior to equipment dispatch.
                </p>
              </section>

              <section id="maintenance" className="space-y-6 scroll-mt-32">
                <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif]">2. Equipment Maintenance & Safety</h2>
                <p>
                  Sarvadnya Generators maintains all equipment to industrial standards. However, once on-site:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-white/70">
                  <li>The customer is responsible for the physical safety of the generator.</li>
                  <li>Only authorized Sarvadnya technicians may perform repairs.</li>
                  <li>The customer must ensure a stable, level surface for installation.</li>
                  <li>Fuel quality must be maintained if self-refilling (standard Diesel only).</li>
                </ul>
              </section>

              <section id="payment" className="space-y-6 scroll-mt-32">
                <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif]">3. Payment & Cancellations</h2>
                <p>
                  Rental fees are calculated on a daily (24-hour) basis. 
                </p>
                <div className="p-8 rounded-3xl bg-linear-to-br from-white/[0.05] to-transparent border border-white/10 relative overflow-hidden group">
                  <h4 className="text-white font-bold mb-4">Refund Policy</h4>
                  <p className="text-sm text-white/60 mb-6">Cancellations made 48 hours prior to dispatch are eligible for a full refund. Same-day cancellations may incur a logistics handling fee of ₹1,500.</p>
                  <div className="flex items-center gap-2 text-[#00ff8f] text-sm font-bold">
                    <div className="size-1.5 rounded-full bg-[#00ff8f]" />
                    Standard Pricing Model
                  </div>
                </div>
              </section>

              <section id="liability" className="space-y-6 scroll-mt-32">
                <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif]">4. Liability Limitation</h2>
                <p>
                  While we strive for 99.9% uptime, Sarvadnya Generators is not liable for indirect losses, data loss, or business interruption caused by power failure beyond our immediate control (e.g., natural disasters, grid fluctuations).
                </p>
              </section>
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="lg:w-80 relative">
            <div className="sticky top-32 space-y-8">
              {/* ToC Section */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
                <h4 className="text-white font-['Poppins',sans-serif] font-bold text-sm uppercase tracking-widest mb-8">
                  Main Points
                </h4>
                <nav className="space-y-4">
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center gap-4 text-[#bfbfbf] hover:text-[#00ff8f] transition-all group"
                    >
                      <div className="size-1 bg-white/20 group-hover:bg-[#00ff8f] group-hover:w-4 transition-all duration-300 rounded-full" />
                      <span className="text-sm font-['Outfit',sans-serif]">{item.title}</span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Related Legal Documents Section - Now on the Right */}
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
                <h4 className="text-white font-['Poppins',sans-serif] font-bold text-sm uppercase tracking-widest mb-8">
                  Related Documents
                </h4>
                <div className="space-y-4">
                  <Link 
                    href="/privacy" 
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#00ff8f]/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Shield size={18} className="text-white/40 group-hover:text-[#00ff8f]" />
                      <span className="text-sm text-white font-medium">Privacy Policy</span>
                    </div>
                    <ArrowRight size={14} className="text-white/20 group-hover:text-[#00ff8f] group-hover:translate-x-1" />
                  </Link>

                  <Link 
                    href="/cookies" 
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#00ff8f]/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Cookie size={18} className="text-white/40 group-hover:text-[#00ff8f]" />
                      <span className="text-sm text-white font-medium">Cookie Policy</span>
                    </div>
                    <ArrowRight size={14} className="text-white/20 group-hover:text-[#00ff8f] group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-linear-to-br from-[#00ff8f]/10 to-transparent border border-[#00ff8f]/20">
                <h5 className="text-white font-bold mb-4">Questions?</h5>
                <p className="text-sm text-white/60 mb-6">Need clarification on our service agreement? We're here to help.</p>
                <Link href="/contact" className="text-[#00ff8f] text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  Contact Support <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}
