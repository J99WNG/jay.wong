'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

type NavigationItem = {
  id: string;
  label: string;
};

const scrollBehavior = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

const getHeadingLabel = (heading: HTMLHeadingElement) => {
  const directText = Array.from(heading.childNodes)
    .filter((node) => node.nodeType === Node.TEXT_NODE)
    .map((node) => node.textContent)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  return directText || heading.getAttribute('aria-label') || '';
};

export default function CaseStudyNavigation() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    // Build the navigation from each case-study section's primary heading.
    const sections = Array.from(document.querySelectorAll<HTMLElement>('article > section[id]'))
      .filter((section) => section.id !== 'landing');
    const navigationItems = sections.flatMap((section) => {
      const heading = section.querySelector<HTMLHeadingElement>('.section-heading h2');
      const label = heading ? getHeadingLabel(heading) : '';
      return label ? [{ id: section.id, label }] : [];
    });

    // The headings are server-rendered siblings, so they can only be collected
    // once this client component has mounted.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(navigationItems);

    // Track the section crossing the viewport's reading line.
    let frame = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const readingLine = window.innerHeight * 0.35;
        const currentSection = sections.reduce<HTMLElement | undefined>((current, section) =>
          section.getBoundingClientRect().top <= readingLine ? section : current,
        undefined);

        setActiveId(currentSection?.id);
      });
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  if (!items.length) return null;

  const navigateToSection = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const section = document.getElementById(id);
    if (!section) return;

    // Keep the visible URL clean while retaining semantic fragment links.
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    section.focus({ preventScroll: true });
    section.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
  };

  return (
    <nav
      className="group fixed right-0 top-[50dvh] z-(--layer-page-navigation) hidden w-56 -translate-y-1/2 translate-x-40 transform-gpu transition-transform duration-[var(--motion-duration-standard)] ease-[var(--motion-ease-spring)] will-change-transform hover:translate-x-0 focus-within:translate-x-0 motion-reduce:transition-none md:block lg:w-64 lg:translate-x-48"
      aria-label="On this page"
    >
      {/* Resting state: one compact tab for each section. */}
      <div
        className="pointer-events-none absolute left-0 top-1/2 z-20 flex w-16 -translate-y-1/2 flex-col items-center gap-3 transition-[opacity,transform] duration-[var(--motion-duration-standard)] ease-[var(--motion-ease-spring)] after:absolute after:-bottom-4 after:right-0 after:-top-4 after:w-px after:bg-border-base after:content-[''] group-hover:translate-x-3 group-hover:scale-95 group-hover:opacity-0 group-focus-within:translate-x-3 group-focus-within:scale-95 group-focus-within:opacity-0 motion-reduce:transition-none"
        aria-hidden="true"
      >
        {items.map((item) => (
          <span
            key={item.id}
            className={clsx(
              'block h-1 origin-center rounded-full transition-[width,background-color,transform] duration-[var(--motion-duration-standard)] ease-[var(--motion-ease-spring)] motion-reduce:transition-none',
              activeId === item.id
                ? 'w-6 scale-x-105 bg-text-secondary'
                : 'w-4 bg-text-tertiary',
            )}
          />
        ))}
      </div>

      {/* Expanded state: gradient backdrop and accessible section links. */}
      <div className="relative max-h-[calc(100dvh-4rem)] overflow-y-auto rounded-l-3xl bg-linear-to-r from-transparent via-bg-secondary/85 to-bg-secondary px-4 py-5">
        <p
          className="mb-2 translate-x-3 font-pixel text-xs font-semibold uppercase leading-none tracking-[0.04em] text-text-tertiary opacity-0 transition-[opacity,transform] delay-[var(--motion-delay-short)] duration-[var(--motion-duration-standard)] ease-[var(--motion-ease-spring)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 motion-reduce:transition-none"
          aria-hidden="true"
        >
          On this page
        </p>
        <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
          {items.map((item) => (
            <li className="p-0" key={item.id}>
              <a
                className={clsx(
                  'relative flex min-h-11 w-full items-center rounded-xl px-3 py-2.5 text-sm leading-tight transition-[color,background-color,transform] duration-[var(--motion-duration-standard)] ease-[var(--motion-ease-spring)] focus-visible:outline-offset-[-3px] motion-reduce:transition-none',
                  activeId === item.id
                    ? 'bg-transparent font-medium text-accent-interactive hover:bg-transparent hover:text-accent-interactive focus-visible:bg-transparent'
                    : 'text-text-tertiary hover:bg-bg-tertiary hover:text-text-primary focus-visible:bg-bg-tertiary focus-visible:text-text-primary',
                )}
                href={`#${item.id}`}
                onClick={(event) => navigateToSection(event, item.id)}
                aria-current={activeId === item.id ? 'location' : undefined}
              >
                <span className="translate-x-3 overflow-hidden text-ellipsis whitespace-nowrap opacity-0 transition-[opacity,transform] delay-[var(--motion-delay-short)] duration-[var(--motion-duration-standard)] ease-[var(--motion-ease-spring)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 motion-reduce:transition-none">
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
