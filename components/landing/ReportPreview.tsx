"use client";

import { useState } from "react";

const tabs = [
  {
    label: "Pricing Intelligence",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    mock: [
      { competitor: "Baker's Delight", metric: "Sourdough loaf", value: "€4.50", change: "+€0.30" },
      { competitor: "Bread & Co.", metric: "Sourdough loaf", value: "€4.20", change: "—" },
      { competitor: "Golden Crust", metric: "Sourdough loaf", value: "€3.95", change: "-€0.15" },
    ],
    summary:
      "Baker's Delight raised sourdough pricing by 7% this week, widening the gap with Golden Crust. Your price of €4.10 is now positioned in the middle of the market. Consider whether the quality perception justifies staying below Baker's Delight or if there's room to increase.",
  },
  {
    label: "Web Monitoring",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    mock: [
      { competitor: "SmileDental", metric: "New page detected", value: '"Invisalign Specials"', change: "New" },
      { competitor: "CityDentist", metric: "Homepage updated", value: "Added video testimonials", change: "Changed" },
      { competitor: "DentalCare Plus", metric: "No changes", value: "—", change: "—" },
    ],
    summary:
      "SmileDental launched an Invisalign promotions page targeting the same keywords you rank for. CityDentist added video testimonials to their homepage, likely to improve conversion. Consider creating a competing offer page or refreshing your own testimonial content.",
  },
  {
    label: "Company Registry",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
    mock: [
      { competitor: "QuickFix Plumbing", metric: "New director added", value: "J. van der Berg", change: "Filed" },
      { competitor: "DrainMasters", metric: "Annual revenue", value: "€2.1M", change: "+18%" },
      { competitor: "PipePro", metric: "Employee count", value: "34", change: "+6" },
    ],
    summary:
      "DrainMasters reported 18% revenue growth in their latest filing — they're scaling fast. PipePro added 6 employees, possibly expanding into your service area. QuickFix added a new director, which could signal a strategic shift or investment round.",
  },
  {
    label: "Reviews",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    mock: [
      { competitor: "AutoHaus München", metric: "Google rating", value: "4.6 ★", change: "+0.1" },
      { competitor: "CarDeals24", metric: "Google rating", value: "3.9 ★", change: "-0.2" },
      { competitor: "Premium Motors", metric: "New reviews", value: "12 this week", change: "Active" },
    ],
    summary:
      "CarDeals24's rating dropped to 3.9 — three recent reviews mention slow delivery times. Premium Motors is actively soliciting reviews (12 new this week), likely running a post-purchase email campaign. AutoHaus continues to climb. Your 4.3 rating has been stable; a review push could help you match AutoHaus.",
  },
  {
    label: "Social Activity",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    mock: [
      { competitor: "FitZone", metric: "LinkedIn followers", value: "2,340", change: "+180" },
      { competitor: "Iron Temple", metric: "New hire posted", value: "Head of Marketing", change: "Hiring" },
      { competitor: "FlexGym", metric: "LinkedIn posts", value: "4 this week", change: "Active" },
    ],
    summary:
      "Iron Temple is hiring a Head of Marketing — expect a brand push in the coming months. FitZone gained 180 LinkedIn followers, likely from a viral post about their new group classes. FlexGym is maintaining high posting frequency. Your LinkedIn presence is quieter; consider a content schedule to stay visible.",
  },
  {
    label: "Search Trends",
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    mock: [
      { competitor: "GreenClean", metric: "Brand searches", value: "1,200/mo", change: "+22%" },
      { competitor: "SparkleHome", metric: "Brand searches", value: "890/mo", change: "+5%" },
      { competitor: "FreshMaids", metric: "Brand searches", value: "620/mo", change: "-8%" },
    ],
    summary:
      "GreenClean's brand search volume jumped 22% — likely driven by a recent PR campaign or seasonal push. FreshMaids is losing mindshare with an 8% decline. Your brand search volume is stable at 740/mo. The gap with GreenClean is widening; consider investing in brand awareness to stay competitive.",
  },
];

export default function ReportPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const tab = tabs[activeTab];

  return (
    <section
      id="report-preview"
      className="bg-cream-dark px-6 py-20 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-heading text-3xl md:text-4xl">
          What&apos;s in a report
        </h2>
        <p className="mt-3 text-center text-text-muted">
          Six categories of intelligence, delivered automatically.
        </p>

        {/* Tab bar */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors ${
                i === activeTab
                  ? "bg-brown text-text-on-dark"
                  : "bg-white text-text-muted hover:bg-cream-darker"
              }`}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="mt-8 rounded-xl border border-border-warm bg-white p-6 shadow-sm md:p-8">
          <h3 className="flex items-center gap-2 font-semibold">
            {tab.icon}
            {tab.label}
          </h3>

          {/* Mock data table */}
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-warm text-left text-text-muted">
                  <th className="pb-2 pr-4 font-medium">Competitor</th>
                  <th className="pb-2 pr-4 font-medium">Metric</th>
                  <th className="pb-2 pr-4 font-medium">Value</th>
                  <th className="pb-2 font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                {tab.mock.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-border-warm/50 last:border-0"
                  >
                    <td className="py-3 pr-4 font-medium">{row.competitor}</td>
                    <td className="py-3 pr-4 text-text-muted">{row.metric}</td>
                    <td className="py-3 pr-4">{row.value}</td>
                    <td className="py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                          row.change.startsWith("+")
                            ? "bg-green-50 text-green-700"
                            : row.change.startsWith("-")
                              ? "bg-red-50 text-red-700"
                              : "bg-gray-50 text-gray-600"
                        }`}
                      >
                        {row.change}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* AI summary */}
          <div className="mt-6 rounded-lg bg-cream/60 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
              AI Summary
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text-primary">
              {tab.summary}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
