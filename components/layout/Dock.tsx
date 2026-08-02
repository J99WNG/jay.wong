'use client';
import { useEffect, useRef } from 'react';
import Button from '../ui/Button';

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

      // --- 2. Footer Collision (Background Toggle) ---
      if (scrollBottom > footerTrigger) {
        dock.classList.add('bg-transparent');
        dock.classList.remove('bg-gradient-to-t');
      } else {
        dock.classList.remove('bg-transparent');
        dock.classList.add('bg-gradient-to-t');
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
      className="fixed bottom-0 w-full h-16 flex items-center justify-center z-9998 pointer-events-none translate-y-full bg-gradient-to-t from-bg-primary/70 to-transparent transition-all duration-200 ease-linear"
    >
      <Button 
        variant="primary"
        className="group gap-1 px-3 py-1 rounded-xl text-sm duration-300 pointer-events-auto" 
        aria-label="Back to top" 
        onClick={handleBackToTop}
      >
        <span className="icon icon-sm" aria-hidden="true">
          <span 
            className="material-symbols-rounded transition-transform duration-200 motion-safe:animate-bounce" 
            translate="no" 
            aria-hidden="true"
          >
            arrow_upward
          </span>
        </span>

        <span>Rise up</span>
      </Button>
    </div>
  );
}