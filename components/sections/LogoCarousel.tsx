'use client';

import Image from 'next/image';
import {
  animate,
  motion,
  type MotionValue,
  useAnimate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef } from 'react';
import Section from '../Section';

interface CompanyLogo {
  id: string;
  name: string;
  src: string;
  width: number;
}

const companyLogos: CompanyLogo[] = [
  { id: 'barclays', name: 'Barclays', src: '/assets/logos/barclays-symbol.svg', width: 45 },
  { id: 'boa', name: 'Bank of America', src: '/assets/logos/boa-logo.svg', width: 89 },
  { id: 'bp', name: 'bp', src: '/assets/logos/bp-helios-colour.svg', width: 36 },
  { id: 'creditsuisse', name: 'Credit Suisse', src: '/assets/logos/creditsuisse-symbol.svg', width: 68 },
  { id: 'ford', name: 'Ford Motor', src: '/assets/logos/ford-logo-2.svg', width: 133 },
  { id: 'ibm', name: 'IBM', src: '/assets/logos/ibm-logo.svg', width: 120 },
  { id: 'uom', name: 'The University of Manchester', src: '/assets/logos/uom-logo-colour.svg', width: 114 },
  { id: 'pg', name: 'Procter & Gamble', src: '/assets/logos/pg-logo.svg', width: 110 },
  { id: 'vodafone', name: 'Vodafone', src: '/assets/logos/vodafone-symbol.svg', width: 48 },
];

function LogoSet({
  mouseX,
  shouldReduceMotion,
  isSeamlessLoopCopy = false,
  staticLayout = false,
}: {
  mouseX: MotionValue<number>;
  shouldReduceMotion: boolean | null;
  isSeamlessLoopCopy?: boolean;
  staticLayout?: boolean;
}) {
  return (
    <ul
      className={`flex list-none items-center gap-[clamp(2.5rem,6vw,5rem)] m-0 pl-0 ${
        staticLayout
          ? 'w-full flex-wrap justify-center'
          : 'shrink-0 pr-[clamp(2.5rem,6vw,5rem)]'
      }`}
      aria-hidden={isSeamlessLoopCopy || undefined}
    >
      {companyLogos.map((company) => (
        <LogoItem
          company={company}
          isSeamlessLoopCopy={isSeamlessLoopCopy}
          key={`${company.id}-${isSeamlessLoopCopy ? 'loop-copy' : 'primary'}`}
          mouseX={mouseX}
          shouldReduceMotion={shouldReduceMotion}
        />
      ))}
    </ul>
  );
}

function LogoItem({
  company,
  isSeamlessLoopCopy,
  mouseX,
  shouldReduceMotion,
}: {
  company: CompanyLogo;
  isSeamlessLoopCopy: boolean;
  mouseX: MotionValue<number>;
  shouldReduceMotion: boolean | null;
}) {
  const itemRef = useRef<HTMLLIElement>(null);
  const distanceFromPointer = useTransform(mouseX, (pointerX) => {
    const bounds = itemRef.current?.getBoundingClientRect();
    if (!bounds) return Infinity;

    return pointerX - (bounds.left + bounds.width / 2);
  });
  const scaleTarget = useTransform(
    distanceFromPointer,
    [-180, 0, 180],
    shouldReduceMotion ? [1, 1, 1] : [1, 1.25, 1],
  );
  const scale = useSpring(scaleTarget, {
    mass: 0.12,
    stiffness: 180,
    damping: 18,
  });

  return (
    <motion.li
      ref={itemRef}
      className="group grid h-auto shrink-0 place-items-center p-0"
      style={{ scale }}
    >
      <Image
        src={company.src}
        alt={isSeamlessLoopCopy ? '' : company.name}
        width={company.width}
        height={48}
        sizes={`${company.width}px`}
        className="h-12 w-auto object-contain grayscale opacity-70 transition-[filter,opacity] duration-300 group-hover:grayscale-0 group-hover:opacity-100"
      />
    </motion.li>
  );
}

export default function LogoCarousel() {
  const shouldReduceMotion = useReducedMotion();
  const [carouselRef, animateCarousel] = useAnimate<HTMLDivElement>();
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    if (shouldReduceMotion || !carouselRef.current) return;

    const animation = animateCarousel(
      carouselRef.current,
      { x: ['0%', '-50%'] },
      { duration: 48, ease: 'linear', repeat: Infinity },
    );

    animationRef.current = animation;

    return () => {
      animation.stop();
      animationRef.current = null;
    };
  }, [animateCarousel, carouselRef, shouldReduceMotion]);

  return (
    <Section
      id="collaborations"
      className="!overflow-hidden !py-8 scroll-mt-[calc(var(--header-height)+1rem)]"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="font-pixel text-xs font-semibold uppercase leading-none tracking-[0.08em] text-text-tertiary">
          Past collaborations
        </h2>
      </div>

      <p className="sr-only">
        Organisations Jay has collaborated with.
      </p>

      {shouldReduceMotion ? (
        <LogoSet mouseX={mouseX} shouldReduceMotion={shouldReduceMotion} staticLayout />
      ) : (
        <div
          className="-my-6 overflow-hidden py-6 [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
          onMouseEnter={() => animationRef.current?.pause()}
          onMouseMove={(event) => mouseX.set(event.clientX)}
          onMouseLeave={() => {
            mouseX.set(Infinity);
            animationRef.current?.play();
          }}
        >
          <div ref={carouselRef} className="flex w-max will-change-transform">
            <LogoSet mouseX={mouseX} shouldReduceMotion={shouldReduceMotion} />
            <LogoSet
              mouseX={mouseX}
              shouldReduceMotion={shouldReduceMotion}
              isSeamlessLoopCopy
            />
          </div>
        </div>
      )}
    </Section>
  );
}
