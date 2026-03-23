import { createHmac } from "crypto";

const AUTH_SECRET = process.env.AUTH_SECRET!;

export function createAuthToken(payload: {
  email: string;
  role: string;
  customerId: string;
}): string {
  const data = { ...payload, exp: Date.now() + 60_000 };
  const encoded = Buffer.from(JSON.stringify(data)).toString("base64url");
  const sig = createHmac("sha256", AUTH_SECRET)
    .update(encoded)
    .digest("base64url");
  return `${encoded}.${sig}`;
}

export function verifyAuthToken(
  token: string
): { email: string; role: string; customerId: string } | null {
  const [encoded, sig] = token.split(".");
  if (!encoded || !sig) return null;

  const expectedSig = createHmac("sha256", AUTH_SECRET)
    .update(encoded)
    .digest("base64url");
  if (sig !== expectedSig) return null;

  const data = JSON.parse(Buffer.from(encoded, "base64url").toString());
  if (data.exp < Date.now()) return null;

  return { email: data.email, role: data.role, customerId: data.customerId };
}
