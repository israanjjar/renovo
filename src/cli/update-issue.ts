import { linear } from "../linear.js";

function parseArgs(argv: string[]) {
  const args = argv.slice(2);
  let identifier: string | undefined;
  let title: string | undefined;
  let description: string | undefined;
  let priority: string | undefined;
  let assignee: string | undefined;
  let status: string | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--title" && args[i + 1]) title = args[++i];
    else if (arg === "--description" && args[i + 1]) description = args[++i];
    else if (arg === "--priority" && args[i + 1]) priority = args[++i];
    else if (arg === "--assignee" && args[i + 1]) assignee = args[++i];
    else if (arg === "--status" && args[i + 1]) status = args[++i];
    else if (!arg.startsWith("--")) identifier = arg;
  }

  if (!identifier) {
    console.error("Usage: npm run issue:update -- <ISSUE_ID> [--title <title>] [--description <desc>] [--priority urgent|high|normal|low] [--assignee <name>] [--status <status>]");
    process.exit(1);
  }

  return { identifier, title, description, priority, assignee, status };
}

const PRIORITY_MAP: Record<string, number> = {
  urgent: 1,
  high: 2,
  normal: 3,
  low: 4,
};

async function main() {
  const opts = parseArgs(process.argv);

  let issue;
  if (opts.identifier.includes("-")) {
    const [teamKey, numStr] = opts.identifier.split("-");
    const num = parseInt(numStr, 10);
    const teams = await linear.teams({ filter: { key: { eq: teamKey } } });
    const team = teams.nodes[0];
    if (!team) {
      console.error(`Team "${teamKey}" not found`);
      process.exit(1);
    }
    const issues = await linear.issues({ filter: { team: { id: { eq: team.id } }, number: { eq: num } } });
    issue = issues.nodes[0];
  } else {
    issue = await linear.issue(opts.identifier);
  }
  if (!issue) {
    console.error(`Issue "${opts.identifier}" not found`);
    process.exit(1);
  }

  const update: Record<string, unknown> = {};

  if (opts.title) update.title = opts.title;
  if (opts.description) update.description = opts.description;

  if (opts.priority) {
    const p = PRIORITY_MAP[opts.priority.toLowerCase()];
    if (p === undefined) {
      console.error(`Invalid priority "${opts.priority}". Use: urgent, high, normal, low`);
      process.exit(1);
    }
    update.priority = p;
  }

  if (opts.assignee) {
    const users = await linear.users({ filter: { displayName: { containsIgnoreCase: opts.assignee } } });
    const user = users.nodes[0];
    if (!user) {
      console.error(`User "${opts.assignee}" not found`);
      process.exit(1);
    }
    update.assigneeId = user.id;
  }

  if (opts.status) {
    const team = await issue.team;
    if (!team) {
      console.error("Could not resolve issue team");
      process.exit(1);
    }
    const states = await linear.workflowStates({
      filter: { name: { eqIgnoreCase: opts.status }, team: { id: { eq: team.id } } },
    });
    const state = states.nodes[0];
    if (!state) {
      console.error(`Status "${opts.status}" not found`);
      process.exit(1);
    }
    update.stateId = state.id;
  }

  if (Object.keys(update).length === 0) {
    console.error("No updates specified");
    process.exit(1);
  }

  await linear.updateIssue(issue.id, update);

  const updated = await linear.issue(issue.id);
  console.log(`Updated ${updated.identifier}: ${updated.title}`);
  console.log(`URL: ${updated.url}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
