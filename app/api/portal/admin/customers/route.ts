import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { listCustomerIds, getJsonFromS3 } from "@/lib/s3";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const customerIds = await listCustomerIds();

  const customers = await Promise.all(
    customerIds.map(async (id) => {
      const context = await getJsonFromS3<Record<string, unknown>>(
        `${id}/onboarding/context.json`
      );
      const reportIndex = await getJsonFromS3<{ reports: unknown[] }>(
        `${id}/reports/index.json`
      );

      return {
        id,
        companyName: context?.companyName || id,
        email: context?.email || "",
        plan: context?.plan || "starter",
        subscriptionStatus: context?.subscriptionStatus || "unknown",
        trialEndsAt: context?.trialEndsAt || null,
        competitorCount: Array.isArray(context?.competitors)
          ? (context.competitors as unknown[]).length
          : 0,
        reportCount: reportIndex?.reports?.length ?? 0,
        submittedAt: context?.submittedAt || null,
      };
    })
  );

  return NextResponse.json({ customers });
}
