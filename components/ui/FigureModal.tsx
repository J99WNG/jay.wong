'use client';

import { useEffect, useId } from 'react';
import Image from 'next/image';
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
  const { register, open } = useGallery();

  useEffect(() => {
    return register({ id, src, alt, caption });
  }, [id, src, alt, caption, register]);

  const handleOpen = () => open(id);

  return (
    <figure className={className}>
      <button
        type="button"
        onClick={handleOpen}
        aria-haspopup="dialog"
        aria-label={`View full size: ${alt}`}
        className="
          group  
          relative
          block
          aspect-[16/9]
          h-full
          w-full
          overflow-hidden
          rounded-xl
          border
          border-border-muted
          cursor-zoom-in
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-primary
        "
      >

        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={`
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
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
            bg-black/20
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        >
          <span className="icon icon-xl text-text-inverse">
            <span className="material-symbols-rounded">
              open_in_full
            </span>
          </span>
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