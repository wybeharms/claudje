import { getJsonFromS3 } from "@/lib/s3";

export function deriveOrgId(website: string): string {
  return website
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .split("/")[0]
    .replace(/[^a-z0-9.-]+/gi, "")
    .toLowerCase();
}

export async function checkOrgExists(orgId: string): Promise<boolean> {
  const context = await getJsonFromS3(`${orgId}/onboarding/context.json`);
  return context !== null;
}
