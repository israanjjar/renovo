# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Renovo helps purpose-driven organizations turn vision into measurable impact. This is a multi-app monorepo with three main areas:

1. **Linear CLI tooling** (root `src/`) — Node.js CLI scripts for managing Linear issues
2. **Renovo Impact Hub** (`RenovoImpactHub/`) — Next.js membership platform with dashboards, voting, and impact cards
3. **Meeting Bingo** (`MeetingBingo/`) — Vite + React app that auto-detects meeting buzzwords via the Web Speech API

## Commands

### Root (Linear CLI)

- `npm install` — install root dependencies
- `npm run typecheck` — run `tsc --noEmit` (the only validation step; no test framework or linter)
- `npm run issues -- --team REN` — list issues (supports `--status`, `--assignee`, `--limit`)
- `npm run issue -- <ID>` — get issue details (accepts UUID or `REN-42` format)
- `npm run issue:create -- --team REN --title "..."` — create issue (optional: `--priority`, `--description`, `--assignee`, `--label`, `--status`)
- `npm run issue:update -- --id <ID> --status Done` — update issue fields
- `npm run issue:search -- --query "..."` — full-text search issues
- `npm run project:create` — scaffold project with issues in Linear

All CLI scripts run via `tsx` (no build step required).

### Renovo Impact Hub (`RenovoImpactHub/`)

- `npm run dev` — start Next.js dev server
- `npm run build` — production build
- `npm run lint` — ESLint

### Meeting Bingo (`MeetingBingo/`)

- `npm run dev` — start Vite dev server
- `npm run build` — `tsc -b && vite build`
- `npm run lint` — ESLint

**Note:** Each sub-app has its own `node_modules` and `package.json`. Run `npm install` from the sub-app directory.

## Environment Variables

Root environment is managed via [varlock](https://varlock.dev/env-spec) with schema in `.env.schema` and auto-generated types in `env.d.ts`.

- `LINEAR_API_KEY` (sensitive) — API key for Linear SDK authentication

Do not edit `env.d.ts` directly; it is auto-generated from `.env.schema`.

To load the env for manual script runs: `set -a && source .env && set +a && npx tsx <script>`

## Architecture

### Linear CLI (`src/`)

- `src/linear.ts` — singleton `LinearClient` instance, validates API key at load
- `src/cli/*.ts` — CLI scripts with custom arg parsing (no CLI framework)

**Patterns:**
- All scripts import `linear` from `../linear.js` (note `.js` extension for NodeNext resolution)
- Priority constants: urgent=1, high=2, normal=3, low=4
- Linear SDK filters use nested object syntax: `{ filter: { field: { eq: value } } }`
- Async relationships (state, assignee, labels, team) must be awaited separately after fetching an issue
- Type extraction pattern: `type Input = Parameters<LinearClient["methodName"]>[0]`

### Renovo Impact Hub (`RenovoImpactHub/`)

Next.js 16 app (App Router, React 19) with Tailwind CSS v4. Tech stack: Supabase (auth + DB), Stripe (subscriptions), Resend (email).

Key structure:
- `src/app/` — App Router pages (dashboard, projects, vote, admin, transparency, etc.)
- `src/components/` — organized by domain: `ui/`, `layout/`, `landing/`, `dashboard/`, `projects/`, `voting/`, `sharing/`
- `src/lib/supabase/` — client.ts (browser), server.ts (SSR with cookies)
- `src/lib/stripe/checkout.ts` — Stripe checkout session creation
- `src/lib/mock/data.ts` — mock data for development
- `src/lib/utils/` — sdg.ts, currency.ts, dates.ts
- `src/lib/auth/AuthContext.tsx` — auth context provider
- `src/middleware.ts` — route protection
- `src/types/index.ts` — shared TypeScript types

### Meeting Bingo (`MeetingBingo/`)

Vite + React + TypeScript + Tailwind CSS v4. Uses `canvas-confetti` for celebration effects. Planning docs (UXR, architecture, PRD) are in the `MeetingBingo/` directory as markdown files.

### Linear Skill (`~/.claude/skills/linear/`)

Installed Claude Code skill for Linear operations. Provides `scripts/linear-ops.ts`, `scripts/query.ts` for GraphQL, and setup/verification tools.

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`):
- **On PR:** builds both MeetingBingo and RenovoImpactHub, deploys MeetingBingo staging preview to Vercel, posts preview URL as PR comment
- **On push to main:** builds both apps, deploys MeetingBingo and RenovoImpactHub to production on Vercel
- Each app builds independently with its own `package-lock.json`

## Linear Workspace

- **Team:** REN (ID: `b1f28b55-cac6-4f99-bdbb-0e17efced5b7`)
- **Meeting Bingo Project ID:** `3349473a-bac6-4097-9ab7-daf9917eafc7`

## TypeScript

Root project: strict mode, ES2022 target, NodeNext module resolution, `dist/` outDir (unused — scripts run via tsx).

RenovoImpactHub and MeetingBingo each have their own `tsconfig.json`.
