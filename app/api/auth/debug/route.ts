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
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  const hash = createHmac("sha256", clientSecret!)
    .update(email + clientId)
    .digest("base64");

  const debug = {
    secretHash: hash,
    clientIdLength: clientId?.length,
    clientSecretLength: clientSecret?.length,
    accessKeyIdLength: accessKeyId?.length,
    secretAccessKeyLength: secretAccessKey?.length,
    hasSessionToken: !!process.env.AWS_SESSION_TOKEN,
    region,
  };

  try {
    // Pass credentials explicitly to bypass any Vercel/Lambda credential chain
    const client = new CognitoIdentityProviderClient({
      region,
      credentials: {
        accessKeyId: accessKeyId!,
        secretAccessKey: secretAccessKey!,
      },
    });
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
      debug,
    });
  } catch (err: unknown) {
    const e = err as { name?: string; message?: string; $metadata?: unknown };
    return NextResponse.json(
      {
        ok: false,
        errorName: e.name,
        errorMessage: e.message,
        metadata: e.$metadata,
        debug,
      },
      { status: 400 }
    );
  }
}
