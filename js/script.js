// Mobile burger menu navigation
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
  

// Auto-update year in footer
document.getElementById("year").textContent = new Date().getFullYear();
  
// Scroll to top
document.querySelector(".back-to-top")?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
);