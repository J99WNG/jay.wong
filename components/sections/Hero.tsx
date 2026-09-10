"use client";
import { useState, useEffect } from "react";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import Section from "../Section";
import Image from "next/image";
import Button from "../ui/Button";
import FluidOrb from "../ui/FluidOrb";
import { heroContent } from "@/app/data/heroContent";
import { motionDelay, motionDuration, motionEase, motionStagger } from "@/lib/motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { usePageReady } from "../InitialLoader";


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

  // Standard Fade-Up Variants
  const fadeInUp = {
    initial: { 
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20 
    },
    animate: { 
      opacity: 1, 
      y: 0 
    },
    transition: { 
      duration: shouldReduceMotion ? 0 : motionDuration.slow,
      ease: motionEase.standard,
    }
  };

  // 1. Tagline Typewriter Parent
  const typewriterContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : motionStagger.characters,
        delayChildren: shouldReduceMotion ? 0 : motionDelay.standard,
      },
    },
  };

  // 2. Individual Character Variants
  const characterVariants = {
    initial: { opacity: shouldReduceMotion ? 1 : 0 },
    animate: { 
      opacity: 1, 
      transition: { duration: shouldReduceMotion ? 0 : motionDuration.instant }
    },
  };

  const taglineChars = [...heroContent.tagline];

  return (
    <Section id="hero" isLanding={true}>
      <div className="mx-auto flex flex-col-reverse items-center gap-5 text-center md:flex-row md:text-left">
        
        {/* Left Column */}
        <div className="flex flex-1 flex-col items-center gap-6 md:items-start">
          <motion.h1
            initial="initial"
            animate={isPageReady ? "animate" : "initial"}
            variants={fadeInUp}
            transition={{ delay: shouldReduceMotion ? 0 : motionDelay.standard }}
            className="relative"
          >
            {/* 1. Accessible Layer: Hidden visually, but read clearly by screen readers */}
            <span className="sr-only">
              {heroContent.accessibleHeadline}
            </span>

            {/* 2. Visual Layer: Hidden from screen readers */}
            <span aria-hidden="true" className="text-text-primary text-[clamp(2.5rem,5vw,3.25rem)] flex flex-wrap justify-center gap-x-3 items-center md:justify-start">
              <span>{heroContent.headline}</span>
              
              {shouldReduceMotion ? (
                <span>design, research, collaboration, systems thinking and mentorship.</span>
              ) : (
                /* CSS Grid trick ensures entering and exiting text occupy the exact same space to prevent layout shifting */
                <span className="inline-grid min-w-[200px]"> 
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={keywordIndex}
                      initial={false}
                      animate={isPageReady
                        ? { opacity: 1, y: 0 }
                        : { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: motionDuration.standard, ease: motionEase.inOut }}
                      className="col-start-1 row-start-1 text-accent-primary font-pixel tracking-tight" // Optional: Add a text color here to make it pop!
                    >
                    {heroContent.keywords[keywordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              )}
            </span>
          </motion.h1>

          {/* Accessible Tagline Typewriter Block */}
          <div className="m-0 relative text-text-tertiary/90">
            <span className="sr-only">{heroContent.tagline}</span>

            <motion.p
              aria-hidden="true"
              initial="initial"
              animate={isPageReady ? "animate" : "initial"}
              variants={typewriterContainer}
              className="inline-block text-[clamp(1.25rem,4vw,1.5rem)] tracking-tight leading-9 m-0"
            >
              {taglineChars.map((char, index) => (
                <motion.span 
                  key={index} 
                  variants={characterVariants}
                >
                  {char}
                </motion.span>
              ))}
              {/* <motion.span className="text-accent-primary animate-blink">|</motion.span> */}
            </motion.p>
          </div>

          {/* Button group */}
          <motion.div
            initial="initial"
            animate={isPageReady ? "animate" : "initial"}
            variants={fadeInUp}
            transition={{ delay: shouldReduceMotion ? 0 : motionDelay.heroActions }}
            className="flex flex-wrap justify-center gap-4 items-center md:justify-start"
          >
            <Button
              variant="primary"
              href="/#work"
              onClick={scrollToWork}
              suffixIcon={<ArrowDown size={16} />}
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
              suffixIcon={<ArrowUpRight size={16} />}
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
          }}
          animate={isPageReady
            ? { opacity: 1, scale: 1 }
            : { opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.9 }}
          transition={{
            duration: shouldReduceMotion ? 0 : motionDuration.slow,
            ease: motionEase.standard,
            delay: shouldReduceMotion ? 0 : motionDelay.standard,
          }}
          className="flex-1 flex justify-center w-full h-full"
        >
          <div className="relative isolate origin-center aspect-square min-h-[256px] md:scale-150">
            {/* Mount the continuously animated canvas only when the loader is gone. */}
            {isPageReady && (
              <FluidOrb
                aria-hidden="true"
                className="absolute left-[8%] top-[14%] z-0"
              />
            )}

            {/* The lower portrait is cropped to the circle, clipping the shoulders. */}
            <Image 
              src="/assets/images/jw-headshot-transparent.png"
              alt="Portrait of Jay Wong"
              fill
              className="object-contain [clip-path:circle(42%_at_50%_56%)]"
              priority
            />

            {/* A matching upper layer lets the head sit just outside the circle. */}
            <Image
              src="/assets/images/jw-headshot-transparent.png"
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
