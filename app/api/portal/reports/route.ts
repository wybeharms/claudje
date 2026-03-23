import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getJsonFromS3 } from "@/lib/s3";

interface ReportIndex {
  reports: Array<{
    id: string;
    weekOf: string;
    status: "ready" | "processing";
    publishedAt?: string;
    summarySnippet?: string;
    competitorCount: number;
    hasPdf: boolean;
    hasWord: boolean;
  }>;
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = session.user.role ?? "customer";
  const isAdmin = role === "admin";

  let customerId = session.user.customerId ?? "";
  if (isAdmin) {
    const param = req.nextUrl.searchParams.get("customerId");
    if (param) customerId = param;
  }

  if (!customerId) {
    return NextResponse.json({ reports: [] });
  }

  const index = await getJsonFromS3<ReportIndex>(
    `${customerId}/reports/index.json`
  );

  return NextResponse.json({
    reports: index?.reports ?? [],
  });
}
