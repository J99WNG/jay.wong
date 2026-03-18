'use client';
import { useEffect, useId } from 'react';
import { useGallery } from './GalleryContext';

export default function FigureModal({ src, alt, caption }) {
  // useId() generates a stable ID consistent between server and client.
  // Never use Math.random() for this — it causes a hydration mismatch in Next.js.
  const id = useId();
  const { register, open } = useGallery();

  useEffect(() => {
    const unregister = register({ id, src, alt, caption });
    return unregister; // runs on unmount — keeps the gallery list clean
  }, [id, src, alt, caption, register]);

  const handleOpen = () => open(id);

  return (
    <figure className="modal-trigger">
      <div
        className="image-wrapper"
        role="button"        // tells assistive tech this div is interactive
        tabIndex={0}         // puts it in the keyboard tab order
        aria-haspopup="dialog"
        aria-label={`View full size: ${alt}`}
        onClick={handleOpen}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen()}
      >
        <img src={src} alt={alt} />
        <div className="hover-overlay" aria-hidden="true">
          {/* aria-hidden removes this decorative overlay from the a11y tree */}
          <span className="icon icon-xl">
            <span className="material-symbols-rounded">open_in_full</span>
          </span>
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}

      <style jsx>{`
        .image-wrapper { position: relative; overflow: hidden; border-radius: 0.75rem; cursor: zoom-in; margin: 0; }
        .image-wrapper img { width: 100%; display: block; transition: transform 0.3s ease; }
        .image-wrapper:hover .hover-overlay { opacity: 1; }
        .image-wrapper:hover img { transform: scale(1.05); }

        /* Show a visible focus ring for keyboard users */
        .image-wrapper:focus-visible { outline: 2px solid var(--focus-ring, #4f46e5); outline-offset: 3px; border-radius: 0.75rem; }

        .hover-overlay {
          position: absolute; inset: 0;
          background: rgba(0, 0, 0, 0.2);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.3s ease;
          pointer-events: none; /* prevents overlay from stealing mouse events */
        }
        .hover-overlay span { color: white; }
      `}</style>
    </figure>
  );
}