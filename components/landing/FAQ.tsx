"use client";

import { useState } from "react";

const items = [
  {
    question: "How does claudje collect competitor data?",
    answer:
      "claudje uses AI to analyze publicly available information: websites, pricing pages, review platforms, company registries, social media profiles, and search trends. No scraping of private data, no hacking — just structured analysis of what's already out there.",
  },
  {
    question: "When will I get my first report?",
    answer:
      "Within 48 hours of sharing your competitor list. We set up monitoring, run the first analysis, and deliver a complete report to your inbox.",
  },
  {
    question: "Can I change which competitors I track?",
    answer:
      "Yes, anytime. Swap competitors in or out by emailing us. Changes take effect with the next report cycle.",
  },
  {
    question: "Is this legal?",
    answer:
      "Absolutely. claudje only analyzes publicly available information — the same data anyone could find by visiting your competitors' websites, reading their reviews, or checking the Chamber of Commerce. We just do it systematically and deliver the insights to you.",
  },
  {
    question: "What format are the reports in?",
    answer:
      "Reports are delivered as clean, structured emails with data tables and AI-generated summaries for each category. No logins, no dashboards — everything arrives in your inbox, ready to read.",
  },
  {
    question: "How do I cancel?",
    answer:
      "Email us anytime. No contracts, no lock-in. Monitoring stops at the end of your current billing period.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-cream px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-12">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl">FAQ</h2>
            <p className="mt-3 text-text-muted">
              Common questions about claudje.
            </p>
          </div>

          <div className="min-h-[420px] divide-y divide-border-warm">
            {items.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-start justify-between gap-4 py-4 text-left"
                >
                  <span className="text-sm font-medium">{item.question}</span>
                  <svg
                    className={`mt-0.5 h-4 w-4 shrink-0 text-gold transition-transform ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    openIndex === i
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 text-sm leading-relaxed text-text-muted">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
