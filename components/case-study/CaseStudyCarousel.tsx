'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useReducedMotion } from 'framer-motion';
import { CaseStudyCard } from '@/components/case-study/CaseStudyCard';
import type { CaseStudy } from '@/content/caseStudies';

type CaseStudyCarouselProps = {
  projects: CaseStudy[];
};

const CARD_DURATION_MS = 3000;

export default function CaseStudyCarousel({ projects }: CaseStudyCarouselProps) {
  const carouselRef = useRef<HTMLUListElement>(null);
  const visualIndexRef = useRef(1);
  const progressRef = useRef(0);
  const scrollFrameRef = useRef(0);
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [autoplayStopped, setAutoplayStopped] = useState(false);

  const resetProgress = useCallback(() => {
    progressRef.current = 0;
    setProgress(0);
  }, []);

  const scrollToVisualCard = useCallback((visualIndex: number, smooth = true) => {
    const carousel = carouselRef.current;
    const card = carousel?.children.item(visualIndex) as HTMLElement | null;
    if (!carousel || !card) return;

    visualIndexRef.current = visualIndex;
    carousel.scrollTo({
      left: card.offsetLeft,
      behavior: smooth && !reduceMotion ? 'smooth' : 'auto',
    });
  }, [reduceMotion]);

  const jumpToVisualCard = useCallback((visualIndex: number) => {
    const carousel = carouselRef.current;
    const card = carousel?.children.item(visualIndex) as HTMLElement | null;
    if (!carousel || !card) return;

    // Temporarily override the CSS smooth-scroll rule so the clone-to-original
    // reset is invisible and the next forward transition stays continuous.
    carousel.style.scrollBehavior = 'auto';
    carousel.scrollLeft = card.offsetLeft;
    visualIndexRef.current = visualIndex;
    requestAnimationFrame(() => carousel.style.removeProperty('scroll-behavior'));
  }, []);

  useLayoutEffect(() => {
    // The leading clone lets a backwards gesture wrap too; start on the first
    // real card before the carousel becomes interactive.
    jumpToVisualCard(1);
  }, [jumpToVisualCard]);

  useEffect(() => {
    if (
      reduceMotion ||
      autoplayStopped ||
      interactionPaused ||
      projects.length < 2
    ) {
      return;
    }

    const startedAt = performance.now();
    const startingProgress = progressRef.current;
    const remainingDuration = CARD_DURATION_MS * (1 - startingProgress);
    const timer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const nextProgress = Math.min(
        1,
        startingProgress + elapsed / CARD_DURATION_MS,
      );

      progressRef.current = nextProgress;
      setProgress(nextProgress);

      if (elapsed >= remainingDuration) {
        window.clearInterval(timer);
        resetProgress();
        scrollToVisualCard(visualIndexRef.current + 1);
      }
    }, 50);

    return () => window.clearInterval(timer);
  }, [activeIndex, autoplayStopped, interactionPaused, projects.length, reduceMotion, resetProgress, scrollToVisualCard]);

  useEffect(() => () => {
    cancelAnimationFrame(scrollFrameRef.current);
    clearTimeout(scrollEndTimerRef.current);
  }, []);

  if (!projects.length) return null;

  // Clones at both ends make either scroll direction continuous. They are
  // hidden from assistive technology and immediately swapped for real cards.
  const visualProjects = [projects.at(-1)!, ...projects, projects[0]];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Other available case studies"
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setInteractionPaused(false);
        }
      }}
    >
      <p id="case-study-scroll-help" className="sr-only">
        Scroll horizontally or use the slide controls to browse case studies.
        Automatic rotation stops after you interact and is disabled when reduced
        motion is preferred.
      </p>

      <ul
        ref={carouselRef}
        className="relative flex snap-x snap-mandatory items-center gap-6 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
        aria-describedby="case-study-scroll-help"
        tabIndex={0}
        onPointerDown={() => setAutoplayStopped(true)}
        onScroll={() => {
          cancelAnimationFrame(scrollFrameRef.current);
          scrollFrameRef.current = requestAnimationFrame(() => {
            const carousel = carouselRef.current;
            if (!carousel) return;

            const cards = Array.from(carousel.children) as HTMLElement[];
            const nearestVisualIndex = cards.reduce((nearest, card, index) =>
              Math.abs(card.offsetLeft - carousel.scrollLeft) <
              Math.abs(cards[nearest].offsetLeft - carousel.scrollLeft)
                ? index
                : nearest,
            0);
            visualIndexRef.current = nearestVisualIndex;

            const logicalIndex = nearestVisualIndex === 0
              ? projects.length - 1
              : nearestVisualIndex === projects.length + 1
                ? 0
                : nearestVisualIndex - 1;

            if (logicalIndex !== activeIndex) {
              setActiveIndex(logicalIndex);
              resetProgress();
            }

            clearTimeout(scrollEndTimerRef.current);
            scrollEndTimerRef.current = setTimeout(() => {
              if (visualIndexRef.current === 0) {
                jumpToVisualCard(projects.length);
              } else if (visualIndexRef.current === projects.length + 1) {
                jumpToVisualCard(1);
              }
            }, 160);
          });
        }}
      >
        {visualProjects.map((project, visualIndex) => {
          const isClone = visualIndex === 0 || visualIndex === visualProjects.length - 1;
          return (
            <li
              key={`${project.slug}-${visualIndex}`}
              className="flex w-[88%] shrink-0 snap-start"
              aria-hidden={isClone || undefined}
              inert={isClone || undefined}
              data-carousel-clone={isClone || undefined}
            >
              <CaseStudyCard project={project} layout="stacked" />
            </li>
          );
        })}
      </ul>

      <nav className="mt-3 flex items-center justify-center gap-1" aria-label="Choose a case study">
        {projects.map((project, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={project.slug}
              type="button"
              className="group grid size-6 cursor-pointer place-items-center rounded-full"
              aria-label={`Show case study ${index + 1}: ${project.title}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => {
                setAutoplayStopped(true);
                resetProgress();
                scrollToVisualCard(index + 1);
              }}
            >
              <span
                aria-hidden="true"
                className={`relative h-2 overflow-hidden rounded-full bg-border-base motion-safe:transition-[width] motion-safe:duration-[var(--motion-duration-standard)] ${isActive ? 'w-8' : 'w-2'}`}
              >
                {isActive && (
                  <span
                    className="absolute inset-0 origin-left rounded-full bg-accent"
                    style={{ transform: `scaleX(${progress})` }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
