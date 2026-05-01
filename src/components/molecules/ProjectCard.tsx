'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import type { Project } from '@/types/project';

type ProjectCardProps = {
  project: Project;
  images?: string[];
  className?: string;
};

export function ProjectCard({ project, images = [], className }: ProjectCardProps) {
  const allImages = [project.coverImage, ...images.filter((img) => img !== project.coverImage)];
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn('group block', className)}
      onMouseMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - bounds.left) / bounds.width;
        const newIndex = Math.min(Math.floor(x * allImages.length), allImages.length - 1);
        if (newIndex !== currentIndex) setCurrentIndex(newIndex);
      }}
      onMouseLeave={() => setCurrentIndex(0)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-surface mb-4">
        {allImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={`${project.title} — view ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              'object-cover transition-opacity duration-300',
              i === currentIndex ? 'opacity-100' : 'opacity-0',
            )}
          />
        ))}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-400" />
        {allImages.length > 1 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {allImages.map((_, i) => (
              <span
                key={i}
                className={cn(
                  'w-1 h-1 rounded-full transition-all duration-200',
                  i === currentIndex ? 'bg-background w-3' : 'bg-background/50',
                )}
              />
            ))}
          </div>
        )}
      </div>
      <div>
        <p className="label-text mb-1">
          {project.year} — {project.location}
        </p>
        <h3 className="font-serif text-display-sm text-foreground group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>
        {project.subtitle && (
          /* Bumped from text-body-sm — subtitle is substantive card copy */
          <p className="font-sans text-body-md text-muted mt-1 line-clamp-2">{project.subtitle}</p>
        )}
      </div>
    </Link>
  );
}
