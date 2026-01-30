// MOBILE BURGER MENU //
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#primary-nav');
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

  const focusables = getFocusable(nav);
  if (focusables.length) focusables[0].focus();

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

// FOOTER AUTO-UPDATE YEAR //
document.getElementById("year").textContent = new Date().getFullYear();

//////////////////////////////////////////////////////////////////////

// SCROLL TO TOP CTA //
const dockWrapper = document.querySelector('#dock-wrapper');
const bttBtn = document.querySelector('.back-to-top');
const hero = document.querySelector('#hero'); // Ensure your Hero section has id="hero"
const footer = document.querySelector('footer');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // 1. Threshold: Show after passing the Hero
    const heroHeight = hero ? hero.offsetHeight : 500;
    
    // 2. Logic: Show when scrolling down AND past hero
    if (currentScrollY > heroHeight && currentScrollY > lastScrollY) {
        dockWrapper.classList.add('is-visible');
    } else {
        dockWrapper.classList.remove('is-visible');
    }

    // 3. Refined "No-BG" Logic: 
    // Detect if the dock is overlapping the footer
    if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        const viewportHeight = window.innerHeight;

        // If the top of the footer is visible within the bottom of the viewport
        if (footerTop < viewportHeight) {
            dockWrapper.classList.add('no-bg');
        } else {
            dockWrapper.classList.remove('no-bg');
        }
    }

    lastScrollY = currentScrollY;
}, { passive: true });

bttBtn?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
);

//////////////////////////////////////////////////////////////////////

// CONTENT FADE //

// 1. Select all sections we want to animate
const fadeElems = document.querySelectorAll('.section-fade');

// 2. Set the options for the observer
const appearOptions = {
  threshold: 0.10, // Trigger when % of the element is visible
  root: null,
  rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
};

// 3. Create the observer
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
    } else {
      // Optional: Remove class to fade back out when scrolling away
      entry.target.classList.remove('appear');
    }
  });
}, appearOptions);

// 4. Attach the observer to each element
fadeElems.forEach(elem => {
  appearOnScroll.observe(elem);
});

//////////////////////////////////////////////////////////////////////