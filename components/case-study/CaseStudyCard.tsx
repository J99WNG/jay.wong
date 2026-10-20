'use client';

import Image from "next/image";
import TextLink from "@/components/ui/TextLink";
import type { CaseStudy } from "@/content/caseStudies";
import { ArrowRightIcon, LockIcon } from '@phosphor-icons/react';
import { iconDefaults } from '@/lib/iconography';
import { useEffect, useRef, useState } from 'react';

type CaseStudyCardProps = {
  project: CaseStudy;
  layout?: 'responsive' | 'stacked';
};

export function CaseStudyCard({ project, layout = 'responsive' }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const { slug, year, company, industry, title, tagline, badges, bentoImage, bentoAlt, available } = project;
  const accessRequestSubject = `Access request: ${title}`;
  const accessRequestBody = `Hi Jay,\n\nI've just come across your portfolio and would love to learn more about the case study “${title}”. Could you please share access with me?\n\nThanks!`;
  const accessRequestHref = `mailto:hello@jaywong.digital?subject=${encodeURIComponent(accessRequestSubject)}&body=${encodeURIComponent(accessRequestBody)}`;

  // Mobile cards reveal themselves according to their proximity to the viewport
  // centre. CSS consumes these values for grayscale and scale without rerenders.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frameId = 0;

    const updateScrollProgress = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        if (!mobileQuery.matches || reducedMotionQuery.matches) {
          card.style.setProperty('--mobile-card-scale', '1');
          card.style.setProperty('--mobile-card-grayscale', '0');
          return;
        }

        const bounds = card.getBoundingClientRect();
        const verticalProgress = 1 - Math.min(
          Math.abs(bounds.top + bounds.height / 2 - window.innerHeight / 2) / (window.innerHeight / 2),
          1,
        );
        const horizontalProgress = 1 - Math.min(
          Math.abs(bounds.left + bounds.width / 2 - window.innerWidth / 2) / (window.innerWidth / 2),
          1,
        );
        const progress = Math.max(0, Math.min(verticalProgress, horizontalProgress));

        card.style.setProperty('--mobile-card-scale', String(1 + progress * 0.04));
        card.style.setProperty('--mobile-card-grayscale', String(1 - progress));
      });
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    mobileQuery.addEventListener('change', updateScrollProgress);
    reducedMotionQuery.addEventListener('change', updateScrollProgress);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      mobileQuery.removeEventListener('change', updateScrollProgress);
      reducedMotionQuery.removeEventListener('change', updateScrollProgress);
    };
  }, []);

  // At tablet widths and above, touch retains the established active state.
  useEffect(() => {
    const clearTouchStateOutsideCard = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' || window.innerWidth < 768) return;
      if (!cardRef.current?.contains(event.target as Node)) {
        setIsTouchActive(false);
        if (cardRef.current?.contains(document.activeElement)) {
          (document.activeElement as HTMLElement).blur();
        }
      }
    };

    document.addEventListener('pointerdown', clearTouchStateOutsideCard);
    return () => document.removeEventListener('pointerdown', clearTouchStateOutsideCard);
  }, []);

  return (
    <>
      <article
        ref={cardRef}
        data-touch-active={isTouchActive || undefined}
        onPointerDown={(event) => {
          if (event.pointerType !== 'mouse' && window.innerWidth >= 768) {
            setIsTouchActive(true);
          }
        }}
        className={`case-study-card card h-full ${layout === 'responsive' ? 'md:flex-row' : ''} md:motion-safe:focus-within:scale-104 md:motion-safe:hover:scale-104 md:motion-safe:active:scale-104 md:motion-safe:data-[touch-active=true]:scale-104 motion-safe:transition-[border-color,box-shadow] md:motion-safe:transition-[scale,border-color,box-shadow] md:motion-safe:duration-[var(--motion-duration-standard)] md:motion-safe:ease-[var(--motion-ease-spring)]`}
      >
        {/* Card Content */}
        <div className={`flex flex-1 flex-col gap-2 p-6 ${layout === 'responsive' ? 'md:w-1/2' : 'w-full'}`}>
          <p className="meta-label">
            {year} · {company} · {industry}
          </p>

          <h3>{title}</h3>

          <p>{tagline}</p>

          <div className="inline-flex gap-x-2 gap-y-3 mt-2 flex-wrap">
            {badges.map((badge) => (
              <p key={badge} className="badge">{badge}</p>
            ))}
          </div>

          <TextLink
            className="mt-auto pt-3 cursor-pointer justify-start gap-1"
            href={available ? `/${slug}` : accessRequestHref}
          >
            {available ? 'View case study' : 'Request access'}
            {available ? (
              <ArrowRightIcon {...iconDefaults} aria-hidden="true" className="motion-icon-right" />
            ) : (
              <LockIcon {...iconDefaults} aria-hidden="true" className="motion-icon-right" />
            )}
          </TextLink>
        </div>

        {/* Card Image */}
        <div className={`relative flex w-full aspect-video ${layout === 'responsive' ? 'md:w-1/2 md:min-h-auto' : ''}`}>
          <Image
            className="block w-full h-full object-cover"
            src={bentoImage} alt={bentoAlt} fill />
        </div>
      </article>

      <style jsx>{`
        @media (max-width: 767px) {
          .case-study-card {
            scale: var(--mobile-card-scale, 1) !important;
            transition-property: border-color, box-shadow !important;
          }

          /* The homepage grid has a higher-specificity sibling grayscale rule.
             This local override lets scroll position own the phone treatment. */
          .case-study-card > div {
            filter: grayscale(var(--mobile-card-grayscale, 1)) !important;
            transition: none !important;
          }
        }

        @media (max-width: 767px) and (prefers-reduced-motion: reduce) {
          .case-study-card {
            scale: 1 !important;
          }

          .case-study-card > div {
            filter: none !important;
          }
        }
      `}</style>
    </>
  );
}
