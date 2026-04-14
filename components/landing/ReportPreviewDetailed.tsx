"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type ComponentType,
  type ReactNode,
} from "react";
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

type TabId = "recommendations" | "pricing" | "reviews" | "advertising" | "ai";

type Tab = {
  id: TabId;
  label: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
  render: () => ReactNode;
};

const tabs: Tab[] = [
  {
    id: "recommendations",
    label: "Strategic Recommendations",
    description: "What to actually do about it, this week.",
    Icon: LightningIcon,
    render: () => <RecommendationsFragment />,
  },
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
];

export default function ReportPreviewDetailed() {
  const [active, setActive] = useState<TabId>("recommendations");
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollDriven, setScrollDriven] = useState(false);
  const mobileNavRef = useRef<HTMLElement>(null);

  // Scroll-hijack: section is 5x viewport tall, sticky inner content cycles tabs
  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    // Only activate on desktop (md+)
    if (window.innerWidth < 768) {
      setScrollDriven(false);
      return;
    }

    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollableDistance = sectionHeight - viewportHeight;

    if (scrollableDistance <= 0) return;

    // How far through the section we've scrolled (0 = top visible, 1 = bottom visible)
    const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));

    // Are we inside the scroll-hijack zone?
    const isInZone = rect.top <= 0 && rect.bottom >= viewportHeight;
    setScrollDriven(isInZone);

    if (isInZone) {
      const tabIndex = Math.min(
        tabs.length - 1,
        Math.floor(progress * tabs.length)
      );
      setActive(tabs[tabIndex].id);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Scroll mobile tab nav to keep active tab visible
  useEffect(() => {
    if (window.innerWidth >= 768) return;
    const nav = mobileNavRef.current;
    if (!nav) return;
    const activeBtn = nav.querySelector("[data-active='true']");
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [active]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream px-6 lg:px-8"
      style={{ height: "500vh" }}
    >
      {/* Sticky inner container */}
      <div className="sticky top-0 flex min-h-screen flex-col justify-center py-16">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-dark">
              What You Get
            </p>
            <h2 className="mt-3 font-heading text-2xl md:text-3xl">
              Five Signals, One Report
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-text-muted md:text-sm">
              Every weekly report covers the five categories below. Each one is
              drawn from real data we track: pricing tables, review sentiment,
              ad activity, AI visibility, and the actions that follow from it.
            </p>
          </div>

          <div className="mt-10 md:grid md:grid-cols-[240px_1fr] md:gap-8 lg:gap-12">
            {/* Desktop: editorial vertical nav */}
            <nav className="hidden md:block" aria-label="Report sections">
              <ul className="space-y-0.5">
                {tabs.map((t) => {
                  const isActive = t.id === active;
                  return (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => setActive(t.id)}
                        className={`group flex w-full items-start gap-2.5 border-l-2 py-2.5 pl-4 pr-2 text-left transition-all ${
                          isActive
                            ? "border-gold bg-white text-brown shadow-sm"
                            : "border-transparent text-text-muted hover:border-border-warm hover:bg-white/60 hover:text-brown"
                        }`}
                      >
                        <t.Icon
                          className={`mt-0.5 h-3.5 w-3.5 shrink-0 transition-colors ${
                            isActive
                              ? "text-gold"
                              : "text-text-muted/60 group-hover:text-text-muted"
                          }`}
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold leading-tight">
                            {t.label}
                          </p>
                          <p
                            className={`mt-0.5 text-[10px] leading-snug ${
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

              {/* Progress dots (visible during scroll-hijack) */}
              {scrollDriven && (
                <div className="mt-4 flex items-center justify-center gap-1.5 pl-4">
                  {tabs.map((t) => (
                    <div
                      key={t.id}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        t.id === active
                          ? "w-4 bg-gold"
                          : "w-1.5 bg-silver/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </nav>

            {/* Mobile: underlined tabs that scroll horizontally */}
            <nav
              ref={mobileNavRef}
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
                      data-active={isActive}
                      onClick={() => setActive(t.id)}
                      className={`flex shrink-0 items-center gap-1.5 border-b-2 px-2.5 py-2.5 text-[11px] whitespace-nowrap transition-all ${
                        isActive
                          ? "border-gold text-brown"
                          : "border-transparent text-text-muted"
                      }`}
                    >
                      <t.Icon
                        className={`h-3 w-3 ${
                          isActive ? "text-gold" : "text-text-muted"
                        }`}
                      />
                      <span className="font-semibold">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* Fragment display — fixed height */}
            <div className="mt-6 h-[520px] md:mt-0">
              <div
                key={activeTab.id}
                className="h-full animate-[fadeIn_0.3s_ease-out]"
              >
                {activeTab.render()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
