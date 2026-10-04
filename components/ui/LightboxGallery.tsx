'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
} from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import Button from './Button';

type LightboxItemBase = {
  id: string;
  alt: string;
  caption?: string;
  element: HTMLElement;
};

// Images have an optimized source; diagrams and live components keep their
// own semantic React markup instead of being flattened into an image/canvas.
type LightboxItemDefinition = Omit<LightboxItemBase, 'id' | 'element'> & (
  | { kind: 'image'; src: string; content?: never }
  | { kind: 'content'; content: ReactNode; src?: never }
);

export type LightboxItem = LightboxItemBase & LightboxItemDefinition;

type LightboxContextValue = {
  register: (item: LightboxItem) => () => void;
  open: (id: string) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

// The provider is the shared registry and controller for figures scattered
// throughout a case-study page. It is what makes cross-figure navigation
// possible without moving every figure into one gallery component.
export function LightboxProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<LightboxItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const register = useCallback((item: LightboxItem) => {
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
    <LightboxContext.Provider value={{ register, open }}>
      {children}
      {visibleIndex !== null && (
        <LightboxDialog
          items={items}
          activeIndex={visibleIndex}
          onClose={close}
          onPrev={goPrev}
          onNext={goNext}
          goTo={goTo}
        />
      )}
    </LightboxContext.Provider>
  );
}

export function useLightbox() {
  const ctx = useContext(LightboxContext);
  if (!ctx) {
    throw new Error(
      '<LightboxImage> or <LightboxContent> must be a descendant of <LightboxProvider>',
    );
  }
  return ctx;
}

/** Registers one inline figure and returns the ref and action its trigger needs. */
export function useLightboxItem(definition: LightboxItemDefinition) {
  const id = useId();
  const figureRef = useRef<HTMLElement>(null);
  const { register, open } = useLightbox();
  const { alt, caption, kind } = definition;
  const src = kind === 'image' ? definition.src : undefined;
  const content = kind === 'content' ? definition.content : undefined;

  useEffect(() => {
    const element = figureRef.current;
    if (!element) return;

    if (kind === 'image' && src) {
      return register({ kind, id, src, alt, caption, element });
    }

    return register({
      kind: 'content',
      id,
      alt,
      caption,
      content,
      element,
    });
  }, [alt, caption, content, id, kind, register, src]);

  const openLightbox = useCallback(() => open(id), [id, open]);
  return { figureRef, openLightbox };
}

type LightboxDialogProps = {
  items: LightboxItem[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  goTo: (index: number) => void;
};

function LightboxDialog({
  items,
  activeIndex,
  onClose,
  onPrev,
  onNext,
  goTo,
}: LightboxDialogProps) {
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

  const handleTouchStart = (event: TouchEvent<HTMLDialogElement>) => {
    // Live content may implement its own horizontal gestures; only image
    // figures opt into the lightbox's swipe navigation.
    if (current.kind === 'content') {
      touchStart.current = null;
      return;
    }

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

  return (
    <dialog
      ref={dialogRef}
      id="lightbox-dialog"
      className="fixed inset-0 m-0 hidden h-dvh max-h-none w-full max-w-none overflow-hidden overscroll-none border-0 bg-black/70 p-0 text-inherit backdrop-blur-sm will-change-[backdrop-filter,opacity] open:block motion-safe:animate-[motion-fade-in_var(--motion-duration-slow)_var(--motion-ease-standard)_both]"
      aria-label={`Figure ${activeIndex + 1} of ${total}`}
      aria-describedby={current.caption ? captionId : undefined}
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onKeyDown={(event) => {
        // Let an expanded live component own its arrow keys. Gallery keyboard
        // navigation remains available from the surrounding modal controls.
        if (
          event.defaultPrevented ||
          (current.kind === 'content' &&
            event.target instanceof Element &&
            event.target.closest('[data-lightbox-content]'))
        ) {
          return;
        }

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
      <div
        className="page-container grid h-full min-h-0 grid-rows-[minmax(0,1fr)_auto] gap-4 overflow-hidden pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Figure {activeIndex + 1} of {total}
          {current.alt ? `: ${current.alt}` : ''}
        </p>

        <figure className="m-0 grid min-h-0 grid-rows-[minmax(0,1fr)_auto] items-center gap-4 overflow-hidden">
          {current.kind === 'image' ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={activeIndex}
              src={current.src}
              alt={current.alt}
              loading="eager"
              onLoad={() => setLoadedSrc(current.src)}
              className={`block h-auto max-h-full w-auto max-w-full place-self-center rounded-lg object-contain opacity-100 blur-none scale-100 md:rounded-xl motion-safe:transition-[opacity,filter,scale] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-in-out)] ${
                loadedSrc === current.src
                  ? ''
                  : 'motion-safe:opacity-0 motion-safe:blur-xs motion-safe:scale-[0.99]'
              }`}
            />
          ) : (
            // This neutral wrapper is intentionally a div: the supplied live
            // content owns its headings, sections, SVGs, media, and landmarks.
            <div
              data-lightbox-content
              className="h-full w-full overflow-auto rounded-xl bg-bg-primary p-4 text-text-primary shadow-2xl sm:p-8"
            >
              {current.content}
            </div>
          )}

          {current.caption && (
            <figcaption
              id={captionId}
              className="m-0 max-h-[25dvh] w-full max-w-[65ch] justify-self-center overflow-y-auto text-center text-sm text-neutral-100"
            >
              {current.caption}
            </figcaption>
          )}
        </figure>

        <div className="flex w-full shrink-0 flex-col items-center gap-3">
          {total > 1 && (
            <>
              <p className="text-neutral-500 text-sm font-mono font-medium" aria-hidden="true">
                {activeIndex + 1} / {total}
              </p>

              <nav
                className="flex max-w-full flex-wrap items-center justify-center gap-2 sm:max-w-md"
                aria-label="Jump to figure"
              >
                {items.map((item, i) => (
                  <Button
                    key={item.id}
                    type="button"
                    variant="tertiary"
                    className="h-2 w-auto shrink-0 rounded-full border-0 bg-transparent p-0 hover:bg-white/10"
                    aria-label={`Go to figure ${i + 1}${item.alt ? `: ${item.alt}` : ''}`}
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
            </>
          )}

          <div
            className="flex items-center justify-center gap-3"
            role="group"
            aria-label="Lightbox controls"
          >
            {total > 1 && (
              <Button
                type="button"
                iconOnly
                variant="primary"
                className="size-10 shrink-0 rounded-2xl"
                aria-label="Previous figure"
                onClick={onPrev}
              >
                <ChevronLeft aria-hidden="true" className="shrink-0" size={24} strokeWidth={2.25} />
              </Button>
            )}

            <Button
              autoFocus
              type="button"
              iconOnly
              variant="primary"
              className="size-10 shrink-0 rounded-full"
              aria-label="Close gallery"
              onClick={requestClose}
            >
              <X aria-hidden="true" className="shrink-0" size={24} />
            </Button>

            {total > 1 && (
              <Button
                type="button"
                iconOnly
                variant="primary"
                className="size-10 shrink-0 rounded-2xl"
                aria-label="Next figure"
                onClick={onNext}
              >
                <ChevronRight aria-hidden="true" className="shrink-0" size={24} strokeWidth={2.25} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
