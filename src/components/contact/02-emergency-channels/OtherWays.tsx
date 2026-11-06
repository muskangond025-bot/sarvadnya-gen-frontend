import React from "react";
import { MessageSquare, Headphones, HelpCircle, ArrowRight } from "lucide-react";

/**
 * OtherWays Component
 * 
 * Displays alternative contact methods like Chat, Support, and Help Center.
 */
export function OtherWays() {
  const ways = [
    {
      title: "Live Chat",
      desc: "Chat with our support team in real-time",
      cta: "Start Chat",
      icon: MessageSquare,
      color: "bg-emerald-50",
      iconColor: "bg-emerald-500",
      textColor: "text-emerald-900",
      borderColor: "border-emerald-100"
    },
    {
      title: "Phone Support",
      desc: "Speak directly with our technical team",
      cta: "Call Now",
      icon: Headphones,
      color: "bg-blue-50",
      iconColor: "bg-blue-500",
      textColor: "text-blue-900",
      borderColor: "border-blue-100"
    },
    {
      title: "Help Center",
      desc: "Browse our generator maintenance guides",
      cta: "Visit Help Center",
      icon: HelpCircle,
      color: "bg-purple-50",
      iconColor: "bg-purple-500",
      textColor: "text-purple-900",
      borderColor: "border-purple-100"
    }
  ];

  return (
    <section className="w-full py-20 flex flex-col items-center gap-12 bg-black">
      <h2 className="text-3xl font-bold text-white font-['Poppins',sans-serif]">Other Ways to Reach Us</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-[1200px] px-6">
        {ways.map((way, i) => (
          <div key={i} className={`${way.color} ${way.borderColor} border rounded-[24px] p-8 flex flex-col items-center text-center gap-4 group hover:scale-[1.02] transition-all`}>
            <div className={`${way.iconColor} size-12 rounded-xl flex items-center justify-center text-white shadow-lg`}>
              <way.icon className="size-6" />
            </div>
            <h3 className={`${way.textColor} text-xl font-bold font-['Poppins',sans-serif]`}>{way.title}</h3>
            <p className={`${way.textColor} opacity-70 font-['Outfit',sans-serif]`}>{way.desc}</p>
            <button className={`mt-2 flex items-center gap-2 font-semibold ${way.textColor} group-hover:gap-3 transition-all`}>
              {way.cta} <ArrowRight className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
