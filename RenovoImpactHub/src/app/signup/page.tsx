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
    <div className="min-h-screen flex items-center justify-center bg-bg-secondary px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
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
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
