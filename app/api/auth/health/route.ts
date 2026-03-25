import { NextResponse } from "next/server";

export async function GET() {
  const vars = {
    COGNITO_USER_POOL_ID: mask(process.env.COGNITO_USER_POOL_ID),
    COGNITO_CLIENT_ID: mask(process.env.COGNITO_CLIENT_ID),
    COGNITO_CLIENT_SECRET: mask(process.env.COGNITO_CLIENT_SECRET),
    AWS_REGION: process.env.AWS_REGION ?? "(not set)",
    AWS_ACCESS_KEY_ID: mask(process.env.AWS_ACCESS_KEY_ID),
    AWS_SECRET_ACCESS_KEY: mask(process.env.AWS_SECRET_ACCESS_KEY),
    AUTH_SECRET: mask(process.env.AUTH_SECRET),
  };
  return NextResponse.json(vars);
}

function mask(val: string | undefined): string {
  if (!val) return "(not set)";
  if (val.length <= 6) return val[0] + "***" + val.slice(-1);
  return val.slice(0, 4) + "***" + val.slice(-4);
}
