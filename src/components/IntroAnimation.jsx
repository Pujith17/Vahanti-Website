import React, { useEffect, useRef, useState } from 'react';
import './IntroAnimation.css';

const IntroAnimation = ({ onComplete }) => {
  const planeRef = useRef(null);
  const splitTimerRef = useRef(null);
  const completeTimerRef = useRef(null);
  const [phase, setPhase] = useState('fly');

  useEffect(() => {
    const plane = planeRef.current;
    if (!plane) return undefined;

    let start = null;
    let animFrame = null;
    const flyDuration = 1600;

    const flyIn = (ts) => {
      if (!start) start = ts;

      const raw = Math.min((ts - start) / flyDuration, 1);
      const t = 1 - Math.pow(1 - raw, 3);

      const vw = window.innerWidth;
      const x = -vw * 0.6 + vw * 0.6 * t;
      const y = 30 - 30 * t;
      const scale = 0.72 + 0.28 * t;

      plane.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      plane.style.opacity = Math.min(raw * 2.2, 1);

      if (raw < 1) {
        animFrame = requestAnimationFrame(flyIn);
      } else {
        setPhase('split');

        completeTimerRef.current = window.setTimeout(() => {
          onComplete?.();
          setPhase('done');
        }, 700);
      }
    };

    animFrame = requestAnimationFrame(flyIn);

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      if (splitTimerRef.current) clearTimeout(splitTimerRef.current);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div className={`intro-overlay ${phase === 'split' ? 'splitting' : ''}`} aria-hidden="true">
      <div className="intro-panel panel-left">
        <div className="panel-logo">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <path
              d="M4 26 L16 6 L28 26"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M10 26 L16 15 L22 26" fill="currentColor" opacity="0.2" />
            <circle cx="16" cy="5.5" r="2" fill="currentColor" />
          </svg>

          <span>
            Vahanti<span className="intro-dot">.</span>
          </span>
        </div>
      </div>

      <div className="intro-panel panel-right">
        <div className="panel-tagline">Data intelligence for air cargo.</div>
      </div>

      <div
        className={`intro-plane ${phase === 'split' ? 'plane-exit' : ''}`}
        ref={planeRef}
        style={{ opacity: 0 }}
      >
        <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
          <path
            d="M10 50 Q38 18 85 36 Q92 39 85 44 Q38 62 10 50Z"
            fill="var(--color-text)"
          />
          <path
            d="M32 47 Q52 28 68 36 Q56 46 38 48Z"
            fill="var(--color-text-muted)"
            opacity="0.58"
          />
          <path
            d="M32 53 Q52 72 68 64 Q56 54 38 52Z"
            fill="var(--color-text-muted)"
            opacity="0.58"
          />
          <path
            d="M14 50 Q10 40 17 37 Q20 44 28 47Z"
            fill="var(--color-text)"
            opacity="0.78"
          />
          <circle cx="62" cy="43" r="2.5" fill="var(--color-primary)" opacity="0.72" />
          <circle cx="70" cy="42" r="2" fill="var(--color-primary)" opacity="0.58" />
          <circle cx="77" cy="41" r="1.8" fill="var(--color-primary)" opacity="0.46" />
          <ellipse
            cx="55"
            cy="58"
            rx="6"
            ry="2.5"
            fill="var(--color-text-faint)"
            opacity="0.6"
          />
        </svg>

        <div className="intro-trail" />
      </div>
    </div>
  );
};

export default IntroAnimation;