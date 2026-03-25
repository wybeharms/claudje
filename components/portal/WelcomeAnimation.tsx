"use client";

import { useState, useEffect } from "react";
import { FlyingEagle } from "./ClaudjeBird";

interface WelcomeAnimationProps {
  competitors: Array<{ name: string; website: string }>;
}

export default function WelcomeAnimation({ competitors }: WelcomeAnimationProps) {
  const comps = competitors.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Cycle through highlighting pills as eagle passes over them
  useEffect(() => {
    const cycleDuration = 8000; // matches eagleFly animation
    const interval = cycleDuration / comps.length;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = prev + 1;
        return next >= comps.length ? 0 : next;
      });
    }, interval);

    // Start immediately
    setActiveIndex(0);

    return () => clearInterval(timer);
  }, [comps.length]);

  return (
    <div className="relative mb-6">
      {/* Flight area — eagle traverses full width */}
      <div className="relative h-36 w-full">
        <div className="absolute inset-0 animate-[eagleFly_8s_ease-in-out_infinite]">
          <div className="animate-[wingFlap_0.4s_ease-in-out_4] [animation-delay:0s] [animation-fill-mode:forwards] [animation-iteration-count:infinite] [animation-direction:alternate]" style={{ animationName: 'wingCycle', animationDuration: '8s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}>
            <FlyingEagle size={80} />
          </div>
        </div>

        {/* Scan beam — from eagle to active pill */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {activeIndex >= 0 && activeIndex < comps.length && (
            <line
              x1="50%"
              y1="50%"
              x2={`${(15 + activeIndex * (70 / Math.max(comps.length - 1, 1)))}%`}
              y2="100%"
              stroke="#C9A96E"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              opacity="0.5"
              className="animate-[beamFade_1.5s_ease-in-out_infinite]"
            />
          )}
        </svg>
      </div>

      {/* Competitor pills — always visible, highlight when active */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {comps.map((c, i) => (
          <span
            key={i}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-500 ${
              i === activeIndex
                ? "bg-[var(--color-accent)] text-white scale-105 shadow-md"
                : "bg-[var(--color-accent)]/10 text-[var(--color-accent-dark)]"
            }`}
          >
            {c.name || c.website}
          </span>
        ))}
      </div>

      {/* Status text */}
      <p className="text-center text-sm font-medium text-[var(--color-text-primary)]">
        Claudje is on the hunt...
      </p>
      <p className="mt-1 text-center text-xs text-[var(--color-text-muted)]">
        Your first report will arrive within 24 hours.
      </p>

      <style jsx>{`
        @keyframes eagleFly {
          0% { left: 0%; top: 40%; }
          10% { left: 15%; top: 10%; }
          20% { left: 30%; top: 30%; }
          30% { left: 20%; top: 5%; }
          40% { left: 45%; top: 25%; }
          50% { left: 60%; top: 8%; }
          60% { left: 75%; top: 35%; }
          70% { left: 85%; top: 10%; }
          80% { left: 70%; top: 40%; }
          90% { left: 40%; top: 15%; }
          100% { left: 0%; top: 40%; }
        }
        @keyframes wingCycle {
          /* Flap phase — wings move up and down */
          0% { transform: scaleY(1); }
          3% { transform: scaleY(0.85); }
          6% { transform: scaleY(1.05); }
          9% { transform: scaleY(0.85); }
          12% { transform: scaleY(1.05); }
          15% { transform: scaleY(0.85); }
          18% { transform: scaleY(1); }
          /* Glide phase — wings steady */
          20% { transform: scaleY(1.02); }
          45% { transform: scaleY(1.02); }
          /* Flap again */
          48% { transform: scaleY(0.85); }
          51% { transform: scaleY(1.05); }
          54% { transform: scaleY(0.85); }
          57% { transform: scaleY(1.05); }
          60% { transform: scaleY(1); }
          /* Glide */
          62% { transform: scaleY(1.02); }
          90% { transform: scaleY(1.02); }
          /* Brief flap before loop */
          93% { transform: scaleY(0.85); }
          96% { transform: scaleY(1.05); }
          100% { transform: scaleY(1); }
        }
        @keyframes beamFade {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
