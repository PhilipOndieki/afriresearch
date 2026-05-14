import Image from 'next/image';
import Link from 'next/link';
import { PageShell } from '@/components/templates/PageShell';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { FadeUp } from '@/components/animations/FadeUp';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import { buildMetadata } from '@/lib/seo';
import { hrServiceGroups } from '@/config/hrServices';

export const metadata = buildMetadata({
  title: 'HR Consultancy Services',
  description:
    'Human Resource Consultancy Services including job evaluation, salary surveys, HR audits, OSHA compliance, work environment surveys, and HRMIS across Kenya and East Africa.',
  canonical: '/hr-consultancy',
});


export default function HrConsultancyPage() {
  return (
    <PageShell>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
      <Image
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=85&auto=format&fit=crop"
          alt="HR Consultancy — Insight AfriResearch"
          fill
          priority
          sizes="100vw"
          className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
      <div className="relative z-10 container-site pb-12">
          <FadeUp>
          <p className="label-text text-background/60 mb-3">Core service</p>
          <h1 className="font-serif text-display-xl text-background">HR Consultancy</h1>
          </FadeUp>
      </div>
      </section>

      {/* ── Intro ────────────────────────────────────────── */}
      <section className="section-pad container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading
              label="Who we serve"
              title="HR expertise built for the African context."
              subtitle="We work with government ministries, county governments, NGOs, development partners, and private sector organisations who need rigorous, practical HR consultancy grounded in Kenyan law and East African organisational realities."
            />
            <FadeUp delay={0.3}>
              <Link href="/contact?service=hr-consultancy" className="btn-primary mt-8 inline-flex">
                Start a Conversation
              </Link>
            </FadeUp>
          </div>
          <ScrollReveal from="right">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=85&auto=format&fit=crop"
                alt="HR team working"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Service groups ───────────────────────────────── */}
      <section id="services" className="section-pad bg-surface">
        <div className="container-site">
          <FadeUp>
            <SectionHeading
              label="Our HR Services"
              title="Nine services. Three practice areas."
              subtitle="Every engagement is scoped to your organisation's specific needs. We can deliver individual services or a fully integrated HR consultancy programme."
              className="mb-16"
            />
          </FadeUp>

          <div className="space-y-20">
            {hrServiceGroups.map((group, gi) => (
              <div key={group.groupSlug} id={group.groupSlug}>
                {/* Group header */}
                <FadeUp>
                  <div className="border-t-2 border-accent pt-8 mb-10">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <p className="label-text mb-2 text-accent">0{gi + 1}</p>
                        <h2 className="font-serif text-display-md text-foreground">
                          {group.groupTitle}
                        </h2>
                      </div>
                      <p className="font-sans text-body-md text-muted max-w-md sm:text-right">
                        {group.summary}
                      </p>
                    </div>
                  </div>
                </FadeUp>

                {/* Service cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.services.map((service, si) => (
                    <FadeUp key={service.slug} delay={si * 0.1}>
                      <div className="bg-background border border-border p-8 flex flex-col h-full group hover:border-accent transition-colors duration-400">
                        {/* Icon */}
                        <div className="w-10 h-10 mb-6 text-accent">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-full h-full"
                          >
                            <path d={service.icon} />
                          </svg>
                        </div>
                        <h3 className="font-serif text-display-sm text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="font-sans text-body-md text-muted flex-1">
                          {service.description}
                        </p>
                        <div className="mt-6 pt-6 border-t border-border">
                          <Link
                            href={`/contact?service=hr-consultancy&topic=${service.slug}`}
                            className="btn-text text-sm"
                          >
                            Enquire
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M3 8h10M9 4l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </FadeUp>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full bleed image ─────────────────────────────── */}
      <ParallaxImage className="h-[45vh]" speed={0.15}>
        <Image
          src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1920&q=85&auto=format&fit=crop"
          alt="HR consultancy in practice"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </ParallaxImage>

      {/* ── Why choose us ────────────────────────────────── */}
      <section className="section-pad container-site">
        <SectionHeading
          label="Why Insight AfriResearch"
          title="HR consultancy with depth and local context."
          className="mb-12"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
          {[
            {
              title: 'Kenyan legal grounding',
              body: 'Every recommendation we make is anchored in the Employment Act, Labour Relations Act, and OSHA Kenya. No generic frameworks — context-specific advice.',
            },
            {
              title: 'Cross-sector experience',
              body: 'We have worked with county governments, national ministries, international NGOs, hospitality groups, and private developers. We understand how HR challenges differ by sector.',
            },
            {
              title: 'Practical deliverables',
              body: 'Our reports are written for implementation, not filing. Every engagement ends with a clear action plan, ownership matrix, and timeline.',
            },
            {
              title: 'Multidisciplinary lens',
              body: 'Our HR team works alongside our research, engineering, and project management practices. This gives us a broader view of organisational challenges than a pure HR firm.',
            },
            {
              title: 'Confidential and independent',
              body: 'We operate with strict confidentiality. Our assessments are independent — we tell clients what they need to hear, not what is comfortable.',
            },
            {
              title: 'East Africa reach',
              body: 'Active project experience across Kenya, Uganda, and Tanzania. We understand the regulatory and cultural nuances of operating across the region.',
            },
          ].map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.08}>
              <div className="border-t border-border pt-6">
                <h3 className="font-serif text-display-sm text-foreground mb-3">{item.title}</h3>
                <p className="font-sans text-body-md text-muted">{item.body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="section-pad bg-foreground">
        <div className="container-site text-center">
          <FadeUp>
            <p className="label-text text-background/50 mb-4">Ready to start</p>
            <h2 className="font-serif text-display-lg text-background mb-5 text-balance max-w-2xl mx-auto">
              Bring us your HR challenge.
            </h2>
            <p className="font-sans text-body-lg text-background/60 max-w-xl mx-auto mb-8">
              Whether you need a single audit or a full HR transformation programme, we scope every
              engagement to your organisation's size, sector, and budget.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <Link
              href="/contact?service=hr-consultancy"
              className="btn-primary bg-accent hover:bg-accent-light border-accent"
            >
              Request a Consultation
            </Link>
          </FadeUp>
        </div>
      </section>
    </PageShell>
  );
}