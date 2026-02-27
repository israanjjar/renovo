'use client';

import type { SDGId } from '@/types';
import { getSDGColor, SDG_INFO } from '@/lib/utils/sdg';
import { cn } from '@/lib/utils';

interface SDGBadgeProps {
  sdg: SDGId;
  size?: 'sm' | 'md' | 'lg';
}

export default function SDGBadge({ sdg, size = 'md' }: SDGBadgeProps) {
  const color = getSDGColor(sdg);
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={cn('rounded-full font-medium inline-flex items-center gap-1', sizeClasses[size])}
      style={{
        backgroundColor: `${color}15`,
        color: color,
        border: `1px solid ${color}30`,
      }}
    >
      <span className="font-bold">{sdg}</span>
      {SDG_INFO[sdg].name}
    </span>
  );
}
