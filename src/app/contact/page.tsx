import {
  ContactSidebar,
  ContactForm,
  OtherWays,
  MapSection,
} from "@/components/contact";
import { Metadata } from "next";
import { FloatingGlow } from "@/components/shared/client";

export const metadata: Metadata = {
  title: "Contact Us | Sarvadnya Generators",
  description: "Get in touch with Sarvadnya Generators for reliable power backup solutions in Nashik. 24/7 technical support and rental inquiries.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black pt-[140px] relative overflow-hidden">
      {/* Cinematic Background Atmosphere */}
      <FloatingGlow color="#00ff8f" size="xl" className="-top-1/4 -left-1/4 opacity-10" />
      <FloatingGlow color="#00d1ff" size="lg" className="bottom-1/4 -right-1/4 opacity-10" delay={2} />
      
      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-[60px] pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Contact Info */}
          <ContactSidebar />
          
          {/* Right: Contact Form */}
          <div className="w-full flex justify-center lg:justify-end">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Other Ways to Reach Us */}
      <div className="relative z-10">
        <OtherWays />
      </div>

      {/* Map Integration */}
      <div className="relative z-10">
        <MapSection />
      </div>
    </div>
  );
}
