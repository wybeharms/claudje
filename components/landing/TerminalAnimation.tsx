"use client";

import { useEffect, useRef, useState } from "react";

const SCRIPT: { type: "cmd" | "output" | "pause"; text?: string; color?: string; delay?: number }[] = [
  { type: "cmd", text: "$ claudje research --competitor \"Baker's Delight\"" },
  { type: "output", text: "● Searching Google Maps reviews...        done", color: "blue" },
  { type: "output", text: "● Checking Chamber of Commerce filings... done", color: "blue" },
  { type: "output", text: "● Analyzing pricing pages...              done", color: "blue" },
  { type: "output", text: "● Scanning LinkedIn activity...           done", color: "blue" },
  { type: "output", text: "● Generating report section...            done", color: "green" },
  { type: "pause", delay: 800 },
  { type: "cmd", text: "$ claudje verify --report 2026-W15" },
  { type: "output", text: "● Cross-referencing 47 data points...     done", color: "blue" },
  { type: "output", text: "● Flagging 3 items for analyst review...  done", color: "green" },
  { type: "pause", delay: 600 },
  { type: "cmd", text: "$ claudje deliver --to inbox" },
  { type: "output", text: "● Report ready. Sent to client.", color: "gold" },
  { type: "pause", delay: 1500 },
  { type: "cmd", text: "$ claudje research --competitor \"SmileDental\"" },
  { type: "output", text: "● Searching Google Maps reviews...        done", color: "blue" },
  { type: "output", text: "● Checking Trustpilot ratings...          done", color: "blue" },
  { type: "output", text: "● Analyzing pricing pages...              done", color: "blue" },
  { type: "output", text: "● Scanning LinkedIn activity...           done", color: "blue" },
  { type: "output", text: "● Monitoring ad campaigns...              done", color: "blue" },
  { type: "output", text: "● Generating report section...            done", color: "green" },
  { type: "pause", delay: 800 },
  { type: "cmd", text: "$ claudje verify --report 2026-W15" },
  { type: "output", text: "● Cross-referencing 52 data points...     done", color: "blue" },
  { type: "output", text: "● Flagging 1 item for analyst review...   done", color: "green" },
  { type: "pause", delay: 600 },
  { type: "cmd", text: "$ claudje deliver --to inbox" },
  { type: "output", text: "● Report ready. Sent to client.", color: "gold" },
  { type: "pause", delay: 1500 },
];

const MAX_VISIBLE = 7;

const DOT_COLORS: Record<string, string> = {
  blue: "text-blue-400",
  green: "text-green-500",
  gold: "text-gold",
};

function formatLine(text: string, color?: string) {
  if (!color) return <span>{text}</span>;

  const dotIdx = text.indexOf("●");
  if (dotIdx === -1) return <span>{text}</span>;

  return (
    <>
      <span className={DOT_COLORS[color] || ""}>{text.slice(dotIdx, dotIdx + 1)}</span>
      <span>{text.slice(dotIdx + 1)}</span>
    </>
  );
}

export default function TerminalAnimation({ active }: { active: boolean }) {
  const [lines, setLines] = useState<{ id: number; text: string; isCmd: boolean; color?: string }[]>([]);
  const [currentCmd, setCurrentCmd] = useState("");
  const runningRef = useRef(false);
  const cancelRef = useRef(false);
  const lineIdRef = useRef(0);

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

    function addLine(text: string, isCmd: boolean, color?: string) {
      const id = lineIdRef.current++;
      setLines((prev) => {
        const next = [...prev, { id, text, isCmd, color }];
        if (next.length > MAX_VISIBLE) {
          return next.slice(next.length - MAX_VISIBLE);
        }
        return next;
      });
    }

    async function typeCmd(text: string) {
      for (let i = 0; i <= text.length; i++) {
        if (cancelRef.current) return;
        setCurrentCmd(text.slice(0, i));
        await sleep(30);
      }
      await sleep(300);
      addLine(text, true);
      setCurrentCmd("");
    }

    async function run() {
      while (!cancelRef.current) {
        for (const step of SCRIPT) {
          if (cancelRef.current) return;

          if (step.type === "cmd" && step.text) {
            await typeCmd(step.text);
          } else if (step.type === "output" && step.text) {
            await sleep(400);
            if (cancelRef.current) return;
            addLine(step.text, false, step.color);
          } else if (step.type === "pause") {
            await sleep(step.delay || 500);
          }
        }
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
      {/* Terminal body — fixed height, no scroll */}
      <div className="h-[140px] overflow-hidden px-3 py-2 font-mono text-[11px] leading-relaxed">
        {lines.map((line) => (
          <div
            key={line.id}
            className={line.isCmd ? "text-gold-dark font-semibold" : "text-text-muted"}
          >
            {line.isCmd ? line.text : formatLine(line.text, line.color)}
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
