import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getJsonFromS3, putJsonToS3 } from "@/lib/s3";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.AWS_REGION ?? "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const bucket = process.env.S3_BUCKET_NAME ?? "claudje-data";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  const { customerId, reportId, weekOf, markdown, summarySnippet, analyst } = body;

  if (!customerId || !reportId || !markdown) {
    return NextResponse.json(
      { error: "customerId, reportId, and markdown are required" },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();

  // Save report markdown
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: `${customerId}/reports/${reportId}/report.md`,
      ContentType: "text/markdown",
      Body: markdown,
    })
  );

  // Save report metadata
  const meta = {
    id: reportId,
    weekOf: weekOf || now.split("T")[0],
    status: "ready",
    generatedAt: now,
    publishedAt: now,
    analyst: analyst || "Berend",
    modules: ["pricing-products", "online-reviews", "web-digital", "company-registry", "market-seo"],
  };

  await putJsonToS3(`${customerId}/reports/${reportId}/meta.json`, meta);

  // Update index
  const existingIndex = await getJsonFromS3<{ reports: Array<Record<string, unknown>> }>(
    `${customerId}/reports/index.json`
  );

  const reports = existingIndex?.reports ?? [];
  const context = await getJsonFromS3<Record<string, unknown>>(
    `${customerId}/onboarding/context.json`
  );
  const competitorCount = Array.isArray(context?.competitors)
    ? (context.competitors as unknown[]).length
    : 0;

  // Remove existing entry for this report ID if updating
  const filtered = reports.filter((r) => r.id !== reportId);
  filtered.unshift({
    id: reportId,
    weekOf: weekOf || now.split("T")[0],
    status: "ready",
    publishedAt: now,
    summarySnippet: summarySnippet || "",
    competitorCount,
    hasPdf: false,
    hasWord: false,
  });

  await putJsonToS3(`${customerId}/reports/index.json`, { reports: filtered });

  return NextResponse.json({ success: true });
}
