'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function HeroStatic() {
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import('@/lib/gsap').then(({ gsap }) => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        textRef.current?.querySelectorAll('[data-animate]') ?? [],
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.13 },
        0.35,
      );

      tl.fromTo(
        imageRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 1.0, ease: 'expo.out' },
        0.4,
      );
    });
  }, []);

  return (
    <section className="relative min-h-screen bg-foreground flex items-stretch overflow-hidden">

      {/* ── Left: Text column ─────────────────────────────────────────── */}
      <div
        ref={textRef}
        className="relative z-10 flex flex-col justify-center w-full lg:w-[52%] px-6 sm:px-10 lg:px-16 xl:px-24 pt-28 pb-16 lg:pt-10 lg:pb-0"
      >

        {/* Main heading */}
        <h1
          data-animate
          className="font-serif text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.08] text-background mb-5 opacity-0 max-w-lg"
        >
          People strategy for a changing Africa.
        </h1>

        {/* Subtext */}
        <p
          data-animate
          className="font-sans text-[0.85rem] text-background/50 mb-10 opacity-0 tracking-wide"
        >
          HR Consultancy.&nbsp; Research.&nbsp; Training.&nbsp; Architectural Design.
        </p>

        {/* CTA */}
        <div data-animate className="opacity-0">
          <Link
            href="/hr-consultancy"
            className="inline-flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.15em] text-background border border-background/30 px-6 py-3 transition-all duration-400 hover:bg-background hover:text-foreground"
          >
            Our Services
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Right: Image column — flush to viewport right edge ────────── */}
      <div
        ref={imageRef}
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[52%] opacity-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=85&auto=format&fit=crop"
          alt="HR professionals in a strategic meeting"
          fill
          priority
          sizes="52vw"
          className="object-cover object-center"
        />
        {/* Left edge gradient — blends image into dark background */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/30 to-transparent" />
        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-foreground/20" />
      </div>

      {/* Mobile image — below text on small screens */}
      <div className="lg:hidden absolute inset-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=75&auto=format&fit=crop"
          alt="HR professionals"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

    </section>
  );
}