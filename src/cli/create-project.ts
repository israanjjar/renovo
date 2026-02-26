import { linear } from "../linear.js";

const TEAM_ID = "b1f28b55-cac6-4f99-bdbb-0e17efced5b7";

const PRIORITY = { urgent: 1, high: 2, normal: 3, low: 4 } as const;

interface Step {
  title: string;
  description: string;
  priority: number;
}

const steps: Step[] = [
  // Phase 1: Project Setup & Configuration (Urgent)
  {
    title: "Scaffold Vite + React + TypeScript project",
    description: `Scaffold the Vite project in \`/MeetingBingo/\`:
- \`npm create vite@latest . -- --template react-ts\` (in the MeetingBingo dir)
- Install deps: \`react\`, \`react-dom\`, \`canvas-confetti\`
- Install devDeps: \`tailwindcss\`, \`postcss\`, \`autoprefixer\`, \`@types/canvas-confetti\``,
    priority: PRIORITY.urgent,
  },
  {
    title: "Configure Tailwind CSS",
    description: `- \`npx tailwindcss init -p\`
- Create \`tailwind.config.js\` with content paths, custom animations (bounceIn, pulse-fast)
- Update \`src/index.css\` with Tailwind directives`,
    priority: PRIORITY.urgent,
  },
  {
    title: "Configure TypeScript & Vite",
    description: `- \`vite.config.ts\` — react plugin, port 3000
- \`tsconfig.json\` — strict mode (should come from Vite template)`,
    priority: PRIORITY.urgent,
  },

  // Phase 2: Types & Data (High)
  {
    title: "Create TypeScript type definitions",
    description: `Create \`src/types/index.ts\` with:
- \`CategoryId\`, \`Category\`, \`BingoSquare\`, \`BingoCard\`, \`GameStatus\`, \`WinningLine\`, \`GameState\`, \`SpeechRecognitionState\`, \`Toast\`
- Per architecture doc type definitions`,
    priority: PRIORITY.high,
  },
  {
    title: "Create buzzword category data",
    description: `Create \`src/data/categories.ts\`:
- 3 categories: Agile & Scrum, Corporate Speak, Tech & Engineering
- 40+ words each, per architecture doc`,
    priority: PRIORITY.high,
  },

  // Phase 3: Core Logic Libraries (High)
  {
    title: "Implement card generator (Fisher-Yates shuffle)",
    description: `Create \`src/lib/cardGenerator.ts\`:
- Fisher-Yates shuffle
- \`generateCard(categoryId)\` — picks 24 random words, builds 5x5 grid with center free space`,
    priority: PRIORITY.high,
  },
  {
    title: "Implement bingo checker (win detection)",
    description: `Create \`src/lib/bingoChecker.ts\`:
- \`checkForBingo(card)\` — checks 5 rows, 5 columns, 2 diagonals
- \`countFilled(card)\` — count filled squares
- \`getClosestToWin(card)\` — hint for UI`,
    priority: PRIORITY.high,
  },
  {
    title: "Implement word detector (speech matching)",
    description: `Create \`src/lib/wordDetector.ts\`:
- \`detectWords(transcript, cardWords, alreadyFilled)\` — regex word-boundary matching
- \`detectWordsWithAliases(...)\` — handles common variations (CI/CD, MVP, ROI, etc.)
- Text normalization helpers`,
    priority: PRIORITY.high,
  },
  {
    title: "Implement share utilities",
    description: `Create \`src/lib/shareUtils.ts\`:
- Generate text-based share card
- Clipboard API / Web Share API integration`,
    priority: PRIORITY.high,
  },

  // Phase 4: React Hooks (High)
  {
    title: "Create useSpeechRecognition hook",
    description: `Create \`src/hooks/useSpeechRecognition.ts\`:
- Web Speech API wrapper with auto-restart on end
- Manages \`isListening\`, \`transcript\`, \`interimTranscript\`, \`error\`
- Feature detection for browser support`,
    priority: PRIORITY.high,
  },
  {
    title: "Create useGame hook",
    description: `Create \`src/hooks/useGame.ts\`:
- Game state management (setup → playing → won)
- Wire speech results to word detection → auto-fill squares
- Manual square toggle`,
    priority: PRIORITY.high,
  },
  {
    title: "Create useBingoDetection hook",
    description: `Create \`src/hooks/useBingoDetection.ts\`:
- Watches filled squares, triggers bingo check
- Returns winning line info`,
    priority: PRIORITY.high,
  },
  {
    title: "Create useLocalStorage hook",
    description: `Create \`src/hooks/useLocalStorage.ts\`:
- Generic localStorage get/set with JSON serialization`,
    priority: PRIORITY.high,
  },

  // Phase 5: UI Components (Normal)
  {
    title: "Create cn() utility helper",
    description: `Create \`src/lib/utils.ts\`:
- \`cn()\` helper for conditional classnames (simple template literal join)`,
    priority: PRIORITY.normal,
  },
  {
    title: "Create Button component",
    description: `Create \`src/components/ui/Button.tsx\`:
- Reusable button with variant styles`,
    priority: PRIORITY.normal,
  },
  {
    title: "Create Card component",
    description: `Create \`src/components/ui/Card.tsx\`:
- Reusable card wrapper`,
    priority: PRIORITY.normal,
  },
  {
    title: "Create Toast component",
    description: `Create \`src/components/ui/Toast.tsx\`:
- Toast notification for detected words`,
    priority: PRIORITY.normal,
  },
  {
    title: "Create LandingPage component",
    description: `Create \`src/components/LandingPage.tsx\`:
- Hero, "New Game" CTA, how-it-works section, privacy note`,
    priority: PRIORITY.normal,
  },
  {
    title: "Create CategorySelect component",
    description: `Create \`src/components/CategorySelect.tsx\`:
- 3 category cards with icons, descriptions, sample words
- Back button`,
    priority: PRIORITY.normal,
  },
  {
    title: "Create BingoSquare component",
    description: `Create \`src/components/BingoSquare.tsx\`:
- Square states: default, filled, auto-filled, free space, winning
- Click handler, animations`,
    priority: PRIORITY.normal,
  },
  {
    title: "Create BingoCard component",
    description: `Create \`src/components/BingoCard.tsx\`:
- 5x5 CSS grid of BingoSquare components`,
    priority: PRIORITY.normal,
  },
  {
    title: "Create TranscriptPanel component",
    description: `Create \`src/components/TranscriptPanel.tsx\`:
- Live transcript display, listening indicator, detected words chips`,
    priority: PRIORITY.normal,
  },
  {
    title: "Create GameControls component",
    description: `Create \`src/components/GameControls.tsx\`:
- New Card button, listening toggle, progress counter`,
    priority: PRIORITY.normal,
  },
  {
    title: "Create GameBoard component",
    description: `Create \`src/components/GameBoard.tsx\`:
- Main game container composing BingoCard, TranscriptPanel, GameControls
- Orchestrates speech recognition + game state`,
    priority: PRIORITY.normal,
  },
  {
    title: "Create WinScreen component",
    description: `Create \`src/components/WinScreen.tsx\`:
- Confetti animation (canvas-confetti), BINGO announcement
- Winning line highlight, game stats, share + play again buttons`,
    priority: PRIORITY.normal,
  },

  // Phase 6: App Shell & Entry Point (Normal)
  {
    title: "Wire up App.tsx with screen routing",
    description: `Update \`src/App.tsx\`:
- Screen routing: landing → category → game → win
- Game state management at top level`,
    priority: PRIORITY.normal,
  },
  {
    title: "Set up main.tsx entry point",
    description: `Update \`src/main.tsx\`:
- Standard React 18 createRoot entry`,
    priority: PRIORITY.normal,
  },
  {
    title: "Configure index.html",
    description: `Update \`index.html\`:
- Title, favicon, meta tags`,
    priority: PRIORITY.normal,
  },

  // Phase 7: Styling & Polish (Low)
  {
    title: "Finalize CSS and color system",
    description: `Update \`src/index.css\`:
- Tailwind directives, custom base styles
- Color system per PRD section 6.6`,
    priority: PRIORITY.low,
  },
  {
    title: "Add favicon",
    description: `Add \`public/favicon.svg\``,
    priority: PRIORITY.low,
  },
];

const PHASE_LABELS = [
  { start: 0, end: 3, label: "Phase 1: Project Setup & Configuration" },
  { start: 3, end: 5, label: "Phase 2: Types & Data" },
  { start: 5, end: 9, label: "Phase 3: Core Logic Libraries" },
  { start: 9, end: 13, label: "Phase 4: React Hooks" },
  { start: 13, end: 25, label: "Phase 5: UI Components" },
  { start: 25, end: 28, label: "Phase 6: App Shell & Entry Point" },
  { start: 28, end: 30, label: "Phase 7: Styling & Polish" },
];

function getPhaseLabel(index: number): string {
  const phase = PHASE_LABELS.find((p) => index >= p.start && index < p.end);
  return phase?.label ?? "";
}

async function main() {
  // Create the project
  console.log("Creating project: Meeting Bingo...");
  const projectResult = await linear.createProject({
    name: "Meeting Bingo",
    description:
      "A bingo game that auto-detects meeting buzzwords via the Web Speech API. Built with React + TypeScript + Vite.",
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

  console.log(`\nDone! Created ${steps.length} issues in project "${project.name}".`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
