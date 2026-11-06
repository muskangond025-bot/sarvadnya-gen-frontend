import React from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

/**
 * ContactSidebar Component
 * 
 * Displays company contact information with industrial styling.
 */
export function ContactSidebar() {
  return (
    <div className="flex flex-col gap-10 w-full max-w-[450px]">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-white font-['Poppins',sans-serif]">Contact Information</h1>
        <p className="text-[#bfbfbf] font-['Outfit',sans-serif]">Fill out the form and our team will get back to you within 24 hours.</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Office Address */}
        <div className="flex gap-4 group">
          <div className="size-12 rounded-xl bg-[#00ff8f]/10 border border-[#00ff8f]/20 flex items-center justify-center shrink-0 group-hover:bg-[#00ff8f] group-hover:text-black transition-all text-[#00ff8f]">
            <MapPin className="size-6" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-white font-semibold font-['Poppins',sans-serif]">Office Address</h3>
            <p className="text-[#bfbfbf] font-['Outfit',sans-serif]">
              Wadala - Pathardi Rd, behind sudarshan lawns,<br />
              vanvaibhav colony, Indira Nagar,<br />
              Nashik, Maharashtra 422009
            </p>
          </div>
        </div>

        {/* Phone Numbers */}
        <div className="flex gap-4 group">
          <div className="size-12 rounded-xl bg-[#00ff8f]/10 border border-[#00ff8f]/20 flex items-center justify-center shrink-0 group-hover:bg-[#00ff8f] group-hover:text-black transition-all text-[#00ff8f]">
            <Phone className="size-6" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-white font-semibold font-['Poppins',sans-serif]">Phone Numbers</h3>
            <p className="text-[#bfbfbf] font-['Outfit',sans-serif]">
              Tanmay Avhad: +91 62626 29944<br />
              Gopal Avhad: +91 98231 97881<br />
            
            </p>
          </div>
        </div>

        {/* Email Addresses */}
        <div className="flex gap-4 group">
          <div className="size-12 rounded-xl bg-[#00ff8f]/10 border border-[#00ff8f]/20 flex items-center justify-center shrink-0 group-hover:bg-[#00ff8f] group-hover:text-black transition-all text-[#00ff8f]">
            <Mail className="size-6" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-white font-semibold font-['Poppins',sans-serif]">Email Addresses</h3>
            <p className="text-[#bfbfbf] font-['Outfit',sans-serif]">
              General: info@sarvadnyagenerators.com<br />
              Support: support@sarvadnyagenerators.com<br />
              Sales: sales@sarvadnyagenerators.com
            </p>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex gap-4 group">
          <div className="size-12 rounded-xl bg-[#00ff8f]/10 border border-[#00ff8f]/20 flex items-center justify-center shrink-0 group-hover:bg-[#00ff8f] group-hover:text-black transition-all text-[#00ff8f]">
            <Clock className="size-6" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-white font-semibold font-['Poppins',sans-serif]">Business Hours</h3>
            <p className="text-[#bfbfbf] font-['Outfit',sans-serif]">
              Mon - Sat: 9:00 AM - 7:00 PM<br />
              Sunday: Emergency Support Only<br />
              (24/7 Support Available for Rented Units)
            </p>
          </div>
        </div>
      </div>

      {/* Follow Us */}
      <div className="flex flex-col gap-4 mt-4 border-t border-white/5 pt-8">
        <h4 className="text-white font-semibold font-['Poppins',sans-serif]">Follow Us</h4>
        <div className="flex gap-4">
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
            <a key={i} href="#" className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#bfbfbf] hover:bg-[#00ff8f] hover:text-black hover:border-[#00ff8f] transition-all">
              <Icon className="size-5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
