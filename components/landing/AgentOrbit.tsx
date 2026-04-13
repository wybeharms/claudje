"use client";

import { useEffect, useRef, useState } from "react";
import { FlyingEagle } from "../portal/ClaudjeBird";

const DATA_SOURCES = [
  { name: "Google Maps", angle: 0 },
  { name: "LinkedIn", angle: 45 },
  { name: "Trustpilot", angle: 90 },
  { name: "KvK", angle: 135 },
  { name: "SimilarWeb", angle: 180 },
  { name: "G2", angle: 225 },
  { name: "Glassdoor", angle: 270 },
  { name: "SEO", angle: 315 },
];

/**
 * Eagle orbiting a ring of data source icons.
 * As the eagle passes each source, it glows gold briefly.
 * Desktop: circular orbit. Mobile: horizontal flight across a row.
 */
export default function AgentOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeSource, setActiveSource] = useState(-1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Cycle through sources to create the "glow" effect
  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const interval = setInterval(() => {
      setActiveSource(i % DATA_SOURCES.length);
      i++;
    }, 1000);
    setActiveSource(0);
    return () => clearInterval(interval);
  }, [visible]);

  return (
    <div ref={containerRef} className="relative mx-auto">
      {/* Desktop: circular layout */}
      <div className="hidden md:block">
        <div className="relative mx-auto h-[240px] w-[240px]">
          {/* Orbit ring */}
          <div className="absolute inset-4 rounded-full border border-dashed border-gold/20" />

          {/* Center eagle */}
          {visible && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="eagle-orbit-spin">
                <FlyingEagle size={48} />
              </div>
            </div>
          )}

          {/* Data source labels around the ring */}
          {DATA_SOURCES.map((source, i) => {
            const rad = (source.angle * Math.PI) / 180;
            const radius = 100;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            const isActive = i === activeSource;

            return (
              <div
                key={source.name}
                className={`absolute left-1/2 top-1/2 flex items-center justify-center transition-all duration-500 ${
                  visible
                    ? "scale-100 opacity-100"
                    : "scale-75 opacity-0"
                }`}
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap transition-all duration-500 ${
                    isActive
                      ? "bg-gold/20 text-gold-dark shadow-sm shadow-gold/10"
                      : "bg-cream-darker/80 text-text-muted"
                  }`}
                >
                  {source.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: horizontal strip */}
      <div className="md:hidden">
        {/* Eagle flying across */}
        {visible && (
          <div className="relative mx-auto mb-3 h-10 w-full overflow-hidden">
            <div className="eagle-orbit-horizontal absolute">
              <FlyingEagle size={36} />
            </div>
          </div>
        )}

        {/* Source pills in a wrap */}
        <div className="flex flex-wrap justify-center gap-1.5">
          {DATA_SOURCES.map((source, i) => {
            const isActive = i === activeSource;
            return (
              <span
                key={source.name}
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-all duration-500 ${
                  visible ? "opacity-100" : "opacity-0"
                } ${
                  isActive
                    ? "bg-gold/20 text-gold-dark"
                    : "bg-cream-darker/80 text-text-muted"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {source.name}
              </span>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        .eagle-orbit-spin {
          animation: eagleOrbitSpin 8s linear infinite;
          transform-origin: center center;
        }

        .eagle-orbit-horizontal {
          animation: eagleOrbitHorizontal 6s ease-in-out infinite;
        }

        @keyframes eagleOrbitSpin {
          0%   { transform: rotate(0deg) translateX(0) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(0) rotate(-360deg); }
        }

        @keyframes eagleOrbitHorizontal {
          0%    { left: 0%; transform: scaleX(1); }
          49%   { left: 85%; transform: scaleX(1); }
          50%   { left: 85%; transform: scaleX(-1); }
          99%   { left: 0%; transform: scaleX(-1); }
          100%  { left: 0%; transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
