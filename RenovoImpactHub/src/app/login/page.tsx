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
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
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
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
