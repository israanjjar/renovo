'use client';

import ProgressBar from '@/components/ui/ProgressBar';
import { formatCurrency } from '@/lib/utils/currency';

interface AllocationChartProps {
  allocations: { category: string; percent: number; amount: number }[];
}

const CATEGORY_COLORS: Record<string, string> = {
  projects: '#2D6A4F',
  operations: '#6B7280',
  platform: '#52B788',
  team: '#95D5B2',
};

const CATEGORY_LABELS: Record<string, string> = {
  projects: 'Projects',
  operations: 'Operations',
  platform: 'Platform',
  team: 'Team',
};

export default function AllocationChart({ allocations }: AllocationChartProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-text-primary mb-4">Where Your Money Goes</h3>
      <div className="space-y-4">
        {allocations.map((alloc) => (
          <div key={alloc.category}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-text-primary">
                {CATEGORY_LABELS[alloc.category] ?? alloc.category}
              </span>
              <span className="text-sm text-gray-500">
                {alloc.percent}% &middot; {formatCurrency(alloc.amount)}
              </span>
            </div>
            <ProgressBar
              value={alloc.percent}
              color={CATEGORY_COLORS[alloc.category] ?? '#6B7280'}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
