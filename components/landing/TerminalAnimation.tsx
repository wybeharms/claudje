"use client";

import { useEffect, useRef, useState } from "react";

const SCRIPT: { type: "cmd" | "output" | "pause"; text?: string; delay?: number }[] = [
  { type: "cmd", text: "$ claudje research --competitor \"Baker's Delight\"" },
  { type: "output", text: "  Searching Google Maps reviews...        done" },
  { type: "output", text: "  Checking Chamber of Commerce filings... done" },
  { type: "output", text: "  Analyzing pricing pages...              done" },
  { type: "output", text: "  Scanning LinkedIn activity...           done" },
  { type: "output", text: "  Generating report section...            done" },
  { type: "pause", delay: 800 },
  { type: "cmd", text: "$ claudje verify --report 2026-W15" },
  { type: "output", text: "  Cross-referencing 47 data points...     done" },
  { type: "output", text: "  Flagging 3 items for analyst review...  done" },
  { type: "pause", delay: 600 },
  { type: "cmd", text: "$ claudje deliver --to inbox" },
  { type: "output", text: "  Report ready. Sent to client." },
  { type: "pause", delay: 1500 },
];

/**
 * Fake terminal that loops through a script of commands and output lines.
 * Light theme to match the site aesthetic.
 */
export default function TerminalAnimation({ active }: { active: boolean }) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentCmd, setCurrentCmd] = useState("");
  const runningRef = useRef(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    if (!active) {
      cancelRef.current = true;
      setLines([]);
      setCurrentCmd("");
      runningRef.current = false;
      return;
    }

    if (runningRef.current) return;
    runningRef.current = true;
    cancelRef.current = false;

    async function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function typeCmd(text: string) {
      for (let i = 0; i <= text.length; i++) {
        if (cancelRef.current) return;
        setCurrentCmd(text.slice(0, i));
        await sleep(30);
      }
      await sleep(300);
      setLines((prev) => [...prev, text]);
      setCurrentCmd("");
    }

    async function run() {
      while (!cancelRef.current) {
        setLines([]);
        setCurrentCmd("");

        for (const step of SCRIPT) {
          if (cancelRef.current) return;

          if (step.type === "cmd" && step.text) {
            await typeCmd(step.text);
          } else if (step.type === "output" && step.text) {
            await sleep(400);
            if (cancelRef.current) return;
            setLines((prev) => [...prev, step.text!]);
          } else if (step.type === "pause") {
            await sleep(step.delay || 500);
          }
        }

        await sleep(2000);
      }
    }

    run();

    return () => {
      cancelRef.current = true;
    };
  }, [active]);

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-border-warm bg-white shadow-sm">
      {/* Title bar */}
      <div className="flex items-center gap-1.5 border-b border-border-warm bg-cream/60 px-3 py-1.5">
        <div className="h-2 w-2 rounded-full bg-red-300/60" />
        <div className="h-2 w-2 rounded-full bg-yellow-300/60" />
        <div className="h-2 w-2 rounded-full bg-green-300/60" />
        <span className="ml-2 text-[10px] text-text-muted">claudje-agent</span>
      </div>
      {/* Terminal body */}
      <div className="h-[140px] overflow-hidden px-3 py-2 font-mono text-[11px] leading-relaxed">
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.startsWith("$")
                ? "text-gold-dark font-semibold"
                : "text-text-muted"
            }
          >
            {line}
          </div>
        ))}
        {currentCmd && (
          <div className="text-gold-dark font-semibold">
            {currentCmd}
            <span className="animate-pulse text-gold">|</span>
          </div>
        )}
      </div>
    </div>
  );
}
