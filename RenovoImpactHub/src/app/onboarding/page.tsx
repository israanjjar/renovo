'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/AuthContext';
import { SDG_INFO, getSDGColor } from '@/lib/utils/sdg';
import { createCheckoutSession } from '@/lib/stripe/checkout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import type { SDGId } from '@/types';

const TIERS = [
  {
    id: 'base' as const,
    name: 'Base',
    price: '$10/mo',
    description: 'Support impact projects and track your contribution.',
  },
  {
    id: 'premium' as const,
    name: 'Premium',
    price: '$25/mo',
    description: 'Vote on projects, monthly impact card, and priority updates.',
  },
  {
    id: 'vip' as const,
    name: 'VIP',
    price: '$50/mo',
    description: 'Everything in Premium plus exclusive events and direct project access.',
  },
];

const SDG_IDS: SDGId[] = [7, 12, 13, 14, 15];

function OnboardingFlow() {
  const { updateSdgFocus } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const tierFromParams = searchParams.get('tier');

  const [step, setStep] = useState(tierFromParams ? 2 : 1);
  const [selectedTier, setSelectedTier] = useState(tierFromParams || '');
  const [selectedSdgs, setSelectedSdgs] = useState<SDGId[]>([]);

  async function handleTierSelect(tier: string) {
    setSelectedTier(tier);
    await createCheckoutSession(tier);
    setStep(2);
  }

  function toggleSdg(sdg: SDGId) {
    setSelectedSdgs(prev => {
      if (prev.includes(sdg)) {
        return prev.filter(s => s !== sdg);
      }
      if (prev.length >= 3) return prev;
      return [...prev, sdg];
    });
  }

  function handleComplete() {
    updateSdgFocus(selectedSdgs);
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen bg-bg-secondary px-4 py-12">
      <div className="mx-auto max-w-2xl">
        {/* Step indicator */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
              step >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-text-secondary'
            }`}
          >
            1
          </div>
          <div className={`h-0.5 w-12 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
              step >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-text-secondary'
            }`}
          >
            2
          </div>
        </div>

        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-text-primary">Choose your plan</h1>
              <p className="mt-2 text-text-secondary">Select a tier to get started with Renovo</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {TIERS.map(tier => (
                <Card
                  key={tier.id}
                  className={`text-center transition-all ${
                    selectedTier === tier.id
                      ? 'ring-2 ring-primary'
                      : 'hover:ring-1 hover:ring-primary/50'
                  }`}
                  onClick={() => handleTierSelect(tier.id)}
                >
                  <h3 className="text-lg font-semibold text-text-primary">{tier.name}</h3>
                  <p className="mt-1 text-2xl font-bold text-primary">{tier.price}</p>
                  <p className="mt-3 text-sm text-text-secondary">{tier.description}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-text-primary">
                What impact areas matter most to you?
              </h1>
              <p className="mt-2 text-text-secondary">
                Select 1-3 focus areas to personalize your dashboard
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {SDG_IDS.map(sdg => {
                const info = SDG_INFO[sdg];
                const color = getSDGColor(sdg);
                const isSelected = selectedSdgs.includes(sdg);

                return (
                  <Card
                    key={sdg}
                    className={`flex items-center gap-4 transition-all ${
                      isSelected
                        ? 'ring-2 ring-primary bg-bg-secondary'
                        : 'hover:ring-1 hover:ring-primary/50'
                    }`}
                    onClick={() => toggleSdg(sdg)}
                  >
                    <div
                      className="h-10 w-10 shrink-0 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: color }}
                    >
                      {sdg}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-text-primary">{info.fullName}</p>
                      <p className="text-sm text-text-secondary">SDG {sdg}</p>
                    </div>
                    <div className="ml-auto">
                      <div
                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-primary bg-primary' : 'border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <Button
                size="lg"
                disabled={selectedSdgs.length < 1 || selectedSdgs.length > 3}
                onClick={handleComplete}
              >
                Complete Setup
              </Button>
              {selectedSdgs.length === 0 && (
                <p className="mt-2 text-sm text-text-secondary">Select at least 1 focus area</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingFlow />
    </Suspense>
  );
}
