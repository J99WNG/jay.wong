'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { MathsGenieGalleryFigure } from './MathsGenieGalleryFigure';

const videoSrc = '/assets/case-studies/mathsgenie/mathsgenie-reflection-2.mov';
const posterSrc = '/assets/case-studies/mathsgenie/mathsgenie-reflection-2-poster-landing.png';

function ReflectionVideo({ expanded = false }: { expanded?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldReduceMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    void video.play().catch(() => {
      // The landing frame remains visible if autoplay is unavailable.
    });
  }, [shouldReduceMotion]);

  return (
    <div className={`grid w-full min-w-0 place-items-center overflow-hidden rounded-xl ${expanded ? 'h-full min-h-0' : 'aspect-video border border-border-muted'}`}>
      <video
        ref={videoRef}
        className="block h-auto max-h-full w-full rounded-xl object-contain"
        src={videoSrc}
        autoPlay={shouldReduceMotion !== true}
        muted
        loop
        playsInline
        preload="auto"
        poster={posterSrc}
        aria-label="The relaunched MathsGenie learning experience"
        onCanPlay={(event) => {
          if (shouldReduceMotion !== true) {
            void event.currentTarget.play().catch(() => undefined);
          }
        }}
      >
        Your browser does not support embedded video.
      </video>
    </div>
  );
}

export function ReflectionVideoFigure() {
  return (
    <MathsGenieGalleryFigure
      alt="The relaunched MathsGenie learning experience"
      caption="The relaunched MathsGenie experience."
      className="my-2"
      frameClassName="bg-bg-secondary"
      expandedContent={<ReflectionVideo expanded />}
    >
      <ReflectionVideo />
    </MathsGenieGalleryFigure>
  );
}
