"use client";

import { useEffect, useState } from "react";
import { LOCALES } from "./Header";

const tiers = [
  {
    name: "Starter",
    slug: "starter",
    amount: 49,
    period: "/mo",
    features: [
      "5 competitors monitored",
      "Biweekly report",
      "Web & review monitoring",
    ],
    highlight: false,
  },
  {
    name: "Business",
    slug: "business",
    amount: 99,
    period: "/mo",
    features: [
      "10 competitors monitored",
      "Weekly report",
      "LinkedIn tracking",
      "Price analysis",
      "Search trend analysis",
    ],
    highlight: true,
  },
  {
    name: "Pro",
    slug: "pro",
    amount: 249,
    period: "/mo",
    features: [
      "15 competitors monitored",
      "Daily, weekly, or biweekly reports",
      "Daily price tracking",
      "Full report customization",
    ],
    highlight: false,
  },
];

function detectLocale(): string {
  if (typeof navigator === "undefined") return "nl";
  const lang = navigator.language || "nl";
  const match = LOCALES.find(
    (l) => l.code === lang || lang.startsWith(l.code.split("-")[0])
  );
  return match ? match.code : "nl";
}

export default function Pricing() {
  const [locale, setLocale] = useState("nl");

  useEffect(() => {
    setLocale(detectLocale());

    // Listen for locale changes from Header
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail) setLocale(detail);
    };
    window.addEventListener("locale-change", handler);
    return () => window.removeEventListener("locale-change", handler);
  }, []);

  const currentLocale = LOCALES.find((l) => l.code === locale) || LOCALES[2];
  const symbol = currentLocale.symbol;

  return (
    <section id="pricing" className="bg-brown px-6 py-24 text-text-on-dark lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-heading text-2xl md:text-3xl">
          Pricing
        </h2>
        <p className="mt-3 text-center text-sm text-text-on-dark-muted md:text-base">
          Simple plans. No setup fees. Cancel anytime.
        </p>

        <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-xl p-6 ${
                tier.highlight
                  ? "border-2 border-gold bg-white/10"
                  : "border border-silver/30 bg-white/5"
              }`}
            >
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              <p className="mt-2">
                <span className="text-2xl font-bold text-gold">
                  {symbol}{tier.amount}
                </span>
                <span className="text-sm text-text-on-dark-muted">
                  {tier.period}
                </span>
              </p>
              <ul className="mt-5 flex-1 space-y-2">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-sm leading-relaxed text-text-on-dark-muted"
                  >
                    <span
                      className={`mr-2 ${tier.highlight ? "text-gold" : "text-silver-light"}`}
                    >
                      +
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={`/get-started?plan=${tier.slug}`}
                className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-medium transition-colors ${
                  tier.highlight
                    ? "btn-shimmer text-brown"
                    : "border border-silver/30 text-text-on-dark hover:bg-white/5"
                }`}
              >
                {tier.highlight ? "Start Free Trial" : "Select Plan"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
