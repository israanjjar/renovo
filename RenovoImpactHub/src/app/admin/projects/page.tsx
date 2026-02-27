'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { getProjects } from '@/lib/supabase/client';
import type { Project } from '@/types';
import Button from '@/components/ui/Button';
import SDGBadge from '@/components/dashboard/SDGBadge';

export default function AdminProjectsPage() {
  const { user, isAdmin } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getProjects();
      setProjects(data);
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

  return (
    <div className="min-h-screen bg-bg-primary py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin" className="text-primary hover:underline text-sm">
              &larr; Back to Admin
            </Link>
            <h1 className="text-3xl font-bold text-text-primary mt-2">Projects</h1>
          </div>
          <Button onClick={() => alert('Project creation form coming soon')}>
            Add Project
          </Button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-4 py-3 text-sm font-medium text-text-secondary">Title</th>
                <th className="px-4 py-3 text-sm font-medium text-text-secondary">Status</th>
                <th className="px-4 py-3 text-sm font-medium text-text-secondary">Location</th>
                <th className="px-4 py-3 text-sm font-medium text-text-secondary">SDGs</th>
                <th className="px-4 py-3 text-sm font-medium text-text-secondary">Allocation</th>
                <th className="px-4 py-3 text-sm font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project, i) => (
                <tr
                  key={project.id}
                  className={i % 2 === 1 ? 'bg-gray-50' : ''}
                >
                  <td className="px-4 py-3 text-sm font-medium text-text-primary">
                    {project.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary capitalize">
                    {project.status}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {project.location}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {project.sdgs.map((sdg) => (
                        <SDGBadge key={sdg} sdg={sdg} size="sm" />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {project.allocationPercent}%
                  </td>
                  <td className="px-4 py-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => alert('Edit form coming soon')}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
