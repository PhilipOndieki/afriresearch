'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/atoms/Logo';
import { navItems } from '@/config/nav';
import { useUiStore } from '@/store/uiStore';
import { cn } from '@/utils/cn';

type GsapModule = typeof import('@/lib/gsap');

export function Navbar() {
  const pathname = usePathname();
  const { navOpen, toggleNav, setNavOpen } = useUiStore();
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const overlayRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const gsapRef = useRef<GsapModule | null>(null);

  useEffect(() => {
    import('@/lib/gsap').then((mod) => {
      gsapRef.current = mod;
    });
  }, []);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      setScrolled(currentY > 60);

      if (currentY < 80) {
        // Always show at top
        setVisible(true);
      } else if (diff > 6) {
        // Scrolling down — hide
        setVisible(false);
      } else if (diff < -6) {
        // Scrolling up — show
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setNavOpen(false);
  }, [pathname, setNavOpen]);

  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [navOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && navOpen) setNavOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navOpen, setNavOpen]);

  // Mobile overlay animation
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
      tl.fromTo(overlay, { y: '100%' }, { y: '0%', duration: 0.6, ease: 'expo.inOut' });
      tl.fromTo(
        links,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
        '-=0.1',
      );
    } else {
      gsap.set(links, { autoAlpha: 0, y: 24 });
      if (prefersReduced) {
        gsap.set(overlay, { y: '100%' });
        return;
      }
      gsap.to(overlay, { y: '100%', duration: 0.45, ease: 'expo.in' });
    }
  }, [navOpen]);

  const handleOverlayKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex="0"]',
    );
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, []);

  const isHomePage = pathname === '/';
  const lightNav = isHomePage && !scrolled && !navOpen;

  return (
    <>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
          visible ? 'translate-y-0' : '-translate-y-full',
          scrolled
            ? 'bg-background/95 backdrop-blur-sm border-b border-border/30'
            : 'bg-transparent',
        )}
      >
        <div className="container-site">
          <nav
            className="flex items-center justify-between h-12 md:h-14"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Logo variant={lightNav ? 'light' : 'dark'} />

            {/* Desktop links — lg and above */}
            <div className="hidden lg:flex items-center gap-7">
              {navItems.slice(0, -1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'font-sans text-[0.7rem] uppercase tracking-[0.15em] transition-colors duration-300 whitespace-nowrap',
                    pathname === item.href
                      ? lightNav ? 'text-background' : 'text-accent'
                      : lightNav
                        ? 'text-background/60 hover:text-background'
                        : 'text-muted hover:text-foreground',
                  )}
                >
                  {item.label}
                </Link>
              ))}

              {/* Contact us — bordered */}
              <Link
                href="/contact"
                className={cn(
                  'font-sans text-[0.7rem] uppercase tracking-[0.15em] px-4 py-1.5 border transition-all duration-300 whitespace-nowrap',
                  lightNav
                    ? 'border-background/40 text-background hover:bg-background hover:text-foreground'
                    : 'border-border text-foreground hover:border-foreground',
                )}
              >
                Contact us
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={toggleNav}
              className={cn(
                'lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8 items-center shrink-0',
                lightNav && !navOpen ? 'text-background' : 'text-foreground',
              )}
              aria-label={navOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={navOpen}
            >
              <span className={cn(
                'block h-px bg-current transition-all duration-300 origin-center',
                navOpen ? 'w-5 rotate-45 translate-y-[3px]' : 'w-5',
              )} />
              <span className={cn(
                'block h-px bg-current transition-all duration-300 origin-center',
                navOpen ? 'w-5 -rotate-45 -translate-y-[3px]' : 'w-6',
              )} />
            </button>
          </nav>
        </div>
      </header>

      {/* ── Mobile overlay ───────────────────────────────────────────── */}
      <div
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!navOpen}
        style={{ transform: 'translateY(100%)' }}
        className="fixed inset-0 z-50 bg-foreground flex flex-col px-6 pb-10 lg:hidden"
        onKeyDown={handleOverlayKeyDown}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between h-12 shrink-0">
          <Logo variant="light" />
          <button
            onClick={() => setNavOpen(false)}
            className="w-8 h-8 flex items-center justify-center text-background"
            aria-label="Close menu"
          >
            <span className="relative w-4 h-4 block">
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
        <nav className="flex-1 flex flex-col justify-center">
          <ul>
            {navItems.map((item, i) => (
              <li key={item.href}>
                <Link
                  ref={(el) => { navLinksRef.current[i] = el; }}
                  href={item.href}
                  style={{ opacity: 0 }}
                  className="group flex items-center py-3 font-serif text-background hover:text-accent transition-colors duration-200"
                  tabIndex={navOpen ? 0 : -1}
                >
                  <span className="w-0 group-hover:w-3 h-px bg-accent opacity-0 group-hover:opacity-100 transition-all duration-300 shrink-0 group-hover:mr-3" />
                  <span className="text-[clamp(1.8rem,6vw,3rem)] leading-[1.2] tracking-[-0.01em]">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="font-sans text-[0.65rem] text-background/25 uppercase tracking-widest shrink-0">
          Insight AfriResearch Ltd — Nairobi, Kenya
        </p>
      </div>
    </>
  );
}