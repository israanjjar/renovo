'use client';

import type { ProjectMetric } from '@/types';
import SDGBadge from '@/components/dashboard/SDGBadge';
import { getSDGColor } from '@/lib/utils/sdg';

interface MetricDisplayProps {
  metric: ProjectMetric;
}

export default function MetricDisplay({ metric }: MetricDisplayProps) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 border-l-4"
      style={{ borderLeftColor: getSDGColor(metric.sdg) }}
    >
      <p className="text-3xl font-bold text-text-primary">
        {metric.value.toLocaleString()}
      </p>
      <p className="text-sm text-gray-500 mt-1">{metric.unit}</p>
      <div className="flex items-center gap-2 mt-2">
        <p className="text-sm font-medium text-text-primary">{metric.label}</p>
        <SDGBadge sdg={metric.sdg} size="sm" />
      </div>
    </div>
  );
}
