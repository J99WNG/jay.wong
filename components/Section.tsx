// components/Section.tsx
import React from 'react';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  isLanding?: boolean; // Specialized styling for Hero/Landing
  className?: string;   // For unique one-off overrides
}

const Section = ({ id, children, isLanding = false, className = "" }: SectionProps) => {
  return (
    <section 
      id={id}
      className={`
        relative overflow-hidden isolate
        /* Conditional logic for landing vs standard sections */
        ${isLanding 
          ? 'min-h-screen !bg-[var(--white-pekoe)] pt-[calc(var(--header-height)+6rem)] pb-24' 
          : 'min-h-fit bg-[var(--silver-needle)] py-26'}
        /* Base styles from your CSS translation */
        scroll-mt-0 mx-auto w-full
        ${className}
      `}
    >
      {/* The Grain Overlay (Replaces section::before) */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none select-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` 
        }}
        aria-hidden="true"
      />

      {/* Content Wrapper (Z-index 10 ensures it stays above grain) */}
      <div 
        className="relative z-10 px-6 container section-fade">
        {children}
      </div>
    </section>
  );
};

export default Section;