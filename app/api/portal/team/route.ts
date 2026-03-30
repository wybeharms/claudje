import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { listUsersByCustomerId } from "@/lib/cognito";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Admin can view any org's team; customers see their own
  let customerId = session.user.customerId;
  if (session.user.role === "admin") {
    const param = req.nextUrl.searchParams.get("customerId");
    if (param) customerId = param;
  }

  if (!customerId || customerId === "all") {
    return NextResponse.json({ members: [] });
  }

  try {
    const users = await listUsersByCustomerId(customerId);
    const members = users.map((u) => ({
      email: u.email,
      status: u.status,
      createdAt: u.createdAt,
    }));
    return NextResponse.json({ members });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to load team";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
