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
  - `app/get-started/` — 3-step onboarding wizard + Stripe checkout
  - `app/portal/` — auth-gated portal (dashboard, reports, settings, admin)
  - `app/api/` — API routes (auth, signup, stripe webhooks, portal endpoints)
- `components/landing/` — landing page section components
- `components/portal/` — portal shell, sidebar, header, context provider
- `components/signup/` — onboarding wizard components
- `lib/` — auth, cognito, s3, stripe, auth-token utilities

## Design System
- Colors: Dark brown `#2C1810` + cream/beige backgrounds + gold accents `#C9A96E`
- Fonts: DM Serif Display (headings) + Plus Jakarta Sans (body)
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
├── onboarding/context.json     ← company info, competitors, preferences, Stripe IDs
├── onboarding/{uploads}        ← customer-uploaded files
└── reports/
    ├── index.json              ← report manifest
    └── {report-id}/
        ├── report.md           ← full report markdown
        ├── report.pdf          ← PDF for download/email
        └── meta.json           ← report metadata
```

## Key Patterns (from Claudester)
- Auth: NextAuth v5 Credentials provider → Cognito AdminInitiateAuth → HMAC-signed auth token
- S3: lib/s3.ts with getJson, putJson, getText, getUploadUrl, getDownloadUrl helpers
- Portal: PortalShell (sidebar + header + content), PortalContext (customerId, role, isAdmin)
- Admin: customer context switching via localStorage

@AGENTS.md
