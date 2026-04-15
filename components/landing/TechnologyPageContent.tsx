"use client";

import { useI18n } from "@/context/I18nContext";
import Header from "./Header";
import Footer from "./Footer";
import AgentArchitecture from "./AgentArchitecture";
import AgentRoster from "./AgentRoster";

export default function TechnologyPageContent() {
  const { messages } = useI18n();
  const t = messages.technology;

  return (
    <>
      <Header />

      <section className="bg-brown px-6 py-16 text-text-on-dark lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl font-light tracking-tight md:text-4xl">
            {t.heroTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-on-dark-muted md:text-base">
            {t.heroBody}
          </p>
        </div>
      </section>

      <AgentArchitecture />
      <AgentRoster />

      <section className="bg-cream px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15">
            <svg
              className="h-7 w-7 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
          <h2 className="mt-5 font-heading text-2xl md:text-3xl">
            {t.humanLoopTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-muted md:text-base">
            {t.humanLoopBody}
          </p>
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-3">
            <div className="flex-1 rounded-lg border border-border-warm bg-white px-3 py-2 text-center">
              <p className="text-xs font-semibold text-text-primary">
                {t.humanLoopAiLabel}
              </p>
              <p className="mt-0.5 text-[10px] text-text-muted">
                {t.humanLoopAiSub}
              </p>
            </div>
            <svg
              className="h-4 w-4 shrink-0 text-gold/60"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M3 1l5 5-5 5V1z" />
            </svg>
            <div className="flex-1 rounded-lg border-2 border-gold bg-white px-3 py-2 text-center shadow-sm">
              <p className="text-xs font-semibold text-gold-dark">
                {t.humanLoopAnalystLabel}
              </p>
              <p className="mt-0.5 text-[10px] text-text-muted">
                {t.humanLoopAnalystSub}
              </p>
            </div>
            <svg
              className="h-4 w-4 shrink-0 text-gold/60"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M3 1l5 5-5 5V1z" />
            </svg>
            <div className="flex-1 rounded-lg border border-border-warm bg-white px-3 py-2 text-center">
              <p className="text-xs font-semibold text-text-primary">
                {t.humanLoopReceiveLabel}
              </p>
              <p className="mt-0.5 text-[10px] text-text-muted">
                {t.humanLoopReceiveSub}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
