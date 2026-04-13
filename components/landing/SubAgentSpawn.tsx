"use client";

import { useEffect, useRef, useState } from "react";
import ClaudjeBird from "../portal/ClaudjeBird";

/**
 * Main mascot that continuously spawns mini sub-agents flying up-right.
 * Used on the Technology page next to "Meet Your Agents".
 */
export default function SubAgentSpawn({ active }: { active: boolean }) {
  const [agents, setAgents] = useState<{ id: number; dx: number; dy: number; born: number }[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (!active) { setAgents([]); return; }
    const spawn = () => {
      const id = nextId.current++;
      const angle = (-15 - Math.random() * 40) * (Math.PI / 180);
      const dist = 80 + Math.random() * 40;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      setAgents((prev) => {
        const now = Date.now();
        const fresh = prev.filter((a) => now - a.born < 2500);
        return [...fresh, { id, dx, dy, born: now }];
      });
    };
    spawn();
    const interval = setInterval(spawn, 1500);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <span className="relative inline-flex items-center gap-2">
      <ClaudjeBird size={28} className="translate-y-px" />
      <span className="pointer-events-none absolute -top-6 left-full -ml-3 h-32 w-40 overflow-visible">
        {agents.map((agent) => (
          <span
            key={agent.id}
            className="absolute left-0 top-4"
            style={{
              animation: "subAgentFlyOut 2s ease-out forwards",
              ["--dx" as string]: `${agent.dx}px`,
              ["--dy" as string]: `${agent.dy}px`,
            }}
          >
            <ClaudjeBird size={14} />
          </span>
        ))}
      </span>

      <style jsx global>{`
        @keyframes subAgentFlyOut {
          0% {
            transform: translate(0, 0) scale(0.9);
            opacity: 0.75;
          }
          15% {
            opacity: 0.65;
          }
          100% {
            transform: translate(var(--dx), var(--dy)) scale(0.4);
            opacity: 0;
          }
        }
      `}</style>
    </span>
  );
}
