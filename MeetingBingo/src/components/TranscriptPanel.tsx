import { cn } from '../lib/utils';

interface TranscriptPanelProps {
  transcript: string;
  interimTranscript: string;
  isListening: boolean;
  detectedWords: string[];
}

export function TranscriptPanel({ transcript, interimTranscript, isListening, detectedWords }: TranscriptPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-3">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            'w-2.5 h-2.5 rounded-full',
            isListening ? 'bg-red-500 animate-pulse-fast' : 'bg-gray-300',
          )}
        />
        <span className="text-sm font-medium text-text-secondary">
          {isListening ? 'Listening...' : 'Not listening'}
        </span>
      </div>

      <div className="h-24 overflow-y-auto text-sm text-text-secondary bg-gray-50 rounded-lg p-3">
        {transcript || interimTranscript ? (
          <>
            <span>{transcript}</span>
            <span className="text-gray-400">{interimTranscript}</span>
          </>
        ) : (
          <span className="text-gray-400 italic">
            {isListening ? 'Waiting for speech...' : 'Start listening to see transcript'}
          </span>
        )}
      </div>

      {detectedWords.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {detectedWords.map((word, i) => (
            <span
              key={`${word}-${i}`}
              className="text-xs bg-blue-100 text-accent-blue px-2 py-0.5 rounded-full animate-bounce-in"
            >
              {word}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
