'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  from?: 'left' | 'right' | 'up' | 'down' | 'fade';
  delay?: number;
  duration?: number;
  once?: boolean;
};

const fromMap = {
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  fade: { x: 0, y: 0 },
};

export function ScrollReveal({
  children,
  className,
  from = 'up',
  delay = 0,
  duration = 0.9,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let st: import('gsap/ScrollTrigger').ScrollTrigger | null = null;

    import('@/lib/gsap').then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;

      const { x, y } = fromMap[from];

      const tween = gsap.fromTo(
        ref.current,
        { opacity: 0, x, y },
        {
          opacity: 1,
          x: 0,
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
  }, [from, delay, duration, once]);

  return (
    <div ref={ref} className={cn('opacity-0', className)}>
      {children}
    </div>
  );
}
