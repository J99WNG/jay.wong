'use client';

import { useState } from 'react';

export default function CopyEmail() {
    const email = "hello@jaywong.digital";
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy!", err);
        }
    };

    return (
        <>
            <button 
                onClick={handleCopy}
                className="contact-item" 
                type="button"
                role="listitem"
            >
                <span className="icon icon-lg" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="m480-920 362 216q18 11 28 30t10 40v434q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200v-434q0-21 10-40t28-30l362-216Zm0 466 312-186-312-186-312 186 312 186Zm0 94L160-552v352h640v-352L480-360Zm0 160h320-640 320Z"/>
                    </svg>
                </span>

                <div className="contact-text">
                    <span className={`contact-text ${isCopied ? 'fade-out' : 'fade-in'}`} translate="no">
                        {email}
                    </span>

                    <span className={`contact-text copied-label ${isCopied ? 'fade-in' : 'fade-out'}`}>
                        Copied to clipboard!
                    </span>
                </div>

                <span className="icon icon-md" aria-hidden="true">
                    <span className="material-symbols-rounded" style={{ transition: '0.2s' }}>
                        {isCopied ? 'check' : 'content_copy'}
                    </span>
                </span>
            </button>

            <style jsx>{`
                .copied-label {
                    position: absolute;
                    left: 0;
                    color: var(--iron-buddha);
                }
                .fade-in {
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity 0.3s ease, transform 0.3s ease;
                }
                .fade-out {
                    opacity: 0;
                    transform: translateY(-5px);
                    pointer-events: none;
                    transition: opacity 0.2s ease, transform 0.2s ease;
                }
            `}</style>
        </>
    );
}