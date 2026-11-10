import type { Metadata } from "next";
import { Outfit, Dancing_Script, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
});

const dancingScript = Dancing_Script({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-dancing-script",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  title: "NutriAvocado — Marta Kowalska, dietetyczka kliniczna",
  description: "Certyfikowana dietetyczka kliniczna. Indywidualne plany żywienia, konsultacje i przepisy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className={`${outfit.variable} ${dancingScript.variable} ${dmSerif.variable}`}>
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}