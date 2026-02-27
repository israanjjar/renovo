'use client';

import Link from 'next/link';
import AnimatedCounter from '@/components/ui/AnimatedCounter';

export default function Hero() {
  return (
    <section className="relative text-white overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80)',
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/90 to-primary/80" />

      {/* Decorative floating leaves */}
      <svg
        className="absolute top-10 right-10 w-32 h-32 text-white/5 rotate-12"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 5C50 5 20 25 15 55C10 85 40 95 50 95C60 95 90 85 85 55C80 25 50 5 50 5ZM50 15C50 15 55 45 50 75" />
      </svg>
      <svg
        className="absolute bottom-16 left-8 w-20 h-20 text-white/5 -rotate-45"
        viewBox="0 0 100 100"
        fill="currentColor"
      >
        <path d="M50 5C50 5 20 25 15 55C10 85 40 95 50 95C60 95 90 85 85 55C80 25 50 5 50 5ZM50 15C50 15 55 45 50 75" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-28 relative">
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
            { value: 2450, label: 'Trees Planted', prefix: '', suffix: '' },
            { value: 156, label: 'CO\u2082 Offset', prefix: '', suffix: 't' },
            { value: 12400, label: 'Funded', prefix: '$', suffix: '' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center animate-fade-in-up ${i === 1 ? 'animation-delay-100' : i === 2 ? 'animation-delay-200' : ''}`}
            >
              <div className="text-3xl md:text-4xl font-bold">
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/80 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
