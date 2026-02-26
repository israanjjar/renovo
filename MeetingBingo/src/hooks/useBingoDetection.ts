import { useEffect, useRef } from 'react';
import type { BingoCard, WinningLine } from '../types';
import { checkForBingo } from '../lib/bingoChecker';

export function useBingoDetection(
  card: BingoCard | null,
  onBingo: (line: WinningLine) => void,
) {
  const prevWinRef = useRef<WinningLine | null>(null);

  useEffect(() => {
    if (!card) {
      prevWinRef.current = null;
      return;
    }

    const win = checkForBingo(card);
    if (win && !prevWinRef.current) {
      prevWinRef.current = win;
      onBingo(win);
    } else if (!win) {
      prevWinRef.current = null;
    }
  }, [card, onBingo]);
}
