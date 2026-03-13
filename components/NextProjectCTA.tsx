'use client';

import { s } from 'framer-motion/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const caseStudies = [
  { slug: 'bp-itsm-genai', title: 'Project Alpha' },
  { slug: 'bp-workplace', title: 'Project Beta' },
  { slug: 'cs-kyc', title: 'Project Gamma' },
];

export default function NextProjectCTA() {
  const pathname = usePathname();
  
  // Extract the slug from the URL (e.g., /work/project-alpha -> project-alpha)
  const currentSlug = pathname.split('/').pop();

  // Find where we are in the list
  const currentIndex = caseStudies.findIndex(project => project.slug === currentSlug);

  // If the page isn't in our list, don't show the CTA
  if (currentIndex === -1) return null;

  // Logic: (Current Index + 1) % Length wraps the last item back to the first
  const nextIndex = (currentIndex + 1) % caseStudies.length;
  const nextProject = caseStudies[nextIndex];

  return (
    <div className="breadcrumb">
      
      <Link href="/#work" title="Back to all projects">
          <span className="icon icon-sm" aria-hidden="true">
          <span className="material-symbols-rounded arrow_back">
              arrow_back
          </span>
          </span>
          
          Back
      </Link>
                    
      <Link href={`/${nextProject.slug}`} title="Next case study">
          Next case study

          <span className="icon icon-sm" aria-hidden="true">
          <span className="material-symbols-rounded arrow_forward">
              arrow_forward
          </span>
          </span>
      </Link>

    </div>
  );
}