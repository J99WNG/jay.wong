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
        variant="primary"
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
          <div className="flex flex-col items-center w-full mt-6 gap-4">

            {/* Main Controls Wrapper */}
            <div className="flex items-center justify-center w-full gap-4 px-4">

              {/* Previous Button */}
              <Button
                variant=""
                className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 hover:bg-white transition-opacity duration-200"
                aria-label="Previous image"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
              >
                <span className="icon icon-lg">
                  <span className="material-symbols-rounded">chevron_left</span>
                </span>
              </Button>

              {/* Dots - The "Responsive" Middle */}
              <nav 
                className="flex flex-wrap justify-center items-center gap-2 max-w-[200px] sm:max-w-md cursor-pointer" 
                aria-label="Jump to image"
              >
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    className={`transition-all duration-200 rounded-full h-2 w-2 
                      ${i === activeIndex 
                        ? 'bg-white scale-125' 
                        : 'bg-white/30 hover:bg-white/60'
                      }`}
                    aria-label={`Image ${i + 1}: ${item.alt}`}
                    aria-current={i === activeIndex ? true : undefined}
                    onClick={() => goTo(i)}
                  />
                ))}
              </nav>

              {/* Next Button */}
              <Button
                variant=""
                className="shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 hover:bg-white transition-opacity duration-200"
                aria-label="Next image"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
              >
                <span className="icon icon-lg">
                  <span className="material-symbols-rounded">chevron_right</span>
                </span>
              </Button>

            </div>

          {/* Counter - Sits neatly below the controls */}
          <p className="text-white/60 text-sm font-medium" aria-hidden="true">
            {activeIndex + 1} / {total}
          </p>
        </div>
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

        /* ── Caption ───────────────────────────────── */
        .modal-caption {
          color: var(--silver-needle);
          width: 100%;
          margin-top: 1rem;
          margin-bottom: 0;
          text-align: center;
          text-size: 0.75rem;
        }

        /* ── Counter ───────────────────────────────── */
        .modal-counter {
          margin-top: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.875rem;
        }

        /* ── Mobile ────────────────────────────────── */
        @media (max-width: 768px) {
          .gallery-image { border-radius: 0.5rem; }
        }
      `}</style>
    </div>
  );
}