"use client";

import { useState, type ReactNode } from "react";
import { useI18n } from "@/context/I18nContext";
import {
  AIFragment,
  AIIcon,
  LightningIcon,
  PricingFragment,
  PricingIcon,
  RecommendationsFragment,
} from "./ReportFragments";

type View = {
  id: "recommendations" | "pricing" | "ai";
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  render: () => ReactNode;
};

const views: View[] = [
  {
    id: "recommendations",
    label: "Strategic Recommendations",
    Icon: LightningIcon,
    render: () => <RecommendationsFragment />,
  },
  {
    id: "pricing",
    label: "Pricing Intelligence",
    Icon: PricingIcon,
    render: () => <PricingFragment />,
  },
  {
    id: "ai",
    label: "AI Discoverability",
    Icon: AIIcon,
    render: () => <AIFragment />,
  },
];

export default function ReportPreview() {
  const [active, setActive] = useState<View["id"]>("recommendations");
  const activeView = views.find((v) => v.id === active) ?? views[0];
  const { messages } = useI18n();
  const t = messages.reportPreview;

  return (
    <section id="report-preview" className="bg-cream px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-heading text-2xl md:text-3xl">{t.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-text-muted md:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Underlined tab switcher */}
        <div className="mt-10 flex justify-center border-b border-border-warm">
          {views.map((v) => {
            const isActive = v.id === active;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setActive(v.id)}
                className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs transition-all md:text-sm ${
                  isActive
                    ? "border-gold text-brown"
                    : "border-transparent text-text-muted hover:text-brown"
                }`}
              >
                <v.Icon
                  className={`h-4 w-4 ${
                    isActive ? "text-gold" : "text-text-muted"
                  }`}
                />
                <span className="font-semibold">{v.label}</span>
              </button>
            );
          })}
          <a
            href="/product"
            className="flex items-center gap-2 border-b-2 border-transparent px-5 py-3 text-xs text-text-muted transition-all hover:text-brown md:text-sm whitespace-nowrap"
          >
            <span className="font-semibold">{t.plusMore} &rarr;</span>
          </a>
        </div>

        {/* Fragment */}
        <div className="mt-8 h-[420px]">
          <div className="h-full">{activeView.render()}</div>
        </div>

        {/* Link to full product page */}
        <div className="mt-8 flex justify-center">
          <a
            href="/product"
            className="text-sm text-gold-dark transition-colors hover:text-brown"
          >
            {t.fullBreakdown} &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
