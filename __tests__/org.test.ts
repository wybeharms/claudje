import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock dependencies before importing the module
vi.mock("@/lib/s3", () => ({
  getJsonFromS3: vi.fn(),
}));

import { deriveOrgId, checkOrgExists } from "@/lib/org";
import { getJsonFromS3 } from "@/lib/s3";

describe("deriveOrgId", () => {
  it("strips https:// protocol", () => {
    expect(deriveOrgId("https://example.com")).toBe("example.com");
  });

  it("strips http:// protocol", () => {
    expect(deriveOrgId("http://example.com")).toBe("example.com");
  });

  it("strips www. prefix", () => {
    expect(deriveOrgId("https://www.example.com")).toBe("example.com");
  });

  it("strips path after domain", () => {
    expect(deriveOrgId("https://example.com/some/path")).toBe("example.com");
  });

  it("converts to lowercase", () => {
    expect(deriveOrgId("https://EXAMPLE.COM")).toBe("example.com");
  });

  it("strips special characters", () => {
    expect(deriveOrgId("Acme Bakery B.V.")).toBe("acmebakeryb.v.");
  });

  it("preserves hyphens and dots", () => {
    expect(deriveOrgId("--test--")).toBe("--test--");
  });

  it("handles Dutch domain correctly", () => {
    expect(deriveOrgId("https://www.acme-bakery.nl")).toBe("acme-bakery.nl");
  });

  it("handles domain with port", () => {
    // Port colon is stripped
    expect(deriveOrgId("http://localhost:3000")).toBe("localhost3000");
  });

  it("handles plain domain without protocol", () => {
    expect(deriveOrgId("example.com")).toBe("example.com");
  });

  it("handles company name as input (no domain)", () => {
    expect(deriveOrgId("My Company")).toBe("mycompany");
  });

  it("strips multiple special characters", () => {
    expect(deriveOrgId("a   b")).toBe("ab");
  });

  it("produces same result regardless of protocol or www variations", () => {
    const variations = [
      "https://www.example.com",
      "http://www.example.com",
      "https://example.com",
      "http://example.com",
      "www.example.com",
      "example.com",
    ];

    const ids = variations.map(deriveOrgId);
    expect(new Set(ids).size).toBe(1);
    expect(ids[0]).toBe("example.com");
  });

  it("handles subdomains", () => {
    expect(deriveOrgId("https://app.example.com")).toBe("app.example.com");
  });
});

describe("checkOrgExists", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns true when S3 context exists", async () => {
    vi.mocked(getJsonFromS3).mockResolvedValue({ companyName: "Acme" });

    expect(await checkOrgExists("acme.nl")).toBe(true);
    expect(getJsonFromS3).toHaveBeenCalledWith("acme.nl/onboarding/context.json");
  });

  it("returns false when S3 context does not exist", async () => {
    vi.mocked(getJsonFromS3).mockResolvedValue(null);

    expect(await checkOrgExists("new-org.nl")).toBe(false);
  });

  it("checks S3 for context.json", async () => {
    vi.mocked(getJsonFromS3).mockResolvedValue(null);

    await checkOrgExists("test-org");

    expect(getJsonFromS3).toHaveBeenCalledTimes(1);
    expect(getJsonFromS3).toHaveBeenCalledWith("test-org/onboarding/context.json");
  });
});
