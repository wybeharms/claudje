"use client";

import Image from "next/image";
import { useI18n } from "@/context/I18nContext";
import Header from "./Header";
import Footer from "./Footer";

export default function AboutPageContent() {
  const { messages } = useI18n();
  const t = messages.about;

  return (
    <>
      <Header />

      <section className="bg-brown px-6 py-16 text-text-on-dark lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-4xl font-light tracking-tight md:text-5xl">
            {t.heroTitle}
          </h1>
        </div>
      </section>

      <section className="bg-cream px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col items-center text-center">
            <div className="relative h-52 w-36 overflow-hidden rounded-lg">
              <Image
                src="/berend.jpg"
                alt="Berend Harms"
                fill
                sizes="144px"
                className="object-cover"
              />
            </div>
            <h3 className="mt-4 font-heading text-xl font-semibold text-brown">
              Berend Harms
            </h3>
            <p className="text-sm font-medium text-gold">{t.berendRole}</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-text-muted">
              {t.berendBio}
            </p>
            <a
              href="https://www.linkedin.com/in/berend-harms-905609209/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-text-muted transition-colors hover:text-brown"
              aria-label={t.berendLinkedinLabel}
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

          <div className="mt-12 space-y-5 text-center text-base leading-relaxed text-text-muted">
            <p>{t.mission}</p>
          </div>
        </div>
      </section>

      <section className="bg-cream-dark px-6 py-14 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="/get-started"
            className="btn-shimmer inline-block rounded-lg px-8 py-3 text-sm font-medium text-brown transition-colors"
          >
            {t.cta}
          </a>
          <p className="mt-3 text-sm text-text-muted">
            {t.orReachAt}{" "}
            <a
              href="mailto:info@claudje.com"
              className="text-brown underline underline-offset-2 transition-colors hover:text-text-primary"
            >
              info@claudje.com
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
