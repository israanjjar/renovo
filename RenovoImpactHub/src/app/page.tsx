import Hero from '@/components/landing/Hero';
import TransparencyPreview from '@/components/landing/TransparencyPreview';
import PricingTable from '@/components/landing/PricingTable';

function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-16"
      >
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
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
      <WaveDivider />
      <TransparencyPreview />
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
      <PricingTable />
    </>
  );
}
