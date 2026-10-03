'use client';

import type { ReactNode } from 'react';
import { Maximize2 } from 'lucide-react';

import { useLightboxItem } from '@/components/ui/LightboxGallery';

type LightboxContentProps = {
  children: ReactNode;
  expandedContent?: ReactNode;
  alt: string;
  caption?: string;
  className?: string;
  buttonClassName?: string;
};

/** A semantic figure trigger for diagrams, media, and other live React content. */
export default function LightboxContent({
  children,
  expandedContent,
  alt,
  caption,
  className,
  buttonClassName,
}: LightboxContentProps) {
  const content = expandedContent ?? children;
  const { figureRef, openLightbox } = useLightboxItem({
    kind: 'content',
    content,
    alt,
    caption,
  });

  return (
    <figure ref={figureRef} className={className}>
      <div className="group relative">
        {children}
        {/* Keep preview children non-interactive: this overlay is the single
            operable trigger. Interactive controls belong in expandedContent. */}
        <button
          type="button"
          onClick={openLightbox}
          aria-haspopup="dialog"
          aria-label={`Expand figure: ${alt}`}
          className={`absolute inset-0 cursor-zoom-in border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 ${buttonClassName ?? ''}`}
        >
          <span className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-bg-primary/90 px-3 py-2 text-sm text-text-primary shadow-lg backdrop-blur-sm motion-safe:transition-transform motion-safe:group-hover:scale-105">
            <Maximize2 aria-hidden="true" size={16} /> Expand
          </span>
        </button>
      </div>
      {caption && <figcaption className="sr-only">{caption}</figcaption>}
    </figure>
  );
}
