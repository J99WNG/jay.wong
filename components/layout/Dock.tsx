'use client';
import { useEffect, useRef } from 'react';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { ProgressiveBlur } from '../ui/ProgressiveBlur';

export default function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const upScrollTimer = useRef<NodeJS.Timeout | null>(null);

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.replaceState(null, '', window.location.pathname);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const SCROLL_UP_DELAY = 1000;

    const syncDockState = (currentScrollY: number, previousScrollY: number) => {
      const scrollBottom = currentScrollY + window.innerHeight;
      const footer = document.querySelector('footer');
      const docHeight = document.documentElement.scrollHeight;
      const dock = dockRef.current;

      if (!dock || !footer) return;

      const footerTrigger = docHeight - footer.offsetHeight;
      const isScrollingDown = currentScrollY > previousScrollY;
      const isScrollingUp = currentScrollY < previousScrollY;

      // --- 1. Visibility Logic ---
      if (currentScrollY > 500 && isScrollingDown) {
        if (upScrollTimer.current) {
          clearTimeout(upScrollTimer.current);
          upScrollTimer.current = null;
        }
        dock.classList.add('translate-y-0');
        dock.classList.remove('translate-y-full');
      } else if (isScrollingUp) {
        if (currentScrollY < 50) {
          if (upScrollTimer.current) {
            clearTimeout(upScrollTimer.current);
            upScrollTimer.current = null;
          }
          dock.classList.add('translate-y-full');
          dock.classList.remove('translate-y-0');
        } else if (!upScrollTimer.current) {
          upScrollTimer.current = setTimeout(() => {
            dock.classList.add('translate-y-full');
            dock.classList.remove('translate-y-0');
            upScrollTimer.current = null;
          }, SCROLL_UP_DELAY);
        }
      }

      // --- 2. Footer Collision (Blur Toggle) ---
      const blur = dock.querySelector<HTMLElement>('.gradient-blur');

      if (scrollBottom > footerTrigger) {
        blur?.classList.add('opacity-0');
      } else {
        blur?.classList.remove('opacity-0');
      }
    };

    const initializeDockState = () => {
      const currentScrollY = window.scrollY;
      const dock = dockRef.current;
      const footer = document.querySelector('footer');

      if (!dock || !footer) return;

      // Set initial visibility from scroll position (not direction)
      if (currentScrollY > 500) {
        dock.classList.add('translate-y-0');
        dock.classList.remove('translate-y-full');
      } else {
        dock.classList.add('translate-y-full');
        dock.classList.remove('translate-y-0');
      }

      syncDockState(currentScrollY, currentScrollY);
    };

    initializeDockState();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      syncDockState(currentScrollY, lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (upScrollTimer.current) clearTimeout(upScrollTimer.current);
    };
  }, []);

  return (
    <div 
      ref={dockRef} 
      id="dock"
      className="fixed bottom-0 w-full h-16 flex items-center justify-center z-(--layer-utility) pointer-events-none translate-y-full motion-safe:transition-transform motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-standard)]"
    >
      <Button 
        variant="primary"
        className="group relative z-10 size-8 p-0 rounded-full pointer-events-auto"
        aria-label="Back to the top of the page"
        onClick={handleBackToTop}
      >
        <Icon
          name="arrow-up"
          size="sm"
          className="motion-safe:animate-bounce motion-safe:transition-transform motion-safe:duration-[var(--motion-duration-fast)]"
        />
      </Button>

      <ProgressiveBlur
        className="z-0 motion-safe:transition-opacity motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-standard)]"
        height="100%"
        position="bottom"
      />
    </div>
  );
}
