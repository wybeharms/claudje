import { getJsonFromS3 } from "@/lib/s3";

/**
 * Derive an orgId from a website domain.
 * Strips protocol, www prefix, path, and non-alphanumeric characters.
 * Example: "https://www.acmebakery.nl/about" → "acmebakery.nl"
 */
export function deriveOrgIdFromWebsite(website: string): string {
  return website
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .replace(/[^a-z0-9.-]+/gi, "")
    .toLowerCase();
}

/**
 * Derive an orgId from a company name.
 * Lowercases, replaces whitespace/special chars with hyphens, collapses
 * consecutive hyphens, and trims leading/trailing hyphens.
 * Example: "Acme Bakery" → "acme-bakery"
 */
export function deriveOrgIdFromName(companyName: string): string {
  return companyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Derive an orgId from whichever identifier is available.
 * Priority: website domain (if non-empty after cleanup), else company name.
 */
export function deriveOrgId(website: string, companyName: string): string {
  const fromWebsite = deriveOrgIdFromWebsite(website);
  if (fromWebsite) return fromWebsite;
  return deriveOrgIdFromName(companyName);
}

export async function checkOrgExists(orgId: string): Promise<boolean> {
  const context = await getJsonFromS3(`${orgId}/onboarding/context.json`);
  return context !== null;
}
