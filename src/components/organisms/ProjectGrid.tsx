'use client';

import { useMemo } from 'react';
import { ProjectCard } from '@/components/molecules/ProjectCard';
import { FadeUp } from '@/components/animations/FadeUp';
import { useFilterStore } from '@/store/filterStore';
import type { ProjectWithRelations } from '@/types/project';
import { cn } from '@/utils/cn';

type ProjectGridProps = {
  projects: ProjectWithRelations[];
  categories: { id: number; slug: string; name: string }[];
  className?: string;
};

export function ProjectGrid({ projects, categories, className }: ProjectGridProps) {
  const { activeCategory, setCategory } = useFilterStore();

  const filtered = useMemo(() => {
    if (!activeCategory) return projects;
    return projects.filter((p) => p.category.slug === activeCategory);
  }, [projects, activeCategory]);

  return (
    <div className={className}>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10 md:mb-14">
        <button
          onClick={() => setCategory(null)}
          className={cn(
            'font-sans text-label-sm uppercase tracking-widest px-4 py-2 border transition-all duration-300',
            !activeCategory
              ? 'bg-foreground text-background border-foreground'
              : 'border-border text-muted hover:border-foreground hover:text-foreground',
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setCategory(cat.slug)}
            className={cn(
              'font-sans text-label-sm uppercase tracking-widest px-4 py-2 border transition-all duration-300',
              activeCategory === cat.slug
                ? 'bg-foreground text-background border-foreground'
                : 'border-border text-muted hover:border-foreground hover:text-foreground',
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-sans text-body-lg text-muted">No projects found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filtered.map((project, i) => (
            <FadeUp key={project.slug} delay={(i % 3) * 0.1}>
              <ProjectCard project={project} images={project.images?.map((img) => img.url)} />
            </FadeUp>
          ))}
        </div>
      )}
    </div>
  );
}
