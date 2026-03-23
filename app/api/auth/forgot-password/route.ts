import { NextRequest, NextResponse } from "next/server";
import {
  forgotPassword,
  confirmForgotPassword,
} from "@/lib/cognito";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  try {
    if (action === "request") {
      const { email } = body;
      if (!email) {
        return NextResponse.json(
          { error: "Email is required" },
          { status: 400 }
        );
      }

      await forgotPassword(email);
      return NextResponse.json({ success: true });
    }

    if (action === "confirm") {
      const { email, code, newPassword } = body;
      if (!email || !code || !newPassword) {
        return NextResponse.json(
          { error: "Email, code, and newPassword are required" },
          { status: 400 }
        );
      }

      await confirmForgotPassword(email, code, newPassword);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Password reset failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
