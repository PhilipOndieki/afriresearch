'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/atoms/Logo';
import { navItems } from '@/config/nav';
import { useUiStore } from '@/store/uiStore';
import { cn } from '@/utils/cn';

export function Navbar() {
  const pathname = usePathname();
  const { navOpen, toggleNav, setNavOpen } = useUiStore();
  const [scrolled, setScrolled] = useState(false);

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

  const isHomePage = pathname === '/';
  const lightNav = isHomePage && !scrolled && !navOpen;

  return (
    <>
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

            <ul className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'font-sans text-label-md uppercase tracking-widest transition-colors duration-300 link-underline',
                      pathname === item.href
                        ? 'text-accent'
                        : lightNav
                          ? 'text-background hover:text-background/70'
                          : 'text-foreground hover:text-accent',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className={cn(
                'hidden md:inline-flex items-center gap-2 font-sans text-label-sm uppercase tracking-widest px-5 py-2 transition-all duration-400',
                lightNav
                  ? 'border border-background/60 text-background hover:bg-background hover:text-foreground'
                  : 'border border-foreground text-foreground hover:bg-foreground hover:text-background',
              )}
            >
              Get in Touch
            </Link>

            <button
              onClick={toggleNav}
              className={cn(
                'md:hidden flex flex-col gap-1.5 p-2',
                lightNav && !navOpen ? 'text-background' : 'text-foreground',
              )}
              aria-label={navOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={navOpen}
            >
              <span
                className={cn(
                  'w-6 h-px bg-current transition-all duration-300',
                  navOpen && 'rotate-45 translate-y-2',
                )}
              />
              <span
                className={cn(
                  'w-6 h-px bg-current transition-all duration-300',
                  navOpen && 'opacity-0',
                )}
              />
              <span
                className={cn(
                  'w-6 h-px bg-current transition-all duration-300',
                  navOpen && '-rotate-45 -translate-y-2',
                )}
              />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-background transition-transform duration-600 ease-expo-out md:hidden',
          navOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex flex-col justify-center h-full container-site pt-20 pb-10">
          <ul className="flex flex-col gap-6 mb-12">
            {navItems.map((item, i) => (
              <li key={item.href} style={{ transitionDelay: `${i * 60}ms` }}>
                <Link
                  href={item.href}
                  className={cn(
                    'font-serif text-display-md text-foreground transition-colors duration-300 hover:text-accent block',
                    pathname === item.href && 'text-accent',
                  )}
                >
                  {item.label}
                </Link>
                {item.description && (
                  <p className="font-sans text-body-sm text-muted mt-1">{item.description}</p>
                )}
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn-primary self-start">
            Get in Touch
          </Link>
        </div>
      </div>
    </>
  );
}
