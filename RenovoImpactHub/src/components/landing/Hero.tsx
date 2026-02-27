import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-secondary to-primary text-white">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Your Impact, Tracked. Your Voice, Heard.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Join a community of changemakers funding verified environmental
            projects. See exactly where every dollar goes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-lg bg-primary-light text-white font-medium px-6 py-3 text-lg hover:opacity-90 transition-opacity"
            >
              Join the Movement
            </Link>
            <Link
              href="/transparency"
              className="inline-flex items-center justify-center rounded-lg border border-white/40 text-white font-medium px-6 py-3 text-lg hover:bg-white/10 transition-colors"
            >
              See Our Impact
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          {[
            { value: '2,450', label: 'Trees Planted' },
            { value: '156t', label: 'CO\u2082 Offset' },
            { value: '$12,400', label: 'Funded' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center animate-fade-in-up ${i === 1 ? 'animation-delay-100' : i === 2 ? 'animation-delay-200' : ''}`}
            >
              <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
              <div className="text-sm text-white/80 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
