import { TeamClient, TeamMember } from "./TeamClient";

/**
 * Static team members data
 */
const teamMembers: TeamMember[] = [
  {
    id: "liam",
    name: "Liam K.",
    role: "Blockchain Architect",
    img: "https://i.pravatar.cc/600?img=11",
    quote:
      "Architecture is about creating systems that scale. In blockchain, we're not just building for today—we're building for millions of users who haven't arrived yet.",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    id: "sofia",
    name: "Sofia M.",
    role: "Product Manager",
    img: "https://i.pravatar.cc/600?img=5",
    quote:
      "Great products emerge from understanding both technology and people. Our goal is to make blockchain accessible to everyone, not just developers.",
    socials: { twitter: "#", linkedin: "#" },
  },
  {
    id: "elena",
    name: "Elena R.",
    role: "Marketing Head",
    img: "https://i.pravatar.cc/600?img=9",
    quote:
      "Blockchain isn't just technology—it's a movement. Our job is to tell the story of decentralization in a way that resonates with everyone.",
    socials: { twitter: "#", linkedin: "#" },
  },
  {
    id: "james",
    name: "James T.",
    role: "Security Operations",
    img: "https://i.pravatar.cc/600?img=12",
    quote:
      "Security isn't an afterthought—it's the foundation. Every smart contract we deploy is battle-tested to protect our users' assets.",
    socials: { twitter: "#", github: "#" },
  },
  {
    id: "aiden",
    name: "Aiden Cross",
    role: "Technical Lead",
    img: "https://i.pravatar.cc/600?img=68",
    quote:
      "We are building the infrastructure for a decentralized future. Every line of code contributes to a more transparent, secure, and equitable digital world. Our mission is to empower developers to create what hasn't been imagined yet.",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
];

/**
 * Team Component (Server)
 *
 * Passes static data to client for interactive spotlight.
 */
export function Team() {
  return <TeamClient members={teamMembers} />;
}
