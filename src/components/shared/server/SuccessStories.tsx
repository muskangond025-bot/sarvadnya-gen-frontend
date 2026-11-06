import { SuccessStoriesClient, FloatingGlow } from "../client";

/**
 * SuccessStories Component (Server)
 * 
 * High-fidelity section with testimonials, images, and stats.
 * Uses client-side animations for a "Crazy UI" effect.
 */
export function SuccessStories() {
  return (
    <section className="w-full py-24 bg-black relative overflow-hidden">
      {/* Background Gradients */}
      <FloatingGlow color="#00ff8f" size="lg" className="top-0 left-0" delay={0} />
      <FloatingGlow color="#00d1ff" size="md" className="bottom-0 right-0" delay={3} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,143,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[60px]">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-white font-['Poppins',sans-serif] text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Success Stories
          </h2>
          <p className="text-[#bfbfbf] font-['Outfit',sans-serif] text-base sm:text-lg">
            Real results from real clients
          </p>
        </div>

        {/* Client-Side Animated Content */}
        <SuccessStoriesClient />
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, value, label, sub }: { icon: any, value: string, label: string, sub: string }) {
  return (
    <div className="p-8 rounded-[24px] border border-white/5 bg-[#0a0a0a] flex flex-col gap-4 group hover:border-[#00ff8f]/30 transition-all duration-500">
      <div className="size-12 rounded-xl bg-[#00ff8f]/5 flex items-center justify-center text-[#00ff8f] group-hover:bg-[#00ff8f]/10 transition-colors">
        <Icon size={24} />
      </div>
      <div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-white font-['Poppins',sans-serif] font-medium mb-2">{label}</div>
        <div className="text-[#bfbfbf] text-sm font-['Outfit',sans-serif]">{sub}</div>
      </div>
    </div>
  );
}
