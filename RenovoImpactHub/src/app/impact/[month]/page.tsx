'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthContext';
import { getImpactCard } from '@/lib/supabase/client';
import type { ImpactCard } from '@/types';
import ImpactCardPreview from '@/components/sharing/ImpactCardPreview';
import ShareButtons from '@/components/sharing/ShareButtons';

export default function ImpactMonthPage() {
  const params = useParams();
  const month = params.month as string;
  const { user } = useAuth();
  const [card, setCard] = useState<ImpactCard | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (user) {
        const result = await getImpactCard(user.id, month);
        setCard(result);
      }
      setLoading(false);
    }
    load();
  }, [user, month]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-primary py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/dashboard" className="text-primary hover:underline text-sm">
          &larr; Back to Dashboard
        </Link>

        {card && user ? (
          <div className="mt-8 space-y-8">
            <ImpactCardPreview card={card} userName={user.name} />
            <div className="flex justify-center">
              <ShareButtons
                shareUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/impact/${month}`}
                shareText={`Check out my impact for ${month} on Renovo!`}
              />
            </div>
          </div>
        ) : (
          <div className="mt-8">
            <p className="text-text-secondary">No impact card available for this month.</p>
          </div>
        )}
      </div>
    </div>
  );
}
