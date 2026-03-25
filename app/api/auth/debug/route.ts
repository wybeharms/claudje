import { NextResponse } from "next/server";
import {
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { createHmac } from "crypto";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const region = process.env.AWS_REGION || "eu-north-1";
  const poolId = process.env.COGNITO_USER_POOL_ID;
  const clientId = process.env.COGNITO_CLIENT_ID;
  const clientSecret = process.env.COGNITO_CLIENT_SECRET;

  const hash = createHmac("sha256", clientSecret!)
    .update(email + clientId)
    .digest("base64");

  try {
    const client = new CognitoIdentityProviderClient({ region });
    const res = await client.send(
      new AdminInitiateAuthCommand({
        UserPoolId: poolId,
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
    const e = err as { name?: string; message?: string; $metadata?: unknown };
    return NextResponse.json(
      {
        ok: false,
        errorName: e.name,
        errorMessage: e.message,
        metadata: e.$metadata,
      },
      { status: 400 }
    );
  }
}
