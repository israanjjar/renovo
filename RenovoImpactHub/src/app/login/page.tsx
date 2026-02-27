'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login(email, password);
      router.push(redirect);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setIsSubmitting(true);
    try {
      await login('demo@renovo.org', '');
      router.push(redirect);
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
              'url(https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/85 to-primary/75" />
        <div className="relative flex flex-col justify-center px-12 text-white">
          <svg className="w-10 h-10 mb-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
          </svg>
          <h2 className="text-3xl font-bold mb-3">Welcome back to Renovo</h2>
          <p className="text-white/80 text-lg mb-8">
            Track your impact, vote on projects, and see exactly where your contributions go.
          </p>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['AR', 'SM', 'JK'].map((initials, i) => (
                <div
                  key={initials}
                  className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-semibold flex items-center justify-center border-2 border-white/30"
                  style={{ zIndex: 3 - i }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/70">Join 340+ members making a difference</p>
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
            <h2 className="text-xl font-bold">Welcome back</h2>
          </div>

          <div className="hidden lg:block text-center mb-8">
            <h1 className="text-3xl font-bold text-text-primary">Welcome back</h1>
            <p className="mt-2 text-text-secondary">Log in to your Renovo Impact Hub account</p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  placeholder="Enter your password"
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? 'Logging in...' : 'Log In'}
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
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="w-full"
            >
              Continue with Google
            </Button>

            <p className="mt-6 text-center text-sm text-text-secondary">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-medium text-primary hover:text-primary-light">
                Sign up
              </Link>
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
