"use client";

import { useEffect, useRef, useState } from "react";

const rows = [
  { feature: "Data freshness", chatbot: "Stale", claudje: "Weekly" },
  { feature: "Sources", chatbot: "Web search", claudje: "Paid APIs" },
  { feature: "Verification", chatbot: "None", claudje: "Analyst-reviewed" },
  { feature: "Pricing data", chatbot: "Estimates", claudje: "Verified" },
  { feature: "Tracking", chatbot: "One-time", claudje: "Continuous" },
  { feature: "Competitor count", chatbot: "1 at a time", claudje: "Up to 15" },
  { feature: "Delivery", chatbot: "You ask", claudje: "Automated" },
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
        <h2 className="text-center font-heading text-2xl md:text-3xl">
          Why Not Just Use ChatGPT?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-text-muted md:text-base">
          claudje uses the same AI models, but deploys managed agents with paid
          tool access. Here&apos;s what that means in practice.
        </p>

        <div
          className={`mt-10 overflow-hidden rounded-xl border border-border-warm bg-white shadow-sm transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border-warm bg-cream/50">
                <th className="px-5 py-3 text-sm font-bold text-text-primary uppercase tracking-wider">
                  Feature
                </th>
                <th className="px-5 py-3 text-sm font-bold text-text-muted uppercase tracking-wider">
                  Chatbot
                </th>
                <th className="px-5 py-3 text-sm font-bold text-gold-dark uppercase tracking-wider">
                  claudje
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={`border-b border-border-warm/50 last:border-0 ${
                    i % 2 === 0 ? "bg-white" : "bg-cream/30"
                  }`}
                >
                  <td className="px-5 py-3 text-sm font-medium text-text-primary">
                    {row.feature}
                  </td>
                  <td className="px-5 py-3 text-sm text-text-muted/60">
                    {row.chatbot}
                  </td>
                  <td className="px-5 py-3 text-sm font-medium text-gold-dark">
                    {row.claudje}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
