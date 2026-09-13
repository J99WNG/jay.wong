'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { usePageReady } from '@/components/InitialLoader';
import Button from '@/components/ui/Button';
import { motionDelay, motionDuration, motionEase } from '@/lib/motion';

export default function NotFoundContent() {
  const isPageReady = usePageReady();
  const shouldReduceMotion = useReducedMotion();
  const isRevealed = shouldReduceMotion || isPageReady;

  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center bg-bg-secondary pb-16 pt-[calc(var(--header-height)+4rem)] sm:pb-24">
      <section
        className="page-container grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(18rem,0.8fr)] md:gap-16"
        aria-labelledby="not-found-title"
      >
        {/* The message comes first in the DOM so assistive technology reaches
            the recovery path before the decorative error-code artwork. */}
        <motion.div
          initial={false}
          animate={{ opacity: isRevealed ? 1 : 0, y: isRevealed ? 0 : 16 }}
          transition={{ duration: shouldReduceMotion ? 0 : motionDuration.slow, ease: motionEase.standard }}
          className="flex max-w-xl flex-col items-start gap-6"
        >
          <p className="small">Error 404</p>

          <div className="flex flex-col gap-4">
            <h1 id="not-found-title" className="text-[clamp(2.5rem,7vw,4.5rem)] leading-[1.05]">
              This page has wandered off.
            </h1>
            <p className="lead">
              The link may be outdated, or the page may have moved. Let&apos;s get you
              back somewhere useful.
            </p>
          </div>

          {/* Two familiar destinations are enough here: a safe reset and a
              direct route to the portfolio work most visitors came to see. */}
          <nav className="flex flex-wrap gap-4" aria-label="Page recovery">
            <Button
              href="/"
              variant="primary"
              className="min-h-11"
              prefixIcon={<ArrowLeft size={16} />}
              revealIcon
            >
              Return home
            </Button>
            
            <Button
              href="/#work"
              variant="tertiary"
              className="min-h-11"
              suffixIcon={<ArrowRight size={16} />}
              revealIcon
            >
              View selected work
            </Button>
          </nav>
        </motion.div>

        {/* The brand's dot-and-slashes motif floats within one familiar card
            surface. Hover adds a small lift; no extra interaction is implied. */}
        <motion.div
          initial={false}
          animate={{
            opacity: isRevealed ? 1 : 0,
            scale: isRevealed ? 1 : 0.96,
            y: isRevealed ? 0 : 16,
          }}
          whileHover={shouldReduceMotion ? undefined : { y: -6, rotate: -0.5 }}
          transition={{
            duration: shouldReduceMotion ? 0 : motionDuration.slow,
            ease: motionEase.standard,
            delay: shouldReduceMotion ? 0 : motionDelay.short,
          }}
          className="relative isolate mx-auto flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-[2rem] border border-border-muted bg-bg-primary shadow-sm"
          aria-hidden="true"
        >
          <div className="absolute -bottom-20 -left-12 size-64 rounded-full border-[2rem] border-bg-tertiary" />

          {/* Ambient movement uses the system's slow timing and in-out curve;
              reduced-motion preference resolves both accents to a still state. */}
          <motion.div
            className="absolute right-8 top-8 flex gap-2"
            animate={isPageReady && !shouldReduceMotion
              ? { y: [0, -10, 0], rotate: [-18, -14, -18] }
              : { y: 0, rotate: -18 }}
            transition={{
              duration: motionDuration.slow * 5,
              ease: motionEase.inOut,
              repeat: Infinity,
            }}
          >
            <span className="h-16 w-4 rounded-full bg-accent-primary" />
            <span className="h-16 w-4 rounded-full bg-accent-primary/70" />
            <span className="h-16 w-4 rounded-full bg-accent-primary/40" />
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-8 size-10 rounded-full bg-accent-primary"
            animate={isPageReady && !shouldReduceMotion
              ? { x: [0, 8, 0], y: [0, -6, 0] }
              : { x: 0, y: 0 }}
            transition={{
              duration: motionDuration.slow * 6,
              ease: motionEase.inOut,
              repeat: Infinity,
            }}
          />

          <span className="relative font-pixel text-[clamp(5rem,18vw,9rem)] leading-none tracking-[-0.08em] text-text-primary">
            404
          </span>
        </motion.div>
      </section>
    </main>
  );
}
