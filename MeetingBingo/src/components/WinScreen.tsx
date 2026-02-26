import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { BingoCard as BingoCardType, CategoryId, WinningLine } from '../types';
import { BingoCard } from './BingoCard';
import { Button } from './ui/Button';
import { shareResult } from '../lib/shareUtils';

interface WinScreenProps {
  card: BingoCardType;
  category: CategoryId;
  winningLine: WinningLine;
  winningWord: string | null;
  startedAt: number | null;
  completedAt: number | null;
  filledCount: number;
  onPlayAgain: () => void;
  onNewGame: () => void;
}

export function WinScreen({
  card,
  category,
  winningLine,
  winningWord,
  startedAt,
  completedAt,
  filledCount,
  onPlayAgain,
  onNewGame,
}: WinScreenProps) {
  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  const duration = startedAt && completedAt
    ? Math.round((completedAt - startedAt) / 1000)
    : null;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  };

  const handleShare = async () => {
    await shareResult(card, category);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-lg w-full space-y-6 text-center">
        <div className="space-y-2 animate-bounce-in">
          <h1 className="text-5xl font-bold text-accent-green">BINGO!</h1>
          {winningWord && (
            <p className="text-lg text-text-secondary">
              Winning word: <span className="font-semibold text-text-primary">{winningWord}</span>
            </p>
          )}
        </div>

        <BingoCard card={card} winningLine={winningLine} onSquareClick={() => {}} />

        <div className="flex justify-center gap-6 text-sm text-text-secondary">
          <div>
            <div className="font-semibold text-text-primary text-lg">{filledCount}/25</div>
            <div>Squares filled</div>
          </div>
          {duration !== null && (
            <div>
              <div className="font-semibold text-text-primary text-lg">{formatDuration(duration)}</div>
              <div>Time to win</div>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={handleShare} variant="secondary">
            📋 Share Result
          </Button>
          <Button onClick={onPlayAgain}>
            🔄 Play Again
          </Button>
          <Button variant="ghost" onClick={onNewGame}>
            New Game
          </Button>
        </div>
      </div>
    </div>
  );
}
