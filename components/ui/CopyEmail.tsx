'use client';

import { useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';

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
            className="contact-item flex items-center gap-3 text-text-link hover:text-text-link-hover motion-safe:transition-colors motion-safe:duration-[var(--motion-duration-fast)] motion-safe:ease-[var(--motion-ease-standard)]"
            type="button"
            aria-label={`Copy email address ${email}`}
        >
            <Mail aria-hidden="true" size={32} />

            {/* Middle Dynamic Text Layout Container */}
            <div className="relative text-left min-h-[1.5rem] flex items-center overflow-hidden">
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
                <Copy aria-hidden="true" className={`absolute motion-safe:transition-[opacity,translate,rotate,scale] motion-safe:duration-[var(--motion-duration-fast)] motion-safe:ease-[var(--motion-ease-spring)] transform motion-reduce:rotate-0 motion-reduce:scale-100 ${
                    isCopied ? 'opacity-0 scale-75 rotate-45' : 'opacity-100 scale-100 rotate-0'
                }`} />
                
                <Check aria-hidden="true" className={`absolute text-status-success motion-safe:transition-[opacity,translate,rotate,scale] motion-safe:duration-[var(--motion-duration-fast)] motion-safe:ease-[var(--motion-ease-spring)] transform motion-reduce:rotate-0 motion-reduce:scale-100 ${
                    isCopied ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-45'
                }`} />
            </span>
        </button>
        <span className="sr-only" aria-live="polite" aria-atomic="true">
            {isCopied ? `Email address ${email} copied to clipboard.` : ''}
        </span>
        </>
    );
}
