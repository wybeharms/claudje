"use client";

import { useEffect, useRef, useState } from "react";
import ClaudjeBird from "../portal/ClaudjeBird";

/**
 * Horizontal architecture flow:
 * [Competitor Names] → [claudje Agent] → fan-out to [Data Sources] + [Web + AI] → fan-in → [Report] → [Human Review] →
 *
 * Desktop: horizontal. Mobile: vertical stack.
 */
export default function AgentArchitecture() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cardBase =
    "rounded-xl border px-4 py-3 text-center transition-all duration-600";
  const cardNormal = `${cardBase} border-border-warm bg-white`;
  const cardGold = `${cardBase} border-gold bg-gold/5 shadow-sm shadow-gold/10`;
  const cardSource = `${cardBase} border-border-warm bg-cream-darker/60`;

  const arrow = (
    <div className="flex items-center justify-center">
      {/* Desktop horizontal arrow */}
      <div className="hidden md:flex items-center">
        <div className="h-px w-6 bg-gold/40" />
        <svg className="h-3 w-3 -ml-px text-gold/60" fill="currentColor" viewBox="0 0 12 12">
          <path d="M3 1l5 5-5 5V1z" />
        </svg>
      </div>
      {/* Mobile vertical arrow */}
      <div className="flex flex-col items-center md:hidden">
        <div className="h-5 w-px bg-gold/40" />
        <svg className="h-3 w-3 -mt-px text-gold/60" fill="currentColor" viewBox="0 0 12 12">
          <path d="M6 9L1 4h10L6 9z" />
        </svg>
      </div>
    </div>
  );

  return (
    <section className="bg-cream px-6 py-20 lg:px-8">
      <div ref={ref} className="mx-auto max-w-5xl">
        <h2 className="text-center font-heading text-2xl md:text-3xl">
          From Competitors to Report
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-text-muted md:text-base">
          One pipeline. Fully automated, with a human check before anything
          reaches your inbox.
        </p>

        {/* Desktop: horizontal flow */}
        <div
          className={`mt-12 hidden md:flex md:items-center md:justify-center md:gap-2 transition-all duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Competitor Names */}
          <div className={cardNormal} style={{ transitionDelay: "0ms" }}>
            <svg className="mx-auto h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            <p className="mt-1 text-xs font-semibold text-text-primary">Competitors</p>
            <p className="text-[10px] text-text-muted">Your list</p>
          </div>

          {arrow}

          {/* claudje Agent */}
          <div className={cardGold} style={{ transitionDelay: "100ms" }}>
            <ClaudjeBird size={20} className="mx-auto" />
            <p className="mt-1 text-xs font-semibold text-gold-dark">claudje Agent</p>
            <p className="text-[10px] text-text-muted">Scouts the internet</p>
          </div>

          {arrow}

          {/* Fan-out: Data Sources + Web */}
          <div className="flex flex-col gap-2" style={{ transitionDelay: "200ms" }}>
            <div className={cardSource}>
              <p className="text-xs font-semibold text-text-primary">Data Sources</p>
              <p className="text-[10px] text-text-muted">Paid professional tools</p>
            </div>
            <div className={cardSource}>
              <p className="text-xs font-semibold text-text-primary">Web + AI</p>
              <p className="text-[10px] text-text-muted">Public data analysis</p>
            </div>
          </div>

          {arrow}

          {/* Report */}
          <div className={cardNormal} style={{ transitionDelay: "300ms" }}>
            <svg className="mx-auto h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <p className="mt-1 text-xs font-semibold text-text-primary">Report</p>
            <p className="text-[10px] text-text-muted">AI synthesizes</p>
          </div>

          {arrow}

          {/* Human Review */}
          <div className={cardGold} style={{ transitionDelay: "400ms" }}>
            <svg className="mx-auto h-5 w-5 text-gold-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            <p className="mt-1 text-xs font-semibold text-gold-dark">Human Review</p>
            <p className="text-[10px] text-text-muted">Analyst verifies</p>
          </div>

          {arrow}

          {/* Final Report — delivered */}
          <div className={cardGold} style={{ transitionDelay: "500ms" }}>
            <svg className="mx-auto h-5 w-5 text-gold-dark" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <p className="mt-1 text-xs font-semibold text-gold-dark">Final Report</p>
            <p className="text-[10px] text-text-muted">In your inbox</p>
          </div>
        </div>

        {/* Mobile: vertical flow */}
        <div
          className={`mt-10 flex flex-col items-center gap-1 md:hidden transition-all duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className={cardNormal}>
            <p className="text-xs font-semibold">Competitors</p>
            <p className="text-[10px] text-text-muted">Your list</p>
          </div>
          {arrow}
          <div className={cardGold}>
            <ClaudjeBird size={18} className="mx-auto" />
            <p className="mt-1 text-xs font-semibold text-gold-dark">claudje Agent</p>
          </div>
          {arrow}
          <div className="flex gap-2">
            <div className={cardSource}>
              <p className="text-[11px] font-semibold">Data Sources</p>
            </div>
            <div className={cardSource}>
              <p className="text-[11px] font-semibold">Web + AI</p>
            </div>
          </div>
          {arrow}
          <div className={cardNormal}>
            <p className="text-xs font-semibold">Report Synthesis</p>
          </div>
          {arrow}
          <div className={cardGold}>
            <p className="text-xs font-semibold text-gold-dark">Human Review</p>
          </div>
          {arrow}
          <div className={cardGold}>
            <p className="text-xs font-semibold text-gold-dark">Final Report</p>
            <p className="text-[10px] text-text-muted">In your inbox</p>
          </div>
        </div>
      </div>
    </section>
  );
}
