'use client';

import Card from '@/components/ui/Card';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

interface ImpactSummaryProps {
  totalThisMonth: number;
  totalAllTime: number;
  treesPlanted: number;
  co2Offset: number;
}

const icons = [
  // Dollar — Contributed This Month
  <svg key="dollar" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M12 3v3m0 12v3" />
  </svg>,
  // Chart — All-Time
  <svg key="chart" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>,
  // Tree — Trees Planted
  <svg key="tree" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-6m0 0c-3 0-5-2.5-5-5 0-1.5.5-3 2-4-0.5-1.5 0-3.5 1.5-4.5C12 .5 13.5 1.5 13 3c1.5 1 2 2.5 2 4 0 2.5-2 5-5 5h2z" />
  </svg>,
  // Cloud — CO₂
  <svg key="cloud" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
  </svg>,
];

export default function ImpactSummary({
  totalThisMonth,
  totalAllTime,
  treesPlanted,
  co2Offset,
}: ImpactSummaryProps) {
  const stats = [
    { value: totalThisMonth, label: 'Contributed This Month', prefix: '$', icon: icons[0] },
    { value: totalAllTime, label: 'Total All-Time Impact', prefix: '$', icon: icons[1] },
    { value: treesPlanted, label: 'Trees Planted', prefix: '', icon: icons[2] },
    { value: co2Offset, label: 'CO\u2082 Offset', prefix: '', suffix: ' t', icon: icons[3] },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <Card key={stat.label} className={`animate-fade-in-up ${i === 1 ? 'animation-delay-100' : i === 2 ? 'animation-delay-200' : i === 3 ? 'animation-delay-300' : ''}`}>
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 text-primary rounded-full p-2 shrink-0">
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
