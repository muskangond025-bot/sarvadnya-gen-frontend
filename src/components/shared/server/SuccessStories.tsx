import { SuccessStoriesClient, FloatingGlow } from "../client";

/**
 * SuccessStories Component (Server)
 * 
 * High-fidelity section with testimonials, images, and stats in bright theme.
 */
export function SuccessStories() {
  return (
    <section className="w-full py-24 bg-transparent relative overflow-hidden">
      {/* Background Gradients */}
      <FloatingGlow color="#FF5500" size="lg" className="top-0 left-0 opacity-[0.05]" delay={0} />
      <FloatingGlow color="#FFAA00" size="md" className="bottom-0 right-0 opacity-[0.05]" delay={3} />
      
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[60px]">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-[#111315] font-['Poppins',sans-serif] text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Success Stories
          </h2>
          <p className="text-[#625D55] font-['Outfit',sans-serif] text-base sm:text-lg">
            Real results from real clients
          </p>
        </div>

        {/* Client-Side Animated Content */}
        <SuccessStoriesClient />
      </div>
    </section>
  );
}
