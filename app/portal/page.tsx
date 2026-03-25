"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { usePortal } from "@/components/portal/PortalContext";
import Link from "next/link";
import { FileText, Settings, Users } from "lucide-react";
import WelcomeAnimation from "@/components/portal/WelcomeAnimation";

interface Report {
  id: string;
  weekOf: string;
  status: "ready" | "processing";
  publishedAt?: string;
  summarySnippet?: string;
  competitorCount: number;
  hasPdf: boolean;
}

interface OnboardingData {
  companyName?: string;
  competitors?: Array<{ name: string; website: string }>;
  subscriptionStatus?: string;
  trialEndsAt?: string;
}

export default function DashboardPage() {
  const { customerId, isAdmin, isViewingCustomer } = usePortal();
  const searchParams = useSearchParams();
  const isSetupComplete = searchParams.get("setup") === "complete";
  const [reports, setReports] = useState<Report[]>([]);
  const [onboarding, setOnboarding] = useState<OnboardingData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAdmin && !isViewingCustomer) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const params = new URLSearchParams();
        if (isAdmin && customerId) params.set("customerId", customerId);

        const [onbRes, repRes] = await Promise.all([
          fetch(`/api/portal/onboarding?${params}`),
          fetch(`/api/portal/reports?${params}`),
        ]);

        if (onbRes.ok) {
          const json = await onbRes.json();
          setOnboarding(json.data ?? null);
        }

        if (repRes.ok) {
          const json = await repRes.json();
          setReports(json.reports ?? []);
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [customerId, isAdmin, isViewingCustomer]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-accent)] border-t-transparent" />
      </div>
    );
  }

  // Admin without customer selected
  if (isAdmin && !isViewingCustomer) {
    return (
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
          Welcome back
        </h1>
        <p className="mb-8 text-[var(--color-text-muted)]">
          Select a customer from the Admin panel to view their dashboard.
        </p>
        <Link
          href="/portal/admin"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)]"
        >
          <Users className="h-4 w-4" />
          Go to Admin
        </Link>
      </div>
    );
  }

  // State A: No reports yet
  if (reports.length === 0) {
    return (
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
          Your first report is being prepared
        </h1>
        <p className="mb-8 text-[var(--color-text-muted)]">
          We&apos;re setting up your intelligence pipeline. Your first report will arrive within 24 hours.
        </p>

        {/* Welcome animation (on first visit from onboarding) or static card */}
        {isSetupComplete && onboarding?.competitors && onboarding.competitors.length > 0 ? (
          <div className="mb-8">
            <WelcomeAnimation competitors={onboarding.competitors} />
          </div>
        ) : (
          <div className="mb-8 rounded-2xl border border-[var(--color-border-warm)] bg-white p-6">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">Your pipeline is being configured</p>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">
              We personally set up your analysis and quality-check every report.
            </p>
          </div>
        )}

        {onboarding && (
          <div className="rounded-2xl border border-[var(--color-border-warm)] bg-white p-6">
            <h2 className="mb-3 text-sm font-semibold text-[var(--color-text-primary)]">Your setup</h2>
            {onboarding.companyName && (
              <p className="mb-2 text-sm text-[var(--color-text-muted)]">
                <span className="font-medium text-[var(--color-text-primary)]">Company:</span> {onboarding.companyName}
              </p>
            )}
            {onboarding.competitors && onboarding.competitors.length > 0 && (
              <div className="mb-3">
                <p className="mb-1 text-sm font-medium text-[var(--color-text-primary)]">Competitors:</p>
                <ul className="space-y-1">
                  {onboarding.competitors.map((c, i) => (
                    <li key={i} className="text-sm text-[var(--color-text-muted)]">
                      {c.name || c.website}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Link
              href="/portal/settings"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-dark)]"
            >
              <Settings className="h-3.5 w-3.5" />
              Refine your setup for better reports
            </Link>
          </div>
        )}
      </div>
    );
  }

  // State B: Reports available
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
          Your Reports
        </h1>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <Link
            key={report.id}
            href={`/portal/reports/${report.id}`}
            className="block rounded-2xl border border-[var(--color-border-warm)] bg-white p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/10">
                  <FileText className="h-5 w-5 text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    Week of {new Date(report.weekOf).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                  {report.summarySnippet && (
                    <p className="mt-1 text-sm text-[var(--color-text-muted)] line-clamp-2">
                      {report.summarySnippet}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-[var(--color-text-muted)]">
                    {report.competitorCount} competitor{report.competitorCount !== 1 ? "s" : ""} analyzed
                  </p>
                </div>
              </div>
              {report.status === "processing" && (
                <span className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                  Processing
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
