import Image from 'next/image';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Badge } from '@/components/atoms/Badge';
import { FadeUp } from '@/components/animations/FadeUp';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  const projects = await db.project.findMany({
    include: { category: true },
    orderBy: { updatedAt: 'desc' },
  });

  const statusBadge = (status: string) =>
    status === 'PUBLISHED'
      ? ('default' as const)
      : status === 'DRAFT'
        ? ('outline' as const)
        : ('muted' as const);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-display-md text-foreground">Projects</h1>
        <Link href="/admin/projects/new" className="btn-primary text-sm">
          New Project
        </Link>
      </div>

      <div className="border border-border divide-y divide-border">
        {projects.map((project, i) => (
          <FadeUp key={project.id} delay={i * 0.03}>
            <div className="flex items-center gap-4 p-4">
              <div className="relative w-16 h-16 shrink-0 overflow-hidden bg-surface">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-sans text-body-sm text-foreground font-medium truncate">
                  {project.title}
                </p>
                <p className="font-sans text-body-sm text-muted">
                  {project.location} &middot; {project.year}
                </p>
                <p className="font-sans text-label-sm text-muted uppercase tracking-widest">
                  {project.category.name}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge variant={statusBadge(project.status)}>{project.status}</Badge>
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-sans text-label-sm text-muted hover:text-foreground transition-colors"
                  target="_blank"
                >
                  View
                </Link>
                <Link
                  href={`/admin/projects/${project.slug}`}
                  className="font-sans text-label-sm text-foreground hover:text-accent transition-colors"
                >
                  Edit
                </Link>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
