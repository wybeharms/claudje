const steps = [
  {
    number: "1",
    title: "Tell Us Who to Watch",
    description:
      "List up to 5 or 10 competitors. Any industry, any size.",
  },
  {
    number: "2",
    title: "Our Agents Get to Work",
    description:
      "Our agents keep track of websites, reviews, LinkedIn, and pricing. Then synthesize it into clear, qualitative insights.",
  },
  {
    number: "3",
    title: "You Get a Clear Report",
    description:
      "What changed, what it means, and what to watch. In your inbox, weekly or daily.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-cream px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-heading text-3xl md:text-4xl">
          How It Works
        </h2>
        <p className="mt-3 text-center text-text-muted">
          Three steps. No software to install.
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 font-heading text-xl text-gold">
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
