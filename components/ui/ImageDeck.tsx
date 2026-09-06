"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

const cardBase =
  "group/card absolute aspect-[4/3] w-[72%] origin-center cursor-pointer touch-manipulation overflow-hidden rounded-xl border border-border-muted bg-bg-secondary p-0 shadow-xl motion-safe:transition-[rotate,scale,box-shadow,border-color] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:will-change-[rotate,scale] hover:z-30 motion-safe:hover:rotate-0 motion-safe:hover:scale-[1.04] hover:border-border-hover hover:shadow-2xl focus-visible:z-30 motion-safe:focus-visible:rotate-0 motion-safe:focus-visible:scale-[1.04] focus-visible:border-border-hover data-[active=true]:z-30 motion-safe:data-[active=true]:rotate-0 motion-safe:data-[active=true]:scale-[1.04] data-[active=true]:border-border-hover data-[active=true]:shadow-2xl sm:w-[56%] md:w-[48%]";

type CardId = "team" | "workshop" | "conference";

export default function ImageDeck() {
  const deckRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeCard, setActiveCard] = useState<CardId | null>(null);

  const toggleCard = (cardId: CardId) => {
    setActiveCard((currentCard) => currentCard === cardId ? null : cardId);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldReduceMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    void video.play().catch(() => {
      // Browsers may still block autoplay despite the video being muted.
    });
  }, [shouldReduceMotion]);

  useEffect(() => {
    const resetDeckOnOutsideTap = (event: PointerEvent) => {
      const deck = deckRef.current;
      if (!deck || deck.contains(event.target as Node)) return;

      setActiveCard(null);
    };

    document.addEventListener("pointerdown", resetDeckOnOutsideTap);
    return () => document.removeEventListener("pointerdown", resetDeckOnOutsideTap);
  }, []);

  return (
    <div ref={deckRef} className="w-full [container-type:inline-size]">
      <div
        className="relative isolate h-[calc(54cqw+2.5rem)] w-full sm:h-[calc(42cqw+2.75rem)] md:h-[calc(36cqw+2.75rem)]"
        role="group"
        aria-label="A few moments from my design practice"
      >
      <button
        type="button"
        aria-label="Bring the multidisciplinary design team photo to the front"
        aria-pressed={activeCard === "team"}
        data-active={activeCard === "team"}
        onClick={() => toggleCard("team")}
        className={`${cardBase} left-0 top-8 z-10 -rotate-[7deg]`}
      >
        <Image
          src="/assets/images/about/PXL_20230912_145946197.jpg"
          alt="Jay with a multidisciplinary design team"
          fill
          sizes="(max-width: 640px) 72vw, (max-width: 768px) 56vw, 31vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover/card:scale-[1.03] motion-safe:group-focus-visible/card:scale-[1.03]"
        />
      </button>

      <button
        type="button"
        aria-label="Bring the design workshop video to the front"
        aria-pressed={activeCard === "workshop"}
        data-active={activeCard === "workshop"}
        onClick={() => toggleCard("workshop")}
        className={`${cardBase} left-[14%] top-1 z-20 rotate-[2.5deg] sm:left-[22%] md:left-[26%]`}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover/card:scale-[1.03] motion-safe:group-focus-visible/card:scale-[1.03]"
          autoPlay={!shouldReduceMotion}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="A short clip from Jay facilitating a design workshop"
        >
          <source src="/assets/images/about/jw-workshop-snippet.mp4" type="video/mp4" />
        </video>
      </button>

      <button
        type="button"
        aria-label="Bring the Product Design Week photo to the front"
        aria-pressed={activeCard === "conference"}
        data-active={activeCard === "conference"}
        onClick={() => toggleCard("conference")}
        className={`${cardBase} right-0 top-9 z-10 rotate-[7deg]`}
      >
        <Image
          src="/assets/images/about/e9f89d48-d89b-4f5c-b77b-fa14d4928798.JPG"
          alt="Jay and colleagues at Product Design Week London"
          fill
          sizes="(max-width: 640px) 72vw, (max-width: 768px) 56vw, 31vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover/card:scale-[1.03] motion-safe:group-focus-visible/card:scale-[1.03]"
        />
      </button>
      </div>
    </div>
  );
}
