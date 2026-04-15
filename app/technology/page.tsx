import type { Metadata } from "next";
import TechnologyPageContent from "@/components/landing/TechnologyPageContent";

export const metadata: Metadata = {
  title: "Technology — How claudje's AI Agents Work",
  description:
    "claudje deploys 8 specialized AI agents that research your competitors across paid data sources. Every report is reviewed by a human analyst before delivery.",
  alternates: { canonical: "/technology" },
  openGraph: {
    title: "Technology — How claudje's AI Agents Work",
    description:
      "Managed AI agents that scout the internet, connect to paid data sources, and deliver analyst-reviewed competitor reports.",
    url: "https://claudje.com/technology",
  },
};

export default function TechnologyPage() {
  return <TechnologyPageContent />;
}
