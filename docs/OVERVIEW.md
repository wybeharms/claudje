# Claudje — Full Architecture Overview

This document describes the complete Claudje system across all repositories.
It lives in the dev repo because this is the product's front door, but it
covers everything: portal, research workspace, infrastructure, and the
end-to-end workflow.

Last updated: 2026-03-24

## What Claudje Is

Claudje is a weekly competitor intelligence report for small and mid-sized
businesses, delivered by email. Customers name their competitors. A team of
AI agents — backed by paid data sources and human review — produces a
structured report covering pricing, reviews, web activity, company filings,
social signals, and search trends. Industry agnostic.

## Repositories

Claudje consists of two git repos inside one parent folder, plus a planned
third repo for outreach and sales.

```
~/Sites/ventures/claudje/                         (parent folder, NOT a git repo)
│
├── dev/                                 REPO 1: wybeharms/claudje
│                                        Portal + landing page (Next.js on Vercel)
│
├── customers/                           REPO 2: wybeharms/claudje-customers
│                                        Customer research folders + AI agent workspace
│
└── (future) outreach/                   REPO 3: TBD
                                         Sales pipeline + automated scraping engine
```

## Dev Repo — Portal + Landing Page

```
dev/
├── app/
│   ├── page.tsx                         Landing page
│   ├── get-started/                     3-step onboarding wizard
│   ├── login/                           Login
│   ├── forgot-password/                 Password reset
│   ├── portal/                          Auth-gated area
│   │   ├── page.tsx                       Dashboard (report list or "preparing" state)
│   │   ├── reports/[id]/                  Individual report view
│   │   ├── settings/                      Preferences, competitors, team, billing
│   │   └── admin/                         Admin panel (requests, customers, users, create org)
│   └── api/                             API routes
│       ├── auth/                          Cognito auth flows
│       ├── get-started/                   Onboarding submission → S3 + Cognito
│       ├── stripe/                        Webhooks, checkout
│       └── portal/                        Reports, onboarding data, file uploads
├── components/
│   ├── landing/                         Hero, HowItWorks, WhyClaudje, Pricing, FAQ, etc.
│   ├── portal/                          Shell, sidebar, header, context provider
│   └── signup/                          Onboarding wizard steps
├── lib/                                 Auth, Cognito, S3, Stripe utilities
├── docs/
│   ├── OVERVIEW.md                      This file
│   └── aws-setup.md                     AWS infrastructure setup guide
├── CLAUDE.md                            Dev repo instructions (tech stack, patterns)
└── AGENTS.md                            Next.js version compatibility notes
```

**Tech stack:** Next.js (App Router) + React 19 + TypeScript + Tailwind CSS v4 +
NextAuth v5 + AWS Cognito + AWS S3 + Stripe. Deployed on Vercel.

## Customers Repo — Research Workspace

```
customers/
├── CLAUDE.md                            Repo overview, workflow, S3 bucket, AWS CLI
├── .claude/skills/                      Meta-skills (repo-level operations)
│   ├── new-customer/SKILL.md              Scaffold new customer from S3 onboarding data
│   ├── fetch-context/SKILL.md             Pull latest onboarding data from S3
│   └── push-report/SKILL.md              Validate + upload report to S3
├── core/                                Template folder (copied for each new customer)
│   ├── company-context/
│   │   ├── overview.md                    Company name, website, contact, industry
│   │   └── competitors.md                 Competitor names + URLs table
│   ├── research/
│   │   ├── pricing/                       Pricing research output
│   │   ├── reviews/                       Review analysis output
│   │   ├── web-digital/                   Web monitoring output
│   │   ├── registry/                      Company filings output
│   │   └── seo/                           Search trends output
│   ├── reports/
│   │   ├── drafts/                        Report drafts (pre-review)
│   │   └── published/                     Approved reports (pushed to S3)
│   ├── guidelines/
│   │   └── report-format.md               Standard 6-section report structure
│   └── memory/
│       └── research-log.md                Research session log
├── docs/
│   └── PRODUCT.md                       Product definition (audience, pricing, journey)
├── .env.example                         AWS credential template
└── {customer-id}/                       Per-customer folders (created from core/)
    └── (same structure as core/)
```

**Operated by Berend.** Uses Claude Code (or other AI agents) to research
competitors and produce reports.

## Infrastructure

**AWS (Berend's account):**
- Cognito User Pool: `claudje-users` (custom attrs: role, customer_id, plan)
- S3 Bucket: `claudje-data` (eu-north-1)
- SES: Transactional emails + report delivery (Berend manages)
- IAM users: `wybe` (console), `claudje-dev` (portal runtime), `claudje-agent` (S3 only, research)

**Hosting:**
- Vercel (Wybe pays) — deploys from dev repo `main` branch
- Domain: claudje.com (Namecheap, Wybe owns)

**Billing:**
- Stripe — Starter (€60/mo, 5 competitors, weekly) and Pro (€100/mo, 10 competitors, daily)
- 14-day free trial

## S3 Data Structure

The S3 bucket is the bridge between the portal and the research workspace.

```
claudje-data/
└── {customer_id}/
    ├── onboarding/
    │   ├── context.json                 Customer info, competitors, preferences (written by portal)
    │   └── {uploaded-files}             Files customer uploaded during onboarding
    └── reports/
        ├── index.json                   Report manifest (list of all reports)
        └── {report-id}/
            ├── report.md                Full report in markdown
            ├── report.pdf               PDF version (for email delivery)
            └── meta.json                Report metadata
```

## End-to-End Workflow

```
Customer                    Portal (dev/)              S3                  Research (customers/)
────────                    ─────────────              ──                  ─────────────────────
Signs up            ───►    Onboarding wizard  ───►    context.json
                            Creates Cognito user
                            Shows "preparing" state

                                                       context.json  ───► Berend runs /new-customer
                                                                          Copies core/ → {customer-id}/
                                                                          Populates from context.json

                                                                          Berend runs research agents
                                                                          Reviews draft report

                                                       report.md    ◄──── Berend runs /push-report
                                                       report.pdf
                                                       meta.json

Gets email          ◄───    SES sends report
Reads in inbox

(optional)
Logs into portal    ───►    Dashboard shows reports
Changes settings    ───►    Updates S3 context.json
```

## Report Contents

Every report covers six categories:

1. **Pricing & Products** — Price changes, new products, discontinued offerings
2. **Online Reviews** — Google, Trustpilot, sentiment trends, rating changes
3. **Web & Digital Activity** — Website changes, new pages, content strategy
4. **Company Registry & Filings** — New directors, revenue filings, ownership changes
5. **Social Activity** — LinkedIn followers, new hires, posting frequency
6. **Search Trends** — Brand search volume, keyword rankings, SEO signals

## Key Differentiator

Claudje uses the same frontier AI models as ChatGPT and Claude, but deploys
a team of specialized sub-agents with paid tool access. Each agent handles a
different part of the research: Google Maps reviews, Chamber of Commerce
filings, LinkedIn activity, Trustpilot ratings, pricing pages. A chatbot
summarizes the first page of Google. Claudje cross-references real data from
multiple paid sources into one structured, human-reviewed report.
