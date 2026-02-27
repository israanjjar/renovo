'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export default function AnimatedCounter({
  value,
  duration = 1500,
  prefix = '',
  suffix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  });

  function animate() {
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = eased * value;

      if (decimals > 0) {
        setDisplay(current.toFixed(decimals));
      } else {
        setDisplay(Math.round(current).toLocaleString());
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}
