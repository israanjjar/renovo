'use client';

import type { ImpactCard, SDGId } from '@/types';
import SDGBadge from '@/components/dashboard/SDGBadge';
import { formatMonth } from '@/lib/utils/dates';
import { formatCurrency } from '@/lib/utils/currency';

interface ImpactCardPreviewProps {
  card: ImpactCard;
  userName: string;
}

export default function ImpactCardPreview({ card, userName }: ImpactCardPreviewProps) {
  return (
    <div className="aspect-video rounded-xl overflow-hidden shadow-lg max-w-2xl mx-auto">
      <div className="w-full h-full bg-gradient-to-br from-bg-secondary to-primary p-8 flex flex-col justify-between text-white">
        <div>
          <p className="text-sm opacity-80 font-medium">
            {formatMonth(card.month)} Impact Report
          </p>
          <h2 className="text-3xl font-bold mt-2">{userName}</h2>
        </div>

        <div>
          <div className="flex items-center gap-6 flex-wrap">
            <div>
              <p className="text-sm opacity-80">Total Contributed</p>
              <p className="text-2xl font-bold">{formatCurrency(card.totalContributed)}</p>
            </div>
            {card.metrics.map((metric, i) => (
              <div key={i}>
                <p className="text-sm opacity-80">{metric.label}</p>
                <p className="text-xl font-semibold">
                  {metric.value} {metric.unit}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {card.sdgBadges.map((sdg: SDGId) => (
              <SDGBadge key={sdg} sdg={sdg} size="sm" />
            ))}
          </div>
          <p className="text-xs opacity-60">renovo.org — Community-Driven Impact</p>
        </div>
      </div>
    </div>
  );
}
