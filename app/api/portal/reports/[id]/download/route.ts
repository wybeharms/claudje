import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getDownloadUrl } from "@/lib/s3";

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

  const format = req.nextUrl.searchParams.get("format") || "pdf";
  const ext = format === "word" ? "docx" : "pdf";
  const key = `${customerId}/reports/${id}/report.${ext}`;

  const url = await getDownloadUrl(key);
  return NextResponse.json({ url });
}
