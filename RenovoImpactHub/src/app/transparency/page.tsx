'use client';

import { useState, useEffect } from 'react';
import { getFinancialBreakdowns } from '@/lib/supabase/client';
import type { FinancialBreakdown } from '@/types';
import { formatMonth } from '@/lib/utils/dates';
import { formatCurrency } from '@/lib/utils/currency';
import ProgressBar from '@/components/ui/ProgressBar';

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

export default function TransparencyPage() {
  const [breakdowns, setBreakdowns] = useState<FinancialBreakdown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getFinancialBreakdowns();
      setBreakdowns(data.sort((a, b) => b.month.localeCompare(a.month)));
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="bg-gradient-to-br from-secondary/10 to-primary/10 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-text-primary">Financial Transparency</h1>
          <p className="text-text-secondary mt-2">
            We believe in complete openness. Here&apos;s exactly where every dollar goes.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="space-y-10">
          {breakdowns.map((breakdown) => (
            <div key={breakdown.month} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-text-primary">
                  {formatMonth(breakdown.month)}
                </h2>
                <p className="text-lg font-medium text-text-primary">
                  {formatCurrency(breakdown.totalRevenue)}
                </p>
              </div>

              <div className="space-y-4">
                {breakdown.allocations.map((alloc) => (
                  <div key={alloc.category} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-text-primary">
                        {CATEGORY_LABELS[alloc.category]}
                      </span>
                      <span className="text-text-secondary">
                        {alloc.percent}% &middot; {formatCurrency(alloc.amount)}
                      </span>
                    </div>
                    <ProgressBar
                      value={alloc.percent}
                      color={CATEGORY_COLORS[alloc.category]}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
