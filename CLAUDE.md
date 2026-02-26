# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Renovo helps purpose-driven organizations turn vision into measurable impact. This is a Node.js (ES modules) project that provides CLI tooling for the Linear API. It also contains planning docs for **Meeting Bingo**, a React app that auto-detects meeting buzzwords via the Web Speech API.

## Commands

- `npm install` — install dependencies
- `npm run typecheck` — run `tsc --noEmit` (the only validation step; no test framework or linter)
- `npm run issues -- --team REN` — list issues (supports `--status`, `--assignee`, `--limit`)
- `npm run issue -- <ID>` — get issue details (accepts UUID or `REN-42` format)
- `npm run issue:create -- --team REN --title "..."` — create issue (optional: `--priority`, `--description`, `--assignee`, `--label`, `--status`)
- `npm run issue:update -- --id <ID> --status Done` — update issue fields
- `npm run issue:search -- --query "..."` — full-text search issues
- `npm run project:create` — scaffold Meeting Bingo project with 30 issues in Linear

All CLI scripts run via `tsx` (no build step required).

## Environment Variables

Environment is managed via [varlock](https://varlock.dev/env-spec) with schema in `.env.schema` and auto-generated types in `env.d.ts`.

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

### Meeting Bingo (`MeetingBingo/`)

Documentation-only (no source code yet). Contains UXR, architecture doc, and implementation plan with 30 steps across 7 phases. All 30 steps are tracked as Linear issues (REN-5 through REN-34) under the "Meeting Bingo" project.

### Linear Skill (`~/.claude/skills/linear/`)

Installed Claude Code skill for Linear operations. Provides `scripts/linear-ops.ts`, `scripts/query.ts` for GraphQL, and setup/verification tools.

## Linear Workspace

- **Team:** REN (ID: `b1f28b55-cac6-4f99-bdbb-0e17efced5b7`)
- **Meeting Bingo Project ID:** `3349473a-bac6-4097-9ab7-daf9917eafc7`

## TypeScript

- Strict mode, ES2022 target, NodeNext module resolution
- Output dir: `dist/` (not currently used — scripts run directly via tsx)
