import { useState, useEffect } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';

/**
 * Returns true when the viewport is mobile (<= 767px).
 * Initialised synchronously from matchMedia to avoid a flash on first render.
 * Listens for viewport / orientation changes and cleans up on unmount.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== 'undefined'
        ? window.matchMedia(MOBILE_QUERY).matches
        : false
  );

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isMobile;
}
