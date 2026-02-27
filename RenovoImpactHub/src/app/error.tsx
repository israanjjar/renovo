'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Something went wrong
        </h2>
        <p className="text-text-secondary mb-6">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <button
          onClick={reset}
          className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-light transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
