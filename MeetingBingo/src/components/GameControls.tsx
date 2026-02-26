import { Button } from './ui/Button';

interface GameControlsProps {
  isListening: boolean;
  isSupported: boolean;
  filledCount: number;
  onToggleListening: () => void;
  onNewCard: () => void;
  onQuit: () => void;
}

export function GameControls({
  isListening,
  isSupported,
  filledCount,
  onToggleListening,
  onNewCard,
  onQuit,
}: GameControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <div className="flex gap-2">
        {isSupported && (
          <Button
            variant={isListening ? 'secondary' : 'primary'}
            size="sm"
            onClick={onToggleListening}
          >
            {isListening ? '⏸ Pause' : '🎤 Listen'}
          </Button>
        )}
        <Button variant="secondary" size="sm" onClick={onNewCard}>
          🔄 New Card
        </Button>
        <Button variant="ghost" size="sm" onClick={onQuit}>
          Quit
        </Button>
      </div>

      <div className="text-sm text-text-secondary">
        {filledCount}/25 filled
      </div>
    </div>
  );
}
