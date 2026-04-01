"use client";

import { useState, useEffect, useRef } from "react";
import ClaudjeBird from "../portal/ClaudjeBird";

const LOCALES = [
  { code: "en-US", flag: "🇺🇸", label: "English (US)", currency: "USD", symbol: "$" },
  { code: "en-GB", flag: "🇬🇧", label: "English (UK)", currency: "GBP", symbol: "£" },
  { code: "nl", flag: "🇳🇱", label: "Nederlands", currency: "EUR", symbol: "€" },
  { code: "it", flag: "🇮🇹", label: "Italiano", currency: "EUR", symbol: "€" },
  { code: "es", flag: "🇪🇸", label: "Español", currency: "EUR", symbol: "€" },
];

const NAV_LINKS = [
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

const CTA_HREF = "/get-started";

function detectLocale(): string {
  if (typeof navigator === "undefined") return "nl";
  const lang = navigator.language || "nl";
  const match = LOCALES.find(
    (l) => l.code === lang || lang.startsWith(l.code.split("-")[0])
  );
  return match ? match.code : "nl";
}

export { LOCALES };

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [locale, setLocale] = useState("nl");
  const [localeOpen, setLocaleOpen] = useState(false);
  const localeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLocale(detectLocale());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (localeRef.current && !localeRef.current.contains(e.target as Node)) {
        setLocaleOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLocale = LOCALES.find((l) => l.code === locale) || LOCALES[2];

  return (
    <>
      {/* Full header */}
      <header className="relative z-50 border-b border-border-on-dark bg-brown">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Wordmark + eagle */}
          <a
            href="/"
            className="flex items-center gap-2 font-heading text-2xl tracking-tight text-text-on-dark"
          >
            <ClaudjeBird size={32} light className="translate-y-[1px]" />
            claudje
          </a>

          {/* Desktop nav */}
          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-on-dark-muted transition-colors hover:text-text-on-dark"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            {/* Locale selector */}
            <div ref={localeRef} className="relative">
              <button
                onClick={() => setLocaleOpen(!localeOpen)}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors hover:bg-white/10"
                aria-label="Change language"
              >
                <span className="text-base">{currentLocale.flag}</span>
              </button>
              {localeOpen && (
                <div className="absolute right-0 top-full mt-2 min-w-[160px] rounded-lg border border-white/10 bg-brown shadow-lg">
                  {LOCALES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLocale(l.code);
                        setLocaleOpen(false);
                      }}
                      className={`flex w-full items-center gap-2.5 px-4 py-2 text-sm whitespace-nowrap transition-colors hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg ${
                        l.code === locale
                          ? "text-text-on-dark"
                          : "text-text-on-dark-muted"
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span>{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <a
              href="/login"
              className="text-sm text-text-on-dark-muted transition-colors hover:text-text-on-dark"
            >
              Login
            </a>
            <a
              href={CTA_HREF}
              className="btn-shimmer rounded-lg px-5 py-2 text-sm font-medium text-brown transition-colors"
            >
              Free Trial
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-text-on-dark"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="border-t border-border-on-dark px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              {/* Mobile locale selector */}
              <div className="flex gap-2">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLocale(l.code)}
                    className={`rounded-md px-2 py-1 text-base transition-colors ${
                      l.code === locale
                        ? "bg-white/10"
                        : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    {l.flag}
                  </button>
                ))}
              </div>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-text-on-dark-muted"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={CTA_HREF}
                className="btn-shimmer rounded-lg px-5 py-2 text-center text-sm font-medium text-brown"
              >
                Free Trial
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* Floating pill nav */}
      <div
        className={`fixed left-1/2 top-4 z-50 hidden -translate-x-1/2 transition-all duration-300 md:block ${
          scrolled
            ? "translate-y-0 opacity-100"
            : "-translate-y-6 pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex items-center gap-1 rounded-full border border-border-silver bg-white/80 px-2 py-2 shadow-lg shadow-black/10 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-text-primary transition-colors hover:bg-black/5"
            >
              {link.label}
            </a>
          ))}
          <div className="mx-1 h-5 w-px bg-border-warm" />
          <a
            href={CTA_HREF}
            className="btn-shimmer rounded-full px-5 py-2 text-sm font-medium text-brown"
          >
            Free Trial
          </a>
        </nav>
      </div>
    </>
  );
}
