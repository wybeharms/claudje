import { NextRequest, NextResponse } from "next/server";
import { createCognitoUserWithPassword } from "@/lib/cognito";
import { putJsonToS3 } from "@/lib/s3";
import { getStripe } from "@/lib/stripe";

const STRIPE_ENABLED = !!(
  process.env.STRIPE_SECRET_KEY && process.env.STRIPE_STARTER_PRICE_ID
);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    contactName,
    email,
    password,
    companyName,
    website,
    industry,
    companyDescription,
    competitors,
    reportModules,
    additionalContext,
    uploadedFiles,
    plan,
  } = body;

  if (!email || !password || !companyName || !website || !contactName) {
    return NextResponse.json(
      { error: "Required fields: contactName, email, password, companyName, website" },
      { status: 400 }
    );
  }

  if (!competitors || competitors.length === 0) {
    return NextResponse.json(
      { error: "At least one competitor is required" },
      { status: 400 }
    );
  }

  // Derive organizationId from website domain
  const orgId = website
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .replace(/[^a-z0-9.-]+/gi, "")
    .toLowerCase();

  const selectedPlan = plan || "starter";
  const now = new Date().toISOString();

  try {
    // 1. Create Cognito user with the password they chose
    await createCognitoUserWithPassword(email, password, "customer", orgId);

    let stripeCustomerId = "";
    let checkoutUrl = "";

    // 2. Stripe (skipped if not configured)
    if (STRIPE_ENABLED) {
      const stripeCustomer = await getStripe().customers.create({
        email,
        name: companyName,
        metadata: { organizationId: orgId, contactName },
      });
      stripeCustomerId = stripeCustomer.id;

      const priceId =
        selectedPlan === "pro"
          ? process.env.STRIPE_PRO_PRICE_ID!
          : process.env.STRIPE_STARTER_PRICE_ID!;

      const session = await getStripe().checkout.sessions.create({
        customer: stripeCustomer.id,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [{ price: priceId, quantity: 1 }],
        subscription_data: {
          trial_period_days: 14,
          metadata: { organizationId: orgId },
        },
        success_url: `${process.env.NEXTAUTH_URL}/portal?setup=complete`,
        cancel_url: `${process.env.NEXTAUTH_URL}/get-started?cancelled=true`,
        metadata: { organizationId: orgId },
      });
      checkoutUrl = session.url || "";
    }

    // 3. Save context to S3
    await putJsonToS3(`${orgId}/onboarding/context.json`, {
      companyName,
      website,
      contactName,
      email,
      industry: industry || "",
      companyDescription: companyDescription || "",
      competitors: competitors || [],
      reportModules: reportModules || [
        "pricing-products",
        "online-reviews",
        "web-digital",
        "company-registry",
        "market-seo",
      ],
      additionalContext: additionalContext || "",
      uploadedFiles: uploadedFiles || [],
      plan: selectedPlan,
      stripeCustomerId,
      subscriptionStatus: STRIPE_ENABLED ? "pending" : "trialing",
      trialStartDate: now,
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      submittedAt: now,
      updatedAt: now,
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: checkoutUrl || null,
      organizationId: orgId,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to create account";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
