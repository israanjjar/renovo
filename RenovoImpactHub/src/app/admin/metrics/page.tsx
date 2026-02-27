'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { getProjects } from '@/lib/supabase/client';
import type { Project } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import SDGBadge from '@/components/dashboard/SDGBadge';
import { formatDate } from '@/lib/utils/dates';

export default function AdminMetricsPage() {
  const { user, isAdmin } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getProjects();
      setProjects(data);
      if (data.length > 0) setSelectedProjectId(data[0].id);
      setLoading(false);
    }
    load();
  }, []);

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary">Access Denied</h1>
          <Link href="/dashboard" className="text-primary hover:underline mt-4 inline-block">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  return (
    <div className="min-h-screen bg-bg-primary py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/admin" className="text-primary hover:underline text-sm">
          &larr; Back to Admin
        </Link>
        <h1 className="text-3xl font-bold text-text-primary mt-2">Metrics</h1>

        <Card className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <label htmlFor="project-select" className="block text-sm font-medium text-text-secondary mb-1">
                Select Project
              </label>
              <select
                id="project-select"
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm text-text-primary bg-white"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
            <Button
              size="sm"
              onClick={() => alert('Metric form coming soon')}
            >
              Add Metric
            </Button>
          </div>

          {selectedProject && selectedProject.metrics.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-4 py-3 text-sm font-medium text-text-secondary">Label</th>
                    <th className="px-4 py-3 text-sm font-medium text-text-secondary">Value</th>
                    <th className="px-4 py-3 text-sm font-medium text-text-secondary">Unit</th>
                    <th className="px-4 py-3 text-sm font-medium text-text-secondary">SDG</th>
                    <th className="px-4 py-3 text-sm font-medium text-text-secondary">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProject.metrics.map((metric) => (
                    <tr key={metric.id} className="border-b border-gray-50">
                      <td className="px-4 py-3 text-sm font-medium text-text-primary">
                        {metric.label}
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        {metric.value}
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary">
                        {metric.unit}
                      </td>
                      <td className="px-4 py-3">
                        <SDGBadge sdg={metric.sdg} size="sm" />
                      </td>
                      <td className="px-4 py-3 text-sm text-text-secondary">
                        {formatDate(metric.recordedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-text-secondary text-sm">No metrics recorded for this project.</p>
          )}
        </Card>
      </div>
    </div>
  );
}
