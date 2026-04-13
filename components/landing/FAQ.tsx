"use client";

import { useState } from "react";
import { useI18n } from "@/context/I18nContext";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { messages } = useI18n();
  const t = messages.faq;
  const items = t.items;

  return (
    <section id="faq" className="bg-cream px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-10 md:grid-cols-[1fr_2fr] md:gap-12">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl">{t.title}</h2>
            <p className="mt-3 text-sm text-text-muted md:text-base">
              {t.subtitle}
            </p>
          </div>

          <div className="min-h-[420px] divide-y divide-border-warm">
            {items.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="flex w-full items-start justify-between gap-4 py-4 text-left"
                >
                  <span className="text-sm font-medium">{item.question}</span>
                  <svg
                    className={`mt-0.5 h-4 w-4 shrink-0 text-gold transition-transform ${
                      openIndex === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                <div
                  className={`grid transition-all duration-200 ease-in-out ${
                    openIndex === i
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 text-sm leading-relaxed text-text-muted md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
