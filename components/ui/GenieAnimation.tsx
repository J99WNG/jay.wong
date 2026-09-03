'use client';

import { useEffect, useRef, useState } from 'react';
import { Alignment, Fit, Layout, RuntimeLoader, useRive } from '@rive-app/react-canvas';
import Button from './Button';
import styles from '@/components/sections/MathsGenieShowcase.module.css';

// Keep the runtime and its WASM version together; no third-party CDN is needed.
RuntimeLoader.setWasmUrl('/assets/rive/rive-2.41.1.wasm');
RuntimeLoader.setWasmFallbackUrl(null);

export default function GenieAnimation({ file, label }: { file: string; label: string }) {
  const [failed, setFailed] = useState(false);
  // Animations are opt-in, including for visitors who prefer reduced motion.
  const [playing, setPlaying] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const { rive, RiveComponent } = useRive({
    src: `/assets/images/mathsgenie/rive/${file}.riv`,
    stateMachines: 'State Machine 1',
    autoplay: false,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    onLoadError: () => setFailed(true),
  });

  useEffect(() => {
    if (!rive || !host.current) return;
    const sync = (visible: boolean) => {
      if (playing && visible && !document.hidden) rive.play('State Machine 1');
      else rive.pause();
    };
    let visible = true;
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync(visible);
    });
    const onVisibility = () => sync(visible);
    observer.observe(host.current);
    document.addEventListener('visibilitychange', onVisibility);
    sync(visible);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      rive.pause();
    };
  }, [rive, playing]);

  return (
    <div ref={host}>
      <div className={styles.animationStage} role="img" aria-label={label}>
        {failed ? (
          <p className={styles.loading}>This animation couldn&apos;t load.</p>
        ) : (
          <RiveComponent className={styles.canvas} aria-hidden="true" />
        )}
      </div>
      <div className={styles.playback}>
        <Button type="button" variant="secondary" disabled={!rive || failed}
          aria-pressed={playing} onClick={() => setPlaying(!playing)}>
          {playing ? 'Pause animation' : 'Play animation'}
        </Button>
      </div>
    </div>
  );
}
