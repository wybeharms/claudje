const CTA_HREF =
  "mailto:info@claudje.com?subject=claudje%20-%20Get%20Started";

export default function Hero() {
  return (
    <section className="bg-brown px-6 py-24 text-center md:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-4xl leading-tight text-text-on-dark md:text-5xl lg:text-6xl">
          Know what your competitors are doing. Every&nbsp;week.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-on-dark-muted md:text-xl">
          claudje monitors your competitors&apos; pricing, reviews, web
          activity, and public filings — and delivers a clear AI&#8209;generated
          report straight to your inbox.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={CTA_HREF}
            className="btn-shimmer rounded-lg px-8 py-3 text-base font-semibold text-brown transition-colors"
          >
            Get Started
          </a>
          <a
            href="#report-preview"
            className="rounded-lg border border-text-on-dark-muted px-8 py-3 text-base font-medium text-text-on-dark transition-colors hover:border-text-on-dark hover:bg-white/5"
          >
            See what&apos;s in a report
          </a>
        </div>
      </div>
    </section>
  );
}
