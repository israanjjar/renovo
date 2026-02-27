# Renovo Impact Hub — Product Requirements Document

**Version**: 1.0
**Date**: February 27, 2026
**Status**: Ready for Development
**Target**: Phase 1 MVP — Environmental Impact Platform

---

## 1. Executive Summary

### 1.1 Product Vision

Renovo Impact Hub is a membership-based web platform that connects individuals and organizations with verified environmental and social impact projects. Members subscribe, choose which SDG-aligned projects to fund, track their impact in real-time through a transparency dashboard, and vote on future projects as a community.

### 1.2 Business Objectives

- Launch Phase 1 MVP focused on environmental impact (SDGs 7, 12, 13, 14, 15)
- Acquire initial subscriber base from Vancouver tech/environmental communities
- Demonstrate dollar-for-dollar transparency as core differentiator
- Establish community voting as a unique engagement mechanism
- Achieve 70%+ month-1 to month-2 retention

### 1.3 Success Criteria

| Metric | Target | Measurement |
|--------|--------|-------------|
| Landing page → signup conversion | > 5% | Analytics funnel |
| Monthly Active Users (of subscribers) | > 60% | Dashboard logins |
| Impact card share rate | > 25% monthly | Share click tracking |
| Community vote participation | > 40% of members | Vote counts |
| Month 1 → Month 2 retention | > 70% | Subscription data |
| Revenue allocated to projects | > 40% | Financial reporting |

---

## 2. Scope Definition

### 2.1 In Scope (Phase 1 MVP)

| Feature | Priority | Complexity |
|---------|----------|------------|
| Landing page with transparency preview | P0 | Medium |
| User registration & authentication | P0 | Medium |
| Three-tier subscription (Base, Premium, VIP) | P0 | Medium |
| Stripe payment integration | P0 | Medium |
| SDG focus selection (onboarding) | P0 | Low |
| Impact dashboard (per-user) | P0 | High |
| Project detail pages (1–3 projects) | P0 | Medium |
| Dollar allocation breakdown | P0 | Medium |
| Monthly impact card (shareable image) | P1 | Medium |
| Community project voting | P1 | Medium |
| Email digest (monthly summary) | P1 | Low |
| Mobile-responsive design | P0 | Medium |
| Admin panel (project management) | P1 | Medium |
| Finance transparency page | P2 | Low |

### 2.2 Out of Scope (Phase 1)

- Social impact projects (Phase 2: SDGs for structural exclusion)
- Native mobile app (responsive web is sufficient for MVP)
- Satellite imagery integration (future enhancement)
- Corporate ESG report export (Phase 2 feature for VIP tier)
- Video content / documentary hosting
- Gamified referral rewards system
- Multi-language support
- Real-time chat or forum

### 2.3 What This Is

- A transparent impact funding platform — members see exactly where every dollar goes
- A community decision-making tool — members vote on which projects to fund next
- A personal impact tracker — individuals track their cumulative environmental contribution

### 2.4 What This Is NOT

- Not a donation platform (membership model with recurring subscriptions)
- Not a carbon offset marketplace (projects are curated, not browsed)
- Not a social network (community features are lightweight in MVP)
- Not a grant application tool (Renovo selects and manages projects)

---

## 3. User Stories & Acceptance Criteria

### 3.1 Epic 1: Discovery & Onboarding

#### US-1.1: View Landing Page
**As a** potential member
**I want to** see what Renovo Impact Hub does and how my money is used
**So that** I can decide whether to subscribe

**Acceptance Criteria**:
- [ ] Landing page loads in < 3 seconds
- [ ] Hero section shows a real impact statistic (e.g., "243 trees planted this month")
- [ ] Transparency preview section shows sample dollar breakdown
- [ ] Three subscription tiers displayed with clear pricing
- [ ] "Join Now" CTA prominent above the fold
- [ ] Mobile-responsive layout

#### US-1.2: Register Account
**As a** new user
**I want to** create an account quickly
**So that** I can start my membership

**Acceptance Criteria**:
- [ ] Email + password registration
- [ ] OAuth option (Google) for faster signup
- [ ] Email verification sent within 30 seconds
- [ ] Redirect to onboarding flow after verification

#### US-1.3: Select Subscription Tier
**As a** new member
**I want to** choose a subscription plan that fits my budget
**So that** I can contribute at my comfort level

**Acceptance Criteria**:
- [ ] Three tiers displayed: Base ($20/mo), Premium ($20/mo), VIP ($100/mo)
- [ ] Clear feature comparison between tiers
- [ ] VIP shows "6 seats for the price of 5" value proposition
- [ ] Stripe checkout integration with card payment
- [ ] Subscription confirmation email sent immediately

#### US-1.4: Select SDG Focus Areas
**As a** new member
**I want to** choose which impact areas matter most to me
**So that** my dashboard reflects my interests

**Acceptance Criteria**:
- [ ] Phase 1 SDGs presented: Climate Action (13), Life on Land (15), Life Below Water (14), Responsible Consumption (12), Clean Energy (7)
- [ ] Each SDG has a plain-language description (not just the official title)
- [ ] User can select 1–3 focus areas
- [ ] Selection can be changed later in settings
- [ ] Focus areas influence dashboard project ordering

### 3.2 Epic 2: Impact Dashboard

#### US-2.1: View Personal Impact Dashboard
**As a** member
**I want to** see a summary of my impact contributions
**So that** I know my subscription is making a difference

**Acceptance Criteria**:
- [ ] Dashboard shows total contributed this month and all-time
- [ ] Dollar breakdown: % to projects, % to operations
- [ ] Active projects listed with progress indicators
- [ ] SDG alignment badges shown per project
- [ ] Dashboard loads in < 2 seconds
- [ ] Mobile-optimized layout

#### US-2.2: View Project Detail
**As a** member
**I want to** see detailed information about a specific project
**So that** I understand what my money is funding

**Acceptance Criteria**:
- [ ] Project title, description, location, and timeline
- [ ] SDG alignment with specific targets
- [ ] Dollar allocation for this project (what % of subscription goes here)
- [ ] Progress metrics (e.g., trees planted, area restored)
- [ ] Monthly update log with text and photos
- [ ] Status indicator (active, completed, upcoming)

#### US-2.3: View Financial Transparency
**As a** member
**I want to** see exactly where Renovo spends its money
**So that** I trust the organization

**Acceptance Criteria**:
- [ ] Monthly breakdown: revenue in, allocation out
- [ ] Categories: project funding, operations, platform development, team
- [ ] Visual chart (pie or bar) showing distribution
- [ ] Historical data (month over month)

### 3.3 Epic 3: Community Voting

#### US-3.1: Vote on Next Month's Project
**As a** member
**I want to** vote on which project Renovo funds next
**So that** I have a say in where our collective money goes

**Acceptance Criteria**:
- [ ] Voting opens on the 15th of each month
- [ ] 2–3 candidate projects presented with descriptions
- [ ] Each member gets 1 vote (regardless of tier for MVP)
- [ ] Vote confirmation shown immediately
- [ ] Results displayed when voting closes (25th of month)
- [ ] Winning project announced via email and dashboard

#### US-3.2: View Voting Results
**As a** member
**I want to** see how the community voted
**So that** I feel connected to the collective decision

**Acceptance Criteria**:
- [ ] Results show vote count per project
- [ ] Winning project highlighted
- [ ] Historical voting results accessible
- [ ] "You voted for X" indicator if user participated

### 3.4 Epic 4: Impact Sharing

#### US-4.1: Generate Monthly Impact Card
**As a** member
**I want to** receive a shareable summary of my monthly impact
**So that** I can share it on social media

**Acceptance Criteria**:
- [ ] Auto-generated on the 1st of each month
- [ ] Includes: member name, total contributed, key metrics (trees, CO₂, etc.)
- [ ] SDG badges for areas impacted
- [ ] Renovo branding and URL
- [ ] Download as PNG image
- [ ] One-click share to Twitter/LinkedIn or copy link
- [ ] Web Share API on mobile

#### US-4.2: Share Individual Achievement
**As a** member
**I want to** share a specific milestone (e.g., "100 trees funded!")
**So that** I can celebrate and inspire others

**Acceptance Criteria**:
- [ ] Milestone notifications triggered at key thresholds
- [ ] Each milestone has a shareable card
- [ ] Share options: download image, copy link, native share

---

## 4. Data Models

### 4.1 Core Types

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  tier: 'base' | 'premium' | 'vip';
  sdgFocus: SDGId[];
  createdAt: Date;
  stripeCustomerId: string;
}

type SDGId = 7 | 12 | 13 | 14 | 15; // Phase 1 SDGs

interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  sdgs: SDGId[];
  status: 'active' | 'completed' | 'upcoming';
  startDate: Date;
  endDate?: Date;
  metrics: ProjectMetric[];
  updates: ProjectUpdate[];
  allocationPercent: number; // % of subscription revenue allocated
}

interface ProjectMetric {
  id: string;
  projectId: string;
  label: string;           // e.g., "Trees Planted"
  value: number;
  unit: string;            // e.g., "trees"
  sdg: SDGId;
  recordedAt: Date;
}

interface ProjectUpdate {
  id: string;
  projectId: string;
  title: string;
  body: string;
  imageUrls: string[];
  publishedAt: Date;
}

interface Subscription {
  id: string;
  userId: string;
  tier: 'base' | 'premium' | 'vip';
  status: 'active' | 'cancelled' | 'past_due';
  stripeSubscriptionId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  createdAt: Date;
}

interface Vote {
  id: string;
  userId: string;
  votingRoundId: string;
  projectId: string;
  castAt: Date;
}

interface VotingRound {
  id: string;
  month: string;             // "2026-03"
  candidateProjectIds: string[];
  winnerProjectId?: string;
  opensAt: Date;
  closesAt: Date;
  status: 'upcoming' | 'open' | 'closed';
}

interface ImpactCard {
  id: string;
  userId: string;
  month: string;             // "2026-02"
  totalContributed: number;
  metrics: { label: string; value: number; unit: string }[];
  sdgsBadges: SDGId[];
  imageUrl: string;
  generatedAt: Date;
}

interface FinancialBreakdown {
  month: string;
  totalRevenue: number;
  allocations: {
    category: 'projects' | 'operations' | 'platform' | 'team';
    amount: number;
    percent: number;
  }[];
}
```

---

## 5. Technical Specifications

### 5.1 Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | React + TypeScript + Vite | Fast development, type safety |
| Styling | Tailwind CSS | Rapid UI, consistent design system |
| Backend | Next.js API Routes or Express | SSR for landing page SEO, API for dashboard |
| Database | PostgreSQL (via Supabase) | Relational data, free tier available |
| Auth | Supabase Auth (or NextAuth) | Email + OAuth, free tier |
| Payments | Stripe Subscriptions | Industry standard, recurring billing |
| Image Gen | Satori + @vercel/og (or canvas) | Server-side impact card image generation |
| Hosting | Vercel | Free tier, CI/CD integration |
| Email | Resend (or SendGrid free tier) | Monthly digests, transactional emails |

### 5.2 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                      BROWSER                             │
│  ┌─────────────────────────────────────────────────────┐ │
│  │              React SPA / Next.js Pages              │ │
│  │  ┌──────────┐ ┌───────────┐ ┌────────────────────┐ │ │
│  │  │ Landing  │ │ Dashboard │ │ Voting / Projects  │ │ │
│  │  └──────────┘ └───────────┘ └────────────────────┘ │ │
│  └─────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS
┌────────────────────────┴────────────────────────────────┐
│                    API LAYER                              │
│  ┌──────────┐ ┌───────────┐ ┌─────────┐ ┌────────────┐ │
│  │ Auth API │ │ Projects  │ │ Voting  │ │ Payments   │ │
│  │          │ │ API       │ │ API     │ │ (Stripe)   │ │
│  └──────────┘ └───────────┘ └─────────┘ └────────────┘ │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────┐
│                  DATA LAYER                              │
│  ┌──────────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │ PostgreSQL       │  │ Stripe       │  │ Resend    │ │
│  │ (Supabase)       │  │ (Billing)    │  │ (Email)   │ │
│  └──────────────────┘  └──────────────┘  └───────────┘ │
└─────────────────────────────────────────────────────────┘
```

### 5.3 Page Structure

| Route | Page | Auth Required |
|-------|------|---------------|
| `/` | Landing page | No |
| `/login` | Login | No |
| `/signup` | Registration + onboarding | No |
| `/dashboard` | Personal impact dashboard | Yes |
| `/projects` | All projects list | Yes |
| `/projects/:id` | Project detail | Yes |
| `/vote` | Current voting round | Yes |
| `/impact/:month` | Monthly impact card | Yes |
| `/transparency` | Financial breakdown | No (public) |
| `/settings` | Account & SDG preferences | Yes |
| `/admin` | Project & metrics management | Admin only |

### 5.4 Subscription & Payment Flow

```
User selects tier → Stripe Checkout Session → Payment confirmed
     ↓                                              ↓
  Redirect to onboarding               Stripe webhook → create Subscription record
     ↓                                              ↓
  SDG selection → Dashboard              Monthly invoice → allocate funds
```

### 5.5 Browser Support

| Browser | Version | Priority |
|---------|---------|----------|
| Chrome | 90+ | P0 |
| Firefox | 90+ | P0 |
| Safari | 15+ | P0 |
| Edge | 90+ | P1 |
| Mobile Safari | 15+ | P0 |
| Chrome Android | 90+ | P0 |

---

## 6. UI Specifications

### 6.1 Screen Flow

```
Landing Page → Sign Up → Tier Selection → SDG Picker → Dashboard
                                                           │
                              ┌──────────┬─────────┬───────┘
                              ↓          ↓         ↓
                          Projects    Voting    Impact Card
                              │
                              ↓
                        Project Detail
```

### 6.2 Color System

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#2D6A4F` | CTA buttons, active states (forest green) |
| `primary-light` | `#52B788` | Hover states, progress bars |
| `secondary` | `#1B4332` | Headers, dark accents |
| `accent` | `#95D5B2` | Highlights, badges |
| `bg-primary` | `#FFFFFF` | Main background |
| `bg-secondary` | `#F0FFF4` | Card backgrounds, dashboard sections |
| `text-primary` | `#1B1B1B` | Body text |
| `text-secondary` | `#6B7280` | Captions, secondary info |
| `sdg-7` | `#FCC30B` | SDG 7 — Affordable and Clean Energy |
| `sdg-12` | `#BF8B2E` | SDG 12 — Responsible Consumption |
| `sdg-13` | `#3F7E44` | SDG 13 — Climate Action |
| `sdg-14` | `#0A97D9` | SDG 14 — Life Below Water |
| `sdg-15` | `#56C02B` | SDG 15 — Life on Land |

### 6.3 Key Component Wireframes

#### Dashboard Layout
```
┌─────────────────────────────────────────────┐
│  [Logo]   Dashboard  Projects  Vote  [User] │
├─────────────────────────────────────────────┤
│                                             │
│  Welcome back, Anika!                       │
│                                             │
│  ┌──────────────┐  ┌──────────────────────┐ │
│  │ This Month   │  │ All-Time Impact      │ │
│  │ $20.00       │  │ $120.00              │ │
│  │ contributed  │  │ 6 months             │ │
│  └──────────────┘  └──────────────────────┘ │
│                                             │
│  Where Your Money Goes                      │
│  ┌─────────────────────────────────────────┐│
│  │ ████████████████████░░░░░░░░░░  50%     ││
│  │ Projects                                ││
│  │ ████████████░░░░░░░░░░░░░░░░░░  30%     ││
│  │ Operations                              ││
│  │ ████████░░░░░░░░░░░░░░░░░░░░░░  20%     ││
│  │ Platform & Growth                       ││
│  └─────────────────────────────────────────┘│
│                                             │
│  Active Projects                            │
│  ┌─────────────────┐ ┌─────────────────┐   │
│  │ 🌲 BC Reforest  │ │ 🐟 Coastal     │   │
│  │ SDG 13, 15      │ │ SDG 14          │   │
│  │ 342 trees       │ │ 2 km restored   │   │
│  │ [View →]        │ │ [View →]        │   │
│  └─────────────────┘ └─────────────────┘   │
│                                             │
│  [📊 View Impact Card]  [🗳 Vote Now]       │
└─────────────────────────────────────────────┘
```

---

## 7. Implementation Priorities

### Phase 1A: Foundation (Weeks 1–2)
1. Project scaffolding (Vite + React + TypeScript)
2. Supabase setup (database schema, auth)
3. Landing page
4. Authentication flow (signup, login, email verification)
5. Stripe subscription integration

### Phase 1B: Core Experience (Weeks 3–4)
6. Onboarding flow (tier selection, SDG picker)
7. Impact dashboard
8. Project detail pages
9. Dollar allocation breakdown
10. Admin panel (create/update projects, add metrics)

### Phase 1C: Engagement (Weeks 5–6)
11. Community voting system
12. Monthly impact card generation
13. Share functionality (download PNG, social share)
14. Email digest (monthly summary via Resend)
15. Financial transparency page

### Phase 1D: Polish (Week 7)
16. Mobile optimization
17. Performance tuning (< 3s page loads)
18. Error handling & loading states
19. SEO (landing page meta, OG tags)
20. Analytics integration

---

## 8. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Low signup conversion | High | High | A/B test landing page, show transparency preview pre-signup |
| Stripe integration complexity | Medium | Medium | Use Stripe Checkout (hosted), not custom forms |
| Admin burden (project updates) | Medium | Medium | Simple admin panel, batch metric uploads |
| Low voting participation | Medium | Low | Email + push reminders when voting opens |
| Pricing too high for Gen Z | High | Medium | Consider student discount tier or $10 intro price |
| Content pipeline (project updates) | Medium | High | Template-based updates, require monthly from project partners |

---

## 9. Future Backlog (Post-Phase 1)

- **Phase 2**: Social impact projects (Quality Education, Gender Equality, etc.)
- **Phase 3**: Basic needs projects (No Poverty, Zero Hunger, etc.)
- **Phase 4**: Institutional partnerships (Peace, Justice, Partnerships)
- Native mobile app
- Satellite imagery / before-after project visuals
- Corporate ESG report export (PDF)
- Gamified referral system with rewards
- Multi-language support (French for Canada)
- Geographic split (BC, Alberta, national, international)
- Video content hosting (project documentaries)
- Real-time notification system

---

*Prepared for Renovo Impact Hub — Phase 1 MVP Development*
*Derived from: Business plan, UXR document, competitive analysis*
