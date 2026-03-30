import { describe, it, expect, vi, beforeAll } from "vitest";

let createAuthToken: typeof import("@/lib/auth-token").createAuthToken;
let verifyAuthToken: typeof import("@/lib/auth-token").verifyAuthToken;

beforeAll(async () => {
  // AUTH_SECRET must be set before the module loads (it captures at top-level)
  process.env.AUTH_SECRET = "test-secret-key-for-auth-tokens";
  const mod = await import("@/lib/auth-token");
  createAuthToken = mod.createAuthToken;
  verifyAuthToken = mod.verifyAuthToken;
});

describe("auth-token", () => {
  describe("createAuthToken", () => {
    it("creates a token with payload.signature format", () => {
      const token = createAuthToken({
        email: "user@example.com",
        role: "customer",
        customerId: "acme.nl",
      });

      expect(token).toContain(".");
      const parts = token.split(".");
      expect(parts).toHaveLength(2);
      expect(parts[0].length).toBeGreaterThan(0);
      expect(parts[1].length).toBeGreaterThan(0);
    });

    it("encodes email, role, customerId and exp in payload", () => {
      const token = createAuthToken({
        email: "user@example.com",
        role: "admin",
        customerId: "all",
      });

      const [encoded] = token.split(".");
      const payload = JSON.parse(
        Buffer.from(encoded, "base64url").toString()
      );

      expect(payload.email).toBe("user@example.com");
      expect(payload.role).toBe("admin");
      expect(payload.customerId).toBe("all");
      expect(payload.exp).toBeTypeOf("number");
      expect(payload.exp).toBeGreaterThan(Date.now());
    });

    it("sets expiry ~60 seconds in the future", () => {
      const before = Date.now();
      const token = createAuthToken({
        email: "user@example.com",
        role: "customer",
        customerId: "test",
      });
      const after = Date.now();

      const [encoded] = token.split(".");
      const payload = JSON.parse(
        Buffer.from(encoded, "base64url").toString()
      );

      expect(payload.exp).toBeGreaterThanOrEqual(before + 60_000);
      expect(payload.exp).toBeLessThanOrEqual(after + 60_000);
    });
  });

  describe("verifyAuthToken", () => {
    it("verifies a valid token", () => {
      const token = createAuthToken({
        email: "user@example.com",
        role: "customer",
        customerId: "acme.nl",
      });

      const result = verifyAuthToken(token);

      expect(result).not.toBeNull();
      expect(result!.email).toBe("user@example.com");
      expect(result!.role).toBe("customer");
      expect(result!.customerId).toBe("acme.nl");
    });

    it("returns null for tampered payload", () => {
      const token = createAuthToken({
        email: "user@example.com",
        role: "customer",
        customerId: "acme.nl",
      });

      const [, sig] = token.split(".");
      const tamperedPayload = Buffer.from(
        JSON.stringify({
          email: "hacker@evil.com",
          role: "admin",
          customerId: "all",
          exp: Date.now() + 60_000,
        })
      ).toString("base64url");

      const result = verifyAuthToken(`${tamperedPayload}.${sig}`);
      expect(result).toBeNull();
    });

    it("returns null for tampered signature", () => {
      const token = createAuthToken({
        email: "user@example.com",
        role: "customer",
        customerId: "acme.nl",
      });

      const [encoded] = token.split(".");
      const result = verifyAuthToken(`${encoded}.invalidsignature`);
      expect(result).toBeNull();
    });

    it("returns null for expired token", () => {
      const realNow = Date.now;
      vi.spyOn(Date, "now").mockReturnValue(realNow() - 120_000);

      const token = createAuthToken({
        email: "user@example.com",
        role: "customer",
        customerId: "acme.nl",
      });

      vi.restoreAllMocks();

      const result = verifyAuthToken(token);
      expect(result).toBeNull();
    });

    it("returns null for empty string", () => {
      expect(verifyAuthToken("")).toBeNull();
    });

    it("returns null for string without separator", () => {
      expect(verifyAuthToken("nodot")).toBeNull();
    });

    it("returns null for token with empty parts", () => {
      expect(verifyAuthToken(".")).toBeNull();
    });

    it("cannot escalate role via token tampering", () => {
      const customerToken = createAuthToken({
        email: "user@example.com",
        role: "customer",
        customerId: "acme.nl",
      });

      const result = verifyAuthToken(customerToken);
      expect(result!.role).toBe("customer");

      const [, customerSig] = customerToken.split(".");
      const adminPayload = Buffer.from(
        JSON.stringify({
          email: "user@example.com",
          role: "admin",
          customerId: "all",
          exp: Date.now() + 60_000,
        })
      ).toString("base64url");

      const forgedToken = `${adminPayload}.${customerSig}`;
      expect(verifyAuthToken(forgedToken)).toBeNull();
    });
  });
});
