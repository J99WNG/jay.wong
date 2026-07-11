'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingLogo from './LoadingLogo';

export default function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling immediately when mounted
    if (isLoading) {
      document.body.classList.add('overflow-hidden');
    }

    // Unmount the loader after the animation completes (approx 1.5s total duration)
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.classList.remove('overflow-hidden');
    }, 1500);

    // Cleanup ensures scrolling is re-enabled if the component unmounts early
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('overflow-hidden');
    };
  }, [isLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, transition: { duration: 1 } }} // Fades the whole overlay out smoothly
            className="fixed inset-0 z-[9999]"
          >
            <LoadingLogo />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Your actual site content sits behind it */}
      {children}
    </>
  );
}
