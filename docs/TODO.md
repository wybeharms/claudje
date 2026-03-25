# Claudje — To Do

Last updated: 2026-03-25

Status legend: `[ ]` not started | `[x]` done | `[~]` in progress

---

## 1. Email Workflow

Three emails in the customer journey. No email sending code exists yet.
All emails require SES to be set up first (see sections 3 and 4).

Shared dependency:
- [ ] Build `lib/ses.ts` (follow same pattern as `lib/s3.ts` — single client, exported helpers)
- [ ] Add `@aws-sdk/client-ses` to package.json
- [ ] Add SES env vars to `.env.local` and Vercel (region, sender address)

### Email 1: Verification (fires at onboarding step 1)

Sent immediately when the user enters their email in step 1 of the onboarding
wizard, before they continue to competitors. Non-blocking — if they never open
it, nothing breaks. Simple "verify your email" message.

- [ ] Create new endpoint `app/api/verify-email/route.ts` (lightweight, just sends the email)
- [ ] Call this endpoint from the wizard when the user clicks "Continue" after step 1
- [ ] Design simple email template (plain text or minimal HTML)

> **Note:** The full onboarding submission happens at step 3. This email needs
> a separate API call at step 1. Another Claude Code session is currently
> streamlining the onboarding wizard — coordinate timing.

### Email 2: Onboarding complete (fires at step 3)

Sent after the user finishes the full wizard. Highlights which competitors
they shared with Claudje and communicates "we're on it, expect your first
report within 24 hours."

- [ ] Design email template (include company name, competitor list, expected timeline)
- [ ] Add SES send call in `app/api/get-started/route.ts` after S3 write succeeds

### Email 3: Report delivery (Berend triggers manually)

Sent when a report is ready (~24 hours after onboarding, then weekly).
Contains the actual PDF report as attachment or download link.

Berend triggers this manually after running `/push-report` in the customers repo.

- [ ] Create endpoint `app/api/portal/reports/notify/route.ts`
  - Accepts customer ID + report ID
  - Fetches customer email from onboarding context
  - Sends email with PDF download link (presigned S3 URL)
  - Admin-only or secured with API key
- [ ] Design email template (include report week, download link, portal link)
- [ ] Add step to Berend's `/push-report` workflow to call this endpoint

---

## 2. Berend Notification

Send Berend an email when a new person completes onboarding, so he knows to
start working on their first report.

- Same trigger as Email 2 (onboarding complete, step 3 submission)
- Content: customer name, company, website, competitor list, plan

Implementation:
- [ ] Add a second SES send call in `app/api/get-started/route.ts` alongside Email 2
- [ ] Store Berend's notification email in `.env.local` (e.g., `NOTIFICATION_EMAIL=...`)
- [ ] Plain-text email is fine — no template needed

---

## 3. Google Workspace Setup

**Owner: Wybe.** Required before SES domain verification because both need
DNS records on claudje.com. Setting up Google Workspace first ensures MX
records are correct before adding SES DKIM/SPF records.

- [ ] Sign up for Google Workspace on claudje.com
- [ ] Add Google Workspace MX records to Namecheap DNS
- [ ] Verify domain ownership in Google Workspace admin console
- [ ] Create email addresses:
  - `wybe@claudje.com`
  - `berend@claudje.com`
  - `reports@claudje.com` (sender for automated emails)
- [ ] Confirm email delivery works (send test emails)
- [ ] Tell Berend the domain is verified and ready for SES setup

---

## 4. SES Production Access

**Owner: Berend.** Blocked by Google Workspace setup (section 3).
Currently in sandbox mode — can only send to verified email addresses.

- [ ] Verify `claudje.com` domain in SES (eu-north-1, or eu-west-1 if SES unavailable in Stockholm)
- [ ] **Wybe:** Add DKIM + SPF DNS records on Namecheap (SES provides these after domain verification)
- [ ] Request SES production access — requires use-case description and bounce/complaint handling plan
- [ ] Configure SES sending identity (e.g., `reports@claudje.com`)
- [ ] **Wybe:** Add SES config to `.env.local` and Vercel env vars (region if different from eu-north-1, sender address)
- [ ] Test end-to-end: send a real email to a non-verified address

### Current state
- SES is documented in `aws-setup.md` section 7 but not yet created
- `claudje-dev` IAM user already has `AmazonSESFullAccess` planned
- No `@aws-sdk/client-ses` dependency in package.json yet

---

## 5. Portal Simplification

The portal must stay simple and lightweight. Instead of rendering markdown
reports in the browser, display the PDF directly.

### Current state
- Reports are fetched as markdown from S3 and rendered with `react-markdown` + `remark-gfm`
  in `app/portal/reports/[id]/page.tsx`
- PDF download already works via presigned S3 URL
  (`app/api/portal/reports/[id]/download/route.ts`)

### Changes needed

- [ ] **Replace markdown rendering with PDF preview**
  - Embed PDF using `<iframe>` or `<object>` with presigned S3 URL
  - Remove the markdown section-card rendering
  - Keep download buttons (PDF, Word)

- [ ] **Add week navigation bar at the top of the report view**
  - Horizontal bar above the PDF preview
  - Users toggle between weeks
  - Label format: **"Week {number} — {first day of week}"**
    (e.g., "Week 13 — March 23")
  - Highlight the currently selected week
  - Fetch available weeks from reports list API

- [ ] **Update dashboard to match**
  - Use the same week-number labeling on the dashboard report list
  - `app/portal/page.tsx`

- [ ] **Clean up unused dependencies**
  - Uninstall `react-markdown` and `remark-gfm` if fully removed

### No external blockers — this can start immediately.

---

## 6. About Page

Add an About page to the landing site (`app/about/page.tsx`).
Content TBD — decide what to include (founders, mission, or both).
Add "About" link to Header nav and Footer.

- [ ] Decide on content scope
- [ ] Create `app/about/page.tsx`
- [ ] Add nav link to Header + Footer

---

## Sequencing

| # | Task | Owner | Blocked by | Type |
|---|------|-------|------------|------|
| 1 | Google Workspace setup | Wybe | — | Manual |
| 2 | SES domain verification + production access | Berend | #1 | Manual |
| 3 | Portal simplification (PDF preview + week nav) | Dev | — | Code |
| 4 | Email workflow + Berend notification | Dev | #2 | Code |

Portal simplification (#3) can start immediately in parallel with the
manual setup work (#1 and #2).
