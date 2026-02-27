'use client';

import type { Project } from '@/types';
import Badge from '@/components/ui/Badge';
import SDGBadge from '@/components/dashboard/SDGBadge';
import MetricDisplay from '@/components/projects/MetricDisplay';
import UpdateTimeline from '@/components/projects/UpdateTimeline';
import { formatDate } from '@/lib/utils/dates';

interface ProjectDetailProps {
  project: Project;
}

const STATUS_COLORS: Record<string, string> = {
  active: '#2D6A4F',
  completed: '#6B7280',
  upcoming: '#0A97D9',
};

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">{project.title}</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            {project.location}
          </span>
          <Badge label={project.status} color={STATUS_COLORS[project.status]} />
          <span>
            {formatDate(new Date(project.startDate))}
            {project.endDate ? ` \u2013 ${formatDate(new Date(project.endDate))}` : ' \u2013 Ongoing'}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.sdgs.map((sdg) => (
          <SDGBadge key={sdg} sdg={sdg} size="md" />
        ))}
      </div>

      <p className="text-gray-700 leading-relaxed">{project.description}</p>

      <p className="text-sm text-gray-500">
        <span className="font-semibold text-text-primary">{project.allocationPercent}%</span> of
        subscriptions fund this project
      </p>

      {project.metrics.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">Impact Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.metrics.map((metric) => (
              <MetricDisplay key={metric.id} metric={metric} />
            ))}
          </div>
        </section>
      )}

      {project.updates.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">Updates</h2>
          <UpdateTimeline updates={project.updates} />
        </section>
      )}
    </div>
  );
}
