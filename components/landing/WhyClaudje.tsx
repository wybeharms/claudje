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
            claudje runs on the same frontier AI models from OpenAI and
            Anthropic that power ChatGPT and Claude. The most advanced AI
            available.
          </p>
          <p>
            When you ask ChatGPT to research a competitor, it searches the web,
            skims the top results, and gives you a summary. That&rsquo;s it.
          </p>
          <p>
            claudje deploys a team of specialized sub-agents, each with their
            own skills and paid tool access. One agent pulls real customer
            reviews from Google Maps. Another queries the Chamber of Commerce
            for company filings. Others monitor LinkedIn for new hires and job
            postings, track Trustpilot ratings, and compare pricing pages over
            time.
          </p>
          <p className="font-medium text-text-primary">
            We pay for access to these sources so you don&rsquo;t have to. A
            chatbot can&rsquo;t do that on your behalf.
          </p>
          <p>
            The result: market research that is deeper, more accurate, and more
            actionable than anything a chatbot can produce. Updated every week,
            for less than what you spend on coffee.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {dataSources.map((source) => (
              <div
                key={source.name}
                className="flex flex-col items-center gap-1.5"
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
