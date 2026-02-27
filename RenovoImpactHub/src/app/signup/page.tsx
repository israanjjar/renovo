'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

function SignupForm() {
  const { signup } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tier = searchParams.get('tier') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await signup(email, password, name);
      const params = tier ? `?tier=${tier}` : '';
      router.push(`/onboarding${params}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignup() {
    setIsSubmitting(true);
    try {
      await signup('demo@renovo.org', '', 'Demo User');
      const params = tier ? `?tier=${tier}` : '';
      router.push(`/onboarding${params}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left: Nature image panel */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/85 to-primary/75" />
        <div className="relative flex flex-col justify-center px-12 text-white">
          <svg className="w-10 h-10 mb-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
          <h2 className="text-3xl font-bold mb-3">Start making an impact</h2>
          <p className="text-white/80 text-lg mb-8">
            Fund verified environmental projects, track your contributions, and vote on what matters.
          </p>
          <div className="space-y-3">
            {[
              { icon: '\u2713', text: 'Real-time impact dashboard' },
              { icon: '\u2713', text: 'Vote on which projects get funded' },
              { icon: '\u2713', text: 'Complete financial transparency' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/80">
                <span className="text-accent font-bold">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center bg-bg-secondary px-4">
        <div className="w-full max-w-md">
          {/* Mobile header */}
          <div className="lg:hidden bg-gradient-to-br from-secondary to-primary rounded-xl p-6 mb-8 text-white text-center">
            <svg className="w-8 h-8 mx-auto mb-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
            <h2 className="text-xl font-bold">Start making an impact</h2>
          </div>

          <div className="hidden lg:block text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary">Create your account</h1>
            <p className="mt-2 text-text-secondary">Join Renovo and start making an impact</p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-primary mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Create a password"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-text-secondary">or</span>
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={handleGoogleSignup}
              disabled={isSubmitting}
              className="w-full"
            >
              Continue with Google
            </Button>

            <p className="mt-6 text-center text-sm text-text-secondary">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary hover:text-primary-light">
                Log in
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
