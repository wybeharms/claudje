"use client";

import { useState, useEffect, useRef } from "react";
import ClaudjeBird from "../portal/ClaudjeBird";
import { useI18n } from "@/context/I18nContext";
import type { LocaleCode } from "@/lib/i18n";
import { BOOK_CALL_URL } from "./BookCall";

const CTA_HREF = "/get-started";

export default function Header() {
  const { locale, localeConfig, locales, setLocale, messages } = useI18n();
  const t = messages.header;

  const navLinks = [
    { label: t.nav.product, href: "/product" },
    { label: t.nav.technology, href: "/technology" },
  ];
  const aboutLinks = [
    { label: t.nav.about, href: "/about" },
    { label: t.nav.blog, href: "/blog" },
  ];

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [localeOpen, setLocaleOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [pillAboutOpen, setPillAboutOpen] = useState(false);
  const localeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const pillAboutRef = useRef<HTMLDivElement>(null);

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
      if (aboutRef.current && !aboutRef.current.contains(e.target as Node)) {
        setAboutOpen(false);
      }
      if (pillAboutRef.current && !pillAboutRef.current.contains(e.target as Node)) {
        setPillAboutOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-on-dark-muted transition-colors hover:text-text-on-dark"
              >
                {link.label}
              </a>
            ))}

            {/* About dropdown */}
            <div ref={aboutRef} className="relative">
              <button
                onClick={() => setAboutOpen(!aboutOpen)}
                className="flex items-center gap-1 text-sm text-text-on-dark-muted transition-colors hover:text-text-on-dark"
              >
                {t.nav.aboutMenu}
                <svg
                  className={`h-3 w-3 transition-transform ${aboutOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {aboutOpen && (
                <div className="absolute left-0 top-full mt-2 min-w-[120px] rounded-lg border border-white/10 bg-brown shadow-lg">
                  {aboutLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-text-on-dark-muted transition-colors hover:bg-white/10 hover:text-text-on-dark first:rounded-t-lg last:rounded-b-lg"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-4 md:flex">
            {/* Locale selector */}
            <div ref={localeRef} className="relative">
              <button
                onClick={() => setLocaleOpen(!localeOpen)}
                className="flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors hover:bg-white/10"
                aria-label={t.languageLabel}
              >
                <span className="text-base">{localeConfig.flag}</span>
              </button>
              {localeOpen && (
                <div className="absolute right-0 top-full mt-2 min-w-[160px] rounded-lg border border-white/10 bg-brown shadow-lg">
                  {locales.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLocale(l.code as LocaleCode);
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
              {t.login}
            </a>
            <a
              href={BOOK_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-on-dark-muted transition-colors hover:text-text-on-dark"
            >
              {t.nav.bookCall}
            </a>
            <a
              href={CTA_HREF}
              className="btn-shimmer rounded-lg px-5 py-2 text-sm font-medium text-brown transition-colors"
            >
              {t.ctaTrial}
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
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLocale(l.code as LocaleCode)}
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
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm text-text-on-dark-muted"
                >
                  {link.label}
                </a>
              ))}
              {aboutLinks.map((link) => (
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
                href={BOOK_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="text-sm text-text-on-dark-muted"
              >
                {t.nav.bookCall}
              </a>
              <a
                href={CTA_HREF}
                className="btn-shimmer rounded-lg px-5 py-2 text-center text-sm font-medium text-brown"
              >
                {t.ctaTrial}
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm text-text-primary transition-colors hover:bg-black/5"
            >
              {link.label}
            </a>
          ))}

          {/* About dropdown in pill */}
          <div ref={pillAboutRef} className="relative">
            <button
              onClick={() => setPillAboutOpen(!pillAboutOpen)}
              className="flex items-center gap-1 rounded-full px-3 py-2 text-sm text-text-primary transition-colors hover:bg-black/5"
            >
              {t.nav.aboutMenu}
              <svg
                className={`h-3 w-3 transition-transform ${pillAboutOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {pillAboutOpen && (
              <div className="absolute left-0 top-full mt-2 min-w-[120px] rounded-lg border border-border-warm bg-white shadow-lg">
                {aboutLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-text-muted transition-colors hover:bg-cream hover:text-text-primary first:rounded-t-lg last:rounded-b-lg"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          <a
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-2 text-sm text-text-primary transition-colors hover:bg-black/5"
          >
            {t.nav.bookCall}
          </a>
          <div className="mx-1 h-5 w-px bg-border-warm" />
          <a
            href={CTA_HREF}
            className="btn-shimmer rounded-full px-5 py-2 text-sm font-medium text-brown"
          >
            {t.ctaTrial}
          </a>
        </nav>
      </div>
    </>
  );
}
