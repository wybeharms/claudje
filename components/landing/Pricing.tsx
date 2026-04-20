"use client";

import { useI18n } from "@/context/I18nContext";

export default function Pricing() {
  const { formatPrice, messages } = useI18n();
  const t = messages.pricing;

  const tiers = [
    {
      name: t.starterName,
      slug: "starter",
      amount: 90,
      features: t.starterFeatures,
      highlight: false,
    },
    {
      name: t.businessName,
      slug: "business",
      amount: 149,
      features: t.businessFeatures,
      highlight: true,
    },
    {
      name: t.proName,
      slug: "pro",
      amount: 299,
      features: t.proFeatures,
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="bg-brown px-6 py-24 text-text-on-dark lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-heading text-2xl md:text-3xl">
          {t.title}
        </h2>
        <p className="mt-3 text-center text-sm text-text-on-dark-muted md:text-base">
          {t.subtitle}
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
                  {formatPrice(tier.amount)}
                </span>
                <span className="text-sm text-text-on-dark-muted">
                  {t.perMonth}
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
                {tier.highlight ? t.ctaTrial : t.ctaSelect}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
