'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import Button from '../ui/Button';

export default function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Remove a stale fragment without discarding any query parameters.
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const SCROLL_UP_DELAY = 1000;
    const cancelHide = () => {
      clearTimeout(hideTimer.current);
      hideTimer.current = undefined;
    };

    const updateVisibility = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        cancelHide();
        setShowBackToTop(false);
      } else if (currentScrollY > 500 && currentScrollY > lastScrollY) {
        cancelHide();
        setShowBackToTop(true);
      } else if (currentScrollY < lastScrollY && !hideTimer.current) {
        // Leave the control available briefly after the user changes direction.
        hideTimer.current = setTimeout(() => {
          setShowBackToTop(false);
          hideTimer.current = undefined;
        }, SCROLL_UP_DELAY);
      }

      lastScrollY = currentScrollY;
    };

    const initialFrame = requestAnimationFrame(() => {
      setShowBackToTop(window.scrollY > 500);
    });
    window.addEventListener('scroll', updateVisibility, { passive: true });

    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', updateVisibility);
      cancelHide();
    };
  }, []);

  return (
    <Button
      id="backToTop"
      variant="primary"
      className={`min-h-10 min-w-10 px-3 text-xs rounded-full shadow-md motion-safe:transition-[opacity,transform] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-in-out)] ${
        showBackToTop ? 'translate-y-0 opacity-100' : 'opacity-0'
      } ${showBackToTop ? 'pointer-events-auto' : 'pointer-events-none'}`}
      revealLabel="Back to top"
      aria-label="Back to the top of the page"
      aria-hidden={!showBackToTop}
      tabIndex={showBackToTop ? undefined : -1}
      onClick={handleBackToTop}
    >
      <ArrowUp aria-hidden="true" size={16} />
    </Button>
  );
}
