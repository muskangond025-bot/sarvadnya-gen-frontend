"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

/**
 * ContactForm Component
 * 
 * A premium, industrial-styled contact form matching the user's design reference.
 */
export function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add submission logic here
    alert("Thank you! Your message has been sent.");
  };

  return (
    <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-xl border border-gray-100 flex flex-col gap-8 w-full max-w-[800px]">
      <h2 className="text-2xl font-semibold text-gray-900 font-['Poppins',sans-serif]">Send us a Message</h2>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Full Name *</label>
          <input 
            type="text" 
            placeholder="John Doe"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ff8f]/50 transition-all text-gray-900"
            value={formData.fullName}
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          />
        </div>

        {/* Email Address */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Email Address *</label>
          <input 
            type="email" 
            placeholder="john@example.com"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ff8f]/50 transition-all text-gray-900"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input 
            type="tel" 
            placeholder="+91 91585 00000"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ff8f]/50 transition-all text-gray-900"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Subject *</label>
          <select 
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ff8f]/50 transition-all text-gray-900 bg-white"
            value={formData.subject}
            onChange={(e) => setFormData({...formData, subject: e.target.value})}
          >
            <option>General Inquiry</option>
            <option>Generator Rental Quote</option>
            <option>Maintenance Support</option>
            <option>Technical Assistance</option>
            <option>Feedback</option>
          </select>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Your Message *</label>
          <textarea 
            placeholder="Tell us how we can help you..."
            required
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00ff8f]/50 transition-all text-gray-900 resize-none"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button 
            type="submit"
            className="bg-[#00a35e] hover:bg-[#008f52] text-white px-8 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            Send Message <Send className="size-4 rotate-[-45deg]" />
          </button>
        </div>
      </form>
    </div>
  );
}
