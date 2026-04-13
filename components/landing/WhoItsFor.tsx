"use client";

import { useEffect, useRef, useState } from "react";
import { FlyingEagle } from "../portal/ClaudjeBird";
import { useI18n } from "@/context/I18nContext";

const sampleCompetitors = [
  "Baker's Delight",
  "SmileDental",
  "DrainMasters",
  "FitZone",
  "GreenClean",
];

export default function WhoItsFor() {
  const { messages, formatPrice } = useI18n();
  const t = messages.whoItsFor;
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const el = sectionRef.current;
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

  // Sync pill highlights with eagle flight once visible
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
    <section ref={sectionRef} className="bg-cream-dark px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2
          className={`font-heading text-2xl transition-all duration-700 md:text-3xl ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {t.title}
        </h2>

        {/* Flying eagle animation */}
        <div
          className={`relative mx-auto mt-8 h-28 w-full overflow-hidden transition-opacity duration-1000 delay-300 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          {visible && (
            <div className="eagle-flight-landing absolute">
              <div className="eagle-bob-landing">
                <FlyingEagle size={80} />
              </div>
            </div>
          )}
        </div>

        {/* Competitor pills */}
        <div
          className={`flex flex-wrap justify-center gap-2 transition-all duration-700 delay-500 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          {sampleCompetitors.map((name, i) => (
            <span
              key={name}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-700 ease-in-out ${
                i === activeIndex
                  ? "scale-110 silver-metallic text-brown shadow-lg shadow-silver/25"
                  : "scale-100 bg-gold/10 text-gold-dark"
              }`}
            >
              {name}
            </span>
          ))}
        </div>

        {/* Body copy */}
        <div
          className={`mx-auto mt-10 max-w-2xl transition-all duration-700 delay-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-sm leading-relaxed text-text-muted md:text-base">
            {t.body1}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-muted md:text-base">
            {t.body2Before}
            {formatPrice(49)}
            {t.body2After}
          </p>
          <a
            href="/get-started"
            className="mt-6 inline-block rounded-lg bg-brown px-6 py-2.5 text-sm font-medium text-text-on-dark transition-colors hover:bg-brown/90"
          >
            {t.cta}
          </a>
        </div>
      </div>

      <style jsx global>{`
        .eagle-flight-landing {
          animation: eagleFlyLanding 6.4s ease-in-out infinite;
        }
        .eagle-bob-landing {
          animation: eagleBobLanding 4s ease-in-out infinite;
        }
        .eagle-wing {
          animation: wingFlapLanding 4s ease-in-out infinite;
        }
        .eagle-wing-far {
          animation: wingFlapFarLanding 4s ease-in-out infinite;
        }

        @keyframes eagleFlyLanding {
          0%    { left: 5%; transform: scaleX(1) scale(1); top: 20%; }
          24%   { left: 40%; transform: scaleX(1) scale(0.85); top: 5%; }
          49%   { left: 75%; transform: scaleX(1) scale(1); top: 18%; }
          50%   { left: 75%; transform: scaleX(-1) scale(1); top: 18%; }
          75%   { left: 40%; transform: scaleX(-1) scale(0.85); top: 2%; }
          99%   { left: 5%; transform: scaleX(-1) scale(1); top: 15%; }
          100%  { left: 5%; transform: scaleX(1) scale(1); top: 20%; }
        }

        @keyframes eagleBobLanding {
          0%   { transform: translateY(0); }
          10%  { transform: translateY(-6px); }
          20%  { transform: translateY(-12px); }
          30%  { transform: translateY(-8px); }
          35%  { transform: translateY(-4px); }
          65%  { transform: translateY(4px); }
          85%  { transform: translateY(3px); }
          100% { transform: translateY(0); }
        }

        @keyframes wingFlapLanding {
          0%, 35%, 100% { transform: rotate(3deg); }
          5%   { transform: rotate(-25deg); }
          10%  { transform: rotate(8deg); }
          15%  { transform: rotate(-25deg); }
          20%  { transform: rotate(8deg); }
          25%  { transform: rotate(-25deg); }
          30%  { transform: rotate(8deg); }
        }

        @keyframes wingFlapFarLanding {
          0%, 35%, 100% { transform: rotate(-2deg); }
          5%   { transform: rotate(18deg); }
          10%  { transform: rotate(-5deg); }
          15%  { transform: rotate(18deg); }
          20%  { transform: rotate(-5deg); }
          25%  { transform: rotate(18deg); }
          30%  { transform: rotate(-5deg); }
        }
      `}</style>
    </section>
  );
}
