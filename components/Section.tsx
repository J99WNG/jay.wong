'use client';
import { useEffect, useRef, useState } from 'react';

const Section = ({ id, children, isLanding = false, className = "" }: SectionProps) => {
  const [isVisible, setIsVisible] = useState(isLanding); // Landing starts visible
  const sectionRef = useRef<HTMLElement>(null);

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
      className={`
        relative overflow-hidden isolate content-center w-full mx-auto
        ${isLanding 
          ? 'min-h-screen bg-[var(--white-pekoe)] pt-[calc(var(--header-height)+6rem)] pb-32' 
          : 'min-h-fit bg-[var(--silver-needle)] py-32'}
        ${className}
      `}
    >
      {/* ANIMATED CONTENT WRAPPER 
          We observe the <section> above, which is STABLE (static height).
          We animate this <div>, which is MOVING. 
          Because the observer is watching the parent, the movement won't cause a flicker.
      */}
      <div className={`
        relative z-10 px-6 container transition-[opacity,transform] duration-[2000ms]
        ease-[cubic-bezier(0.215,0.61,0.355,1)] will-change-[opacity,transform]
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}>
        {children}
      </div>
    </section>
  );
};

export default Section;