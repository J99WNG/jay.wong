'use client';

import { useState } from "react";
import Section from "../Section";
import Link from 'next/link';
import Image from 'next/image';

interface LogoItem {
  id: string;
  name: string;
  src: string;
  roleDescription?: string; // Used for tooltips and screen readers
  caseStudySlug?: string;  // Optional: If provided, renders an active link
}

const clientLogos: LogoItem[] = [
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

  // Track mouse coordinates and the active item currently hovered
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
              <div className="content-block">
                  <p className="lead">
                      My work spans energy, finance, and education, where I’ve partnered with multidisciplinary teams to deliver meaningful, scalable outcomes.
                  </p>

                  <p>
                      I&apos;ve spent the last 7 years crafting global, sustainable and inclusive digital experiences. An innate design thinker blended with a strong business acumen — I thrive on bridging the intersections of Design, IT and Business through fostering collaboration and leveraging a user-centred approach to deliver on customer needs and business goals.
                  </p>
              </div>

              <div>
                <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 list-none ps-0">
                  {clientLogos.map((item) => {
                    // Check if the item is hovered AND has a valid description
                    const showTooltip = hoveredItemId === item.id && !!item.roleDescription;

                    const CardContent = (
                      <div className="relative group flex h-32 w-full items-center justify-center p-6">
                        {/* Logo Asset Wrapper */}
                        <div className="relative h-16 w-full transition-all duration-300 group-hover:scale-105 group-active:scale-105 group-focus:scale-105">
                          <Image
                            src={item.src}
                            alt={`${item.name} logo`}
                            fill
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="object-contain grayscale opacity-80 transition-all duration-300 ease-in-out group-hover:filter-none group-hover:opacity-100 group-active:filter-none group-active:opacity-100 group-focus:filter-none group-focus:opacity-100"
                          />
                        </div>

                        {/* Mouse-Anchored Floating Tooltip */}
                        {item.roleDescription && (
                          <div
                            role="tooltip"
                            id={`tooltip-${item.id}`}
                            style={{
                              left: `${mousePos.x}px`,
                              top: `${mousePos.y}px`,
                              transform: 'translate(-40%, 50%)',
                            }}
                            className={`fixed pointer-events-none z-50 w-64 rounded-xl bg-bg-tertiary p-2 text-center shadow-xl ring-1 ring-white/10 transition-opacity duration-200 ${
                              showTooltip ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            <span className="block font-bold text-text-primary mb-0.5">{item.name}</span>
                            <p className="text-xs font-sm leading-relaxed">{item.roleDescription}</p>
                          </div>
                        )}
                      </div>
                    );

                    return (
                      <li
                        key={item.id}
                        className="group relative card transition-all duration-300 pb-0"
                        onMouseEnter={() => setHoveredItemId(item.id)}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setHoveredItemId(null)}
                      >
                        {item.caseStudySlug ? (
                          <Link
                            href={item.caseStudySlug}
                            aria-describedby={item.roleDescription ? `tooltip-${item.id}` : undefined}
                            className="block w-full h-full rounded-2xl text-inherit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
                          >
                            {CardContent}
                          </Link>
                        ) : (
                          <button
                            type="button"
                            aria-describedby={item.roleDescription ? `tooltip-${item.id}` : undefined}
                            className={`block w-full h-full text-left rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600 ${
                              item.roleDescription ? 'cursor-help' : 'cursor-default'
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