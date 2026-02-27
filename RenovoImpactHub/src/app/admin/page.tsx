'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { getProjects } from '@/lib/supabase/client';
import Card from '@/components/ui/Card';

export default function AdminPage() {
  const { user, isAdmin } = useAuth();
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    async function load() {
      const projects = await getProjects();
      setProjectCount(projects.length);
    }
    load();
  }, []);

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary">Access Denied</h1>
          <p className="text-text-secondary mt-2">You do not have admin privileges.</p>
          <Link href="/dashboard" className="text-primary hover:underline mt-4 inline-block">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <p className="text-sm text-text-secondary">Total Projects</p>
            <p className="text-3xl font-bold text-text-primary mt-1">{projectCount}</p>
          </Card>
          <Card>
            <p className="text-sm text-text-secondary">Active Voting Rounds</p>
            <p className="text-3xl font-bold text-text-primary mt-1">1</p>
          </Card>
          <Card>
            <p className="text-sm text-text-secondary">Total Subscribers</p>
            <p className="text-3xl font-bold text-text-primary mt-1">156</p>
          </Card>
        </div>

        <div className="mt-10 space-y-4">
          <Link
            href="/admin/projects"
            className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-text-primary">Manage Projects</h3>
            <p className="text-sm text-text-secondary">View, create, and edit projects</p>
          </Link>
          <Link
            href="/admin/metrics"
            className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-text-primary">Manage Metrics</h3>
            <p className="text-sm text-text-secondary">View and add project metrics</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
