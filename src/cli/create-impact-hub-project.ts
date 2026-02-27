import { linear } from "../linear.js";

const TEAM_ID = "b1f28b55-cac6-4f99-bdbb-0e17efced5b7";

const PRIORITY = { urgent: 1, high: 2, normal: 3, low: 4 } as const;

interface Step {
  title: string;
  description: string;
  priority: number;
}

const steps: Step[] = [
  // Phase 1A: Foundation (Urgent)
  {
    title: "Scaffold Next.js project with TypeScript + Tailwind",
    description: `Scaffold the Next.js project in \`/RenovoImpactHub/\`:
- \`npx create-next-app@latest . --typescript --tailwind --app --src-dir\`
- Install deps: \`@supabase/ssr\`, \`@supabase/supabase-js\`, \`stripe\`, \`resend\`
- Install devDeps: \`@types/node\`
- Configure Tailwind with custom color tokens (primary #2D6A4F, secondary #1B4332, accent #95D5B2, SDG colors)`,
    priority: PRIORITY.urgent,
  },
  {
    title: "Set up Supabase project and initial schema",
    description: `- Create Supabase project
- Run initial migration (\`supabase/migrations/001_initial_schema.sql\`)
- Tables: users, subscriptions, projects, project_metrics, project_updates, voting_rounds, votes, impact_cards, financial_breakdowns
- Configure Row-Level Security policies
- Set up auth providers (email + Google OAuth)`,
    priority: PRIORITY.urgent,
  },
  {
    title: "Configure Stripe products and subscription checkout",
    description: `- Create 3 Stripe products + prices: Base ($20/mo), Premium ($20/mo), VIP ($100/mo)
- Implement checkout session creation (\`src/lib/stripe/checkout.ts\`)
- Set up Stripe client instance (\`src/lib/stripe/client.ts\`)
- Create webhook endpoint handler (\`src/app/api/webhooks/stripe/route.ts\`)
- Handle \`checkout.session.completed\` and \`customer.subscription.deleted\` events`,
    priority: PRIORITY.urgent,
  },
  {
    title: "Build landing page with transparency preview",
    description: `Build \`src/app/page.tsx\` (SSR, public):
- Hero section with real impact statistic (e.g., "243 trees planted this month")
- Transparency preview section showing sample dollar breakdown
- Pricing table displaying 3 tiers with feature comparison
- "Join Now" CTA buttons prominent above the fold
- SEO meta tags + OG image
- Mobile-responsive layout
- Components: Hero.tsx, TransparencyPreview.tsx, PricingTable.tsx`,
    priority: PRIORITY.urgent,
  },
  {
    title: "Set up environment variables and Supabase client helpers",
    description: `- Create \`.env.example\` with all required vars (Supabase, Stripe, Resend)
- Create \`src/lib/supabase/client.ts\` (browser client)
- Create \`src/lib/supabase/server.ts\` (server client with cookies)
- Create \`src/lib/supabase/admin.ts\` (service-role client for webhooks)
- Create utility helpers: \`src/lib/utils/sdg.ts\`, \`currency.ts\`, \`dates.ts\``,
    priority: PRIORITY.urgent,
  },

  // Phase 1B: Core Experience (High)
  {
    title: "Build authentication pages (login + signup)",
    description: `- \`/login\` page — email + Google OAuth via Supabase Auth
- \`/signup\` page — registration with email verification
- Middleware for protected routes (redirect to login if unauthenticated)
- Auth callback handler for OAuth redirects
- Session management via Supabase SSR cookies`,
    priority: PRIORITY.high,
  },
  {
    title: "Build onboarding flow (tier selection + SDG picker)",
    description: `- \`/onboarding\` page — tier selection → Stripe Checkout redirect
- Post-payment redirect handling (Stripe success URL → SDG picker)
- SDG focus selection with checkboxes for Phase 1 SDGs: Climate Action (13), Life on Land (15), Life Below Water (14), Responsible Consumption (12), Clean Energy (7)
- Plain-language descriptions for each SDG (not just official titles)
- Selection saved to user profile, changeable later in settings`,
    priority: PRIORITY.high,
  },
  {
    title: "Build personal impact dashboard",
    description: `Build \`/dashboard\` page using React Server Components:
- ImpactSummary: this month + all-time contribution totals
- AllocationChart: progress bar breakdown showing % to projects / operations / platform
- Active project cards with SDG alignment badges
- Quick links to voting and impact card
- Dashboard loads in < 2 seconds
- Mobile-optimized layout
- Components: ImpactSummary.tsx, AllocationChart.tsx, ProjectCard.tsx, SDGBadge.tsx`,
    priority: PRIORITY.high,
  },
  {
    title: "Build project listing and detail pages",
    description: `- \`/projects\` — grid of all active projects with SDG badges and status
- \`/projects/[id]\` — full project detail page:
  - Title, description, location, timeline
  - SDG alignment with specific targets
  - Dollar allocation (% of subscription going to this project)
  - Progress metrics (trees planted, CO₂ offset, etc.)
  - Monthly update timeline with text and photos
  - Status indicator (active, completed, upcoming)
- Components: ProjectDetail.tsx, MetricDisplay.tsx, UpdateTimeline.tsx`,
    priority: PRIORITY.high,
  },
  {
    title: "Build admin panel for project and metric management",
    description: `- \`/admin\` — protected by admin role check
- \`/admin/projects\` — CRUD interface for projects (create, edit, archive)
- \`/admin/metrics\` — add/edit project metrics (trees, CO₂, area restored, etc.)
- Project update publishing interface (title, body, images)
- Financial breakdown entry form (monthly revenue + allocation percentages)
- Simple, functional UI — no over-engineering`,
    priority: PRIORITY.high,
  },

  // Phase 1C: Engagement (Normal)
  {
    title: "Build community voting system",
    description: `- \`/vote\` page — current voting round with 2-3 candidate projects
- \`/api/vote\` POST endpoint:
  - Validate 1 vote per user per round (unique constraint)
  - Return updated vote counts
- VotingCard component with project summary and vote button
- VotingResults component (bar chart showing votes, winner highlighted)
- Historical voting results accessible
- "You voted for X" indicator if user participated`,
    priority: PRIORITY.normal,
  },
  {
    title: "Build impact card image generator",
    description: `- \`/api/impact-card\` — Edge function using @vercel/og (Satori)
- Generates 1200x630 PNG with: member name, total contributed, key metrics (trees, CO₂), SDG badges, Renovo branding
- \`/impact/[month]\` — view page for monthly impact card
- Auto-generated on 1st of each month via Vercel Cron
- Download as PNG button
- Milestone cards for key thresholds (50 trees, $100 contributed, etc.)`,
    priority: PRIORITY.normal,
  },
  {
    title: "Add share functionality",
    description: `- ShareButtons component:
  - Download PNG (impact card image)
  - Copy shareable link to clipboard
  - Web Share API integration (mobile native share sheet)
  - Pre-filled text for Twitter/LinkedIn sharing
- Share individual achievements/milestones
- Track share clicks for analytics
- Components: ShareButtons.tsx, ImpactCardPreview.tsx`,
    priority: PRIORITY.normal,
  },
  {
    title: "Set up email digest with Resend",
    description: `- Resend integration (\`src/lib/email/resend.ts\`)
- Email templates:
  - Welcome email (on signup)
  - Monthly impact digest (contribution summary, project updates, voting reminder)
  - Voting-open notification
  - Vote results announcement
- Vercel Cron job: \`/api/cron/monthly\` runs on 1st of each month at 9 AM
- Configure in \`vercel.json\` crons array`,
    priority: PRIORITY.normal,
  },
  {
    title: "Build financial transparency page",
    description: `- \`/transparency\` — public page (no auth required)
- Monthly revenue and allocation breakdown:
  - Categories: project funding, operations, platform development, team
  - Visual chart (pie or bar) showing distribution
  - Dollar amounts and percentages
- Historical data (month over month comparison)
- Sourced from financial_breakdowns table`,
    priority: PRIORITY.normal,
  },

  // Phase 1D: Polish (Low)
  {
    title: "Mobile responsive optimization",
    description: `- Test all pages at 375px, 768px, 1024px, 1440px breakpoints
- Bottom navigation bar on mobile
- Touch-friendly voting cards and buttons (min 44px tap targets)
- Responsive dashboard layout (stacked cards on mobile, grid on desktop)
- Hamburger menu for mobile navigation
- Test on iOS Safari and Chrome Android`,
    priority: PRIORITY.low,
  },
  {
    title: "Add loading states, error boundaries, and empty states",
    description: `- Skeleton loaders for dashboard, project cards, voting page
- Error boundaries with retry buttons at page level
- Empty states with helpful messages:
  - "No projects yet" / "No votes cast" / "Impact card coming soon"
- Toast notifications for success/error actions (vote cast, share copied, etc.)
- Optimistic UI updates where appropriate`,
    priority: PRIORITY.low,
  },
  {
    title: "SEO and performance optimization",
    description: `- Landing page meta tags, canonical URL, structured data
- OG image for social sharing (landing page)
- Next.js Image optimization for project photos
- Lighthouse audit: target > 90 on all metrics (Performance, Accessibility, Best Practices, SEO)
- Page load < 3 seconds on 3G
- Code splitting and lazy loading for authenticated routes`,
    priority: PRIORITY.low,
  },
  {
    title: "Security hardening",
    description: `- Verify RLS policies block cross-user data access
- Validate Stripe webhook signatures in handler
- Rate limit voting endpoint (prevent vote spam)
- Sanitize admin inputs (prevent XSS/injection)
- CSRF protection on state-changing endpoints
- Content Security Policy headers
- Audit all API routes for proper auth checks`,
    priority: PRIORITY.low,
  },
  {
    title: "Deploy to production on Vercel",
    description: `- Configure Vercel project for RenovoImpactHub
- Set all environment variables (Supabase, Stripe, Resend)
- Configure custom domain (if available)
- Set up Vercel Cron for monthly tasks (\`vercel.json\`)
- Verify CI/CD pipeline (build → staging preview on PR → production on merge)
- Extend existing GitHub Actions workflow or create new one
- Smoke test all features in production`,
    priority: PRIORITY.low,
  },
];

const PHASE_LABELS = [
  { start: 0, end: 5, label: "Phase 1A: Foundation" },
  { start: 5, end: 10, label: "Phase 1B: Core Experience" },
  { start: 10, end: 15, label: "Phase 1C: Engagement" },
  { start: 15, end: 20, label: "Phase 1D: Polish" },
];

function getPhaseLabel(index: number): string {
  const phase = PHASE_LABELS.find((p) => index >= p.start && index < p.end);
  return phase?.label ?? "";
}

async function main() {
  // Create the project
  console.log("Creating project: Renovo Impact Hub...");
  const projectResult = await linear.createProject({
    name: "Renovo Impact Hub",
    description:
      "A membership-based impact platform with real-time dashboards, community voting, and shareable impact cards. Built with Next.js + TypeScript + Supabase + Stripe.",
    teamIds: [TEAM_ID],
  });
  const project = await projectResult.project;
  if (!project) {
    console.error("Failed to create project");
    process.exit(1);
  }
  console.log(`Created project: ${project.name} (${project.id})`);

  // Create issues
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const phase = getPhaseLabel(i);
    const stepNum = i + 1;
    const title = `Step ${stepNum}: ${step.title}`;
    const description = `**${phase}**\n\n${step.description}`;

    const result = await linear.createIssue({
      teamId: TEAM_ID,
      title,
      description,
      projectId: project.id,
      priority: step.priority,
    });
    const issue = await result.issue;
    if (!issue) {
      console.error(`Failed to create issue for step ${stepNum}`);
      continue;
    }
    console.log(`  ${issue.identifier}: ${title}`);
  }

  console.log(
    `\nDone! Created ${steps.length} issues in project "${project.name}" (${project.id}).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
