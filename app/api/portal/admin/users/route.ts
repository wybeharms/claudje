import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  listCognitoUsers,
  createCognitoUser,
  deleteCognitoUser,
} from "@/lib/cognito";
import { sendInviteEmail } from "@/lib/ses";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await listCognitoUsers();
  return NextResponse.json({ users });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { email, role, customerId } = await req.json();
  if (!email || !customerId) {
    return NextResponse.json(
      { error: "email and customerId are required" },
      { status: 400 }
    );
  }

  try {
    const { user, tempPassword } = await createCognitoUser(
      email,
      role || "customer",
      customerId
    );

    // Send branded invite email (non-blocking)
    sendInviteEmail({
      to: email,
      tempPassword,
      orgName: customerId,
    }).catch(() => {});

    return NextResponse.json({ success: true, user });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to create user";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { username } = await req.json();
  if (!username) {
    return NextResponse.json({ error: "username is required" }, { status: 400 });
  }

  try {
    await deleteCognitoUser(username);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to delete user";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
