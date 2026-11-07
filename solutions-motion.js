/* Progressive enhancement: content stays visible if motion is unavailable. */
(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return;

  const items = document.querySelectorAll(
    '.sol-hero-copy, .sol-hero-art, .sol-intro-inner > div:first-child, .sol-intro-inner > p, .sol-quicklinks, .sol-section-top, .sol-industry-head, .travel-scene, .service-scene, .sol-capabilities > div, .sol-bottom, .wb-screen, .wb-copy > div, .sol-final > div, .sol-final > a'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('sol-enter');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });
  items.forEach((item) => observer.observe(item));
  motion.addEventListener?.('change', (event) => {
    if (event.matches) observer.disconnect();
  });
})();
