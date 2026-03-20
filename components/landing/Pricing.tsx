const CTA_HREF =
  "mailto:info@claudje.com?subject=claudje%20-%20Get%20Started";

const tiers = [
  {
    name: "Starter",
    price: "€60",
    period: "/mo",
    features: [
      "5 competitors monitored",
      "Weekly report",
      "Pricing intelligence",
      "Web monitoring",
      "Review tracking",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "€100",
    period: "/mo",
    features: [
      "10 competitors monitored",
      "Daily reports",
      "Everything in Starter",
      "Company registry data",
      "LinkedIn tracking",
      "Search trend analysis",
      "Priority support",
    ],
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-brown px-6 py-20 text-text-on-dark lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-heading text-3xl md:text-4xl">
          Pricing
        </h2>
        <p className="mt-3 text-center text-text-on-dark-muted">
          Simple plans. No setup fees. Cancel anytime.
        </p>

        <div className="mx-auto mt-12 grid max-w-3xl gap-8 md:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col rounded-xl p-6 ${
                tier.highlight
                  ? "border-2 border-gold bg-white/10"
                  : "border border-border-on-dark bg-white/5"
              }`}
            >
              <h3 className="text-2xl font-semibold">{tier.name}</h3>
              <p className="mt-2">
                <span className="text-3xl font-bold text-gold">
                  {tier.price}
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
                    <span className="mr-2 text-gold">+</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href={CTA_HREF}
                className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-medium transition-colors ${
                  tier.highlight
                    ? "btn-shimmer text-brown"
                    : "border border-border-on-dark text-text-on-dark hover:bg-white/5"
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
