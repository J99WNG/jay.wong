'use client';
import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@phosphor-icons/react';
import Button from './Button';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Remove a stale fragment without discarding any query parameters.
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  };

  useEffect(() => {
    // Visibility depends only on distance from the top, so the CTA remains
    // available over the footer regardless of scroll direction.
    const updateVisibility = () => setIsVisible(window.scrollY > 500);

    const initialFrame = requestAnimationFrame(updateVisibility);
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', updateVisibility);
    };
  }, []);

  return (
    <Button
      id="backToTop"
      variant="primary"
      className={`min-h-11 min-w-11 px-3 text-xs rounded-full shadow-md motion-safe:transition-[opacity,transform] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-standard)] ${
        isVisible
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      revealLabel="Back to top"
      aria-label="Back to the top of the page"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? undefined : -1}
      onClick={handleBackToTop}
    >
      <ArrowUpIcon aria-hidden="true" />
    </Button>
  );
}
