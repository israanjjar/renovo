import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface PricingTier {
  name: string;
  price: string;
  audience: string;
  features: string[];
  tierSlug: string;
  highlighted?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: 'Base',
    price: '$20/mo',
    audience: 'For students & new grads',
    tierSlug: 'base',
    features: [
      'Impact dashboard',
      'Monthly reports',
      'Community voting',
      '1 SDG focus area',
    ],
  },
  {
    name: 'Premium',
    price: '$20/mo',
    audience: 'For professionals',
    tierSlug: 'premium',
    highlighted: true,
    features: [
      'Everything in Base',
      'Priority project access',
      'Shareable impact cards',
      'Up to 3 SDG focus areas',
    ],
  },
  {
    name: 'VIP',
    price: '$100/mo',
    audience: 'For organizations',
    tierSlug: 'vip',
    features: [
      'Everything in Premium',
      '6 team seats',
      'Quarterly ESG reports',
      'Custom branding',
    ],
  },
];

export default function PricingTable() {
  return (
    <section className="bg-bg-secondary py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-text-primary text-center mb-10">
          Choose Your Impact Level
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, i) => (
            <Card
              key={tier.name}
              className={cn(
                'flex flex-col animate-fade-in-up',
                i === 1 && 'animation-delay-100',
                i === 2 && 'animation-delay-200',
                tier.highlighted && 'ring-2 ring-primary'
              )}
            >
              <h3 className="text-xl font-bold text-text-primary">
                {tier.name}
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                {tier.audience}
              </p>
              <div className="text-3xl font-bold text-primary mt-4">
                {tier.price}
              </div>

              <ul className="mt-6 flex flex-col gap-2 flex-1">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-text-primary"
                  >
                    <svg
                      className="w-4 h-4 text-primary mt-0.5 shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href={`/signup?tier=${tier.tierSlug}`} className="mt-6">
                <Button
                  variant={tier.highlighted ? 'primary' : 'secondary'}
                  className="w-full"
                >
                  Get Started
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
