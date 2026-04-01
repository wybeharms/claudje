import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getJsonFromS3 } from "@/lib/s3";
import { getStripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = session.user.role ?? "customer";
  const isAdmin = role === "admin";
  let customerId = session.user.customerId ?? "";
  if (isAdmin) {
    const param = req.nextUrl.searchParams.get("customerId");
    if (param) customerId = param;
  }

  if (!customerId) {
    return NextResponse.json({ error: "No customer ID" }, { status: 400 });
  }

  const context = await getJsonFromS3<Record<string, unknown>>(
    `${customerId}/onboarding/context.json`
  );

  return NextResponse.json({
    plan: context?.plan || "starter",
    subscriptionStatus: context?.subscriptionStatus || "unknown",
    trialEndsAt: context?.trialEndsAt || null,
    stripeCustomerId: context?.stripeCustomerId || null,
  });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const customerId = session.user.customerId ?? "";
  if (!customerId) {
    return NextResponse.json({ error: "No customer ID" }, { status: 400 });
  }

  const context = await getJsonFromS3<Record<string, unknown>>(
    `${customerId}/onboarding/context.json`
  );

  const stripeCustomerId = context?.stripeCustomerId as string;
  if (!stripeCustomerId) {
    return NextResponse.json({ error: "No Stripe customer" }, { status: 400 });
  }

  const baseUrl = (process.env.NEXTAUTH_URL || "").replace(/\/+$/, "");
  const siteUrl = /^https?:\/\//.test(baseUrl) ? baseUrl : `https://${baseUrl}`;

  const portalSession = await getStripe().billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${siteUrl}/portal/settings`,
  });

  return NextResponse.json({ url: portalSession.url });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = session.user.role ?? "customer";
  const isAdmin = role === "admin";
  let customerId = session.user.customerId ?? "";
  if (isAdmin) {
    const param = req.nextUrl.searchParams.get("customerId");
    if (param) customerId = param;
  }

  if (!customerId) {
    return NextResponse.json({ error: "No customer ID" }, { status: 400 });
  }

  const context = await getJsonFromS3<Record<string, unknown>>(
    `${customerId}/onboarding/context.json`
  );

  const stripeSubscriptionId = context?.stripeSubscriptionId as string;
  if (!stripeSubscriptionId) {
    return NextResponse.json({ error: "No active subscription" }, { status: 400 });
  }

  const subscription = await getStripe().subscriptions.cancel(stripeSubscriptionId);

  return NextResponse.json({
    status: subscription.status,
    cancelledAt: new Date().toISOString(),
  });
}
