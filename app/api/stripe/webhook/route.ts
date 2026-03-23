import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getJsonFromS3, putJsonToS3 } from "@/lib/s3";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const orgId = session.metadata?.organizationId;
        if (!orgId) break;

        const subscription = await getStripe().subscriptions.retrieve(
          session.subscription as string
        );

        const existing = await getJsonFromS3<Record<string, unknown>>(
          `${orgId}/onboarding/context.json`
        );

        await putJsonToS3(`${orgId}/onboarding/context.json`, {
          ...existing,
          stripeSubscriptionId: subscription.id,
          subscriptionStatus: subscription.status,
          trialStartDate: new Date(
            subscription.trial_start! * 1000
          ).toISOString(),
          trialEndsAt: new Date(
            subscription.trial_end! * 1000
          ).toISOString(),
          updatedAt: new Date().toISOString(),
        });
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId =
          typeof invoice.parent?.subscription_details?.subscription === "string"
            ? invoice.parent.subscription_details.subscription
            : null;
        if (!subId) break;

        const subscription = await getStripe().subscriptions.retrieve(subId);
        const orgId = subscription.metadata?.organizationId;
        if (!orgId) break;

        const existing = await getJsonFromS3<Record<string, unknown>>(
          `${orgId}/onboarding/context.json`
        );

        await putJsonToS3(`${orgId}/onboarding/context.json`, {
          ...existing,
          subscriptionStatus: "active",
          updatedAt: new Date().toISOString(),
        });
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const orgId = subscription.metadata?.organizationId;
        if (!orgId) break;

        const existing = await getJsonFromS3<Record<string, unknown>>(
          `${orgId}/onboarding/context.json`
        );

        await putJsonToS3(`${orgId}/onboarding/context.json`, {
          ...existing,
          subscriptionStatus: subscription.status,
          updatedAt: new Date().toISOString(),
        });
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const orgId = subscription.metadata?.organizationId;
        if (!orgId) break;

        const existing = await getJsonFromS3<Record<string, unknown>>(
          `${orgId}/onboarding/context.json`
        );

        await putJsonToS3(`${orgId}/onboarding/context.json`, {
          ...existing,
          subscriptionStatus: "cancelled",
          updatedAt: new Date().toISOString(),
        });
        break;
      }
    }
  } catch {
    // Log but don't fail — Stripe retries
  }

  return NextResponse.json({ received: true });
}
