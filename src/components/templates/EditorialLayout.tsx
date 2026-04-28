import { cn } from '@/utils/cn';

type EditorialLayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export function EditorialLayout({ children, className }: EditorialLayoutProps) {
  return <div className={cn('', className)}>{children}</div>;
}

type EditorialSectionProps = {
  children: React.ReactNode;
  className?: string;
  fullBleed?: boolean;
};

export function EditorialSection({
  children,
  className,
  fullBleed = false,
}: EditorialSectionProps) {
  return (
    <section className={cn(fullBleed ? '' : 'container-site', 'section-pad', className)}>
      {children}
    </section>
  );
}
