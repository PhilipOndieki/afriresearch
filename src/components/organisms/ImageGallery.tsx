'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/utils/cn';
import type { ProjectImage } from '@/types/project';

type ImageGalleryProps = {
  images: ProjectImage[];
  title: string;
};

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const handlePrev = () => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  };

  const handleNext = () => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => setLightboxIndex(i)}
            className={cn(
              'relative overflow-hidden group bg-surface',
              i === 0 ? 'col-span-2 row-span-2 aspect-[4/3]' : 'aspect-square',
            )}
            aria-label={`View ${img.alt}`}
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-800 ease-expo-out group-hover:scale-105"
            />
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-sans text-body-sm text-background">{img.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 md:left-8 text-background/70 hover:text-background transition-colors p-3"
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div
            className="relative w-full max-w-4xl max-h-[80vh] aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 md:right-8 text-background/70 hover:text-background transition-colors p-3"
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-background/70 hover:text-background transition-colors p-3"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-body-sm text-background/50">
            {lightboxIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}
