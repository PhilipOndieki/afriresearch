'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/config/images';

const panels = [
  { src: images.hero.marble, label: 'Design' },
  { src: images.hero.concrete, label: 'Research' },
  { src: images.hero.wood, label: 'Training' },
  { src: images.hero.steel, label: 'Build' },
];

export function HeroTextureSlider() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('@/lib/gsap').then(({ gsap, ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      const panels = containerRef.current?.querySelectorAll('[data-panel]');
      if (!panels) return;

      panels.forEach((panel, i) => {
        const fromX = i % 2 === 0 ? '-100%' : '100%';
        gsap.from(panel, {
          x: fromX,
          duration: 1.2 + i * 0.15,
          ease: 'expo.out',
          delay: i * 0.1,
        });
      });

      const headline = containerRef.current?.querySelector('[data-headline]');
      if (headline) {
        gsap.from(headline, {
          opacity: 0,
          y: 30,
          duration: 1,
          delay: 0.8,
          ease: 'power3.out',
        });
      }

      const ctas = containerRef.current?.querySelectorAll('[data-cta]');
      if (ctas) {
        gsap.from(ctas, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 1.1,
          stagger: 0.15,
          ease: 'power3.out',
        });
      }
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-end overflow-hidden bg-foreground"
      aria-label="Hero"
    >
      {/* Texture panels grid */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
        {panels.map((panel, i) => (
          <div key={panel.label} data-panel className="relative overflow-hidden">
            <Image
              src={panel.src}
              alt={panel.label}
              fill
              priority={i < 2}
              sizes="50vw"
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-foreground/40" />
          </div>
        ))}
      </div>

      {/* Divider cross */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-background/10 -translate-x-1/2" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-background/10 -translate-y-1/2" />
      </div>

      {/* Panel labels */}
      {panels.map((panel, i) => (
        <div
          key={panel.label}
          className={`absolute font-sans text-label-sm uppercase tracking-widest text-background/30
            ${i === 0 ? 'top-8 left-8' : i === 1 ? 'top-8 right-8' : i === 2 ? 'bottom-[52%] left-8' : 'bottom-[52%] right-8'}`}
        >
          {panel.label}
        </div>
      ))}

      {/* Headline */}
      <div
        data-headline
        className="relative z-10 text-center px-6 pb-24 md:pb-32 w-full max-w-5xl mx-auto"
      >
        <p className="font-sans text-label-md uppercase tracking-widest text-background/50 mb-6">
          Insight AfriResearch Ltd
        </p>
        <h1 className="font-serif text-display-2xl text-background mb-6 text-balance leading-none">
          Design. <span className="text-accent">Research.</span> Training.
        </h1>
        <p className="font-sans text-body-xl text-background/70 max-w-xl mx-auto mb-10">
          Nairobi-based multidisciplinary firm delivering architecture, engineering, and research
          across East Africa.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            data-cta
            href="/projects"
            className="btn-primary bg-background text-foreground hover:bg-accent hover:text-background min-w-[180px]"
          >
            View Projects
          </Link>
          <Link
            data-cta
            href="/contact"
            className="btn-outline border-background/60 text-background hover:bg-background hover:text-foreground min-w-[180px]"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-background/40">
        <span className="font-sans text-label-sm uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-background/40 to-transparent" />
      </div>
    </section>
  );
}
