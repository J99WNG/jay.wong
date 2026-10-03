'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Alignment, Fit, Layout, RuntimeLoader, useRive } from '@rive-app/react-canvas';

RuntimeLoader.setWasmUrl('/assets/rive/rive-2.41.1.wasm');
RuntimeLoader.setWasmFallbackUrl(null);

type RivePlayerProps = {
  src: string;
  label: string;
  className?: string;
  compact?: boolean;
};

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
const subscribeToReducedMotion = (onChange: () => void) => {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
};
const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const getServerReducedMotion = () => false;

export default function RivePlayer({ src, label, className = '', compact = false }: RivePlayerProps) {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: 'State Machine 1',
    autoplay: false,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    onLoadError: () => setFailed(true),
  });

  useEffect(() => {
    if (!rive || !host.current) return;

    let visible = true;
    const syncPlayback = () => {
      if (!reducedMotion && visible && !document.hidden) {
        rive.play('State Machine 1');
      } else {
        rive.pause();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    const onVisibilityChange = () => syncPlayback();
    observer.observe(host.current);
    document.addEventListener('visibilitychange', onVisibilityChange);
    syncPlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
      rive.pause();
    };
  }, [rive, reducedMotion]);

  return (
    <div
      ref={host}
      className={`relative w-full overflow-hidden rounded-xl bg-[var(--mg-rive-surface-bg)] ${compact ? 'h-full min-h-[180px]' : ''} ${className}`}
    >
      <div
        className={`w-full p-6 ${compact ? 'h-full min-h-[180px]' : 'h-[300px]'}`}
        role="img"
        aria-label={label}
      >
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          {failed ? (
            <p className="grid h-full place-items-center text-center text-[var(--mg-rive-content)]">
              This animation couldn&apos;t load.
            </p>
          ) : (
            <RiveComponent className="h-full w-full" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
}
