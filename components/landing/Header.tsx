"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const CTA_HREF =
  "mailto:info@claudje.com?subject=claudje%20-%20Get%20Started";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Full header */}
      <header className="relative z-50 border-b border-border-on-dark bg-brown">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Wordmark */}
          <a
            href="/"
            className="font-heading text-2xl tracking-tight text-text-on-dark"
          >
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
          <div className="hidden md:block">
            <a
              href={CTA_HREF}
              className="btn-shimmer rounded-lg px-5 py-2 text-sm font-medium text-brown transition-colors"
            >
              Get Started
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
                Get Started
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
            Get Started
          </a>
        </nav>
      </div>
    </>
  );
}
