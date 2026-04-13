"use client";

import { useState } from "react";
import Image from "next/image";

const views = [
  { label: "Report Overview", src: "/screenshots/Main_Page_Report.png" },
  { label: "Executive Summary", src: "/screenshots/Executive_Summary.png" },
];

export default function ReportPreview() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((active - 1 + views.length) % views.length);
  const next = () => setActive((active + 1) % views.length);

  return (
    <section id="report-preview" className="bg-cream px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-heading text-2xl md:text-3xl">
          What&apos;s in a Report
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-text-muted md:text-base">
          Every report is fully customizable to your business. Here&apos;s what
          a typical report looks like.
        </p>

        {/* Screenshot with side arrows */}
        <div className="mt-8 flex items-center gap-3">
          {/* Left arrow */}
          <button
            onClick={prev}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-warm bg-white text-text-muted shadow-sm transition-colors hover:bg-cream-darker hover:text-text-primary"
            aria-label="Previous view"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Image */}
          <div className="flex-1 overflow-hidden rounded-xl border border-border-warm bg-white shadow-sm">
            <div className="relative max-h-[420px] overflow-hidden md:max-h-[480px]">
              <Image
                key={views[active].src}
                src={views[active].src}
                alt={views[active].label}
                width={1242}
                height={700}
                className="w-full object-cover object-top"
                priority={active === 0}
              />
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-warm bg-white text-text-muted shadow-sm transition-colors hover:bg-cream-darker hover:text-text-primary"
            aria-label="Next view"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Label + dots */}
        <div className="mt-3 flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-text-muted">{views[active].label}</p>
          <div className="flex gap-1.5">
            {views.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-4 bg-gold" : "w-1.5 bg-silver/40"
                }`}
                aria-label={`View ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Link to full product page */}
        <div className="mt-5 text-center">
          <a
            href="/product"
            className="text-sm text-gold-dark transition-colors hover:text-brown"
          >
            See full report breakdown &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
