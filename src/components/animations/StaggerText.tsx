'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';

type StaggerTextProps = {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  staggerDelay?: number;
  by?: 'word' | 'line';
};

export function StaggerText({
  children,
  as: Tag = 'span',
  className,
  delay = 0,
  staggerDelay = 0.04,
  by = 'word',
}: StaggerTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let st: import('gsap/ScrollTrigger').ScrollTrigger | null = null;

    import('@/lib/gsap').then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);
      if (!ref.current) return;

      const targets = ref.current.querySelectorAll('[data-word]');

      const tween = gsap.fromTo(
        targets,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay,
          stagger: staggerDelay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      );

      st = tween.scrollTrigger as import('gsap/ScrollTrigger').ScrollTrigger | null;
    });

    return () => {
      st?.kill();
    };
  }, [delay, staggerDelay, by]);

  const units = by === 'word' ? children.split(' ') : children.split('\n');

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={cn('', className)} aria-label={children}>
      {units.map((unit, i) => (
        <span key={i} data-word className="inline-block opacity-0" aria-hidden="true">
          {unit}
          {i < units.length - 1 && (by === 'word' ? ' ' : <br />)}
        </span>
      ))}
    </Tag>
  );
}
