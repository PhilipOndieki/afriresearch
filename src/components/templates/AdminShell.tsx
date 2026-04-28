'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/atoms/Logo';
import { cn } from '@/utils/cn';

const adminNav = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Projects', href: '/admin/projects' },
  { label: 'Team', href: '/admin/team' },
  { label: 'Training', href: '/admin/training' },
  { label: 'Enquiries', href: '/admin/enquiries' },
  { label: 'Settings', href: '/admin/settings' },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-foreground text-background flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-background/10">
          <Logo variant="light" />
        </div>
        <nav className="flex-1 p-4 space-y-1" aria-label="Admin navigation">
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'block px-4 py-2 font-sans text-label-md uppercase tracking-widest rounded transition-colors duration-200',
                pathname === item.href
                  ? 'bg-accent text-background'
                  : 'text-background/70 hover:text-background hover:bg-background/10',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-6 border-t border-background/10">
          <Link
            href="/"
            className="font-sans text-label-sm text-background/40 hover:text-background/70 transition-colors"
          >
            View site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
