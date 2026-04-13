"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ClaudjeBird from "../portal/ClaudjeBird";

const steps = [
  {
    number: "1",
    title: "Tell Us Who to Watch",
    description:
      "Name up to 5, 10, or 15 competitors. Any industry.",
  },
  {
    number: "2",
    title: "We Manage Your Agents",
    description:
      "claudje deploys managed agents that monitor websites, reviews, LinkedIn, and pricing. They pull verified data from professional sources.",
  },
  {
    number: "3",
    title: "You Get a Clear Report",
    description:
      "What changed, what it means, and what to watch. In your inbox, weekly or daily.",
  },
];

const TYPING_NAMES = ["Baker's Delight", "SmileDental", "DrainMasters", "FitZone", "GreenClean"];

/** Typing animation for Step 1 */
function TypingInput({ active }: { active: boolean }) {
  const [text, setText] = useState("");
  const [nameIdx, setNameIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pause" | "deleting">("typing");

  useEffect(() => {
    if (!active) { setText(""); return; }
    const name = TYPING_NAMES[nameIdx];

    if (phase === "typing") {
      if (text.length < name.length) {
        const t = setTimeout(() => setText(name.slice(0, text.length + 1)), 70);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("pause"), 1200);
      return () => clearTimeout(t);
    }
    if (phase === "pause") {
      const t = setTimeout(() => setPhase("deleting"), 0);
      return () => clearTimeout(t);
    }
    if (phase === "deleting") {
      if (text.length > 0) {
        const t = setTimeout(() => setText(text.slice(0, -1)), 35);
        return () => clearTimeout(t);
      }
      setNameIdx((nameIdx + 1) % TYPING_NAMES.length);
      setPhase("typing");
    }
  }, [active, text, phase, nameIdx]);

  return (
    <div className="mt-3 inline-flex items-center rounded-lg border border-border-warm bg-white px-3 py-2 shadow-sm">
      <span className="text-xs text-text-muted mr-1">Competitor:</span>
      <span className="text-xs font-medium text-text-primary">{text}</span>
      <span className="ml-px animate-pulse text-xs text-gold">|</span>
    </div>
  );
}

/**
 * Continuous sub-agent spawn: mini mascots fly out from top-right of the
 * main mascot diagonally up-right, fading as they go. A new one spawns
 * every ~1.5s. Rendered as an overlay anchored to the title row.
 */
function SubAgentSpawn({ active }: { active: boolean }) {
  const [agents, setAgents] = useState<{ id: number; dx: number; dy: number; born: number }[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    if (!active) { setAgents([]); return; }
    const spawn = () => {
      const id = nextId.current++;
      // Fly up-right: random angle between -15 and -55 degrees
      const angle = (-15 - Math.random() * 40) * (Math.PI / 180);
      const dist = 80 + Math.random() * 40;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist;
      setAgents((prev) => {
        // Remove agents older than 2.5s
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
    // Origin: positioned so spawn point is at the mascot's wing tip (top-right)
    <div className="pointer-events-none absolute -top-6 left-full -ml-3 h-32 w-40 overflow-visible">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="absolute left-0 top-4"
          style={{
            animation: "subAgentFlyOut 2s ease-out forwards",
            ["--dx" as string]: `${agent.dx}px`,
            ["--dy" as string]: `${agent.dy}px`,
          }}
        >
          <ClaudjeBird size={14} />
        </div>
      ))}

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
    </div>
  );
}

export default function HowItWorks() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>([false, false, false]);

  const updateVisibility = useCallback((index: number, isVisible: boolean) => {
    setVisible((prev) => {
      if (prev[index] === isVisible) return prev;
      const next = [...prev];
      next[index] = isVisible;
      return next;
    });
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          updateVisibility(i, entry.isIntersecting);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [updateVisibility]);

  return (
    <section id="how-it-works" className="bg-cream px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-heading text-2xl md:text-3xl">How It Works</h2>
        <p className="mt-3 text-sm text-text-muted md:text-base">
          Three steps. No software to install.
        </p>

        {/* Staggered timeline */}
        <div className="relative mt-14">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-silver/30 md:left-1/2 md:-translate-x-px" />

          <div className="space-y-4">
            {steps.map((step, i) => {
              const isRight = i % 2 === 1;
              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className={`relative transition-all duration-700 ease-out ${
                    visible[i]
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                >
                  {/* Mobile layout */}
                  <div className="flex items-start gap-6 md:hidden">
                    <div className="silver-metallic relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-brown shadow-md">
                      {step.number}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="relative inline-flex items-center gap-2 text-base font-semibold">
                        {step.title}
                        {i === 1 && (
                          <>
                            <ClaudjeBird size={28} className="translate-y-px" />
                            <SubAgentSpawn active={visible[1]} />
                          </>
                        )}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {step.description}
                      </p>
                      {i === 0 && <TypingInput active={visible[0]} />}
                    </div>
                  </div>

                  {/* Desktop layout — staggered */}
                  <div className="hidden items-center md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-10">
                    <div className={!isRight ? "text-right" : ""}>
                      {!isRight && (
                        <>
                          <h3 className="text-base font-semibold">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">
                            {step.description}
                          </p>
                          {i === 0 && (
                            <div className="flex justify-end">
                              <TypingInput active={visible[0]} />
                            </div>
                          )}
                        </>
                      )}
                    </div>

                    <div className="silver-metallic relative z-10 flex h-12 w-12 items-center justify-center rounded-full font-heading text-lg text-white shadow-md">
                      {step.number}
                    </div>

                    <div>
                      {isRight && (
                        <>
                          <h3 className="relative inline-flex items-center gap-2 text-base font-semibold">
                            {step.title}
                            {i === 1 && (
                              <>
                                <ClaudjeBird size={28} className="translate-y-px" />
                                <SubAgentSpawn active={visible[1]} />
                              </>
                            )}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">
                            {step.description}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Human-reviewed banner */}
        <div className="mt-12 flex items-center justify-center gap-3 rounded-xl bg-gold/20 px-6 py-4">
          <svg
            className="h-5 w-5 flex-shrink-0 text-gold"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <p className="text-sm text-text-muted md:text-base">
            Every report is{" "}
            <span className="font-medium text-brown">
              reviewed by an analyst
            </span>{" "}
            before delivery. AI does the heavy lifting, we ensure quality.
          </p>
        </div>

        {/* Learn more links */}
        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
          <a
            href="/product"
            className="text-sm text-gold-dark transition-colors hover:text-brown"
          >
            See what&apos;s in a report &rarr;
          </a>
          <a
            href="/technology"
            className="text-sm text-gold-dark transition-colors hover:text-brown"
          >
            How our agents work &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
