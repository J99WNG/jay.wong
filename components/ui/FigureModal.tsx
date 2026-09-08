'use client';

import { useEffect, useId, useRef } from 'react';
import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import { useGallery } from './GalleryContext';

type FigureModalProps = {
  src: string;
  alt: string;
  caption?: string;

  className?: string;
  imageClassName?: string;

  priority?: boolean;
};

export default function FigureModal({
  src,
  alt,
  caption,
  className,
  imageClassName,
  priority = false,
}: FigureModalProps) {
  const id = useId();
  const figureRef = useRef<HTMLElement>(null);
  const { register, open } = useGallery();

  useEffect(() => {
    const element = figureRef.current;
    if (!element) return;

    return register({ id, src, alt, caption, element });
  }, [id, src, alt, caption, register]);

  const handleOpen = () => open(id);

  return (
    <figure ref={figureRef} className={className}>
      <button
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-label={`View full size: ${alt}`}
        className="
          group  
          relative
          block
          aspect-video
          h-full
          w-full
          overflow-hidden
          rounded-xl
          border
          border-border-muted
          cursor-zoom-in
        "
      >

        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={`
            object-cover
            motion-safe:transition-transform
            motion-safe:duration-[var(--motion-duration-standard)]
            motion-safe:ease-[var(--motion-ease-standard)]
            motion-safe:group-hover:scale-110
            ${imageClassName ?? ""}
          `}
        />

        <div aria-hidden="true" 
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/50
            backdrop-blur-xs
            opacity-0
            motion-safe:transition-opacity
            motion-safe:duration-[var(--motion-duration-standard)]
            motion-safe:ease-[var(--motion-ease-standard)]
            group-hover:opacity-100
          "
        >
          <Maximize2 aria-hidden="true" size={48} className="text-text-inverse" />
        </div>

      </button>

      {caption && (
        <figcaption>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
