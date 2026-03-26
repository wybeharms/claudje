"use client";

import { useState, useEffect } from "react";
import { FlyingEagle } from "./ClaudjeBird";

interface WelcomeAnimationProps {
  competitors: Array<{ name: string; website: string }>;
}

export default function WelcomeAnimation({ competitors }: WelcomeAnimationProps) {
  const comps = competitors.slice(0, 5);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Sync pill highlights with back-and-forth flight path
  useEffect(() => {
    const cycleDuration = 5000;
    const totalTicks = comps.length * 2;
    const tickInterval = cycleDuration / totalTicks;
    let tick = 0;

    const timer = setInterval(() => {
      const current = tick % totalTicks;
      if (current < comps.length) {
        // Left-to-right pass
        setActiveIndex(current);
      } else {
        // Right-to-left pass (reverse)
        setActiveIndex(comps.length - 1 - (current - comps.length));
      }
      tick++;
    }, tickInterval);

    setActiveIndex(0);
    return () => clearInterval(timer);
  }, [comps.length]);

  return (
    <div className="relative mb-6">
      {/* Flight area */}
      <div className="relative h-32 w-full overflow-hidden">
        <div className="eagle-flight absolute">
          <div className="eagle-bob">
            <FlyingEagle size={96} />
          </div>
        </div>
      </div>

      {/* Competitor pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {comps.map((c, i) => (
          <span
            key={i}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-700 ease-in-out ${
              i === activeIndex
                ? "bg-[var(--color-accent)] text-white scale-110 shadow-lg shadow-[var(--color-accent)]/25"
                : "bg-[var(--color-accent)]/10 text-[var(--color-accent-dark)] scale-100"
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

      <style jsx global>{`
        .eagle-flight {
          animation: eagleFly 5s ease-in-out infinite;
        }
        .eagle-bob {
          animation: eagleBob 4s ease-in-out infinite;
        }
        .eagle-wing {
          animation: wingFlap 4s ease-in-out infinite;
        }
        .eagle-wing-far {
          animation: wingFlapFar 4s ease-in-out infinite;
        }

        @keyframes eagleFly {
          0%    { left: 0%; transform: scaleX(1) scale(1); top: 25%; }
          24%   { left: 40%; transform: scaleX(1) scale(0.82); top: 8%; }
          49%   { left: 80%; transform: scaleX(1) scale(1); top: 22%; }
          50%   { left: 80%; transform: scaleX(-1) scale(1); top: 22%; }
          75%   { left: 40%; transform: scaleX(-1) scale(0.82); top: 5%; }
          99%   { left: 0%; transform: scaleX(-1) scale(1); top: 20%; }
          100%  { left: 0%; transform: scaleX(1) scale(1); top: 25%; }
        }

        @keyframes eagleBob {
          0%   { transform: translateY(0); }
          10%  { transform: translateY(-8px); }
          20%  { transform: translateY(-14px); }
          30%  { transform: translateY(-10px); }
          35%  { transform: translateY(-6px); }
          65%  { transform: translateY(6px); }
          85%  { transform: translateY(4px); }
          100% { transform: translateY(0); }
        }

        @keyframes wingFlap {
          0%, 35%, 100% { transform: rotate(3deg); }
          5%   { transform: rotate(-25deg); }
          10%  { transform: rotate(8deg); }
          15%  { transform: rotate(-25deg); }
          20%  { transform: rotate(8deg); }
          25%  { transform: rotate(-25deg); }
          30%  { transform: rotate(8deg); }
        }

        @keyframes wingFlapFar {
          0%, 35%, 100% { transform: rotate(-2deg); }
          5%   { transform: rotate(18deg); }
          10%  { transform: rotate(-5deg); }
          15%  { transform: rotate(18deg); }
          20%  { transform: rotate(-5deg); }
          25%  { transform: rotate(18deg); }
          30%  { transform: rotate(-5deg); }
        }
      `}</style>
    </div>
  );
}
