import { NextRequest, NextResponse } from "next/server";
import {
  authenticateUser,
  respondToNewPasswordChallenge,
  parseIdToken,
} from "@/lib/cognito";
import { createAuthToken } from "@/lib/auth-token";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { action } = body;

  try {
    if (action === "login") {
      const { email, password } = body;
      if (!email || !password) {
        return NextResponse.json(
          { error: "Email and password required" },
          { status: 400 }
        );
      }

      const result = await authenticateUser(email, password);

      if ("challenge" in result) {
        return NextResponse.json({
          challenge: result.challenge,
          session: result.session,
        });
      }

      const user = parseIdToken(result.idToken);
      const authToken = createAuthToken(user);
      return NextResponse.json({ authToken });
    }

    if (action === "set-password") {
      const { email, newPassword, session } = body;
      if (!email || !newPassword || !session) {
        return NextResponse.json(
          { error: "Email, newPassword, and session required" },
          { status: 400 }
        );
      }

      const result = await respondToNewPasswordChallenge(
        email,
        newPassword,
        session
      );
      const user = parseIdToken(result.idToken);
      const authToken = createAuthToken(user);
      return NextResponse.json({ authToken });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Authentication failed";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
