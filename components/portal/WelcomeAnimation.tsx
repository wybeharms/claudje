"use client";

import ClaudjeBird, { MiniBird } from "./ClaudjeBird";

interface WelcomeAnimationProps {
  competitors: Array<{ name: string; website: string }>;
}

export default function WelcomeAnimation({ competitors }: WelcomeAnimationProps) {
  const comps = competitors.slice(0, 5);

  return (
    <div className="rounded-2xl border border-[var(--color-border-warm)] bg-white p-6 overflow-hidden">
      <div className="relative h-56">
        {/* Main bird — continuous orbit */}
        <div className="absolute animate-[birdOrbit_8s_ease-in-out_infinite]">
          <ClaudjeBird size={48} />
        </div>

        {/* Competitor labels with mini-birds hovering next to them */}
        {comps.map((c, i) => {
          const total = comps.length;
          // Spread competitors vertically on the right side
          const top = 12 + (i * (76 / Math.max(total - 1, 1)));
          const left = 55 + (i % 2 === 0 ? 0 : 10);

          return (
            <div
              key={i}
              className="absolute flex items-center gap-2"
              style={{ top: `${top}%`, left: `${left}%` }}
            >
              <div
                className="animate-[birdHover_2s_ease-in-out_infinite]"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <MiniBird size={18} color="var(--color-accent)" />
              </div>
              <span className="rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent-dark)]">
                {c.name || c.website}
              </span>
            </div>
          );
        })}
      </div>

      {/* Status text */}
      <div className="text-center">
        <p className="text-sm font-medium text-[var(--color-text-primary)]">
          Your intelligence pipeline is being set up
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
          We&apos;re configuring your analysis — your first report will arrive within 24 hours.
        </p>
      </div>

      <style jsx>{`
        @keyframes birdOrbit {
          0% { left: 5%; top: 40%; transform: scaleX(1); }
          25% { left: 35%; top: 10%; transform: scaleX(1); }
          45% { left: 50%; top: 30%; transform: scaleX(1); }
          50% { left: 45%; top: 45%; transform: scaleX(-1); }
          75% { left: 15%; top: 65%; transform: scaleX(-1); }
          95% { left: 2%; top: 45%; transform: scaleX(-1); }
          100% { left: 5%; top: 40%; transform: scaleX(1); }
        }
        @keyframes birdHover {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
