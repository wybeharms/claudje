"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ClaudjeBird from "../portal/ClaudjeBird";
import { useI18n } from "@/context/I18nContext";

export default function WhyClaudje() {
  const { messages } = useI18n();
  const t = messages.whyClaudje;
  const introRef = useRef<HTMLDivElement>(null);
  const [introVisible, setIntroVisible] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);

  // One-shot reveal for intro
  useEffect(() => {
    const el = introRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntroVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Bidirectional scroll-tied animation for cards
  useEffect(() => {
    const container = cardsRef.current;
    const left = leftCardRef.current;
    const right = rightCardRef.current;
    if (!container || !left || !right) return;

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isMobile = window.innerWidth < 768;
      const start = windowHeight * 0.95;
      const end = windowHeight * 0.3;
      const raw = (start - rect.top) / (start - end);
      const p = Math.max(0, Math.min(1, raw));

      // Ease-in-out
      const eased =
        p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

      if (isMobile) {
        left.style.transform = `translateY(${(1 - eased) * 40}px)`;
        right.style.transform = `translateY(${(1 - eased) * 40}px)`;
      } else {
        left.style.transform = `translateX(${(1 - eased) * -80}px)`;
        right.style.transform = `translateX(${(1 - eased) * 80}px)`;
      }
      left.style.opacity = String(eased);
      right.style.opacity = String(eased);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="bg-cream-dark px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-heading text-2xl md:text-3xl">
          {t.title}
        </h2>

        {/* Intro */}
        <div
          ref={introRef}
          className={`mx-auto mt-8 max-w-2xl text-center transition-all duration-700 ${
            introVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
        >
          <div className="flex items-center justify-center gap-4">
            <Image
              src="/images/openai.png"
              alt="OpenAI"
              width={28}
              height={28}
              className="opacity-60"
            />
            <Image
              src="/images/claude.png"
              alt="Claude"
              width={28}
              height={28}
              className="opacity-60"
            />
          </div>
          <p className="mt-4 text-sm leading-relaxed text-text-primary md:text-base">
            {t.introBefore}
            <strong>{t.introHighlight}</strong>
            {t.introAfter}
          </p>
        </div>

        {/* Two columns with scroll-tied animation — subgrid for equal card heights */}
        <div ref={cardsRef} className="mt-12 grid gap-x-8 gap-y-4 md:grid-cols-2 md:grid-rows-[auto_1fr]">
          {/* Left: chatbot — flies in from left */}
          <div
            ref={leftCardRef}
            className="flex flex-col md:row-span-2 md:grid md:grid-rows-subgrid"
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              willChange: "transform, opacity",
            }}
          >
            <p className="mb-4 text-center text-sm leading-relaxed text-text-muted md:text-base">
              {t.chatbotIntroBefore}
              <strong>{t.chatbotIntroHighlight}</strong>
            </p>

            {/* Fake ChatGPT card */}
            <div className="flex flex-col rounded-xl border border-silver/40 bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10a37f]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="white"
                  >
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-text-muted/60">
                  {t.fakeChatLabel}
                </span>
              </div>
              <div className="flex-1 space-y-2.5 text-[13px] leading-relaxed text-text-muted/50">
                <p>
                  {t.fakeFoundAbout}
                  <strong className="text-text-muted/60">{t.fakeCompetitorName}</strong>
                  {t.fakeFoundColon}
                </p>
                <p>{t.fakeSummary}</p>
                <p>{t.fakePricing}</p>
                <p className="italic text-text-muted/40">{t.fakeDisclaimer}</p>
              </div>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                <span className="rounded-full bg-silver/10 px-2.5 py-0.5 text-[11px] text-silver-dark">
                  {t.chatBadgeEstimates}
                </span>
                <span className="rounded-full bg-silver/10 px-2.5 py-0.5 text-[11px] text-silver-dark">
                  {t.chatBadgeSnapshot}
                </span>
              </div>
            </div>
          </div>

          {/* Right: claudje — flies in from right */}
          <div
            ref={rightCardRef}
            className="flex flex-col md:row-span-2 md:grid md:grid-rows-subgrid"
            style={{
              opacity: 0,
              transform: "translateY(40px)",
              willChange: "transform, opacity",
            }}
          >
            <p className="mb-4 text-center text-sm leading-relaxed text-text-muted md:text-base">
              {t.claudjeIntroBefore}
              <strong>{t.claudjeIntroHighlight1}</strong>
              {t.claudjeIntroMiddle}
              <strong>{t.claudjeIntroHighlight2}</strong>
              {t.claudjeIntroAfter}
            </p>

            {/* claudje card */}
            <div className="flex flex-col rounded-xl border-2 border-gold bg-white p-5 shadow-lg shadow-black/10">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5 text-gold"
                    fill="currentColor"
                  >
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-brown">
                  {t.claudjeReportLabel}
                </span>
                </div>
                <ClaudjeBird size={28} className="opacity-60" />
              </div>
              <div className="flex-1 space-y-2 text-[13px] leading-relaxed">
                {/* Recommendation */}
                <div className="rounded-lg bg-cream/60 p-3">
                  <div className="flex items-start gap-2.5">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-text-primary">{t.recommendationItem}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-[11px] text-gold">{t.recommendationSource}</span>
                        <span className="inline-flex items-center rounded-full bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-700">{t.recommendationBadge}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hiring */}
                <div className="rounded-lg bg-cream/60 p-3">
                  <div className="flex items-start gap-2.5">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-text-primary">{t.hiringItem}</p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-[11px] text-gold">{t.hiringSource}</span>
                        <span className="inline-flex items-center rounded-full bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-700">{t.hiringBadge}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing */}
                <div className="rounded-lg bg-cream/60 p-3">
                  <div className="flex items-start gap-2.5">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-text-primary">
                        <strong className="text-brown">{t.pricingItemBold}</strong>
                        {t.pricingItemRest}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-[11px] text-gold">{t.pricingSource}</span>
                        <span className="inline-flex items-center rounded-full bg-red-50 px-1.5 py-0.5 text-[10px] font-medium text-red-700">↑ +12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                <span className="rounded-full bg-gold/25 border border-gold/40 px-2.5 py-0.5 text-xs font-semibold text-gold-dark">
                  {t.claudjeBadgeSources}
                </span>
                <span className="rounded-full bg-gold/25 border border-gold/40 px-2.5 py-0.5 text-xs font-semibold text-gold-dark">
                  {t.claudjeBadgeAnalyst}
                </span>
                <span className="rounded-full bg-gold/25 border border-gold/40 px-2.5 py-0.5 text-xs font-semibold text-gold-dark">
                  {t.claudjeBadgeUpdated}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
