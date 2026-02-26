import type { Category } from '../types';

export const categories: Category[] = [
  {
    id: 'agile',
    name: 'Agile & Scrum',
    icon: '🏃',
    description: 'Sprint planning, standups, and all things agile',
    words: [
      'sprint', 'backlog', 'standup', 'retrospective', 'velocity',
      'blocker', 'story points', 'epic', 'user story', 'scrum master',
      'product owner', 'kanban', 'burndown', 'refinement', 'iteration',
      'acceptance criteria', 'definition of done', 'capacity', 'throughput',
      'cycle time', 'lead time', 'WIP limit', 'swimlane', 'ceremony',
      'timeboxed', 'increment', 'artifact', 'transparency', 'inspection',
      'adaptation', 'self-organizing', 'cross-functional', 'servant leader',
      'impediment', 'spike', 'technical debt', 'refactor', 'MVP',
      'release', 'deployment', 'continuous integration', 'CI/CD',
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate Speak',
    icon: '💼',
    description: 'Synergy, leverage, and corporate buzzwords galore',
    words: [
      'synergy', 'leverage', 'circle back', 'take offline', 'bandwidth',
      'low-hanging fruit', 'move the needle', 'deep dive', 'touch base',
      'action item', 'deliverable', 'stakeholder', 'alignment', 'visibility',
      'paradigm shift', 'best practice', 'value proposition', 'ROI',
      'bottom line', 'top of mind', 'streamline', 'optimize', 'scalable',
      'proactive', 'holistic', 'robust', 'ecosystem', 'pivot',
      'disruption', 'innovation', 'thought leader', 'core competency',
      'mission critical', 'game changer', 'win-win', 'net-net',
      'helicopter view', 'granular', 'drill down', 'peel back the onion',
      'boil the ocean', 'bleeding edge', 'north star',
    ],
  },
  {
    id: 'tech',
    name: 'Tech & Engineering',
    icon: '💻',
    description: 'APIs, cloud, DevOps, and engineering jargon',
    words: [
      'API', 'cloud', 'microservices', 'serverless', 'containerized',
      'kubernetes', 'docker', 'CI/CD', 'pipeline', 'deployment',
      'scalability', 'latency', 'throughput', 'database', 'schema',
      'migration', 'refactor', 'technical debt', 'architecture',
      'infrastructure', 'DevOps', 'observability', 'monitoring', 'alerting',
      'incident', 'postmortem', 'SLA', 'uptime', 'performance',
      'optimization', 'caching', 'load balancing', 'security',
      'authentication', 'authorization', 'encryption', 'compliance',
      'audit', 'code review', 'pull request', 'merge', 'branch',
      'release', 'rollback', 'feature flag',
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
