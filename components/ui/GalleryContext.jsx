'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

// ─── Context ──────────────────────────────────────────────────────────────────

const GalleryContext = createContext(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function GalleryProvider({ children }) {
  const [items, setItems]             = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [mounted, setMounted]         = useState(false);

  // Guard against SSR — createPortal needs document.body
  useEffect(() => setMounted(true), []);

  const register = useCallback(({ id, src, alt, caption }) => {
    setItems(prev => [...prev, { id, src, alt, caption }]);
    return () => setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const open = useCallback((id) => {
    setItems(current => {
      const idx = current.findIndex(item => item.id === id);
      if (idx >= 0) setActiveIndex(idx);
      return current;
    });
  }, []);

  const close  = useCallback(() => setActiveIndex(null), []);
  const goTo   = useCallback((i) => setActiveIndex(i), []);

  const goPrev = useCallback(() =>
    setActiveIndex(i => (i > 0 ? i - 1 : items.length - 1)),
  [items.length]);

  const goNext = useCallback(() =>
    setActiveIndex(i => (i < items.length - 1 ? i + 1 : 0)),
  [items.length]);

  // Clamp index if an item unmounts while the gallery is open
  useEffect(() => {
    if (activeIndex !== null && activeIndex >= items.length) {
      setActiveIndex(items.length > 0 ? items.length - 1 : null);
    }
  }, [items.length, activeIndex]);

  return (
    <GalleryContext.Provider value={{ register, open }}>
      {children}
      {activeIndex !== null && mounted && createPortal(
        <GalleryModal
          items={items}
          activeIndex={activeIndex}
          onClose={close}
          onPrev={goPrev}
          onNext={goNext}
          goTo={goTo}
        />,
        document.body
      )}
    </GalleryContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error('<FigureModal> or <GalleryImage> must be a descendant of <GalleryProvider>');
  return ctx;
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function GalleryModal({ items, activeIndex, onClose, onPrev, onNext, goTo }) {
  const current     = items[activeIndex];
  const total       = items.length;
  const touchStartX = useRef(null);

  // Keyboard navigation + scroll lock
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  // Swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? onNext() : onPrev();
    }
    touchStartX.current = null;
  };

  if (!current) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${activeIndex + 1} of ${total}`}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button — always top-right of overlay */}
      <Button
        autoFocus
        variant="secondary"
        className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border-none cursor-pointer z-[10000]"
        aria-label="Close gallery"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        >
        <span className="icon icon-lg">
          <span className="material-symbols-rounded">close</span>
        </span>
      </Button>

      {/* Content */}
      <div className="container modal-content" onClick={(e) => e.stopPropagation()}>

        {/* Screen reader announcement on navigation */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Image {activeIndex + 1} of {total}: {current.alt}
        </p>

        {/* image-container is the positioning context for nav buttons */}
        <div className="image-container">
          <img
            key={activeIndex}
            src={current.src}
            alt={current.alt}
            className="gallery-image"
          />
        </div>

        {current.caption && (
          <p className="modal-caption">{current.caption}</p>
        )}
        
        {total > 1 && (
            <Button
              variant=""
              className="nav-btn nav-prev"
              aria-label="Previous image"
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
            >
              <span className="icon icon-lg">
                <span className="material-symbols-rounded text-white">chevron_left</span>
              </span>
            </Button>
          )}

          {total > 1 && (
            <Button
              variant=""
              className="nav-btn nav-next"
              aria-label="Next image"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
            >
              <span className="icon icon-lg">
                <span className="material-symbols-rounded text-white">chevron_right</span>
              </span>
            </Button>
          )}

        {total > 1 && (
          <>
            <nav className="modal-dots" aria-label="Jump to image">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  className={`dot ${i === activeIndex ? 'dot-active' : ''}`}
                  aria-label={`Image ${i + 1}: ${item.alt}`}
                  aria-current={i === activeIndex ? true : undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </nav>

            <p className="modal-counter" aria-hidden="true">
              {activeIndex + 1} / {total}
            </p>
          </>
        )}
      </div>

      <style jsx>{`
        /* ── Overlay ───────────────────────────────── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          will-change: backdrop-filter, opacity;
          transform: translateZ(0);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        @keyframes imageIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }

        /* ── Content shell ─────────────────────────── */
        .modal-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 980px;
          padding: 1.25rem;
        }

        /* ── Image + nav button wrapper ────────────── */
        .image-container {
          position: relative;
          width: 100%;
        }

        .gallery-image {
          width: 100%;
          height: auto;
          border-radius: 0.75rem;
          display: block;
          animation: imageIn 0.2s ease;
        }

        /* ── Nav buttons (sit on top of image) ─────── */
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          cursor: pointer;
          z-index: 10000;
          opacity: 0.85;
          transition: opacity 0.2s;
        }

        .nav-btn:hover { opacity: 1; }

        .nav-prev { left:  0.75rem; }
        .nav-next { right: 0.75rem; }

        /* ── Caption ───────────────────────────────── */
        .modal-caption {
          color: var(--silver-needle);
          width: 100%;
          margin-top: 1rem;
          text-align: center;
        }

        /* ── Dots ──────────────────────────────────── */
        .modal-dots {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
          margin-top: 1rem;
        }

        .dot {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.35);
          cursor: pointer;
          padding: 0;
          transition: background 0.2s, transform 0.2s;
        }

        .dot:hover    { background: rgba(255, 255, 255, 0.65); }
        .dot-active   { background: white; transform: scale(1.35); }
        .dot:focus-visible { outline: 2px solid white; outline-offset: 3px; }

        /* ── Counter ───────────────────────────────── */
        .modal-counter {
          margin-top: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        /* ── Mobile ────────────────────────────────── */
        @media (max-width: 768px) {

          .gallery-image { border-radius: 0.5rem; }
          .nav-prev      { left:  0.5rem; }
          .nav-next      { right: 0.5rem; }
        }
      `}</style>
    </div>
  );
}