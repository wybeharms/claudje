import Image from "next/image";

const dataSources = [
  {
    name: "Google Maps",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
      </svg>
    ),
  },
  {
    name: "Chamber of Commerce",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M4 21V10l8-6 8 6v11H4zm2-2h12V10.8l-6-4.5-6 4.5V19zm1-2h4v-4H7v4zm6 0h4v-2h-4v2zm0-4h4v-2h-4v2zM7 11h4v-2H7v2z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
  },
  {
    name: "Trustpilot",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    name: "Google Reviews",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM12 5l1.12 3.78H17l-3.07 2.27 1.18 3.73L12 12.4l-3.11 2.38 1.18-3.73L7 8.78h3.88L12 5z" />
      </svg>
    ),
  },
  {
    name: "SEO monitoring",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
      </svg>
    ),
  },
  {
    name: "G2",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
      </svg>
    ),
  },
  {
    name: "Glassdoor",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M6 2h12v2H8v16h10v2H6V2zm12 4v12h-2V6h2z" />
      </svg>
    ),
  },
  {
    name: "SimilarWeb",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
  },
];

export default function WhyClaudje() {
  return (
    <section className="bg-cream px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-heading text-3xl md:text-4xl">
          &ldquo;But can&rsquo;t ChatGPT do this?&rdquo;
        </h2>

        <div className="mx-auto mt-8 max-w-2xl space-y-4 text-center text-sm leading-relaxed text-text-muted">
          <div className="flex items-center justify-center gap-4">
            <Image
              src="/images/openai.png"
              alt="OpenAI"
              width={28}
              height={28}
              className="opacity-60"
            />
            <Image
              src="/images/claude.png"
              alt="Claude"
              width={28}
              height={28}
              className="opacity-60"
            />
          </div>

          <p>
            claudje uses <strong>the same AI</strong> that powers ChatGPT and
            Claude.
          </p>
          <p>
            When you ask a chatbot to research a competitor, it searches the
            web, skims the top results, and gives you a summary.{" "}
            <strong>That&rsquo;s it.</strong>
          </p>
          <p>
            claudje deploys <strong>a team of specialized agents</strong> with{" "}
            <strong>paid tool access</strong>. They pull real reviews from
            Google Maps, query the Chamber of Commerce, monitor LinkedIn, track
            Trustpilot and G2 ratings, and more.
          </p>
          <p className="font-medium text-text-primary">
            <strong>
              We pay for access to these sources so you don&rsquo;t have to.
            </strong>{" "}
            A chatbot can&rsquo;t do that on your behalf.
          </p>
          <p>
            The result: research that is <strong>deeper</strong>,{" "}
            <strong>more accurate</strong>, and{" "}
            <strong>more actionable</strong> than anything a chatbot can
            produce. Updated every week, for less than what you spend on coffee.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-4">
            {dataSources.map((source) => (
              <div
                key={source.name}
                className="flex w-16 flex-col items-center gap-1.5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cream-dark text-text-muted">
                  {source.icon}
                </div>
                <span className="text-[11px] leading-tight text-text-muted text-center">
                  {source.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
