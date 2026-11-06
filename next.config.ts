import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
      {
        protocol: "https",
        hostname: "a-ipower.com",
      },
      {
        protocol: "https",
        hostname: "pilottools.in",
      },
      {
        protocol: "https",
        hostname: "rjenterprisessales.com",
      },
      {
        protocol: "https",
        hostname: "bepowerequipment.com",
      },
      {
        protocol: "https",
        hostname: "kumhwujuaruvuwkkirml.supabase.co",
      },
    ],
  },
};

export default nextConfig;
