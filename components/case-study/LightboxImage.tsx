'use client';

import Image from 'next/image';
import { ArrowsOutIcon } from '@phosphor-icons/react';
import { useLightboxItem } from '@/components/case-study/LightboxGallery';
import ContentOverlayCTA from '@/components/ui/ContentOverlayCTA';

type LightboxImageProps = {
  src: string;
  alt: string;
  caption?: string;

  className?: string;
  imageClassName?: string;

  priority?: boolean;
  fillContainer?: boolean;
};

/** An inline image figure that registers itself with the page lightbox. */
export default function LightboxImage({
  src,
  alt,
  caption,
  className,
  imageClassName,
  priority = false,
  fillContainer = false,
}: LightboxImageProps) {
  const triggerLabel = alt.trim()
    ? `View full size: ${alt}`
    : 'View image full size';

  const { figureRef, openLightbox } = useLightboxItem({
    kind: 'image',
    src,
    alt,
    caption,
  });

  return (
    <figure ref={figureRef} className={className}>
      <button
        type="button"
        onClick={openLightbox}
        aria-haspopup="dialog"
        aria-label={triggerLabel}
        className={`
          group  
          relative
          block
          w-full
          overflow-hidden
          rounded-xl
          border
          border-border-muted
          bg-bg-secondary
          cursor-zoom-in
          ${fillContainer
            ? 'aspect-video md:aspect-auto md:h-full'
            : `aspect-video ${caption ? '' : 'h-full'}`}
        `}
      >

        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="100vw"
          className={`
            object-cover
            motion-safe:transition-transform
            motion-safe:duration-[var(--motion-duration-standard)]
            motion-safe:ease-[var(--motion-ease-standard)]
            motion-safe:group-hover:scale-110
            ${imageClassName ?? ""}
          `}
        />

        <ContentOverlayCTA><ArrowsOutIcon /></ContentOverlayCTA>

      </button>

      {caption && (
        <figcaption>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
