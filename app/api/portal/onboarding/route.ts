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
    return NextResponse.json({ data: null });
  }

  const data = await getJsonFromS3(`${customerId}/onboarding/context.json`);
  return NextResponse.json({ data });
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
    const existing = await getJsonFromS3<Record<string, unknown>>(
      `${customerId}/onboarding/context.json`
    );
    const merged = { ...existing, ...body, updatedAt: new Date().toISOString() };
    await putJsonToS3(`${customerId}/onboarding/context.json`, merged);
    return NextResponse.json({ success: true });
  }

  if (!customerId) {
    return NextResponse.json({ error: "No customer ID" }, { status: 400 });
  }

  const body = await req.json();
  const existing = await getJsonFromS3<Record<string, unknown>>(
    `${customerId}/onboarding/context.json`
  );
  const merged = { ...existing, ...body, updatedAt: new Date().toISOString() };
  await putJsonToS3(`${customerId}/onboarding/context.json`, merged);
  return NextResponse.json({ success: true });
}
