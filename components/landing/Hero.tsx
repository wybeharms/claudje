import ReportCarousel from "./ReportCarousel";

const CTA_HREF =
  "mailto:info@claudje.com?subject=claudje%20-%20Get%20Started";

export default function Hero() {
  return (
    <section className="bg-brown px-6 py-20 md:py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2 md:gap-10">
        {/* Left text */}
        <div className="pl-2 md:pl-8 lg:pl-14">
          <h1 className="font-heading text-4xl leading-tight text-text-on-dark md:text-5xl lg:text-[3rem]">
            Know What Your Competitors Are Doing.{" "}
            <span className="text-gold">Every&nbsp;Week.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-text-on-dark-muted">
            <em>claudje</em> watches your competitors so you can race ahead.
            <br />
            All in one clear report, straight to your inbox.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={CTA_HREF}
              className="btn-shimmer rounded-lg px-8 py-3 text-center text-base font-semibold text-brown transition-colors"
            >
              Get Started
            </a>
            <a
              href="#report-preview"
              className="rounded-lg border border-text-on-dark-muted px-8 py-3 text-center text-base font-medium text-text-on-dark transition-colors hover:border-text-on-dark hover:bg-white/5"
            >
              See what&apos;s in a report
            </a>
          </div>
        </div>

        {/* Right report carousel */}
        <div className="flex justify-center md:justify-end">
          <ReportCarousel />
        </div>
      </div>
    </section>
  );
}
