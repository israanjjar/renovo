import type {
  User,
  Project,
  Subscription,
  VotingRound,
  Vote,
  FinancialBreakdown,
  ImpactCard,
} from '@/types';

export const mockUser: User = {
  id: 'user-1',
  email: 'alex@example.com',
  name: 'Alex Rivera',
  avatarUrl: undefined,
  tier: 'premium',
  sdgFocus: [13, 15],
  createdAt: new Date('2025-09-15T10:00:00Z'),
  stripeCustomerId: 'cus_mock_abc123',
};

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'BC Reforestation Initiative',
    description:
      'Restoring old-growth forests in British Columbia through strategic replanting and ecosystem rehabilitation. Working with Indigenous communities and local conservation groups to ensure long-term sustainability and biodiversity recovery.',
    location: 'British Columbia, Canada',
    sdgs: [13, 15],
    status: 'active',
    startDate: new Date('2025-06-01T00:00:00Z'),
    endDate: undefined,
    allocationPercent: 40,
    metrics: [
      {
        id: 'metric-1',
        projectId: 'proj-1',
        label: 'Trees Planted',
        value: 2450,
        unit: 'trees',
        sdg: 15,
        recordedAt: new Date('2026-02-20T12:00:00Z'),
      },
      {
        id: 'metric-2',
        projectId: 'proj-1',
        label: 'Hectares Restored',
        value: 12,
        unit: 'hectares',
        sdg: 15,
        recordedAt: new Date('2026-02-20T12:00:00Z'),
      },
      {
        id: 'metric-3',
        projectId: 'proj-1',
        label: 'CO2 Offset',
        value: 156,
        unit: 'tonnes',
        sdg: 13,
        recordedAt: new Date('2026-02-20T12:00:00Z'),
      },
    ],
    updates: [
      {
        id: 'update-1',
        projectId: 'proj-1',
        title: 'Winter planting season complete',
        body: 'We wrapped up the winter planting season with over 800 new saplings in the ground across three restoration sites. Survival rates from last season are exceeding expectations at 94%.',
        imageUrls: [],
        publishedAt: new Date('2026-02-15T09:00:00Z'),
      },
      {
        id: 'update-2',
        projectId: 'proj-1',
        title: 'Partnership with Squamish Nation announced',
        body: 'We are thrilled to announce a new partnership with the Squamish Nation to co-manage a 200-hectare restoration zone. This collaboration brings traditional ecological knowledge to our reforestation efforts.',
        imageUrls: [],
        publishedAt: new Date('2026-01-20T14:00:00Z'),
      },
    ],
  },
  {
    id: 'proj-2',
    title: 'Coastal Restoration Project',
    description:
      'Rehabilitating degraded coastal ecosystems along the Pacific coast. Focused on mangrove restoration, marine habitat recovery, and community-based conservation to protect biodiversity and buffer against storm surges.',
    location: 'Vancouver Island, Canada',
    sdgs: [14, 13],
    status: 'active',
    startDate: new Date('2025-08-15T00:00:00Z'),
    endDate: undefined,
    allocationPercent: 35,
    metrics: [
      {
        id: 'metric-4',
        projectId: 'proj-2',
        label: 'Coastline Restored',
        value: 3.2,
        unit: 'km',
        sdg: 14,
        recordedAt: new Date('2026-02-18T12:00:00Z'),
      },
      {
        id: 'metric-5',
        projectId: 'proj-2',
        label: 'Marine Species Protected',
        value: 8,
        unit: 'species',
        sdg: 14,
        recordedAt: new Date('2026-02-18T12:00:00Z'),
      },
    ],
    updates: [
      {
        id: 'update-3',
        projectId: 'proj-2',
        title: 'Eelgrass beds expanding ahead of schedule',
        body: 'Our eelgrass transplantation efforts are showing remarkable results. The beds have expanded by 40% since initial planting, creating vital habitat for juvenile salmon and herring.',
        imageUrls: [],
        publishedAt: new Date('2026-02-10T11:00:00Z'),
      },
      {
        id: 'update-4',
        projectId: 'proj-2',
        title: 'Volunteer dive cleanup event',
        body: 'Over 50 volunteers joined our underwater cleanup event, removing 320 kg of debris from the restoration zone. The cleared areas are already showing signs of marine life returning.',
        imageUrls: [],
        publishedAt: new Date('2026-01-28T16:00:00Z'),
      },
    ],
  },
  {
    id: 'proj-3',
    title: 'Clean Energy Initiative',
    description:
      'Deploying community-scale solar energy systems in underserved communities across Northern BC. Reducing dependence on diesel generators while creating local green jobs and lowering energy costs for residents.',
    location: 'Northern British Columbia, Canada',
    sdgs: [7, 12],
    status: 'upcoming',
    startDate: new Date('2026-04-01T00:00:00Z'),
    endDate: undefined,
    allocationPercent: 25,
    metrics: [
      {
        id: 'metric-6',
        projectId: 'proj-3',
        label: 'Solar Panels Installed',
        value: 48,
        unit: 'panels',
        sdg: 7,
        recordedAt: new Date('2026-02-01T12:00:00Z'),
      },
      {
        id: 'metric-7',
        projectId: 'proj-3',
        label: 'Energy Generated',
        value: 12400,
        unit: 'kWh',
        sdg: 7,
        recordedAt: new Date('2026-02-01T12:00:00Z'),
      },
    ],
    updates: [
      {
        id: 'update-5',
        projectId: 'proj-3',
        title: 'Site assessments underway',
        body: 'Our engineering team has completed site assessments for the first three communities. Panel installation is on track for a spring launch, with local crews being trained this month.',
        imageUrls: [],
        publishedAt: new Date('2026-02-05T10:00:00Z'),
      },
    ],
  },
];

export const mockSubscription: Subscription = {
  id: 'sub-1',
  userId: 'user-1',
  tier: 'premium',
  status: 'active',
  stripeSubscriptionId: 'sub_mock_xyz789',
  currentPeriodStart: new Date('2026-02-01T00:00:00Z'),
  currentPeriodEnd: new Date('2026-03-01T00:00:00Z'),
  createdAt: new Date('2025-09-15T10:05:00Z'),
};

export const mockVotingRound: VotingRound = {
  id: 'round-2026-03',
  month: '2026-03',
  candidateProjectIds: ['proj-1', 'proj-2', 'proj-3'],
  winnerProjectId: undefined,
  opensAt: new Date('2026-03-01T00:00:00Z'),
  closesAt: new Date('2026-03-07T23:59:59Z'),
  status: 'open',
};

export const mockVotes: Vote[] = [
  // 5 votes for proj-1
  { id: 'vote-1', userId: 'user-1', votingRoundId: 'round-2026-03', projectId: 'proj-1', castAt: new Date('2026-03-01T08:30:00Z') },
  { id: 'vote-2', userId: 'user-2', votingRoundId: 'round-2026-03', projectId: 'proj-1', castAt: new Date('2026-03-01T09:15:00Z') },
  { id: 'vote-3', userId: 'user-3', votingRoundId: 'round-2026-03', projectId: 'proj-1', castAt: new Date('2026-03-01T10:00:00Z') },
  { id: 'vote-4', userId: 'user-4', votingRoundId: 'round-2026-03', projectId: 'proj-1', castAt: new Date('2026-03-02T07:45:00Z') },
  { id: 'vote-5', userId: 'user-5', votingRoundId: 'round-2026-03', projectId: 'proj-1', castAt: new Date('2026-03-02T11:20:00Z') },
  // 4 votes for proj-2
  { id: 'vote-6', userId: 'user-6', votingRoundId: 'round-2026-03', projectId: 'proj-2', castAt: new Date('2026-03-01T08:50:00Z') },
  { id: 'vote-7', userId: 'user-7', votingRoundId: 'round-2026-03', projectId: 'proj-2', castAt: new Date('2026-03-01T12:30:00Z') },
  { id: 'vote-8', userId: 'user-8', votingRoundId: 'round-2026-03', projectId: 'proj-2', castAt: new Date('2026-03-02T09:00:00Z') },
  { id: 'vote-9', userId: 'user-9', votingRoundId: 'round-2026-03', projectId: 'proj-2', castAt: new Date('2026-03-03T14:10:00Z') },
  // 3 votes for proj-3
  { id: 'vote-10', userId: 'user-10', votingRoundId: 'round-2026-03', projectId: 'proj-3', castAt: new Date('2026-03-01T11:00:00Z') },
  { id: 'vote-11', userId: 'user-11', votingRoundId: 'round-2026-03', projectId: 'proj-3', castAt: new Date('2026-03-02T15:30:00Z') },
  { id: 'vote-12', userId: 'user-12', votingRoundId: 'round-2026-03', projectId: 'proj-3', castAt: new Date('2026-03-03T08:45:00Z') },
];

export const mockFinancialBreakdowns: FinancialBreakdown[] = [
  {
    month: '2026-01',
    totalRevenue: 24500,
    allocations: [
      { category: 'projects', amount: 10290, percent: 42 },
      { category: 'operations', amount: 6125, percent: 25 },
      { category: 'platform', amount: 4410, percent: 18 },
      { category: 'team', amount: 3675, percent: 15 },
    ],
  },
  {
    month: '2026-02',
    totalRevenue: 27800,
    allocations: [
      { category: 'projects', amount: 11676, percent: 42 },
      { category: 'operations', amount: 6950, percent: 25 },
      { category: 'platform', amount: 5004, percent: 18 },
      { category: 'team', amount: 4170, percent: 15 },
    ],
  },
  {
    month: '2026-03',
    totalRevenue: 31200,
    allocations: [
      { category: 'projects', amount: 13104, percent: 42 },
      { category: 'operations', amount: 7800, percent: 25 },
      { category: 'platform', amount: 5616, percent: 18 },
      { category: 'team', amount: 4680, percent: 15 },
    ],
  },
];

export const mockImpactCard: ImpactCard = {
  id: 'card-2026-02',
  userId: 'user-1',
  month: '2026-02',
  totalContributed: 45.0,
  metrics: [
    { label: 'Trees Planted', value: 245, unit: 'trees' },
    { label: 'CO\u2082 Offset', value: 15.6, unit: 'tonnes' },
    { label: 'Coastline Restored', value: 0.3, unit: 'km' },
  ],
  sdgBadges: [13, 15],
  imageUrl: undefined,
  generatedAt: new Date('2026-02-28T00:00:00Z'),
};
