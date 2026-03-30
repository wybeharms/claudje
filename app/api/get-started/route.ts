import { NextRequest, NextResponse } from "next/server";
import { createCognitoUserWithPassword, authenticateUser, parseIdToken } from "@/lib/cognito";
import { createAuthToken } from "@/lib/auth-token";
import { putJsonToS3 } from "@/lib/s3";
import { getStripe } from "@/lib/stripe";
import { sendNotificationEmail, sendWelcomeEmail } from "@/lib/ses";
import { deriveOrgId, checkOrgExists } from "@/lib/org";

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
    phone,
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

  const orgId = deriveOrgId(website);

  const selectedPlan = plan || "starter";
  const now = new Date().toISOString();

  try {
    // Check for duplicate organization
    const orgExists = await checkOrgExists(orgId);
    if (orgExists) {
      return NextResponse.json(
        {
          error: "An organization with this website domain already exists. Please contact support if you want to join an existing organization.",
        },
        { status: 409 }
      );
    }
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

      const priceMap: Record<string, string | undefined> = {
        starter: process.env.STRIPE_STARTER_PRICE_ID,
        business: process.env.STRIPE_BUSINESS_PRICE_ID,
        pro: process.env.STRIPE_PRO_PRICE_ID,
      };
      const priceId = priceMap[selectedPlan] || process.env.STRIPE_STARTER_PRICE_ID!;

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
      phone: phone || "",
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

    // 4. Notify admin
    sendNotificationEmail({
      to: "bharmsuva@gmail.com",
      subject: `New claudje signup: ${companyName}`,
      textBody: `New customer signed up!\n\nCompany: ${companyName}\nContact: ${contactName}\nEmail: ${email}\nWebsite: ${website}\nPlan: ${selectedPlan}\nCompetitors: ${(competitors || []).length}\nOrg ID: ${orgId}\n\nNext step: run /new-customer ${orgId} in the customers repo.`,
    }).catch(() => {});

    // 5. Welcome email to customer
    sendWelcomeEmail({
      to: email,
      contactName,
      companyName,
    }).catch(() => {});

    // 6. Auto-authenticate for seamless login
    let authToken: string | null = null;
    try {
      const authResult = await authenticateUser(email, password);
      if ("success" in authResult) {
        const user = parseIdToken(authResult.idToken);
        authToken = createAuthToken(user);
      }
    } catch {
      // Non-critical — user can still log in manually
    }

    return NextResponse.json({
      success: true,
      checkoutUrl: checkoutUrl || null,
      organizationId: orgId,
      authToken,
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to create account";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
