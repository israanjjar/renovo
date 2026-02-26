import { linear } from "../linear.js";

async function main() {
  const identifier = process.argv[2];
  if (!identifier) {
    console.error("Usage: npm run issue -- <ISSUE_ID>");
    process.exit(1);
  }

  let issue;
  if (identifier.includes("-")) {
    const [teamKey, numStr] = identifier.split("-");
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
    issue = await linear.issue(identifier);
  }

  if (!issue) {
    console.error(`Issue "${identifier}" not found`);
    process.exit(1);
  }

  const state = await issue.state;
  const assignee = await issue.assignee;
  const labels = await issue.labels();
  const team = await issue.team;

  console.log(`${issue.identifier}: ${issue.title}`);
  console.log("=".repeat(60));
  console.log(`Team:        ${team?.name ?? "—"}`);
  console.log(`Status:      ${state?.name ?? "—"}`);
  console.log(`Priority:    ${["No priority", "Urgent", "High", "Normal", "Low"][issue.priority] ?? issue.priority}`);
  console.log(`Assignee:    ${assignee?.displayName ?? "Unassigned"}`);
  console.log(`Labels:      ${labels.nodes.map((l) => l.name).join(", ") || "—"}`);
  console.log(`Created:     ${issue.createdAt.toISOString()}`);
  console.log(`Updated:     ${issue.updatedAt.toISOString()}`);
  console.log(`URL:         ${issue.url}`);

  if (issue.description) {
    console.log(`\nDescription:\n${issue.description}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
