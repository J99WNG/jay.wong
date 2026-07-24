'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

interface ImageItem {
  id: string;
  src: string;
  alt: string;
}

interface ImageStackProps {
  images: ImageItem[];
  className?: string;
}

export default function ImageStack({ images, className = '' }: ImageStackProps) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Stack offsets for spreading out on hover
  const getTransform = (index: number, total: number) => {
    if (!isHovered || shouldReduceMotion) {
      // Stacked position (centered overlay with slight rotation/offset)
      const offset = (index - Math.floor(total / 2)) * 3;
      return {
        x: offset * 10,
        y: offset * -6,
        rotate: offset * 3,
        scale: 1,
      };
    }

    // Spread position on hover
    const centerIndex = (total - 1) / 2;
    const spreadX = (index - centerIndex) * 90; // Horizontal spread distance
    const spreadY = Math.abs(index - centerIndex) * -10; // Subtle arc height
    const rotate = (index - centerIndex) * 8; // Gentle rotation spread

    return {
      x: spreadX,
      y: spreadY,
      rotate: rotate,
      scale: 1.05,
    };
  };

  return (
    <div
      className={`relative flex items-center justify-center p-8 select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="Image collection showcase"
    >
      <div className="relative w-48 h-48 flex items-center justify-center">
        {images.map((img, index) => {
          const transform = getTransform(index, images.length);

          return (
            <motion.div
              key={img.id || index}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={false}
              animate={{
                x: transform.x,
                y: transform.y,
                rotate: transform.rotate,
                scale: transform.scale,
              }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 22,
                mass: 0.8,
              }}
              style={{
                zIndex: isHovered ? index + 1 : images.length - index,
              }}
            >
              {/* Transparent Asset Container */}
              <div className="relative w-full h-full filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] transition-filter duration-300">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 192px, 256px"
                  className="object-contain"
                  priority={index === 0}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}