"use client";

import { useState, useEffect } from "react";
import { usePortal } from "@/components/portal/PortalContext";
import { Plus, X, Save, ExternalLink, Users } from "lucide-react";

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

interface SettingsData {
  companyName: string;
  website: string;
  contactName: string;
  phone: string;
  industry: string;
  companyDescription: string;
  competitors: Competitor[];
  reportModules: string[];
  additionalContext: string;
}

interface BillingData {
  plan: string;
  subscriptionStatus: string;
  trialEndsAt: string | null;
}

interface TeamMember {
  email: string;
  status: string;
  createdAt: string | null;
}

export default function SettingsPage() {
  const { customerId, isAdmin } = usePortal();
  const [tab, setTab] = useState<"company" | "competitors" | "modules" | "team" | "billing">("company");
  const [data, setData] = useState<SettingsData | null>(null);
  const [billing, setBilling] = useState<BillingData | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [teamLoading, setTeamLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const params = new URLSearchParams();
        if (isAdmin && customerId) params.set("customerId", customerId);

        const [settingsRes, billingRes] = await Promise.all([
          fetch(`/api/portal/settings?${params}`),
          fetch(`/api/portal/billing?${params}`),
        ]);

        if (settingsRes.ok) {
          const json = await settingsRes.json();
          setData(json.data);
        }
        if (billingRes.ok) {
          const json = await billingRes.json();
          setBilling(json);
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [customerId, isAdmin]);

  useEffect(() => {
    if (tab !== "team") return;
    async function loadTeam() {
      setTeamLoading(true);
      try {
        const params = new URLSearchParams();
        if (isAdmin && customerId) params.set("customerId", customerId);
        const res = await fetch(`/api/portal/team?${params}`);
        if (res.ok) {
          const json = await res.json();
          setTeam(json.members ?? []);
        }
      } catch {
        // Silently fail
      } finally {
        setTeamLoading(false);
      }
    }
    loadTeam();
  }, [tab, customerId, isAdmin]);

  async function handleSave() {
    if (!data) return;
    setSaving(true);
    setSaved(false);

    try {
      await fetch("/api/portal/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // Silently fail
    } finally {
      setSaving(false);
    }
  }

  async function handleManageBilling() {
    const res = await fetch("/api/portal/billing", { method: "POST" });
    if (res.ok) {
      const { url } = await res.json();
      window.location.href = url;
    }
  }

  async function handleCancelSubscription() {
    setCancelling(true);
    try {
      const params = new URLSearchParams();
      if (isAdmin && customerId) params.set("customerId", customerId);
      const res = await fetch(`/api/portal/billing?${params}`, { method: "DELETE" });
      if (res.ok) {
        setBilling((prev) => prev ? { ...prev, subscriptionStatus: "cancelled" } : prev);
        setShowCancelConfirm(false);
      }
    } catch {
      // Silently fail
    } finally {
      setCancelling(false);
    }
  }

  function updateField(field: keyof SettingsData, value: unknown) {
    if (!data) return;
    setData({ ...data, [field]: value });
  }

  function addCompetitor() {
    if (!data || data.competitors.length >= 5) return;
    updateField("competitors", [...data.competitors, { name: "", website: "" }]);
  }

  function removeCompetitor(index: number) {
    if (!data || data.competitors.length <= 1) return;
    updateField("competitors", data.competitors.filter((_, i) => i !== index));
  }

  function updateCompetitor(index: number, field: "name" | "website", value: string) {
    if (!data) return;
    const updated = [...data.competitors];
    updated[index] = { ...updated[index], [field]: value };
    updateField("competitors", updated);
  }

  function toggleModule(id: string) {
    if (!data) return;
    const modules = data.reportModules.includes(id)
      ? data.reportModules.filter((m) => m !== id)
      : [...data.reportModules, id];
    updateField("reportModules", modules);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-accent)] border-t-transparent" />
      </div>
    );
  }

  const tabs = [
    { id: "company" as const, label: "Company" },
    { id: "competitors" as const, label: "Competitors" },
    { id: "modules" as const, label: "Report Preferences" },
    { id: "team" as const, label: "Team" },
    { id: "billing" as const, label: "Billing" },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
          Settings
        </h1>
        {tab !== "billing" && tab !== "team" && (
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            {saving ? "Saving..." : saved ? "Saved" : "Save changes"}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl bg-[var(--color-cream-dark)] p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              tab === t.id
                ? "bg-white text-[var(--color-text-primary)] shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--color-border-warm)] bg-white p-6">
        {/* Company Tab */}
        {tab === "company" && data && (
          <div className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Company name</label>
              <input type="text" value={data.companyName || ""} onChange={(e) => updateField("companyName", e.target.value)} className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Website</label>
              <input type="text" value={data.website || ""} onChange={(e) => updateField("website", e.target.value)} className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Contact name</label>
              <input type="text" value={data.contactName || ""} onChange={(e) => updateField("contactName", e.target.value)} className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">
                Phone number <span className="font-normal text-[var(--color-text-muted)]">(optional)</span>
              </label>
              <input type="tel" value={data.phone || ""} onChange={(e) => updateField("phone", e.target.value)} placeholder="+31 6 12345678" className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Industry</label>
              <input type="text" value={data.industry || ""} onChange={(e) => updateField("industry", e.target.value)} placeholder="e.g., Food & Beverage" className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">About your company</label>
              <p className="mb-2 text-xs text-[var(--color-text-muted)]">The more context you share, the better your reports.</p>
              <textarea value={data.companyDescription || ""} onChange={(e) => updateField("companyDescription", e.target.value)} rows={4} className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]" />
            </div>
          </div>
        )}

        {/* Competitors Tab */}
        {tab === "competitors" && data && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[var(--color-text-muted)]">
              Manage the competitors you want us to monitor. Starter plan supports up to 5.
            </p>
            {data.competitors.map((comp, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" value={comp.name} onChange={(e) => updateCompetitor(i, "name", e.target.value)} placeholder="Name" className="w-1/3 rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]" />
                <input type="text" value={comp.website} onChange={(e) => updateCompetitor(i, "website", e.target.value)} placeholder="website.com" className="flex-1 rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-3 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]" />
                {data.competitors.length > 1 && (
                  <button onClick={() => removeCompetitor(i)} className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-[var(--color-border-warm)] text-[var(--color-text-muted)] hover:bg-red-50 hover:text-red-500">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            {data.competitors.length < 5 ? (
              <button onClick={addCompetitor} className="flex items-center gap-1.5 text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-dark)]">
                <Plus className="h-4 w-4" />
                Add competitor
              </button>
            ) : (
              <div className="flex items-center gap-2 rounded-lg bg-[var(--color-cream)] px-3 py-2.5">
                <Plus className="h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)]" />
                <span className="text-sm text-[var(--color-text-muted)]">
                  You&apos;ve reached the 5-competitor limit.{" "}
                  <button
                    onClick={() => setTab("billing")}
                    className="text-[var(--color-accent)] hover:text-[var(--color-accent-dark)]"
                  >
                    Upgrade to Pro
                  </button>{" "}
                  for more.
                </span>
              </div>
            )}
          </div>
        )}

        {/* Report Preferences Tab */}
        {tab === "modules" && data && (
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-3 text-sm font-medium text-[var(--color-text-primary)]">Report modules</p>
              <div className="flex flex-wrap gap-2">
                {DEFAULT_MODULES.map((mod) => (
                  <button
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                      data.reportModules.includes(mod.id)
                        ? "bg-[var(--color-accent)] text-white"
                        : "bg-[var(--color-cream)] text-[var(--color-text-muted)] hover:bg-[var(--color-cream-dark)]"
                    }`}
                  >
                    {mod.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Additional instructions</label>
              <p className="mb-2 text-xs text-[var(--color-text-muted)]">What matters most? What should we focus on?</p>
              <textarea value={data.additionalContext || ""} onChange={(e) => updateField("additionalContext", e.target.value)} rows={4} placeholder="e.g., Focus on pricing changes in gluten-free products..." className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]" />
            </div>
          </div>
        )}

        {/* Team Tab */}
        {tab === "team" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-[var(--color-text-muted)]" />
              <p className="text-sm text-[var(--color-text-muted)]">
                Gebruikers met toegang tot uw organisatie.
              </p>
            </div>
            {teamLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-accent)] border-t-transparent" />
              </div>
            ) : team.length === 0 ? (
              <p className="text-center text-sm text-[var(--color-text-muted)] py-8">Geen teamleden gevonden.</p>
            ) : (
              <div className="rounded-xl border border-[var(--color-border-warm)] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--color-border-warm)] bg-[var(--color-cream)]">
                      <th className="px-4 py-2 text-left font-medium text-[var(--color-text-muted)]">Email</th>
                      <th className="px-4 py-2 text-left font-medium text-[var(--color-text-muted)]">Status</th>
                      <th className="px-4 py-2 text-left font-medium text-[var(--color-text-muted)]">Lid sinds</th>
                    </tr>
                  </thead>
                  <tbody>
                    {team.map((m) => (
                      <tr key={m.email} className="border-b border-[var(--color-border-warm)] last:border-0">
                        <td className="px-4 py-2.5 text-[var(--color-text-primary)]">{m.email}</td>
                        <td className="px-4 py-2.5">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            m.status === "CONFIRMED"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {m.status === "CONFIRMED" ? "Actief" : "Uitgenodigd"}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-[var(--color-text-muted)]">
                          {m.createdAt ? new Date(m.createdAt).toLocaleDateString("nl-NL") : "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Billing Tab */}
        {tab === "billing" && billing && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between rounded-xl bg-[var(--color-cream)] p-4">
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)] capitalize">{billing.plan} Plan</p>
                <p className="text-xs text-[var(--color-text-muted)] capitalize">{billing.subscriptionStatus}</p>
              </div>
              {billing.subscriptionStatus === "trialing" && billing.trialEndsAt && (
                <p className="text-sm text-[var(--color-text-muted)]">
                  Trial ends {new Date(billing.trialEndsAt).toLocaleDateString()}
                </p>
              )}
            </div>
            <button
              onClick={handleManageBilling}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border-warm)] px-4 py-2.5 text-sm font-medium text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-cream)]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Manage billing on Stripe
            </button>

            {billing.subscriptionStatus !== "cancelled" && (
              <div className="border-t border-[var(--color-border-warm)] pt-4">
                {!showCancelConfirm ? (
                  <button
                    onClick={() => setShowCancelConfirm(true)}
                    className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                  >
                    Abonnement opzeggen
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-[var(--color-text-muted)]">Weet u het zeker?</p>
                    <button
                      onClick={handleCancelSubscription}
                      disabled={cancelling}
                      className="text-xs font-medium text-red-500 hover:text-red-700 transition-colors disabled:opacity-50"
                    >
                      {cancelling ? "Bezig..." : "Ja, opzeggen"}
                    </button>
                    <button
                      onClick={() => setShowCancelConfirm(false)}
                      className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      Nee, toch niet
                    </button>
                  </div>
                )}
              </div>
            )}

            {billing.subscriptionStatus === "cancelled" && (
              <p className="border-t border-[var(--color-border-warm)] pt-4 text-xs text-[var(--color-text-muted)]">
                Uw abonnement is opgezegd.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
