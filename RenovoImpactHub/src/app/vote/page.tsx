'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import {
  getVotingRound,
  getVotes,
  getProjects,
  castVote,
} from '@/lib/supabase/client';
import type { Project, Vote, VotingRound } from '@/types';
import VotingCard from '@/components/voting/VotingCard';
import VotingResults from '@/components/voting/VotingResults';
import { formatMonth } from '@/lib/utils/dates';

export default function VotePage() {
  const { user } = useAuth();
  const [votingRound, setVotingRound] = useState<VotingRound | null>(null);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [userVoteProjectId, setUserVoteProjectId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [round, allProjects] = await Promise.all([
        getVotingRound(),
        getProjects(),
      ]);
      setVotingRound(round);
      setProjects(allProjects);

      const roundVotes = await getVotes(round.id);
      setVotes(roundVotes);

      if (user) {
        const existing = roundVotes.find((v) => v.userId === user.id);
        if (existing) setUserVoteProjectId(existing.projectId);
      }
      setLoading(false);
    }
    load();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  if (!votingRound) return null;

  const candidateProjects = projects.filter((p) =>
    votingRound.candidateProjectIds.includes(p.id),
  );

  function getVoteCount(projectId: string) {
    return votes.filter((v) => v.projectId === projectId).length;
  }

  const totalVotes = votes.length;

  async function handleVote(projectId: string) {
    if (!user || userVoteProjectId) return;
    const newVote = await castVote(user.id, votingRound!.id, projectId);
    setVotes((prev) => [...prev, newVote]);
    setUserVoteProjectId(projectId);
  }

  const results = candidateProjects
    .map((p) => ({ project: p, votes: getVoteCount(p.id) }))
    .sort((a, b) => b.votes - a.votes);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Gradient header */}
      <div className="bg-gradient-to-br from-secondary/10 to-primary/10 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-text-primary">Community Vote</h1>
          <p className="text-text-secondary mt-1">
            {formatMonth(votingRound.month)} — Choose which project we fund next month
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {votingRound.status === 'open' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidateProjects.map((project, i) => (
                <div key={project.id} className={`animate-fade-in-up ${i === 1 ? 'animation-delay-100' : i === 2 ? 'animation-delay-200' : ''}`}>
                  <VotingCard
                    project={project}
                    voteCount={getVoteCount(project.id)}
                    totalVotes={totalVotes}
                    isSelected={userVoteProjectId === project.id}
                    onVote={() => handleVote(project.id)}
                    disabled={!!userVoteProjectId}
                  />
                </div>
              ))}
            </div>

            {userVoteProjectId && (
              <div className="mt-12">
                <VotingResults
                  results={results}
                  totalVotes={totalVotes}
                  userVoteProjectId={userVoteProjectId}
                />
              </div>
            )}
          </>
        )}

        {votingRound.status === 'closed' && (
          <div className="mt-8">
            <VotingResults
              results={results}
              totalVotes={totalVotes}
              userVoteProjectId={userVoteProjectId}
            />
          </div>
        )}
      </div>
    </div>
  );
}
