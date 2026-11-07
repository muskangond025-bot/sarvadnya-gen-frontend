import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, FileText, Fingerprint } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy | Sarvadnya Generators",
  description: "Understanding how we use tracking technologies to improve your power rental discovery experience.",
};

export default function CookiesPage() {
  const tableOfContents = [
    { title: "What are Cookies?", id: "definition" },
    { title: "How We Use Them", id: "purpose" },
    { title: "Managing Preferences", id: "management" },
  ];

  return (
    <main className="min-h-screen bg-black pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 md:px-10 lg:px-[60px]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 sm:gap-16">
          
          {/* Main Content Area */}
          <div className="flex-1 max-w-4xl">
            {/* Header Section */}
            <header className="mb-12 sm:mb-20">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-2 rounded-full bg-[#00ff8f] shadow-[0_0_10px_#00ff8f]" />
                <span className="text-[#00ff8f] font-['Outfit',sans-serif] text-sm font-bold uppercase tracking-[0.2em]">
                  Data Preferences
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white font-['Poppins',sans-serif] leading-tight mb-6 sm:mb-8">
                Cookie <span className="text-[#00ff8f]">Policy</span>
              </h1>
              <p className="text-white/40 text-lg font-['Outfit',sans-serif]">
                Enhanced User Experience Protocols
              </p>
            </header>

            {/* Content Sections */}
            <div className="space-y-24 font-['Outfit',sans-serif] text-[#bfbfbf] leading-relaxed text-lg">
              <section id="definition" className="space-y-6 scroll-mt-32">
                <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif]">1. What are Cookies?</h2>
                <p>
                  Cookies are small text files placed on your device to help our platform remember your preferences, such as your kVA requirements or your recent generator searches.
                </p>
              </section>

              <section id="purpose" className="space-y-8 scroll-mt-32">
                <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif]">2. How We Use Them</h2>
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-6 items-start">
                    <div className="size-10 rounded-full bg-[#00ff8f]/10 flex items-center justify-center text-[#00ff8f] shrink-0">
                      <Fingerprint size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Essential Cookies</h3>
                      <p className="text-sm text-white/50">Required for secure login, cart persistence, and real-time availability tracking.</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex gap-6 items-start">
                    <div className="size-10 rounded-full bg-[#00ff8f]/10 flex items-center justify-center text-[#00ff8f] shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Performance Cookies</h3>
                      <p className="text-sm text-white/50">Help us understand which generator models are most popular to optimize our fleet management.</p>
                    </div>
                  </div>
                </div>
              </section>

              <section id="management" className="space-y-6 scroll-mt-32">
                <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif]">3. Managing Preferences</h2>
                <p>
                  You can choose to disable cookies through your browser settings. However, please note that certain features of the Sarvadnya portal (like active rental tracking) may not function correctly without them.
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
                    href="/terms" 
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#00ff8f]/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-white/40 group-hover:text-[#00ff8f]" />
                      <span className="text-sm text-white font-medium">Terms of Service</span>
                    </div>
                    <ArrowRight size={14} className="text-white/20 group-hover:text-[#00ff8f] group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-linear-to-br from-[#00ff8f]/10 to-transparent border border-[#00ff8f]/20">
                <h5 className="text-white font-bold mb-4">Cookie Help?</h5>
                <p className="text-sm text-white/60 mb-6">Need assistance managing your data preferences?</p>
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
