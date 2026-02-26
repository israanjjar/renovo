# Meeting Bingo — Implementation Plan

## Context

The MeetingBingo repo currently contains only documentation (PRD, architecture, UXR). No source code exists. The goal is to build a fully functional React + TypeScript browser app per the architecture spec — a bingo game that auto-detects meeting buzzwords via the Web Speech API.

The app will be scaffolded inside `/workspaces/renovo/MeetingBingo/` as a Vite + React + TypeScript project.

## Phase 1: Project Setup & Configuration (~5 min)

1. **Scaffold Vite project** in `/workspaces/renovo/MeetingBingo/`
   - `npm create vite@latest . -- --template react-ts` (in the MeetingBingo dir)
   - Install deps: `react`, `react-dom`, `canvas-confetti`
   - Install devDeps: `tailwindcss`, `postcss`, `autoprefixer`, `@types/canvas-confetti`

2. **Configure Tailwind CSS**
   - `npx tailwindcss init -p`
   - Create `tailwind.config.js` with content paths, custom animations (bounceIn, pulse-fast)
   - Update `src/index.css` with Tailwind directives

3. **Configure TypeScript & Vite**
   - `vite.config.ts` — react plugin, port 3000
   - `tsconfig.json` — strict mode (should come from Vite template)

## Phase 2: Types & Data (~5 min)

4. **Create `src/types/index.ts`**
   - `CategoryId`, `Category`, `BingoSquare`, `BingoCard`, `GameStatus`, `WinningLine`, `GameState`, `SpeechRecognitionState`, `Toast`
   - Per architecture doc lines 191–269

5. **Create `src/data/categories.ts`**
   - 3 categories: Agile & Scrum, Corporate Speak, Tech & Engineering
   - 40+ words each, per architecture doc lines 932–993

## Phase 3: Core Logic Libraries (~10 min)

6. **Create `src/lib/cardGenerator.ts`**
   - Fisher-Yates shuffle
   - `generateCard(categoryId)` — picks 24 random words, builds 5x5 grid with center free space

7. **Create `src/lib/bingoChecker.ts`**
   - `checkForBingo(card)` — checks 5 rows, 5 columns, 2 diagonals
   - `countFilled(card)` — count filled squares
   - `getClosestToWin(card)` — hint for UI

8. **Create `src/lib/wordDetector.ts`**
   - `detectWords(transcript, cardWords, alreadyFilled)` — regex word-boundary matching
   - `detectWordsWithAliases(...)` — handles common variations (CI/CD, MVP, ROI, etc.)
   - Text normalization helpers

9. **Create `src/lib/shareUtils.ts`**
   - Generate text-based share card
   - Clipboard API / Web Share API integration

## Phase 4: React Hooks (~10 min)

10. **Create `src/hooks/useSpeechRecognition.ts`**
    - Web Speech API wrapper with auto-restart on end
    - Manages `isListening`, `transcript`, `interimTranscript`, `error`
    - Feature detection for browser support

11. **Create `src/hooks/useGame.ts`**
    - Game state management (setup → playing → won)
    - Wire speech results to word detection → auto-fill squares
    - Manual square toggle

12. **Create `src/hooks/useBingoDetection.ts`**
    - Watches filled squares, triggers bingo check
    - Returns winning line info

13. **Create `src/hooks/useLocalStorage.ts`**
    - Generic localStorage get/set with JSON serialization

## Phase 5: UI Components (~20 min)

14. **Create utility: `src/lib/utils.ts`**
    - `cn()` helper for conditional classnames (simple template literal join)

15. **Create `src/components/ui/Button.tsx`**
    - Reusable button with variant styles

16. **Create `src/components/ui/Card.tsx`**
    - Reusable card wrapper
    

17. **Create `src/components/ui/Toast.tsx`**
    - Toast notification for detected words

18. **Create `src/components/LandingPage.tsx`**
    - Hero, "New Game" CTA, how-it-works section, privacy note

19. **Create `src/components/CategorySelect.tsx`**
    - 3 category cards with icons, descriptions, sample words
    - Back button

20. **Create `src/components/BingoSquare.tsx`**
    - Square states: default, filled, auto-filled, free space, winning
    - Click handler, animations

21. **Create `src/components/BingoCard.tsx`**
    - 5x5 CSS grid of BingoSquare components

22. **Create `src/components/TranscriptPanel.tsx`**
    - Live transcript display, listening indicator, detected words chips

23. **Create `src/components/GameControls.tsx`**
    - New Card button, listening toggle, progress counter

24. **Create `src/components/GameBoard.tsx`**
    - Main game container composing BingoCard, TranscriptPanel, GameControls
    - Orchestrates speech recognition + game state

25. **Create `src/components/WinScreen.tsx`**
    - Confetti animation (canvas-confetti), BINGO announcement
    - Winning line highlight, game stats, share + play again buttons

## Phase 6: App Shell & Entry Point (~5 min)

26. **Update `src/App.tsx`**
    - Screen routing: landing → category → game → win
    - Game state management at top level

27. **Update `src/main.tsx`**
    - Standard React 18 createRoot entry

28. **Update `index.html`**
    - Title, favicon, meta tags

## Phase 7: Styling & Polish (~5 min)

29. **Update `src/index.css`**
    - Tailwind directives, custom base styles
    - Color system per PRD section 6.6

30. **Add `public/favicon.svg`**

## Verification

1. `npm run dev` — app starts on localhost:3000
2. Landing page renders with "New Game" button
3. Category selection shows 3 packs
4. Card generates 5x5 grid with free center space
5. Manual tap fills/unfills squares
6. BINGO detected on 5-in-a-row (row/col/diagonal)
7. Confetti plays on win
8. Speech recognition (Chrome) detects spoken buzzwords and auto-fills
9. Share button copies result to clipboard
10. `npm run build` succeeds with no TypeScript errors
