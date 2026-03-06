'use client';

import React, { useRef } from 'react';

const ScrollToNext = () => {
  const btnRef = useRef(null);

  const handleScroll = () => {
    // 1. Find the parent section containing this button
    const currentSection = btnRef.current?.closest('section');
    
    // 2. Find the very next element in the DOM
    const nextSection = currentSection?.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn("No next section found!");
    }
  };

  return (
    <button
      ref={btnRef}
      onClick={handleScroll}
      className="group flex flex-col items-center gap-2 transition-opacity hover:opacity-100 opacity-80"
      aria-label="Scroll down"
    >
      <span className="text-xs uppercase tracking-tighter">Move down</span>
      <div className="animate-bounce p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20 group-hover:border-white/50">
        <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            >
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
      </div>
    </button>
  );
};

export default ScrollToNext;