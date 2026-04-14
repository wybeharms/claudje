"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import TerminalAnimation from "./TerminalAnimation";
import { useI18n } from "@/context/I18nContext";

const TYPING_NAMES = ["Baker's Delight", "SmileDental", "DrainMasters", "FitZone", "GreenClean"];

/** Mini report cover card for Step 3 */
function MiniReportCard({ visible }: { visible: boolean }) {
  return (
    <div
      className={`mt-4 inline-block w-52 overflow-hidden rounded-lg border border-border-warm bg-white shadow-md transition-all duration-700 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {/* Dark brown header */}
      <div className="flex items-center gap-2 bg-brown px-3 py-2">
        <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-gold/20">
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 text-gold" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
        <span className="text-[9px] font-semibold tracking-wide text-cream">
          claudje
        </span>
      </div>
      {/* Report body */}
      <div className="px-3 py-3">
        <p className="text-[9px] font-bold text-brown">
          Competitor Intelligence Report
        </p>
        <p className="mt-0.5 text-[7px] text-text-muted">
          Company Overview &middot; Week 16
        </p>
        {/* Mini stats row */}
        <div className="mt-2 flex gap-2">
          <div className="rounded bg-brown/8 px-1.5 py-1">
            <p className="text-[7px] font-semibold uppercase tracking-wider text-text-muted">Competitors</p>
            <p className="text-[10px] font-bold text-brown">10</p>
          </div>
          <div className="rounded bg-brown/8 px-1.5 py-1">
            <p className="text-[7px] font-semibold uppercase tracking-wider text-text-muted">Sector</p>
            <p className="text-[10px] font-bold text-brown">Business</p>
          </div>
        </div>
        {/* Fake content lines */}
        <div className="mt-2.5 space-y-1">
          <div className="h-1 w-full rounded-full bg-silver/25" />
          <div className="h-1 w-11/12 rounded-full bg-silver/25" />
          <div className="h-1 w-9/12 rounded-full bg-silver/25" />
          <div className="h-1 w-10/12 rounded-full bg-silver/25" />
        </div>
      </div>
    </div>
  );
}

/** Typing animation for Step 1 */
function TypingInput({ active, label }: { active: boolean; label: string }) {
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
      <span className="text-xs text-text-muted mr-1">{label}</span>
      <span className="text-xs font-medium text-text-primary">{text}</span>
      <span className="ml-px animate-pulse text-xs text-gold">|</span>
    </div>
  );
}

export default function HowItWorks() {
  const { messages } = useI18n();
  const t = messages.howItWorks;
  const steps = [
    { number: "1", title: t.step1Title, description: t.step1Desc },
    { number: "2", title: t.step2Title, description: t.step2Desc },
    { number: "3", title: t.step3Title, description: t.step3Desc },
  ];
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
        <h2 className="text-center font-heading text-2xl md:text-3xl">{t.title}</h2>
        <p className="mt-3 text-center text-sm text-text-muted md:text-base">
          {t.subtitle}
        </p>

        {/* Staggered timeline */}
        <div className="relative mt-10">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-silver/30 md:left-1/2 md:-translate-x-px" />

          <div className="-space-y-4 md:-space-y-6">
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
                    <div className="silver-metallic relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-brown/80 shadow-md">
                      {step.number}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">
                        {step.description}
                      </p>
                      {i === 0 && <TypingInput active={visible[0]} label={t.typingLabel} />}
                      {i === 1 && <TerminalAnimation active={visible[1]} />}
                      {i === 2 && <MiniReportCard visible={visible[2]} />}
                    </div>
                  </div>

                  {/* Desktop layout — staggered */}
                  <div className="hidden items-center md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-10">
                    <div className={!isRight ? "text-right" : ""}>
                      {!isRight && i !== 2 && (
                        <>
                          <h3 className="text-base font-semibold">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">
                            {step.description}
                          </p>
                          {i === 0 && (
                            <div className="flex justify-end">
                              <TypingInput active={visible[0]} label={t.typingLabel} />
                            </div>
                          )}
                        </>
                      )}
                      {!isRight && i === 2 && (
                        <div className="flex items-center gap-5 text-left">
                          <MiniReportCard visible={visible[2]} />
                          <div className="flex-1">
                            <h3 className="text-base font-semibold">
                              {step.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="silver-metallic relative z-10 flex h-12 w-12 items-center justify-center rounded-full font-heading text-lg text-brown/80 shadow-md">
                      {step.number}
                    </div>

                    <div>
                      {isRight && (
                        <>
                          <h3 className="text-base font-semibold">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-text-muted md:text-base">
                            {step.description}
                          </p>
                          <TerminalAnimation active={visible[1]} />
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
            {t.analystBefore}
            <span className="font-medium text-brown">{t.analystHighlight}</span>
            {t.analystAfter}
          </p>
        </div>

        {/* Learn more links */}
        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-6">
          <a
            href="/product"
            className="text-sm text-gold-dark transition-colors hover:text-brown"
          >
            {t.learnMoreReport} &rarr;
          </a>
          <a
            href="/technology"
            className="text-sm text-gold-dark transition-colors hover:text-brown"
          >
            {t.learnMoreAgents} &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
