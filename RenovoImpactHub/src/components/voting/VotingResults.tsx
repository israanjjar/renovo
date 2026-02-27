'use client';

import type { Project } from '@/types';
import { cn } from '@/lib/utils';

interface VotingResultsProps {
  results: { project: Project; votes: number }[];
  totalVotes: number;
  userVoteProjectId?: string;
}

export default function VotingResults({
  results,
  totalVotes,
  userVoteProjectId,
}: VotingResultsProps) {
  const maxVotes = Math.max(...results.map((r) => r.votes), 1);
  const winnerId = results.reduce(
    (best, r) => (r.votes > best.votes ? r : best),
    results[0],
  )?.project.id;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary">Results</h3>
      {results.map((r) => {
        const barWidth = (r.votes / maxVotes) * 100;
        const isWinner = r.project.id === winnerId;
        const isUserVote = r.project.id === userVoteProjectId;
        const percentage = totalVotes > 0 ? Math.round((r.votes / totalVotes) * 100) : 0;

        return (
          <div key={r.project.id} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-text-primary">
                  {r.project.title}
                </span>
                {isWinner && (
                  <span className="text-yellow-500 font-semibold text-xs">
                    🏆 Winner!
                  </span>
                )}
                {isUserVote && (
                  <span className="text-xs text-primary font-medium">
                    You voted
                  </span>
                )}
              </div>
              <span className="text-text-secondary">
                {r.votes} votes ({percentage}%)
              </span>
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-500',
                  isWinner ? 'bg-primary' : 'bg-gray-400',
                )}
                style={{ width: `${barWidth}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
