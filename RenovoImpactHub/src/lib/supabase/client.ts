import type { User, Project, Vote, VotingRound, FinancialBreakdown, ImpactCard, SDGId } from '@/types';
import {
  mockUser,
  mockProjects,
  mockVotingRound,
  mockVotes,
  mockFinancialBreakdowns,
  mockImpactCard,
} from '@/lib/mock/data';

let votes: Vote[] = [...mockVotes];

export async function getUser(): Promise<User> {
  return mockUser;
}

export async function getProjects(): Promise<Project[]> {
  return mockProjects;
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return mockProjects.find((p) => p.id === id);
}

export async function getVotingRound(): Promise<VotingRound> {
  return mockVotingRound;
}

export async function getVotes(roundId: string): Promise<Vote[]> {
  return votes.filter((v) => v.votingRoundId === roundId);
}

export async function castVote(
  userId: string,
  roundId: string,
  projectId: string,
): Promise<Vote> {
  const newVote: Vote = {
    id: `vote-${Date.now()}`,
    userId,
    votingRoundId: roundId,
    projectId,
    castAt: new Date(),
  };
  votes.push(newVote);
  return newVote;
}

export async function getFinancialBreakdowns(): Promise<FinancialBreakdown[]> {
  return mockFinancialBreakdowns;
}

export async function getImpactCard(
  userId: string,
  month: string,
): Promise<ImpactCard | undefined> {
  if (mockImpactCard.userId === userId && mockImpactCard.month === month) {
    return mockImpactCard;
  }
  return undefined;
}

export async function updateUserSdgFocus(
  userId: string,
  sdgs: SDGId[],
): Promise<User> {
  if (mockUser.id === userId) {
    mockUser.sdgFocus = sdgs;
  }
  return mockUser;
}
