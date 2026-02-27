import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  color?: string;
  variant?: 'filled' | 'outline';
}

export default function Badge({
  label,
  color = '#2D6A4F',
  variant = 'filled',
}: BadgeProps) {
  return (
    <span
      className={cn(
        'px-2 py-0.5 text-xs font-medium rounded-full inline-block'
      )}
      style={
        variant === 'filled'
          ? { backgroundColor: color, color: '#FFFFFF' }
          : {
              backgroundColor: 'transparent',
              border: `1px solid ${color}`,
              color: color,
            }
      }
    >
      {label}
    </span>
  );
}
