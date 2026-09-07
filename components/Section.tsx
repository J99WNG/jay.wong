'use client';
import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  children: ReactNode;
  isLanding?: boolean;
  stickyHeading?: boolean;
  className?: string;
}

const Section = ({
  id,
  children,
  isLanding = false,
  stickyHeading = true,
  className = "",
}: SectionProps) => {
  const [isVisible, setIsVisible] = useState(isLanding); // Landing starts visible
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!stickyHeading) return;

    const headings = sectionRef.current?.querySelectorAll<HTMLElement>(
      '.section-grid > .section-heading'
    );
    if (!headings?.length) return;

    // Measure the full heading so wrapped titles stay centered without a
    // transform that would move them outside their section at its boundaries.
    const observer = new ResizeObserver((entries) => {
      entries.forEach(({ target, borderBoxSize }) => {
        const height = borderBoxSize[0]?.blockSize ?? target.getBoundingClientRect().height;
        (target as HTMLElement).style.setProperty('--section-heading-height', `${height}px`);
      });
    });

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [stickyHeading]);

  useEffect(() => {
    // If it's the landing section, we might not want it to ever fade out
    if (isLanding) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Two-way trigger logic
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0,
        // rootMargin creates a 'buffer' so the element is well
        // inside the screen before it triggers.
        rootMargin: '-40% 0px -40% 0px'
      }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isLanding]);

  return (
    <section
      id={id}
      ref={sectionRef}
      tabIndex={-1}
      data-sticky-heading={stickyHeading || undefined}
      className={`
        page-section relative isolate w-full mx-auto py-25
        print:min-h-0 print:overflow-visible
        ${isLanding
          ? 'min-h-screen overflow-hidden content-center bg-bg-secondary md:pt-[calc(var(--header-height)+6rem)] md:pb-32'
          : 'min-h-fit overflow-visible bg-bg-primary'}
        ${className}
      `}
    >
      {/* ANIMATED CONTENT WRAPPER
          We observe the <section> above, which is STABLE (static height).
          We animate this <div>, which is MOVING.
          Because the observer is watching the parent, the movement won't cause a flicker.
      */}
      <div className={`
        relative page-container
        opacity-100 blur-none
        motion-safe:transition-[opacity,filter] motion-safe:duration-[var(--motion-duration-slow)]
        motion-safe:ease-[var(--motion-ease-standard)]
        motion-safe:will-change-[opacity,filter]
        print:opacity-100 print:blur-none print:transition-none
        ${isVisible ? '' : 'motion-safe:opacity-0 motion-safe:blur-xs'}
      `}>
        {children}
      </div>
    </section>
  );
};

export default Section;
