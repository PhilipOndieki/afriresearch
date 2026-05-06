import Image from 'next/image';
import Link from 'next/link';
import { FadeUp } from '@/components/animations/FadeUp';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import type { Service } from '@/types/service';

type ServicesEditorialProps = {
  services: Service[];
};

export function ServicesEditorial({ services }: ServicesEditorialProps) {
  return (
    <section aria-label="Services">
      {services.map((service, i) => {
        const isEven = i % 2 === 0;
        return (
          <div
            key={service.slug}
            id={service.slug}
            className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-stretch"
          >
            {/* Image */}
            <div
              className={`relative min-h-[60vh] lg:min-h-screen ${isEven ? 'lg:order-first' : 'lg:order-last'}`}
            >
              <ParallaxImage className="absolute inset-0" speed={0.15}>
                <Image
                  src={service.heroImage}
                  alt={service.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </ParallaxImage>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center px-6 py-16 md:px-12 lg:px-16 xl:px-20">
              <FadeUp>
                <p className="label-text mb-4">
                  0{service.sortOrder} — {service.name}
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h2 className="font-serif text-display-lg text-foreground mb-6 text-balance">
                  {service.headline}
                </h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="font-sans text-body-lg text-muted mb-8 max-w-md">
                  {service.description}
                </p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <Link href={`/contact?service=${service.slug}`} className="btn-text">
                  Enquire about this service
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </FadeUp>
            </div>
          </div>
        );
      })}
    </section>
  );
}
