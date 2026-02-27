'use client';

import Link from 'next/link';
import type { Project } from '@/types';
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

const SDG_GRADIENT: Record<number, string> = {
  7: 'from-[#FCC30B]/80 to-[#B8920A]',
  12: 'from-[#BF8B2E]/80 to-[#8A6420]',
  13: 'from-[#3F7E44]/80 to-[#2A5530]',
  14: 'from-[#0A97D9]/80 to-[#076B9A]',
  15: 'from-[#56C02B]/80 to-[#3D8A1F]',
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const primaryMetric = project.metrics[0];
  const primarySdg = project.sdgs[0];
  const gradient = SDG_GRADIENT[primarySdg] || 'from-primary/80 to-secondary';

  return (
    <Link href={`/projects/${project.id}`} className="block group">
      <div className="rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        {/* Image area */}
        <div className="relative h-44 overflow-hidden">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient}`} />
          )}
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {/* Title on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <p className="text-sm text-white/80 flex items-center gap-1 mt-1">
              <svg
                className="w-4 h-4 text-white/60"
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
          </div>
        </div>

        {/* Content area */}
        <div className="p-4 bg-white">
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
        </div>
      </div>
    </Link>
  );
}
