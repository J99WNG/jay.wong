'use client';

import { useState } from 'react';

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
        <button 
            onClick={handleCopy}
            className="contact-item flex items-center gap-3 text-text-link hover:text-[var(--color-blue-700)] transition-colors duration-200"
            type="button"
            aria-label={isCopied ? "Email copied to clipboard" : `Copy email address ${email}`}
        >
            {/* Left Mail Icon */}
            <span className="icon icon-lg flex-shrink-0" aria-hidden="true">
                <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                    <path d="m480-920 362 216q18 11 28 30t10 40v434q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200v-434q0-21 10-40t28-30l362-216Zm0 466 312-186-312-186-312 186 312 186Zm0 94L160-552v352h640v-352L480-360Zm0 160h320-640 320Z"/>
                </svg>
            </span>

            {/* Middle Dynamic Text Layout Container */}
            <div className="relative text-left min-h-[1.5rem] flex items-center overflow-hidden">
                <span 
                    className={`transition-all duration-300 transform select-all ${
                        isCopied ? 'opacity-0 -translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
                    }`} 
                    translate="no"
                >
                    {email}
                </span>

                <span 
                    className={`absolute left-0 whitespace-nowrap text-[var(--color-green-500)] transition-all duration-300 transform ${
                        isCopied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}
                >
                    Copied to clipboard!
                </span>
            </div>

            {/* Right Action Feedback Icon (Dual Nodes prevent text flicker structural layout shifts) */}
            <span className="icon icon-md relative w-5 h-5 flex items-center justify-center overflow-hidden" aria-hidden="true">
                <span className={`material-symbols-rounded absolute transition-all duration-200 transform ${
                    isCopied ? 'opacity-0 scale-75 rotate-45' : 'opacity-100 scale-100 rotate-0'
                }`}>
                    content_copy
                </span>
                
                <span className={`material-symbols-rounded absolute text-[var(--color-green-500)] transition-all duration-200 transform ${
                    isCopied ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-45'
                }`}>
                    check
                </span>
            </span>
        </button>
    );
}