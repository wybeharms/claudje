import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import AgentArchitecture from "@/components/landing/AgentArchitecture";
import AgentRoster from "@/components/landing/AgentRoster";

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
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-brown px-6 py-16 text-text-on-dark lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl font-light tracking-tight md:text-4xl">
            How Your Agents Work
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-on-dark-muted md:text-base">
            Behind every report is a team of specialized AI agents. Each one
            trained for a specific research task. Supervised by a human analyst.
          </p>
        </div>
      </section>

      {/* Architecture flow */}
      <AgentArchitecture />

      {/* Agent roster */}
      <AgentRoster />

      {/* Human in the loop */}
      <section className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15">
            <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <h2 className="mt-5 font-heading text-2xl md:text-3xl">
            AI Does the Heavy Lifting. Humans Ensure Quality.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-muted md:text-base">
            Every report passes through a human analyst before it reaches your
            inbox. They verify accuracy, add context, and highlight what matters
            most for your specific business.
          </p>
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3">
            <div className="flex-1 rounded-lg border border-border-warm bg-white px-3 py-2 text-center">
              <p className="text-xs font-semibold text-text-primary">AI generates</p>
              <p className="mt-0.5 text-[10px] text-text-muted">Data + narrative</p>
            </div>
            <svg className="h-4 w-4 shrink-0 text-gold/60" fill="currentColor" viewBox="0 0 12 12">
              <path d="M3 1l5 5-5 5V1z" />
            </svg>
            <div className="flex-1 rounded-lg border-2 border-gold bg-white px-3 py-2 text-center shadow-sm">
              <p className="text-xs font-semibold text-gold-dark">Analyst reviews</p>
              <p className="mt-0.5 text-[10px] text-text-muted">Verify + refine</p>
            </div>
            <svg className="h-4 w-4 shrink-0 text-gold/60" fill="currentColor" viewBox="0 0 12 12">
              <path d="M3 1l5 5-5 5V1z" />
            </svg>
            <div className="flex-1 rounded-lg border border-border-warm bg-white px-3 py-2 text-center">
              <p className="text-xs font-semibold text-text-primary">You receive</p>
              <p className="mt-0.5 text-[10px] text-text-muted">Trusted report</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
