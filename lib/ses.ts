import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.SES_REGION ?? process.env.AWS_REGION ?? "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const fromEmail = process.env.SES_FROM_EMAIL ?? "beer.claudje@gmail.com";

export async function sendNotificationEmail(params: {
  to: string;
  subject: string;
  textBody: string;
}): Promise<void> {
  try {
    await ses.send(
      new SendEmailCommand({
        Source: fromEmail,
        Destination: { ToAddresses: [params.to] },
        Message: {
          Subject: { Data: params.subject },
          Body: { Text: { Data: params.textBody } },
        },
      })
    );
  } catch (err) {
    console.error("[SES] Failed to send notification:", err);
  }
}
