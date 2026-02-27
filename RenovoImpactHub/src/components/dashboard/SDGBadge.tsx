'use client';

import type { SDGId } from '@/types';
import { getSDGColor, SDG_INFO } from '@/lib/utils/sdg';
import { cn } from '@/lib/utils';

interface SDGBadgeProps {
  sdg: SDGId;
  size?: 'sm' | 'md' | 'lg';
}

export default function SDGBadge({ sdg, size = 'md' }: SDGBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-sm px-2 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={cn('rounded-full font-medium text-white inline-block', sizeClasses[size])}
      style={{ backgroundColor: getSDGColor(sdg) }}
    >
      SDG {sdg}: {SDG_INFO[sdg].name}
    </span>
  );
}
