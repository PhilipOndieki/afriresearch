import { cn } from '@/utils/cn';
import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export function Input({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full px-4 py-3 bg-background border font-sans text-body-md text-foreground placeholder:text-muted-foreground transition-colors duration-300 outline-none',
        error ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-foreground',
        className,
      )}
      {...props}
    />
  );
}
