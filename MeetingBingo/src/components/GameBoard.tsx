import { useState, useCallback } from 'react';
import type { BingoCard as BingoCardType, WinningLine, CategoryId } from '../types';
import { BingoCard } from './BingoCard';
import { TranscriptPanel } from './TranscriptPanel';
import { GameControls } from './GameControls';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { detectWords } from '../lib/wordDetector';

interface GameBoardProps {
  card: BingoCardType;
  category: CategoryId;
  winningLine: WinningLine | null;
  filledCount: number;
  onSquareClick: (row: number, col: number) => void;
  onNewCard: () => void;
  onQuit: () => void;
  onTranscript: (text: string) => void;
  onListeningChange: (listening: boolean) => void;
}

export function GameBoard({
  card,
  category,
  winningLine,
  filledCount,
  onSquareClick,
  onNewCard,
  onQuit,
  onTranscript,
  onListeningChange,
}: GameBoardProps) {
  const [detectedWords, setDetectedWords] = useState<string[]>([]);

  const handleTranscript = useCallback(
    (text: string) => {
      onTranscript(text);
      const allWords = card.squares.flat().map((s) => s.word);
      const detected = detectWords(text, allWords);
      if (detected.length > 0) {
        setDetectedWords((prev) => [...prev, ...detected]);
      }
    },
    [onTranscript, card],
  );

  const speech = useSpeechRecognition(handleTranscript);

  const toggleListening = useCallback(() => {
    if (speech.isListening) {
      speech.stopListening();
      onListeningChange(false);
    } else {
      speech.startListening();
      onListeningChange(true);
    }
  }, [speech, onListeningChange]);

  const categoryNames: Record<CategoryId, string> = {
    agile: 'Agile & Scrum',
    corporate: 'Corporate Speak',
    tech: 'Tech & Engineering',
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-lg space-y-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-text-primary">{categoryNames[category]}</h2>
        </div>

        <BingoCard card={card} winningLine={winningLine} onSquareClick={onSquareClick} />

        <GameControls
          isListening={speech.isListening}
          isSupported={speech.isSupported}
          filledCount={filledCount}
          onToggleListening={toggleListening}
          onNewCard={onNewCard}
          onQuit={onQuit}
        />

        <TranscriptPanel
          transcript={speech.transcript}
          interimTranscript={speech.interimTranscript}
          isListening={speech.isListening}
          detectedWords={detectedWords}
        />
      </div>
    </div>
  );
}
