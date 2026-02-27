import Hero from '@/components/landing/Hero';
import TransparencyPreview from '@/components/landing/TransparencyPreview';
import Testimonials from '@/components/landing/Testimonials';
import PricingTable from '@/components/landing/PricingTable';

function BrushDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden leading-[0] ${className}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16"
      >
        <path
          d="M0,50 C120,65 240,30 360,45 C480,60 600,20 720,35 C840,50 960,25 1080,40 C1200,55 1320,30 1440,45 L1440,80 L0,80 Z"
          className="fill-bg-warm"
        />
      </svg>
    </div>
  );
}

function WaveDivider() {
  return (
    <div className="overflow-hidden leading-[0]">
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16"
      >
        <path
          d="M0,40 C360,0 720,80 1080,40 C1260,20 1380,30 1440,40 L1440,80 L0,80 Z"
          className="fill-bg-secondary"
        />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <BrushDivider />
      <TransparencyPreview />
      <Testimonials />
      <WaveDivider />
      <PricingTable />
    </>
  );
}
