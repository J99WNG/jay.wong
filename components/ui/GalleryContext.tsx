'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
  type TouchEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { getImageProps } from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Button from './Button';

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

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const mounted = useSyncExternalStore(subscribeToMount, () => true, () => false);

  const register = useCallback((item: GalleryItem) => {
    setItems((currentItems) => [...currentItems, item]);
    return () => {
      setItems((currentItems) => currentItems.filter(({ id }) => id !== item.id));
    };
  }, []);

  const open = useCallback((id: string) => {
    const index = items.findIndex(item => item.id === id);
    if (index >= 0) setActiveIndex(index);
  }, [items]);

  const close = useCallback(() => setActiveIndex(null), []);
  const goTo = useCallback((index: number) => setActiveIndex(index), []);

  const goPrev = useCallback(() => {
    setActiveIndex((index) =>
      index !== null && index > 0 ? index - 1 : items.length - 1,
    );
  }, [items.length]);

  const goNext = useCallback(() => {
    setActiveIndex((index) =>
      index !== null && index < items.length - 1 ? index + 1 : 0,
    );
  }, [items.length]);

  const visibleIndex = activeIndex === null || items.length === 0
    ? null
    : Math.min(activeIndex, items.length - 1);

  return (
    <GalleryContext.Provider value={{ register, open }}>
      {children}
      {visibleIndex !== null &&
        mounted &&
        createPortal(
          <GalleryModal
            items={items}
            activeIndex={visibleIndex}
            onClose={close}
            onPrev={goPrev}
            onNext={goNext}
            goTo={goTo}
          />,
          document.body,
        )}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) {
    throw new Error(
      '<FigureModal> or <GalleryImage> must be a descendant of <GalleryProvider>',
    );
  }
  return ctx;
}

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
  const current = items[activeIndex];
  const total = items.length;
  const captionId = useId();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  const requestClose = useCallback(() => {
    if (dialogRef.current?.open) dialogRef.current.close();
    onClose();

    window.requestAnimationFrame(() => {
      current.element.querySelector<HTMLButtonElement>('button')?.focus({
        preventScroll: true,
      });
    });
  }, [current.element, onClose]);

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

  useEffect(() => {
    if (total < 2) return;

    // Warm only the neighbouring images. This keeps arrow/swipe navigation
    // responsive without eagerly downloading every large case-study asset.
    const adjacentIndexes = new Set([
      (activeIndex - 1 + total) % total,
      (activeIndex + 1) % total,
    ]);

    adjacentIndexes.forEach((index) => {
      const { props } = getImageProps({
        src: items[index].src,
        alt: '',
        fill: true,
        sizes: '100vw',
      });
      const preload = new window.Image();
      preload.srcset = props.srcSet ?? '';
      preload.sizes = props.sizes ?? '100vw';
      preload.src = props.src;
    });
  }, [activeIndex, items, total]);

  const handleTouchStart = (event: TouchEvent<HTMLDialogElement>) => {
    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDialogElement>) => {
    if (!touchStart.current) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) onNext();
      else onPrev();
    }
  };

  if (!current) return null;

  // Keep Next's optimized source set, but let the selected image use its own
  // aspect ratio so its visible edges size and round consistently.
  const { props: currentImageProps } = getImageProps({
    src: current.src,
    alt: current.alt,
    fill: true,
    sizes: '100vw',
  });

  return (
    <dialog
      ref={dialogRef}
      id="scrim-overlay"
      className="fixed inset-0 m-0 hidden h-dvh max-h-none w-full max-w-none overflow-hidden overscroll-none border-0 bg-black/70 p-0 text-inherit backdrop-blur-sm will-change-[backdrop-filter,opacity] open:block motion-safe:animate-[motion-fade-in_var(--motion-duration-slow)_var(--motion-ease-standard)_both]"
      aria-label={`Image ${activeIndex + 1} of ${total}`}
      aria-describedby={current.caption ? captionId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          onPrev();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          onNext();
        }
      }}
      onClick={requestClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={() => {
        touchStart.current = null;
      }}
    >

      {/* Close Modal Button */}
      <Button
        autoFocus
        type="button"
        iconOnly
        variant="primary"
        className="absolute right-[max(1rem,env(safe-area-inset-right))] top-[max(1rem,env(safe-area-inset-top))] z-10 size-12 rounded-full shadow-lg"
        aria-label="Close gallery"
        onClick={(event) => {
          event.stopPropagation();
          requestClose();
        }}
      >
        <X aria-hidden="true" className="shrink-0" size={24}  />
      </Button>

      <div
        className="page-container grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-4 overflow-hidden pb-[max(1rem,env(safe-area-inset-bottom))] pt-[calc(4.5rem+env(safe-area-inset-top))]"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Image {activeIndex + 1} of {total}: {current.alt}
        </p>

        <figure className="m-0 grid min-h-full items-center gap-4 overflow-hidden">
          {/* Intrinsic sizing prevents portrait and unusually wide figures from
              inheriting a full-screen box while retaining optimized candidates. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={activeIndex}
            src={currentImageProps.src}
            srcSet={currentImageProps.srcSet}
            sizes={currentImageProps.sizes}
            alt={current.alt}
            loading="eager"
            onLoad={() => setLoadedSrc(current.src)}
            className={`block h-auto max-h-full w-auto max-w-full place-self-center rounded-lg object-contain opacity-100 blur-none scale-100 md:rounded-xl motion-safe:transition-[opacity,filter,scale] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-in-out)] ${
              loadedSrc === current.src
                ? ''
                : 'motion-safe:opacity-0 motion-safe:blur-xs motion-safe:scale-[0.99]'
            }`}
          />

          {current.caption && (
            <figcaption
              id={captionId}
              className="m-0 max-h-[25dvh] w-full max-w-[65ch] justify-self-center overflow-y-auto text-center text-base tracking-tighter text-neutral-100"
            >
              {current.caption}
            </figcaption>
          )}
        </figure>
        
        {/* Figure Counter */}
        {total > 1 && (
          <div className="flex w-full shrink-0 flex-col items-center gap-2">
            <p className="text-neutral-500 text-sm font-pixel font-medium" aria-hidden="true">
              {activeIndex + 1} / {total}
            </p>

            <div className="flex max-w-full items-center justify-center gap-2 rounded-3xl bg-(--color-steep-900) p-2 shadow-lg sm:gap-3 sm:p-3">
              
              {/* Previous Button */}
              <Button
                type="button"
                iconOnly
                variant="primary"
                className="size-10 shrink-0 rounded-full"
                aria-label="Previous image"
                onClick={onPrev}
              >
                <ChevronLeft aria-hidden="true" className="shrink-0" size={24} strokeWidth={2.25} />
              </Button>

              {/* Dots Indicator */}
              <nav
                className="flex max-w-[calc(100vw-10.5rem)] flex-wrap items-center justify-center gap-2 sm:max-w-md"
                aria-label="Jump to image"
              >
                {items.map((item, i) => (
                  <Button
                    key={item.id}
                    type="button"
                    variant="tertiary"
                    className="h-2 w-auto shrink-0 rounded-full border-0 bg-transparent p-0 hover:bg-white/10"
                    aria-label={`Image ${i + 1}: ${item.alt}`}
                    aria-current={i === activeIndex ? 'true' : undefined}
                    onClick={() => goTo(i)}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-2 rounded-full motion-safe:transition-[width,background-color] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-spring)] ${
                        i === activeIndex
                          ? 'bg-white w-4'
                          : 'w-2 bg-white/30 group-hover:bg-white/60'
                      }`}
                    />
                  </Button>
                ))}
              </nav>

              {/* Next Button */}
              <Button
                type="button"
                iconOnly
                variant="primary"
                className="size-10 shrink-0 rounded-full"
                aria-label="Next image"
                onClick={onNext}
              >
                <ChevronRight aria-hidden="true" className="shrink-0" size={24} strokeWidth={2.25} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
