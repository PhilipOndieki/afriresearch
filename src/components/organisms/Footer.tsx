'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from '@/components/atoms/Logo';
import { navItems } from '@/config/nav';
import { images } from '@/config/images';
import { siteConfig } from '@/config/site';
import { cn } from '@/utils/cn';

const NAV_PREVIEWS: Record<string, string> = {
  '/services': images.services.architecture,
  '/projects': images.projects.aljazeraResidency,
  '/about': images.about.teamPhoto,
  '/training': images.training.workshop,
  '/contact': images.contact.office,
};

export function Footer() {
  const year = new Date().getFullYear();
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const gsapRef = useRef<typeof import('@/lib/gsap') | null>(null);

  useEffect(() => {
    import('@/lib/gsap').then((mod) => {
      gsapRef.current = mod;
    });
  }, []);

  const handleEnter = useCallback((href: string) => {
    setActivePreview(href);
    const gsap = gsapRef.current?.gsap;
    if (!gsap) return;
    linkRefs.current.forEach((link, i) => {
      if (!link) return;
      gsap.to(link, {
        opacity: navItems[i].href === href ? 1 : 0.25,
        duration: 0.18,
        overwrite: 'auto',
      });
    });
  }, []);

  const handleLeave = useCallback(() => {
    setActivePreview(null);
    const gsap = gsapRef.current?.gsap;
    if (!gsap) return;
    linkRefs.current.forEach((link) => {
      if (!link) return;
      gsap.to(link, { opacity: 1, duration: 0.18, overwrite: 'auto' });
    });
  }, []);

  return (
    <footer className="bg-foreground text-background">
      {/* Main footer body */}
      <div className="flex overflow-hidden">
        {/* Left column */}
        <div className="flex flex-col justify-between flex-1 px-6 pt-12 pb-8 sm:px-8 md:px-12 lg:px-16 xl:px-20 min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-12">
            <Logo variant="light" />
            <Link
              href="/contact"
              className="font-sans text-label-sm uppercase tracking-widest px-4 py-2 border border-background/40 text-background hover:bg-background hover:text-foreground transition-all duration-400"
            >
              Contact us
            </Link>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="space-y-1">
              {navItems.map((item, i) => (
                <li key={item.href}>
                  <Link
                    ref={(el) => { linkRefs.current[i] = el; }}
                    href={item.href}
                    className="group flex items-baseline gap-4 py-2 font-serif text-background hover:text-white transition-colors duration-200"
                    onMouseEnter={() => handleEnter(item.href)}
                    onMouseLeave={handleLeave}
                  >
                    <span className="font-sans text-label-sm text-background/30 tracking-widest w-6 shrink-0 group-hover:text-background/50 transition-colors">
                      0{i + 1}
                    </span>
                    <span className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.01em]">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom strip */}
          <div className="border-t border-background/10 pt-6 mt-12">
            <p className="font-sans text-body-sm text-background/40">
              &copy; {year} {siteConfig.name}. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right column — preview image (desktop only) */}
        <div className="hidden lg:block relative w-[42%] shrink-0 overflow-hidden min-h-[480px]" aria-hidden="true">
          {/* Default dark state */}
          <div className={cn(
            'absolute inset-0 bg-foreground/80 z-10 transition-opacity duration-400',
            activePreview ? 'opacity-0' : 'opacity-100',
          )} />
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
              <div className="absolute inset-0 bg-black/20" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}