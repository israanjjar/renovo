import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-primary mb-4">404</div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Page Not Found
        </h2>
        <p className="text-text-secondary mb-6">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-light transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="bg-white border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-bg-secondary transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
