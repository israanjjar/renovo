'use client';

import Link from 'next/link';
import type { Project } from '@/types';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import SDGBadge from '@/components/dashboard/SDGBadge';

interface ProjectCardProps {
  project: Project;
}

const STATUS_COLORS: Record<string, string> = {
  active: '#2D6A4F',
  completed: '#6B7280',
  upcoming: '#0A97D9',
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const primaryMetric = project.metrics[0];

  return (
    <Link href={`/projects/${project.id}`} className="block">
      <Card className="hover:shadow-md transition-shadow">
        <h3 className="text-lg font-semibold text-text-primary mb-2">{project.title}</h3>
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
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
        </p>
        <div className="flex items-center gap-2 mb-3">
          <Badge label={project.status} color={STATUS_COLORS[project.status]} />
          <span className="text-sm text-gray-500">{project.allocationPercent}% allocation</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.sdgs.map((sdg) => (
            <SDGBadge key={sdg} sdg={sdg} size="sm" />
          ))}
        </div>
        {primaryMetric && (
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{primaryMetric.value.toLocaleString()}</span>{' '}
            {primaryMetric.unit} &mdash; {primaryMetric.label}
          </p>
        )}
      </Card>
    </Link>
  );
}
