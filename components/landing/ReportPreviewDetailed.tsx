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
import { useI18n } from "@/context/I18nContext";

type TabId = "recommendations" | "pricing" | "reviews" | "advertising" | "ai";

type Tab = {
  id: TabId;
  label: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
  render: () => ReactNode;
};

export default function ReportPreviewDetailed() {
  const { messages } = useI18n();
  const t = messages.reportPreviewDetailed;
  const tabs: Tab[] = [
    {
      id: "recommendations",
      label: t.tabs.recommendations.label,
      description: t.tabs.recommendations.description,
      Icon: LightningIcon,
      render: () => <RecommendationsFragment />,
    },
    {
      id: "pricing",
      label: t.tabs.pricing.label,
      description: t.tabs.pricing.description,
      Icon: PricingIcon,
      render: () => <PricingFragment />,
    },
    {
      id: "reviews",
      label: t.tabs.reviews.label,
      description: t.tabs.reviews.description,
      Icon: ReviewsIcon,
      render: () => <ReviewsFragment />,
    },
    {
      id: "advertising",
      label: t.tabs.advertising.label,
      description: t.tabs.advertising.description,
      Icon: AdsIcon,
      render: () => <AdsFragment />,
    },
    {
      id: "ai",
      label: t.tabs.ai.label,
      description: t.tabs.ai.description,
      Icon: AIIcon,
      render: () => <AIFragment />,
    },
  ];
  const [active, setActive] = useState<TabId>("recommendations");
  const activeTab = tabs.find((tab) => tab.id === active) ?? tabs[0];
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
              {t.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-2xl md:text-3xl">
              {t.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-text-muted md:text-sm">
              {t.subtitle}
            </p>
          </div>

          <div className="mt-10 md:grid md:grid-cols-[240px_1fr] md:gap-8 lg:gap-12">
            {/* Desktop: editorial vertical nav */}
            <nav className="hidden md:block" aria-label={t.navLabel}>
              <ul className="space-y-0.5">
                {tabs.map((tab) => {
                  const isActive = tab.id === active;
                  return (
                    <li key={tab.id}>
                      <button
                        type="button"
                        onClick={() => setActive(tab.id)}
                        className={`group flex w-full items-start gap-2.5 border-l-2 py-2.5 pl-4 pr-2 text-left transition-all ${
                          isActive
                            ? "border-gold bg-white text-brown shadow-sm"
                            : "border-transparent text-text-muted hover:border-border-warm hover:bg-white/60 hover:text-brown"
                        }`}
                      >
                        <tab.Icon
                          className={`mt-0.5 h-3.5 w-3.5 shrink-0 transition-colors ${
                            isActive
                              ? "text-gold"
                              : "text-text-muted/60 group-hover:text-text-muted"
                          }`}
                        />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold leading-tight">
                            {tab.label}
                          </p>
                          <p
                            className={`mt-0.5 text-[10px] leading-snug ${
                              isActive
                                ? "text-text-muted"
                                : "text-text-muted/70"
                            }`}
                          >
                            {tab.description}
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
                  {tabs.map((tab) => (
                    <div
                      key={tab.id}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        tab.id === active
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
              aria-label={t.navLabel}
            >
              <div className="flex gap-1 px-6">
                {tabs.map((tab) => {
                  const isActive = tab.id === active;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      data-active={isActive}
                      onClick={() => setActive(tab.id)}
                      className={`flex shrink-0 items-center gap-1.5 border-b-2 px-2.5 py-2.5 text-[11px] whitespace-nowrap transition-all ${
                        isActive
                          ? "border-gold text-brown"
                          : "border-transparent text-text-muted"
                      }`}
                    >
                      <tab.Icon
                        className={`h-3 w-3 ${
                          isActive ? "text-gold" : "text-text-muted"
                        }`}
                      />
                      <span className="font-semibold">{tab.label}</span>
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
