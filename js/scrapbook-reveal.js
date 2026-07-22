export function initScrapbookReveal() {
  if (!('IntersectionObserver' in window)) return;

  document.documentElement.classList.add('js-reveal-ready');

  const targets = document.querySelectorAll('.placeholder-box, .paper-card, .work-card, .torn-strip');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  targets.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 70}ms`;
    io.observe(el);
  });
}
