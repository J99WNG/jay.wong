'use client';
import { useEffect, useRef } from 'react';

export default function Dock() {
  const dockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fix: Define the variable here so the function below can see it
    let lastScrollY = window.scrollY;
  
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollBottom = currentScrollY + window.innerHeight;
      
      const footer = document.querySelector('footer');
      const docHeight = document.documentElement.scrollHeight;
      const dock = dockRef.current; // Reference to your Dock element
  
      if (dock && footer) {
        const footerTrigger = docHeight - footer.offsetHeight;
  
        // 1. Visibility Logic (using the local lastScrollY)
        if (currentScrollY > 500 && currentScrollY > lastScrollY) {
          dock.classList.add('is-visible');
        } else {
          dock.classList.remove('is-visible');
        }
  
        // 2. Footer Collision (The Math we discussed)
        if (scrollBottom > footerTrigger) {
          dock.classList.add('no-bg');
        } else {
          dock.classList.remove('no-bg');
        }
      }
  
      // Update the value for the next scroll event
      lastScrollY = currentScrollY;
    };
  
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup to prevent memory leaks
    return () => window.removeEventListener('scroll', handleScroll);
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