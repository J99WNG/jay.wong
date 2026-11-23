'use client';

import type { ReactNode } from 'react';
import { ArrowsOutIcon } from '@phosphor-icons/react';

import { useLightboxItem } from '@/components/case-study/LightboxGallery';
import ContentOverlayCTA from '@/components/ui/ContentOverlayCTA';

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
      <div className="relative h-full">
        {children}
        {/* Keep preview children non-interactive: this overlay is the single
            operable trigger. Interactive controls belong in expandedContent. */}
        <button
          type="button"
          onClick={openLightbox}
          aria-haspopup="dialog"
          aria-label={`Expand figure: ${alt}`}
          className={`group absolute inset-0 cursor-zoom-in border-0 bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 ${buttonClassName ?? ''}`}
        >
          <ContentOverlayCTA><ArrowsOutIcon /></ContentOverlayCTA>
        </button>
      </div>
      {caption && <figcaption className="sr-only">{caption}</figcaption>}
    </figure>
  );
}
