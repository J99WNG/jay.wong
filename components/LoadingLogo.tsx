'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { motionDelay, motionDuration, motionEase, motionStagger } from '@/lib/motion';

export default function LoadingLogo({ onComplete }: { onComplete?: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  // 1. Parent orchestration: Controls the left-to-right timing
  const containerVariants: Variants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : motionStagger.items,
        delayChildren: shouldReduceMotion ? 0 : motionDelay.standard,
      },
    },
  };

  // 2. Individual shape fluid motion
  const pathVariants: Variants = {
    hidden: { 
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : motionDuration.slow,
        ease: motionEase.standard,
      },
    },
  };

  return (
    // The wrapper covers the screen, centers the logo, and adds a subtle backdrop blur
    <div className="flex h-full w-full items-center justify-center bg-bg-primary backdrop-blur-sm">
      <motion.svg
        viewBox="0 0 945 426"
        xmlns="http://www.w3.org/2000/svg"
        className="w-32 h-auto fill-inverse-primary group" // w-32 equates to 128px width
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      >
        {/* Reordered paths from Left to Right to naturally follow the staggerChildren array */}
        
        {/* 1. Circle */}
        <motion.path 
          variants={pathVariants} 
          d="M70.9 425.2C110.057 425.2 141.8 393.457 141.8 354.3C141.8 315.143 110.057 283.4 70.9 283.4C31.743 283.4 0 315.143 0 354.3C0 393.457 31.743 425.2 70.9 425.2Z"
        />
        {/* 2. Left Bar */}
        <motion.path 
          variants={pathVariants} 
          d="M249.1 425.2H179.6L347.3 65.5C365.9 25.5 406 0 450.1 0H519.6L351.8 359.7C333.2 399.7 293.1 425.2 249.1 425.2Z"
        />
        {/* 3. Middle Bar */}
        <motion.path 
          variants={pathVariants} 
          d="M461.6 425.2H392.1L559.9 65.5C578.5 25.5 618.6 0 662.7 0H732.2L564.4 359.7C545.8 399.7 505.7 425.2 461.6 425.2Z"
        />
        {/* 4. Right Bar */}
        <motion.path
          variants={pathVariants}
          onAnimationComplete={onComplete}
          d="M674.2 425.2H604.7L772.5 65.5C791.1 25.5 831.2 0 875.3 0H944.8L777 359.7C758.4 399.7 718.3 425.2 674.2 425.2Z"
        />
      </motion.svg>
    </div>
  );
}
