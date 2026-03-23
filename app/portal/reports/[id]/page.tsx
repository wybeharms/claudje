"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { usePortal } from "@/components/portal/PortalContext";
import { ArrowLeft, Download, Users } from "lucide-react";

interface ReportData {
  id: string;
  markdown: string;
  weekOf?: string;
  analyst?: string;
  modules?: string[];
  competitors?: string[];
}

export default function ReportPage() {
  const { id } = useParams<{ id: string }>();
  const { customerId, isAdmin } = usePortal();
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const params = new URLSearchParams();
        if (isAdmin && customerId) params.set("customerId", customerId);
        const res = await fetch(`/api/portal/reports/${id}?${params}`);
        if (res.ok) {
          const data = await res.json();
          setReport(data);
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, customerId, isAdmin]);

  // Parse H2 sections from markdown
  const sections = useMemo(() => {
    if (!report?.markdown) return [];
    const lines = report.markdown.split("\n");
    const result: Array<{ title: string; content: string }> = [];
    let currentTitle = "Overview";
    let currentContent: string[] = [];

    for (const line of lines) {
      if (line.startsWith("## ")) {
        if (currentContent.length > 0) {
          result.push({ title: currentTitle, content: currentContent.join("\n") });
        }
        currentTitle = line.replace("## ", "").trim();
        currentContent = [];
      } else {
        currentContent.push(line);
      }
    }
    if (currentContent.length > 0) {
      result.push({ title: currentTitle, content: currentContent.join("\n") });
    }

    return result;
  }, [report?.markdown]);

  async function handleDownload(format: "pdf" | "word") {
    const params = new URLSearchParams({ format });
    if (isAdmin && customerId) params.set("customerId", customerId);
    const res = await fetch(`/api/portal/reports/${id}/download?${params}`);
    if (res.ok) {
      const { url } = await res.json();
      window.open(url, "_blank");
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-accent)] border-t-transparent" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-[var(--color-text-muted)]">Report not found.</p>
        <Link href="/portal" className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)]">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Link href="/portal" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]">
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <div className="flex gap-2">
          <button
            onClick={() => handleDownload("pdf")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border-warm)] px-3 py-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-cream-dark)]"
          >
            <Download className="h-3.5 w-3.5" />
            PDF
          </button>
          <button
            onClick={() => handleDownload("word")}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border-warm)] px-3 py-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-cream-dark)]"
          >
            <Download className="h-3.5 w-3.5" />
            Word
          </button>
        </div>
      </div>

      {/* Report title */}
      {report.weekOf && (
        <h1 className="mb-2 text-2xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
          Report — Week of {new Date(report.weekOf).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </h1>
      )}

      {/* Section navigation */}
      {sections.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {sections.map((s, i) => (
            <a
              key={i}
              href={`#section-${i}`}
              className="rounded-full border border-[var(--color-border-warm)] px-3 py-1 text-xs text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-cream-dark)] hover:text-[var(--color-text-primary)]"
            >
              {s.title}
            </a>
          ))}
        </div>
      )}

      {/* Report content */}
      <div className="space-y-6">
        {sections.map((section, i) => (
          <div
            key={i}
            id={`section-${i}`}
            className="rounded-2xl border border-[var(--color-border-warm)] bg-white p-6"
          >
            <h2 className="mb-4 text-lg font-bold text-[var(--color-text-primary)]">
              {section.title}
            </h2>
            <div className="prose prose-sm max-w-none text-[var(--color-text-primary)] prose-headings:text-[var(--color-text-primary)] prose-a:text-[var(--color-accent)] prose-strong:text-[var(--color-text-primary)]">
              <Markdown remarkPlugins={[remarkGfm]}>{section.content}</Markdown>
            </div>
          </div>
        ))}
      </div>

      {/* Footer badge */}
      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[var(--color-text-muted)]">
        <Users className="h-3.5 w-3.5" />
        <span>Report prepared by {report.analyst || "our research team"} + AI</span>
      </div>
    </div>
  );
}
