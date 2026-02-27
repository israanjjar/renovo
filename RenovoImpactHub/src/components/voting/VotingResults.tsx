'use client';

import type { Project } from '@/types';
import { getSDGColor } from '@/lib/utils/sdg';
import { cn } from '@/lib/utils';

interface VotingResultsProps {
  results: { project: Project; votes: number }[];
  totalVotes: number;
  userVoteProjectId?: string;
}

function lightenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + amount);
  const b = Math.min(255, (num & 0x0000ff) + amount);
  return `rgb(${r}, ${g}, ${b})`;
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
        const sdgColor = getSDGColor(r.project.sdgs[0]);
        const lightColor = lightenColor(sdgColor, 60);

        return (
          <div key={r.project.id} className={cn('space-y-1 p-3 rounded-lg', isWinner && 'bg-accent-warm-light/30 ring-1 ring-accent-warm/40')}>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-text-primary">
                  {r.project.title}
                </span>
                {isWinner && (
                  <span className="bg-accent-warm text-secondary text-xs font-bold px-2 py-0.5 rounded-full">
                    Winner
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
                className="h-full rounded-full transition-all duration-700 bar-shine"
                style={{
                  width: `${barWidth}%`,
                  background: `linear-gradient(to right, ${sdgColor}, ${lightColor})`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
