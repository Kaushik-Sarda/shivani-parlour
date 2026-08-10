// Shivani Herbal Beauty Parlour — interactions

// Sticky nav background on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile menu
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  toggle.classList.toggle('is-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
links.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    links.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Scroll-reveal
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-visible'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  // Stagger siblings slightly for a choreographed feel
  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });
}

// Video testimonial: always a ready-to-play player. The frame adapts
// to portrait (phone/WhatsApp) videos automatically.
const video = document.getElementById('testimonialVideo');
if (video) {
  video.addEventListener('loadedmetadata', () => {
    document.getElementById('videoFrame').classList.toggle(
      'is-portrait',
      video.videoHeight > video.videoWidth
    );
  });
}

// 3D tilt on the hero artwork card — desktop pointers only, and skipped
// entirely when the user prefers reduced motion.
const tiltCard = document.querySelector('.hero__art-card');
if (
  tiltCard &&
  !reduceMotion &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches
) {
  const MAX_TILT = 7; // degrees
  tiltCard.addEventListener('pointermove', (e) => {
    const r = tiltCard.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltCard.style.setProperty('--tilt-y', (x * MAX_TILT).toFixed(2) + 'deg');
    tiltCard.style.setProperty('--tilt-x', (-y * MAX_TILT).toFixed(2) + 'deg');
  });
  tiltCard.addEventListener('pointerleave', () => {
    tiltCard.style.setProperty('--tilt-x', '0deg');
    tiltCard.style.setProperty('--tilt-y', '0deg');
  });
}

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
