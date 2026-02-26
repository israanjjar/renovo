import type { BingoCard, CategoryId } from '../types';

function buildEmojiGrid(card: BingoCard): string {
  return card.squares
    .map((row) =>
      row
        .map((s) => {
          if (s.isFreeSpace) return '⭐';
          if (s.isFilled) return '🟦';
          return '⬜';
        })
        .join('')
    )
    .join('\n');
}

export function buildShareText(card: BingoCard, category: CategoryId): string {
  const grid = buildEmojiGrid(card);
  const filled = card.squares.flat().filter((s) => s.isFilled).length;
  return `Meeting Bingo - ${category} 🎯\n\n${grid}\n\n${filled}/25 squares filled!\n\nhttps://meetingbingo.app`;
}

export async function shareResult(card: BingoCard, category: CategoryId): Promise<boolean> {
  const text = buildShareText(card, category);

  if (navigator.share) {
    try {
      await navigator.share({ text });
      return true;
    } catch {
      // User cancelled or error - fall through to clipboard
    }
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
