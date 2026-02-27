import ProgressBar from '@/components/ui/ProgressBar';
import { formatCurrency } from '@/lib/utils/currency';

const BASE_AMOUNT = 20;

const allocations = [
  { label: 'Impact Projects', percent: 42, color: '#2D6A4F' },
  { label: 'Operations', percent: 25, color: '#6B7280' },
  { label: 'Platform Development', percent: 18, color: '#52B788' },
  { label: 'Team', percent: 15, color: '#95D5B2' },
];

export default function TransparencyPreview() {
  return (
    <section className="bg-bg-warm py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-text-primary text-center mb-3">
          Where Your Money Goes
        </h2>
        <p className="text-text-secondary text-center mb-10 max-w-xl mx-auto">
          Unlike other platforms, we show you exactly where every dollar is
          allocated.
        </p>

        <div className="flex flex-col gap-6">
          {allocations.map((item) => (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-text-primary">
                  {item.label}
                </span>
                <span className="text-sm text-text-secondary">
                  {item.percent}% &middot;{' '}
                  {formatCurrency((BASE_AMOUNT * item.percent) / 100)}
                </span>
              </div>
              <ProgressBar value={item.percent} color={item.color} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
