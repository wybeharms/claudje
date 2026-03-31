import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock dependencies before importing the module
vi.mock("@/lib/s3", () => ({
  getJsonFromS3: vi.fn(),
}));

import {
  deriveOrgId,
  deriveOrgIdFromWebsite,
  deriveOrgIdFromName,
  checkOrgExists,
} from "@/lib/org";
import { getJsonFromS3 } from "@/lib/s3";

describe("deriveOrgIdFromWebsite", () => {
  it("strips https:// protocol", () => {
    expect(deriveOrgIdFromWebsite("https://example.com")).toBe("example.com");
  });

  it("strips http:// protocol", () => {
    expect(deriveOrgIdFromWebsite("http://example.com")).toBe("example.com");
  });

  it("strips www. prefix", () => {
    expect(deriveOrgIdFromWebsite("https://www.example.com")).toBe("example.com");
  });

  it("strips path after domain", () => {
    expect(deriveOrgIdFromWebsite("https://example.com/some/path")).toBe("example.com");
  });

  it("converts to lowercase", () => {
    expect(deriveOrgIdFromWebsite("https://EXAMPLE.COM")).toBe("example.com");
  });

  it("handles Dutch domain correctly", () => {
    expect(deriveOrgIdFromWebsite("https://www.acme-bakery.nl")).toBe("acme-bakery.nl");
  });

  it("handles domain with port", () => {
    expect(deriveOrgIdFromWebsite("http://localhost:3000")).toBe("localhost3000");
  });

  it("handles plain domain without protocol", () => {
    expect(deriveOrgIdFromWebsite("example.com")).toBe("example.com");
  });

  it("handles subdomains", () => {
    expect(deriveOrgIdFromWebsite("https://app.example.com")).toBe("app.example.com");
  });

  it("returns empty string for empty/protocol-only input", () => {
    expect(deriveOrgIdFromWebsite("")).toBe("");
    expect(deriveOrgIdFromWebsite("https://")).toBe("");
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

    const ids = variations.map(deriveOrgIdFromWebsite);
    expect(new Set(ids).size).toBe(1);
    expect(ids[0]).toBe("example.com");
  });
});

describe("deriveOrgIdFromName", () => {
  it("lowercases and hyphenates", () => {
    expect(deriveOrgIdFromName("Acme Bakery")).toBe("acme-bakery");
  });

  it("collapses multiple special characters into single hyphen", () => {
    expect(deriveOrgIdFromName("Acme   Bakery")).toBe("acme-bakery");
    expect(deriveOrgIdFromName("Acme & Bakery B.V.")).toBe("acme-bakery-b-v");
  });

  it("trims leading and trailing hyphens", () => {
    expect(deriveOrgIdFromName("--Test Company--")).toBe("test-company");
  });

  it("handles single word", () => {
    expect(deriveOrgIdFromName("Acme")).toBe("acme");
  });
});

describe("deriveOrgId", () => {
  it("uses website when provided", () => {
    expect(deriveOrgId("https://example.com", "Example Inc")).toBe("example.com");
  });

  it("falls back to company name when website is empty", () => {
    expect(deriveOrgId("", "Acme Bakery")).toBe("acme-bakery");
  });

  it("falls back to company name when website is protocol-only", () => {
    expect(deriveOrgId("https://", "Acme Bakery")).toBe("acme-bakery");
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
