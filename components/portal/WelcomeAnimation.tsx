"use client";

import { useState, useEffect } from "react";
import ClaudjeBird, { MiniBird } from "./ClaudjeBird";

interface WelcomeAnimationProps {
  competitors: Array<{ name: string; website: string }>;
}

export default function WelcomeAnimation({ competitors }: WelcomeAnimationProps) {
  const [phase, setPhase] = useState<"enter" | "dispatch" | "done">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("dispatch"), 800);
    const t2 = setTimeout(() => setPhase("done"), 3500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Position mini-birds in a fan pattern toward competitor names
  const competitorPositions = competitors.slice(0, 5).map((_, i) => {
    const total = Math.min(competitors.length, 5);
    const angle = -30 + (60 / Math.max(total - 1, 1)) * i;
    return {
      x: 60 + Math.cos((angle * Math.PI) / 180) * 80,
      y: 20 + Math.sin((angle * Math.PI) / 180) * 60,
      angle,
      delay: i * 0.15,
    };
  });

  return (
    <div className="rounded-2xl border border-[var(--color-border-warm)] bg-white p-6 overflow-hidden">
      <div className="relative h-48">
        {/* Main bird */}
        <div
          className="absolute left-8 top-16 transition-all duration-700 ease-out"
          style={{
            opacity: phase === "enter" ? 0 : 1,
            transform: phase === "enter" ? "translateX(-40px) scale(0.5)" : "translateX(0) scale(1)",
          }}
        >
          <ClaudjeBird size={56} />
        </div>

        {/* Mini agent birds dispatched toward competitors */}
        {phase !== "enter" && competitorPositions.map((pos, i) => (
          <div
            key={i}
            className="absolute transition-all ease-out"
            style={{
              left: phase === "dispatch" || phase === "done" ? `${pos.x}%` : "15%",
              top: phase === "dispatch" || phase === "done" ? `${pos.y}%` : "45%",
              opacity: phase === "dispatch" || phase === "done" ? 1 : 0,
              transform: `rotate(${pos.angle * 0.3}deg)`,
              transitionDuration: "1.2s",
              transitionDelay: `${pos.delay + 0.3}s`,
            }}
          >
            <MiniBird size={20} color="var(--color-accent)" />
          </div>
        ))}

        {/* Competitor name labels */}
        {competitorPositions.map((pos, i) => (
          <div
            key={`label-${i}`}
            className="absolute text-xs font-medium text-[var(--color-text-primary)] transition-all ease-out"
            style={{
              left: `${pos.x + 5}%`,
              top: `${pos.y + 8}%`,
              opacity: phase === "done" ? 1 : 0,
              transform: phase === "done" ? "translateY(0)" : "translateY(8px)",
              transitionDuration: "0.6s",
              transitionDelay: `${pos.delay + 1.5}s`,
            }}
          >
            {competitors[i]?.name || competitors[i]?.website}
          </div>
        ))}
      </div>

      {/* Status text */}
      <div
        className="mt-2 text-center transition-opacity duration-700"
        style={{
          opacity: phase === "done" ? 1 : 0,
          transitionDelay: "2s",
        }}
      >
        <p className="text-sm font-medium text-[var(--color-text-primary)]">
          Your intelligence pipeline is being set up
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
          We&apos;re configuring your analysis — your first report will arrive within 24 hours.
        </p>
      </div>
    </div>
  );
}
