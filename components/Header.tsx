'use client';

import Link from 'next/link'; // Import the Next.js Link engine
import { useState } from 'react';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
      // Handle the body scroll lock
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    };
    
    return (
        <header>
            <div className="container">
                <div className="header-wrapper">
                    {/* Logo */}
                    <Link href="/" className="nav-brand" aria-label="JW Designs homepage">
                        <svg viewBox="0 0 945 426" xmlns="http://www.w3.org/2000/svg">
                            <title>Jay Wong monogram</title>
                            {/* Note: clip-path becomes clipPath in JSX */}
                            <g clipPath="url(#clip0_2477_10)">
                                <path d="M249.1 425.2H179.6L347.3 65.5C365.9 25.5 406 0 450.1 0H519.6L351.8 359.7C333.2 399.7 293.1 425.2 249.1 425.2Z"/>
                                <path d="M461.6 425.2H392.1L559.9 65.5C578.5 25.5 618.6 0 662.7 0H732.2L564.4 359.7C545.8 399.7 505.7 425.2 461.6 425.2Z"/>
                                <path d="M674.2 425.2H604.7L772.5 65.5C791.1 25.5 831.2 0 875.3 0H944.8L777 359.7C758.4 399.7 718.3 425.2 674.2 425.2Z"/>
                                <path d="M70.9 425.2C110.057 425.2 141.8 393.457 141.8 354.3C141.8 315.143 110.057 283.4 70.9 283.4C31.743 283.4 0 315.143 0 354.3C0 393.457 31.743 425.2 70.9 425.2Z"/>
                            </g>
                        </svg>                     
                    </Link>

                    {/* Navigation */} {/* Your Menu - applying the 'is-open' class based on state */}
                    <nav className={`nav-menu ${isOpen ? 'is-open' : ''}`} aria-label="Main navigation">
                        <ul className="nav-list">
                            <li><Link href="/#about">About</Link></li>
                            <li><Link href="/#collaborations">Collaborations</Link></li>
                            <li><Link href="/#work">Work</Link></li>
                            <li>
                                <Link 
                                    href="/assets/documents/Jay-Wong-CV.pdf"
                                    target="_blank" 
                                    rel="noopener">
                                    CV
                                </Link>
                            </li>
                        </ul>

                        {/* CTA */}
                        <Link href="/#contact" className="btn btn-tertiary btn-nav">Contact</Link>
                    </nav>
                
                    {/* Mobile Nav */}
                    <button 
                        className="nav-toggle" 
                        aria-expanded={isOpen} // Automatically changes from "false" to "true"
                        aria-controls="nav-primary" 
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        onClick={toggleMenu} // Triggers the state change
                        >
                        {/* Toggle icons based on state */}
                        {!isOpen ? (
                        <span className="material-symbols-rounded icon-menu" aria-hidden="true">menu</span>
                        ) : (
                        <span className="material-symbols-rounded icon-close" aria-hidden="true">close</span>
                        )}
                    </button>

                </div>
            </div>
        </header>
    );
}