import { useEffect } from 'react';

export function useReveal(reduceMotion = false) {
  useEffect(() => {
    if (reduceMotion) {
      document.querySelectorAll('[data-reveal]').forEach((e) => {
        e.classList.add('reveal-visible');
      });
      return;
    }

    const reveals = Array.from(document.querySelectorAll('[data-reveal]:not(.reveal-visible)'));
    
    // Add base reveal class
    reveals.forEach((e) => {
      e.classList.add('reveal-hidden');
    });

    // Handle staggers
    document.querySelectorAll('[data-stagger]').forEach((group) => {
      Array.from(group.querySelectorAll('[data-reveal]')).forEach((el, i) => {
        el.style.transitionDelay = `${i * 85}ms`;
      });
    });

    const check = () => {
      const h = window.innerHeight || 800;
      for (let i = reveals.length - 1; i >= 0; i--) {
        const el = reveals[i];
        const r = el.getBoundingClientRect();
        if (r.top < h * 0.9 && r.bottom > -80) {
          el.classList.add('reveal-visible');
          el.classList.remove('reveal-hidden');
          reveals.splice(i, 1);
        }
      }
    };

    let raf;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        check();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    check();
    
    // Initial checks
    requestAnimationFrame(check);
    const timeout = setTimeout(check, 250);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(timeout);
    };
  }, [reduceMotion]);
}
