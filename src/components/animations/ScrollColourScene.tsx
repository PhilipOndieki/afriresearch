'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import { tokens } from '@/config/tokens';

type ScrollColourSceneProps = {
  bgColor: string;
  fgColor: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Wraps a section and smoothly transitions the document body background
 * colour as the section enters/leaves the viewport via GSAP ScrollTrigger.
 * Values must be hex strings from tokens.ts.
 * Respects prefers-reduced-motion — skips animation, no background shift.
 */
export function ScrollColourScene({
  bgColor,
  fgColor,
  children,
  className,
}: ScrollColourSceneProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let st: { kill: () => void } | null = null;

    import('@/lib/gsap').then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;

      const originalBg = tokens.colors.background;
      const originalFg = tokens.colors.foreground;

      st = ScrollTrigger.create({
        trigger: ref.current,
        start: 'top 65%',
        end: 'bottom 35%',
        onEnter: () =>
          gsap.to(document.body, {
            backgroundColor: bgColor,
            color: fgColor,
            duration: 0.6,
            ease: 'expo.out',
          }),
        onLeave: () =>
          gsap.to(document.body, {
            backgroundColor: originalBg,
            color: originalFg,
            duration: 0.6,
            ease: 'expo.out',
          }),
        onEnterBack: () =>
          gsap.to(document.body, {
            backgroundColor: bgColor,
            color: fgColor,
            duration: 0.6,
            ease: 'expo.out',
          }),
        onLeaveBack: () =>
          gsap.to(document.body, {
            backgroundColor: originalBg,
            color: originalFg,
            duration: 0.6,
            ease: 'expo.out',
          }),
      });
    });

    return () => {
      st?.kill();
      // Restore body to default when component unmounts
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, [bgColor, fgColor]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
