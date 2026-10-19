'use client';

import { ArrowsOutIcon } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { useLightboxItem } from '@/components/case-study/LightboxGallery';
import { cn } from '@/lib/utils';

type MathsGenieGalleryFigureProps = {
  alt: string;
  caption?: string;
  children: ReactNode;
  expandedContent?: ReactNode;
  className?: string;
  frameClassName?: string;
  captionClassName?: string;
};

/**
 * Registers a live MathsGenie canvas with the case-study gallery. The expand
 * control occupies its own corner so controls inside the preview remain usable.
 */
export function MathsGenieGalleryFigure({
  alt,
  caption,
  children,
  expandedContent,
  className,
  frameClassName,
  captionClassName,
}: MathsGenieGalleryFigureProps) {
  const { figureRef, openLightbox } = useLightboxItem({
    kind: 'content',
    content: expandedContent ?? children,
    alt,
    caption,
  });

  return (
    <figure ref={figureRef} className={cn('m-0 w-full min-w-0', className)}>
      <div className={cn('relative w-full min-w-0 overflow-hidden rounded-xl', frameClassName)}>
        {children}
        <button
          type="button"
          onClick={openLightbox}
          aria-haspopup="dialog"
          aria-label={`Expand figure: ${alt}`}
          className="absolute top-3 right-3 z-20 grid size-10 cursor-zoom-in place-items-center rounded-full border border-slate-300 bg-white text-slate-900 shadow-lg transition hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <ArrowsOutIcon aria-hidden="true" />
        </button>
      </div>
      {caption && (
        <figcaption>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
