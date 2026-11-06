import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Shield, Cookie } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Sarvadnya Generators",
  description: "Our commitment to protecting your personal data and ensuring transparency in our power rental services.",
};

export default function PrivacyPage() {
  const tableOfContents = [
    { title: "Information We Collect", id: "collection" },
    { title: "How We Use Data", id: "usage" },
    { title: "Data Security", id: "security" },
    { title: "Contact Us", id: "contact" },
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
                  Transparency Report
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white font-['Poppins',sans-serif] leading-tight mb-8">
                Privacy <span className="text-[#00ff8f]">Policy</span>
              </h1>
              <p className="text-white/40 text-lg font-['Outfit',sans-serif]">
                Last Updated: May 15, 2026
              </p>
            </header>

            {/* Content Sections */}
            <div className="space-y-24 font-['Outfit',sans-serif] text-[#bfbfbf] leading-relaxed text-lg">
              <section id="collection" className="space-y-6 scroll-mt-32">
                <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif]">1. Information We Collect</h2>
                <p>
                  At Sarvadnya Generators, we collect information that is essential for providing you with high-performance power solutions. This includes:
                </p>
                <ul className="list-disc pl-6 space-y-3 text-white/70">
                  <li>Contact details (Name, Email, Mobile Number)</li>
                  <li>Business Information (Company Name, GST details)</li>
                  <li>Logistics Data (Site address for generator delivery)</li>
                  <li>Usage Data (Power consumption logs for maintenance)</li>
                </ul>
              </section>

              <section id="usage" className="space-y-6 scroll-mt-32">
                <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif]">2. How We Use Your Data</h2>
                <p>
                  Your data is primarily used to facilitate reliable generator rentals and maintain the safety of our equipment.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                    <h3 className="text-white font-bold mb-3">Service Delivery</h3>
                    <p className="text-sm text-white/50">Processing bookings, delivering equipment to your specific site, and managing rental durations.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                    <h3 className="text-white font-bold mb-3">Technical Support</h3>
                    <p className="text-sm text-white/50">Coordinating technician visits and fuel refills based on your operational schedule.</p>
                  </div>
                </div>
              </section>

              <section id="security" className="space-y-6 scroll-mt-32">
                <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif]">3. Data Security</h2>
                <p>
                  We employ military-grade encryption and secure database protocols to ensure your business data remains confidential. We do not sell or share your information with third-party marketing firms.
                </p>
              </section>

              <section id="contact" className="space-y-6 scroll-mt-32">
                <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif]">4. Contact Our Privacy Team</h2>
                <p>
                  If you have any questions regarding your data, please contact our transparency officer at:
                  <br />
                  <span className="text-[#00ff8f] font-bold block mt-2">privacy@sarvadnyagenerators.com</span>
                </p>
              </section>
            </div>
          </div>

          {/* Table of Contents Sidebar */}
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
                    href="/terms" 
                    className="group flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#00ff8f]/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={18} className="text-white/40 group-hover:text-[#00ff8f]" />
                      <span className="text-sm text-white font-medium">Terms of Service</span>
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
                <h5 className="text-white font-bold mb-4">Need Help?</h5>
                <p className="text-sm text-white/60 mb-6">Our support team is available 24/7 for any legal or service queries.</p>
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
