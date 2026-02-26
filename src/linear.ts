import { LinearClient } from "@linear/sdk";

const apiKey = process.env.LINEAR_API_KEY;
if (!apiKey) {
  console.error("LINEAR_API_KEY is not set");
  process.exit(1);
}

export const linear = new LinearClient({ apiKey });
