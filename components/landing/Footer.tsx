"use client";

import { useI18n } from "@/context/I18nContext";

const CTA_HREF = "/get-started";

export default function Footer() {
  const { messages } = useI18n();
  const t = messages.footer;
  return (
    <footer className="bg-brown text-text-on-dark">
      {/* Final CTA band */}
      <div className="border-b border-border-on-dark px-6 py-16 text-center lg:px-8">
        <h2 className="font-heading text-xl md:text-2xl">{t.ctaTitle}</h2>
        <p className="mt-3 text-sm text-text-on-dark-muted md:text-base">
          {t.ctaSubtitle}
        </p>
        <a
          href={CTA_HREF}
          className="btn-shimmer mt-6 inline-block rounded-lg px-8 py-3 text-sm font-semibold text-brown transition-colors md:text-base"
        >
          {t.ctaButton}
        </a>
      </div>

      {/* Footer links */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-text-on-dark-muted md:flex-row lg:px-8">
        <a href="/" className="font-heading text-lg text-text-on-dark">
          claudje
        </a>
        <nav className="flex flex-wrap justify-center gap-6">
          <a href="/product" className="transition-colors hover:text-text-on-dark">
            {t.nav.product}
          </a>
          <a href="/technology" className="transition-colors hover:text-text-on-dark">
            {t.nav.technology}
          </a>
          <a href="#pricing" className="transition-colors hover:text-text-on-dark">
            {t.nav.pricing}
          </a>
          <a href="/about" className="transition-colors hover:text-text-on-dark">
            {t.nav.about}
          </a>
          <a href="/blog" className="transition-colors hover:text-text-on-dark">
            {t.nav.blog}
          </a>
          <a
            href="mailto:info@claudje.com"
            className="transition-colors hover:text-text-on-dark"
          >
            {t.nav.contact}
          </a>
        </nav>
        <p>&copy; {new Date().getFullYear()} claudje</p>
      </div>
    </footer>
  );
}
