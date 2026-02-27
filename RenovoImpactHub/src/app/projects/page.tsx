'use client';

import { useState, useEffect } from 'react';
import { getProjects } from '@/lib/supabase/client';
import type { Project, SDGId } from '@/types';
import ProjectCard from '@/components/dashboard/ProjectCard';
import { SDG_INFO } from '@/lib/utils/sdg';

const allSdgs: SDGId[] = [7, 12, 13, 14, 15];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<SDGId | null>(null);

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

  const filtered = activeFilter
    ? projects.filter((p) => p.sdgs.includes(activeFilter))
    : projects;

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Gradient header */}
      <div className="bg-gradient-to-br from-secondary/10 to-primary/10 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Impact Projects</h1>
          <p className="text-gray-500">
            Explore the projects your contributions are funding
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* SDG Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveFilter(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeFilter === null
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
            }`}
          >
            All Projects
          </button>
          {allSdgs.map((sdg) => (
            <button
              key={sdg}
              onClick={() => setActiveFilter(activeFilter === sdg ? null : sdg)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === sdg
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-text-secondary hover:bg-gray-200'
              }`}
            >
              SDG {sdg}: {SDG_INFO[sdg].name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <div
              key={project.id}
              className={`animate-fade-in-up ${i === 1 ? 'animation-delay-100' : i === 2 ? 'animation-delay-200' : ''}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-text-secondary py-12">
            No projects match this filter.
          </p>
        )}
      </div>
    </div>
  );
}
