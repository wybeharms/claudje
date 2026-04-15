"use client";

import { useI18n } from "@/context/I18nContext";
import Header from "./Header";
import Footer from "./Footer";
import ReportPreviewDetailed from "./ReportPreviewDetailed";
import ComparisonTable from "./ComparisonTable";
import DataSourcesExpanded from "./DataSourcesExpanded";
import UseCases from "./UseCases";

export default function ProductPageContent() {
  const { messages } = useI18n();
  const t = messages.product;

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
          <a
            href="/get-started"
            className="btn-shimmer mt-8 inline-block rounded-lg px-8 py-3 text-sm font-semibold text-brown transition-colors md:text-base"
          >
            {t.heroCta}
          </a>
        </div>
      </section>

      <ReportPreviewDetailed />
      <ComparisonTable />
      <DataSourcesExpanded />
      <UseCases />

      <Footer />
    </>
  );
}
