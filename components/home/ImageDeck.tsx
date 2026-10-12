"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

const cardBase =
  "group/card absolute aspect-[4/3] w-[72%] origin-center cursor-pointer touch-manipulation overflow-hidden rounded-xl border border-border-muted bg-bg-secondary p-0 shadow-xl motion-safe:transition-[rotate,scale,box-shadow,border-color] motion-safe:duration-[var(--motion-duration-slow)] motion-safe:ease-[var(--motion-ease-spring)] motion-safe:will-change-[rotate,scale] hover:z-30 motion-safe:hover:rotate-0 motion-safe:hover:scale-[1.04] hover:border-border-hover hover:shadow-2xl focus-visible:z-30 motion-safe:focus-visible:rotate-0 motion-safe:focus-visible:scale-[1.04] focus-visible:border-border-hover data-[active=true]:z-30 motion-safe:data-[active=true]:rotate-0 motion-safe:data-[active=true]:scale-[1.04] data-[active=true]:border-border-hover data-[active=true]:shadow-2xl sm:w-[56%] md:w-[48%]";

type CardId = "team" | "workshop" | "conference";
type VideoStatus = "loading" | "playing" | "paused" | "error";

export default function ImageDeck() {
  const deckRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeCard, setActiveCard] = useState<CardId | null>(null);
  const [videoStatus, setVideoStatus] = useState<VideoStatus>("loading");

  const toggleCard = (cardId: CardId) => {
    setActiveCard((currentCard) => currentCard === cardId ? null : cardId);
  };

  const playWorkshopVideo = useCallback(async (reload = false) => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;

    // Some embedded iOS browsers require these properties to be set directly
    // on the media element before a programmatic play request.
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    if (reload) {
      setVideoStatus("loading");
      video.load();
    }

    try {
      await video.play();
      setVideoStatus("playing");
    } catch {
      // Autoplay can be disabled by Low Power Mode or an embedded browser.
      // The poster remains visible and the card itself becomes the retry action.
      setVideoStatus("paused");
    }
  }, [shouldReduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldReduceMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    void video.play().catch(() => {
      setVideoStatus("paused");
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
        className="relative isolate h-[17rem] w-full sm:h-[20rem] md:h-[19rem] supports-[height:1cqw]:h-[calc(54cqw+2.5rem)] sm:supports-[height:1cqw]:h-[calc(42cqw+2.75rem)] md:supports-[height:1cqw]:h-[calc(36cqw+2.75rem)]"
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
          src="/assets/about/design-team.jpg"
          alt="Jay with a multidisciplinary design team"
          fill
          sizes="(max-width: 640px) 72vw, (max-width: 768px) 56vw, 31vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-[var(--motion-duration-slow)] motion-safe:ease-[var(--motion-ease-standard)] motion-safe:group-hover/card:scale-[1.03] motion-safe:group-focus-visible/card:scale-[1.03]"
        />
      </button>

      <button
        type="button"
        aria-label={
          videoStatus === "playing"
            ? "Bring the playing design workshop video to the front"
            : "Play the design workshop video and bring it to the front"
        }
        aria-pressed={activeCard === "workshop"}
        data-active={activeCard === "workshop"}
        onClick={() => {
          toggleCard("workshop");
          if (videoStatus !== "playing") {
            void playWorkshopVideo(videoStatus === "error");
          }
        }}
        className={`${cardBase} left-[14%] top-1 z-20 rotate-[2.5deg] sm:left-[22%] md:left-[26%]`}
      >
        <video
          ref={videoRef}
          className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-[var(--motion-duration-slow)] motion-safe:ease-[var(--motion-ease-standard)] motion-safe:group-hover/card:scale-[1.03] motion-safe:group-focus-visible/card:scale-[1.03]"
          autoPlay={!shouldReduceMotion}
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/about/jw-workshop-poster.jpg"
          aria-label="A short clip from Jay facilitating a design workshop"
          onPlaying={() => setVideoStatus("playing")}
          onPause={() => setVideoStatus("paused")}
          onError={() => setVideoStatus("error")}
        >
          <source src="/assets/about/jw-workshop-snippet.mp4" type="video/mp4" />
        </video>

        <Image
          src="/assets/about/jw-workshop-poster.jpg"
          alt=""
          fill
          sizes="(max-width: 640px) 72vw, (max-width: 768px) 56vw, 31vw"
          aria-hidden="true"
          className={`pointer-events-none object-cover transition-opacity duration-300 ${
            videoStatus === "playing" ? "opacity-0" : "opacity-100"
          }`}
        />

        {videoStatus !== "playing" && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 bottom-3 z-10 flex size-9 items-center justify-center rounded-full bg-bg-primary/90 text-text-primary shadow-md backdrop-blur-sm"
          >
            <span className="material-symbols-rounded" translate="no">
              {videoStatus === "error" ? "refresh" : "play_arrow"}
            </span>
          </span>
        )}
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
          src="/assets/about/product-design-week.jpg"
          alt="Jay and colleagues at Product Design Week London"
          fill
          sizes="(max-width: 640px) 72vw, (max-width: 768px) 56vw, 31vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-[var(--motion-duration-slow)] motion-safe:ease-[var(--motion-ease-standard)] motion-safe:group-hover/card:scale-[1.03] motion-safe:group-focus-visible/card:scale-[1.03]"
        />
      </button>
      </div>
    </div>
  );
}
