import { linear } from "../linear.js";

async function main() {
  // Check project
  const projects = await linear.projects({ filter: { name: { eq: "Meeting Bingo" } } });
  console.log(`Projects matching "Meeting Bingo": ${projects.nodes.length}`);
  for (const p of projects.nodes) {
    console.log(`\n  Name: ${p.name}`);
    console.log(`  ID: ${p.id}`);
    console.log(`  State: ${p.state}`);
    console.log(`  URL: ${p.url}`);
    const teams = await p.teams();
    console.log(`  Teams: ${teams.nodes.map((t) => t.key).join(", ")}`);

    // Check issues in this project
    const issues = await linear.issues({
      filter: { project: { id: { eq: p.id } } },
      first: 50,
    });
    console.log(`\n  Issues in project: ${issues.nodes.length}`);
    for (const issue of issues.nodes) {
      console.log(`    ${issue.identifier}: ${issue.title} (priority: ${issue.priority})`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
