"use client";

import { useState, useEffect, useCallback } from "react";

/* ── Report page data ───────────────────────────────────── */

const pages = [
  {
    id: "cover",
    render: () => (
      <div className="flex h-full flex-col">
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="h-0.5 w-16 bg-gold" />
            <h3 className="mt-5 text-2xl font-extrabold uppercase tracking-wide text-brown">
              Market Report
            </h3>
            <p className="mt-1 text-sm text-gold-dark">
              Pricing Intelligence &amp; Competitor Analysis
            </p>
            <div className="mt-5 h-px w-full bg-gold/30" />
            <p className="mt-5 text-xs font-medium uppercase tracking-wider text-text-muted">
              Prepared for
            </p>
            <p className="mt-1 font-heading text-xl text-gold-dark">
              Your Company
            </p>
            <p className="mt-3 text-xs text-text-muted">
              March 2026 | Week 13
            </p>
            <p className="mt-1 text-xs text-text-muted">
              5 competitors analysed | 48 data points
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "metrics",
    render: () => (
      <div className="p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Summary
        </p>
        <div className="mt-3 h-px w-full bg-gold/30" />
        <h4 className="mt-4 text-sm font-bold text-brown">Key Figures</h4>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { value: "5", label: "Competitors" },
            { value: "48", label: "Data points" },
            { value: "12", label: "Price changes" },
            { value: "3rd", label: "Market position" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-md bg-cream-dark/80 px-3 py-2.5 text-center"
            >
              <p className="text-lg font-bold text-brown">{stat.value}</p>
              <p className="mt-0.5 text-[10px] text-text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <h4 className="mt-5 text-sm font-bold text-brown">Key Findings</h4>
        <ul className="mt-2 space-y-1.5">
          {[
            "Top competitor raised prices by 8%",
            "New entrant detected in your area",
          ].map((finding) => (
            <li
              key={finding}
              className="flex items-start gap-2 text-xs leading-relaxed text-text-muted"
            >
              <span className="mt-0.5 text-gold-dark">&#x2022;</span>
              {finding}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "pricing",
    render: () => (
      <div className="p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Pricing Intelligence
        </p>
        <div className="mt-3 h-px w-full bg-gold/30" />
        <table className="mt-4 w-full text-xs">
          <thead>
            <tr className="text-left text-text-muted">
              <th className="pb-2 font-medium">Competitor</th>
              <th className="pb-2 font-medium">Price</th>
              <th className="pb-2 font-medium">Change</th>
            </tr>
          </thead>
          <tbody className="text-brown">
            {[
              { name: "Competitor A", price: "€4.50", change: "+€0.30" },
              { name: "Competitor B", price: "€4.20", change: "" },
              { name: "Your Company", price: "€4.10", change: "" },
              { name: "Competitor C", price: "€3.95", change: "-€0.15" },
              { name: "Competitor D", price: "€3.80", change: "+€0.10" },
            ].map((row) => (
              <tr
                key={row.name}
                className={`border-t border-border-warm ${row.name === "Your Company" ? "font-semibold text-gold-dark" : ""}`}
              >
                <td className="py-1.5">{row.name}</td>
                <td className="py-1.5">{row.price}</td>
                <td className="py-1.5">
                  <span
                    className={
                      row.change.startsWith("+")
                        ? "text-green-600"
                        : row.change.startsWith("-")
                          ? "text-red-500"
                          : "text-text-muted"
                    }
                  >
                    {row.change || "\u2014"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: "activity",
    render: () => (
      <div className="p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Web &amp; Review Monitoring
        </p>
        <div className="mt-3 h-px w-full bg-gold/30" />
        <div className="mt-4 space-y-3">
          {[
            {
              icon: "globe",
              title: "Website Changes",
              detail: "Competitor A launched a new promotions page.",
            },
            {
              icon: "star",
              title: "Review Alerts",
              detail: "Competitor B dropped to 3.9 stars (slow service).",
            },
            {
              icon: "trend",
              title: "Search Trends",
              detail: "Competitor C brand searches up 22%.",
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-gold/15 text-gold-dark">
                {item.icon === "globe" && (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
                )}
                {item.icon === "star" && (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                )}
                {item.icon === "trend" && (
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-brown">{item.title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-text-muted">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

/* ── Arrow icon ──────────────────────────────────────────── */

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      {direction === "left" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      )}
    </svg>
  );
}

/* ── Carousel component ──────────────────────────────────── */

export default function ReportCarousel() {
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState<number | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  const flip = useCallback(
    (target: number, dir: "next" | "prev") => {
      if (flipping || target === current) return;
      setNext(target);
      setFlipDirection(dir);
      setFlipping(true);
      setTimeout(() => {
        setCurrent(target);
        setNext(null);
        setFlipping(false);
      }, 800);
    },
    [current, flipping]
  );

  const goNext = useCallback(() => {
    flip((current + 1) % pages.length, "next");
  }, [current, flip]);

  const goPrev = useCallback(() => {
    flip((current - 1 + pages.length) % pages.length, "prev");
  }, [current, flip]);

  const goTo = useCallback(
    (index: number) => {
      flip(index, index > current ? "next" : "prev");
    },
    [current, flip]
  );

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(goNext, 4000);
    return () => clearInterval(timer);
  }, [goNext]);

  const nextPage = next !== null ? pages[next] : null;

  return (
    <div className="flex flex-col items-center">
      {/* Card + arrows row */}
      <div className="flex items-center gap-3">
        {/* Left arrow */}
        <button
          onClick={goPrev}
          aria-label="Previous page"
          className="rounded-full p-2 text-text-on-dark-muted transition-colors hover:bg-white/10 hover:text-text-on-dark"
        >
          <ChevronIcon direction="left" />
        </button>

        {/* Report card with page-turn */}
        <div
          className="relative w-72 md:w-80"
          style={{ perspective: "1200px" }}
        >
          {/* Next page (revealed underneath) */}
          {flipping && nextPage && (
            <div className="absolute inset-0 rounded-xl border border-border-warm bg-cream shadow-xl shadow-black/20">
              <div className="h-[400px]">{nextPage.render()}</div>
            </div>
          )}

          {/* Current page (flips away) */}
          <div
            className="relative rounded-xl border border-border-warm bg-cream shadow-xl shadow-black/20"
            style={{
              transformOrigin: flipDirection === "next" ? "left center" : "right center",
              transition: flipping ? "transform 0.8s ease-in-out, opacity 0.8s ease-in-out" : "none",
              transform: flipping
                ? flipDirection === "next"
                  ? "rotateY(-90deg)"
                  : "rotateY(90deg)"
                : "rotateY(0deg)",
              opacity: flipping ? 0 : 1,
              zIndex: 2,
            }}
          >
            <div className="h-[400px]">{pages[current].render()}</div>
          </div>
        </div>

        {/* Right arrow */}
        <button
          onClick={goNext}
          aria-label="Next page"
          className="rounded-full p-2 text-text-on-dark-muted transition-colors hover:bg-white/10 hover:text-text-on-dark"
        >
          <ChevronIcon direction="right" />
        </button>
      </div>

      {/* Dots below */}
      <div className="mt-5 flex items-center gap-3">
        <div className="flex gap-1.5">
          {pages.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              aria-label={`Page ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === (next ?? current)
                  ? "w-6 bg-gold"
                  : "w-2 bg-text-on-dark-muted/40 hover:bg-text-on-dark-muted/60"
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] text-text-on-dark-muted">
          {(next ?? current) + 1}/{pages.length}
        </span>
      </div>
    </div>
  );
}
