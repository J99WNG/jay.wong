"use client";
import { useState, useEffect } from "react";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import Section from '@/components/layout/Section';
import Image from "next/image";
import Button from "../ui/Button";
import FluidOrb from "./FluidOrb";
import StreamingText from "../ui/StreamingText";
import { heroContent } from "@/content/heroContent";
import {
  motionBlur,
  motionDelay,
  motionDuration,
  motionEase,
  motionStagger,
  tickerTransition,
} from "@/lib/motion";
import { ArrowDownIcon, ArrowUpRightIcon } from '@phosphor-icons/react';
import { usePageReady } from '@/components/layout/InitialLoader';


export default function Hero() {

  const scrollToWork = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  
    const work = document.getElementById('work');
    if (!work) return;
  
    work.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start',
    });
  
    work.focus({ preventScroll: true });
  };

  const shouldReduceMotion = useReducedMotion();
  const isPageReady = usePageReady();
  const [keywordIndex, setKeywordIndex] = useState(0);

  // Cycle through the keywords every X seconds
  useEffect(() => {
    // Pause the ticker if reduced motion is enabled
    if (shouldReduceMotion || !isPageReady) return;

    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % heroContent.keywords.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isPageReady, shouldReduceMotion]);

  // Shared fade-up for the final item in the content sequence (the actions).
  const fadeInUp = {
    initial: { 
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20 
    },
    animate: (delay: number) => ({
      opacity: 1, 
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : delay,
        duration: shouldReduceMotion ? 0 : motionDuration.slow,
        ease: motionEase.standard,
      },
    }),
  };

  // One simple rhythm controls the reading order: headline, supporting copy,
  // then actions. The values come from the existing motion token system.
  const contentDelay = {
    headline: shouldReduceMotion ? 0 : motionDelay.standard,
    tagline: shouldReduceMotion ? 0 : motionDelay.standard + motionStagger.items,
    actions: shouldReduceMotion
      ? 0
      : motionDelay.standard + motionStagger.items * 2,
  };

  // The ticker behaves as the final "word" in the headline stream. Once its
  // entry resolves, the existing rolling keyword interaction continues.
  const keywordEntryDelay = shouldReduceMotion
    ? 0
    : contentDelay.headline
      + motionDelay.short
      + heroContent.headline.trim().split(/\s+/).length * motionStagger.words;

  return (
    <Section id="hero" isLanding={true}>
      <div className="mx-auto flex flex-col-reverse items-center gap-5 text-center md:flex-row md:text-left">
        
        {/* Left Column */}
        <div className="flex flex-1 flex-col items-center gap-6 md:items-start">
          <StreamingText
            as="h1"
            accessibleText={heroContent.accessibleHeadline}
            startWhen={isPageReady}
            startDelay={contentDelay.headline}
            className="relative"
          >
            {/* StreamingText keeps this visually animated treatment separate
                from the single, uninterrupted heading read by screen readers. */}
            <span className="text-text-primary text-[clamp(2.5rem,5vw,3.25rem)] flex flex-wrap justify-center gap-x-3 items-center md:justify-start">
              <span>{heroContent.headline}</span>
              
              {shouldReduceMotion ? (
                <span>design, research, collaboration, systems thinking and mentorship.</span>
              ) : (
                /* Match the clock: invisible words reserve one stable slot while
                   animated words roll through an absolutely positioned layer. */
                <motion.span
                  data-stream-static=""
                  initial={{
                    opacity: shouldReduceMotion ? 1 : 0,
                    scale: shouldReduceMotion ? 1 : 0.96,
                    filter: shouldReduceMotion ? motionBlur.none : motionBlur.base,
                  }}
                  animate={isPageReady
                    ? { opacity: 1, scale: 1, filter: motionBlur.none }
                    : {
                        opacity: shouldReduceMotion ? 1 : 0,
                        scale: shouldReduceMotion ? 1 : 0.96,
                        filter: shouldReduceMotion ? motionBlur.none : motionBlur.base,
                      }}
                  transition={{
                    delay: keywordEntryDelay,
                    duration: shouldReduceMotion ? 0 : motionDuration.standard,
                    ease: motionEase.standard,
                  }}
                  className="relative inline-grid h-[1.2em] overflow-hidden leading-[1.2] text-accent font-mono tracking-tight"
                >
                  {heroContent.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      aria-hidden="true"
                      className="invisible whitespace-nowrap [grid-area:1/1]"
                    >
                      {keyword}
                    </span>
                  ))}

                  <AnimatePresence initial={false}>
                    {/* Each incoming keyword sharpens and settles into place;
                        the outgoing word stays crisp so overlapping frames remain legible. */}
                    <motion.span
                      key={keywordIndex}
                      className="absolute inset-0 flex items-center justify-center whitespace-nowrap md:justify-start"
                      initial={{
                        y: '100%',
                        opacity: 0,
                        scale: 0.96,
                        filter: motionBlur.base,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        filter: motionBlur.none,
                      }}
                      exit={{ y: '-100%', opacity: 0 }}
                      transition={tickerTransition}
                    >
                      {heroContent.keywords[keywordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </motion.span>
              )}
            </span>
          </StreamingText>

          {/* Stream whole words instead of typing individual characters. The
              page-ready gate prevents the sequence playing behind the loader. */}
          {/* Tailwind pairs each responsive text size with its default leading,
              keeping multiline rhythm proportional without a custom clamp. */}
          <StreamingText
            startWhen={isPageReady}
            startDelay={contentDelay.tagline}
            className="m-0 inline-block text-lg text-text-secondary tracking-tight md:text-xl md:leading-8"
          >
            {heroContent.tagline}
          </StreamingText>

          {/* Button group */}
          <motion.div
            custom={contentDelay.actions}
            initial="initial"
            animate={isPageReady ? "animate" : "initial"}
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-4 items-center md:justify-start"
          >
            <Button
              variant="primary"
              href="/#work"
              onClick={scrollToWork}
              suffixIcon={<ArrowDownIcon />}
              revealIcon
            >
              View work
            </Button>

            <Button
              variant="tertiary"
              href="https://cal.com/jay-wong/intro"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Schedule a call (opens in a new tab)"
              suffixIcon={<ArrowUpRightIcon />}
              revealIcon
            >
              Schedule a call
            </Button>
          </motion.div>
        </div>

        {/* Right Column / Visual */}
        <motion.div
          initial={{
            opacity: shouldReduceMotion ? 1 : 0,
            scale: shouldReduceMotion ? 1 : 0.9,
            filter: shouldReduceMotion ? motionBlur.none : motionBlur.standard,
          }}
          animate={isPageReady
            ? { opacity: 1, scale: 1, filter: motionBlur.none }
            : {
                opacity: shouldReduceMotion ? 1 : 0,
                scale: shouldReduceMotion ? 1 : 0.9,
                filter: shouldReduceMotion ? motionBlur.none : motionBlur.standard,
              }}
          transition={{
            duration: shouldReduceMotion ? 0 : motionDuration.slow,
            ease: motionEase.standard,
            delay: shouldReduceMotion ? 0 : motionDelay.standard,
          }}
          className="flex-1 flex justify-center w-full h-full"
        >
          {/* Blur is applied to the column wrapper so the portrait and brand
              orb resolve as one visual object during the entry transition. */}
          <div className="relative isolate origin-center aspect-square min-h-64 md:scale-150">
            {/* Mount the continuously animated canvas only when the loader is gone. */}
            {isPageReady && (
              <FluidOrb
                aria-hidden="true"
                className="absolute left-[8%] top-[14%] z-0"
              />
            )}

            {/* The lower portrait is cropped to the circle, clipping the shoulders. */}
            <Image 
              src="/assets/profile/jw-headshot-transparent.png"
              alt="Portrait of Jay Wong"
              fill
              className="object-contain [clip-path:circle(42%_at_50%_56%)]"
              priority
            />

            {/* A matching upper layer lets the head sit just outside the circle. */}
            <Image
              src="/assets/profile/jw-headshot-transparent.png"
              alt=""
              aria-hidden="true"
              fill
              className="pointer-events-none object-contain [clip-path:inset(0_0_44%_0)]"
              priority
            />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
