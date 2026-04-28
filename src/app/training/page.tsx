import Image from 'next/image';
import { PageShell } from '@/components/templates/PageShell';
import { TrainingCalendar } from '@/components/organisms/TrainingCalendar';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { FadeUp } from '@/components/animations/FadeUp';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import { buildMetadata } from '@/lib/seo';
import { db } from '@/lib/db';
import { images } from '@/config/images';
import type { TrainingProgram, TrainingSession } from '@/types/training';
import { RegistrationForm } from './RegistrationForm';

export const metadata = buildMetadata({
  title: 'Training and Capacity Building',
  description:
    'Professional development programmes for engineers, architects, and project managers across East Africa.',
  canonical: '/training',
});

export const dynamic = 'force-dynamic';

async function getData() {
  const [programs, sessions] = await Promise.all([
    db.trainingProgram.findMany({
      where: { isActive: true },
      orderBy: { title: 'asc' },
    }),
    db.trainingSession.findMany({
      where: {
        status: { in: ['OPEN', 'FULL'] },
        startDate: { gte: new Date() },
      },
      include: {
        program: true,
        _count: { select: { registrations: true } },
      },
      orderBy: { startDate: 'asc' },
    }),
  ]);

  const typedPrograms: TrainingProgram[] = programs.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  }));

  const typedSessions: TrainingSession[] = sessions.map((s) => ({
    ...s,
    startDate: s.startDate.toISOString(),
    endDate: s.endDate.toISOString(),
    createdAt: s.createdAt.toISOString(),
    fee: Number(s.fee),
    status: s.status as 'OPEN' | 'FULL' | 'CANCELLED' | 'COMPLETED',
    program: s.program
      ? {
          ...s.program,
          createdAt: s.program.createdAt.toISOString(),
          updatedAt: s.program.updatedAt.toISOString(),
        }
      : undefined,
  }));

  return { programs: typedPrograms, sessions: typedSessions };
}

export default async function TrainingPage() {
  const { programs, sessions } = await getData();

  return (
    <PageShell>
      {/* Header */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={images.training.hero}
          alt="Training and capacity building"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="relative z-10 container-site pb-12">
          <FadeUp>
            <p className="label-text text-background/60 mb-3">Capacity building</p>
            <h1 className="font-serif text-display-xl text-background">Training</h1>
          </FadeUp>
        </div>
      </section>

      {/* Intro */}
      <section className="section-pad container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SectionHeading
            label="Why training"
            title="Skills that multiply within the sector."
            subtitle="We design and deliver training programmes that give practitioners the tools to do better work immediately. No theory for its own sake."
          />
          <ScrollReveal from="right">
            <div className="space-y-4 font-sans text-body-lg text-muted">
              <p>
                Our programmes combine technical instruction with practical exercises drawn from
                real project challenges across Kenya and East Africa.
              </p>
              <p>
                We train engineers, architects, planners, and government officials. Every
                participant leaves with applicable skills, reference materials, and a network of
                peers doing similar work.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Programmes */}
      <section className="section-pad bg-surface">
        <div className="container-site">
          <SectionHeading
            label="Programmes"
            title="Current training offerings."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, i) => (
              <FadeUp key={program.slug} delay={i * 0.1}>
                <div className="bg-background border border-border overflow-hidden group">
                  <div className="relative aspect-landscape overflow-hidden">
                    <Image
                      src={program.heroImage}
                      alt={program.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-800 ease-expo-out group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="label-text mb-2">{program.duration}</p>
                    <h3 className="font-serif text-display-sm text-foreground mb-3">
                      {program.title}
                    </h3>
                    <p className="font-sans text-body-sm text-muted mb-4 line-clamp-3">
                      {program.description}
                    </p>
                    <div className="border-t border-border pt-4">
                      <p className="label-text mb-1">Target group</p>
                      <p className="font-sans text-body-sm text-foreground">
                        {program.targetGroup}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming sessions */}
      <section className="section-pad container-site">
        <SectionHeading
          label="Upcoming sessions"
          title="Next scheduled intakes."
          className="mb-10"
        />
        <TrainingCalendar sessions={sessions} />
      </section>

      {/* Full bleed */}
      <ParallaxImage className="h-[40vh]" speed={0.15}>
        <Image
          src={images.training.workshop}
          alt="Training workshop"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/40" />
      </ParallaxImage>

      {/* Registration */}
      <section className="section-pad container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <SectionHeading
            label="Register"
            title="Reserve your place."
            subtitle="Fill in the form and we will confirm your registration with payment instructions."
          />
          <RegistrationForm sessions={sessions} />
        </div>
      </section>
    </PageShell>
  );
}
