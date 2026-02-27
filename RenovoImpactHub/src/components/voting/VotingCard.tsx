'use client';

import type { Project } from '@/types';
import Button from '@/components/ui/Button';
import SDGBadge from '@/components/dashboard/SDGBadge';
import { getSDGColor } from '@/lib/utils/sdg';
import { cn } from '@/lib/utils';

interface VotingCardProps {
  project: Project;
  voteCount: number;
  totalVotes: number;
  isSelected: boolean;
  onVote: () => void;
  disabled: boolean;
}

export default function VotingCard({
  project,
  voteCount,
  totalVotes,
  isSelected,
  onVote,
  disabled,
}: VotingCardProps) {
  const sdgColor = getSDGColor(project.sdgs[0]);
  const votePercent = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;

  return (
    <div className="rounded-xl shadow-sm border border-gray-100 bg-white p-6 flex flex-col gap-4 overflow-hidden border-t-4 transition-all duration-300" style={{ borderTopColor: sdgColor }}>
      <div>
        <h3 className="text-lg font-semibold text-text-primary">{project.title}</h3>
        <p className="text-sm text-text-secondary mt-1 line-clamp-2">
          {project.description}
        </p>
      </div>

      <p className="text-sm text-text-secondary">{project.location}</p>

      <div className="flex flex-wrap gap-2">
        {project.sdgs.map((sdg) => (
          <SDGBadge key={sdg} sdg={sdg} size="sm" />
        ))}
      </div>

      {/* Vote progress bar */}
      <div>
        <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
          <span>{voteCount} {voteCount === 1 ? 'vote' : 'votes'}</span>
          <span>{votePercent}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${votePercent}%`, backgroundColor: sdgColor }}
          />
        </div>
      </div>

      <div className="flex items-center justify-end mt-auto pt-4 border-t border-gray-100">
        <Button
          variant={isSelected ? 'secondary' : 'primary'}
          size="sm"
          onClick={onVote}
          disabled={disabled}
          className={cn(
            !isSelected && !disabled && 'hover:animate-pulse',
            isSelected && 'border-green-500 text-green-600 bg-green-50 hover:bg-green-50'
          )}
        >
          {isSelected ? '\u2713 Voted' : 'Vote'}
        </Button>
      </div>
    </div>
  );
}
