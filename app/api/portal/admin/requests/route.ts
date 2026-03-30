import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  listRequests,
  getJsonFromS3,
  putJsonToS3,
  type ReportRequest,
} from "@/lib/s3";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const requests = await listRequests();
  return NextResponse.json({ requests });
}

function nextDueDate(currentDueDate: string, cadence: string): string {
  const date = new Date(currentDueDate + "T00:00:00Z");
  if (cadence === "weekly") {
    date.setUTCDate(date.getUTCDate() + 7);
  } else if (cadence === "biweekly") {
    date.setUTCDate(date.getUTCDate() + 14);
  } else {
    // daily — skip weekends
    do {
      date.setUTCDate(date.getUTCDate() + 1);
    } while (date.getUTCDay() === 0 || date.getUTCDay() === 6);
  }
  return date.toISOString().slice(0, 10);
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { requestId, action } = body as {
    requestId: string;
    action: "start" | "deliver";
  };

  if (!requestId || !action) {
    return NextResponse.json(
      { error: "requestId and action are required" },
      { status: 400 }
    );
  }

  const key = `requests/${requestId}.json`;
  const existing = await getJsonFromS3<ReportRequest>(key);
  if (!existing) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  if (action === "start") {
    existing.status = "in-progress";
    await putJsonToS3(key, existing);
    return NextResponse.json({ request: existing });
  }

  // action === "deliver"
  existing.status = "delivered";
  existing.deliveredAt = new Date().toISOString();
  await putJsonToS3(key, existing);

  // Create next request
  const newDueDate = nextDueDate(existing.dueDate, existing.cadence);
  const nextRequest: ReportRequest = {
    id: `${existing.customerId}-${newDueDate}`,
    customerId: existing.customerId,
    companyName: existing.companyName,
    status: "pending",
    dueDate: newDueDate,
    cadence: existing.cadence,
    createdAt: new Date().toISOString(),
    deliveredAt: null,
  };
  await putJsonToS3(`requests/${nextRequest.id}.json`, nextRequest);

  return NextResponse.json({ request: existing, nextRequest });
}
