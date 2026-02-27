import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  color?: string;
  label?: string;
  className?: string;
}

function lightenColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + amount);
  const b = Math.min(255, (num & 0x0000ff) + amount);
  return `rgb(${r}, ${g}, ${b})`;
}

export default function ProgressBar({
  value,
  color = '#2D6A4F',
  label,
  className,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const lightColor = lightenColor(color, 60);

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="text-sm font-medium text-text-primary mb-1">
          {label}
        </div>
      )}
      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full animate-grow-width bar-shine relative"
          style={{
            '--bar-width': `${clampedValue}%`,
            width: `${clampedValue}%`,
            background: `linear-gradient(to right, ${color}, ${lightColor})`,
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
