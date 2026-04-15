"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useI18n } from "@/context/I18nContext";

type SourceKey =
  | "googleMaps"
  | "linkedin"
  | "trustpilot"
  | "coc"
  | "similarweb"
  | "googleReviews"
  | "g2"
  | "glassdoor"
  | "seo";

const sourceIcons: Record<SourceKey, ReactNode> = {
  googleMaps: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  ),
  trustpilot: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  ),
  coc: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4 21V10l8-6 8 6v11H4zm2-2h12V10.8l-6-4.5-6 4.5V19zm1-2h4v-4H7v4zm6 0h4v-2h-4v2zm0-4h4v-2h-4v2zM7 11h4v-2H7v2z" />
    </svg>
  ),
  similarweb: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  ),
  googleReviews: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM12 5l1.12 3.78H17l-3.07 2.27 1.18 3.73L12 12.4l-3.11 2.38 1.18-3.73L7 8.78h3.88L12 5z" />
    </svg>
  ),
  g2: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6zm4 4h-2v-2h2v2zm0-4h-2V7h2v6z" />
    </svg>
  ),
  glassdoor: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M6 2h12v2H8v16h10v2H6V2zm12 4v12h-2V6h2z" />
    </svg>
  ),
  seo: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
    </svg>
  ),
};

const sourceOrder: SourceKey[] = [
  "googleMaps",
  "linkedin",
  "trustpilot",
  "coc",
  "similarweb",
  "googleReviews",
  "g2",
  "glassdoor",
  "seo",
];

export default function DataSourcesExpanded() {
  const { messages } = useI18n();
  const t = messages.dataSources;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="bg-cream px-6 py-20 lg:px-8">
      <div ref={ref} className="mx-auto max-w-4xl">
        <h2 className="text-center font-heading text-2xl md:text-3xl">
          {t.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-text-muted md:text-base">
          {t.subtitle}
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sourceOrder.map((key, i) => {
            const source = t.sources[key];
            return (
              <div
                key={key}
                className={`flex items-start gap-3 rounded-xl border border-border-warm bg-white p-4 transition-all duration-500 ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold-dark">
                  {sourceIcons[key]}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">
                    {source.name}
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-text-muted">
                    {source.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
