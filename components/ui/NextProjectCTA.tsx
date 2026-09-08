'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { type MouseEvent, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { caseStudies } from '@/app/data/caseStudies';

const HOME_PATH = '/';
const scrollBehavior = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

export default function NextProjectCTA() {
  const pathname = usePathname();
  const router = useRouter();
  const availableCaseStudies = caseStudies.filter(
    (caseStudy) => caseStudy.available === true,
  );
  const currentSlug = pathname.split('/').pop();
  const currentIndex = availableCaseStudies.findIndex(
    (project) => project.slug === currentSlug,
  );

  const scrollToWork = useCallback(() => {
    const work = document.getElementById('work');
    if (!work) return false;

    work.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
    window.setTimeout(() => work.focus({ preventScroll: true }), 0);
    return true;
  }, []);

  const navigateToWork = useCallback(() => {
    if (pathname === HOME_PATH) {
      scrollToWork();
      return;
    }

    router.push(HOME_PATH);

    // This component unmounts after the route change, so keep checking until
    // the homepage's Work section is ready to receive focus and scrolling.
    let attempts = 0;
    const tryScroll = () => {
      attempts += 1;
      if (!scrollToWork() && attempts < 30) {
        requestAnimationFrame(tryScroll);
      }
    };
    requestAnimationFrame(tryScroll);
  }, [pathname, router, scrollToWork]);

  if (currentIndex === -1) return null;

  const nextProject =
    availableCaseStudies[(currentIndex + 1) % availableCaseStudies.length];

  return (
    <div className="flex items-center justify-between">
      <Link
        href={HOME_PATH}
        className="inline-flex min-h-11 w-fit items-center justify-start gap-1 rounded-2xl px-3 py-2 hover:bg-bg-tertiary hover:text-text-link-hover"
        onClick={(event: MouseEvent<HTMLAnchorElement>) => {
          event.preventDefault();
          navigateToWork();
        }}
      >
        <ArrowLeft aria-hidden="true" size={16} className="motion-icon-left" />
        Back to all
      </Link>

      <Link
        href={`/${nextProject.slug}`}
        className="inline-flex min-h-11 w-fit items-center justify-start gap-1 rounded-xl px-3 py-2 hover:bg-bg-tertiary hover:text-text-link-hover"
      >
        Next case study
        <ArrowRight aria-hidden="true" size={16} className="motion-icon-right" />
      </Link>
    </div>
  );
}
