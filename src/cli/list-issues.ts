import { linear } from "../linear.js";

function parseArgs(argv: string[]) {
  const args = argv.slice(2);
  let teamKey: string | undefined;
  let status: string | undefined;
  let assignee: string | undefined;
  let limit = 25;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--status" && args[i + 1]) {
      status = args[++i];
    } else if (arg === "--assignee" && args[i + 1]) {
      assignee = args[++i];
    } else if (arg === "--limit" && args[i + 1]) {
      limit = parseInt(args[++i], 10);
    } else if (!arg.startsWith("--")) {
      teamKey = arg;
    }
  }

  if (!teamKey) {
    console.error("Usage: npm run issues -- <TEAM_KEY> [--status <status>] [--assignee <name>] [--limit <n>]");
    process.exit(1);
  }

  return { teamKey, status, assignee, limit };
}

async function main() {
  const { teamKey, status, assignee, limit } = parseArgs(process.argv);

  const teams = await linear.teams({ filter: { key: { eq: teamKey } } });
  const team = teams.nodes[0];
  if (!team) {
    console.error(`Team "${teamKey}" not found`);
    process.exit(1);
  }

  const filter: Record<string, unknown> = { team: { id: { eq: team.id } } };
  if (status) {
    filter.state = { name: { eqIgnoreCase: status } };
  }
  if (assignee) {
    filter.assignee = { displayName: { containsIgnoreCase: assignee } };
  }

  const issues = await linear.issues({ first: limit, filter });

  if (issues.nodes.length === 0) {
    console.log("No issues found.");
    return;
  }

  console.log(
    "ID".padEnd(12) +
    "Title".padEnd(50) +
    "Status".padEnd(18) +
    "Assignee".padEnd(20) +
    "Priority"
  );
  console.log("-".repeat(108));

  for (const issue of issues.nodes) {
    const state = await issue.state;
    const assignedTo = await issue.assignee;
    const priorityNames = ["No priority", "Urgent", "High", "Normal", "Low"];
    console.log(
      issue.identifier.padEnd(12) +
      issue.title.slice(0, 48).padEnd(50) +
      (state?.name ?? "—").padEnd(18) +
      (assignedTo?.displayName ?? "Unassigned").padEnd(20) +
      (priorityNames[issue.priority] ?? String(issue.priority))
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
