import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/data/memories";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#070709",
};

export const metadata: Metadata = {
  title: `${SITE_CONFIG.partnerName} 18 — The Dance Archive // Exclusive Edition`,
  description: `Špeciálny digitálny archív k 18. narodeninám pre moju najlepšiu tanečnú partnerku ${SITE_CONFIG.partnerName}. 3 roky spoločných momentov na parkete.`,
  openGraph: {
    title: `${SITE_CONFIG.partnerName} 18 — The Dance Archive`,
    description: `3 roky spoločného tanca, momentov a oslava 18. narodenín.`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sk"
      className={`${playfair.variable} ${plusJakarta.variable} ${caveat.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#070709] text-[#f3f3f5] font-sans antialiased selection:bg-[#d4af37]/30 selection:text-[#f8ecd5] overflow-x-hidden">
        {/* Ambient subtle editorial glow */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-700/5 to-transparent blur-[120px] rounded-full opacity-60" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[500px] bg-gradient-to-t from-rose-900/10 via-amber-900/5 to-transparent blur-[140px] rounded-full opacity-50" />
        </div>
        
        {/* Main Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
