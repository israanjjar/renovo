# Renovo Impact Hub — Architecture Plan

**Version**: 1.0
**Date**: February 27, 2026
**Status**: Ready for Implementation
**Target**: Phase 1 MVP
**Stack Philosophy**: Free/Low-Cost Tiers, Production-Ready

---

## Executive Summary

This architecture plan defines the technical design for Renovo Impact Hub, a membership-based impact platform with real-time dashboards, community voting, and shareable impact cards. The design prioritizes rapid MVP development, low infrastructure cost (leveraging free tiers), and a foundation that scales into Phases 2–4.

### Architecture Decisions Summary

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Framework | Next.js 14 (App Router) | SSR for SEO (landing page), API routes, React Server Components |
| Language | TypeScript (strict) | Type safety across frontend + backend |
| Styling | Tailwind CSS v4 | Rapid UI development, design tokens |
| Database | PostgreSQL via Supabase | Relational data, free tier (500MB), auth included |
| Auth | Supabase Auth | Email + Google OAuth, session management, free tier |
| Payments | Stripe Subscriptions | Recurring billing, webhooks, hosted checkout |
| Email | Resend | Transactional + digest emails, free tier (100/day) |
| Image Generation | @vercel/og (Satori) | Impact card image generation at the edge |
| Hosting | Vercel | Free tier, CI/CD, edge functions |
| State Management | React Server Components + TanStack Query | Minimal client state, server-driven data |

### Cost Summary (MVP)

| Service | Cost | Notes |
|---------|------|-------|
| Vercel Hosting | $0 | Free tier (100GB bandwidth, 100 hrs serverless) |
| Supabase | $0 | Free tier (500MB DB, 50K MAU auth) |
| Stripe | 2.9% + $0.30/txn | Per-transaction, no monthly fee |
| Resend | $0 | Free tier (100 emails/day) |
| Domain | ~$12/year | `.org` or `.com` |
| **Total Fixed** | **~$1/month** | Variable: Stripe transaction fees |

---

## System Architecture

### High-Level Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        VERCEL                                │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js Application                       │  │
│  │                                                        │  │
│  │  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐ │  │
│  │  │ Pages (SSR) │  │ API Routes   │  │ Edge Funcs   │ │  │
│  │  │             │  │              │  │              │ │  │
│  │  │ • Landing   │  │ • /api/vote  │  │ • OG Image   │ │  │
│  │  │ • Dashboard │  │ • /api/sub   │  │   generation │ │  │
│  │  │ • Projects  │  │ • /api/admin │  │              │ │  │
│  │  │ • Vote      │  │              │  │              │ │  │
│  │  └─────────────┘  └──────┬───────┘  └──────────────┘ │  │
│  └──────────────────────────┼────────────────────────────┘  │
└─────────────────────────────┼───────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ↓               ↓               ↓
    ┌─────────────────┐ ┌──────────┐ ┌──────────────┐
    │   Supabase      │ │  Stripe  │ │   Resend     │
    │                 │ │          │ │              │
    │ • PostgreSQL    │ │ • Subs   │ │ • Monthly    │
    │ • Auth          │ │ • Checkout│ │   digest     │
    │ • Row-Level Sec │ │ • Webhooks│ │ • Welcome    │
    │ • Realtime      │ │          │ │ • Vote open  │
    └─────────────────┘ └──────────┘ └──────────────┘
```

### Data Flow

```
Member Action                    System Flow
─────────────                    ───────────

Signs up          →  Supabase Auth → create user row → welcome email (Resend)
                                                     → Stripe Checkout redirect

Payment confirmed →  Stripe webhook → /api/webhooks/stripe
                                    → create Subscription record in Supabase
                                    → redirect to onboarding

Views dashboard   →  Next.js SSR → Supabase query (user, projects, metrics)
                                 → render dashboard with live data

Casts vote        →  /api/vote → validate (1 vote per round) → insert Vote row
                               → return updated vote counts

Monthly cron      →  Vercel Cron → generate impact cards (Satori)
                                 → send monthly digest (Resend)
                                 → close voting round, announce winner
```

---

## Database Schema

### Entity Relationship Diagram

```
┌──────────────┐     ┌───────────────────┐     ┌──────────────────┐
│   users      │     │  subscriptions    │     │  votes           │
│──────────────│     │───────────────────│     │──────────────────│
│ id (PK)      │←───┐│ id (PK)          │     │ id (PK)          │
│ email        │    ││ user_id (FK)     │──→  │ user_id (FK)     │
│ name         │    ││ tier             │     │ voting_round_id  │
│ avatar_url   │    ││ status           │     │ project_id (FK)  │
│ tier         │    ││ stripe_sub_id    │     │ cast_at          │
│ sdg_focus[]  │    ││ current_period   │     └──────────────────┘
│ created_at   │    │└───────────────────┘
└──────────────┘    │
                    │  ┌───────────────────┐     ┌──────────────────┐
                    │  │  projects         │     │  project_metrics │
                    │  │───────────────────│     │──────────────────│
                    │  │ id (PK)           │←────│ id (PK)          │
                    │  │ title             │     │ project_id (FK)  │
                    │  │ description       │     │ label            │
                    │  │ location          │     │ value            │
                    │  │ sdgs[]            │     │ unit             │
                    │  │ status            │     │ sdg              │
                    │  │ allocation_pct    │     │ recorded_at      │
                    │  │ start_date        │     └──────────────────┘
                    │  │ end_date          │
                    │  └───────────────────┘     ┌──────────────────┐
                    │                            │  project_updates │
                    │  ┌───────────────────┐     │──────────────────│
                    │  │  voting_rounds    │     │ id (PK)          │
                    │  │───────────────────│     │ project_id (FK)  │
                    │  │ id (PK)           │     │ title            │
                    │  │ month             │     │ body             │
                    └──│ candidate_ids[]   │     │ image_urls[]     │
                       │ winner_id         │     │ published_at     │
                       │ opens_at          │     └──────────────────┘
                       │ closes_at         │
                       │ status            │     ┌──────────────────┐
                       └───────────────────┘     │  impact_cards    │
                                                 │──────────────────│
                                                 │ id (PK)          │
                                                 │ user_id (FK)     │
                                                 │ month            │
                                                 │ total_contributed │
                                                 │ metrics (jsonb)  │
                                                 │ sdg_badges[]     │
                                                 │ image_url        │
                                                 │ generated_at     │
                                                 └──────────────────┘
```

### SQL Schema

```sql
-- Users (extends Supabase auth.users)
create table public.users (
  id uuid primary key references auth.users(id),
  email text not null,
  name text not null,
  avatar_url text,
  tier text not null check (tier in ('base', 'premium', 'vip')),
  sdg_focus integer[] not null default '{}',
  stripe_customer_id text,
  created_at timestamptz not null default now()
);

-- Subscriptions
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id),
  tier text not null check (tier in ('base', 'premium', 'vip')),
  status text not null check (status in ('active', 'cancelled', 'past_due')),
  stripe_subscription_id text not null,
  current_period_start timestamptz not null,
  current_period_end timestamptz not null,
  created_at timestamptz not null default now()
);

-- Projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  location text not null,
  sdgs integer[] not null,
  status text not null check (status in ('active', 'completed', 'upcoming')),
  allocation_percent numeric(5,2) not null,
  start_date date not null,
  end_date date,
  created_at timestamptz not null default now()
);

-- Project Metrics
create table public.project_metrics (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id),
  label text not null,
  value numeric not null,
  unit text not null,
  sdg integer not null,
  recorded_at timestamptz not null default now()
);

-- Project Updates
create table public.project_updates (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id),
  title text not null,
  body text not null,
  image_urls text[] not null default '{}',
  published_at timestamptz not null default now()
);

-- Voting Rounds
create table public.voting_rounds (
  id uuid primary key default gen_random_uuid(),
  month text not null unique,
  candidate_project_ids uuid[] not null,
  winner_project_id uuid references public.projects(id),
  opens_at timestamptz not null,
  closes_at timestamptz not null,
  status text not null check (status in ('upcoming', 'open', 'closed'))
);

-- Votes
create table public.votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id),
  voting_round_id uuid not null references public.voting_rounds(id),
  project_id uuid not null references public.projects(id),
  cast_at timestamptz not null default now(),
  unique(user_id, voting_round_id)
);

-- Impact Cards
create table public.impact_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id),
  month text not null,
  total_contributed numeric not null,
  metrics jsonb not null default '[]',
  sdg_badges integer[] not null default '{}',
  image_url text,
  generated_at timestamptz not null default now(),
  unique(user_id, month)
);

-- Financial Breakdowns
create table public.financial_breakdowns (
  id uuid primary key default gen_random_uuid(),
  month text not null unique,
  total_revenue numeric not null,
  allocations jsonb not null default '[]',
  published_at timestamptz not null default now()
);

-- Row Level Security
alter table public.users enable row level security;
alter table public.subscriptions enable row level security;
alter table public.votes enable row level security;
alter table public.impact_cards enable row level security;

-- Users can read their own data
create policy "Users read own" on public.users for select using (auth.uid() = id);
create policy "Users update own" on public.users for update using (auth.uid() = id);

-- Subscriptions: users read own
create policy "Subs read own" on public.subscriptions for select using (auth.uid() = user_id);

-- Votes: users read own, insert own
create policy "Votes read own" on public.votes for select using (auth.uid() = user_id);
create policy "Votes insert own" on public.votes for insert with check (auth.uid() = user_id);

-- Impact cards: users read own
create policy "Cards read own" on public.impact_cards for select using (auth.uid() = user_id);

-- Projects, metrics, updates, financials: public read
alter table public.projects enable row level security;
create policy "Projects public read" on public.projects for select using (true);
create policy "Metrics public read" on public.project_metrics for select using (true);
create policy "Updates public read" on public.project_updates for select using (true);
create policy "Financials public read" on public.financial_breakdowns for select using (true);
create policy "Rounds public read" on public.voting_rounds for select using (true);
```

---

## Project Structure

```
RenovoImpactHub/
├── public/
│   ├── favicon.ico
│   └── sdg-icons/              # SDG badge SVGs
│       ├── sdg-7.svg
│       ├── sdg-12.svg
│       ├── sdg-13.svg
│       ├── sdg-14.svg
│       └── sdg-15.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (nav, footer)
│   │   ├── page.tsx            # Landing page (SSR, public)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   ├── onboarding/
│   │   │   └── page.tsx        # Tier + SDG selection
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Personal impact dashboard
│   │   ├── projects/
│   │   │   ├── page.tsx        # Project listing
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Project detail
│   │   ├── vote/
│   │   │   └── page.tsx        # Voting page
│   │   ├── impact/
│   │   │   └── [month]/
│   │   │       └── page.tsx    # Monthly impact card view
│   │   ├── transparency/
│   │   │   └── page.tsx        # Financial breakdown (public)
│   │   ├── settings/
│   │   │   └── page.tsx        # Account settings
│   │   ├── admin/
│   │   │   ├── page.tsx        # Admin dashboard
│   │   │   ├── projects/
│   │   │   │   └── page.tsx    # Manage projects
│   │   │   └── metrics/
│   │   │       └── page.tsx    # Add/edit metrics
│   │   └── api/
│   │       ├── webhooks/
│   │       │   └── stripe/
│   │       │       └── route.ts  # Stripe webhook handler
│   │       ├── vote/
│   │       │   └── route.ts      # Cast vote
│   │       ├── impact-card/
│   │       │   └── route.ts      # Generate impact card image
│   │       └── cron/
│   │           └── monthly/
│   │               └── route.ts  # Monthly digest + card gen
│   ├── components/
│   │   ├── ui/                   # Reusable UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── ProgressBar.tsx
│   │   │   └── Modal.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── dashboard/
│   │   │   ├── ImpactSummary.tsx
│   │   │   ├── AllocationChart.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   └── SDGBadge.tsx
│   │   ├── projects/
│   │   │   ├── ProjectDetail.tsx
│   │   │   ├── MetricDisplay.tsx
│   │   │   └── UpdateTimeline.tsx
│   │   ├── voting/
│   │   │   ├── VotingCard.tsx
│   │   │   └── VotingResults.tsx
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── TransparencyPreview.tsx
│   │   │   ├── PricingTable.tsx
│   │   │   └── Testimonials.tsx
│   │   └── sharing/
│   │       ├── ImpactCardPreview.tsx
│   │       └── ShareButtons.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts         # Browser Supabase client
│   │   │   ├── server.ts         # Server Supabase client
│   │   │   └── admin.ts          # Service-role client (webhooks)
│   │   ├── stripe/
│   │   │   ├── client.ts         # Stripe instance
│   │   │   ├── checkout.ts       # Create checkout session
│   │   │   └── webhooks.ts       # Webhook event handlers
│   │   ├── email/
│   │   │   └── resend.ts         # Email sending helpers
│   │   └── utils/
│   │       ├── sdg.ts            # SDG metadata (names, colors, icons)
│   │       ├── currency.ts       # Format currency helpers
│   │       └── dates.ts          # Date formatting
│   ├── hooks/
│   │   ├── useUser.ts            # Current user hook
│   │   ├── useSubscription.ts    # Subscription status
│   │   └── useVotingRound.ts     # Current voting round
│   └── types/
│       └── index.ts              # Shared TypeScript types
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── .env.local                    # Local env vars
├── .env.example                  # Template for required vars
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── vercel.json
```

---

## Key Implementation Details

### Stripe Webhook Handler

```typescript
// src/app/api/webhooks/stripe/route.ts
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createAdminClient } from '@/lib/supabase/admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get('stripe-signature')!;

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  );

  const supabase = createAdminClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const tier = session.metadata?.tier;

      await supabase.from('subscriptions').insert({
        user_id: userId,
        tier,
        status: 'active',
        stripe_subscription_id: session.subscription as string,
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(
          Date.now() + 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
      });

      await supabase
        .from('users')
        .update({ tier })
        .eq('id', userId);

      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      await supabase
        .from('subscriptions')
        .update({ status: 'cancelled' })
        .eq('stripe_subscription_id', sub.id);
      break;
    }
  }

  return Response.json({ received: true });
}
```

### Impact Card Image Generation

```typescript
// src/app/api/impact-card/route.ts
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name') ?? 'Member';
  const amount = searchParams.get('amount') ?? '0';
  const trees = searchParams.get('trees') ?? '0';
  const co2 = searchParams.get('co2') ?? '0';
  const month = searchParams.get('month') ?? '';

  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        width: '1200px',
        height: '630px',
        backgroundColor: '#F0FFF4',
        padding: '60px',
        fontFamily: 'sans-serif',
      }}>
        <div style={{ fontSize: '24px', color: '#6B7280' }}>
          {month} Impact Report
        </div>
        <div style={{ fontSize: '48px', color: '#1B4332', marginTop: '20px' }}>
          {name}'s Impact
        </div>
        <div style={{ display: 'flex', gap: '40px', marginTop: '40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '64px', color: '#2D6A4F' }}>${amount}</div>
            <div style={{ fontSize: '20px', color: '#6B7280' }}>contributed</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '64px', color: '#2D6A4F' }}>{trees}</div>
            <div style={{ fontSize: '20px', color: '#6B7280' }}>trees planted</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '64px', color: '#2D6A4F' }}>{co2}t</div>
            <div style={{ fontSize: '20px', color: '#6B7280' }}>CO₂ offset</div>
          </div>
        </div>
        <div style={{
          marginTop: 'auto',
          fontSize: '20px',
          color: '#52B788',
        }}>
          renovo.org — Community-Driven Impact
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

### Supabase Client Setup

```typescript
// src/lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// src/lib/supabase/server.ts
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createServerSupabase() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}
```

---

## Environment Variables

```bash
# .env.example

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Stripe Price IDs
STRIPE_PRICE_BASE=price_...
STRIPE_PRICE_PREMIUM=price_...
STRIPE_PRICE_VIP=price_...

# Resend
RESEND_API_KEY=re_...

# App
NEXT_PUBLIC_APP_URL=https://renovo.org
```

---

## Deployment Configuration

### vercel.json

```json
{
  "crons": [
    {
      "path": "/api/cron/monthly",
      "schedule": "0 9 1 * *"
    }
  ]
}
```

### CI/CD

Extends the existing GitHub Actions workflow pattern from MeetingBingo:
- **Build job**: `npm ci && npm run build` (Next.js build includes typecheck)
- **Deploy staging**: Vercel preview on PRs
- **Deploy production**: Vercel production on merge to `main`

---

## Implementation Phases

### Phase 1A: Foundation (~3 days)
1. Scaffold Next.js project with TypeScript + Tailwind
2. Set up Supabase project, run initial migration
3. Configure Supabase Auth (email + Google OAuth)
4. Implement Stripe subscription checkout
5. Build landing page with hero, transparency preview, pricing

### Phase 1B: Core Experience (~4 days)
6. Build auth pages (signup, login, onboarding flow)
7. Implement impact dashboard (server components + Supabase queries)
8. Build project listing and detail pages
9. Implement dollar allocation breakdown component
10. Build admin panel for project/metric management

### Phase 1C: Engagement (~3 days)
11. Implement voting system (API route + UI)
12. Build impact card generator (@vercel/og)
13. Add share functionality (Web Share API + download)
14. Set up Resend for monthly email digest
15. Build financial transparency page

### Phase 1D: Polish (~2 days)
16. Mobile responsive optimization
17. Loading states, error boundaries, empty states
18. SEO meta tags and OG images for landing page
19. Performance audit (Core Web Vitals)
20. Vercel deployment + domain configuration

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Supabase free tier limits | Low (MVP) | Medium | Monitor usage, upgrade plan if needed |
| Stripe webhook reliability | Low | High | Implement idempotency, retry logic |
| Next.js App Router complexity | Medium | Low | Fall back to Pages Router for tricky cases |
| Impact card image quality | Low | Low | Test across share targets (Twitter, LinkedIn) |
| Admin panel scope creep | Medium | Medium | Keep admin minimal — CRUD only |

---

## Testing Checklist

- [ ] User can sign up with email and Google OAuth
- [ ] Stripe checkout completes and subscription is created
- [ ] Dashboard shows correct user data and project metrics
- [ ] Dollar allocation percentages add up to 100%
- [ ] Community vote is recorded (1 per user per round)
- [ ] Voting results display correctly after round closes
- [ ] Impact card image generates with correct data
- [ ] Share button works on mobile (Web Share API) and desktop (clipboard)
- [ ] Monthly email digest sends with correct metrics
- [ ] Financial transparency page shows accurate breakdowns
- [ ] Admin can create projects, add metrics, publish updates
- [ ] Row-level security prevents users from seeing other users' data
- [ ] Stripe webhook handles subscription cancellation
- [ ] All pages are mobile responsive
- [ ] Landing page loads in < 3 seconds (Lighthouse score > 90)

---

*Prepared for Renovo Impact Hub — Technical Implementation*
*Derived from: Business plan, PRD, UXR research*
