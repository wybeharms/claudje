import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUploadUrl } from "@/lib/s3";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { filename, contentType } = await req.json();
  if (!filename || !contentType) {
    return NextResponse.json(
      { error: "filename and contentType required" },
      { status: 400 }
    );
  }

  const role = session.user.role ?? "customer";
  const isAdmin = role === "admin";
  const customerId = session.user.customerId ?? "";

  if (!customerId && !isAdmin) {
    return NextResponse.json({ error: "No customer ID" }, { status: 400 });
  }

  const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const key = `${customerId}/onboarding/${safeName}`;

  const url = await getUploadUrl(key, contentType);
  return NextResponse.json({ url, key });
}
