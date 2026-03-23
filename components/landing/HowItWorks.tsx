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

        <div className="mt-12 flex items-center justify-center gap-3 rounded-xl bg-gold/5 px-6 py-4">
          <svg className="h-5 w-5 flex-shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <p className="text-sm text-text-muted">
            Every report is <span className="font-medium text-brown">reviewed by a human analyst</span> before delivery. AI does the heavy lifting, humans ensure quality.
          </p>
        </div>
      </div>
    </section>
  );
}
