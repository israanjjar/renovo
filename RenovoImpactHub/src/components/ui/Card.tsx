import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl shadow-sm border border-gray-100 p-6',
        onClick && 'cursor-pointer hover:shadow-md',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
