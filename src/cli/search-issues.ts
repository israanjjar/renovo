import { linear } from "../linear.js";

function parseArgs(argv: string[]) {
  const args = argv.slice(2);
  let query: string | undefined;
  let team: string | undefined;
  let limit = 25;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--team" && args[i + 1]) team = args[++i];
    else if (arg === "--limit" && args[i + 1]) limit = parseInt(args[++i], 10);
    else if (!arg.startsWith("--")) query = arg;
  }

  if (!query) {
    console.error("Usage: npm run issue:search -- <query> [--team <TEAM_KEY>] [--limit <n>]");
    process.exit(1);
  }

  return { query, team, limit };
}

async function main() {
  const { query, team, limit } = parseArgs(process.argv);

  const filter: Record<string, unknown> = {};
  if (team) {
    const teams = await linear.teams({ filter: { key: { eq: team } } });
    const t = teams.nodes[0];
    if (!t) {
      console.error(`Team "${team}" not found`);
      process.exit(1);
    }
    filter.team = { id: { eq: t.id } };
  }

  const results = await linear.searchIssues(query, { first: limit, filter });

  if (results.nodes.length === 0) {
    console.log("No issues found.");
    return;
  }

  console.log(
    "ID".padEnd(12) +
    "Title".padEnd(50) +
    "Status".padEnd(18) +
    "Assignee"
  );
  console.log("-".repeat(90));

  for (const issue of results.nodes) {
    const state = await issue.state;
    const assignee = await issue.assignee;
    console.log(
      issue.identifier.padEnd(12) +
      issue.title.slice(0, 48).padEnd(50) +
      (state?.name ?? "—").padEnd(18) +
      (assignee?.displayName ?? "Unassigned")
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
