import { LinearClient } from "@linear/sdk";
import { linear } from "../linear.js";

type IssueCreateInput = Parameters<LinearClient["createIssue"]>[0];

function parseArgs(argv: string[]) {
  const args = argv.slice(2);
  let team: string | undefined;
  let title: string | undefined;
  let description: string | undefined;
  let priority: string | undefined;
  let assignee: string | undefined;
  let label: string | undefined;
  let status: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--team" && args[i + 1]) team = args[++i];
    else if (arg === "--title" && args[i + 1]) title = args[++i];
    else if (arg === "--description" && args[i + 1]) description = args[++i];
    else if (arg === "--priority" && args[i + 1]) priority = args[++i];
    else if (arg === "--assignee" && args[i + 1]) assignee = args[++i];
    else if (arg === "--label" && args[i + 1]) label = args[++i];
    else if (arg === "--status" && args[i + 1]) status = args[++i];
  }

  if (!team || !title) {
    console.error("Usage: npm run issue:create -- --team <TEAM_KEY> --title <title> [--description <desc>] [--priority urgent|high|normal|low] [--assignee <name>] [--label <label>] [--status <status>]");
    process.exit(1);
  }

  return { team, title, description, priority, assignee, label, status };
}

const PRIORITY_MAP: Record<string, number> = {
  urgent: 1,
  high: 2,
  normal: 3,
  low: 4,
};

async function main() {
  const opts = parseArgs(process.argv);

  const teams = await linear.teams({ filter: { key: { eq: opts.team } } });
  const team = teams.nodes[0];
  if (!team) {
    console.error(`Team "${opts.team}" not found`);
    process.exit(1);
  }

  const input: IssueCreateInput = {
    teamId: team.id,
    title: opts.title,
  };

  if (opts.description) input.description = opts.description;

  if (opts.priority) {
    const p = PRIORITY_MAP[opts.priority.toLowerCase()];
    if (p === undefined) {
      console.error(`Invalid priority "${opts.priority}". Use: urgent, high, normal, low`);
      process.exit(1);
    }
    input.priority = p;
  }

  if (opts.assignee) {
    const users = await linear.users({ filter: { displayName: { containsIgnoreCase: opts.assignee } } });
    const user = users.nodes[0];
    if (!user) {
      console.error(`User "${opts.assignee}" not found`);
      process.exit(1);
    }
    input.assigneeId = user.id;
  }

  if (opts.label) {
    const labels = await linear.issueLabels({ filter: { name: { eqIgnoreCase: opts.label } } });
    const lbl = labels.nodes[0];
    if (!lbl) {
      console.error(`Label "${opts.label}" not found`);
      process.exit(1);
    }
    input.labelIds = [lbl.id];
  }

  if (opts.status) {
    const states = await linear.workflowStates({
      filter: { name: { eqIgnoreCase: opts.status }, team: { id: { eq: team.id } } },
    });
    const state = states.nodes[0];
    if (!state) {
      console.error(`Status "${opts.status}" not found for team "${opts.team}"`);
      process.exit(1);
    }
    input.stateId = state.id;
  }

  const result = await linear.createIssue(input);
  const issue = await result.issue;

  if (!issue) {
    console.error("Failed to create issue");
    process.exit(1);
  }

  console.log(`Created ${issue.identifier}: ${issue.title}`);
  console.log(`URL: ${issue.url}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
