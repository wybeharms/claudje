# claudje.com — Competitor Intelligence Landing Page

## Tech Stack
- Next.js (App Router) + React 19 + TypeScript 5
- Tailwind CSS v4 (inline @theme in globals.css)
- Deployed on Vercel from `main` branch
- Domain: claudje.com (Namecheap DNS → Vercel)

## Project Structure
- `app/` — layout, globals.css, page.tsx (single-page marketing site)
- `components/landing/` — all section components (Header, Hero, HowItWorks, ReportPreview, WhoItsFor, Pricing, FAQ, Footer)
- No backend, no auth, no database — static marketing page only

## Design System
- Colors: Dark brown `#3B2314` + cream/beige backgrounds + gold accents `#C9A96E`
- Fonts: DM Serif Display (headings) + Plus Jakarta Sans (body)
- All color tokens defined as CSS custom properties in `globals.css` @theme block

## CTA Strategy
All "Get Started" buttons → `mailto:info@claudje.com?subject=claudje - Get Started`

@AGENTS.md
