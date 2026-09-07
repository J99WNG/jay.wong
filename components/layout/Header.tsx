'use client';

import Link from 'next/link';
import { type MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

const HOME_PATH = '/';
type ScrollTarget = 'top' | 'about' | 'collaborations' | 'work' | 'contact';
const scrollBehavior = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const pendingTarget = useRef<ScrollTarget | null>(null);
    const menuToggleRef = useRef<HTMLButtonElement>(null);

    const scrollToTarget = useCallback((target: ScrollTarget) => {
        if (target === 'top') {
            window.scrollTo({ top: 0, behavior: scrollBehavior() });
            return true;
        }

        const section = document.getElementById(target);
        if (!section) return false;

        section.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });

        // Give keyboard and screen-reader users meaningful context after navigation.
        window.setTimeout(() => section.focus({ preventScroll: true }), 0);
        return true;
    }, []);

    const navigateTo = useCallback((target: ScrollTarget) => {
        setIsOpen(false);

        if (pathname !== HOME_PATH) {
            // The header is expected to live in the root layout, so it remains mounted
            // while the route changes and can perform the pending scroll below.
            pendingTarget.current = target;
            router.push(HOME_PATH);
            return;
        }

        scrollToTarget(target);
    }, [pathname, router, scrollToTarget]);

    // Once the home page has rendered after a cross-page navigation, find its target.
    useEffect(() => {
        if (pathname !== HOME_PATH || !pendingTarget.current) return;

        const target = pendingTarget.current;
        let attempts = 0;
        let animationFrame: number;

        const tryScroll = () => {
            attempts += 1;
            if (scrollToTarget(target) || attempts >= 30) {
                pendingTarget.current = null;
                return;
            }
            animationFrame = requestAnimationFrame(tryScroll);
        };

        animationFrame = requestAnimationFrame(tryScroll);
        return () => cancelAnimationFrame(animationFrame);
    }, [pathname, scrollToTarget]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 24);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== 'Escape') return;

            setIsOpen(false);
            window.requestAnimationFrame(() => menuToggleRef.current?.focus());
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const handleTargetClick = (event: MouseEvent<HTMLElement>, target: ScrollTarget) => {
        event.preventDefault();
        navigateTo(target);
    };

    return (
        <header className="fixed top-0 left-0 z-(--layer-header) h-auto w-full pointer-events-none bg-linear-to-b from-bg-primary/70 to-transparent motion-safe:transition-[background-color,opacity] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-standard)]">
            <div className="page-container">
                <div className={`relative h-16 my-4 mx-auto p-4 flex items-center justify-between rounded-3xl pointer-events-auto backdrop-blur-md motion-safe:transition-[max-width,background-color,backdrop-filter] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-spring)] ${scrolled ? 'max-w-xl bg-(--color-steep-700)/80' : 'max-w-full bg-(--color-steep-700)'}`}>
                    <Link
                        href={HOME_PATH}
                        id="nav-brand"
                        className="flex items-center basis-auto flex-none rounded-lg group"
                        aria-label="Back to the top of the homepage"
                        onClick={(event) => handleTargetClick(event, 'top')}
                    >
                        <svg
                            viewBox="0 0 945 426"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className="block h-8 w-auto fill-neutral-100 motion-safe:transition-colors motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-standard)] group-hover:fill-neutral-700 group-focus-visible:fill-neutral-700 group-active:fill-neutral-700"
                        >
                            <g>
                                <path d="M249.1 425.2H179.6L347.3 65.5C365.9 25.5 406 0 450.1 0H519.6L351.8 359.7C333.2 399.7 293.1 425.2 249.1 425.2Z" />
                                <path d="M461.6 425.2H392.1L559.9 65.5C578.5 25.5 618.6 0 662.7 0H732.2L564.4 359.7C545.8 399.7 505.7 425.2 461.6 425.2Z" />
                                <path d="M674.2 425.2H604.7L772.5 65.5C791.1 25.5 831.2 0 875.3 0H944.8L777 359.7C758.4 399.7 718.3 425.2 674.2 425.2Z" />
                                <path d="M70.9 425.2C110.057 425.2 141.8 393.457 141.8 354.3C141.8 315.143 110.057 283.4 70.9 283.4C31.743 283.4 0 315.143 0 354.3C0 393.457 31.743 425.2 70.9 425.2Z" />
                            </g>
                        </svg>
                    </Link>

                    <button
                        ref={menuToggleRef}
                        className="nav-toggle"
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls="nav-primary"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setIsOpen((open) => !open)}
                    >
                        <Icon name="menu" className="icon-menu" />
                        <Icon name="x" className="icon-close" />
                    </button>

                    <nav id="nav-primary" className={`nav-menu ${isOpen ? 'is-open' : ''}`} aria-label="Main navigation">
                        <ul className="nav-list flex flex-col md:flex-row p-0 list-none gap-6 md:gap-8 items-start md:items-center md:mx-auto md:my-0 justify-center font-light">
                            <li><Link className="rounded-md" href="/#work" onClick={(event) => handleTargetClick(event, 'work')}>Work</Link></li>
                            <li><Link className="rounded-md" href="/#about" onClick={(event) => handleTargetClick(event, 'about')}>About</Link></li>
                            <li><Link className="rounded-md" href="/#collaborations" onClick={(event) => handleTargetClick(event, 'collaborations')}>Collaborations</Link></li>

                        </ul>
                        <Button variant="nav" href="/#contact" onClick={(event: MouseEvent<HTMLElement>) => handleTargetClick(event, 'contact')}>Contact</Button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
