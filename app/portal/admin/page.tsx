"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePortal } from "@/components/portal/PortalContext";
import { Building2, Users, FileText, Plus, ClipboardList } from "lucide-react";

interface Customer {
  id: string;
  companyName: string;
  email: string;
  plan: string;
  subscriptionStatus: string;
  trialEndsAt: string | null;
  competitorCount: number;
  reportCount: number;
  submittedAt: string | null;
}

interface ReportRequest {
  id: string;
  customerId: string;
  companyName: string;
  status: "pending" | "in-progress" | "delivered";
  dueDate: string;
  cadence: string;
  createdAt: string;
  deliveredAt: string | null;
}

interface CognitoUser {
  username: string;
  email: string;
  role: string;
  customerId: string;
  status: string;
}

export default function AdminPage() {
  const { isAdmin, setCustomerId } = usePortal();
  const router = useRouter();
  const [tab, setTab] = useState<"requests" | "customers" | "users" | "create">("requests");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [users, setUsers] = useState<CognitoUser[]>([]);
  const [requests, setRequests] = useState<ReportRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Create org form
  const [newCompany, setNewCompany] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [creating, setCreating] = useState(false);

  // Add user form
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserCustomerId, setNewUserCustomerId] = useState("");
  const [newUserRole, setNewUserRole] = useState<"customer" | "admin">("customer");
  const [addingUser, setAddingUser] = useState(false);

  // Feedback
  const [userMessage, setUserMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [orgMessage, setOrgMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (!isAdmin) return;
    async function load() {
      try {
        const [custRes, userRes, reqRes] = await Promise.all([
          fetch("/api/portal/admin/customers"),
          fetch("/api/portal/admin/users"),
          fetch("/api/portal/admin/requests"),
        ]);
        if (custRes.ok) {
          const json = await custRes.json();
          setCustomers(json.customers ?? []);
        }
        if (userRes.ok) {
          const json = await userRes.json();
          setUsers(json.users ?? []);
        }
        if (reqRes.ok) {
          const json = await reqRes.json();
          setRequests(json.requests ?? []);
        }
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [isAdmin]);

  function viewCustomer(id: string) {
    setCustomerId(id);
    router.push("/portal");
  }

  async function handleCreateOrg(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setOrgMessage(null);
    try {
      const res = await fetch("/api/portal/admin/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: newCompany,
          contactName: newContact,
          email: newEmail,
          website: newWebsite,
        }),
      });
      if (res.ok) {
        setNewCompany("");
        setNewContact("");
        setNewEmail("");
        setNewWebsite("");
        // Refresh customers
        const custRes = await fetch("/api/portal/admin/customers");
        if (custRes.ok) {
          const json = await custRes.json();
          setCustomers(json.customers ?? []);
        }
        setTab("customers");
      } else {
        const data = await res.json();
        setOrgMessage({ type: "error", text: data.error || "Failed to create organization" });
      }
    } catch {
      setOrgMessage({ type: "error", text: "Something went wrong" });
    } finally {
      setCreating(false);
    }
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    setAddingUser(true);
    setUserMessage(null);
    try {
      const res = await fetch("/api/portal/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: newUserEmail,
          customerId: newUserCustomerId,
          role: newUserRole,
        }),
      });
      if (res.ok) {
        setUserMessage({ type: "success", text: `Invite sent to ${newUserEmail}` });
        setNewUserEmail("");
        setNewUserCustomerId("");
        setNewUserRole("customer");
        setShowAddUser(false);
        const userRes = await fetch("/api/portal/admin/users");
        if (userRes.ok) {
          const json = await userRes.json();
          setUsers(json.users ?? []);
        }
      } else {
        const data = await res.json();
        setUserMessage({ type: "error", text: data.error || "Failed to add user" });
      }
    } catch {
      setUserMessage({ type: "error", text: "Something went wrong" });
    } finally {
      setAddingUser(false);
    }
  }

  async function deleteUser(username: string) {
    if (!confirm(`Delete user ${username}?`)) return;
    await fetch("/api/portal/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    setUsers(users.filter((u) => u.username !== username));
  }

  async function handleRequestAction(requestId: string, action: "start" | "deliver") {
    setActionLoading(requestId);
    try {
      const res = await fetch("/api/portal/admin/requests", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action }),
      });
      if (res.ok) {
        const reqRes = await fetch("/api/portal/admin/requests");
        if (reqRes.ok) {
          const json = await reqRes.json();
          setRequests(json.requests ?? []);
        }
      }
    } catch {
      // Silently fail
    } finally {
      setActionLoading(null);
    }
  }

  function requestRowClass(req: ReportRequest): string {
    if (req.status === "delivered") return "";
    const today = new Date().toISOString().slice(0, 10);
    if (req.status === "in-progress") return "bg-blue-50";
    if (req.dueDate < today) return "bg-red-50";
    if (req.dueDate === today) return "bg-amber-50";
    return "";
  }

  if (!isAdmin) {
    return <p className="text-[var(--color-text-muted)]">Access denied.</p>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--color-accent)] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>
          Admin
        </h1>
        <button
          onClick={() => setTab("create")}
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brown)] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[var(--color-brown-light)]"
        >
          <Plus className="h-4 w-4" />
          New organization
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-1 rounded-xl bg-[var(--color-cream-dark)] p-1">
        {[
          { id: "requests" as const, label: "Requests", icon: ClipboardList },
          { id: "customers" as const, label: "Customers", icon: Building2 },
          { id: "users" as const, label: "Users", icon: Users },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              tab === t.id
                ? "bg-white text-[var(--color-text-primary)] shadow-sm"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Requests Tab */}
      {tab === "requests" && (
        <div className="space-y-3">
          {requests.length === 0 ? (
            <p className="text-center text-sm text-[var(--color-text-muted)] py-8">No requests yet.</p>
          ) : (
            <div className="rounded-2xl border border-[var(--color-border-warm)] bg-white overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border-warm)] bg-[var(--color-cream)]">
                    <th className="px-4 py-2 text-left font-medium text-[var(--color-text-muted)]">Company</th>
                    <th className="px-4 py-2 text-left font-medium text-[var(--color-text-muted)]">Due date</th>
                    <th className="px-4 py-2 text-left font-medium text-[var(--color-text-muted)]">Cadence</th>
                    <th className="px-4 py-2 text-left font-medium text-[var(--color-text-muted)]">Status</th>
                    <th className="px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {requests
                    .filter((r) => r.status !== "delivered")
                    .concat(requests.filter((r) => r.status === "delivered"))
                    .map((r) => (
                    <tr key={r.id} className={`border-b border-[var(--color-border-warm)] last:border-0 ${requestRowClass(r)}`}>
                      <td className="px-4 py-2 font-medium text-[var(--color-text-primary)]">{r.companyName}</td>
                      <td className="px-4 py-2 text-[var(--color-text-muted)]">{r.dueDate}</td>
                      <td className="px-4 py-2 text-[var(--color-text-muted)] capitalize">{r.cadence}</td>
                      <td className="px-4 py-2">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          r.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : r.status === "in-progress"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        {r.status === "pending" && (
                          <button
                            onClick={() => handleRequestAction(r.id, "start")}
                            disabled={actionLoading === r.id}
                            className="rounded-lg bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                          >
                            {actionLoading === r.id ? "..." : "Start"}
                          </button>
                        )}
                        {r.status === "in-progress" && (
                          <button
                            onClick={() => handleRequestAction(r.id, "deliver")}
                            disabled={actionLoading === r.id}
                            className="rounded-lg bg-[var(--color-accent)] px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50"
                          >
                            {actionLoading === r.id ? "..." : "Mark as delivered"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Customers Tab */}
      {tab === "customers" && (
        <div className="space-y-3">
          {customers.length === 0 ? (
            <p className="text-center text-sm text-[var(--color-text-muted)] py-8">No customers yet.</p>
          ) : (
            customers.map((c) => (
              <button
                key={c.id}
                onClick={() => viewCustomer(c.id)}
                className="w-full rounded-2xl border border-[var(--color-border-warm)] bg-white p-4 text-left transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-[var(--color-text-primary)]">{c.companyName}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{c.email}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                    <span className="capitalize">{c.plan}</span>
                    <span className={`rounded-full px-2 py-0.5 font-medium ${
                      c.subscriptionStatus === "active" || c.subscriptionStatus === "trialing"
                        ? "bg-green-100 text-green-700"
                        : c.subscriptionStatus === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {c.subscriptionStatus}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3.5 w-3.5" />
                      {c.reportCount}
                    </span>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {/* Users Tab */}
      {tab === "users" && (
        <div className="space-y-3">
          {userMessage && (
            <div className={`rounded-lg px-4 py-2 text-sm ${userMessage.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {userMessage.text}
            </div>
          )}
          {showAddUser ? (
            <div className="rounded-2xl border border-[var(--color-border-warm)] bg-white p-6">
              <h2 className="mb-4 text-lg font-bold text-[var(--color-text-primary)]">Add User</h2>
              <form onSubmit={handleAddUser} className="flex flex-col gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Email</label>
                  <input type="email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} required className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Organization</label>
                  <select value={newUserCustomerId} onChange={(e) => setNewUserCustomerId(e.target.value)} required className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]">
                    <option value="">Select an organization...</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>{c.companyName} ({c.id})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Role</label>
                  <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value as "customer" | "admin")} className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={addingUser} className="rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50">
                    {addingUser ? "Adding..." : "Add user"}
                  </button>
                  <button type="button" onClick={() => setShowAddUser(false)} className="rounded-lg border border-[var(--color-border-warm)] px-5 py-2.5 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-cream)]">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <button
              onClick={() => setShowAddUser(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-brown)] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[var(--color-brown-light)]"
            >
              <Plus className="h-4 w-4" />
              Add user
            </button>
          )}
          <div className="rounded-2xl border border-[var(--color-border-warm)] bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border-warm)] bg-[var(--color-cream)]">
                <th className="px-4 py-2 text-left font-medium text-[var(--color-text-muted)]">Email</th>
                <th className="px-4 py-2 text-left font-medium text-[var(--color-text-muted)]">Org</th>
                <th className="px-4 py-2 text-left font-medium text-[var(--color-text-muted)]">Role</th>
                <th className="px-4 py-2 text-left font-medium text-[var(--color-text-muted)]">Status</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.username} className="border-b border-[var(--color-border-warm)] last:border-0">
                  <td className="px-4 py-2 text-[var(--color-text-primary)]">{u.email}</td>
                  <td className="px-4 py-2 text-[var(--color-text-muted)]">{u.customerId}</td>
                  <td className="px-4 py-2 text-[var(--color-text-muted)]">{u.role}</td>
                  <td className="px-4 py-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      u.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {u.role !== "admin" && (
                      <button
                        onClick={() => deleteUser(u.username)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {/* Create Organization */}
      {tab === "create" && (
        <div className="rounded-2xl border border-[var(--color-border-warm)] bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-[var(--color-text-primary)]">New Organization</h2>
          {orgMessage && (
            <div className={`mb-4 rounded-lg px-4 py-2 text-sm ${orgMessage.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
              {orgMessage.text}
            </div>
          )}
          <form onSubmit={handleCreateOrg} className="flex flex-col gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Company name</label>
              <input type="text" value={newCompany} onChange={(e) => setNewCompany(e.target.value)} required className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Contact name</label>
              <input type="text" value={newContact} onChange={(e) => setNewContact(e.target.value)} required className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Email</label>
              <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--color-text-primary)]">Website</label>
              <input type="text" value={newWebsite} onChange={(e) => setNewWebsite(e.target.value)} placeholder="company.com" className="w-full rounded-lg border border-[var(--color-border-warm)] bg-[var(--color-cream)] px-4 py-2.5 text-sm outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]" />
            </div>
            <button type="submit" disabled={creating} className="rounded-lg bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-dark)] disabled:opacity-50">
              {creating ? "Creating..." : "Create organization"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
