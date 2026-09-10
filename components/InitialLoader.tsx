'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import LoadingLogo from './LoadingLogo';
import { motionDuration } from '@/lib/motion';

const PageReadyContext = createContext(true);
const LOADER_FALLBACK_MS = 6000;

// Hero motion reads this value so it cannot start beneath the loader.
export const usePageReady = () => useContext(PageReadyContext);

export default function InitialLoader({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPageReady, setIsPageReady] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const finishLoading = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    if (!isLoading) return;

    // Reduced-motion users bypass the animation. Otherwise this timeout only
    // acts as a safety net if the animation completion event does not fire.
    const fallbackTimer = window.setTimeout(
      finishLoading,
      shouldReduceMotion ? 0 : LOADER_FALLBACK_MS,
    );

    return () => window.clearTimeout(fallbackTimer);
  }, [finishLoading, isLoading, shouldReduceMotion]);

  useEffect(() => {
    if (isPageReady) return;

    // Keep the page fixed until the loader's exit transition has also ended.
    document.body.classList.add('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [isPageReady]);

  return (
    <PageReadyContext.Provider value={isPageReady}>
      <AnimatePresence onExitComplete={() => setIsPageReady(true)}>
        {isLoading && (
          <motion.div
            key="loader"
            exit={{
              opacity: 0,
              transition: { duration: shouldReduceMotion ? 0 : motionDuration.standard },
            }}
            className="fixed inset-0 z-(--layer-loader)"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="sr-only">Loading portfolio</span>
            <LoadingLogo onComplete={finishLoading} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Keep background UI unavailable until the overlay has completely left. */}
      <div inert={!isPageReady} aria-hidden={!isPageReady || undefined}>
        {children}
      </div>
    </PageReadyContext.Provider>
  );
}
