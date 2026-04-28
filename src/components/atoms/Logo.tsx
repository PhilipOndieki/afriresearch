import Link from 'next/link';
import { cn } from '@/utils/cn';

type LogoProps = {
  className?: string;
  variant?: 'dark' | 'light';
};

export function Logo({ className, variant = 'dark' }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('flex flex-col leading-none group', className)}
      aria-label="Insight AfriResearch — home"
    >
      <span
        className={cn(
          'font-serif text-2xl tracking-tight transition-colors duration-300',
          variant === 'dark'
            ? 'text-foreground group-hover:text-accent'
            : 'text-background group-hover:text-accent',
        )}
      >
        Insight
      </span>
      <span
        className={cn(
          'font-sans text-label-sm uppercase tracking-[0.25em] transition-colors duration-300',
          variant === 'dark' ? 'text-muted' : 'text-background/70',
        )}
      >
        AfriResearch
      </span>
    </Link>
  );
}
