# Renovo Impact Hub — Implementation Plan

## Context

The `docs/` directory contains the complete planning documents (UXR, PRD, Architecture) for the Renovo Impact Hub platform. No source code exists yet. The goal is to build a fully functional Next.js application with a **mock backend** — all external services (Supabase, Stripe, Resend) are stubbed with in-memory data so the app builds, runs, and renders realistic demo content end-to-end. Real credentials are wired up later.

The app will be scaffolded inside `/workspaces/renovo/RenovoImpactHub/` as a Next.js + TypeScript project.

## Mock Backend Strategy

- **Types**: Canonical TypeScript interfaces from the PRD, identical to what the real app will use
- **Mock data store** (`src/lib/mock/data.ts`): Demo data for all entities (3 projects, sample user, voting round, financials, impact card)
- **Mock services**: Drop-in replacements for Supabase/Stripe/Resend that return mock data
- **Mock auth** (`src/lib/auth/AuthContext.tsx`): React Context + localStorage + cookie for route protection
- **When real services arrive**: Only files in `src/lib/supabase/`, `src/lib/stripe/`, `src/lib/email/`, `src/lib/auth/` need replacement

## Group 1: Scaffold + Foundation (REN-41–45)

1. **Scaffold Next.js project** in `/workspaces/renovo/RenovoImpactHub/`
   - `npx create-next-app@latest RenovoImpactHub --typescript --tailwind --app --src-dir`
   - No real Supabase/Stripe/Resend packages needed (all mocked)

2. **Configure Tailwind CSS v4** with `@theme` directive in `src/app/globals.css`
   - Custom color tokens: primary (#2D6A4F), secondary (#1B4332), accent (#95D5B2)
   - SDG color palette: sdg-7 (#FCC30B), sdg-12 (#BF8B2E), sdg-13 (#3F7E44), sdg-14 (#0A97D9), sdg-15 (#56C02B)
   - Follows MeetingBingo pattern (no tailwind.config.ts needed)

3. **Create TypeScript types** (`src/types/index.ts`)
   - SDGId, User, Project, ProjectMetric, ProjectUpdate, Subscription, Vote, VotingRound, ImpactCard, FinancialBreakdown

4. **Create mock data store** (`src/lib/mock/data.ts`)
   - 3 demo projects: BC Reforestation (SDG 13,15), Coastal Restoration (SDG 14,13), Clean Energy (SDG 7,12)
   - Sample user, subscription, voting round, financial breakdowns, impact card
   - Realistic metrics (trees planted, CO₂ offset, coastline restored)

5. **Create utility helpers**
   - `src/lib/utils.ts` — cn() helper (matches MeetingBingo)
   - `src/lib/utils/sdg.ts` — SDG metadata map (name, color, icon per SDG)
   - `src/lib/utils/currency.ts` — formatCurrency()
   - `src/lib/utils/dates.ts` — formatDate(), formatMonth()

6. **Create service stubs**
   - `src/lib/supabase/client.ts` — mock query functions: getUser(), getProjects(), getProjectById(), getVotingRound(), castVote(), etc.
   - `src/lib/supabase/server.ts` — same functions for server components
   - `src/lib/stripe/checkout.ts` — returns fake redirect URL
   - `src/lib/email/resend.ts` — console.log stubs

## Group 2: Layout + Landing (REN-46–47)

7. **UI primitives** (`components/ui/`)
   - Button (variants: primary/secondary/ghost, sizes: sm/md/lg)
   - Card (white card with shadow)
   - Badge (colored pill for SDG badges, status)
   - ProgressBar (horizontal fill bar)

8. **Layout components**
   - `components/layout/Navbar.tsx` — logo, nav links, auth-aware (login/logout), mobile hamburger
   - `components/layout/Footer.tsx` — links, copyright
   - `app/layout.tsx` — root layout wrapping with AuthProvider, Navbar, Footer

9. **Landing page** (`app/page.tsx`)
   - Hero: headline, impact stats, CTA
   - TransparencyPreview: sample dollar breakdown with progress bars
   - PricingTable: 3 tier cards (Base $20, Premium $20, VIP $100)

## Group 3: Auth + Onboarding (REN-48–49)

10. **Mock auth context** (`src/lib/auth/AuthContext.tsx`)
    - React Context with login/signup/logout
    - Persists to localStorage + sets cookie for middleware
    - "Google" button logs in as demo user

11. **Auth middleware** (`src/middleware.ts`)
    - Checks `renovo-auth-token` cookie on protected routes
    - Redirects to `/login` if missing
    - Protected routes: /dashboard, /projects/*, /vote, /impact/*, /settings, /onboarding, /admin/*

12. **Auth pages**
    - `app/login/page.tsx` — email + password form, "Login with Google" button
    - `app/signup/page.tsx` — name, email, password form
    - `app/onboarding/page.tsx` — tier selection → mock checkout → SDG picker → redirect to dashboard

## Group 4: Dashboard + Projects (REN-50–51)

13. **Dashboard components** (`components/dashboard/`)
    - SDGBadge: colored pill with SDG number + name
    - ImpactSummary: 2x2 stat cards (monthly total, all-time, trees, CO₂)
    - AllocationChart: CSS progress bars showing % breakdown
    - ProjectCard: card with title, location, SDG badges, primary metric

14. **Dashboard page** (`app/dashboard/page.tsx`)
    - Composes ImpactSummary, AllocationChart, ProjectCard grid

15. **Project components** (`components/projects/`)
    - MetricDisplay: large number + unit + SDG color
    - UpdateTimeline: vertical timeline of project updates
    - ProjectDetail: full project view with all sub-components

16. **Project pages**
    - `app/projects/page.tsx` — grid of ProjectCards
    - `app/projects/[id]/page.tsx` — ProjectDetail with metrics and updates

## Group 5: Engagement (REN-52–58)

17. **Voting system**
    - VotingCard: project summary + vote button
    - VotingResults: horizontal bar chart of votes, winner highlighted
    - `app/vote/page.tsx` — shows current round, cast vote, view results
    - `app/api/vote/route.ts` — mock POST endpoint

18. **Impact cards**
    - ImpactCardPreview: HTML preview matching Satori layout
    - `app/impact/[month]/page.tsx` — view + share page
    - `app/api/impact-card/route.ts` — placeholder endpoint

19. **Sharing**
    - ShareButtons: download, copy link, Web Share API, Twitter/LinkedIn links

20. **Transparency** (`app/transparency/page.tsx`)
    - Public page, no auth
    - Monthly breakdown with CSS bars, historical data

21. **Admin panel**
    - `app/admin/page.tsx` — summary dashboard
    - `app/admin/projects/page.tsx` — project CRUD table
    - `app/admin/metrics/page.tsx` — metric management

22. **Settings** (`app/settings/page.tsx`)
    - Profile info, SDG focus picker, subscription info

## Group 6: Polish + Deploy (REN-59–60)

23. **Loading states**: `loading.tsx` files with skeleton UI for dashboard, projects
24. **Error handling**: `error.tsx` (global error boundary), `not-found.tsx` (404)
25. **Mobile responsive pass**: hamburger nav, stacked layouts, 44px touch targets
26. **SEO**: metadata exports on landing + transparency pages
27. **Deploy config**: `vercel.json`, `.env.example`, update CI workflow

## File Manifest (~55 files)

```
RenovoImpactHub/
├── public/sdg-icons/ (5 SVGs)
├── src/
│   ├── types/index.ts
│   ├── lib/
│   │   ├── utils.ts, utils/sdg.ts, utils/currency.ts, utils/dates.ts
│   │   ├── mock/data.ts
│   │   ├── auth/AuthContext.tsx
│   │   ├── supabase/client.ts, server.ts
│   │   ├── stripe/checkout.ts
│   │   └── email/resend.ts
│   ├── hooks/useUser.ts
│   ├── components/
│   │   ├── ui/ (Button, Card, Badge, ProgressBar)
│   │   ├── layout/ (Navbar, Footer)
│   │   ├── landing/ (Hero, TransparencyPreview, PricingTable)
│   │   ├── dashboard/ (ImpactSummary, AllocationChart, ProjectCard, SDGBadge)
│   │   ├── projects/ (ProjectDetail, MetricDisplay, UpdateTimeline)
│   │   ├── voting/ (VotingCard, VotingResults)
│   │   └── sharing/ (ImpactCardPreview, ShareButtons)
│   ├── middleware.ts
│   └── app/
│       ├── globals.css, layout.tsx, page.tsx, error.tsx, not-found.tsx
│       ├── login/page.tsx, signup/page.tsx, onboarding/page.tsx
│       ├── dashboard/page.tsx + loading.tsx
│       ├── projects/page.tsx + loading.tsx, [id]/page.tsx + loading.tsx
│       ├── vote/page.tsx
│       ├── impact/[month]/page.tsx
│       ├── transparency/page.tsx
│       ├── settings/page.tsx
│       ├── admin/page.tsx, admin/projects/page.tsx, admin/metrics/page.tsx
│       └── api/vote/route.ts, api/impact-card/route.ts, api/webhooks/stripe/route.ts
├── vercel.json, .env.example, .gitignore
└── package.json, tsconfig.json, next.config.ts
```

## Verification

After each group:
1. `npm run build` passes with zero TypeScript errors
2. `npm run dev` — pages render at localhost:3000
3. Auth flow: signup → onboarding → dashboard; protected routes redirect to /login
4. All pages responsive at 375px and 1440px
5. Linear issues updated to "Done" as each group completes
