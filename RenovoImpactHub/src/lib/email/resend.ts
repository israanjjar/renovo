export async function sendWelcomeEmail(email: string, name: string) {
  console.log(`[Mock Email] Welcome email sent to ${email} for ${name}`);
  return { success: true };
}

export async function sendMonthlyDigest(userId: string) {
  console.log(`[Mock Email] Monthly digest sent to user ${userId}`);
  return { success: true };
}

export async function sendVotingOpen(userId: string) {
  console.log(`[Mock Email] Voting open notification sent to user ${userId}`);
  return { success: true };
}
