"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, X, ChevronDown, Upload } from "lucide-react";

const DEFAULT_MODULES = [
  { id: "pricing-products", label: "Pricing & Products" },
  { id: "online-reviews", label: "Online Reviews" },
  { id: "web-digital", label: "Web & Digital Activity" },
  { id: "company-registry", label: "Company Registry & Filings" },
  { id: "market-seo", label: "Market Position & SEO" },
];

interface Competitor {
  name: string;
  website: string;
}

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [password, setPassword] = useState("");

  // Step 2
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { name: "", website: "" },
  ]);

  // Step 3 (optional customization)
  const [showCustomize, setShowCustomize] = useState(false);
  const [modules, setModules] = useState(DEFAULT_MODULES.map((m) => m.id));
  const [additionalContext, setAdditionalContext] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  function addCompetitor() {
    if (competitors.length < 5) {
      setCompetitors([...competitors, { name: "", website: "" }]);
    }
  }

  function removeCompetitor(index: number) {
    if (competitors.length > 1) {
      setCompetitors(competitors.filter((_, i) => i !== index));
    }
  }

  function updateCompetitor(index: number, field: "name" | "website", value: string) {
    const updated = [...competitors];
    updated[index] = { ...updated[index], [field]: value };
    setCompetitors(updated);
  }

  function toggleModule(id: string) {
    setModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newFiles: string[] = [];

    for (const file of Array.from(files)) {
      try {
        const res = await fetch("/api/portal/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type || "application/octet-stream",
          }),
        });

        if (res.ok) {
          const { url } = await res.json();
          await fetch(url, {
            method: "PUT",
            headers: { "Content-Type": file.type || "application/octet-stream" },
            body: file,
          });
          newFiles.push(file.name);
        }
      } catch {
        // Skip failed uploads
      }
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setUploading(false);
  }

  function canProceedStep1() {
    return contactName && email && companyName && website && password.length >= 8;
  }

  function canProceedStep2() {
    return competitors.some((c) => c.website.trim() !== "");
  }

  async function handleSubmit() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/get-started", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactName,
          email,
          password,
          companyName,
          website: website.startsWith("http") ? website : `https://${website}`,
          competitors: competitors
            .filter((c) => c.website.trim())
            .map((c) => ({
              name: c.name,
              website: c.website.startsWith("http") ? c.website : `https://${c.website}`,
            })),
          reportModules: modules,
          additionalContext,
          uploadedFiles,
          plan: "starter",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // Redirect to Stripe Checkout or directly to portal
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        window.location.href = "/portal?setup=complete";
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-cream)] px-4 py-12">
      <div className="mx-auto max-w-lg">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
            claudje
          </Link>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Start your 14-day free trial
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mb-8 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-16 rounded-full transition-colors ${
                s <= step ? "bg-[var(--color-accent)]" : "bg-[var(--color-border-warm)]"
              }`}
            />
          ))}
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          {/* Step 1: Your Company */}
          {step === 1 && (
            <>
              <h2 className="mb-1 text-xl font-bold text-[var(--color-text-primary)]">
                Your company
              </h2>
              <p className="mb-6 text-sm text-[var(--color-text-muted)]">
                Tell us about your business so we can tailor your reports.
              </p>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Jan de Vries"
                    className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jan@acmebakery.nl"
                    className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
                    Company name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Acme Bakery"
                    className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
                    Company website
                  </label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="acmebakery.nl"
                    className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    minLength={8}
                    className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1()}
                  className="mt-2 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {/* Step 2: Your Competitors */}
          {step === 2 && (
            <>
              <h2 className="mb-1 text-xl font-bold text-[var(--color-text-primary)]">
                Your competitors
              </h2>
              <p className="mb-6 text-sm text-[var(--color-text-muted)]">
                Enter the competitors you want us to monitor. We&apos;ll do the rest.
              </p>

              <div className="flex flex-col gap-3">
                {competitors.map((comp, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={comp.name}
                      onChange={(e) => updateCompetitor(i, "name", e.target.value)}
                      placeholder="Competitor name"
                      className="w-1/3 rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                    />
                    <input
                      type="text"
                      value={comp.website}
                      onChange={(e) => updateCompetitor(i, "website", e.target.value)}
                      placeholder="competitor.com"
                      className="flex-1 rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                    />
                    {competitors.length > 1 && (
                      <button
                        onClick={() => removeCompetitor(i)}
                        className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-[var(--color-border-warm)] text-[var(--color-text-muted)] transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}

                {competitors.length < 5 && (
                  <button
                    onClick={addCompetitor}
                    className="flex items-center gap-1.5 text-sm text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-dark)]"
                  >
                    <Plus className="h-4 w-4" />
                    Add competitor
                  </button>
                )}

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="rounded-lg border border-[var(--color-border-warm)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-cream-dark)]"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!canProceedStep2()}
                    className="flex-1 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Review & Pay */}
          {step === 3 && (
            <>
              <h2 className="mb-1 text-xl font-bold text-[var(--color-text-primary)]">
                Review & start trial
              </h2>
              <p className="mb-6 text-sm text-[var(--color-text-muted)]">
                Your card won&apos;t be charged for 14 days. Cancel anytime.
              </p>

              {/* Summary */}
              <div className="mb-6 rounded-xl bg-[var(--color-cream)] p-4">
                <p className="mb-2 text-sm">
                  <span className="font-medium text-[var(--color-text-primary)]">{companyName}</span>
                  <span className="text-[var(--color-text-muted)]"> ({website})</span>
                </p>
                <p className="mb-1 text-xs font-medium text-[var(--color-text-muted)]">Monitoring:</p>
                <ul className="space-y-0.5">
                  {competitors.filter((c) => c.website.trim()).map((c, i) => (
                    <li key={i} className="text-sm text-[var(--color-text-primary)]">
                      {c.name || c.website}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Report fields */}
              <div className="mb-4">
                <p className="text-sm text-[var(--color-text-muted)]">
                  Your weekly report covers: <span className="font-medium text-[var(--color-text-primary)]">Pricing & Products, Online Reviews, Web & Digital Activity, Company Registry, and Market Position & SEO.</span>
                </p>
              </div>

              {/* Expandable customization */}
              <button
                onClick={() => setShowCustomize(!showCustomize)}
                className="mb-4 flex items-center gap-1.5 text-sm text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-dark)]"
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${showCustomize ? "rotate-180" : ""}`} />
                Want to customize?
              </button>

              {showCustomize && (
                <div className="mb-6 space-y-4 rounded-xl border border-[var(--color-border-warm)] p-4">
                  {/* Module toggles */}
                  <div>
                    <p className="mb-2 text-sm font-medium text-[var(--color-text-primary)]">Report modules</p>
                    <div className="flex flex-wrap gap-2">
                      {DEFAULT_MODULES.map((mod) => (
                        <button
                          key={mod.id}
                          onClick={() => toggleModule(mod.id)}
                          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                            modules.includes(mod.id)
                              ? "bg-[var(--color-accent)] text-white"
                              : "bg-[var(--color-cream)] text-[var(--color-text-muted)] hover:bg-[var(--color-cream-dark)]"
                          }`}
                        >
                          {mod.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Additional context */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
                      Tell us more
                    </label>
                    <p className="mb-2 text-xs text-[var(--color-text-muted)]">
                      What matters most? What should we focus on? The more context you share, the better your reports.
                    </p>
                    <textarea
                      value={additionalContext}
                      onChange={(e) => setAdditionalContext(e.target.value)}
                      rows={3}
                      placeholder="e.g., Focus on pricing changes in gluten-free products..."
                      className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                    />
                  </div>

                  {/* File upload */}
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
                      Upload documents
                    </label>
                    <p className="mb-2 text-xs text-[var(--color-text-muted)]">
                      Competitor lists, market research, or anything that helps us understand your business.
                    </p>
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-[var(--color-border-warm)] px-4 py-3 text-sm text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-cream)]">
                      <Upload className="h-4 w-4" />
                      {uploading ? "Uploading..." : "Choose files"}
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    {uploadedFiles.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {uploadedFiles.map((f, i) => (
                          <p key={i} className="text-xs text-[var(--color-text-muted)]">{f}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Human in the loop */}
              <div className="mb-6 flex items-center gap-3 rounded-xl bg-[var(--color-accent)]/5 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)]/10">
                  <svg className="h-4 w-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Our research team personally reviews every report before delivery.
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-6 rounded-xl border border-[var(--color-border-warm)] p-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">Starter Plan</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Up to 5 competitors, weekly reports</p>
                  </div>
                  <p className="text-lg font-bold text-[var(--color-text-primary)]">
                    &euro;60<span className="text-sm font-normal text-[var(--color-text-muted)]">/mo</span>
                  </p>
                </div>
              </div>

              {error && (
                <p className="mb-4 text-sm text-red-600">{error}</p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="rounded-lg border border-[var(--color-border-warm)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-cream-dark)]"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
                >
                  {loading ? "Setting up..." : "Start 14-day free trial"}
                </button>
              </div>

              <p className="mt-3 text-center text-xs text-[var(--color-text-muted)]">
                Your card won&apos;t be charged for 14 days. Cancel anytime.
              </p>
            </>
          )}
        </div>

        <p className="mt-4 text-center text-sm text-[var(--color-text-muted)]">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--color-accent)] hover:text-[var(--color-accent-dark)]">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
