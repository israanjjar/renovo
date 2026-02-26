import { Button } from './ui/Button';

interface LandingPageProps {
  onStart: () => void;
}

export function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-text-primary">
            Meeting Bingo
          </h1>
          <p className="text-xl text-text-secondary">
            Turn your meetings into a game. Auto-detect buzzwords with speech recognition and race to BINGO!
          </p>
        </div>

        <Button size="lg" onClick={onStart} className="text-xl px-8 py-4">
          New Game
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="space-y-2">
            <div className="text-2xl">🎯</div>
            <h3 className="font-semibold text-text-primary">Pick a Category</h3>
            <p className="text-sm text-text-secondary">Choose from Agile, Corporate, or Tech buzzwords</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">🎤</div>
            <h3 className="font-semibold text-text-primary">Listen & Play</h3>
            <p className="text-sm text-text-secondary">Auto-detects buzzwords from your meeting audio</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl">🎉</div>
            <h3 className="font-semibold text-text-primary">Win & Share</h3>
            <p className="text-sm text-text-secondary">Get 5 in a row and share your results with your team</p>
          </div>
        </div>

        <p className="text-xs text-text-secondary">
          🔒 Privacy first — all audio is processed locally in your browser. Nothing is recorded or sent to any server.
        </p>
      </div>
    </div>
  );
}
