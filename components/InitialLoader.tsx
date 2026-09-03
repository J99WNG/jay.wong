'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import LoadingLogo from './LoadingLogo';

export default function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();
  const finishLoading = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    if (!isLoading) return;

    document.body.classList.add('overflow-hidden');

    // Reduced-motion users bypass the animation. Otherwise this timeout only
    // acts as a safety net if the animation completion event does not fire.
    const fallbackTimer = window.setTimeout(
      finishLoading,
      shouldReduceMotion ? 0 : 4000,
    );

    return () => {
      window.clearTimeout(fallbackTimer);
      document.body.classList.remove('overflow-hidden');
    };
  }, [finishLoading, isLoading, shouldReduceMotion]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            exit={{
              opacity: 0,
              transition: { duration: shouldReduceMotion ? 0 : 0.4 },
            }}
            className="fixed inset-0 z-[9999]"
          >
            <LoadingLogo onComplete={finishLoading} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Your actual site content sits behind it */}
      {children}
    </>
  );
}
