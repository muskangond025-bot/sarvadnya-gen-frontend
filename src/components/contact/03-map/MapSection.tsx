import React from "react";

/**
 * MapSection Component
 * 
 * Embeds a Google Map showing the company location.
 */
export function MapSection() {
  // Nashik location coordinates for Sarvadnya Generators area (Jail Road)
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.626564619376!2d73.818818!3d19.981447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdd96f6e0b0b0b1%3A0x0!2zMTnCsDU4JzUzLjIiTiA3M8KwNDknMDcuNyJF!5e0!3m2!1sen!2sin!4v1715764000000!5m2!1sen!2sin";

  return (
    <section className="w-full h-[350px] md:h-[500px] relative">
      <iframe
        title="Sarvadnya Generators Location"
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="grayscale invert hover:grayscale-0 hover:invert-0 transition-all duration-1000"
      ></iframe>
      
      {/* Absolute overlay to match theme if needed, but the iframe itself is enough */}
      <div className="absolute inset-0 pointer-events-none border-y border-white/5 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
    </section>
  );
}
