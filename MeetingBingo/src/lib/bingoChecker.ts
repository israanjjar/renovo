import type { BingoCard, WinningLine } from '../types';

export function checkForBingo(card: BingoCard): WinningLine | null {
  const { squares } = card;

  // Check rows
  for (let row = 0; row < 5; row++) {
    if (squares[row].every((s) => s.isFilled)) {
      return {
        type: 'row',
        index: row,
        squares: squares[row].map((s) => s.id),
      };
    }
  }

  // Check columns
  for (let col = 0; col < 5; col++) {
    if (squares.every((row) => row[col].isFilled)) {
      return {
        type: 'column',
        index: col,
        squares: squares.map((row) => row[col].id),
      };
    }
  }

  // Check diagonal (top-left to bottom-right)
  if (squares.every((row, i) => row[i].isFilled)) {
    return {
      type: 'diagonal',
      index: 0,
      squares: squares.map((row, i) => row[i].id),
    };
  }

  // Check diagonal (top-right to bottom-left)
  if (squares.every((row, i) => row[4 - i].isFilled)) {
    return {
      type: 'diagonal',
      index: 1,
      squares: squares.map((row, i) => row[4 - i].id),
    };
  }

  return null;
}

export function countFilled(card: BingoCard): number {
  return card.squares.flat().filter((s) => s.isFilled).length;
}

export function getClosestToWin(card: BingoCard): number {
  const { squares } = card;
  let maxFilled = 0;

  // Check rows
  for (let row = 0; row < 5; row++) {
    const filled = squares[row].filter((s) => s.isFilled).length;
    maxFilled = Math.max(maxFilled, filled);
  }

  // Check columns
  for (let col = 0; col < 5; col++) {
    const filled = squares.filter((row) => row[col].isFilled).length;
    maxFilled = Math.max(maxFilled, filled);
  }

  // Diagonals
  const diag1 = squares.filter((row, i) => row[i].isFilled).length;
  const diag2 = squares.filter((row, i) => row[4 - i].isFilled).length;
  maxFilled = Math.max(maxFilled, diag1, diag2);

  return maxFilled;
}
