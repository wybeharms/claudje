# claudje.com — Competitor Intelligence Portal

## Tech Stack
- Next.js (App Router) + React 19 + TypeScript 5
- Tailwind CSS v4 (inline @theme in globals.css)
- NextAuth v5 (beta) + AWS Cognito (auth)
- AWS S3 (data storage)
- Stripe (billing)
- Deployed on Vercel from `main` branch
- Domain: claudje.com (Namecheap DNS → Vercel)

## Local Folder Structure
```
~/Sites/claudje/              ← parent folder (NOT a git repo)
├── dev/                      ← THIS REPO — portal + landing page
└── customers/                ← separate git repo — Berend's research workspace
```

## Project Structure
- `app/` — layout, globals.css, pages
  - `app/page.tsx` — landing page
  - `app/login/` — login page
  - `app/forgot-password/` — password reset
  - `app/get-started/` — 3-step onboarding wizard (auto-login after signup, Stripe placeholder)
  - `app/portal/` — auth-gated portal (dashboard, reports, settings, admin)
  - `app/api/` — API routes (auth, signup, stripe webhooks, portal endpoints)
- `components/landing/` — landing page section components
- `components/portal/` — portal shell, sidebar, header, context provider, ClaudjeBird mascot, WelcomeAnimation
- `components/signup/` — onboarding wizard components
- `lib/` — auth, cognito, s3, stripe, auth-token utilities

## Design System
- Colors: Dark brown `#2C1810` + cream/beige backgrounds + gold accents `#C9A96E`
- Fonts: DM Serif Display (headings) + Plus Jakarta Sans (body)
- Mascot: Geometric gold hawk silhouette (favicon.svg, ClaudjeBird component)
- All color tokens defined as CSS custom properties in `globals.css` @theme block

## CTA Strategy
All "Get Started" buttons → `/get-started`
Login link in header → `/login`

## AWS Infrastructure
- Cognito User Pool: `claudje-users` (custom attrs: role, customer_id, plan)
- S3 Bucket: `claudje-portal-data` (eu-north-1)
- IAM: `wybe` (console), `claudje-dev` (dev + portal runtime), `claudje-agent` (Berend's research)

## S3 Data Structure
```
{customer_id}/
├── onboarding/context.json     ← company info, phone, competitors, preferences, Stripe IDs
├── onboarding/{uploads}        ← customer-uploaded files
└── reports/
    ├── index.json              ← report manifest
    └── {report-id}/
        ├── report.md           ← full report markdown
        ├── report.pdf          ← PDF for download/email
        └── meta.json           ← report metadata
```

## Key Patterns
- Auth: NextAuth v5 Credentials provider → Cognito AdminInitiateAuth → HMAC-signed auth token (60s expiry)
- Onboarding auto-login: signup API authenticates user immediately after Cognito creation, returns authToken, client calls signIn() — user lands directly in portal
- S3: lib/s3.ts with getJson, putJson, getText, getUploadUrl, getDownloadUrl helpers
- Portal: PortalShell (sidebar + header + content), PortalContext (customerId, role, isAdmin)
- Admin: customer context switching via localStorage

## User & Org Management

### Roles
- `admin` — Berend + Wybe. Cognito `custom:customer_id` = `"all"`
- `customer` — regular users. `custom:customer_id` = their org ID

### Organizations
An org = an S3 folder (`{orgId}/onboarding/context.json`) + a shared `custom:customer_id` value.
Multiple Cognito users with the same `customer_id` share access to the same org data.

**orgId derivation** (`lib/org.ts`):
- If company website is provided: derived from domain (e.g. `www.acme.nl` → `acme.nl`)
- If no website: derived from company name (e.g. `Acme Bakery` → `acme-bakery`)
- Website is optional during signup to keep onboarding friction low

**Deduplication**: Before creating an org, both signup and admin flows call `checkOrgExists(orgId)` which checks for an existing `{orgId}/onboarding/context.json` in S3. Returns 409 if the org already exists. This prevents two companies with the same name (or same website) from colliding.

### User creation paths
1. **Self-signup** (`/get-started`) — creates new org + Cognito user with chosen password. Auto-login.
2. **Admin-created** (`/portal/admin`) — admin creates user via admin page. Cognito user gets random temp password (FORCE_CHANGE_PASSWORD state). Branded invite email sent via SES with temp password + login link. On first login, user sets their own password.

### Admin page (`/portal/admin`)
- **Requests tab** — report request queue with status management (pending/in-progress/delivered)
- **Customers tab** — list all orgs with plan, status, report count. Click to switch context.
- **Users tab** — list all Cognito users. Add user to existing org (dropdown selector). Delete users.
- **New organization** — create org + first user + S3 context. Sends invite email + admin notification.

### Customer settings (`/portal/settings`)
- Company, Competitors, Report Preferences, **Team** (read-only list of org members), Billing

### Emails (lib/ses.ts)
- `sendWelcomeEmail` — sent to customer after self-signup
- `sendInviteEmail` — sent to admin-created users with temp password + login link
- `sendNotificationEmail` — plain-text admin notification on new signups/org creation

@AGENTS.md
