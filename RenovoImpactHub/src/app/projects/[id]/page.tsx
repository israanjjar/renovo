'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProjectById } from '@/lib/supabase/client';
import type { Project } from '@/types';
import ProjectDetail from '@/components/projects/ProjectDetail';

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const p = await getProjectById(params.id);
      setProject(p ?? null);
      setLoading(false);
    }
    load();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-xl font-semibold text-text-primary mb-4">Project not found</h1>
        <Link href="/projects" className="text-primary hover:underline">
          &larr; Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/projects" className="text-primary hover:underline text-sm mb-6 inline-block">
        &larr; Back to Projects
      </Link>
      <ProjectDetail project={project} />
    </div>
  );
}
