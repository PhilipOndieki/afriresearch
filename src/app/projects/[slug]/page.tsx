import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/templates/PageShell';
import { ImageGallery } from '@/components/organisms/ImageGallery';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { FadeUp } from '@/components/animations/FadeUp';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { ParallaxImage } from '@/components/animations/ParallaxImage';
import { buildMetadata } from '@/lib/seo';
import { db } from '@/lib/db';
import type { Metadata } from 'next';

type Props = { params: { slug: string } };

async function getProject(slug: string) {
  return db.project.findUnique({
    where: { slug },
    include: {
      category: true,
      images: { orderBy: { sortOrder: 'asc' } },
      service: true,
    },
  });
}

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const projects = await db.project.findMany({
      where: { status: 'PUBLISHED' },
      select: { slug: true },
    });
    return projects.map(({ slug }) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.subtitle ?? project.description.slice(0, 160),
    image: project.heroImage ?? project.coverImage,
    canonical: `/projects/${project.slug}`,
  });
}

async function getRelatedProjects(categoryId: number, excludeSlug: string) {
  return db.project.findMany({
    where: { status: 'PUBLISHED', categoryId, NOT: { slug: excludeSlug } },
    include: { category: true, images: { take: 3, orderBy: { sortOrder: 'asc' } } },
    take: 3,
  });
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  const related = await getRelatedProjects(project.categoryId, project.slug);

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.heroImage ?? project.coverImage,
    locationCreated: { '@type': 'Place', name: project.location },
    dateCreated: String(project.year),
    creator: { '@type': 'Organization', name: 'Insight AfriResearch Ltd' },
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      {/* Hero */}
      <section className="relative h-[65vh] md:h-[80vh] flex items-end overflow-hidden">
        <ParallaxImage className="absolute inset-0 h-full w-full" speed={0.2}>
          <Image
            src={project.heroImage ?? project.coverImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
        </ParallaxImage>
        <div className="relative z-10 container-site pb-12">
          <FadeUp>
            <p className="label-text text-background/60 mb-3">
              {project.category.name} — {project.year}
            </p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="font-serif text-display-xl text-background max-w-3xl text-balance">
              {project.title}
            </h1>
          </FadeUp>
          {project.subtitle && (
            <FadeUp delay={0.2}>
              <p className="font-sans text-body-xl text-background/70 mt-4 max-w-2xl">
                {project.subtitle}
              </p>
            </FadeUp>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="section-pad container-site">
        <div className="grid grid-cols-1 lg:grid-cols-editorial-aside gap-16">
          {/* Main narrative */}
          <div>
            <FadeUp>
              <p className="font-sans text-body-xl text-foreground leading-relaxed max-w-prose">
                {project.description}
              </p>
            </FadeUp>

            {/* Gallery */}
            {project.images.length > 0 && (
              <FadeUp delay={0.1} className="mt-12">
                <h2 className="font-serif text-display-sm text-foreground mb-6">Photography</h2>
                <ImageGallery images={project.images} title={project.title} />
              </FadeUp>
            )}
          </div>

          {/* Sidebar metadata */}
          <ScrollReveal from="right">
            <div className="border border-border p-8 space-y-6 lg:sticky lg:top-24">
              <div>
                <p className="label-text mb-1">Project</p>
                <p className="font-sans text-body-md text-foreground">{project.title}</p>
              </div>
              <div>
                <p className="label-text mb-1">Location</p>
                <p className="font-sans text-body-md text-foreground">{project.location}</p>
              </div>
              <div>
                <p className="label-text mb-1">Year</p>
                <p className="font-sans text-body-md text-foreground">{project.year}</p>
              </div>
              {project.client && (
                <div>
                  <p className="label-text mb-1">Client</p>
                  <p className="font-sans text-body-md text-foreground">{project.client}</p>
                </div>
              )}
              <div>
                <p className="label-text mb-1">Category</p>
                <p className="font-sans text-body-md text-foreground">{project.category.name}</p>
              </div>
              {project.service && (
                <div>
                  <p className="label-text mb-1">Service</p>
                  <p className="font-sans text-body-md text-foreground">{project.service.name}</p>
                </div>
              )}
              <div className="pt-4 border-t border-border">
                <Link href="/contact" className="btn-primary w-full text-center">
                  Enquire about this project
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="section-pad bg-surface">
          <div className="container-site">
            <FadeUp>
              <h2 className="font-serif text-display-md text-foreground mb-10">Related projects</h2>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map((p, i) => (
                <FadeUp key={p.slug} delay={i * 0.1}>
                  <ProjectCard
                    project={{
                      ...p,
                      createdAt: p.createdAt.toISOString(),
                      updatedAt: p.updatedAt.toISOString(),
                      status: p.status as 'PUBLISHED' | 'DRAFT' | 'ARCHIVED',
                    }}
                    images={p.images.map((img) => img.url)}
                  />
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
