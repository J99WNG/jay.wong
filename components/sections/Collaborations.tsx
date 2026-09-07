'use client';

import { useState } from "react";
import Section from "../Section";
import Link from 'next/link';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface CompanyLogo {
  id: string;
  name: string;
  src: string;
  roleDescription?: string; // Used for tooltips and screen readers
  caseStudySlug?: string;  // Optional: If provided, renders an active link
}

const companyLogos: CompanyLogo[] = [
  {
    id: 'barclays',
    name: 'Barclays',
    src: '/assets/logos/barclays-symbol.svg',
  },
  {
    id: 'boa',
    name: 'Bank of America',
    src: '/assets/logos/boa-logo.svg',
  },
  {
    id: 'bp',
    name: 'bp',
    src: '/assets/logos/bp-helios-colour.svg',
    roleDescription: 'Reducing repeat IT tickets by 24% through AI-assisted knowledge discovery.',
    caseStudySlug: '/bp-genai',
  },
  {
    id: 'creditsuisse',
    name: 'Credit Suisse',
    src: '/assets/logos/creditsuisse-symbol.svg',
    roleDescription: 'A case study commissioned by Credit Suisse to redirect ~136,800 productivity hours annually towards valuable client-facing time.',
    caseStudySlug: '/cs-kyc',
  },
  {
    id: 'ford',
    name: 'Ford Motor',
    src: '/assets/logos/ford-logo-2.svg',
  },
  {
    id: 'ibm',
    name: 'IBM',
    src: '/assets/logos/ibm-logo.svg',
  },
  {
    id: 'uom',
    name: 'The University of Manchester',
    src: '/assets/logos/uom-logo-colour.svg',
    roleDescription: 'Enhancing the mobile digital learning experience for students',
  },
  {
    id: 'pg',
    name: 'Procter & Gamble',
    src: '/assets/logos/pg-logo.svg',
  },
  {
    id: 'vodafone',
    name: 'Vodafone',
    src: '/assets/logos/vodafone-symbol.svg',
  }
];

export default function Collaborations() {

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeCompanyId, setActiveCompanyId] = useState<string | null>(null);

  const activeCompany = companyLogos.find(({ id }) => id === activeCompanyId);

  const positionTooltip = (clientX: number, clientY: number) => {
    const tooltipWidth = 256;
    const tooltipHeight = 144;
    const pointerOffset = 16;
    const viewportPadding = 8;

    const fitsToRight = clientX + pointerOffset + tooltipWidth + viewportPadding <= window.innerWidth;
    const fitsBelow = clientY + pointerOffset + tooltipHeight + viewportPadding <= window.innerHeight;

    const x = fitsToRight
      ? clientX + pointerOffset
      : clientX - tooltipWidth - pointerOffset;
    const y = fitsBelow
      ? clientY + pointerOffset
      : clientY - tooltipHeight - pointerOffset;

    setMousePos({
      x: Math.max(viewportPadding, x),
      y: Math.max(viewportPadding, y),
    });
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLLIElement>) => {
    positionTooltip(event.clientX, event.clientY);
  };

  return (
    <Section id="collaborations">
      <div className="section-grid">
          <div className="section-heading">
              <h2>Collaborations
              <br />
              <span className="font-normal text-text-tertiary">Solving human problems in the AI era.</span>
              </h2>
          </div>

          <div className="inline-flex max-w-full flex-col gap-10">
              <p className="lead">
                I&apos;ve worked in multidisciplinary teams turning complex, ambiguous problems into shipped outcomes. That includes AI-assisted support for 87,000+ bp employees, a global workplace experience spanning 15+ services and 50+ locations, and an AI study companion serving approximately 250,000 students.
              </p>

              <div className="logo-grid">
                <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 list-none ps-0">
                  {companyLogos.map((company) => {
                    const CardContent = (
                      <div className="relative group flex h-32 w-full items-center justify-center p-6">
                        {/* Logo Asset Wrapper */}
                        <div className="relative h-16 w-full motion-safe:transition-transform motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-spring)] motion-safe:group-hover:scale-105 motion-safe:group-active:scale-105 motion-safe:group-focus-within:scale-105">
                          <Image
                            src={company.src}
                            alt={company.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-contain grayscale opacity-80 motion-safe:transition-[filter,opacity] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-standard)] group-hover:filter-none group-hover:opacity-100 group-active:filter-none group-active:opacity-100 group-focus-within:filter-none group-focus-within:opacity-100"
                          />
                        </div>

                      </div>
                    );

                    return (
                      <li
                        key={company.id}
                        className="group relative card motion-safe:transition-[scale,border-color,box-shadow] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-standard)] pb-0"
                        onPointerEnter={(event) => {
                          if (!company.roleDescription) return;
                          setActiveCompanyId(company.id);
                          positionTooltip(event.clientX, event.clientY);
                        }}
                        onPointerMove={company.roleDescription ? handlePointerMove : undefined}
                        onPointerLeave={() => setActiveCompanyId(null)}
                        onFocus={(event) => {
                          if (!company.roleDescription) return;
                          const bounds = event.currentTarget.getBoundingClientRect();
                          setActiveCompanyId(company.id);
                          positionTooltip(bounds.right, bounds.top + bounds.height / 2);
                        }}
                        onBlur={() => setActiveCompanyId(null)}
                      >
                        {company.caseStudySlug ? (
                          <Link
                            href={company.caseStudySlug}
                            aria-describedby={company.roleDescription ? `tooltip-${company.id}` : undefined}
                            className="block w-full h-full rounded-2xl text-inherit"
                          >
                            {CardContent}
                          </Link>
                        ) : (
                          <button
                            type="button"
                            aria-describedby={company.roleDescription ? `tooltip-${company.id}` : undefined}
                            className={`block w-full h-full text-left rounded-2xl ${
                              company.roleDescription ? 'cursor-help' : 'cursor-default'
                            }`}
                          >
                            {CardContent}
                          </button>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
          </div>
      </div>

      {activeCompany?.roleDescription && typeof document !== 'undefined' && createPortal(
        <div
          role="tooltip"
          id={`tooltip-${activeCompany.id}`}
          style={{ left: mousePos.x, top: mousePos.y }}
          className="pointer-events-none fixed z-[10000] w-64 rounded-xl bg-bg-tertiary p-2 text-center shadow-xl ring-1 ring-white/10"
        >
          <span className="mb-0.5 block font-semibold text-text-primary tracking-tight">{activeCompany.name}</span>
          <p className="text-xs leading-relaxed">{activeCompany.roleDescription}</p>
        </div>,
        document.body,
      )}
    </Section>
  );
}
