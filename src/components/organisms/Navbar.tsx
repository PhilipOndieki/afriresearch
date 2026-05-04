'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/atoms/Logo';
import { navItems } from '@/config/nav';
import { images } from '@/config/images';
import { projects } from '@/config/projects';
import { useUiStore } from '@/store/uiStore';
import { cn } from '@/utils/cn';

const NAV_PREVIEWS: Record<string, string> = {
  '/services': images.services.architecture,
  '/projects': projects[0]?.coverImage ?? images.projects.aljazeraResidency,
  '/about': images.about.teamPhoto,
  '/training': images.training.workshop,
  '/contact': images.contact.office,
};

type GsapModule = typeof import('@/lib/gsap');

export function Navbar() {
  const pathname = usePathname();
  const { navOpen, toggleNav, setNavOpen } = useUiStore();
  const [scrolled, setScrolled] = useState(false);
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const [logoVisible, setLogoVisible] = useState(true);

  const overlayRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const gsapRef = useRef<GsapModule | null>(null);

  useEffect(() => {
    import('@/lib/gsap').then((mod) => {
      gsapRef.current = mod;
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setNavOpen(false);
  }, [pathname, setNavOpen]);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [navOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && navOpen) setNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen, setNavOpen]);

  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setLogoVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const links = navLinksRef.current.filter((l): l is HTMLAnchorElement => l !== null);
    const gsap = gsapRef.current?.gsap;
    if (!overlay || !gsap) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (navOpen) {
      if (prefersReduced) {
        gsap.set(overlay, { y: '0%', autoAlpha: 1 });
        gsap.set(links, { autoAlpha: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline();
      tl.fromTo(overlay, { y: '100%' }, { y: '0%', duration: 0.7, ease: 'expo.inOut' });
      tl.fromTo(
        links,
        { autoAlpha: 0, y: 32 },
        { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out' },
        '-=0.15',
      );
    } else {
      gsap.set(links, { autoAlpha: 0, y: 32 });
      setActivePreview(null);
      if (prefersReduced) {
        gsap.set(overlay, { y: '100%' });
        return;
      }
      gsap.to(overlay, { y: '100%', duration: 0.5, ease: 'expo.in' });
    }
  }, [navOpen]);

  const handleLinkEnter = useCallback((href: string) => {
    setActivePreview(href);
    const gsap = gsapRef.current?.gsap;
    if (!gsap) return;
    navLinksRef.current.forEach((link, i) => {
      if (!link) return;
      const isHovered = navItems[i].href === href;
      gsap.to(link, { opacity: isHovered ? 1 : 0.28, duration: 0.18, overwrite: 'auto' });
    });
  }, []);

  const handleLinkLeave = useCallback(() => {
    setActivePreview(null);
    const gsap = gsapRef.current?.gsap;
    if (!gsap) return;
    navLinksRef.current.forEach((link) => {
      if (!link) return;
      gsap.to(link, { opacity: 1, duration: 0.18, overwrite: 'auto' });
    });
  }, []);

  const handleOverlayKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex="0"]',
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, []);

  const isHomePage = pathname === '/';
  const lightNav = isHomePage && !scrolled && !navOpen;

  return (
    <>
      {/* ── Fixed header bar ─────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-400 bg-transparent">
        <div className="container-site">
          <nav
            className="flex items-center justify-between h-14 sm:h-16 md:h-20"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Logo
              variant={lightNav ? 'light' : 'dark'}
              className={cn(
                'transition-opacity duration-500',
                logoVisible ? 'opacity-100' : 'opacity-0 pointer-events-none',
              )}
            />

            {/* Right side controls */}
            <div className="flex items-center gap-2 sm:gap-3">

              {/* Contact us — hidden on xs, visible from sm */}
              <Link
                href="/contact"
                className={cn(
                  'hidden sm:inline-flex items-center justify-center font-sans text-label-sm uppercase tracking-widest border transition-all duration-400 text-nowrap',
                  'px-3 py-1.5 md:px-4 md:py-2',
                  lightNav
                    ? 'border-background/50 text-background hover:bg-background hover:text-foreground'
                    : 'border-foreground/40 text-foreground hover:border-foreground hover:bg-foreground hover:text-background',
                )}
              >
                Contact us
              </Link>

              {/* Hamburger — all breakpoints */}
              <button
                onClick={toggleNav}
                className={cn(
                  'flex flex-col justify-center gap-[5px] sm:gap-[6px] w-10 h-10 sm:w-12 sm:h-12 items-center shrink-0',
                  lightNav && !navOpen ? 'text-background' : 'text-foreground',
                )}
                aria-label={navOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={navOpen}
                aria-haspopup="dialog"
              >
                {/* Top bar */}
                <span
                  className={cn(
                    'block h-px bg-current transition-all duration-300 origin-center',
                    navOpen
                      ? 'w-[22px] sm:w-[28px] rotate-45 translate-y-[3px] sm:translate-y-[3.5px]'
                      : 'w-[22px] sm:w-[32px]',
                  )}
                />
                {/* Bottom bar — hides mid-animation then reappears as second X arm */}
                <span
                  className={cn(
                    'block h-px bg-current transition-all duration-300 origin-center',
                    navOpen
                      ? 'w-[22px] sm:w-[28px] -rotate-45 -translate-y-[3px] sm:-translate-y-[3.5px]'
                      : 'w-[28px] sm:w-[40px]',
                  )}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Full-viewport overlay ─────────────────────────────────────── */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!navOpen}
        style={{ transform: 'translateY(100%)' }}
        className="fixed inset-0 z-50 bg-black flex overflow-hidden"
        onKeyDown={handleOverlayKeyDown}
      >
        {/* ── Left column: top bar + nav links ── */}
        <div className="relative flex flex-col justify-between flex-1 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-0 pb-8 sm:pb-12 min-w-0 ">
          {/* Top bar — matches header height */}
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 shrink-0">
            <Logo variant="light" />
            <button
              onClick={() => setNavOpen(false)}
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 text-background"
              aria-label="Close navigation menu"
            >
              <span className="relative w-5 h-5 block">
                <span className="absolute inset-0 flex items-center">
                  <span className="w-full h-px bg-current rotate-45" />
                </span>
                <span className="absolute inset-0 flex items-center">
                  <span className="w-full h-px bg-current -rotate-45" />
                </span>
              </span>
            </button>
          </div>

          {/* Nav links */}
          <nav aria-label="Site navigation" className="flex-1 flex flex-col justify-center py-6">
            <ul className="space-y-0">
              {navItems.map((item, i) => (
                <li key={item.href}>
                  <Link
                    ref={(el) => {
                      navLinksRef.current[i] = el;
                    }}
                    href={item.href}
                    style={{ opacity: 0 }}
                    className="group flex items-center py-2 sm:py-2 md:py-3 font-serif leading-none text-background transition-colors duration-200 hover:text-white"
                    onMouseEnter={() => handleLinkEnter(item.href)}
                    onMouseLeave={handleLinkLeave}
                    onFocus={() => handleLinkEnter(item.href)}
                    onBlur={handleLinkLeave}
                    tabIndex={navOpen ? 0 : -1}
                  >
                    {/* Expanding dash */}
                    <span className="w-0 group-hover:w-4 h-px bg-background opacity-0 group-hover:opacity-100 transition-all duration-300 ease-expo-out shrink-0 group-hover:mr-3" />
                    <span className="text-[clamp(2rem,7vw,3.5rem)] sm:text-[clamp(2rem,5vw,2.75rem)] lg:text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.01em]">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom: tagline + contact on mobile */}
          <div className="shrink-0 space-y-4">
            {/* Contact link — visible only on xs where header button is hidden */}
            <Link
              href="/contact"
              className="sm:hidden inline-flex items-center gap-2 font-sans text-label-sm uppercase tracking-widest text-background/60 hover:text-background transition-colors"
              tabIndex={navOpen ? 0 : -1}
            >
              Contact us
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <p className="font-sans text-label-sm text-background/25 uppercase tracking-widest">
              Insight AfriResearch Ltd — Nairobi, Kenya
            </p>
          </div>
        </div>

        {/* ── Right column: preview image (desktop only) ── */}
        <div
          className="hidden lg:block relative w-[42%] shrink-0 overflow-hidden"
          aria-hidden="true"
        >
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-l from-zinc-900/60 to-transparent z-10 transition-opacity duration-400',
              activePreview ? 'opacity-0' : 'opacity-100',
            )}
          />
          {navItems.map((item) => (
            <div
              key={item.href}
              className={cn(
                'absolute inset-0 transition-opacity duration-400 ease-expo-out',
                activePreview === item.href ? 'opacity-100' : 'opacity-0',
              )}
            >
              <Image
                src={NAV_PREVIEWS[item.href] ?? images.about.office}
                alt={`${item.label} preview`}
                fill
                sizes="42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/15" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}