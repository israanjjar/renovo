export type SDGId = 7 | 12 | 13 | 14 | 15;

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  tier: 'base' | 'premium' | 'vip';
  sdgFocus: SDGId[];
  createdAt: Date;
  stripeCustomerId?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  sdgs: SDGId[];
  status: 'active' | 'completed' | 'upcoming';
  startDate: Date;
  endDate?: Date;
  metrics: ProjectMetric[];
  updates: ProjectUpdate[];
  allocationPercent: number;
}

export interface ProjectMetric {
  id: string;
  projectId: string;
  label: string;
  value: number;
  unit: string;
  sdg: SDGId;
  recordedAt: Date;
}

export interface ProjectUpdate {
  id: string;
  projectId: string;
  title: string;
  body: string;
  imageUrls: string[];
  publishedAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: 'base' | 'premium' | 'vip';
  status: 'active' | 'cancelled' | 'past_due';
  stripeSubscriptionId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  createdAt: Date;
}

export interface Vote {
  id: string;
  userId: string;
  votingRoundId: string;
  projectId: string;
  castAt: Date;
}

export interface VotingRound {
  id: string;
  month: string;
  candidateProjectIds: string[];
  winnerProjectId?: string;
  opensAt: Date;
  closesAt: Date;
  status: 'upcoming' | 'open' | 'closed';
}

export interface ImpactCard {
  id: string;
  userId: string;
  month: string;
  totalContributed: number;
  metrics: { label: string; value: number; unit: string }[];
  sdgBadges: SDGId[];
  imageUrl?: string;
  generatedAt: Date;
}

export interface FinancialBreakdown {
  month: string;
  totalRevenue: number;
  allocations: {
    category: 'projects' | 'operations' | 'platform' | 'team';
    amount: number;
    percent: number;
  }[];
}
