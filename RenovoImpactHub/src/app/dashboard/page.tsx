'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { getProjects, getFinancialBreakdowns } from '@/lib/supabase/client';
import type { Project, FinancialBreakdown } from '@/types';
import Badge from '@/components/ui/Badge';
import ImpactSummary from '@/components/dashboard/ImpactSummary';
import AllocationChart from '@/components/dashboard/AllocationChart';
import ProjectCard from '@/components/dashboard/ProjectCard';

const TIER_COLORS: Record<string, string> = {
  base: '#6B7280',
  premium: '#2D6A4F',
  vip: '#B8860B',
};

export default function DashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [breakdowns, setBreakdowns] = useState<FinancialBreakdown[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [p, b] = await Promise.all([getProjects(), getFinancialBreakdowns()]);
      setProjects(p);
      setBreakdowns(b);
      setLoading(false);
    }
    load();
  }, []);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Please log in to view your dashboard.</p>
      </div>
    );
  }

  const monthlyAmount = user.tier === 'vip' ? 100 : 20;
  const monthsSinceCreated = Math.max(
    1,
    Math.ceil(
      (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24 * 30),
    ),
  );
  const totalAllTime = monthlyAmount * monthsSinceCreated;

  const treesPlanted = projects.reduce((sum, p) => {
    return sum + p.metrics
      .filter((m) => m.label.toLowerCase().includes('tree'))
      .reduce((s, m) => s + m.value, 0);
  }, 0);

  const co2Offset = projects.reduce((sum, p) => {
    return sum + p.metrics
      .filter((m) => m.label.toLowerCase().includes('co2') || m.label.toLowerCase().includes('co\u2082'))
      .reduce((s, m) => s + m.value, 0);
  }, 0);

  const latestBreakdown = breakdowns[breakdowns.length - 1];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-text-primary">
          Welcome back, {user.name}!
        </h1>
        <Badge label={user.tier} color={TIER_COLORS[user.tier]} />
      </div>

      <ImpactSummary
        totalThisMonth={monthlyAmount}
        totalAllTime={totalAllTime}
        treesPlanted={treesPlanted}
        co2Offset={co2Offset}
      />

      {latestBreakdown && (
        <AllocationChart allocations={latestBreakdown.allocations} />
      )}

      <section>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Active Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <div className="flex gap-4">
        <Link
          href="/impact/2026-02"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-green-800 transition-colors"
        >
          View Impact Card
        </Link>
        <Link
          href="/vote"
          className="inline-block px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-green-50 transition-colors"
        >
          Vote Now
        </Link>
      </div>
    </div>
  );
}
