"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export default function WhyClaudje() {
  const block1 = useScrollReveal();
  const colLeft = useScrollReveal(0.5);
  const colRight = useScrollReveal(0.5);

  return (
    <section className="bg-cream px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-heading text-3xl md:text-4xl">
          &ldquo;But can&rsquo;t ChatGPT do this?&rdquo;
        </h2>

        {/* Block 1: shared intro */}
        <div
          ref={block1.ref}
          className={`mx-auto mt-8 max-w-2xl text-center transition-all duration-700 ${
            block1.visible
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
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            claudje uses <strong>the same AI</strong> that powers ChatGPT and
            Claude.
          </p>
        </div>

        {/* Two columns: text + comparison cards */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Left: chatbot */}
          <div
            ref={colLeft.ref}
            className={`flex flex-col transition-all duration-700 ${
              colLeft.visible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <p className="mb-4 text-center text-sm leading-relaxed text-text-muted">
              When you ask a chatbot to research a competitor, it searches the
              web, skims the top results, and gives you a summary.{" "}
              <strong>That&rsquo;s it.</strong>
            </p>

            {/* Fake ChatGPT card */}
            <div className="flex flex-1 flex-col rounded-xl border border-border-warm bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10a37f]">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="white">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-text-muted/60">ChatGPT</span>
              </div>
              <div className="flex-1 space-y-2.5 text-[13px] leading-relaxed text-text-muted/50">
                <p>
                  Here&rsquo;s what I found about <strong className="text-text-muted/60">Competitor X</strong>:
                </p>
                <p>
                  They appear to be a mid-sized company in your space. Based on
                  their website, they offer similar services and seem to focus on
                  the European market.
                </p>
                <p>
                  Their pricing isn&rsquo;t publicly listed, but based on similar
                  companies, I&rsquo;d estimate they charge around &euro;50-100
                  per month.
                </p>
                <p className="italic text-text-muted/40">
                  Note: I don&rsquo;t have access to real-time data, so some of
                  this information may be outdated.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] text-text-muted/40">
                  Estimates only
                </span>
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] text-text-muted/40">
                  One-time snapshot
                </span>
              </div>
            </div>
          </div>

          {/* Right: claudje */}
          <div
            ref={colRight.ref}
            className={`flex flex-col transition-all duration-700 delay-200 ${
              colRight.visible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <p className="mb-4 text-center text-sm leading-relaxed text-text-muted">
              claudje deploys <strong>specialized agents</strong> with{" "}
              <strong>paid tool access</strong>. They pull verified data from 9+
              professional sources a chatbot can&rsquo;t reach.
            </p>

            {/* claudje card */}
            <div className="flex flex-1 flex-col rounded-xl border-2 border-gold/40 bg-white p-5">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-gold" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-brown">claudje report</span>
              </div>
              <div className="space-y-2.5 text-[13px] leading-relaxed text-text-muted">
                <p>
                  <strong className="text-brown">Competitor X</strong> raised
                  prices by 12% on Mar 15.
                  <span className="ml-1 text-[11px] text-gold">[pricing API]</span>
                </p>
                <p>
                  Their Trustpilot score dropped from 4.2 to 3.8 since January.
                  17 new 1-star reviews mention &ldquo;slow support.&rdquo;
                  <span className="ml-1 text-[11px] text-gold">[Trustpilot]</span>
                </p>
                <p>
                  3 new job postings on LinkedIn: 2 sales reps + 1 product
                  manager. Likely expanding into enterprise.
                  <span className="ml-1 text-[11px] text-gold">[LinkedIn]</span>
                </p>
                <p>
                  Website traffic up 23% month-over-month. Top traffic source
                  shifted from organic to paid ads.
                  <span className="ml-1 text-[11px] text-gold">[SimilarWeb]</span>
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-gold-dark">
                  9+ verified sources
                </span>
                <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-gold-dark">
                  Analyst-reviewed
                </span>
                <span className="rounded-full bg-gold/10 px-2.5 py-0.5 text-[11px] font-medium text-gold-dark">
                  Updated automatically
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
