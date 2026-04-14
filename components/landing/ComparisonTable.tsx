"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

type Row = {
  feature: string;
  chatbot: string;
  claudje: string;
  Icon: ComponentType<{ className?: string }>;
  tint: string;
};

const rows: Row[] = [
  {
    feature: "Data freshness",
    chatbot: "Stale \u2014 months old at best",
    claudje: "Refreshed every week",
    Icon: ClockIcon,
    tint: "bg-blue-50 text-blue-700",
  },
  {
    feature: "Sources",
    chatbot: "Public web search",
    claudje: "KvK, Trustpilot, Meta Ads, Firecrawl",
    Icon: DatabaseIcon,
    tint: "bg-indigo-50 text-indigo-700",
  },
  {
    feature: "Verification",
    chatbot: "None \u2014 will hallucinate",
    claudje: "Reviewed by a human analyst",
    Icon: ShieldIcon,
    tint: "bg-emerald-50 text-emerald-700",
  },
  {
    feature: "Pricing data",
    chatbot: "Guessed from memory",
    claudje: "Live-scraped from source",
    Icon: TagIcon,
    tint: "bg-amber-50 text-amber-700",
  },
  {
    feature: "Tracking",
    chatbot: "One-off answer",
    claudje: "Continuous, week-over-week",
    Icon: TrendIcon,
    tint: "bg-rose-50 text-rose-700",
  },
  {
    feature: "Competitor count",
    chatbot: "One at a time",
    claudje: "Up to 15 in parallel",
    Icon: UsersIcon,
    tint: "bg-purple-50 text-purple-700",
  },
  {
    feature: "Delivery",
    chatbot: "You have to ask",
    claudje: "Lands in your inbox",
    Icon: InboxIcon,
    tint: "bg-teal-50 text-teal-700",
  },
];

export default function ComparisonTable() {
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
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-cream-dark px-6 py-20 lg:px-8">
      <div ref={ref} className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-dark">
            Why Claudje
          </p>
          <h2 className="mt-3 font-heading text-2xl md:text-3xl">
            Why Not Just Use ChatGPT?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-text-muted md:text-sm">
            Claudje uses the same foundation models &mdash; but wraps them in
            managed agents, paid data tools, and a human review. Here&apos;s
            what that changes in practice.
          </p>
        </div>

        <div
          className={`mt-10 overflow-hidden rounded-2xl border border-border-warm bg-white shadow-sm transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {/* Header bar */}
          <div className="grid grid-cols-[1.3fr_1fr_1fr] items-center gap-3 bg-brown px-4 py-3.5 text-text-on-dark md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-on-dark-muted">
              Capability
            </p>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-on-dark-muted">
              ChatGPT alone
            </p>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold">
              Claudje
            </p>
          </div>

          {/* Rows */}
          <div>
            {rows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-[1.3fr_1fr_1fr] items-center gap-3 border-t border-border-warm/60 px-4 py-3 transition-colors md:grid-cols-[1.4fr_1fr_1fr] md:px-8 ${
                  i % 2 === 0 ? "bg-white" : "bg-cream/25"
                } hover:bg-gold/[0.04]`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${row.tint}`}
                  >
                    <row.Icon className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-xs font-semibold text-brown">
                    {row.feature}
                  </p>
                </div>
                <div className="flex items-start gap-1.5 text-xs text-text-muted">
                  <XIcon className="mt-0.5 h-3 w-3 shrink-0 text-red-400" />
                  <span className="leading-snug">{row.chatbot}</span>
                </div>
                <div className="flex items-start gap-1.5 text-xs text-brown">
                  <CheckIcon className="mt-0.5 h-3 w-3 shrink-0 text-gold" />
                  <span className="font-medium leading-snug">
                    {row.claudje}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] italic text-text-muted">
          Same models, different job. ChatGPT answers questions. Claudje runs
          your intelligence.
        </p>
      </div>
    </section>
  );
}

/* ── Icons ──────────────────────────────────────────────── */

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m5-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function DatabaseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path strokeLinecap="round" d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
    </svg>
  );
}
function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9V5.3l9-3 9 3V12z" />
    </svg>
  );
}
function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318a2.25 2.25 0 00.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.1 18.1 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  );
}
function TrendIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.31 4.31a11.95 11.95 0 015.81-5.52l2.74-1.22" />
    </svg>
  );
}
function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.3 12.3 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}
function InboxIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338A2.25 2.25 0 0017.088 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z" />
    </svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
