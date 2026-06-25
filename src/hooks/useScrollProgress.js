import { useEffect, useRef, useState } from 'react';

/**
 * Returns a scroll progress value (0→1) as the element scrolls through the viewport.
 * @param {Object} options
 * @param {number} options.start - viewport offset to start (0 = top of viewport, 1 = bottom)
 * @param {number} options.end   - viewport offset to end
 */
export function useScrollProgress({ start = 0.85, end = 0.05 } = {}) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setProgress(1);
      return;
    }

    let raf = null;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const startPx = vh * start;
      const endPx = vh * end;
      const raw = (startPx - rect.top) / (startPx - endPx);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [start, end]);

  return { ref, progress };
}

/**
 * Returns whether the element has entered the viewport at all.
 */
export function useInView({ threshold = 0.12, once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) { setInView(true); return; }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) obs.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  return { ref, inView };
}
