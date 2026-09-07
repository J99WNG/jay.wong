'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type TouchEvent,
} from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';
import Icon from './Icon';

// ─── Context ──────────────────────────────────────────────────────────────────

type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  element: HTMLElement;
};

type GalleryContextValue = {
  register: (item: GalleryItem) => () => void;
  open: (id: string) => void;
};

const GalleryContext = createContext<GalleryContextValue | null>(null);
const subscribeToMount = () => () => {};

// ─── Provider ─────────────────────────────────────────────────────────────────

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const mounted = useSyncExternalStore(subscribeToMount, () => true, () => false);

  const register = useCallback(({ id, src, alt, caption, element }: GalleryItem) => {
    setItems(prev => [...prev, { id, src, alt, caption, element }]);
    return () => setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const open = useCallback((id: string) => {
    const index = items.findIndex(item => item.id === id);
    if (index >= 0) setActiveIndex(index);
  }, [items]);

  const close  = useCallback(() => setActiveIndex(null), []);
  const goTo = useCallback((index: number) => setActiveIndex(index), []);

  const goPrev = useCallback(() =>
    setActiveIndex(index => index !== null && index > 0 ? index - 1 : items.length - 1),
  [items.length]);

  const goNext = useCallback(() =>
    setActiveIndex(index => index !== null && index < items.length - 1 ? index + 1 : 0),
  [items.length]);

  const visibleIndex = activeIndex === null || items.length === 0
    ? null
    : Math.min(activeIndex, items.length - 1);

  return (
    <GalleryContext.Provider value={{ register, open }}>
      {children}
      {visibleIndex !== null && mounted && createPortal(
        <GalleryModal
          items={items}
          activeIndex={visibleIndex}
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

type GalleryModalProps = {
  items: GalleryItem[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  goTo: (index: number) => void;
};

function GalleryModal({
  items,
  activeIndex,
  onClose,
  onPrev,
  onNext,
  goTo,
}: GalleryModalProps) {
  const current     = items[activeIndex];
  const total       = items.length;
  const touchStartX = useRef<number | null>(null);
  const dialogRef   = useRef<HTMLDialogElement>(null);

  const requestClose = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
    onClose();

    // The page may now be positioned at a different figure. Move focus there
    // as well so visual position and keyboard/screen-reader position agree.
    window.requestAnimationFrame(() => {
      current.element.querySelector<HTMLButtonElement>('button')?.focus({
        preventScroll: true,
      });
    });
  }, [current.element, onClose]);

  // A modal dialog enters the browser's top layer, making the document behind
  // it inert without competing with application z-index values.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, []);

  // Keep the document underneath aligned with the image selected in the
  // modal. This is programmatic scrolling only; the modal remains the sole
  // interactive surface until it closes.
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      current.element.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth',
        block: 'center',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [current.element]);

  // Keyboard image navigation. Escape is handled by the dialog's cancel event.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onPrev, onNext]);

  // Swipe support
  const handleTouchStart = (e: TouchEvent<HTMLDialogElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDialogElement>) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) onNext();
      else onPrev();
    }
    touchStartX.current = null;
  };

  if (!current) return null;

  return (
    <dialog
      ref={dialogRef}
      id="scrim-overlay"
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden overscroll-none border-0 bg-black/70 text-inherit backdrop-blur-sm will-change-[backdrop-filter,opacity] flex items-center justify-center motion-safe:animate-[motion-fade-in_var(--motion-duration-slow)_var(--motion-ease-standard)_both]"
      aria-label={`Image ${activeIndex + 1} of ${total}`}
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onClick={requestClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button — always top-right of overlay */}
      <Button
        autoFocus
        variant="primary"
        className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full cursor-pointer"
        aria-label="Close gallery"
        onClick={(e) => { e.stopPropagation(); requestClose(); }}
        >
        <Icon name="x" size="lg" />
      </Button>

      {/* Content */}
      <div
        className="page-container flex max-h-dvh flex-col items-center overflow-hidden py-4"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Screen reader announcement on navigation */}
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Image {activeIndex + 1} of {total}: {current.alt}
        </p>

        {/* image-container is the positioning context for nav buttons */}
        <div className="image-container">
          {/* The gallery preserves each source image's intrinsic aspect ratio. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={activeIndex}
            src={current.src}
            alt={current.alt}
            className="gallery-image"
          />
        </div>

        {current.caption && (
          <p className="mt-4 mb-0 w-full max-w-full text-center text-neutral-100">
            {current.caption}
          </p>
        )}

        {total > 1 && (
          <div className="flex flex-col items-center w-full mt-6 gap-4">

            {/* Main Controls Wrapper */}
            <div className="flex items-center justify-center w-auto bg-(--color-steep-900) rounded-3xl gap-3 p-3">

              {/* Previous Button */}
              <Button
                className="items-center justify-center size-11 p-0"
                aria-label="Previous image"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
              >
                <Icon name="chevron-left" size="lg" />
              </Button>

              {/* Dots - The "Responsive" Middle */}
              <nav
                className="flex flex-wrap justify-center items-center gap-2 max-w-[200px] sm:max-w-md cursor-pointer"
                aria-label="Jump to image"
              >
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    className="group flex size-auto items-center justify-center rounded-full hover:cursor-pointer"
                    aria-label={`Image ${i + 1}: ${item.alt}`}
                    aria-current={i === activeIndex ? true : undefined}
                    onClick={() => goTo(i)}
                  >
                    <span
                      aria-hidden="true"
                      className={`size-2 rounded-full motion-safe:transition-[scale,background-color] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-spring)] ${
                        i === activeIndex
                          ? 'bg-white w-4'
                          : 'bg-white/30 group-hover:bg-white/60'
                      }`}
                    />
                  </button>
                ))}
              </nav>

              {/* Next Button */}
              <Button
                className="items-center justify-center size-11 p-0"
                aria-label="Next image"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
              >
                <Icon name="chevron-right" size="lg" />
              </Button>

            </div>

          {/* Counter - Sits neatly below the controls */}
          <p className="text-neutral-500 text-sm font-medium" aria-hidden="true">
            {activeIndex + 1} / {total}
          </p>
        </div>
        )}
      </div>

      <style jsx>{`
        /* ── Image + nav button wrapper ────────────── */
        .image-container {
          position: relative;
          width: 100%;
          min-height: 0;
          display: flex;
          justify-content: center;
        }

        .gallery-image {
          width: auto;
          max-width: 100%;
          height: auto;
          max-height: calc(100dvh - 12rem);
          object-fit: contain;
          border-radius: 0.75rem;
          display: block;
          animation: motion-scale-in var(--motion-duration-slow) var(--motion-ease-standard) both;
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
    </dialog>
  );
}
