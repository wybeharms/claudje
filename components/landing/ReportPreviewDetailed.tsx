"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import {
  AdsFragment,
  AdsIcon,
  AIFragment,
  AIIcon,
  LightningIcon,
  PricingFragment,
  PricingIcon,
  RecommendationsFragment,
  ReviewsFragment,
  ReviewsIcon,
} from "./ReportFragments";

type TabId = "pricing" | "reviews" | "advertising" | "ai" | "recommendations";

type Tab = {
  id: TabId;
  label: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
  render: () => ReactNode;
};

const tabs: Tab[] = [
  {
    id: "pricing",
    label: "Pricing Intelligence",
    description: "Track every price move, automatically.",
    Icon: PricingIcon,
    render: () => <PricingFragment />,
  },
  {
    id: "reviews",
    label: "Reviews & Reputation",
    description: "See where trust is won and lost.",
    Icon: ReviewsIcon,
    render: () => <ReviewsFragment />,
  },
  {
    id: "advertising",
    label: "Advertising Intelligence",
    description: "Who is paying for attention — and who isn't.",
    Icon: AdsIcon,
    render: () => <AdsFragment />,
  },
  {
    id: "ai",
    label: "AI Discoverability",
    description: "Your market ranking inside ChatGPT answers.",
    Icon: AIIcon,
    render: () => <AIFragment />,
  },
  {
    id: "recommendations",
    label: "Strategic Recommendations",
    description: "What to actually do about it, this week.",
    Icon: LightningIcon,
    render: () => <RecommendationsFragment />,
  },
];

export default function ReportPreviewDetailed() {
  const [active, setActive] = useState<TabId>("pricing");
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section className="bg-cream px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-dark">
            What You Get
          </p>
          <h2 className="mt-3 font-heading text-2xl md:text-3xl">
            Five signals, one report
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-muted md:text-base">
            Every weekly report covers the five categories below. Each one is
            drawn from real data we track — pricing tables, review sentiment,
            ad activity, AI visibility, and the actions that follow from it.
          </p>
        </div>

        <div className="mt-14 md:grid md:grid-cols-[260px_1fr] md:gap-10 lg:gap-14">
          {/* Desktop: editorial vertical nav */}
          <nav className="hidden md:block" aria-label="Report sections">
            <ul className="space-y-1">
              {tabs.map((t) => {
                const isActive = t.id === active;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => setActive(t.id)}
                      className={`group flex w-full items-start gap-3 border-l-2 py-3.5 pl-5 pr-3 text-left transition-all ${
                        isActive
                          ? "border-gold bg-white text-brown shadow-sm"
                          : "border-transparent text-text-muted hover:border-border-warm hover:bg-white/60 hover:text-brown"
                      }`}
                    >
                      <t.Icon
                        className={`mt-0.5 h-4 w-4 shrink-0 transition-colors ${
                          isActive
                            ? "text-gold"
                            : "text-text-muted/60 group-hover:text-text-muted"
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-tight">
                          {t.label}
                        </p>
                        <p
                          className={`mt-1 text-[11px] leading-snug ${
                            isActive
                              ? "text-text-muted"
                              : "text-text-muted/70"
                          }`}
                        >
                          {t.description}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile: underlined tabs that scroll horizontally */}
          <nav
            className="md:hidden -mx-6 overflow-x-auto border-b border-border-warm"
            aria-label="Report sections"
          >
            <div className="flex gap-1 px-6">
              {tabs.map((t) => {
                const isActive = t.id === active;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActive(t.id)}
                    className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-xs whitespace-nowrap transition-all ${
                      isActive
                        ? "border-gold text-brown"
                        : "border-transparent text-text-muted"
                    }`}
                  >
                    <t.Icon
                      className={`h-3.5 w-3.5 ${
                        isActive ? "text-gold" : "text-text-muted"
                      }`}
                    />
                    <span className="font-semibold">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Fragment display */}
          <div className="mt-8 md:mt-0">{activeTab.render()}</div>
        </div>
      </div>
    </section>
  );
}
