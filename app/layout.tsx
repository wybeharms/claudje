import type { Metadata } from "next";
import { DM_Serif_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "claudje — Competitor Intelligence for SMBs",
  description:
    "claudje monitors your competitors' pricing, reviews, web activity, and public filings — and delivers a clear AI-generated report straight to your inbox.",
  openGraph: {
    title: "claudje — Competitor Intelligence for SMBs",
    description:
      "Know what your competitors are doing. Every week. AI-powered competitor monitoring starting at €60/mo.",
    type: "website",
    url: "https://claudje.com",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${jakarta.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
