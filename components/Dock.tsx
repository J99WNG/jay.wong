'use client';
import { useEffect, useRef } from 'react';

export default function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const upScrollTimer = useRef<NodeJS.Timeout | null>(null);

  // Requirement 3: Dock button click jumps to top and resets URL
  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Reset URL to base path (removes /#work)
    window.history.replaceState(null, '', window.location.pathname);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const SCROLL_UP_DELAY = 1000;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollBottom = currentScrollY + window.innerHeight;
      const footer = document.querySelector('footer');
      const docHeight = document.documentElement.scrollHeight;
      const dock = dockRef.current;

      if (dock && footer) {
        const footerTrigger = docHeight - footer.offsetHeight;

        // --- 1. Visibility Logic with Delay ---
        if (currentScrollY > 500 && currentScrollY > lastScrollY) {
          // SCROLLING DOWN: Show immediately
          if (upScrollTimer.current) {
            clearTimeout(upScrollTimer.current);
            upScrollTimer.current = null;
          }
          dock.classList.add('is-visible');

        } else if (currentScrollY < lastScrollY) {
          // 1. If we are at the very top, hide immediately (no delay)
          if (currentScrollY < 50) {
            if (upScrollTimer.current) {
              clearTimeout(upScrollTimer.current);
              upScrollTimer.current = null;
            }
            dock.classList.remove('is-visible');
          } 
          // 2. If we are just scrolling up normally, use the 1s delay
          else if (!upScrollTimer.current) {
            upScrollTimer.current = setTimeout(() => {
              dock.classList.remove('is-visible');
              upScrollTimer.current = null;
            }, SCROLL_UP_DELAY);
          }
        }

        // --- 2. Footer Collision ---
        if (scrollBottom > footerTrigger) {
          dock.classList.add('no-bg');
        } else {
          dock.classList.remove('no-bg');
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (upScrollTimer.current) clearTimeout(upScrollTimer.current);
    };
  }, []);

  return (

<div className="dock-wrapper" ref={dockRef} id="dock-wrapper">
    <button className="btn btn-primary btn-btt" aria-label="Back to top" onClick={handleBackToTop}>
        <span className="icon icon-sm" aria-hidden="true">
            <span className="material-symbols-rounded" translate="no" aria-hidden="true">arrow_upward</span>
        </span>

        <span>Rise up</span>
    </button>
</div>
  )
}