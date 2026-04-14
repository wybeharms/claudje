"use client";

import type { ReactNode } from "react";

/* ── Shared paper wrapper ─────────────────────────────────── */

export function Paper({
  eyebrow,
  title,
  subtitle,
  insight,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  insight?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border-warm bg-white px-6 py-7 shadow-sm md:px-10 md:py-9">
      <div className="flex flex-col gap-1 border-b border-border-warm/60 pb-5 md:flex-row md:items-end md:justify-between md:gap-6">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-dark">
            {eyebrow}
          </p>
          <h3 className="mt-2 font-heading text-xl text-brown md:text-2xl">
            {title}
          </h3>
        </div>
        {subtitle && (
          <p className="text-xs text-text-muted md:text-right">{subtitle}</p>
        )}
      </div>
      <div className="mt-6">{children}</div>
      {insight && (
        <p className="mt-6 border-t border-border-warm/60 pt-5 text-xs leading-relaxed text-text-muted">
          <span className="mr-1 font-semibold text-gold-dark">
            Key insight&nbsp;&middot;
          </span>
          {insight}
        </p>
      )}
    </div>
  );
}

/* ── Pricing fragment ─────────────────────────────────────── */

export function PricingFragment() {
  const rows = [
    { name: "You", price: "\u20AC409", change: "\u2014", you: true },
    { name: "Competitor 01", price: "\u20AC420", change: "+12.5%", up: true },
    { name: "Competitor 02", price: "\u20AC445", change: "+6.5%", up: true },
    { name: "Competitor 03", price: "\u20AC465", change: "\u2014" },
    { name: "Competitor 04", price: "\u20AC512", change: "+2.1%", up: true },
  ];
  return (
    <Paper
      eyebrow="Pricing snapshot · week 16"
      title="A-segment entry prices"
      subtitle="Tracked weekly across 10 competitors"
      insight="Two competitors raised prices this fortnight — you are now the cheapest in the A-segment."
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            <th className="pb-3 text-left">Competitor</th>
            <th className="pb-3 text-right">Entry / mo</th>
            <th className="pb-3 text-right">&Delta; (2w)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.name}
              className={`border-t border-border-warm/60 ${
                r.you ? "bg-gold/[0.06]" : ""
              }`}
            >
              <td
                className={`py-3.5 ${
                  r.you ? "font-semibold text-brown" : "text-text-primary"
                }`}
              >
                {r.name}
              </td>
              <td
                className={`py-3.5 text-right tabular-nums ${
                  r.you ? "font-semibold text-brown" : "text-text-primary"
                }`}
              >
                {r.price}
              </td>
              <td
                className={`py-3.5 text-right text-xs tabular-nums ${
                  r.up ? "text-red-600" : "text-text-muted/60"
                }`}
              >
                {r.change}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Paper>
  );
}

/* ── Reviews fragment ─────────────────────────────────────── */

export function ReviewsFragment() {
  const competitors: {
    name: string;
    google: number;
    trustpilot: number | null;
    pain: string;
  }[] = [
    { name: "Competitor 01", google: 4.1, trustpilot: 3.3, pain: "Hidden end-of-contract costs" },
    { name: "Competitor 02", google: 4.7, trustpilot: null, pain: "High repair fees for minor damage" },
    { name: "Competitor 03", google: 3.9, trustpilot: null, pain: "Disputed deposit withholdings" },
    { name: "Competitor 04", google: 1.8, trustpilot: null, pain: "Unreachable after sign-up" },
  ];
  return (
    <Paper
      eyebrow="Review tracking · week 16"
      title="Where competitors lose trust"
      subtitle="2,344 reviews scanned across Google & Trustpilot"
      insight="End-of-contract surprises are the #1 complaint in your sector — a transparency page would differentiate you immediately."
    >
      <div>
        {competitors.map((c, i) => (
          <div
            key={c.name}
            className={`flex items-start gap-4 py-3.5 ${
              i === 0 ? "" : "border-t border-border-warm/60"
            }`}
          >
            <div className="flex-1">
              <p className="text-sm font-semibold text-brown">{c.name}</p>
              <p className="mt-1 text-xs italic leading-relaxed text-text-muted">
                &ldquo;{c.pain}&rdquo;
              </p>
            </div>
            <div className="flex shrink-0 items-start gap-4">
              <ScoreBadge label="Google" value={c.google} />
              {c.trustpilot != null && (
                <ScoreBadge label="Trustpilot" value={c.trustpilot} />
              )}
            </div>
          </div>
        ))}
      </div>
    </Paper>
  );
}

function ScoreBadge({ label, value }: { label: string; value: number }) {
  const color =
    value >= 4
      ? "text-green-700"
      : value >= 3
        ? "text-amber-600"
        : "text-red-600";
  return (
    <div className="text-right">
      <p className="text-[9px] font-semibold uppercase tracking-wider text-text-muted/70">
        {label}
      </p>
      <p className={`text-sm font-semibold tabular-nums ${color}`}>
        {value.toFixed(1)}
      </p>
    </div>
  );
}

/* ── Advertising fragment ─────────────────────────────────── */

export function AdsFragment() {
  const bars: { name: string; count: number; highlight?: boolean; you?: boolean }[] = [
    { name: "Competitor 01", count: 26, highlight: true },
    { name: "Competitor 02", count: 12 },
    { name: "Competitor 03", count: 9 },
    { name: "You", count: 0, you: true },
    { name: "Competitor 04", count: 0 },
    { name: "Competitor 05", count: 0 },
    { name: "Competitor 06", count: 0 },
  ];
  const max = Math.max(...bars.map((b) => b.count), 1);
  return (
    <Paper
      eyebrow="Ad activity · Meta Ad Library"
      title="Who's buying attention"
      subtitle="Active ad count per competitor, last 7 days"
      insight="7 of 10 competitors run zero paid ads. The field is nearly empty — each euro of your ad-spend stretches exceptionally far."
    >
      <div className="space-y-2.5">
        {bars.map((b) => {
          const pct = (b.count / max) * 100;
          return (
            <div key={b.name} className="flex items-center gap-3">
              <p
                className={`w-24 shrink-0 text-xs ${
                  b.you ? "font-semibold text-brown" : "text-text-muted"
                }`}
              >
                {b.name}
              </p>
              <div className="relative flex-1">
                <div className="h-6 w-full rounded-sm bg-cream/60" />
                {b.count > 0 && (
                  <div
                    className={`absolute inset-y-0 left-0 rounded-sm ${
                      b.highlight ? "bg-gold" : "bg-brown/60"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                )}
              </div>
              <p
                className={`w-8 shrink-0 text-right text-sm tabular-nums ${
                  b.you ? "font-semibold text-brown" : "text-text-primary"
                }`}
              >
                {b.count}
              </p>
            </div>
          );
        })}
      </div>
    </Paper>
  );
}

/* ── AI visibility fragment ───────────────────────────────── */

export function AIFragment() {
  const ranks = [
    { name: "Competitor 01", score: 40 },
    { name: "You", score: 36, you: true },
    { name: "Competitor 02", score: 31 },
    { name: "Competitor 03", score: 16 },
    { name: "Competitor 04", score: 7 },
  ];
  return (
    <Paper
      eyebrow="AI visibility · GEO score"
      title="Who ChatGPT recommends"
      subtitle="Mention rate across 12 AI-search queries"
      insight="You rank #2 in your market on AI search — one technical change (an llms.txt file) could put you at #1."
    >
      <div className="space-y-2">
        {ranks.map((r, i) => (
          <div
            key={r.name}
            className={`flex items-center gap-4 rounded-md px-4 py-3 ${
              r.you ? "bg-gold/[0.08]" : i === 0 ? "bg-cream/50" : ""
            }`}
          >
            <span
              className={`w-5 shrink-0 text-sm font-bold tabular-nums ${
                r.you ? "text-brown" : "text-text-muted"
              }`}
            >
              {i + 1}
            </span>
            <p
              className={`flex-1 text-sm ${
                r.you ? "font-semibold text-brown" : "text-text-primary"
              }`}
            >
              {r.name}
            </p>
            <div className="flex shrink-0 items-center gap-3">
              <div className="relative h-1.5 w-20 overflow-hidden rounded-full bg-cream md:w-28">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full ${
                    r.you ? "bg-gold" : "bg-brown/60"
                  }`}
                  style={{ width: `${r.score * 2}%` }}
                />
              </div>
              <span
                className={`w-10 text-right text-sm font-semibold tabular-nums ${
                  r.you ? "text-brown" : "text-text-primary"
                }`}
              >
                {r.score}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Paper>
  );
}

/* ── Recommendations fragment ─────────────────────────────── */

export function RecommendationsFragment() {
  const actions: { kind: string; kindColor: string; title: string; body: string }[] = [
    {
      kind: "Quick win",
      kindColor: "bg-green-100 text-green-800",
      title: "Launch a Meta ad on your entry price",
      body: "Your A-segment is now the cheapest in the market. A single campaign targeting that gap costs under \u20AC200/week and capitalizes on Competitor 01's recent price hike.",
    },
    {
      kind: "Strategic",
      kindColor: "bg-brown/10 text-brown",
      title: "Publish an end-of-contract transparency page",
      body: "The #1 complaint across 4 competitors is end-of-contract surprises. One FAQ page on depots, inspections and final pricing would target the biggest trust gap in your sector.",
    },
  ];
  return (
    <Paper
      eyebrow="Recommended actions · week 16"
      title="What to do this week"
      subtitle="Drawn from the findings above, ranked by impact"
      insight="Every report closes with 2–4 concrete actions, prioritized by cost and timing."
    >
      <div className="space-y-4">
        {actions.map((a) => (
          <div
            key={a.title}
            className="rounded-lg border border-border-warm bg-cream/30 p-5"
          >
            <span
              className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${a.kindColor}`}
            >
              {a.kind}
            </span>
            <h4 className="mt-3 font-heading text-base text-brown md:text-lg">
              {a.title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-text-muted">
              {a.body}
            </p>
          </div>
        ))}
      </div>
    </Paper>
  );
}

/* ── Tab icons (exported for nav use) ─────────────────────── */

export function PricingIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.82l.88.66c1.17.88 3.07.88 4.24 0 1.17-.88 1.17-2.3 0-3.18C13.54 12.22 12.77 12 12 12c-.73 0-1.45-.22-2-.66-1.1-.88-1.1-2.3 0-3.18s2.9-.88 4 0l.42.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
export function ReviewsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.5a.56.56 0 011.04 0l2.13 5.11a.56.56 0 00.47.35l5.52.44a.56.56 0 01.32.99l-4.2 3.6a.56.56 0 00-.18.56l1.28 5.39a.56.56 0 01-.84.6l-4.72-2.88a.56.56 0 00-.59 0L6.98 20.54a.56.56 0 01-.84-.6l1.28-5.4a.56.56 0 00-.18-.55l-4.2-3.6a.56.56 0 01.32-.99l5.52-.44a.56.56 0 00.47-.35L11.48 3.5z" />
    </svg>
  );
}
export function AdsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.31 4.31a11.95 11.95 0 015.81-5.52l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
    </svg>
  );
}
export function AIIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.81 15.9L9 18.75l-.81-2.85a4.5 4.5 0 00-3.09-3.09L2.25 12l2.85-.81a4.5 4.5 0 003.09-3.09L9 5.25l.81 2.85a4.5 4.5 0 003.09 3.09L15.75 12l-2.85.81a4.5 4.5 0 00-3.09 3.09zM18.26 8.72L18 9.75l-.26-1.04a3.38 3.38 0 00-2.46-2.45L14.25 6l1.04-.26a3.38 3.38 0 002.46-2.45L18 2.25l.26 1.04a3.38 3.38 0 002.46 2.45L21.75 6l-1.04.26a3.38 3.38 0 00-2.46 2.45z" />
    </svg>
  );
}
export function LightningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}
