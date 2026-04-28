import { cn } from '@/utils/cn';
import { FadeUp } from '@/components/animations/FadeUp';

type SectionHeadingProps = {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  light?: boolean;
};

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  className,
  titleClassName,
  light = false,
}: SectionHeadingProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  }[align];

  return (
    <div className={cn('max-w-2xl', alignClass, className)}>
      {label && (
        <FadeUp delay={0}>
          <p className={cn('label-text mb-4', light && 'text-background/60')}>{label}</p>
        </FadeUp>
      )}
      <FadeUp delay={0.1}>
        <h2
          className={cn(
            'font-serif text-display-md text-balance',
            light ? 'text-background' : 'text-foreground',
            titleClassName,
          )}
        >
          {title}
        </h2>
      </FadeUp>
      {subtitle && (
        <FadeUp delay={0.2}>
          <p className={cn('text-body-lg mt-4', light ? 'text-background/70' : 'text-muted')}>
            {subtitle}
          </p>
        </FadeUp>
      )}
    </div>
  );
}
