import type { BingoCard as BingoCardType, WinningLine } from '../types';
import { BingoSquare } from './BingoSquare';

interface BingoCardProps {
  card: BingoCardType;
  winningLine: WinningLine | null;
  onSquareClick: (row: number, col: number) => void;
}

export function BingoCard({ card, winningLine, onSquareClick }: BingoCardProps) {
  const winningSquareIds = new Set(winningLine?.squares ?? []);

  return (
    <div className="grid grid-cols-5 gap-1.5 sm:gap-2 w-full max-w-md mx-auto">
      {card.squares.flat().map((square) => (
        <BingoSquare
          key={square.id}
          square={square}
          isWinning={winningSquareIds.has(square.id)}
          onClick={() => onSquareClick(square.row, square.col)}
        />
      ))}
    </div>
  );
}
