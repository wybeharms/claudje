import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCognitoUser } from "@/lib/cognito";
import { putJsonToS3 } from "@/lib/s3";
import { sendNotificationEmail } from "@/lib/ses";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { companyName, contactName, email, website } = await req.json();

  if (!companyName || !contactName || !email) {
    return NextResponse.json(
      { error: "companyName, contactName, and email are required" },
      { status: 400 }
    );
  }

  const orgId = (website || companyName)
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/(^-|-$)/g, "");

  try {
    await createCognitoUser(email, "customer", orgId);

    await putJsonToS3(`${orgId}/onboarding/context.json`, {
      companyName,
      contactName,
      email,
      website: website || "",
      competitors: [],
      reportModules: ["pricing-products", "online-reviews", "web-digital", "company-registry", "market-seo"],
      plan: "starter",
      subscriptionStatus: "manual",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    const notifyEmail = process.env.SES_NOTIFY_EMAIL || "beer.claudje@gmail.com";
    sendNotificationEmail({
      to: notifyEmail,
      subject: `New claudje org (admin): ${companyName}`,
      textBody: `Admin created new organization.\n\nCompany: ${companyName}\nContact: ${contactName}\nEmail: ${email}\nWebsite: ${website || "(none)"}\nOrg ID: ${orgId}\n\nNext step: run /new-customer ${orgId} in the customers repo.`,
    }).catch(() => {});

    return NextResponse.json({ success: true, organizationId: orgId });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to create organization";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
