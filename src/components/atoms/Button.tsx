import { cn } from '@/utils/cn';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'text';
type Size = 'sm' | 'md' | 'lg';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  loading?: boolean;
};

const variantClasses: Record<Variant, string> = {
  primary: 'bg-foreground text-background hover:bg-accent',
  outline: 'border border-foreground text-foreground hover:bg-foreground hover:text-background',
  text: 'text-foreground hover:text-accent p-0',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2 text-label-sm',
  md: 'px-8 py-3 text-label-md',
  lg: 'px-10 py-4 text-label-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-sans uppercase tracking-widest transition-all duration-400 ease-expo-out disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        variant !== 'text' && sizeClasses[size],
        className,
      )}
      disabled={disabled ?? loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </button>
  );
}
