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

// ─────────────────────────────────────────────────────────────
// Written reviews & client videos load from two simple files the
// parlour team edits themselves: reviews.json and videos.json.
// See HANDOVER-MANUAL.pdf for the step-by-step guide.
// ─────────────────────────────────────────────────────────────
const esc = (t) =>
  String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// Written testimonials
fetch('reviews.json')
  .then((r) => r.json())
  .then((list) => {
    const grid = document.getElementById('reviewsGrid');
    if (!grid || !Array.isArray(list)) return;
    grid.innerHTML = list
      .map((rv) => {
        const stars = Math.min(5, Math.max(1, rv.stars | 0));
        return `<figure class="review-card">
          <div class="review-card__stars" aria-label="${stars} star review">${'★'.repeat(stars)}${'☆'.repeat(5 - stars)}</div>
          <blockquote>“${esc(rv.quote)}”</blockquote>
          <figcaption>
            <span class="review-card__avatar" aria-hidden="true">${esc((rv.name || '?').charAt(0).toUpperCase())}</span>
            <span><strong>${esc(rv.name)}</strong><small>${esc(rv.source || '')}</small></span>
          </figcaption>
        </figure>`;
      })
      .join('');
  })
  .catch(() => {});

// Client videos ("Shivani Stories")
fetch('videos.json')
  .then((r) => r.json())
  .then((list) => {
    const rail = document.getElementById('storiesRail');
    if (!rail || !Array.isArray(list)) return;
    rail.innerHTML = list
      .map(
        (st) => `<figure class="story">
          <video controls preload="metadata" playsinline${st.poster ? ` poster="${esc(st.poster)}"` : ''}>
            <source src="${esc(st.video)}" type="video/mp4" />
          </video>
          ${st.caption ? `<figcaption>${esc(st.caption)}</figcaption>` : ''}
        </figure>`
      )
      .join('');

    // one video playing pauses the rest
    const vids = rail.querySelectorAll('video');
    vids.forEach((vid) => {
      vid.addEventListener('play', () => {
        vids.forEach((other) => { if (other !== vid) other.pause(); });
      });
    });

    // scroll arrows appear when the rail overflows
    const left = document.getElementById('storiesLeft');
    const right = document.getElementById('storiesRight');
    const updateArrows = () => {
      const overflow = rail.scrollWidth > rail.clientWidth + 8;
      left.hidden = right.hidden = !overflow;
    };
    updateArrows();
    window.addEventListener('resize', updateArrows);
    const step = () => Math.min(280, rail.clientWidth * 0.7);
    left.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: 'smooth' }));
    right.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: 'smooth' }));
  })
  .catch(() => {});

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
