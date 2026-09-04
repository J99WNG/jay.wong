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

    window.history.pushState(null, '', `#${id}`);
    section.focus({ preventScroll: true });
    section.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
  };

  return (
    <nav
      className="group fixed right-0 top-[50dvh] z-20 hidden w-[min(18rem,calc(100vw-1.5rem))] -translate-y-1/2 translate-x-[calc(100%-3.5rem)] transform-gpu [--nav-spring:cubic-bezier(0.34,1.42,0.64,1)] transition-transform duration-[420ms] ease-[var(--nav-spring)] will-change-transform hover:translate-x-0 focus-within:translate-x-0 motion-reduce:transition-none md:block"
      aria-label="On this page"
    >
      <div
        className="pointer-events-none absolute left-0 top-1/2 z-20 flex w-14 -translate-y-1/2 flex-col items-center gap-3 transition-[opacity,transform] duration-300 ease-[var(--nav-spring)] after:absolute after:-bottom-4 after:right-0 after:-top-4 after:w-px after:bg-border-base after:content-[''] group-hover:translate-x-3 group-hover:scale-95 group-hover:opacity-0 group-focus-within:translate-x-3 group-focus-within:scale-95 group-focus-within:opacity-0 motion-reduce:transition-none"
        aria-hidden="true"
      >
        {items.map((item) => (
          <span
            key={item.id}
            className={clsx(
              'block h-1 origin-center rounded-full transition-[width,background-color,transform] duration-300 ease-[var(--nav-spring)] motion-reduce:transition-none',
              activeId === item.id
                ? 'w-6 scale-x-105 bg-text-secondary'
                : 'w-4 bg-text-tertiary',
            )}
          />
        ))}
      </div>
      <div className="relative isolate max-h-[calc(100dvh-4rem)] overflow-y-auto bg-transparent px-6 py-5 before:absolute before:inset-0 before:-z-10 before:origin-right before:translate-x-5 before:scale-x-[0.96] before:rounded-l-3xl before:bg-linear-to-r before:from-transparent before:via-bg-secondary/25 before:to-bg-secondary/50 before:opacity-0 before:content-[''] before:transition-[opacity,transform] before:duration-[420ms] before:ease-[var(--nav-spring)] group-hover:before:translate-x-0 group-hover:before:scale-x-100 group-hover:before:opacity-100 group-focus-within:before:translate-x-0 group-focus-within:before:scale-x-100 group-focus-within:before:opacity-100 motion-reduce:before:transition-none">
        <p
          className="mb-2 translate-x-3 font-pixel text-xs font-semibold uppercase leading-none tracking-[0.04em] text-text-tertiary opacity-0 transition-[opacity,transform] delay-75 duration-300 ease-[var(--nav-spring)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 motion-reduce:transition-none"
          aria-hidden="true"
        >
          On this page
        </p>
        <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
          {items.map((item) => (
            <li className="p-0" key={item.id}>
              <a
                className={clsx(
                  'relative flex min-h-11 w-full items-center rounded-xl px-3 py-2.5 text-sm leading-tight transition-[color,background-color,transform] duration-300 ease-[var(--nav-spring)] focus-visible:outline-offset-[-3px] motion-reduce:transition-none',
                  activeId === item.id
                    ? 'bg-transparent font-medium text-accent-interactive hover:bg-transparent hover:text-accent-interactive focus-visible:bg-transparent'
                    : 'text-text-tertiary hover:bg-bg-tertiary/50 hover:text-text-primary focus-visible:bg-bg-tertiary/50 focus-visible:text-text-primary',
                )}
                href={`#${item.id}`}
                onClick={(event) => navigateToSection(event, item.id)}
                aria-current={activeId === item.id ? 'location' : undefined}
              >
                <span className="translate-x-3 overflow-hidden text-ellipsis whitespace-nowrap opacity-0 transition-[opacity,transform] delay-75 duration-300 ease-[var(--nav-spring)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100 motion-reduce:transition-none">
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
