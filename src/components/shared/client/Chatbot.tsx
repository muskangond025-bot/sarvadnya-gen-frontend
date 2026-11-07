"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageCircle, 
  X, 
  Send, 
  Zap, 
  Phone, 
  FileText, 
  ChevronRight,
  Headphones,
  User,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "bot" | "user";
  text: string;
  options?: string[];
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  id: "1",
  type: "bot",
  text: "Hello! Welcome to Sarvadnya Generators. How can I assist you with your power needs today?",
  options: ["Rent a Generator", "kVA Requirement Help", "Technical Support", "Rental Pricing"],
  timestamp: new Date(),
};

/**
 * Premium Chatbot Component
 * 
 * Features:
 * - Floating trigger with emerald glow
 * - Glassmorphism chat window
 * - Interactive rule-based conversation flow
 * - Seamless Framer Motion animations
 */
export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleOptionClick = (option: string) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      text: option,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);

    // Simulate Bot Response
    setTimeout(() => {
      let botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: "",
        timestamp: new Date(),
      };

      switch (option) {
        case "Rent a Generator":
          botResponse.text = "Great! We have a fleet from 5kVA to 250kVA. How would you like to proceed?";
          botResponse.options = ["Check Availability", "View Fleet", "Talk to Sales"];
          break;
        case "Check Availability":
          botResponse.text = "I can check that for you! Which capacity are you looking for?";
          botResponse.options = ["5-25 kVA", "65-125 kVA", "250 kVA"];
          break;
        case "5-25 kVA":
        case "65-125 kVA":
        case "250 kVA":
          botResponse.text = `Checking real-time slots for ${option} generators in Nashik...`;
          setTimeout(() => {
            const confirmedMsg: Message = {
              id: (Date.now() + 2).toString(),
              type: "bot",
              text: `✅ Good news! We have 3 units available in the ${option} range for your requested dates. Would you like to reserve a slot?`,
              options: ["Reserve Now", "Main Menu"],
              timestamp: new Date(),
            };
            setMessages(prev => [...prev, confirmedMsg]);
          }, 1500);
          return;
        case "Reserve Now":
          botResponse.text = "Perfect. I'm redirecting you to our secure booking portal. You can also call us directly to finalize the details.";
          botResponse.options = ["Call +91 62626 29944", "Main Menu"];
          break;
        case "kVA Requirement Help":
          botResponse.text = "To recommend the right generator, could you tell me what you'll be powering? (e.g., Office, Construction site, Event)";
          botResponse.options = ["Construction", "Corporate Office", "Wedding/Event", "Residential"];
          break;
        case "Technical Support":
          botResponse.text = "Our technicians are available 24/7. For immediate on-site assistance, please call Tanmay Avhad directly at +91 62626 29944.";
          botResponse.options = ["Call Support Now", "Submit Ticket"];
          break;
        case "Rental Pricing":
          botResponse.text = "Pricing depends on the kVA capacity and rental duration. Generally, we offer Daily, Weekly, and Monthly plans. Would you like a custom quote?";
          botResponse.options = ["Get Custom Quote", "Price List"];
          break;
        default:
          botResponse.text = "I've noted that. One of our experts will get back to you shortly. Can I help with anything else?";
          botResponse.options = ["Main Menu"];
      }

      if (option === "Main Menu") {
        setMessages(prev => [...prev, INITIAL_MESSAGE]);
      } else {
        setMessages(prev => [...prev, botResponse]);
      }
    }, 800);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");

    // Generic Bot Response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: "Thank you for the information. Our team is processing your request and will contact you via mobile shortly.",
        options: ["Main Menu"],
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end gap-3 sm:gap-4">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[calc(100vw-2rem)] sm:w-[400px] max-h-[80vh] h-[480px] bg-[#161616] border border-white/10 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-6 bg-linear-to-r from-[#00ff8f]/20 to-transparent border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="size-10 rounded-full bg-black border border-[#00ff8f]/30 flex items-center justify-center text-[#00ff8f]">
                    <Zap size={20} />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 size-3 bg-[#00ff8f] rounded-full border-2 border-[#161616] animate-pulse" />
                </div>
                <div>
                  <h4 className="text-white font-bold font-['Poppins',sans-serif] text-sm leading-none mb-1">Power Assistant</h4>
                  <p className="text-[10px] text-[#00ff8f] font-bold uppercase tracking-widest">Online | Ready to Help</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="size-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={cn(
                    "flex flex-col gap-2",
                    msg.type === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "max-w-[85%] p-4 rounded-2xl text-sm font-['Outfit',sans-serif] leading-relaxed shadow-lg",
                    msg.type === "user" 
                      ? "bg-[#00ff8f] text-black font-bold rounded-tr-none" 
                      : "bg-white/5 text-white border border-white/10 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>

                  {msg.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {msg.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleOptionClick(opt)}
                          className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-[11px] font-bold hover:bg-[#00ff8f] hover:text-black hover:border-[#00ff8f] transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                  <span className="text-[9px] text-white/20 uppercase tracking-widest font-bold px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSendMessage}
              className="p-4 bg-black/40 border-t border-white/10 flex items-center gap-2"
            >
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me something..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#00ff8f]/50 transition-all placeholder:text-white/20"
              />
              <button 
                type="submit"
                className="size-11 rounded-xl bg-[#00ff8f] flex items-center justify-center text-black hover:bg-[#00e67a] active:scale-95 transition-all shadow-[0_0_15px_rgba(0,255,143,0.3)]"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "size-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group relative",
          isOpen 
            ? "bg-white/10 text-white border border-white/20" 
            : "bg-[#00ff8f] text-black shadow-[0_0_20px_rgba(0,255,143,0.3)]"
        )}
      >
        {!isOpen && (
          <div className="absolute inset-0 rounded-full border-2 border-[#00ff8f] animate-ping opacity-40" />
        )}
        {isOpen ? <X size={24} /> : <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />}
      </button>

    </div>
  );
}
