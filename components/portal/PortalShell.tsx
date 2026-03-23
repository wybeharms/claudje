"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

async function handleSignOut() {
  await signOut({ callbackUrl: "/" });
}

import { PortalProvider, usePortal } from "./PortalContext";
import PortalSidebar from "./PortalSidebar";
import PortalHeader from "./PortalHeader";
import TrialBanner from "./TrialBanner";

interface OnboardingContext {
  trialEndsAt?: string;
  subscriptionStatus?: string;
  companyName?: string;
}

function PortalShellInner({
  children,
  userName,
  userEmail,
}: {
  children: React.ReactNode;
  userName: string;
  userEmail: string;
}) {
  const { customerId, isAdmin, isViewingCustomer, clearCustomer } = usePortal();
  const router = useRouter();
  const [context, setContext] = useState<OnboardingContext | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("claudje-sidebar-collapsed");
    if (stored !== null) setSidebarCollapsed(stored === "true");
  }, []);

  useEffect(() => {
    if (isAdmin && !isViewingCustomer) {
      setContext(null);
      return;
    }

    async function fetchContext() {
      try {
        const params = new URLSearchParams();
        if (isAdmin && customerId) params.set("customerId", customerId);
        const res = await fetch(`/api/portal/onboarding?${params}`);
        if (res.ok) {
          const json = await res.json();
          if (json.data) setContext(json.data);
          else setContext(null);
        }
      } catch {
        // Silently fail
      }
    }
    fetchContext();
  }, [customerId, isAdmin, isViewingCustomer]);

  function handleBackToAdmin() {
    clearCustomer();
    router.push("/portal/admin");
  }

  return (
    <div className="flex h-screen">
      <PortalSidebar
        isAdmin={isAdmin}
        collapsed={sidebarCollapsed}
        onToggle={() => {
          const next = !sidebarCollapsed;
          setSidebarCollapsed(next);
          localStorage.setItem("claudje-sidebar-collapsed", String(next));
        }}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TrialBanner
          trialEndsAt={context?.trialEndsAt}
          subscriptionStatus={context?.subscriptionStatus}
        />
        {isViewingCustomer && (
          <div className="flex items-center justify-center gap-3 bg-[var(--color-accent)]/10 px-4 py-1.5 text-xs font-medium text-[var(--color-accent)]">
            <span>
              Viewing: {context?.companyName || customerId}
            </span>
            <button
              onClick={handleBackToAdmin}
              className="rounded bg-[var(--color-accent)]/20 px-2 py-0.5 text-xs font-medium text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent)]/30"
            >
              Back to Admin
            </button>
          </div>
        )}
        <PortalHeader
          userName={userName}
          userEmail={userEmail}
          isAdmin={isAdmin}
          onSignOut={handleSignOut}
        />
        <main className="flex-1 overflow-y-auto bg-[var(--color-cream)] p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function PortalShell({
  children,
  userName,
  userEmail,
  defaultCustomerId,
  role,
}: {
  children: React.ReactNode;
  userName: string;
  userEmail: string;
  defaultCustomerId: string;
  role: string;
}) {
  return (
    <PortalProvider defaultCustomerId={defaultCustomerId} role={role}>
      <PortalShellInner userName={userName} userEmail={userEmail}>
        {children}
      </PortalShellInner>
    </PortalProvider>
  );
}
