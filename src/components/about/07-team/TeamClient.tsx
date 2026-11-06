"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Twitter, Linkedin, Github } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  img: string;
  quote: string;
  socials: { twitter?: string; linkedin?: string; github?: string };
}

interface TeamClientProps {
  members: TeamMember[];
}

/**
 * TeamClient Component
 *
 * Interactive team spotlight with Framer Motion transitions.
 */
export function TeamClient({ members }: TeamClientProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember>(
    members[members.length - 1]
  );

  return (
    <section className="w-full py-[100px] flex flex-col items-center gap-8 px-32">
      {/* Spotlight Card */}
      <div className="w-full bg-neutral-900/20 h-[50vh] border border-white/5 rounded-[24px] overflow-hidden flex flex-col md:flex-row relative">
        <div className="w-full md:w-[40%] relative min-h-[400px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMember.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={selectedMember.img}
                alt={selectedMember.name}
                fill
                className="object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-linear-to-t from-black to-transparent opacity-80 z-10" />
        </div>

        <div className="w-full md:w-[60%] p-[60px] flex flex-col justify-center gap-[30px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMember.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-[30px]"
            >
              <div>
                <h3 className="text-white text-[40px] font-['Outfit',sans-serif] font-bold">
                  {selectedMember.name}
                </h3>
                <span className="text-[#00ff8f] text-[18px] uppercase tracking-widest font-medium">
                  {selectedMember.role}
                </span>
              </div>

              <p className="text-white/60 text-[16px] leading-[1.8] font-['Outfit',sans-serif]">
                "{selectedMember.quote}"
              </p>

              <div className="flex gap-4 mt-4">
                {selectedMember.socials.twitter && (
                  <SocialIcon name="twitter" />
                )}
                {selectedMember.socials.linkedin && (
                  <SocialIcon name="linkedin" />
                )}
                {selectedMember.socials.github && <SocialIcon name="github" />}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Team Grid */}
      <div className="w-full grid grid-cols-2 md:grid-cols-4 md:gap-10 gap-4">
        {members.slice(0, -1).map((member) => (
          <motion.div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            whileTap={{ scale: 0.98 }}
            className={`bg-[#111] border rounded-[12px] p-5 h-64 flex flex-col justify-between group transition-colors cursor-pointer ${
              selectedMember.id === member.id
                ? "border-[#00ff8f] bg-[#00ff8f]/5"
                : "border-white/5 hover:border-[#00ff8f]/50"
            }`}
          >
            <div className="flex justify-end">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/10">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <span
                className={`font-['Outfit',sans-serif] text-lg font-bold transition-colors ${
                  selectedMember.id === member.id
                    ? "text-[#00ff8f]"
                    : "text-white group-hover:text-[#00ff8f]"
                }`}
              >
                {member.name}
              </span>
              <span className="text-white/40 text-sm">{member.role}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function SocialIcon({ name }: { name: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    twitter: <Twitter size={18} />,
    linkedin: <Linkedin size={18} />,
    github: <Github size={18} />,
  };

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="w-[40px] h-[40px] rounded-full border border-white/10 flex items-center justify-center hover:bg-[#00ff8f] hover:border-[#00ff8f] hover:text-black text-white transition-colors cursor-pointer"
    >
      {iconMap[name] || (
        <span className="capitalize text-[10px]">{name[0]}</span>
      )}
    </motion.div>
  );
}

export type { TeamMember };
