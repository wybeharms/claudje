import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const clientId = process.env.COGNITO_CLIENT_ID ?? "";
    const clientSecret = process.env.COGNITO_CLIENT_SECRET ?? "";
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID ?? "";
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY ?? "";

    const { createHmac } = await import("crypto");
    const hash = createHmac("sha256", clientSecret)
      .update(email + clientId)
      .digest("base64");

    const { CognitoIdentityProviderClient, AdminInitiateAuthCommand } =
      await import("@aws-sdk/client-cognito-identity-provider");

    const client = new CognitoIdentityProviderClient({
      region: process.env.AWS_REGION || "eu-north-1",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const res = await client.send(
      new AdminInitiateAuthCommand({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        ClientId: clientId,
        AuthFlow: "ADMIN_USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
          SECRET_HASH: hash,
        },
      })
    );

    return NextResponse.json({
      ok: true,
      challenge: res.ChallengeName ?? null,
      hasToken: !!res.AuthenticationResult?.IdToken,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    const name = err instanceof Error ? err.constructor.name : "Unknown";
    return NextResponse.json({ ok: false, error: msg, name }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    hasSessionToken: !!process.env.AWS_SESSION_TOKEN,
    clientIdLen: process.env.COGNITO_CLIENT_ID?.length,
    clientSecretLen: process.env.COGNITO_CLIENT_SECRET?.length,
    accessKeyLen: process.env.AWS_ACCESS_KEY_ID?.length,
    secretKeyLen: process.env.AWS_SECRET_ACCESS_KEY?.length,
  });
}
