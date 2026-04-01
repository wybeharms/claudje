import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.SES_REGION ?? process.env.AWS_REGION ?? "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const fromEmail = process.env.SES_FROM_EMAIL ?? "berend@claudje.com";

// TODO: Remove sandbox workaround once SES production access is granted
const sesSandbox = true;
const sandboxForwardTo = "berend@claudje.com";

export async function sendNotificationEmail(params: {
  to: string;
  subject: string;
  textBody: string;
}): Promise<void> {
  try {
    await ses.send(
      new SendEmailCommand({
        Source: `claudje <${fromEmail}>`,
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

export async function sendWelcomeEmail(params: {
  to: string;
  contactName: string;
  companyName: string;
}): Promise<void> {
  const { to, contactName, companyName } = params;
  const name = contactName || "daar";

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FAF6F0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF6F0;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(44,24,16,0.08);">

        <!-- Header -->
        <tr><td style="background:#2C1810;padding:32px 40px;">
          <span style="font-size:24px;font-weight:700;color:#FAF6F0;letter-spacing:-0.5px;">claudje</span>
        </td></tr>

        <!-- Gold accent -->
        <tr><td style="background:#C9A96E;height:3px;"></td></tr>

        <!-- Body -->
        <tr><td style="padding:40px;">
          <p style="font-size:20px;font-weight:600;color:#2C1810;margin:0 0 24px;">
            Welkom bij claudje, ${esc(name)}!
          </p>

          <p style="font-size:15px;color:#3A2519;line-height:1.6;margin:0 0 16px;">
            Bedankt voor uw aanmelding. We gaan direct aan de slag met het eerste concurrentierapport voor <strong>${esc(companyName)}</strong>.
          </p>

          <p style="font-size:15px;color:#3A2519;line-height:1.6;margin:0 0 16px;">
            Wat u kunt verwachten:
          </p>

          <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
            <tr>
              <td style="padding:8px 16px 8px 0;vertical-align:top;color:#C9A96E;font-size:18px;">1.</td>
              <td style="padding:8px 0;font-size:14px;color:#3A2519;line-height:1.5;">
                <strong>Analyse</strong> — We onderzoeken uw concurrenten: prijzen, reviews, website-activiteit, KvK-gegevens en nieuwssignalen.
              </td>
            </tr>
            <tr>
              <td style="padding:8px 16px 8px 0;vertical-align:top;color:#C9A96E;font-size:18px;">2.</td>
              <td style="padding:8px 0;font-size:14px;color:#3A2519;line-height:1.5;">
                <strong>Rapport</strong> — U ontvangt een uitgebreid PDF-rapport met alle inzichten, overzichtelijk gepresenteerd.
              </td>
            </tr>
            <tr>
              <td style="padding:8px 16px 8px 0;vertical-align:top;color:#C9A96E;font-size:18px;">3.</td>
              <td style="padding:8px 0;font-size:14px;color:#3A2519;line-height:1.5;">
                <strong>Portaal</strong> — Bekijk uw rapporten op elk moment via uw persoonlijke portaal.
              </td>
            </tr>
          </table>

          <p style="font-size:15px;color:#3A2519;line-height:1.6;margin:0 0 32px;">
            Uw eerste rapport is doorgaans binnen 24 uur klaar. U ontvangt een email zodra het beschikbaar is.
          </p>

          <!-- CTA Button -->
          <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
            <tr><td style="background:#2C1810;border-radius:8px;padding:14px 32px;">
              <a href="https://claudje.com/portal" style="color:#FAF6F0;text-decoration:none;font-size:15px;font-weight:600;">
                Ga naar uw portaal
              </a>
            </td></tr>
          </table>

          <p style="font-size:13px;color:#7A6B5E;line-height:1.5;margin:0;">
            Heeft u vragen of wilt u extra concurrenten toevoegen? Antwoord gerust op deze email.
          </p>
        </td></tr>

        <!-- Divider -->
        <tr><td style="padding:0 40px;"><div style="border-top:1px solid #F0E8DC;"></div></td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 40px 32px;">
          <p style="font-size:12px;color:#B0A89E;margin:0 0 4px;">
            claudje.com — Concurrentie-inzichten voor het MKB
          </p>
          <p style="font-size:12px;color:#B0A89E;margin:0;">
            U ontvangt deze email omdat u zich heeft aangemeld op claudje.com.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `Welkom bij claudje, ${name}!

Bedankt voor uw aanmelding. We gaan direct aan de slag met het eerste concurrentierapport voor ${companyName}.

Wat u kunt verwachten:
1. Analyse — We onderzoeken uw concurrenten: prijzen, reviews, website-activiteit, KvK-gegevens en nieuwssignalen.
2. Rapport — U ontvangt een uitgebreid PDF-rapport met alle inzichten.
3. Portaal — Bekijk uw rapporten op elk moment via uw persoonlijke portaal.

Uw eerste rapport is doorgaans binnen 24 uur klaar.

Ga naar uw portaal: https://claudje.com/portal

Vragen? Antwoord gerust op deze email.

claudje.com — Concurrentie-inzichten voor het MKB`;

  try {
    const destination = sesSandbox ? sandboxForwardTo : to;
    const subject = sesSandbox
      ? `[FORWARD: ${to}] Welkom bij claudje — ${companyName}`
      : `Welkom bij claudje — ${companyName}`;

    await ses.send(
      new SendEmailCommand({
        Source: `claudje <${fromEmail}>`,
        Destination: { ToAddresses: [destination] },
        Message: {
          Subject: { Data: subject },
          Body: {
            Html: { Data: html },
            Text: { Data: text },
          },
        },
      })
    );
  } catch (err) {
    console.error("[SES] Failed to send welcome email:", err);
  }
}

export async function sendInviteEmail(params: {
  to: string;
  tempPassword: string;
  orgName: string;
}): Promise<void> {
  const { to, tempPassword, orgName } = params;

  const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FAF6F0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF6F0;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(44,24,16,0.08);">
        <tr><td style="background:#2C1810;padding:32px 40px;">
          <span style="font-size:24px;font-weight:700;color:#FAF6F0;letter-spacing:-0.5px;">claudje</span>
        </td></tr>
        <tr><td style="background:#C9A96E;height:3px;"></td></tr>
        <tr><td style="padding:40px;">
          <p style="font-size:20px;font-weight:600;color:#2C1810;margin:0 0 24px;">
            U bent uitgenodigd voor ${esc(orgName)} op claudje
          </p>
          <p style="font-size:15px;color:#3A2519;line-height:1.6;margin:0 0 16px;">
            Er is een account voor u aangemaakt. Log in met onderstaande gegevens en stel vervolgens uw eigen wachtwoord in.
          </p>
          <table cellpadding="0" cellspacing="0" style="background:#FAF6F0;border-radius:8px;padding:16px 24px;margin:0 0 24px;width:100%;">
            <tr><td>
              <p style="font-size:13px;color:#7A6B5E;margin:0 0 4px;">Email</p>
              <p style="font-size:15px;color:#2C1810;font-weight:600;margin:0 0 12px;">${esc(to)}</p>
              <p style="font-size:13px;color:#7A6B5E;margin:0 0 4px;">Tijdelijk wachtwoord</p>
              <p style="font-size:15px;color:#2C1810;font-weight:600;margin:0;font-family:monospace;">${esc(tempPassword)}</p>
            </td></tr>
          </table>
          <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
            <tr><td style="background:#2C1810;border-radius:8px;padding:14px 32px;">
              <a href="https://claudje.com/login" style="color:#FAF6F0;text-decoration:none;font-size:15px;font-weight:600;">
                Inloggen
              </a>
            </td></tr>
          </table>
          <p style="font-size:13px;color:#7A6B5E;line-height:1.5;margin:0;">
            Heeft u vragen? Antwoord gerust op deze email.
          </p>
        </td></tr>
        <tr><td style="padding:0 40px;"><div style="border-top:1px solid #F0E8DC;"></div></td></tr>
        <tr><td style="padding:24px 40px 32px;">
          <p style="font-size:12px;color:#B0A89E;margin:0;">
            claudje.com — Concurrentie-inzichten voor het MKB
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `U bent uitgenodigd voor ${orgName} op claudje

Er is een account voor u aangemaakt. Log in met onderstaande gegevens en stel vervolgens uw eigen wachtwoord in.

Email: ${to}
Tijdelijk wachtwoord: ${tempPassword}

Inloggen: https://claudje.com/login

Vragen? Antwoord gerust op deze email.

claudje.com — Concurrentie-inzichten voor het MKB`;

  try {
    const destination = sesSandbox ? sandboxForwardTo : to;
    const subject = sesSandbox
      ? `[FORWARD: ${to}] Uw claudje account — ${orgName}`
      : `Uw claudje account — ${orgName}`;

    await ses.send(
      new SendEmailCommand({
        Source: `claudje <${fromEmail}>`,
        Destination: { ToAddresses: [destination] },
        Message: {
          Subject: { Data: subject },
          Body: {
            Html: { Data: html },
            Text: { Data: text },
          },
        },
      })
    );
  } catch (err) {
    console.error("[SES] Failed to send invite email:", err);
  }
}

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
