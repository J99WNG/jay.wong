// MOBILE BURGER MENU
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav-menu');
let lastFocused = null;

function getFocusable(container) {
  return container.querySelectorAll(
    'a, button, textarea, input, select, summary, [tabindex]:not([tabindex="-1"])'
  );
}

function openMenu() {
  lastFocused = document.activeElement;
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close menu');
  nav.classList.add('is-open');
  document.body.style.overflow = 'hidden';

  // FIX: Focus the toggle (the X) instead of the first link
  toggle.focus(); 

  document.addEventListener('keydown', handleKeydown);
}

function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
  nav.classList.remove('is-open');
  document.body.style.overflow = '';

  if (lastFocused) lastFocused.focus();

  document.removeEventListener('keydown', handleKeydown);
}

function handleKeydown(e) {
  const focusables = Array.from(getFocusable(nav));
  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (e.key === 'Escape') {
    closeMenu();
  }

  if (e.key === 'Tab' && focusables.length) {
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  expanded ? closeMenu() : openMenu();
});

// Close menu when a nav link is clicked
nav.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;          // ignore clicks that are not on links
    
    if (link.hash) closeMenu();                // else, if clicking a hash link – close menu 
  });

//////////////////////////////////////////////////////////////////////

// FOOTER AUTO-UPDATE YEAR
document.getElementById("year").textContent = new Date().getFullYear();

//////////////////////////////////////////////////////////////////////

// --- CACHED ELEMENTS & VALUES ---
const dockWrapper = document.querySelector('#dock-wrapper');
const bttBtn = document.querySelector('.btn-btt');
const hero = document.querySelector('#hero');
const footer = document.querySelector('footer');

let lastScrollY = window.scrollY;
let ticking = false; // Prevents the scroll event from overfiring

// 1. SCROLL TO TOP CTA & FOOTER LOGIC
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const heroHeight = hero?.offsetHeight || 500;

            // Visibility Logic
            if (currentScrollY > heroHeight && currentScrollY > lastScrollY) {
                dockWrapper.classList.add('is-visible');
            } else {
                dockWrapper.classList.remove('is-visible');
            }

            // High-Performance Footer Detection
            // We use math (scrollY + height) instead of getBoundingClientRect
            if (footer) {
                const scrollBottom = currentScrollY + window.innerHeight;
                const footerTrigger = document.documentElement.scrollHeight - footer.offsetHeight;
                
                if (scrollBottom > footerTrigger) {
                    dockWrapper.classList.add('no-bg');
                } else {
                    dockWrapper.classList.remove('no-bg');
                }
            }

            lastScrollY = currentScrollY;
            ticking = false;
        });
        ticking = true;
    }
}, { passive: true });

bttBtn?.addEventListener("click", () => window.scrollTo({ top: 0 }));

//////////////////////////////////////////////////////////////////////

// 2. SECTION FADE (Two-Way Trigger)
const fadeElems = document.querySelectorAll('.section-fade');

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.classList.add('appear');
      } else {
          // Removes the class when the element scrolls out of view
          entry.target.classList.remove('appear');
      }
  });
}, {
  threshold: 0.1, 
  rootMargin: "0px 0px -10px 0px" 
});

fadeElems.forEach(elem => appearOnScroll.observe(elem));

//////////////////////////////////////////////////////////////////////