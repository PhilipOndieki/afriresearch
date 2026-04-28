import { cn } from '@/utils/cn';
import type { TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
};

export function Textarea({ className, error, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full px-4 py-3 bg-background border font-sans text-body-md text-foreground placeholder:text-muted-foreground transition-colors duration-300 outline-none resize-y min-h-[140px]',
        error ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-foreground',
        className,
      )}
      {...props}
    />
  );
}
