"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { usePortal } from "@/components/portal/PortalContext";
import { ArrowLeft, Download } from "lucide-react";

export default function ReportPage() {
  const { id } = useParams<{ id: string }>();
  const { customerId, isAdmin } = usePortal();
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const params = new URLSearchParams();
        if (isAdmin && customerId) params.set("customerId", customerId);
        const res = await fetch(`/api/portal/reports/${id}/embed?${params}`);
        if (res.ok) {
          const { url } = await res.json();
          setEmbedUrl(url);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, customerId, isAdmin]);

  async function handleDownload() {
    const params = new URLSearchParams({ format: "pdf" });
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

  if (error || !embedUrl) {
    return (
      <div className="mx-auto max-w-3xl">
        <p className="text-[var(--color-text-muted)]">Report not found.</p>
        <Link
          href="/portal"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-6rem)] max-w-5xl flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <Link
          href="/portal"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text-primary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <button
          onClick={handleDownload}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border-warm)] px-3 py-1.5 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-cream-dark)]"
        >
          <Download className="h-3.5 w-3.5" />
          Download PDF
        </button>
      </div>

      {/* Embedded PDF */}
      <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-[var(--color-border-warm)] bg-white">
        <iframe
          src={embedUrl}
          className="h-full w-full"
          title="Report PDF"
        />
      </div>
    </div>
  );
}
