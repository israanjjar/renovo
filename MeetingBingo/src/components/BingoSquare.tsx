import type { BingoSquare as BingoSquareType } from '../types';
import { cn } from '../lib/utils';

interface BingoSquareProps {
  square: BingoSquareType;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseStyles = 'aspect-square flex items-center justify-center p-1 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 select-none border';

  const stateStyles = cn(
    square.isFreeSpace && 'bg-free-space border-yellow-300 text-yellow-800',
    !square.isFreeSpace && !square.isFilled && 'bg-white border-gray-200 hover:border-accent-blue hover:shadow-sm cursor-pointer',
    !square.isFreeSpace && square.isFilled && !isWinning && 'bg-filled border-blue-300 text-accent-blue',
    !square.isFreeSpace && square.isFilled && square.isAutoFilled && !isWinning && 'bg-filled border-blue-300 text-accent-blue animate-bounce-in',
    isWinning && 'bg-winning border-green-400 text-green-800',
  );

  return (
    <button
      className={cn(baseStyles, stateStyles)}
      onClick={onClick}
      aria-label={`${square.word}${square.isFilled ? ' (filled)' : ''}`}
    >
      <span className="text-center leading-tight break-words">
        {square.isFreeSpace ? '⭐' : square.word}
      </span>
    </button>
  );
}
