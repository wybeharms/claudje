import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createCognitoUser } from "@/lib/cognito";
import { putJsonToS3 } from "@/lib/s3";

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

    return NextResponse.json({ success: true, organizationId: orgId });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to create organization";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
