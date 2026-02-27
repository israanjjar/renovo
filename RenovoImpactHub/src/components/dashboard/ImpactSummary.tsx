'use client';

import Card from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils/currency';

interface ImpactSummaryProps {
  totalThisMonth: number;
  totalAllTime: number;
  treesPlanted: number;
  co2Offset: number;
}

export default function ImpactSummary({
  totalThisMonth,
  totalAllTime,
  treesPlanted,
  co2Offset,
}: ImpactSummaryProps) {
  const stats = [
    { value: formatCurrency(totalThisMonth), label: 'Contributed This Month' },
    { value: formatCurrency(totalAllTime), label: 'Total All-Time Impact' },
    { value: treesPlanted.toLocaleString(), label: 'Trees Planted' },
    { value: `${co2Offset.toLocaleString()} t`, label: 'CO\u2082 Offset' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <Card key={stat.label} className={`animate-fade-in-up ${i === 1 ? 'animation-delay-100' : i === 2 ? 'animation-delay-200' : i === 3 ? 'animation-delay-300' : ''}`}>
          <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
          <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
        </Card>
      ))}
    </div>
  );
}
