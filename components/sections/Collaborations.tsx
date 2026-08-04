'use client';

import { useState } from "react";
import Section from "../Section";
import Link from 'next/link';
import Image from 'next/image';

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

  // Track mouse coordinates and the active company currently hovered
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredItemId, setHoveredItemId] = useState<string | number | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Track cursor relative to the viewport window coordinates
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <Section id="collaborations">
      <div className="col-30-70">
          <div className="section-heading">
              <h2>Collaborations
              <br />
              <span className="section-subheading">Solving human problems in the AI era.</span>
              </h2>
          </div>

          <div className="section-content">
              <p className="lead">
                Over the past 7 years I've partnered with multidisciplinary teams across energy, finance, and education to turn ambiguous problems into shipped, measurable outcomes.  I sit at the intersection of Design, IT, and Business – not as a buzzword, but as a practice: I've led discovery with engineers and stakeholders, translated research into design systems, and shipped products used by thousands of customers at organisations like bp and Credit Suisse.
              </p>

              <div>
                <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 list-none ps-0">
                  {companyLogos.map((company) => {
                    // Check if the company is hovered AND has a valid description
                    const showTooltip = hoveredItemId === company.id && !!company.roleDescription;

                    const CardContent = (
                      <div className="relative group flex h-32 w-full items-center justify-center p-6">
                        {/* Logo Asset Wrapper */}
                        <div className="relative h-16 w-full transition-all duration-300 group-hover:scale-105 group-active:scale-105 group-focus:scale-105">
                          <Image
                            src={company.src}
                            alt={company.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-contain grayscale opacity-80 transition-all duration-300 ease-in-out group-hover:filter-none group-hover:opacity-100 group-active:filter-none group-active:opacity-100 group-focus:filter-none group-focus:opacity-100"
                          />
                        </div>

                        {/* Mouse-Anchored Floating Tooltip */}
                        {company.roleDescription && (
                          <div
                            role="tooltip"
                            id={`tooltip-${company.id}`}
                            style={{
                              left: `${mousePos.x}px`,
                              top: `${mousePos.y}px`,
                              transform: 'translate(-40%, 50%)',
                            }}
                            className={`fixed pointer-events-none z-50 w-64 rounded-xl bg-bg-tertiary p-2 text-center shadow-xl ring-1 ring-white/10 transition-opacity duration-200 ${
                              showTooltip ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            <span className="block font-bold text-text-primary mb-0.5">{company.name}</span>
                            <p className="text-xs font-sm leading-relaxed">{company.roleDescription}</p>
                          </div>
                        )}
                      </div>
                    );

                    return (
                      <li
                        key={company.id}
                        className="group relative card transition-all duration-300 pb-0"
                        onMouseEnter={() => setHoveredItemId(company.id)}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setHoveredItemId(null)}
                      >
                        {company.caseStudySlug ? (
                          <Link
                            href={company.caseStudySlug}
                            aria-describedby={company.roleDescription ? `tooltip-${company.id}` : undefined}
                            className="block w-full h-full rounded-2xl text-inherit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
                          >
                            {CardContent}
                          </Link>
                        ) : (
                          <button
                            type="button"
                            aria-describedby={company.roleDescription ? `tooltip-${company.id}` : undefined}
                            className={`block w-full h-full text-left rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 ${
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
    </Section>
  );
}