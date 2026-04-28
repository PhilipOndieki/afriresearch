import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'accent' | 'outline' | 'muted';

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-foreground text-background',
  accent: 'bg-accent text-background',
  outline: 'border border-foreground text-foreground',
  muted: 'bg-surface text-muted',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1 font-sans text-label-sm uppercase tracking-widest',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
