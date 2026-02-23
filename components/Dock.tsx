'use client';
import { useEffect, useRef } from 'react';

export default function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);
  const upScrollTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const SCROLL_UP_DELAY = 1000; // Delay in milliseconds

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
          // SCROLLING DOWN: Show immediately, clear any pending hide timers
          if (upScrollTimer.current) {
            clearTimeout(upScrollTimer.current);
            upScrollTimer.current = null;
          }
          dock.classList.add('is-visible');
          
        } else if (currentScrollY < lastScrollY) {
          // SCROLLING UP: Wait before hiding
          if (!upScrollTimer.current) {
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
    <button className="btn btn-primary btn-btt" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0 })}>
        <span className="icon icon-sm" aria-hidden="true">
            <span className="material-symbols-rounded" translate="no" aria-hidden="true">arrow_upward</span>
        </span>

        <span>Rise up</span>
    </button>
</div>
  )
}