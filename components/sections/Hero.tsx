"use client";
import { useReducedMotion, motion } from "framer-motion";
import Section from "../Section";
import Image from "next/image";
import Button from "../ui/Button";

export default function Hero() {

  const shouldReduceMotion = useReducedMotion();

  const fadeInUp = {
    initial: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 // Disable vertical movement if preferred
    },
    animate: { 
      opacity: 1, 
      y: 0 
    },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  };

    return (
      <Section id="hero" isLanding={true}>
      
        {/* .hero-wrapper: grid, gap, and responsive flip */}
        <div className="mx-auto flex flex-col-reverse md:flex-row items-center gap-5">
          
          {/* .hero-block: flex, column, gap: 1.5rem; */}
          <div className="flex flex-1 flex-col gap-6">
            <motion.h1
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}>
              Solving digital complexity through design, research, collaboration and systems thinking.
            </motion.h1>

            <motion.p
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
            className="tagline">
              👋 I&apos;m Jay – a product and front-end designer shaping inclusive, AI-led and service-driven experiences at scale.  
            </motion.p>

            
            <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 items-center mbs-4">

              <Button variant="primary" href="#work">
                View work
              </Button>

              <Button variant="tertiary" href="https://cal.com/jay-wong/intro" target="_blank" rel="noopener noreferrer">
                Schedule a call
              </Button>
            </motion.div>
          </div>

          {/* .hero-visual: flex, justify-start (mobile), justify-center (desktop) */}
          <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="flex-1 flex justify-start md:justify-center w-full shrink-0">
            {/* .hero-img: max-width 40% (mobile), 60% (desktop) */}
            <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative sm:w-[40%] md:w-[70%] aspect-square min-h-[150px]">
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