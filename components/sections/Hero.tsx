"use client";
import { useState, useEffect } from "react";
import { useReducedMotion, motion, AnimatePresence } from "framer-motion";
import Section from "../Section";
import Image from "next/image";
import Button from "../ui/Button";


export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [keywordIndex, setKeywordIndex] = useState(0);

  const keywords = [
    "design.",
    "research.",
    "collaboration.",
    "systems thinking."
  ];

  // Cycle through the keywords every 2.5 seconds
  useEffect(() => {
    // Pause the ticker if reduced motion is enabled
    if (shouldReduceMotion) return;

    const interval = setInterval(() => {
      setKeywordIndex((prev) => (prev + 1) % keywords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [shouldReduceMotion, keywords.length]);

  // Standard Fade-Up Variants
  const fadeInUp = {
    initial: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    animate: { 
      opacity: 1, 
      y: 0 
    },
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1],
    }
  };

  // 1. Tagline Typewriter Parent
  const typewriterContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.02,
        delayChildren: 0.4,
      },
    },
  };

  // 2. Individual Character Variants
  const characterVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1, 
      transition: { duration: 0.005 }
    },
  };

  const taglineText = "👋 I'm Jay – a product designer that operates at the crossroads of design, engineering, and business.";
  const taglineChars = [...taglineText];

  return (
    <Section id="hero" isLanding={true}>
      <div className="mx-auto flex flex-col-reverse md:flex-row items-center gap-5">
        
        {/* Left Column */}
        <div className="flex flex-1 flex-col gap-6">
          <motion.h1
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* 1. Accessible Layer: Hidden visually, but read clearly by screen readers */}
            <span className="sr-only">
              Solving digital complexity through design, research, collaboration and systems thinking.
            </span>

            {/* 2. Visual Layer: Hidden from screen readers */}
            <span aria-hidden="true" className=" text-text-primary flex flex-wrap gap-x-3 items-center">
              <span>Solving digital complexity through</span>
              
              {shouldReduceMotion ? (
                <span>design, research, collaboration and systems thinking.</span>
              ) : (
                /* CSS Grid trick ensures entering and exiting text occupy the exact same space to prevent layout shifting */
                <span className="inline-grid min-w-[200px]"> 
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={keywordIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="col-start-1 row-start-1 text-accent-primary font-pixel tracking-tight" // Optional: Add a text color here to make it pop!
                    >
                      {keywords[keywordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              )}
            </span>
          </motion.h1>

          {/* Accessible Tagline Typewriter Block */}
          <div className="m-0 relative text-text-tertiary">
            <span className="sr-only">{taglineText}</span>
            <motion.p
              aria-hidden="true"
              initial="initial"
              animate="animate"
              variants={typewriterContainer}
              className="inline-block text-[clamp(1.25rem,2vw,1.5rem)] tracking-tight m-0"
            >
              {taglineChars.map((char, index) => (
                <motion.span 
                  key={index} 
                  variants={characterVariants}
                  className="inline"
                >
                  {char}
                </motion.span>
              ))}
              {/* <motion.span className="text-accent-primary animate-blink">|</motion.span> */}
            </motion.p>
          </div>

          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 2 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Button variant="primary" href="#work">
              View work
            </Button>
            <Button variant="tertiary" href="https://cal.com/jay-wong/intro" target="_blank" rel="noopener noreferrer">
              Schedule a call
            </Button>
          </motion.div>
        </div>

        {/* Right Column / Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="flex-1 flex justify-start md:justify-center w-full shrink-0"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative sm:w-[40%] md:w-[70%] aspect-square min-h-[150px]"
          >
            <Image 
              src="/assets/images/jw-notion-face-transparent.png"
              alt="Notion-style portrait sketch of Jay"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}