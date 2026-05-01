'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { images } from '@/config/images';
import { cn } from '@/utils/cn';

const SLIDES = [
  {
    index: '01',
    label: 'Services',
    href: '/services',
    src: images.services.architecture,
    srcNext: images.projects.aljazeraResidency,
  },
  {
    index: '02',
    label: 'Projects',
    href: '/projects',
    src: images.projects.aljazeraResidency,
    srcNext: images.about.teamPhoto,
  },
  {
    index: '03',
    label: 'About',
    href: '/about',
    src: images.about.teamPhoto,
    srcNext: images.training.workshop,
  },
  {
    index: '04',
    label: 'Training',
    href: '/training',
    src: images.training.workshop,
    srcNext: images.contact.office,
  },
  {
    index: '05',
    label: 'Contact',
    href: '/contact',
    src: images.contact.office,
    srcNext: images.services.architecture,
  },
] as const;

const INTERVAL_MS = 6000;
const FADE_MS = 1200;

export function HeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [headlineVisible, setHeadlineVisible] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const advance = useCallback(
    (next: number) => {
      setPrev(current);
      setCurrent(next);
      // Clear prev after cross-fade
      setTimeout(() => setPrev(null), FADE_MS + 100);
    },
    [current],
  );

  const goTo = useCallback(
    (index: number) => {
      if (index === current) return;
      setUserPaused(true);
      advance(index);
    },
    [advance, current],
  );

  // Auto-advance
  useEffect(() => {
    if (userPaused) return;
    timerRef.current = setTimeout(() => {
      advance((current + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, userPaused, advance]);

  // Resume auto-advance 10s after user interaction
  useEffect(() => {
    if (!userPaused) return;
    const t = setTimeout(() => setUserPaused(false), 10000);
    return () => clearTimeout(t);
  }, [userPaused, current]);

  // GSAP Ken Burns on active slide + headline entrance
  useEffect(() => {
    let killed = false;
    setHeadlineVisible(false);

    import('@/lib/gsap').then(({ gsap }) => {
      if (killed) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const container = containerRef.current;
      if (!container) return;

      const activeImg = container.querySelector<HTMLElement>(`[data-slide="${current}"] img`);
      if (activeImg && !prefersReduced) {
        gsap.fromTo(
          activeImg,
          { scale: 1 },
          { scale: 1.05, duration: INTERVAL_MS / 1000 + 0.2, ease: 'none' },
        );
      }

      // Headline entrance (runs once on mount)
      const headline = container.querySelector<HTMLElement>('[data-hero-headline]');
      const ctas = container.querySelectorAll<HTMLElement>('[data-hero-cta]');
      if (headline && !prefersReduced) {
        gsap.fromTo(
          headline,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, delay: 0.5, ease: 'power3.out' },
        );
        gsap.fromTo(
          ctas,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, delay: 0.85, stagger: 0.12, ease: 'power3.out' },
        );
      }
      setHeadlineVisible(true);
    });

    return () => {
      killed = true;
    };
    // We deliberately only run the Ken Burns on slide changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <section
      ref={containerRef}
      className="relative w-screen h-[100dvh] min-h-[560px] overflow-hidden bg-foreground"
      aria-label="Hero slideshow"
    >
      {/* ── Images ─────────────────────────────────────── */}
      {SLIDES.map((slide, i) => {
        const isActive = i === current;
        const isPrev = i === prev;
        if (!isActive && !isPrev) return null;

        return (
          <div
            key={slide.src}
            data-slide={i}
            className={cn(
              'absolute inset-0 transition-opacity',
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0',
            )}
            style={{
              transitionDuration: `${FADE_MS}ms`,
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <Image
              src={slide.src}
              alt={slide.label}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-foreground/45" />
          </div>
        );
      })}

      {/* Preload next image (invisible) */}
      <div className="sr-only" aria-hidden="true">
        <Image
          src={SLIDES[(current + 1) % SLIDES.length].src}
          alt=""
          width={1}
          height={1}
          priority={false}
        />
      </div>

      {/* ── Section label (top-left) ─────────────────── */}
      <div className="absolute top-20 md:top-24 left-0 right-0 z-20 container-site pointer-events-none">
        <p className="font-sans text-label-sm uppercase tracking-[0.2em] text-background/50">
          {SLIDES[current].index} —{' '}
          <span className="text-background/80">{SLIDES[current].label}</span>
        </p>
      </div>

      {/* ── Main headline + CTAs (bottom-left) ──────── */}
      <div
        data-hero-headline
        className={cn(
          'absolute bottom-0 left-0 right-0 z-20 container-site pb-24 md:pb-28',
          !headlineVisible && 'opacity-0',
        )}
      >
        <h1 className="font-serif text-display-2xl text-background mb-4 leading-none text-balance max-w-4xl">
          Design. <span className="text-accent">Research.</span> Training.
        </h1>
        <p className="font-sans text-body-xl text-background/65 max-w-lg mb-8">
          Nairobi-based multidisciplinary firm delivering architecture, engineering, and research
          across East Africa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            data-hero-cta
            href="/projects"
            className="btn-primary bg-background text-foreground hover:bg-accent hover:text-background min-w-[180px] opacity-0"
          >
            View Projects
          </Link>
          <Link
            data-hero-cta
            href="/contact"
            className="btn-outline border-background/60 text-background hover:bg-background hover:text-foreground min-w-[180px] opacity-0"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* ── Slide indicators (bottom-centre) ─────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2"
        role="tablist"
        aria-label="Slide navigation"
      >
        {SLIDES.map((slide, i) => (
          <button
            key={slide.label}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${slide.index}: ${slide.label}`}
            onClick={() => goTo(i)}
            className={cn(
              'h-[3px] rounded-full transition-all duration-400 ease-expo-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-background',
              i === current ? 'w-8 bg-background' : 'w-4 bg-background/35 hover:bg-background/60',
            )}
          />
        ))}
      </div>

      {/* ── Scroll hint ───────────────────────────────── */}
      <div
        className="absolute bottom-8 right-0 container-site z-20 flex flex-col items-end gap-2 text-background/35 pointer-events-none"
        aria-hidden="true"
      >
        <span className="font-sans text-label-sm uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-background/35 to-transparent" />
      </div>
    </section>
  );
}
