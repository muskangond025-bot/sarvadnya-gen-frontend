import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/common";

/**
 * Community Component (Server)
 *
 * Orbit section with CSS animations - fully server-rendered.
 */
export function Community() {
  return (
    <section className="w-full py-[100px] flex flex-col items-center justify-center relative overflow-hidden bg-linear-to-b from-black to-[#052014]">
      {/* Title */}
      <h2 className="text-white text-[48px] font-medium text-center mb-[20px] font-['Poppins',sans-serif]">
        The Sarvadnya <span className="text-[#00ff8f]">Promise</span>
      </h2>
      <p className="text-[#bfbfbf] text-center max-w-[800px] mb-[80px] font-['Outfit',sans-serif] text-lg px-6">
        We deliver uninterrupted power with fast response times, well-maintained equipment, and dedicated 24/7 technical support.
      </p>

      {/* Orbit System */}
      <div className="relative w-[800px] h-[400px] flex items-center justify-center">
        {/* Center Logo */}
        <div className="relative z-10 w-[100px] h-[100px] flex items-center justify-center bg-[#0d2b1d] rounded-[24px] border border-[#00ff8f]/20 shadow-[0_0_50px_-10px_rgba(0,255,143,0.3)]">
          <Logo iconOnly variant="on-dark" />
        </div>

        {/* Orbit lines */}
        <div className="absolute inset-0 border border-white/5 rounded-full scale-y-50" />
        <div className="absolute inset-0 border border-white/5 rounded-full scale-y-50 scale-x-125" />

        {/* Floating Avatars - Left Side */}
        <div className="absolute left-[10%] top-[40%] animate-float">
          <Avatar size={60} src="/images/testimonials/reviewer.png" />
        </div>
        <div className="absolute left-[20%] top-[20%] animate-float-delayed">
          <Avatar size={50} src="/images/testimonials/testimonial-1.png" />
        </div>
        <div className="absolute left-[15%] bottom-[20%] animate-float">
          <Avatar size={55} src="/images/testimonials/testimonial-2.png" />
        </div>

        {/* Floating Avatars - Right Side */}
        <div className="absolute right-[10%] top-[40%] animate-float-delayed">
          <Avatar size={60} src="/images/blog/blog-main.png" />
        </div>
        <div className="absolute right-[20%] top-[20%] animate-float">
          <Avatar size={50} src="/images/testimonials/reviewer.png" />
        </div>
        <div className="absolute right-[15%] bottom-[20%] animate-float-delayed">
          <Avatar size={55} src="/images/testimonials/testimonial-1.png" />
        </div>
      </div>

      {/* Button */}
      <Link href="/contact" className="inline-block mt-[60px] bg-[#00ff8f]/10 border border-[#00ff8f] text-[#00ff8f] px-[30px] py-[12px] rounded-[8px] hover:bg-[#00ff8f] hover:text-black transition-all font-['Outfit',sans-serif]">
        Contact Our Experts
      </Link>
    </section>
  );
}

function Avatar({ size, src }: { size: number; src: string }) {
  return (
    <div
      className="rounded-full border-2 border-[#00ff8f]/30 overflow-hidden relative bg-black/50"
      style={{ width: size, height: size }}
    >
      <Image src={src} alt="User" fill className="object-cover" />
    </div>
  );
}
