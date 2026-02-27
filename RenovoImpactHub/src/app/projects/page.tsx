'use client';

import { useState, useEffect } from 'react';
import { getProjects } from '@/lib/supabase/client';
import type { Project } from '@/types';
import ProjectCard from '@/components/dashboard/ProjectCard';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const p = await getProjects();
      setProjects(p);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Loading projects...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-text-primary mb-2">Impact Projects</h1>
      <p className="text-gray-500 mb-8">
        Explore the projects your contributions are funding
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
