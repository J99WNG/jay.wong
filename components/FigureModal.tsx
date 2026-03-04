'use client';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function FigureModal({ src, alt, caption }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent scrolling background
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* --- Trigger: The Figure --- */}
      <figure className="modal-trigger">
        <div className="image-wrapper" onClick={() => setIsOpen(true)}>
          <img src={src} alt={alt} />

          <div className="hover-overlay">
            <span className="icon icon-xl">
                <span className="material-symbols-rounded">open_in_full</span>
            </span>
          </div>
        </div>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>

      {/* --- The Modal (Portal) --- */}
      {isOpen && createPortal(
        <div 
          className="modal-overlay" 
          role="dialog" 
          aria-modal="true"
          onClick={() => setIsOpen(false)}
        >
          <button 
            className="btn-secondary close-btn" 
            aria-label="Close modal"
            onClick={() => setIsOpen(false)}
          >
            <span className="icon icon-lg">
              <span className="material-symbols-rounded">close</span>
            </span>
          </button>
          
          <div className="container modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={src} alt={alt} />
            {caption && <p className="modal-caption">{caption}</p>}
          </div>
        </div>,
        document.body
      )}

      <style jsx>{`
        /* Trigger Styles */
        .image-wrapper { cursor: zoom-in; margin: 0; }
        .image-wrapper { position: relative; overflow: hidden; border-radius: 0.75rem; }
        .image-wrapper img { width: 100%; display: block; transition: transform 0.3s ease; }
        
        .hover-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.2);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transition: opacity 0.5s ease;
        }

        .hover-overlay span { color: white; font-size: 3rem; }
        .image-wrapper:hover .hover-overlay { opacity: 1; }
        .image-wrapper:hover img { transform: scale(1.05); }

        .modal-overlay {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 9999;

          /* 1. Semi-transparent background (White or Black works) */
          background: rgba(0, 0, 0, 0.8);

          /* 2. The "Frost" effect (Standard + Safari support) */
          backdrop-filter: blur(16px) saturate(160%);
          -webkit-backdrop-filter: blur(16px) saturate(160%);

          /* 3. Hardware Acceleration (Crucial) */
          will-change: backdrop-filter, opacity;
          transform: translateZ(0);

          /* 4. Centering the content */
          display: flex;
          align-items: center;
          justify-content: center;

          /* 5. Smooth entry */
          animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          position: relative;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .modal-content img {
          width: 100%;
          height: auto;
          border-radius: 0.75rem;
        }

        .modal-caption {
          color: var(--silver-needle);
          width: 100%;
          margin-top: 1rem;
          text-align: center; 
        }

        .close-btn {
          position: absolute;
          top: 2rem;
          right: 2rem;
          border: none;
          cursor: pointer;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }
      `}</style>
    </>
  );
}