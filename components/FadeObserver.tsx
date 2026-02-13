'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function FadeObserver() {
  const pathname = usePathname(); // Tracks page changes

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
        } else {
          entry.target.classList.remove('appear');
        }
      });
    }, { threshold: 0.1 });

    // Look for all sections with the fade class
    const fadeElems = document.querySelectorAll('.section-fade');
    fadeElems.forEach(elem => observer.observe(elem));

    return () => observer.disconnect();
  }, [pathname]); // Re-run when you switch pages to find new sections

  return null; // This is a "logic-only" component
}