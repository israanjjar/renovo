'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthContext';
import type { SDGId } from '@/types';
import { SDG_INFO } from '@/lib/utils/sdg';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const ALL_SDGS: SDGId[] = [7, 12, 13, 14, 15];

export default function SettingsPage() {
  const { user, updateSdgFocus } = useAuth();
  const [selectedSdgs, setSelectedSdgs] = useState<SDGId[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setSelectedSdgs([...user.sdgFocus]);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary">Please log in to view settings.</p>
      </div>
    );
  }

  function toggleSdg(sdg: SDGId) {
    setSelectedSdgs((prev) =>
      prev.includes(sdg) ? prev.filter((s) => s !== sdg) : [...prev, sdg],
    );
    setSaved(false);
  }

  function handleSaveSdgs() {
    updateSdgFocus(selectedSdgs);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const tierLabel = user.tier.charAt(0).toUpperCase() + user.tier.slice(1);

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="bg-gradient-to-br from-secondary/10 to-primary/10 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-text-primary">Account Settings</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">

        {/* Profile Section */}
        <Card>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Profile</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-text-secondary">Name</label>
              <p className="text-text-primary font-medium">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm text-text-secondary">Email</label>
              <p className="text-text-primary">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm text-text-secondary">Tier</label>
              <Badge label={tierLabel} />
            </div>
          </div>
        </Card>

        {/* SDG Focus Areas Section */}
        <Card>
          <h2 className="text-lg font-semibold text-text-primary mb-4">SDG Focus Areas</h2>
          <div className="space-y-3">
            {ALL_SDGS.map((sdg) => {
              const info = SDG_INFO[sdg];
              const checked = selectedSdgs.includes(sdg);
              return (
                <label
                  key={sdg}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors',
                    checked ? 'border-primary bg-bg-secondary' : 'border-gray-200',
                  )}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleSdg(sdg)}
                    className="accent-primary w-4 h-4"
                  />
                  <span className="text-sm font-medium text-text-primary">
                    SDG {sdg}: {info.fullName}
                  </span>
                </label>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Button size="sm" onClick={handleSaveSdgs}>
              Save
            </Button>
            {saved && (
              <span className="text-sm text-green-600">Saved!</span>
            )}
          </div>
        </Card>

        {/* Subscription Section */}
        <Card>
          <h2 className="text-lg font-semibold text-text-primary mb-4">Subscription</h2>
          <p className="text-sm text-text-secondary">
            Current tier: <span className="font-medium text-text-primary">{tierLabel}</span>
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => alert('Stripe portal coming soon')}
          >
            Manage Subscription
          </Button>
        </Card>

        {/* Danger Zone Section */}
        <Card className="border-red-200">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h2>
          <Button
            variant="secondary"
            size="sm"
            className="border-red-300 text-red-600 hover:bg-red-50"
            onClick={() => {
              if (window.confirm('Are you sure you want to cancel your subscription?')) {
                alert('Subscription cancellation coming soon');
              }
            }}
          >
            Cancel Subscription
          </Button>
        </Card>
      </div>
    </div>
  );
}
