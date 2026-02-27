'use client';

import type { Project } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SDGBadge from '@/components/dashboard/SDGBadge';
import { cn } from '@/lib/utils';

interface VotingCardProps {
  project: Project;
  voteCount: number;
  isSelected: boolean;
  onVote: () => void;
  disabled: boolean;
}

export default function VotingCard({
  project,
  voteCount,
  isSelected,
  onVote,
  disabled,
}: VotingCardProps) {
  return (
    <Card className="flex flex-col gap-4">
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

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
        <span className="text-sm text-text-secondary">
          {voteCount} {voteCount === 1 ? 'vote' : 'votes'}
        </span>
        <Button
          variant={isSelected ? 'secondary' : 'primary'}
          size="sm"
          onClick={onVote}
          disabled={disabled}
          className={cn(
            isSelected && 'border-green-500 text-green-600 bg-green-50 hover:bg-green-50'
          )}
        >
          {isSelected ? '\u2713 Voted' : 'Vote'}
        </Button>
      </div>
    </Card>
  );
}
