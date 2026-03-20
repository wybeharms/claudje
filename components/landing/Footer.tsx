const CTA_HREF =
  "mailto:info@claudje.com?subject=claudje%20-%20Get%20Started";

export default function Footer() {
  return (
    <footer className="bg-brown text-text-on-dark">
      {/* Final CTA band */}
      <div className="border-b border-border-on-dark px-6 py-16 text-center lg:px-8">
        <h2 className="font-heading text-2xl md:text-3xl">
          Ready to know what your competitors are up&nbsp;to?
        </h2>
        <p className="mt-3 text-text-on-dark-muted">
          Start getting competitor reports in your inbox this week.
        </p>
        <a
          href={CTA_HREF}
          className="btn-shimmer mt-6 inline-block rounded-lg px-8 py-3 text-base font-semibold text-brown transition-colors"
        >
          Get Started
        </a>
      </div>

      {/* Footer links */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-text-on-dark-muted md:flex-row lg:px-8">
        <a href="/" className="font-heading text-lg text-text-on-dark">
          claudje
        </a>
        <nav className="flex gap-6">
          <a href="#how-it-works" className="transition-colors hover:text-text-on-dark">
            How It Works
          </a>
          <a href="#pricing" className="transition-colors hover:text-text-on-dark">
            Pricing
          </a>
          <a href="#faq" className="transition-colors hover:text-text-on-dark">
            FAQ
          </a>
          <a
            href="mailto:info@claudje.com"
            className="transition-colors hover:text-text-on-dark"
          >
            Contact
          </a>
        </nav>
        <p>&copy; {new Date().getFullYear()} claudje</p>
      </div>
    </footer>
  );
}
