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

  // Unlike :active, this touch state survives pointer-up until the next tap elsewhere.
  useEffect(() => {
    const clearTouchStateOutsideCard = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return;
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
    <article
      ref={cardRef}
      data-touch-active={isTouchActive || undefined}
      onPointerDown={(event) => {
        if (event.pointerType !== 'mouse') setIsTouchActive(true);
      }}
      className={`card h-full ${layout === 'responsive' ? 'md:flex-row' : ''} motion-safe:focus-within:scale-104 motion-safe:hover:scale-104 motion-safe:active:scale-104 motion-safe:data-[touch-active=true]:scale-104 motion-safe:transition-[scale,border-color,box-shadow] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-spring)]`}
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
  );
}
