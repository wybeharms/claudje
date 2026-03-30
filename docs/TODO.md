# Claudje — To Do

Last updated: 2026-03-30

Status legend: `[ ]` not started | `[x]` done | `[~]` in progress

---

## 1. Email Workflow

Shared dependency:
- [x] Build `lib/ses.ts` — SES client + `sendNotificationEmail`, `sendWelcomeEmail`, `sendInviteEmail`
- [x] Add `@aws-sdk/client-ses` to package.json
- [x] Add SES env vars to `.env.local` and Vercel (region, sender address)

### Email 1: Verification

**Deferred.** `email_verified` is hardcoded to `"true"` in Cognito user
creation — login is already non-blocking. The welcome email serves as
implicit verification (bounces visible in SES metrics). Not worth building
a token flow until there are 50+ customers.

### Email 2: Onboarding complete (fires at step 3)

- [x] Welcome email sent to customer (`sendWelcomeEmail` in `get-started/route.ts`)
- [x] Admin notification sent to Berend (`sendNotificationEmail` in `get-started/route.ts`)

### Email 3: Report delivery (Berend triggers manually)

Sent when a report is ready (~24 hours after onboarding, then weekly).
Contains the actual PDF report as attachment or download link.

- [ ] Create endpoint `app/api/portal/reports/notify/route.ts`
  - Accepts customer ID + report ID
  - Fetches customer email from onboarding context
  - Sends email with PDF download link (presigned S3 URL)
  - Admin-only or secured with API key
- [ ] Design email template (include report week, download link, portal link)
- [ ] Add step to Berend's `/push-report` workflow to call this endpoint

### Email 4: User invite (admin-created users)

- [x] Branded invite email with temp password + login link (`sendInviteEmail` in `lib/ses.ts`)
- [x] Sent automatically when admin creates a user or org from admin page

---

## 2. Berend Notification

- [x] Notification email sent on self-signup (`get-started/route.ts`)
- [x] Notification email sent on admin org creation (`admin/organizations/route.ts`)

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

## 7. User & Org Management (2026-03-30)

**Done.** Admin can manage users and orgs. Multi-user orgs supported.
Customers can see their team. No self-join flow — admin adds users.

- [x] Admin/customer roles via Cognito `custom:role`
- [x] Admin page: Requests, Customers, Users tabs + New Organization
- [x] Add User form uses org dropdown (not free text) to prevent typos
- [x] Error/success feedback on admin forms (no more silent failures)
- [x] Admin-created users get branded invite email with temp password
- [x] First login: user sets their own password (FORCE_CHANGE_PASSWORD flow)
- [x] Team tab in customer Settings — read-only list of org members
- [x] API: `GET /api/portal/team` — returns members for caller's org

### Not built (intentionally deferred)
- Customer-facing invite flow (admin handles user creation for now)
- Org owner/member roles within customer role (flat role is fine)
- Email verification token flow (non-blocking, deferred — see section 1)

---

## Sequencing

| # | Task | Owner | Blocked by | Status |
|---|------|-------|------------|--------|
| 1 | Google Workspace setup | Wybe | — | Not started |
| 2 | SES domain verification + production access | Berend | #1 | Not started |
| 3 | Portal simplification (PDF preview + week nav) | Dev | — | Not started |
| 4 | Report delivery email | Dev | #2 | Not started |
| 5 | User & org management | Dev | — | **Done** |

Portal simplification (#3) can start immediately in parallel with the
manual setup work (#1 and #2).
