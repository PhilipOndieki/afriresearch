import Image from 'next/image';
import { PageShell } from '@/components/templates/PageShell';
import { ServicesEditorial } from '@/components/organisms/ServicesEditorial';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { FadeUp } from '@/components/animations/FadeUp';
import { buildMetadata } from '@/lib/seo';
import { images } from '@/config/images';
import { services } from '@/config/services';

export const metadata = buildMetadata({
  title: 'Services',
  description:
    'Architectural Design, Engineering Services, Research and Consultancy, Training, and Project Supervision across East Africa.',
  canonical: '/services',
});

export default function ServicesPage() {
  return (
    <PageShell>
      {/* Page header */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={images.hero.concrete}
          alt="Services — Insight AfriResearch"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="relative z-10 container-site pb-12">
          <FadeUp>
            <p className="label-text text-background/60 mb-3">What we do</p>
            <h1 className="font-serif text-display-xl text-background">Services</h1>
          </FadeUp>
        </div>
      </section>

      {/* Intro */}
      <section className="section-pad-sm container-site">
        <SectionHeading
          title="Five disciplines under one roof."
          subtitle="From the first sketch to the final inspection, we deliver the full spectrum of built environment services. Each discipline feeds the others, so your project benefits from integrated thinking at every stage."
          className="max-w-3xl"
        />
      </section>

      {/* Editorial service sections */}
      <ServicesEditorial services={services} />

      {/* CTA */}
      <section className="section-pad bg-surface">
        <div className="container-site text-center">
          <SectionHeading
            label="Ready to start"
            title="Bring us your brief."
            subtitle="We work with governments, NGOs, and private developers. Tell us what you are building."
            align="center"
            className="max-w-xl mx-auto mb-8"
          />
          <FadeUp delay={0.3}>
            <a href="/contact" className="btn-primary">
              Start a Conversation
            </a>
          </FadeUp>
        </div>
      </section>
    </PageShell>
  );
}
