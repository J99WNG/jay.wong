'use client';

import Link from 'next/link';
import { type MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ListIcon, XIcon } from '@phosphor-icons/react';
import Button from '../ui/Button';

const HOME_PATH = '/';
type ScrollTarget = 'top' | 'about' | 'collaborations' | 'work' | 'contact';

const NAV_LINK_STYLES = 'inline-flex h-auto w-full items-center rounded-xl px-3 py-2 text-inherit motion-safe:transition-[color,background-color,transform] motion-safe:duration-[var(--motion-duration-fast)] motion-safe:ease-[var(--motion-ease-standard)] motion-safe:active:scale-[0.98]';
const scrollBehavior = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const pendingTarget = useRef<ScrollTarget | null>(null);
    const menuToggleRef = useRef<HTMLButtonElement>(null);
    const navSurfaceRef = useRef<HTMLDivElement>(null);
    const hasSurface = scrolled || isOpen;
    const navHoverColorStyles = hasSurface
        ? 'hover:text-(--color-porcelain-500) focus-visible:text-(--color-porcelain-500) active:text-(--color-porcelain-500)'
        : 'hover:text-text-secondary focus-visible:text-text-secondary active:text-text-secondary';
    const navLinkSurfaceStyles = hasSurface
        ? 'hover:bg-(--color-steep-300) focus-visible:bg-(--color-steep-300) active:bg-(--color-steep-300)'
        : 'hover:bg-bg-secondary focus-visible:bg-bg-secondary active:bg-bg-tertiary';

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

    useEffect(() => {
        if (!isOpen) return;

        // Pointer events cover both mouse clicks and touchscreen taps. Keep
        // taps inside the header interactive; any tap outside closes the tray.
        const handleOutsidePress = (event: PointerEvent) => {
            if (navSurfaceRef.current?.contains(event.target as Node)) return;
            setIsOpen(false);
        };

        document.addEventListener('pointerdown', handleOutsidePress);
        return () => document.removeEventListener('pointerdown', handleOutsidePress);
    }, [isOpen]);

    const handleTargetClick = (event: MouseEvent<HTMLElement>, target: ScrollTarget) => {
        event.preventDefault();
        navigateTo(target);
    };

    return (
        <header className="fixed top-0 left-0 isolate z-(--layer-header) h-auto w-full pointer-events-none sm:bg-linear-to-b sm:from-bg-primary sm:via-bg-primary/70 sm:to-transparent">
            <div className="page-container relative z-10">
                {/* Scrolling or opening the mobile menu invokes the compact navigation surface. */}
                <div ref={navSurfaceRef} id="wrapper" className={`relative my-4 mx-auto grid min-h-16 grid-cols-[1fr_auto] items-center rounded-3xl py-2.5 pointer-events-auto motion-safe:transition-[max-width,background-color,color,padding,backdrop-filter] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-spring)] sm:flex sm:h-16 sm:justify-between ${hasSurface ? 'max-w-xl bg-(--color-steep-700)/80 px-4 text-(--color-porcelain-100) backdrop-blur-md' : 'max-w-full bg-transparent px-0 text-text-primary backdrop-blur-none'}`}>
                    {/* Brand mark doubles as a shortcut back to the top of the homepage. */}
                    <Link
                        href={HOME_PATH}
                        id="nav-brand"
                        className={`flex items-center basis-auto flex-none rounded-lg text-inherit motion-safe:transition-colors motion-safe:duration-[var(--motion-duration-fast)] motion-safe:ease-[var(--motion-ease-standard)] ${navHoverColorStyles}`}
                        aria-label="Back to the top of the homepage"
                        onClick={(event) => handleTargetClick(event, 'top')}
                    >
                        <svg
                            viewBox="0 0 945 426"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className="block h-8 w-auto fill-current"
                        >
                            <g>
                                <path d="M249.1 425.2H179.6L347.3 65.5C365.9 25.5 406 0 450.1 0H519.6L351.8 359.7C333.2 399.7 293.1 425.2 249.1 425.2Z" />
                                <path d="M461.6 425.2H392.1L559.9 65.5C578.5 25.5 618.6 0 662.7 0H732.2L564.4 359.7C545.8 399.7 505.7 425.2 461.6 425.2Z" />
                                <path d="M674.2 425.2H604.7L772.5 65.5C791.1 25.5 831.2 0 875.3 0H944.8L777 359.7C758.4 399.7 718.3 425.2 674.2 425.2Z" />
                                <path d="M70.9 425.2C110.057 425.2 141.8 393.457 141.8 354.3C141.8 315.143 110.057 283.4 70.9 283.4C31.743 283.4 0 315.143 0 354.3C0 393.457 31.743 425.2 70.9 425.2Z" />
                            </g>
                        </svg>
                    </Link>

                    {/* Mobile control morphs between the menu and close icons. */}
                    <button
                        ref={menuToggleRef}
                        className={`group relative z-2 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-2xl border-0 bg-transparent p-0 text-inherit motion-safe:transition-[color,scale] motion-safe:duration-150 motion-safe:ease-[var(--motion-ease-standard)] motion-safe:active:scale-[0.97] sm:hidden ${navHoverColorStyles}`}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls="nav-primary"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        onClick={() => setIsOpen((open) => !open)}
                    >
                        <ListIcon
                            size={24}
                            aria-hidden="true"
                            data-visible={!isOpen}
                            className={`motion-icon-swap absolute text-inherit motion-reduce:rotate-0 motion-reduce:scale-100 ${isOpen ? 'rotate-180 scale-75' : 'rotate-0 scale-100'}`}
                        />
                        <XIcon
                            size={24}
                            aria-hidden="true"
                            data-visible={isOpen}
                            className={`motion-icon-swap absolute text-inherit motion-reduce:rotate-0 motion-reduce:scale-100 ${isOpen ? 'rotate-0 scale-100' : '-rotate-180 scale-75'}`}
                        />
                    </button>

                    {/* Navigation links become a floating tray on mobile and sit inline on desktop. */}
                    <nav
                        id="nav-primary"
                        data-open={isOpen}
                        className="mobile-nav-tray col-span-2 grid w-full sm:col-auto sm:block sm:flex-1"
                        aria-label="Main navigation"
                    >
                        <div className="min-h-0 overflow-hidden sm:contents">
                            {/* The content fades and de-focuses while the tray changes height;
                                both directions use the same standard motion timing. */}
                            <div className="mobile-nav-content flex flex-col sm:gap-0 gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-0">
                                <ul className="flex list-none flex-col items-center justify-center gap-3 p-0 text-2xl font-light sm:mx-auto sm:gap-1 sm:my-0 sm:flex-row sm:text-base">
                                    <li><Link className={`${NAV_LINK_STYLES} ${navHoverColorStyles} ${navLinkSurfaceStyles}`} href="/#work" onClick={(event) => handleTargetClick(event, 'work')}>Work</Link></li>
                                    <li><Link className={`${NAV_LINK_STYLES} ${navHoverColorStyles} ${navLinkSurfaceStyles}`} href="/#about" onClick={(event) => handleTargetClick(event, 'about')}>About</Link></li>
                                    <li><Link className={`${NAV_LINK_STYLES} ${navHoverColorStyles} ${navLinkSurfaceStyles}`} href="/#collaborations" onClick={(event) => handleTargetClick(event, 'collaborations')}>Collaborations</Link></li>
                                </ul>

                                <Button
                                    variant="nav"
                                    href="/#contact"
                                    onClick={(event: MouseEvent<HTMLElement>) => handleTargetClick(event, 'contact')}
                                >
                                    Contact
                                </Button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
