"use client";

import ReportCarousel from "./ReportCarousel";
import { useI18n } from "@/context/I18nContext";

const CTA_HREF = "/get-started";

export default function Hero() {
  const { messages } = useI18n();
  const t = messages.hero;
  return (
    <section className="bg-brown px-6 py-20 md:py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2 md:gap-10">
        {/* Left text */}
        <div className="pl-2 md:pl-8 lg:pl-14">
          <h1 className="font-heading text-3xl leading-tight text-text-on-dark md:text-4xl lg:text-[2.75rem]">
            {t.headlineLine}{" "}
            <span className="text-gold">{t.headlineHighlight}</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-text-on-dark-muted md:text-base">
            <em>claudje</em> {t.subheadLine1}
            <br />
            {t.subheadLine2}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={CTA_HREF}
              className="btn-shimmer rounded-lg px-8 py-3 text-center text-sm font-semibold text-brown transition-colors md:text-base"
            >
              {t.ctaPrimary}
            </a>
            <a
              href="#report-preview"
              className="rounded-lg border border-text-on-dark-muted px-8 py-3 text-center text-sm font-medium text-text-on-dark transition-colors hover:border-text-on-dark hover:bg-white/5 md:text-base"
            >
              {t.ctaSecondary}
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
