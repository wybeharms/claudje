"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Plus, X } from "lucide-react";

const COUNTRIES = [
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "OTHER", name: "Other", flag: "🌍" },
];

function detectCountry(): string {
  if (typeof navigator === "undefined") return "NL";
  const lang = navigator.language || "";
  const region = lang.split("-")[1]?.toUpperCase();
  if (region && COUNTRIES.some((c) => c.code === region)) return region;
  const langMap: Record<string, string> = {
    nl: "NL", de: "DE", fr: "FR", es: "ES", it: "IT", pt: "PT",
    sv: "SE", no: "NO", da: "DK", fi: "FI", pl: "PL",
  };
  const primary = lang.split("-")[0].toLowerCase();
  return langMap[primary] || "NL";
}

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

function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[a-z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 2) return { score, label: "Weak", color: "#EF4444" };
  if (score <= 4) return { score, label: "Fair", color: "#EAB308" };
  return { score, label: "Strong", color: "#22C55E" };
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
  const [phone, setPhone] = useState("");

  // Step 1 (extra)
  const [country, setCountry] = useState("");

  useEffect(() => {
    setCountry(detectCountry());
  }, []);

  // Step 2
  const [competitors, setCompetitors] = useState<Competitor[]>([
    { name: "", website: "" },
  ]);

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

  function canProceedStep1() {
    return contactName && email && companyName && website && password.length >= 8;
  }

  function canProceedStep2() {
    return competitors.some((c) => c.name.trim() !== "");
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
          phone,
          companyName,
          website: website.startsWith("http") ? website : `https://${website}`,
          country,
          competitors: competitors
            .filter((c) => c.name.trim())
            .map((c) => ({
              name: c.name,
              website: c.website.trim()
                ? c.website.startsWith("http") ? c.website : `https://${c.website}`
                : "",
            })),
          reportModules: DEFAULT_MODULES.map((m) => m.id),
          additionalContext: "",
          uploadedFiles: [],
          plan: "starter",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      // Auto-login if auth token was returned
      if (data.authToken) {
        const signInResult = await signIn("credentials", {
          authToken: data.authToken,
          redirect: false,
        });

        if (signInResult?.ok) {
          if (data.checkoutUrl) {
            window.location.href = data.checkoutUrl;
          } else {
            window.location.href = "/portal?setup=complete";
          }
          return;
        }
      }

      // Fallback: redirect to Stripe or login page
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        window.location.href = "/login?registered=1";
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
                  {password && (
                    <div className="mt-2">
                      <div className="h-1.5 w-full rounded-full bg-[var(--color-cream-dark)]">
                        <div
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: `${(getPasswordStrength(password).score / 6) * 100}%`,
                            backgroundColor: getPasswordStrength(password).color,
                          }}
                        />
                      </div>
                      <p className="mt-1 text-xs" style={{ color: getPasswordStrength(password).color }}>
                        {getPasswordStrength(password).label}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
                    Phone number <span className="font-normal text-[var(--color-text-muted)]">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+31 6 12345678"
                    className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
                    Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]"
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
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
              <p className="mb-2 text-sm text-[var(--color-text-muted)]">
                We recommend adding 5 competitors. Don&apos;t have 5? No problem, we&apos;ll find the rest.
              </p>

              <div className="flex flex-col gap-3">
                {competitors.map((comp, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 rounded-lg p-1.5 transition-colors ${
                      comp.name.trim()
                        ? "bg-[var(--color-accent)]/5"
                        : "bg-transparent"
                    }`}
                  >
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
                      placeholder="competitor.com (optional)"
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
                  {competitors.filter((c) => c.name.trim()).map((c, i) => (
                    <li key={i} className="text-sm text-[var(--color-text-primary)]">
                      {c.name}{c.website.trim() ? ` (${c.website})` : ""}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Report modules */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-medium text-[var(--color-text-muted)]">Your weekly report covers:</p>
                <div className="flex flex-wrap gap-2">
                  {DEFAULT_MODULES.map((mod) => (
                    <span
                      key={mod.id}
                      className="rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-xs font-medium text-[var(--color-accent-dark)]"
                    >
                      {mod.label}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mb-6 text-xs text-[var(--color-text-muted)]">
                This is your starting point — you can customize everything from your dashboard.
              </p>

              {/* Human in the loop */}
              <div className="mb-6 flex items-center gap-3 rounded-xl bg-[var(--color-accent)]/5 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)]/10">
                  <svg className="h-4 w-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <p className="text-xs text-[var(--color-text-muted)]">
                  We personally set up your intelligence pipeline and ensure every report meets our quality bar.
                </p>
              </div>

              {/* Pricing */}
              <div className="mb-6 rounded-xl border border-[var(--color-border-warm)] p-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text-primary)]">Starter Plan</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Up to 5 competitors, biweekly reports</p>
                  </div>
                  <p className="text-lg font-bold text-[var(--color-text-primary)]">
                    &euro;49<span className="text-sm font-normal text-[var(--color-text-muted)]">/mo</span>
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
