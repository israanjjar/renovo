import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  color?: string;
  label?: string;
  className?: string;
}

export default function ProgressBar({
  value,
  color = '#2D6A4F',
  label,
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="text-sm font-medium text-text-primary mb-1">
          {label}
        </div>
      )}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full animate-grow-width"
          style={{
            '--bar-width': `${clampedValue}%`,
            width: `${clampedValue}%`,
            backgroundColor: color,
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
