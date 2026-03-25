"use client";

import ClaudjeBird from "./ClaudjeBird";

interface WelcomeAnimationProps {
  competitors: Array<{ name: string; website: string }>;
}

export default function WelcomeAnimation({ competitors }: WelcomeAnimationProps) {
  const comps = competitors.slice(0, 5);

  return (
    <div className="relative mb-8">
      {/* Eagle — flies around the page continuously */}
      <div className="relative h-52 flex items-start justify-center">
        <div className="animate-[eagleFly_8s_ease-in-out_infinite]">
          <div className="animate-[wingFlap_0.6s_ease-in-out_infinite]">
            <ClaudjeBird size={64} />
          </div>
        </div>

        {/* Scan beams — pulse every 4s from eagle position to pills */}
        <div className="absolute inset-0 pointer-events-none">
          {comps.map((_, i) => {
            const total = comps.length;
            // Fan out beams from center-top toward bottom pill positions
            const startX = 50;
            const startY = 15;
            const endX = 15 + (i * (70 / Math.max(total - 1, 1)));
            const endY = 95;

            return (
              <svg
                key={i}
                className="absolute inset-0 w-full h-full animate-[beamPulse_4s_ease-in-out_infinite]"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <line
                  x1={`${startX}%`}
                  y1={`${startY}%`}
                  x2={`${endX}%`}
                  y2={`${endY}%`}
                  stroke="#C9A96E"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />
              </svg>
            );
          })}
        </div>
      </div>

      {/* Competitor pills — the "floor" being scanned */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {comps.map((c, i) => (
          <span
            key={i}
            className="rounded-full bg-[var(--color-accent)]/10 px-4 py-1.5 text-sm font-medium text-[var(--color-accent-dark)] animate-[beamPulse_4s_ease-in-out_infinite]"
            style={{ animationDelay: `${i * 0.3}s` }}
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
          0% { transform: translate(0, 0); }
          20% { transform: translate(60px, -15px); }
          40% { transform: translate(-40px, -25px); }
          60% { transform: translate(30px, -5px); }
          80% { transform: translate(-50px, -20px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes wingFlap {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.92); }
        }
        @keyframes beamPulse {
          0%, 60%, 100% { opacity: 0; }
          70%, 90% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
