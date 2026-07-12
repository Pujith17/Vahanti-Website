import React, { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import './IntroAnimation.css';

const IntroAnimation = ({ onExitStart, onComplete }) => {
  const planeRef = useRef(null);
  const completeTimerRef = useRef(null);
  const doneTimerRef = useRef(null);
  const [phase, setPhase] = useState('fly'); // fly | settled | split | exit | done
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 767px)').matches;
    }
    return false;
  });

  // Stable refs for parent callbacks — updated whenever props change.
  // This allows the animation effect to depend only on mount ([]) while
  // still always calling the latest provided callback.
  const onExitStartRef = useRef(onExitStart);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onExitStartRef.current = onExitStart;
    onCompleteRef.current = onComplete;
  }, [onExitStart, onComplete]);

  // Viewport detection & listener
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)');
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const plane = planeRef.current;
    if (!plane) return undefined;

    let start = null;
    let animFrame = null;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobileActive = window.matchMedia('(max-width: 767px)').matches;

    // Mobile anim target is ~1.5s total. Fly-in takes 750ms. Desktop takes 1500ms.
    const flyDuration = isMobileActive ? (prefersReducedMotion ? 0 : 750) : (prefersReducedMotion ? 0 : 1500);

    const flyIn = (ts) => {
      if (!start) start = ts;

      const raw = Math.min((ts - start) / flyDuration, 1);
      const t = 1 - Math.pow(1 - raw, 4); // Cubic bezier approximation

      const vw = window.innerWidth;
      // Adapt scale & travel distance to portrait viewports on mobile
      const travelScale = isMobileActive ? 0.35 : 0.6;
      const x = -vw * travelScale + vw * travelScale * t;
      const y = (isMobileActive ? 60 : 100) * (1 - t);
      const scale = (isMobileActive ? 0.62 : 0.72) + (isMobileActive ? 0.38 : 0.28) * t;
      const rotation = isMobileActive ? -12 + 6 * t : -18 + 8 * t;

      plane.style.transform = `
        translate(${x}px, ${y}px)
        scale(${scale})
        rotate(${rotation}deg)
      `;
      plane.style.opacity = Math.min(raw * 2.2, 1);

      if (raw < 1) {
        animFrame = requestAnimationFrame(flyIn);
      } else {
        handleSettle();
      }
    };

    const handleSettle = () => {
      if (isMobileActive) {
        setPhase('settled');

        // Logo shows immediately upon settling, tagline fades in. Settle for 500ms.
        completeTimerRef.current = window.setTimeout(() => {
          setPhase('exit');
          onExitStartRef.current?.(); // Mobile: trigger homepage fade-in as overlay starts exiting

          doneTimerRef.current = window.setTimeout(() => {
            // setPhase('done') must come before onComplete() so that local state
            // is updated before the parent unmounts this component.
            setPhase('done');
            onCompleteRef.current?.();
          }, 250); // Mobile fade & translate-up duration is 250ms
        }, 500);
      } else {
        // Desktop: do NOT call onExitStart here. The split panels occlude the
        // .site-shell during their 850ms CSS transition. Calling setSiteVisible(true)
        // now would complete the CSS opacity fade behind the panels before they are
        // gone, making the content appear to "snap in" instantly. Instead, let
        // handleIntroComplete trigger setSiteVisible after the overlay is removed.
        setPhase('split');

        completeTimerRef.current = window.setTimeout(() => {
          onCompleteRef.current?.();
        }, 400);

        doneTimerRef.current = window.setTimeout(() => {
          setPhase('done');
        }, 850); // Desktop split panel transition takes 850ms
      }
    };

    if (prefersReducedMotion) {
      plane.style.transform = isMobileActive ? 'translate(0px, 0px) scale(1) rotate(0deg)' : 'translate(0px, 0px) scale(1) rotate(-10deg)';
      plane.style.opacity = 1;
      handleSettle();
    } else {
      animFrame = requestAnimationFrame(flyIn);
    }

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
      if (doneTimerRef.current) clearTimeout(doneTimerRef.current);
    };
  // Empty dependency array: animation lifecycle runs exactly once per mount.
  // Callback props are accessed via stable refs (onExitStartRef / onCompleteRef)
  // so parent re-renders never restart this effect.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (phase === 'done') return null;

  return (
    <div
      className={`intro-overlay ${
        phase === 'split' ? 'splitting' : ''
      } ${
        isMobile ? 'intro-mobile' : ''
      } ${
        phase === 'exit' ? 'exit-mobile' : ''
      }`}
      aria-hidden="true"
    >
      {!isMobile ? (
        <>
          {/* Desktop/Tablet Panel Structure */}
          <div className="intro-panel panel-left">
            <div className="panel-logo">
              <Logo size={46} />
              <span>ahanti</span>
            </div>
          </div>
          <div className="intro-panel panel-right">
            <div className="panel-tagline">
              Software, automation and intelligence for air cargo.
            </div>
          </div>
        </>
      ) : (
        /* Mobile Centered Stack Structure */
        <div className="intro-mobile-content">
          {/* Logo is visual anchor, visible immediately or settled phase */}
          <div className={`mobile-logo-wrap ${phase !== 'fly' ? 'fade-in' : ''}`}>
            <Logo size={36} />
            <span className="mobile-logo-text">ahanti</span>
          </div>
          <div className={`mobile-tagline ${phase === 'settled' || phase === 'exit' ? 'fade-in' : ''}`}>
            Software built for air cargo.
          </div>
        </div>
      )}

      {/* Shared plane rendering */}
      <div
        className={`intro-plane ${
          phase === 'split' ? 'plane-exit' : ''
        } ${
          isMobile ? 'plane-mobile' : ''
        }`}
        ref={planeRef}
        style={{ opacity: 0 }}
      >
        <svg width="110" height="110" viewBox="0 0 200 200" fill="none">
          <defs>
            <linearGradient id="plane-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF2D2D" />
              <stop offset="100%" stopColor="#1D3583" />
            </linearGradient>
          </defs>
          {/* Far Horizontal Stabilizer */}
          <path
            d="M34 125 L10 110 C8 109, 11 107, 13 109 L38 123 Z"
            fill="url(#plane-gradient)"
            stroke="var(--plane-stroke)"
            strokeWidth="1.2"
          />
          {/* Far Wing */}
          <path
            d="M95 100 L75 52 C74 50, 77 49, 79 51 L115 95 Z"
            fill="url(#plane-gradient)"
            stroke="var(--plane-stroke)"
            strokeWidth="1.2"
          />
          {/* Far Engine */}
          <rect
            x="100"
            y="70"
            width="18"
            height="10"
            rx="5"
            transform="rotate(-15, 100, 70)"
            fill="url(#plane-gradient)"
            stroke="var(--plane-stroke)"
            strokeWidth="1.2"
          />
          {/* Vertical Tail Fin */}
          <path
            d="M30 130 L10 88 C9 86, 12 85, 15 87 L48 122 Z"
            fill="url(#plane-gradient)"
            stroke="var(--plane-stroke)"
            strokeWidth="1.2"
          />
          {/* Fuselage Lower Half */}
          <path
            d="M45 133 C95 125, 155 107, 183 100 C180 102, 175 105, 160 110 C120 123, 75 135, 40 136 Z"
            fill="url(#plane-gradient)"
            stroke="var(--plane-stroke)"
            strokeWidth="1.2"
          />
          {/* Fuselage Upper Half */}
          <path
            d="M30 130 C75 105, 135 90, 180 94 C185 95, 187 97, 183 100 C155 107, 95 125, 45 133 Z"
            fill="url(#plane-gradient)"
            stroke="var(--plane-stroke)"
            strokeWidth="1.2"
          />
          {/* Cockpit Window */}
          <path
            d="M170 96 C173 96.2, 176 96.5, 178 97.5 L173 99.5 Z"
            fill="var(--plane-bg)"
            stroke="var(--plane-stroke)"
            strokeWidth="0.8"
          />
          {/* Cabin Windows */}
          <rect x="70" y="112" width="3" height="5" rx="1" transform="rotate(-15 70 112)" fill="var(--plane-bg)" />
          <rect x="78" y="110" width="3" height="5" rx="1" transform="rotate(-15 78 110)" fill="var(--plane-bg)" />
          <rect x="86" y="108" width="3" height="5" rx="1" transform="rotate(-15 86 108)" fill="var(--plane-bg)" />
          <rect x="94" y="106" width="3" height="5" rx="1" transform="rotate(-15 94 106)" fill="var(--plane-bg)" />
          <rect x="102" y="104" width="3" height="5" rx="1" transform="rotate(-15 102 104)" fill="var(--plane-bg)" />
          <rect x="110" y="102" width="3" height="5" rx="1" transform="rotate(-15 110 102)" fill="var(--plane-bg)" />
          <rect x="118" y="100" width="3" height="5" rx="1" transform="rotate(-15 118 100)" fill="var(--plane-bg)" />
          <rect x="126" y="98" width="3" height="5" rx="1" transform="rotate(-15 126 98)" fill="var(--plane-bg)" />
          <rect x="134" y="96" width="3" height="5" rx="1" transform="rotate(-15 134 96)" fill="var(--plane-bg)" />
          <rect x="142" y="94" width="3" height="5" rx="1" transform="rotate(-15 142 94)" fill="var(--plane-bg)" />
          <rect x="150" y="92" width="3" height="5" rx="1" transform="rotate(-15 150 92)" fill="var(--plane-bg)" />
          {/* Near Horizontal Stabilizer */}
          <path
            d="M42 134 L18 152 C16 153, 19 155, 21 153 L48 135 Z"
            fill="url(#plane-gradient)"
            stroke="var(--plane-stroke)"
            strokeWidth="1.2"
          />
          {/* Near Wing */}
          <path
            d="M102 115 L90 178 C89 182, 92 183, 94 181 L132 110 Z"
            fill="url(#plane-gradient)"
            stroke="var(--plane-stroke)"
            strokeWidth="1.2"
          />
          {/* Near Wing Flap Details */}
          <path
            d="M102 125 L94 175"
            stroke="var(--plane-stroke)"
            strokeWidth="1"
          />
          {/* Near Engine */}
          <path
            d="M110 140 C105 140, 102 143, 104 148 C106 153, 114 155, 120 152 C125 150, 126 145, 122 142 L110 140 Z"
            fill="url(#plane-gradient)"
            stroke="var(--plane-stroke)"
            strokeWidth="1.2"
          />
          <path
            d="M116 122 L115 141"
            stroke="var(--plane-stroke)"
            strokeWidth="1.2"
          />
        </svg>
        {!isMobile && (
          <>
            <div className="intro-trail-far" />
            <div className="intro-trail-near" />
          </>
        )}
      </div>
    </div>
  );
};

export default IntroAnimation;