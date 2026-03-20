const steps = [
  {
    number: "1",
    title: "Tell us who to watch",
    description:
      "List up to 5 or 10 competitors you want to track. Any industry, any size — if they have a web presence, we can monitor them.",
  },
  {
    number: "2",
    title: "We research them with AI",
    description:
      "Our AI scrapes pricing pages, monitors web changes, pulls company registry data, reads reviews, and tracks social activity and search trends.",
  },
  {
    number: "3",
    title: "You get a report",
    description:
      "A clear, structured report lands in your inbox — weekly or daily. No dashboards to check, no software to learn. Just actionable intelligence.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-cream px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-heading text-3xl md:text-4xl">
          How it works
        </h2>
        <p className="mt-3 text-center text-text-muted">
          Three steps. No software to install.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center md:text-left">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 font-heading text-xl text-gold md:mx-0">
                {step.number}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
