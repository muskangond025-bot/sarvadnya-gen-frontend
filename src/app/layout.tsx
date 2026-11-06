import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/shared";
import { Chatbot, FooterClient, GlobalLoader, AgentationToolbar } from "@/components/shared/client";
import { FullscreenProvider } from "@/lib/FullscreenContext";
import { AuthProvider } from "@/lib/AuthContext";
import { LanguageProvider } from "@/lib/LanguageContext";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Generator Rental in Nashik | Silent Generators 5–250 kVA | Sarvadnya",
  description:
    "Specialized silent generator rental solutions for weddings, grand events, and industrial projects across Nashik and Maharashtra. Reliable, efficient power from 5 kVA to 250 kVA.",
  keywords: [
    "generator rental nashik",
    "silent generator hire nashik",
    "wedding generator rental maharashtra",
    "industrial generator rental nashik",
    "event power rental nashik",
    "Sarvadnya Generators",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body
        className={`${manrope.className} antialiased bg-[#FAF8F5] text-[#1F1F1E] overflow-x-hidden selection:bg-[#FF5500]/20 selection:text-[#1F1F1E]`}
      >
        <AuthProvider>
          <LanguageProvider>
            <GlobalLoader />
            <FullscreenProvider>
              <Header />
              <main className="overflow-x-hidden min-h-screen">{children}</main>
              <Chatbot />
              <FooterClient>
                <Footer />
              </FooterClient>
              <AgentationToolbar />
            </FullscreenProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
