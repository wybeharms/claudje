import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getJsonFromS3, putJsonToS3 } from "@/lib/s3";

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

  if (!context) {
    return NextResponse.json({ data: null });
  }

  return NextResponse.json({
    data: {
      companyName: context.companyName,
      website: context.website,
      contactName: context.contactName,
      industry: context.industry,
      companyDescription: context.companyDescription,
      competitors: context.competitors,
      reportModules: context.reportModules,
      additionalContext: context.additionalContext,
    },
  });
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = session.user.role ?? "customer";
  const isAdmin = role === "admin";
  let customerId = session.user.customerId ?? "";
  if (isAdmin) {
    const body = await req.json();
    if (body.customerId) customerId = body.customerId;
  }

  if (!customerId) {
    return NextResponse.json({ error: "No customer ID" }, { status: 400 });
  }

  const body = await req.json();
  const existing = await getJsonFromS3<Record<string, unknown>>(
    `${customerId}/onboarding/context.json`
  );

  const allowedFields = [
    "companyName", "website", "contactName", "industry",
    "companyDescription", "competitors", "reportModules", "additionalContext",
  ];

  const updates: Record<string, unknown> = {};
  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      updates[field] = body[field];
    }
  }

  await putJsonToS3(`${customerId}/onboarding/context.json`, {
    ...existing,
    ...updates,
    updatedAt: new Date().toISOString(),
  });

  return NextResponse.json({ success: true });
}
