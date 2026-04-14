"use client";

import { useEffect, useRef, useState } from "react";
import { FlyingEagle } from "../portal/ClaudjeBird";
import { useI18n } from "@/context/I18nContext";

const CTA_HREF = "/get-started";

const sampleCompetitors = [
  "Baker's Delight",
  "SmileDental",
  "DrainMasters",
  "FitZone",
  "GreenClean",
];

export default function Footer() {
  const { messages } = useI18n();
  const t = messages.footer;
  const ctaRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // One-shot reveal
  useEffect(() => {
    const el = ctaRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Sync pill highlights with eagle flight
  useEffect(() => {
    if (!visible) return;
    const cycleDuration = 8320;
    const totalTicks = sampleCompetitors.length * 2;
    const tickInterval = cycleDuration / totalTicks;
    let tick = 0;

    const timer = setInterval(() => {
      const current = tick % totalTicks;
      if (current < sampleCompetitors.length) {
        setActiveIndex(current);
      } else {
        setActiveIndex(
          sampleCompetitors.length - 1 - (current - sampleCompetitors.length)
        );
      }
      tick++;
    }, tickInterval);

    setActiveIndex(0);
    return () => clearInterval(timer);
  }, [visible]);

  return (
    <footer className="bg-brown text-text-on-dark">
      {/* Final CTA band with eagle animation */}
      <div
        ref={ctaRef}
        className="border-b border-border-on-dark px-6 py-16 text-center lg:px-8"
      >
        {/* Eagle animation */}
        <div
          className={`relative mx-auto h-20 w-full max-w-md overflow-hidden transition-opacity duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {visible && (
            <div className="eagle-flight-footer absolute">
              <div className="eagle-bob-footer">
                <FlyingEagle size={64} style={{ filter: "brightness(3) saturate(0)" }} />
              </div>
            </div>
          )}
        </div>

        {/* Competitor pills */}
        <div
          className={`flex flex-wrap justify-center gap-2 transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {sampleCompetitors.map((name, i) => (
            <span
              key={name}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-700 ease-in-out ${
                i === activeIndex
                  ? "scale-110 silver-metallic text-brown shadow-lg shadow-silver/25"
                  : "scale-100 bg-white/10 text-text-on-dark-muted"
              }`}
            >
              {name}
            </span>
          ))}
        </div>

        <h2 className="mt-6 font-heading text-xl md:text-2xl">{t.ctaTitle}</h2>
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

      <style jsx global>{`
        .eagle-flight-footer {
          animation: eagleFlyFooter 6.4s ease-in-out infinite;
        }
        .eagle-bob-footer {
          animation: eagleBobFooter 4s ease-in-out infinite;
        }
        .eagle-wing {
          animation: wingFlapFooter 4s ease-in-out infinite;
        }
        .eagle-wing-far {
          animation: wingFlapFarFooter 4s ease-in-out infinite;
        }

        @keyframes eagleFlyFooter {
          0%    { left: 5%; transform: scaleX(1) scale(1); top: 20%; }
          24%   { left: 40%; transform: scaleX(1) scale(0.85); top: 5%; }
          49%   { left: 75%; transform: scaleX(1) scale(1); top: 18%; }
          50%   { left: 75%; transform: scaleX(-1) scale(1); top: 18%; }
          75%   { left: 40%; transform: scaleX(-1) scale(0.85); top: 2%; }
          99%   { left: 5%; transform: scaleX(-1) scale(1); top: 15%; }
          100%  { left: 5%; transform: scaleX(1) scale(1); top: 20%; }
        }

        @keyframes eagleBobFooter {
          0%   { transform: translateY(0); }
          10%  { transform: translateY(-6px); }
          20%  { transform: translateY(-12px); }
          30%  { transform: translateY(-8px); }
          35%  { transform: translateY(-4px); }
          65%  { transform: translateY(4px); }
          85%  { transform: translateY(3px); }
          100% { transform: translateY(0); }
        }

        @keyframes wingFlapFooter {
          0%, 35%, 100% { transform: rotate(3deg); }
          5%   { transform: rotate(-25deg); }
          10%  { transform: rotate(8deg); }
          15%  { transform: rotate(-25deg); }
          20%  { transform: rotate(8deg); }
          25%  { transform: rotate(-25deg); }
          30%  { transform: rotate(8deg); }
        }

        @keyframes wingFlapFarFooter {
          0%, 35%, 100% { transform: rotate(-2deg); }
          5%   { transform: rotate(18deg); }
          10%  { transform: rotate(-5deg); }
          15%  { transform: rotate(18deg); }
          20%  { transform: rotate(-5deg); }
          25%  { transform: rotate(18deg); }
          30%  { transform: rotate(-5deg); }
        }
      `}</style>
    </footer>
  );
}
