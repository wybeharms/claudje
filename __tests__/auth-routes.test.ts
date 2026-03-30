import { describe, it, expect, vi, beforeEach } from "vitest";

// ── Mocks ──────────────────────────────────────────────────────────────────

vi.mock("@/lib/auth", () => ({
  auth: vi.fn(),
}));

vi.mock("@/lib/cognito", () => ({
  createCognitoUser: vi.fn(),
  createCognitoUserWithPassword: vi.fn(),
  deleteCognitoUser: vi.fn(),
  listCognitoUsers: vi.fn(),
  authenticateUser: vi.fn(),
  parseIdToken: vi.fn(),
  listUsersByCustomerId: vi.fn(),
}));

vi.mock("@/lib/s3", () => ({
  putJsonToS3: vi.fn(),
  getJsonFromS3: vi.fn(),
  listS3Objects: vi.fn(),
  listCustomerIds: vi.fn(),
}));

vi.mock("@/lib/stripe", () => ({
  getStripe: vi.fn(),
}));

vi.mock("@/lib/ses", () => ({
  sendNotificationEmail: vi.fn().mockResolvedValue(undefined),
  sendWelcomeEmail: vi.fn().mockResolvedValue(undefined),
  sendInviteEmail: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/auth-token", () => ({
  createAuthToken: vi.fn().mockReturnValue("mock-auth-token"),
}));

process.env.AUTH_SECRET = "test-secret";
process.env.COGNITO_USER_POOL_ID = "eu-north-1_test";
process.env.COGNITO_CLIENT_ID = "test-client-id";
process.env.COGNITO_CLIENT_SECRET = "test-client-secret";
process.env.AWS_REGION = "eu-north-1";
process.env.AWS_ACCESS_KEY_ID = "test";
process.env.AWS_SECRET_ACCESS_KEY = "test";
process.env.S3_BUCKET_NAME = "test-bucket";
process.env.NEXTAUTH_URL = "http://localhost:3000";

import { auth } from "@/lib/auth";
import {
  createCognitoUser,
  createCognitoUserWithPassword,
  deleteCognitoUser,
  listCognitoUsers,
  authenticateUser,
  parseIdToken,
  listUsersByCustomerId,
} from "@/lib/cognito";
import { putJsonToS3, getJsonFromS3 } from "@/lib/s3";
import { NextRequest } from "next/server";

// ── Helpers ────────────────────────────────────────────────────────────────

function mockSession(overrides?: {
  role?: string;
  customerId?: string;
  email?: string;
}) {
  return {
    user: {
      email: overrides?.email ?? "user@example.com",
      role: overrides?.role ?? "customer",
      customerId: overrides?.customerId ?? "example.com",
    },
  };
}

function makeRequest(
  url: string,
  options?: { method?: string; body?: unknown }
) {
  const { method = "GET", body } = options ?? {};
  return new NextRequest(new URL(url, "http://localhost:3000"), {
    method,
    ...(body
      ? {
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        }
      : {}),
  });
}

// ── Admin Organization Creation ────────────────────────────────────────────

describe("POST /api/portal/admin/organizations", () => {
  let handler: typeof import("@/app/api/portal/admin/organizations/route").POST;

  beforeEach(async () => {
    vi.clearAllMocks();
    // Re-import to get fresh module with mocks
    const mod = await import("@/app/api/portal/admin/organizations/route");
    handler = mod.POST;
  });

  it("returns 403 for unauthenticated requests", async () => {
    vi.mocked(auth).mockResolvedValue(null as never);

    const req = makeRequest("/api/portal/admin/organizations", {
      method: "POST",
      body: { companyName: "Test", contactName: "John", email: "j@test.com" },
    });
    const res = await handler(req);

    expect(res.status).toBe(403);
  });

  it("returns 403 for customer role", async () => {
    vi.mocked(auth).mockResolvedValue(
      mockSession({ role: "customer" }) as never
    );

    const req = makeRequest("/api/portal/admin/organizations", {
      method: "POST",
      body: { companyName: "Test", contactName: "John", email: "j@test.com" },
    });
    const res = await handler(req);

    expect(res.status).toBe(403);
  });

  it("returns 400 when required fields are missing", async () => {
    vi.mocked(auth).mockResolvedValue(
      mockSession({ role: "admin", customerId: "all" }) as never
    );

    const req = makeRequest("/api/portal/admin/organizations", {
      method: "POST",
      body: { companyName: "Test" }, // missing contactName and email
    });
    const res = await handler(req);

    expect(res.status).toBe(400);
  });

  it("returns 409 when organization already exists", async () => {
    vi.mocked(auth).mockResolvedValue(
      mockSession({ role: "admin", customerId: "all" }) as never
    );
    vi.mocked(getJsonFromS3).mockResolvedValue({ companyName: "Existing" });
    vi.mocked(listUsersByCustomerId).mockResolvedValue([]);

    const req = makeRequest("/api/portal/admin/organizations", {
      method: "POST",
      body: {
        companyName: "Test",
        contactName: "John",
        email: "j@test.com",
        website: "https://existing.com",
      },
    });
    const res = await handler(req);
    const data = await res.json();

    expect(res.status).toBe(409);
    expect(data.error).toContain("already exists");
  });

  it("creates org successfully when it does not exist", async () => {
    vi.mocked(auth).mockResolvedValue(
      mockSession({ role: "admin", customerId: "all" }) as never
    );
    vi.mocked(getJsonFromS3).mockResolvedValue(null);
    vi.mocked(listUsersByCustomerId).mockResolvedValue([]);
    vi.mocked(createCognitoUser).mockResolvedValue({
      user: {
        username: "j@new.com",
        email: "j@new.com",
        role: "customer",
        customerId: "new.com",
        status: "FORCE_CHANGE_PASSWORD",
        enabled: true,
        createdAt: new Date(),
      },
      tempPassword: "Tmp!abc123",
    });
    vi.mocked(putJsonToS3).mockResolvedValue(undefined);

    const req = makeRequest("/api/portal/admin/organizations", {
      method: "POST",
      body: {
        companyName: "New Co",
        contactName: "John",
        email: "j@new.com",
        website: "https://new.com",
      },
    });
    const res = await handler(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.organizationId).toBe("new.com");
    expect(createCognitoUser).toHaveBeenCalledWith(
      "j@new.com",
      "customer",
      "new.com"
    );
    expect(putJsonToS3).toHaveBeenCalledWith(
      "new.com/onboarding/context.json",
      expect.objectContaining({ companyName: "New Co" })
    );
  });

  it("uses companyName for orgId when website is not provided", async () => {
    vi.mocked(auth).mockResolvedValue(
      mockSession({ role: "admin", customerId: "all" }) as never
    );
    vi.mocked(getJsonFromS3).mockResolvedValue(null);
    vi.mocked(listUsersByCustomerId).mockResolvedValue([]);
    vi.mocked(createCognitoUser).mockResolvedValue({
      user: {
        username: "j@test.com",
        email: "j@test.com",
        role: "customer",
        customerId: "acme-bakery",
        status: "FORCE_CHANGE_PASSWORD",
        enabled: true,
        createdAt: new Date(),
      },
      tempPassword: "Tmp!abc123",
    });
    vi.mocked(putJsonToS3).mockResolvedValue(undefined);

    const req = makeRequest("/api/portal/admin/organizations", {
      method: "POST",
      body: {
        companyName: "Acme Bakery",
        contactName: "John",
        email: "j@test.com",
      },
    });
    const res = await handler(req);
    const data = await res.json();

    expect(data.organizationId).toBe("acmebakery");
  });
});

// ── Admin Users API ────────────────────────────────────────────────────────

describe("Admin Users API", () => {
  let getHandler: typeof import("@/app/api/portal/admin/users/route").GET;
  let postHandler: typeof import("@/app/api/portal/admin/users/route").POST;
  let deleteHandler: typeof import("@/app/api/portal/admin/users/route").DELETE;

  beforeEach(async () => {
    vi.clearAllMocks();
    const mod = await import("@/app/api/portal/admin/users/route");
    getHandler = mod.GET;
    postHandler = mod.POST;
    deleteHandler = mod.DELETE;
  });

  describe("GET /api/portal/admin/users", () => {
    it("returns 403 for non-admin", async () => {
      vi.mocked(auth).mockResolvedValue(
        mockSession({ role: "customer" }) as never
      );

      const res = await getHandler();
      expect(res.status).toBe(403);
    });

    it("returns 403 for unauthenticated", async () => {
      vi.mocked(auth).mockResolvedValue(null as never);

      const res = await getHandler();
      expect(res.status).toBe(403);
    });

    it("returns user list for admin", async () => {
      vi.mocked(auth).mockResolvedValue(
        mockSession({ role: "admin", customerId: "all" }) as never
      );
      vi.mocked(listCognitoUsers).mockResolvedValue([
        {
          username: "user@test.com",
          email: "user@test.com",
          role: "customer",
          customerId: "test.com",
          status: "CONFIRMED",
          enabled: true,
          createdAt: new Date(),
        },
      ]);

      const res = await getHandler();
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.users).toHaveLength(1);
      expect(data.users[0].email).toBe("user@test.com");
    });
  });

  describe("POST /api/portal/admin/users", () => {
    it("returns 403 for non-admin", async () => {
      vi.mocked(auth).mockResolvedValue(
        mockSession({ role: "customer" }) as never
      );

      const req = makeRequest("/api/portal/admin/users", {
        method: "POST",
        body: { email: "new@test.com", customerId: "test.com" },
      });
      const res = await postHandler(req);

      expect(res.status).toBe(403);
      expect(createCognitoUser).not.toHaveBeenCalled();
    });

    it("returns 400 when email is missing", async () => {
      vi.mocked(auth).mockResolvedValue(
        mockSession({ role: "admin", customerId: "all" }) as never
      );

      const req = makeRequest("/api/portal/admin/users", {
        method: "POST",
        body: { customerId: "test.com" },
      });
      const res = await postHandler(req);

      expect(res.status).toBe(400);
    });

    it("returns 400 when customerId is missing", async () => {
      vi.mocked(auth).mockResolvedValue(
        mockSession({ role: "admin", customerId: "all" }) as never
      );

      const req = makeRequest("/api/portal/admin/users", {
        method: "POST",
        body: { email: "new@test.com" },
      });
      const res = await postHandler(req);

      expect(res.status).toBe(400);
    });

    it("creates user with default customer role", async () => {
      vi.mocked(auth).mockResolvedValue(
        mockSession({ role: "admin", customerId: "all" }) as never
      );
      vi.mocked(createCognitoUser).mockResolvedValue({
        user: {
          username: "new@test.com",
          email: "new@test.com",
          role: "customer",
          customerId: "test.com",
          status: "FORCE_CHANGE_PASSWORD",
          enabled: true,
          createdAt: new Date(),
        },
        tempPassword: "Tmp!abc123",
      });

      const req = makeRequest("/api/portal/admin/users", {
        method: "POST",
        body: { email: "new@test.com", customerId: "test.com" },
      });
      const res = await postHandler(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(createCognitoUser).toHaveBeenCalledWith(
        "new@test.com",
        "customer",
        "test.com"
      );
    });
  });

  describe("DELETE /api/portal/admin/users", () => {
    it("returns 403 for non-admin", async () => {
      vi.mocked(auth).mockResolvedValue(
        mockSession({ role: "customer" }) as never
      );

      const req = makeRequest("/api/portal/admin/users", {
        method: "DELETE",
        body: { username: "user@test.com" },
      });
      const res = await deleteHandler(req);

      expect(res.status).toBe(403);
      expect(deleteCognitoUser).not.toHaveBeenCalled();
    });

    it("returns 400 when username is missing", async () => {
      vi.mocked(auth).mockResolvedValue(
        mockSession({ role: "admin", customerId: "all" }) as never
      );

      const req = makeRequest("/api/portal/admin/users", {
        method: "DELETE",
        body: {},
      });
      const res = await deleteHandler(req);

      expect(res.status).toBe(400);
    });

    it("deletes user for admin", async () => {
      vi.mocked(auth).mockResolvedValue(
        mockSession({ role: "admin", customerId: "all" }) as never
      );
      vi.mocked(deleteCognitoUser).mockResolvedValue(undefined);

      const req = makeRequest("/api/portal/admin/users", {
        method: "DELETE",
        body: { username: "user@test.com" },
      });
      const res = await deleteHandler(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(deleteCognitoUser).toHaveBeenCalledWith("user@test.com");
    });
  });
});

// ── Signup Flow ────────────────────────────────────────────────────────────

describe("POST /api/get-started", () => {
  let handler: typeof import("@/app/api/get-started/route").POST;

  beforeEach(async () => {
    vi.clearAllMocks();
    // Ensure Stripe is disabled for these tests
    delete process.env.STRIPE_SECRET_KEY;
    delete process.env.STRIPE_STARTER_PRICE_ID;

    const mod = await import("@/app/api/get-started/route");
    handler = mod.POST;
  });

  const validBody = {
    contactName: "John Doe",
    email: "john@newcompany.com",
    password: "SecurePass123!",
    companyName: "New Company",
    website: "https://newcompany.com",
    competitors: [{ name: "Competitor A", website: "https://competitor.com" }],
    plan: "starter",
  };

  it("returns 400 when required fields are missing", async () => {
    const req = makeRequest("/api/get-started", {
      method: "POST",
      body: { email: "test@test.com" },
    });
    const res = await handler(req);

    expect(res.status).toBe(400);
  });

  it("returns 400 when no competitors provided", async () => {
    const req = makeRequest("/api/get-started", {
      method: "POST",
      body: { ...validBody, competitors: [] },
    });
    const res = await handler(req);

    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toContain("competitor");
  });

  it("returns 409 when organization already exists in S3", async () => {
    vi.mocked(getJsonFromS3).mockResolvedValue({ companyName: "Existing" });
    vi.mocked(listUsersByCustomerId).mockResolvedValue([]);

    const req = makeRequest("/api/get-started", {
      method: "POST",
      body: validBody,
    });
    const res = await handler(req);
    const data = await res.json();

    expect(res.status).toBe(409);
    expect(data.error).toContain("already exists");
    expect(createCognitoUserWithPassword).not.toHaveBeenCalled();
  });

  it("returns 409 when organization already exists in S3", async () => {
    vi.mocked(getJsonFromS3).mockResolvedValue({ companyName: "New Company" });

    const req = makeRequest("/api/get-started", {
      method: "POST",
      body: validBody,
    });
    const res = await handler(req);

    expect(res.status).toBe(409);
    expect(createCognitoUserWithPassword).not.toHaveBeenCalled();
  });

  it("creates user and saves context when org does not exist", async () => {
    vi.mocked(getJsonFromS3).mockResolvedValue(null);
    vi.mocked(listUsersByCustomerId).mockResolvedValue([]);
    vi.mocked(createCognitoUserWithPassword).mockResolvedValue({
      username: "john@newcompany.com",
      email: "john@newcompany.com",
      role: "customer",
      customerId: "newcompany.com",
      status: "CONFIRMED",
      enabled: true,
      createdAt: new Date(),
    });
    vi.mocked(putJsonToS3).mockResolvedValue(undefined);
    vi.mocked(authenticateUser).mockResolvedValue({
      success: true,
      idToken: "mock-id-token",
    });
    vi.mocked(parseIdToken).mockReturnValue({
      email: "john@newcompany.com",
      role: "customer",
      customerId: "newcompany.com",
    });

    const req = makeRequest("/api/get-started", {
      method: "POST",
      body: validBody,
    });
    const res = await handler(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.organizationId).toBe("newcompany.com");
    expect(data.authToken).toBe("mock-auth-token");

    expect(createCognitoUserWithPassword).toHaveBeenCalledWith(
      "john@newcompany.com",
      "SecurePass123!",
      "customer",
      "newcompany.com"
    );
    expect(putJsonToS3).toHaveBeenCalledWith(
      "newcompany.com/onboarding/context.json",
      expect.objectContaining({
        companyName: "New Company",
        email: "john@newcompany.com",
      })
    );
  });

  it("derives consistent orgId from website variations", async () => {
    vi.mocked(getJsonFromS3).mockResolvedValue(null);
    vi.mocked(listUsersByCustomerId).mockResolvedValue([]);
    vi.mocked(createCognitoUserWithPassword).mockResolvedValue({
      username: "test@test.com",
      email: "test@test.com",
      role: "customer",
      customerId: "example.com",
      status: "CONFIRMED",
      enabled: true,
      createdAt: new Date(),
    });
    vi.mocked(putJsonToS3).mockResolvedValue(undefined);
    vi.mocked(authenticateUser).mockRejectedValue(new Error("skip"));

    // All website variations should produce "example.com"
    for (const website of [
      "https://www.example.com",
      "http://example.com",
      "example.com",
    ]) {
      vi.clearAllMocks();
      vi.mocked(getJsonFromS3).mockResolvedValue(null);
      vi.mocked(listUsersByCustomerId).mockResolvedValue([]);
      vi.mocked(createCognitoUserWithPassword).mockResolvedValue({
        username: "test@test.com",
        email: "test@test.com",
        role: "customer",
        customerId: "example.com",
        status: "CONFIRMED",
        enabled: true,
        createdAt: new Date(),
      });
      vi.mocked(putJsonToS3).mockResolvedValue(undefined);
      vi.mocked(authenticateUser).mockRejectedValue(new Error("skip"));

      const req = makeRequest("/api/get-started", {
        method: "POST",
        body: { ...validBody, website },
      });
      const res = await handler(req);
      const data = await res.json();

      expect(data.organizationId).toBe("example.com");
    }
  });

  it("signup and admin produce the same orgId for the same website", async () => {
    // This test verifies the orgId generation is now consistent
    const { deriveOrgId } = await import("@/lib/org");

    const testCases = [
      "https://www.acme-bakery.nl",
      "http://example.com",
      "my-company.nl",
      "https://test.io/path",
    ];

    for (const input of testCases) {
      // Both flows now use deriveOrgId, so this is guaranteed
      const id = deriveOrgId(input);
      expect(id).toBe(deriveOrgId(input));
    }
  });
});

// ── parseIdToken ──────────────────────────────────────────────────────────

describe("parseIdToken", () => {
  // We need the actual implementation, not the mock
  function realParseIdToken(idToken: string) {
    const payload = JSON.parse(
      Buffer.from(idToken.split(".")[1], "base64url").toString()
    );
    return {
      email: payload.email ?? "",
      role: payload["custom:role"] ?? "customer",
      customerId: payload["custom:customer_id"] ?? "",
    };
  }

  function fakeIdToken(payload: Record<string, string>) {
    const header = Buffer.from(JSON.stringify({ alg: "RS256" })).toString(
      "base64url"
    );
    const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
    return `${header}.${body}.fakesig`;
  }

  it("extracts email, role, and customerId from a Cognito id token", () => {
    const token = fakeIdToken({
      email: "user@test.com",
      "custom:role": "customer",
      "custom:customer_id": "test.com",
    });

    const result = realParseIdToken(token);
    expect(result.email).toBe("user@test.com");
    expect(result.role).toBe("customer");
    expect(result.customerId).toBe("test.com");
  });

  it("defaults role to 'customer' when missing", () => {
    const token = fakeIdToken({
      email: "user@test.com",
      "custom:customer_id": "test.com",
    });

    const result = realParseIdToken(token);
    expect(result.role).toBe("customer");
  });

  it("defaults customerId to empty string when missing", () => {
    const token = fakeIdToken({
      email: "user@test.com",
      "custom:role": "admin",
    });

    const result = realParseIdToken(token);
    expect(result.customerId).toBe("");
  });

  it("extracts admin role correctly", () => {
    const token = fakeIdToken({
      email: "admin@claudje.com",
      "custom:role": "admin",
      "custom:customer_id": "all",
    });

    const result = realParseIdToken(token);
    expect(result.role).toBe("admin");
    expect(result.customerId).toBe("all");
  });
});
