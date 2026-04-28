'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

type FadeUpProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
};

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 0.9,
  y = 40,
  once = true,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsapInstance: typeof import('gsap').gsap | null = null;
    let st: import('gsap/ScrollTrigger').ScrollTrigger | null = null;

    import('@/lib/gsap').then(({ gsap, ScrollTrigger }) => {
      gsapInstance = gsap;
      gsap.registerPlugin(ScrollTrigger);

      if (!ref.current) return;

      const tween = gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
            toggleActions: once ? 'play none none none' : 'play reverse play reverse',
          },
        },
      );

      st = tween.scrollTrigger as import('gsap/ScrollTrigger').ScrollTrigger | null;
    });

    return () => {
      st?.kill();
    };
  }, [delay, duration, y, once]);

  return (
    <div ref={ref} className={cn('opacity-0', className)}>
      {children}
    </div>
  );
}
