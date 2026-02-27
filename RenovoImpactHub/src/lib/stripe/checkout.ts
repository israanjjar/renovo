export async function createCheckoutSession(tier: string): Promise<{ url: string }> {
  // Mock: return a fake redirect URL
  return { url: `/onboarding?payment=success&tier=${tier}` };
}
