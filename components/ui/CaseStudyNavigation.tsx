'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type MotionValue,
} from 'framer-motion';

type NavigationItem = {
  id: string;
  label: string;
};

// Mirrors the standard duration and easing vocabulary in styles/motion.css.
const TRAY_SPRING = { type: 'spring', bounce: 0.14, duration: 0.4 } as const;
const LAYER_TRANSITION = { duration: 0.2, ease: [0.22, 1, 0.36, 1] } as const;

const getHeadingLabel = (heading: HTMLHeadingElement) => {
  const directText = Array.from(heading.childNodes)
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  return directText || heading.getAttribute('aria-label') || '';
};

function ProgressIndicator({ progress }: { progress: MotionValue<number> }) {
  return (
    <span className="relative grid size-5 shrink-0 place-items-center" aria-hidden="true">
      <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 32 32">
        <circle
          cx="16"
          cy="16"
          r="13"
          fill="none"
          strokeWidth="3"
          className="stroke-border-base"
        />
        <motion.circle
          cx="16"
          cy="16"
          r="13"
          fill="none"
          pathLength="4"
          strokeLinecap="round"
          strokeWidth="3"
          className="stroke-accent-interactive"
          style={{ pathLength: progress }}
        />
      </svg>
    </span>
  );
}

export default function CaseStudyNavigation() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [activeId, setActiveId] = useState<string>();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreTriggerFocus = useRef(false);
  const scrollLock = useRef(false);
  const scrollLockTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  const displayedProgress = reduceMotion ? scrollYProgress : progress;

  useEffect(() => {
    // Build the navigation from each case-study section's primary heading.
    const sections = Array.from(document.querySelectorAll<HTMLElement>('article > section[id]'))
      .filter((section) => section.id !== 'landing');
    const navigationItems = sections.flatMap((section) => {
      const heading = section.querySelector<HTMLHeadingElement>('.section-heading h2');
      const label = heading ? getHeadingLabel(heading) : '';
      return label ? [{ id: section.id, label }] : [];
    });

    // The headings are server-rendered siblings and are collected after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(navigationItems);

    // Track the section crossing the viewport's reading line.
    let frame = 0;
    const updateActiveSection = () => {
      if (scrollLock.current) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const readingLine = window.innerHeight * 0.35;
        const currentSection = sections.reduce<HTMLElement | undefined>((current, section) =>
          section.getBoundingClientRect().top <= readingLine ? section : current,
        undefined);

        setActiveId(currentSection?.id);
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      restoreTriggerFocus.current = true;
      setOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsidePress);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePress);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    } else if (restoreTriggerFocus.current) {
      triggerRef.current?.focus();
      restoreTriggerFocus.current = false;
    }
  }, [open]);

  useEffect(() => () => clearTimeout(scrollLockTimer.current), []);

  if (!items.length) return null;

  const activeLabel = items.find((item) => item.id === activeId)?.label ?? 'Sections';

  const navigateToSection = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;

    scrollLock.current = true;
    clearTimeout(scrollLockTimer.current);
    scrollLockTimer.current = setTimeout(() => {
      scrollLock.current = false;
    }, reduceMotion ? 0 : 700);

    setActiveId(id);
    setOpen(false);
    // Keep the visible URL clean while retaining semantic fragment links.
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    section.focus({ preventScroll: true });
    section.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  return (
    <nav
      ref={rootRef}
      className="fixed bottom-4 left-1/2 z-(--layer-page-navigation) max-w-fit -translate-x-1/2"
      aria-label="On this page"
    >
      <motion.div
        layout
        className={clsx(
          'border border-border-base bg-linear-to-br from-bg-primary/80 via-bg-secondary/85 to-bg-secondary/90 shadow-lg backdrop-blur-md',
          open ? 'w-60 max-w-[calc(100vw-8rem)] rounded-3xl p-3' : 'w-auto rounded-full p-1',
        )}
        transition={reduceMotion ? { duration: 0 } : TRAY_SPRING}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {open ? (
            <motion.div
              key="tray"
              id="case-study-sections"
              initial={reduceMotion ? false : { opacity: 0, filter: 'blur(3px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(3px)' }}
              transition={reduceMotion ? { duration: 0 } : LAYER_TRANSITION}
            >
              {/* Tray header and close control. */}
              <div className="flex min-h-10 items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <ProgressIndicator progress={displayedProgress} />
                  <p className="truncate font-pixel text-xs uppercase leading-none tracking-[0.04em] text-text-secondary">
                    On this page
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-text-secondary motion-safe:transition-[color,background-color,scale] motion-safe:duration-[var(--motion-duration-fast)] motion-safe:ease-[var(--motion-ease-spring)] hover:bg-bg-tertiary hover:text-text-primary active:scale-95 focus-visible:bg-bg-tertiary"
                  onClick={() => {
                    restoreTriggerFocus.current = true;
                    setOpen(false);
                  }}
                  aria-label="Close page sections"
                >
                  <X aria-hidden="true" size={16} />
                </button>
              </div>

              {/* Scrollable section tray. */}
              <ul className="m-0 max-h-[min(65dvh,30rem)] list-none overflow-y-auto p-0">
                {items.map((item, index) => (
                  <motion.li
                    className="p-0"
                    key={item.id}
                    initial={reduceMotion ? false : { opacity: 0, x: 8, filter: 'blur(2px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { ...LAYER_TRANSITION, delay: 0.075 + index * 0.025 }
                    }
                  >
                    <a
                      className={clsx(
                        'flex min-h-10 w-full items-center rounded-2xl px-3 py-2.5 text-sm leading-tight motion-safe:transition-[color,background-color,transform] motion-safe:duration-[var(--motion-duration-fast)] motion-safe:ease-[var(--motion-ease-spring)] focus-visible:outline-offset-[-3px]',
                        activeId === item.id
                          ? 'font-medium text-accent-interactive'
                          : 'text-text-secondary hover:bg-bg-tertiary hover:text-text-primary focus-visible:bg-bg-tertiary focus-visible:text-text-primary',
                      )}
                      href={`#${item.id}`}
                      onClick={(event) => navigateToSection(event, item.id)}
                      aria-current={activeId === item.id ? 'location' : undefined}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.button
              ref={triggerRef}
              key="trigger"
              type="button"
              className="flex h-fit max-w-full cursor-pointer items-center gap-2 rounded-full py-1 pr-2 pl-1 text-left text-text-primary motion-safe:transition-[background-color,scale] motion-safe:duration-[var(--motion-duration-fast)] motion-safe:ease-[var(--motion-ease-spring)] hover:bg-bg-tertiary active:scale-[0.97] focus-visible:bg-bg-tertiary"
              onClick={() => setOpen(true)}
              aria-expanded="false"
              aria-controls="case-study-sections"
              aria-label={`Open page sections. Current section: ${activeLabel}`}
              initial={reduceMotion ? false : { opacity: 0, filter: 'blur(3px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(3px)' }}
              transition={reduceMotion ? { duration: 0 } : LAYER_TRANSITION}
            >
              <ProgressIndicator progress={displayedProgress} />
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={activeId ?? 'sections'}
                  className="max-w-fit truncate whitespace-nowrap text-sm font-medium leading-none"
                  initial={reduceMotion ? false : { opacity: 0, filter: 'blur(2px)' }}
                  animate={{ opacity: 1, filter: 'blur(0px)' }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, filter: 'blur(2px)' }}
                  transition={reduceMotion ? { duration: 0 } : LAYER_TRANSITION}
                >
                  {activeLabel}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
