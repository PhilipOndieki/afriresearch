import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import type { Service } from '@/types/service';

type ServiceCardProps = {
  service: Service;
  className?: string;
};

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <Link href={`/services#${service.slug}`} className={cn('group block', className)}>
      <div className="relative aspect-landscape overflow-hidden mb-4">
        <Image
          src={service.heroImage}
          alt={service.name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-800 ease-expo-out group-hover:scale-105"
        />
      </div>
      <p className="label-text mb-2">0{service.sortOrder}</p>
      <h3 className="font-serif text-display-sm text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
        {service.name}
      </h3>
      <p className="font-sans text-body-sm text-muted line-clamp-2">{service.headline}</p>
    </Link>
  );
}
