import Image from 'next/image';
import { PageShell } from '@/components/templates/PageShell';
import { ProjectGrid } from '@/components/organisms/ProjectGrid';
import { SectionHeading } from '@/components/molecules/SectionHeading';
import { FadeUp } from '@/components/animations/FadeUp';
import { buildMetadata } from '@/lib/seo';
import { db } from '@/lib/db';
import { images } from '@/config/images';
import type { ProjectWithRelations } from '@/types/project';

export const metadata = buildMetadata({
  title: 'Projects',
  description:
    'Selected projects by Insight AfriResearch — residential, commercial, institutional, and infrastructure work across Kenya.',
  canonical: '/projects',
});

export const dynamic = 'force-dynamic';

async function getData() {
  const [projects, categories] = await Promise.all([
    db.project.findMany({
      where: { status: 'PUBLISHED' },
      include: { category: true, images: { orderBy: { sortOrder: 'asc' } } },
      orderBy: { year: 'desc' },
    }),
    db.projectCategory.findMany({ orderBy: { name: 'asc' } }),
  ]);

  const typed: ProjectWithRelations[] = projects.map((p) => ({
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
    status: p.status as 'PUBLISHED' | 'DRAFT' | 'ARCHIVED',
  }));

  return { projects: typed, categories };
}

export default async function ProjectsPage() {
  const { projects, categories } = await getData();

  return (
    <PageShell>
      {/* Header */}
      <section className="relative h-[50vh] min-h-[380px] flex items-end overflow-hidden">
        <Image
          src={images.hero.steel}
          alt="Projects — Insight AfriResearch"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        <div className="relative z-10 container-site pb-12">
          <FadeUp>
            <p className="label-text text-background/60 mb-3">Selected work</p>
            <h1 className="font-serif text-display-xl text-background">Projects</h1>
          </FadeUp>
        </div>
      </section>

      {/* Grid */}
      <section className="section-pad container-site">
        <FadeUp>
          <p className="font-sans text-body-lg text-muted mb-10 max-w-2xl">
            {projects.length} projects across {categories.length} categories. Hover a card to cycle
            through photographs.
          </p>
        </FadeUp>
        <ProjectGrid projects={projects} categories={categories} />
      </section>
    </PageShell>
  );
}
