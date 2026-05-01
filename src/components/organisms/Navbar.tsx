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

// One representative image per nav destination, sourced only from existing config keys
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

  const overlayRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const gsapRef = useRef<GsapModule | null>(null);

  // Pre-load GSAP so event handlers don't async-import on each call
  useEffect(() => {
    import('@/lib/gsap').then((mod) => {
      gsapRef.current = mod;
    });
  }, []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Route change: close nav
  useEffect(() => {
    setNavOpen(false);
  }, [pathname, setNavOpen]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [navOpen]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && navOpen) setNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen, setNavOpen]);

  // GSAP: overlay slide + link stagger
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
      // Reset links immediately, then slide overlay back down
      gsap.set(links, { autoAlpha: 0, y: 32 });
      setActivePreview(null);
      if (prefersReduced) {
        gsap.set(overlay, { y: '100%' });
        return;
      }
      gsap.to(overlay, { y: '100%', duration: 0.5, ease: 'expo.in' });
    }
  }, [navOpen]);

  // Hover: dim siblings via GSAP, reveal preview via state
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

  // Focus trap inside overlay
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
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-400',
          scrolled || navOpen
            ? 'bg-background/95 backdrop-blur-sm border-b border-border'
            : 'bg-transparent',
        )}
      >
        <div className="container-site">
          <nav
            className="flex items-center justify-between h-16 md:h-20"
            aria-label="Main navigation"
          >
            <Logo variant={lightNav ? 'light' : 'dark'} />

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Contact us — always visible */}
              <Link
                href="/contact"
                className={cn(
                  'font-sans text-label-sm uppercase tracking-widest px-4 py-2 border transition-all duration-400 text-nowrap',
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
                  'flex flex-col justify-center gap-[5px] w-10 h-10 items-center',
                  lightNav && !navOpen ? 'text-background' : 'text-foreground',
                )}
                aria-label={navOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={navOpen}
                aria-haspopup="dialog"
              >
                <span
                  className={cn(
                    'w-[22px] h-px bg-current transition-all duration-300 origin-center',
                    navOpen && 'rotate-45 translate-y-[8px]',
                  )}
                />
                <span
                  className={cn(
                    'w-[22px] h-px bg-current transition-all duration-300',
                    navOpen && 'opacity-0 scale-x-0',
                  )}
                />
                <span
                  className={cn(
                    'w-[15px] h-px bg-current transition-all duration-300 origin-center',
                    navOpen ? '-rotate-45 -translate-y-[8px] w-[22px]' : 'self-end mr-[0px]',
                  )}
                />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Full-viewport overlay ─────────────────────────────────────── */}
      {/* Initial state: pushed off-screen below (translateY 100%). GSAP animates it up. */}
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
        <div className="relative flex flex-col justify-between flex-1 px-6 pt-0 pb-12 sm:px-8 md:px-12 lg:px-16 xl:px-20 min-w-0">
          {/* Top bar mirrors the header layout */}
          <div className="flex items-center justify-between h-16 md:h-20">
            <Logo variant="light" />
            <button
              onClick={() => setNavOpen(false)}
              className="flex items-center justify-center w-10 h-10 text-background"
              aria-label="Close navigation menu"
            >
              {/* × icon */}
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
          <nav aria-label="Site navigation">
            <ul className="space-y-0">
              {navItems.map((item, i) => (
                <li key={item.href}>
                  <Link
                    ref={(el) => {
                      navLinksRef.current[i] = el;
                    }}
                    href={item.href}
                    style={{ opacity: 0 }}
                    className="group flex items-baseline gap-4 py-2 md:py-3 font-serif leading-none text-background transition-colors duration-200 hover:text-white"
                    onMouseEnter={() => handleLinkEnter(item.href)}
                    onMouseLeave={handleLinkLeave}
                    onFocus={() => handleLinkEnter(item.href)}
                    onBlur={handleLinkLeave}
                    tabIndex={navOpen ? 0 : -1}
                  >
                    <span className="font-sans text-label-sm text-background/30 tracking-widest w-6 shrink-0 group-hover:text-background/50 transition-colors">
                      0{i + 1}
                    </span>
                    <span className="text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.02em]">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom: tagline */}
          <p className="font-sans text-label-sm text-background/25 uppercase tracking-widest">
            Insight AfriResearch Ltd — Nairobi, Kenya
          </p>
        </div>

        {/* ── Right column: preview image (desktop only) ── */}
        <div
          className="hidden lg:block relative w-[42%] shrink-0 overflow-hidden"
          aria-hidden="true"
        >
          {/* Default dark gradient when nothing is hovered */}
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
