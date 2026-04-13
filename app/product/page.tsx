import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import ReportPreviewDetailed from "@/components/landing/ReportPreviewDetailed";
import ComparisonTable from "@/components/landing/ComparisonTable";
import DataSourcesExpanded from "@/components/landing/DataSourcesExpanded";
import UseCases from "@/components/landing/UseCases";

export const metadata: Metadata = {
  title: "Product — claudje Competitor Intelligence",
  description:
    "See what claudje delivers: weekly competitor reports covering pricing, reviews, advertising, hiring, and more. Managed AI agents do the research, a human analyst reviews every report.",
  alternates: { canonical: "/product" },
  openGraph: {
    title: "Product — claudje Competitor Intelligence",
    description:
      "Weekly competitor intelligence reports powered by managed AI agents. Pricing, reviews, ads, hiring, and more.",
    url: "https://claudje.com/product",
  },
};

export default function ProductPage() {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="bg-brown px-6 py-16 text-text-on-dark lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl font-light tracking-tight md:text-4xl">
            Competitor Intelligence, Managed For You
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-on-dark-muted md:text-base">
            Every week, your AI agents research your competitors across the web,
            public records, and professional data sources. An analyst reviews the
            findings. You get a clear report in your inbox.
          </p>
          <a
            href="/get-started"
            className="btn-shimmer mt-8 inline-block rounded-lg px-8 py-3 text-sm font-semibold text-brown transition-colors md:text-base"
          >
            Start Your Free Trial
          </a>
        </div>
      </section>

      {/* Detailed report preview (tabbed, 5 categories) */}
      <ReportPreviewDetailed />

      {/* Comparison table (replaces WhyClaudje) */}
      <ComparisonTable />

      {/* Data sources expanded */}
      <DataSourcesExpanded />

      {/* Use cases */}
      <UseCases />

      <Footer />
    </>
  );
}
