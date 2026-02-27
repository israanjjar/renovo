'use client';

import type { ProjectUpdate } from '@/types';
import { formatDate } from '@/lib/utils/dates';

interface UpdateTimelineProps {
  updates: ProjectUpdate[];
}

export default function UpdateTimeline({ updates }: UpdateTimelineProps) {
  const sorted = [...updates].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <div className="relative">
      <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" />
      <div className="space-y-6">
        {sorted.map((update) => (
          <div key={update.id} className="relative pl-8">
            <div className="absolute left-1.5 top-1.5 w-3 h-3 rounded-full bg-primary border-2 border-white" />
            <p className="text-xs text-gray-400 mb-1">
              {formatDate(new Date(update.publishedAt))}
            </p>
            <h4 className="text-sm font-bold text-text-primary">{update.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{update.body}</p>
            {update.imageUrls.length > 0 && (
              <div className="flex gap-2 mt-2">
                {update.imageUrls.map((url, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center"
                  >
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
