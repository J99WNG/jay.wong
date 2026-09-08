'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { Alignment, Fit, Layout, RuntimeLoader, useRive } from '@rive-app/react-canvas';
import { Pause, Play } from 'lucide-react';

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
  const [playRequested, setPlayRequested] = useState(true);
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  const playing = playRequested && !reducedMotion;
  const PlaybackIcon = playing ? Pause : Play;
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
      if (playing && visible && !document.hidden) {
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
  }, [rive, playing]);

  return (
    <div
      ref={host}
      className={`relative w-full overflow-hidden rounded-xl bg-[var(--mg-neutral-900)] ${compact ? 'h-full min-h-[180px]' : ''} ${className}`}
    >
      <div
        className={`w-full p-6 ${compact ? 'h-full min-h-[180px]' : 'h-[300px]'}`}
        role="img"
        aria-label={label}
      >
        <div className="relative h-full w-full overflow-hidden rounded-lg">
          {failed ? (
            <p className="grid h-full place-items-center text-center text-[var(--mg-neutral-50)]">
              This animation couldn&apos;t load.
            </p>
          ) : (
            <RiveComponent className="h-full w-full" aria-hidden="true" />
          )}
        </div>
      </div>
      <button
        type="button"
        className="absolute right-3 bottom-3 z-[2] grid size-11 cursor-pointer place-items-center rounded-full border border-[var(--mg-rive-control-border)] bg-[var(--mg-rive-control-bg)] text-[var(--mg-neutral-50)] backdrop-blur-lg transition-[background-color,transform] duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-standard)] hover:bg-[var(--mg-primary-800)] active:scale-[.96] focus-visible:outline-[3px] focus-visible:outline-offset-3 focus-visible:outline-[var(--mg-primary-300)] disabled:cursor-wait disabled:opacity-[.55] motion-reduce:transition-none"
        disabled={!rive || failed || reducedMotion}
        aria-label={reducedMotion ? `${label} disabled by reduced-motion preference` : playing ? `Pause ${label}` : `Play ${label}`}
        aria-pressed={playing}
        onClick={() => setPlayRequested((current) => !current)}
      >
        <PlaybackIcon aria-hidden="true" />
      </button>
    </div>
  );
}
