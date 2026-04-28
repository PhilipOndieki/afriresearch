'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

type ParallaxImageProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
};

export function ParallaxImage({ children, className, speed = 0.2 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let st: import('gsap/ScrollTrigger').ScrollTrigger | null = null;

    import('@/lib/gsap').then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;

      const inner = ref.current.querySelector('[data-parallax-inner]');
      if (!inner) return;

      const tween = gsap.to(inner, {
        yPercent: speed * -100,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      st = tween.scrollTrigger as import('gsap/ScrollTrigger').ScrollTrigger | null;
    });

    return () => {
      st?.kill();
    };
  }, [speed]);

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <div data-parallax-inner className="scale-110">
        {children}
      </div>
    </div>
  );
}
