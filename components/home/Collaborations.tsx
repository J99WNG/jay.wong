'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Section from '@/components/layout/Section';
import Link from 'next/link';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import StreamingText from '@/components/ui/StreamingText';
import { caseStudies } from '@/content/caseStudies';
import { motionDelay, motionDuration, motionEase } from '@/lib/motion';

interface StandaloneCompany {
  id: string;
  name: string;
  src: string;
  tagline?: string;
}

interface CaseStudyCompany {
  id: string;
  caseStudySlug: string;
}

type CollaborationSource = StandaloneCompany | CaseStudyCompany;

interface Collaboration {
  id: string;
  name: string;
  src: string;
  tagline?: string; // Shared by the visual tooltip and assistive technology.
  href?: string; // Only case studies become links.
}

type TooltipPosition = {
  x: number;
  y: number;
  origin: `${'top' | 'bottom'} ${'left' | 'right'}`;
};

// The tooltip borrows the supplied morph pattern: a compact circle expands
// into the panel, while its content follows just behind the surface motion.
const tooltipSize = {
  closed: 40,
  width: 256,
} as const;

const getTooltipPosition = (
  clientX: number,
  clientY: number,
  tooltipHeight: number,
): TooltipPosition => {
  const pointerOffset = 16;
  const viewportPadding = 8;
  const fitsToRight = clientX + pointerOffset + tooltipSize.width + viewportPadding <= window.innerWidth;
  const fitsBelow = clientY + pointerOffset + tooltipHeight + viewportPadding <= window.innerHeight;

  const x = fitsToRight
    ? clientX + pointerOffset
    : clientX - tooltipSize.width - pointerOffset;
  const y = fitsBelow
    ? clientY + pointerOffset
    : clientY - tooltipHeight - pointerOffset;
  const clampedX = Math.max(viewportPadding, x);
  const clampedY = Math.max(viewportPadding, y);

  return {
    x: clampedX,
    y: clampedY,
    origin: `${clientY <= clampedY + tooltipHeight / 2 ? 'top' : 'bottom'} ${
      clientX <= clampedX + tooltipSize.width / 2 ? 'left' : 'right'
    }`,
  };
};

/* This is intentionally just a roster. Case-study-backed entries only store a
 * slug, so their company name, logo and tagline always come from the shared
 * project data. Brands without a case study keep their local asset details. */
const collaborationSources: CollaborationSource[] = [
  {
    id: 'barclays',
    name: 'Barclays',
    src: '/assets/brands/barclays-symbol.svg',
    tagline: 'Developed Zeus, an all-in-one SME banking concept combining mobile onboarding, receipt capture, open banking and smart contracts.',
  },
  {
    id: 'boa',
    name: 'Bank of America',
    src: '/assets/brands/boa-logo.svg',
  },
  {
    id: 'bp',
    caseStudySlug: 'bp-genai',
  },
  {
    id: 'creditsuisse',
    caseStudySlug: 'cs-kyc',
  },
  {
    id: 'ford',
    name: 'Ford Motor',
    src: '/assets/brands/ford-logo-2.svg',
    tagline: 'Mapped FordPass service journeys and recommended smart mobility features to improve customer experience and strengthen brand loyalty.',
  },
  {
    id: 'ibm',
    name: 'IBM',
    src: '/assets/brands/ibm-logo.svg',
    tagline: 'Designed a people-centred IBM architecture and mobile prototype for a crime-fighting system integrating real-time police data.',
  },
  {
    id: 'uom',
    name: 'The University of Manchester',
    src: '/assets/brands/uom-logo-colour.svg',
    tagline: 'Researched, designed and tested a mobile MyManchester portal that students found easier, faster and more useful.',
  },
  {
    id: 'pg',
    name: 'Procter & Gamble',
    src: '/assets/brands/pg-logo.svg',
    tagline: 'Designed and validated a mobile SuperSavvyMe experience combining digital coupons, product discovery, reviews and community.',
  },
  {
    id: 'vodafone',
    name: 'Vodafone',
    src: '/assets/brands/vodafone-symbol.svg',
    tagline: 'Developed a European market-entry strategy and smart-home IoT proposal aligned with Vodafone’s growth and sustainability goals.',
  }
];

/* Resolve the lightweight roster once, outside the component. flatMap also
 * prevents a broken card if a referenced case study is removed in the future. */
const collaborations: Collaboration[] = collaborationSources.flatMap((company) => {
  if (!('caseStudySlug' in company)) return [company];

  const project = caseStudies.find(({ slug }) => slug === company.caseStudySlug);
  if (!project) return [];

  return [{
    id: company.id,
    name: project.company,
    src: project.logo,
    tagline: project.tagline,
    href: `/${project.slug}`,
  }];
});

export default function Collaborations() {

  const logoGridRef = useRef<HTMLUListElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    x: 0,
    y: 0,
    origin: 'top left',
  });
  const [activeCompanyId, setActiveCompanyId] = useState<string | null>(null);
  const [activeLogoId, setActiveLogoId] = useState<string | null>(null);

  const activeCompany = collaborations.find(({ id }) => id === activeCompanyId);
  const tooltipOriginPoint = `${
    tooltipPosition.origin.endsWith('left') ? '0%' : '100%'
  } ${tooltipPosition.origin.startsWith('top') ? '0%' : '100%'}`;

  // Pointer movement uses the rendered height when available. The layout
  // effect below corrects the first frame as soon as new content is measured.
  const positionTooltip = (clientX: number, clientY: number) => {
    pointerRef.current = { x: clientX, y: clientY };
    setTooltipPosition(getTooltipPosition(
      clientX,
      clientY,
      tooltipRef.current?.offsetHeight ?? 0,
    ));
  };

  useLayoutEffect(() => {
    if (!activeCompany || !tooltipRef.current) return;

    const { x, y } = pointerRef.current;
    setTooltipPosition(getTooltipPosition(x, y, tooltipRef.current.offsetHeight));
  }, [activeCompany]);

  const handlePointerMove = (event: React.PointerEvent<HTMLLIElement>) => {
    positionTooltip(event.clientX, event.clientY);
  };

  // Unlike :active, this touch state survives pointer-up until the next tap elsewhere.
  useEffect(() => {
    const clearActiveLogoOutsideGridCard = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return;

      const targetCard = event.target instanceof Element
        ? event.target.closest('[data-logo-card]')
        : null;

      if (!targetCard || !logoGridRef.current?.contains(targetCard)) {
        setActiveLogoId(null);
        if (logoGridRef.current?.contains(document.activeElement)) {
          (document.activeElement as HTMLElement).blur();
        }
      }
    };

    document.addEventListener('pointerdown', clearActiveLogoOutsideGridCard);
    return () => document.removeEventListener('pointerdown', clearActiveLogoOutsideGridCard);
  }, []);

  useEffect(() => {
    if (!activeCompanyId) return;

    // WCAG 1.4.13: Escape dismisses the floating content without moving focus,
    // so keyboard users can continue from the same collaboration card.
    const dismissTooltip = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveCompanyId(null);
    };

    document.addEventListener('keydown', dismissTooltip);
    return () => document.removeEventListener('keydown', dismissTooltip);
  }, [activeCompanyId]);

  return (
    <Section id="collaborations">
      <div className="section-grid">
          <div className="section-heading">
              <h2>Collaborations
              <br />
              <span className="section-subtitle">Solving human problems in the AI era.</span>
              </h2>
          </div>

          <div className="section-content">
              <StreamingText className="lead">
                I&apos;ve worked in teams fulfilling roles in product design, business analysis, strategy and systems architecture, turning complex problems into practical outcomes. That spans AI-assisted support for 87,000+ bp employees, global workplace services across 50+ locations, and an AI study companion supporting a learning platform with 242,000 daily users.
              </StreamingText>

              <div className="logo-grid">
                <ul
                  ref={logoGridRef}
                  role="list"
                  className="mx-auto grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 list-none ps-0"
                >
                  {collaborations.map((company) => {
                    const isTouchActive = activeLogoId === company.id;
                    const CardContent = (
                      <div className="relative group flex h-32 w-full items-center justify-center p-6">
                        {/* Logo Asset Wrapper */}
                        <div
                          data-touch-active={isTouchActive || undefined}
                          className="relative h-16 w-full motion-safe:transition-transform motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-spring)] motion-safe:group-hover:scale-105 motion-safe:group-active:scale-105 motion-safe:group-focus-within:scale-105 motion-safe:data-[touch-active=true]:scale-105"
                        >
                          <Image
                            src={company.src}
                            alt={company.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            data-touch-active={isTouchActive || undefined}
                            className="object-contain grayscale opacity-80 motion-safe:transition-[filter,opacity] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-standard)] group-hover:filter-none group-hover:opacity-100 group-active:filter-none group-active:opacity-100 group-focus-within:filter-none group-focus-within:opacity-100 data-[touch-active=true]:filter-none data-[touch-active=true]:opacity-100"
                          />
                        </div>

                      </div>
                    );

                    return (
                      <li
                        key={company.id}
                        data-logo-card
                        data-touch-active={isTouchActive || undefined}
                        className="group relative card motion-safe:transition-[scale,border-color,box-shadow] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-standard)] pb-0"
                        onPointerDown={(event) => {
                          if (event.pointerType !== 'mouse') setActiveLogoId(company.id);
                        }}
                        onPointerEnter={(event) => {
                          if (!company.tagline) return;
                          setActiveCompanyId(company.id);
                          positionTooltip(event.clientX, event.clientY);
                        }}
                        onPointerMove={company.tagline ? handlePointerMove : undefined}
                        onPointerLeave={(event) => {
                          // The exit closes into the pointer's final, nearest corner.
                          positionTooltip(event.clientX, event.clientY);
                          setActiveCompanyId(null);
                        }}
                        onFocus={(event) => {
                          if (!company.tagline) return;
                          const bounds = event.currentTarget.getBoundingClientRect();
                          setActiveCompanyId(company.id);
                          positionTooltip(bounds.right, bounds.top + bounds.height / 2);
                        }}
                        onBlur={() => setActiveCompanyId(null)}
                      >
                        {/* This description is always present, so screen readers
                            do not have to wait for the visual tooltip to mount. */}
                        {company.tagline && (
                          <span id={`collaboration-description-${company.id}`} className="sr-only">
                            {company.tagline}
                          </span>
                        )}

                        {company.href ? (
                          <Link
                            href={company.href}
                            aria-describedby={company.tagline ? `collaboration-description-${company.id}` : undefined}
                            className="block w-full h-full rounded-2xl text-inherit"
                          >
                            {CardContent}
                          </Link>
                        ) : company.tagline ? (
                          <div
                            role="group"
                            tabIndex={0}
                            aria-label={company.name}
                            aria-describedby={`collaboration-description-${company.id}`}
                            className="block w-full h-full cursor-help text-left rounded-2xl"
                          >
                            {CardContent}
                          </div>
                        ) : (
                          // Logos without a link or tooltip are presentational,
                          // so they do not add an empty stop to keyboard navigation.
                          <div className="block w-full h-full rounded-2xl">
                            {CardContent}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
          </div>
      </div>

      {/* A portal keeps the tooltip above every section. AnimatePresence retains
          it just long enough to play the reverse scale when the pointer leaves. */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {activeCompany?.tagline && (
            <motion.div
              key={activeCompany.id}
              ref={tooltipRef}
              // Assistive technology uses the persistent description above;
              // this portal is the animated visual presentation of that copy.
              aria-hidden="true"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              // Let the surface finish most of its close before disappearing.
              exit={{
                opacity: 0,
                transition: {
                  delay: shouldReduceMotion ? 0 : motionDuration.fast,
                  duration: shouldReduceMotion ? 0 : motionDelay.short,
                },
              }}
              style={{
                left: tooltipPosition.x,
                top: tooltipPosition.y,
                width: tooltipSize.width,
              }}
              className="pointer-events-none fixed z-[10000] text-left drop-shadow-xl"
            >
              <motion.div
                initial={{
                  clipPath: shouldReduceMotion
                    ? `circle(200% at ${tooltipOriginPoint})`
                    : `circle(${tooltipSize.closed / 2}px at ${tooltipOriginPoint})`,
                }}
                animate={{
                  clipPath: `circle(200% at ${tooltipOriginPoint})`,
                  transition: {
                    duration: shouldReduceMotion ? 0 : 0.35,
                    ease: motionEase.spring,
                  },
                }}
                exit={{
                  // Close all the way into the corner, rather than leaving a
                  // circular surface visible at the end of the transition.
                  clipPath: shouldReduceMotion
                    ? `circle(200% at ${tooltipOriginPoint})`
                    : `circle(0px at ${tooltipOriginPoint})`,
                  transition: {
                    duration: shouldReduceMotion ? 0 : 0.25,
                    ease: motionEase.standard,
                  },
                }}
                className="relative overflow-hidden rounded-xl border border-border-hover bg-bg-tertiary"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    x: shouldReduceMotion
                      ? 0
                      : tooltipPosition.origin.endsWith('left') ? -24 : 24,
                    filter: shouldReduceMotion ? 'blur(0px)' : 'blur(4px)',
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    filter: 'blur(0px)',
                    transition: {
                      delay: shouldReduceMotion ? 0 : motionDelay.short,
                      duration: shouldReduceMotion ? 0 : motionDuration.fast,
                      ease: motionEase.standard,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: shouldReduceMotion
                      ? 0
                      : tooltipPosition.origin.endsWith('left') ? -24 : 24,
                    filter: shouldReduceMotion ? 'blur(0px)' : 'blur(4px)',
                    transition: {
                      duration: shouldReduceMotion ? 0 : motionDuration.fast,
                      ease: motionEase.standard,
                    },
                  }}
                  className="w-64 p-3"
                >
                  <span className="mb-0.5 block font-semibold text-text-primary tracking-tight">{activeCompany.name}</span>
                  <p className="text-xs leading-relaxed">{activeCompany.tagline}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </Section>
  );
}
