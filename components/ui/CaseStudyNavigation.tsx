'use client';

import { useEffect, useState } from 'react';

type NavigationItem = {
  id: string;
  label: string;
};

const scrollBehavior = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

export default function CaseStudyNavigation() {
  const [items, setItems] = useState<NavigationItem[]>([]);
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('article > section[id]'))
      .filter((section) => section.id !== 'landing');
    const navigationItems = sections.flatMap((section) => {
      const heading = section.querySelector('h2');
      const label = heading?.textContent?.replace(/\s+/g, ' ').trim();
      return label ? [{ id: section.id, label }] : [];
    });

    // The headings are server-rendered siblings, so they can only be collected
    // once this client component has mounted.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(navigationItems);
    setActiveId(navigationItems[0]?.id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visibleSection) setActiveId((visibleSection.target as HTMLElement).id);
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
    <nav className="case-study-navigation" aria-label="On this page">
      <p className="case-study-navigation__label" aria-hidden="true">On this page</p>
      <ul>
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={(event) => navigateToSection(event, item.id)}
              aria-current={activeId === item.id ? 'location' : undefined}
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
