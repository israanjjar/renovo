import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'warning';
  onDismiss: () => void;
  duration?: number;
}

const typeStyles = {
  success: 'bg-green-100 text-green-800 border-green-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
};

export function Toast({ message, type = 'info', onDismiss, duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <div
      className={cn(
        'fixed top-4 right-4 z-50 px-4 py-2 rounded-lg border shadow-lg transition-all duration-300',
        typeStyles[type],
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2',
      )}
    >
      {message}
    </div>
  );
}
