'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ExpandableFigureProps {
    src: string;
    alt: string;
    caption: string;
  }

  export default function ExpandableFigure({ src, alt, caption }: ExpandableFigureProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* 1. The Overlay: Only visible when expanded */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 z-40 bg-white/60 backdrop-blur-md cursor-zoom-out"
        />
      )}

      {/* 2. The Figure: Uses 'layout' to animate width changes */}
      <motion.figure
        layout
        onClick={() => setIsExpanded(!isExpanded)}
        // We remove 'container' from the class because 'container' has margins.
        // Instead, we use a custom state-based class.
        className={`relative z-50 cursor-pointer transition-shadow ${
          isExpanded ? 'is-expanded' : 'w-full'
        }`}
        style={{
          marginTop: '1rem',
          // If expanded, we calculate the width to match your .container (980px)
          // while ensuring it doesn't exceed the screen.
          maxWidth: isExpanded ? '980px' : '100%',
        }}
      >

        <motion.img
          layout
          src={src}
          alt={alt}
          className="rounded-[0.75rem] border border-[var(--dried-clay)] object-cover w-full"
        />
        <motion.figcaption layout className="mt-2 text-[0.75rem] text-[var(--roasted-oolong)]">
          {caption}
        </motion.figcaption>
      </motion.figure>
    </>
  );
}