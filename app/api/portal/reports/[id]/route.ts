import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getTextFromS3, getJsonFromS3 } from "@/lib/s3";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
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

  const [markdown, meta] = await Promise.all([
    getTextFromS3(`${customerId}/reports/${id}/report.md`),
    getJsonFromS3<Record<string, unknown>>(`${customerId}/reports/${id}/meta.json`),
  ]);

  if (!markdown) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  return NextResponse.json({
    id,
    markdown,
    ...meta,
  });
}
