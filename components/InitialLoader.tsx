'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import LoadingLogo from './LoadingLogo';
import { motionDuration } from '@/lib/motion';

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
              transition: { duration: shouldReduceMotion ? 0 : motionDuration.standard },
            }}
            className="fixed inset-0 z-(--layer-loader)"
            role="status"
            aria-label="Loading content"
          >
            <LoadingLogo onComplete={finishLoading} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Keep background UI out of the focus and accessibility trees while the
          blocking loader is visible. Reduced-motion users bypass it. */}
      <div inert={isLoading} aria-hidden={isLoading || undefined}>
        {children}
      </div>
    </>
  );
}
