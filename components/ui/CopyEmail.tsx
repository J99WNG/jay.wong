'use client';

import { useState } from 'react';
import { CheckIcon, CopyIcon, EnvelopeIcon } from '@phosphor-icons/react';

export default function CopyEmail() {
    const email = "hello@jaywong.digital";
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        if (typeof window !== "undefined" && navigator && navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(email);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy!", err);
            }
        } else {
            // Secure Fallback
            try {
                const textArea = document.createElement("textarea");
                textArea.value = email;
                textArea.style.position = "fixed";
                textArea.style.opacity = "0";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            } catch (err) {
                console.error("Fallback copy failed", err);
            }
        }
    };

    return (
        <>
        <button 
            onClick={handleCopy}
            className="contact-item flex items-center gap-3 text-text-link hover:text-text-link-hover motion-safe:transition-[color,scale] motion-safe:duration-150 motion-safe:ease-[var(--motion-ease-standard)] motion-safe:active:scale-[0.97]"
            type="button"
            aria-label={`Copy email address ${email}`}
        >
            <EnvelopeIcon aria-hidden="true" weight='duotone' size={32} />

            {/* Middle Dynamic Text Layout Container */}
            <div className="relative text-left min-h-6 flex items-center overflow-hidden">
                <span 
                    className={`motion-safe:transition-[opacity,translate,rotate,scale] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-spring)] transform select-all motion-reduce:translate-y-0 ${
                        isCopied ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
                    }`} 
                    translate="no"
                >
                    {email}
                </span>

                <span 
                    className={`absolute left-0 whitespace-nowrap text-status-success motion-safe:transition-[opacity,translate,rotate,scale] motion-safe:duration-[var(--motion-duration-standard)] motion-safe:ease-[var(--motion-ease-spring)] transform motion-reduce:translate-y-0 ${
                        isCopied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}
                >
                    Copied to clipboard!
                </span>
            </div>

            {/* Right Action Feedback Icon (Dual Nodes prevent text flicker structural layout shifts) */}
            <span className="relative inline-flex size-6" aria-hidden="true">
                <CopyIcon size={24} aria-hidden="true" data-visible={!isCopied} className={`motion-icon-swap absolute motion-reduce:rotate-0 motion-reduce:scale-100 ${
                    isCopied ? 'scale-75 rotate-45' : 'scale-100 rotate-0'
                }`} />
                
                <CheckIcon size={24} aria-hidden="true" data-visible={isCopied} className={`motion-icon-swap absolute text-status-success motion-reduce:rotate-0 motion-reduce:scale-100 ${
                    isCopied ? 'scale-100 rotate-0' : 'scale-75 -rotate-45'
                }`} />
            </span>
        </button>
        <span className="sr-only" aria-live="polite" aria-atomic="true">
            {isCopied ? `Email address ${email} copied to clipboard.` : ''}
        </span>
        </>
    );
}
