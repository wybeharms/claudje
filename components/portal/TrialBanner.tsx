"use client";

interface Props {
  trialEndsAt?: string;
  subscriptionStatus?: string;
}

export default function TrialBanner({ trialEndsAt, subscriptionStatus }: Props) {
  if (subscriptionStatus !== "trialing" || !trialEndsAt) return null;

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(trialEndsAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  return (
    <div className="flex items-center justify-center gap-2 bg-[var(--color-accent)]/10 px-4 py-1.5 text-xs font-medium text-[var(--color-accent)]">
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>
        {daysLeft === 0
          ? "Your trial ends today"
          : `${daysLeft} day${daysLeft === 1 ? "" : "s"} left in your free trial`}
      </span>
    </div>
  );
}
