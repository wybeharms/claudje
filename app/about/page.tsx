import type { Metadata } from "next";
import AboutPageContent from "@/components/landing/AboutPageContent";

export const metadata: Metadata = {
  title: "About claudje — AI-Powered Competitor Intelligence",
  description:
    "claudje is an AI-powered competitor intelligence service for SMBs, founded by Berend Harms. We deploy specialized AI agents to monitor your competitors' pricing, reviews, and web activity.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About claudje — AI-Powered Competitor Intelligence",
    description:
      "Meet the team behind claudje. AI-powered competitor monitoring for small and medium businesses.",
    url: "https://claudje.com/about",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
