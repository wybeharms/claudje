"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "1",
    title: "Tell Us Who to Watch",
    description:
      "List up to 5, 10, or 15 competitors. Any industry.",
  },
  {
    number: "2",
    title: "Our Agents Get to Work",
    description:
      "Our agents keep track of websites, reviews, LinkedIn, and pricing. Then synthesize it into clear, qualitative insights.",
  },
  {
    number: "3",
    title: "You Get a Clear Report",
    description:
      "What changed, what it means, and what to watch. In your inbox, weekly or daily.",
  },
];

export default function HowItWorks() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible((prev) => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
            obs.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="how-it-works" className="bg-cream px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-heading text-3xl md:text-4xl">How It Works</h2>
        <p className="mt-3 text-text-muted">
          Three steps. No software to install.
        </p>

        {/* Staggered timeline */}
        <div className="relative mt-14">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-silver/30 md:left-1/2 md:-translate-x-px" />

          <div className="space-y-8">
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
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Mobile layout */}
                  <div className="flex items-start gap-6 md:hidden">
                    <div className="silver-metallic relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-brown shadow-md">
                      {step.number}
                    </div>
                    <div className="pt-1">
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="mt-2 text-base leading-relaxed text-text-muted">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Desktop layout — staggered */}
                  <div className="hidden items-center md:grid md:grid-cols-[1fr_auto_1fr] md:gap-x-10">
                    <div className={!isRight ? "text-right" : ""}>
                      {!isRight && (
                        <>
                          <h3 className="text-lg font-semibold">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-base leading-relaxed text-text-muted">
                            {step.description}
                          </p>
                        </>
                      )}
                    </div>

                    <div className="silver-metallic relative z-10 flex h-12 w-12 items-center justify-center rounded-full font-heading text-lg text-white shadow-md">
                      {step.number}
                    </div>

                    <div>
                      {isRight && (
                        <>
                          <h3 className="text-lg font-semibold">
                            {step.title}
                          </h3>
                          <p className="mt-2 text-base leading-relaxed text-text-muted">
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
          <p className="text-base text-text-muted">
            Every report is{" "}
            <span className="font-medium text-brown">
              reviewed by an analyst
            </span>{" "}
            before delivery. AI does the heavy lifting, we ensure quality.
          </p>
        </div>
      </div>
    </section>
  );
}
