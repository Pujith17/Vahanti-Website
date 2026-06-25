import React, { useEffect, useRef, useState } from 'react';
import './IntroAnimation.css';


const IntroAnimation = ({ onComplete }) => {
  const planeRef = useRef(null);
  const completeTimerRef = useRef(null);
  const [phase, setPhase] = useState('fly');

  useEffect(() => {
    const plane = planeRef.current;
    if (!plane) return undefined;

    let start = null;
    let animFrame = null;

    const flyDuration = 1500;

    const flyIn = (ts) => {
      if (!start) start = ts;

      const raw = Math.min((ts - start) / flyDuration, 1);

      // smoother easing
      const t = 1 - Math.pow(1 - raw, 4);

      const vw = window.innerWidth;

      const x = -vw * 0.6 + vw * 0.6 * t;

      const y = 100 * (1 - t);

      const scale = 0.72 + 0.28 * t;

      const rotation = -18 + 8 * t;

      plane.style.transform = `
        translate(${x}px, ${y}px)
        scale(${scale})
        rotate(${rotation}deg)
      `;
      plane.style.opacity = Math.min(raw * 2.2, 1);

      if (raw < 1) {
        animFrame = requestAnimationFrame(flyIn);
      } else {
        setPhase('split');

        completeTimerRef.current = window.setTimeout(() => {
          onComplete?.();
        }, 400);
        
        completeTimerRef.current = window.setTimeout(() => {
          setPhase('done');
        }, 800);
      }
    };

    animFrame = requestAnimationFrame(flyIn);

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
      if (completeTimerRef.current) clearTimeout(completeTimerRef.current);
    };
  }, [onComplete]);

  if (phase === 'done') return null;

  return (
    <div
      className={`intro-overlay ${
        phase === 'split' ? 'splitting' : ''
      }`}
      aria-hidden="true"
    >
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
            Vahanti
          </span>
        </div>
      </div>

      <div className="intro-panel panel-right">
        <div className="panel-tagline">
          Software, automation and intelligence for air cargo.
        </div>
      </div>

      <div
        className={`intro-plane ${
          phase === 'split' ? 'plane-exit' : ''
        }`}
        ref={planeRef}
        style={{ opacity: 0 }}
      >
        <svg width="110" height="110" viewBox="0 0 200 200" fill="none">
          {/* Far Horizontal Stabilizer */}
          <path
            d="M34 125 L10 110 C8 109, 11 107, 13 109 L38 123 Z"
            fill="var(--color-primary-highlight)"
            stroke="var(--color-text)"
            strokeWidth="1.2"
          />

          {/* Far Wing */}
          <path
            d="M95 100 L75 52 C74 50, 77 49, 79 51 L115 95 Z"
            fill="var(--color-primary-highlight)"
            stroke="var(--color-text)"
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
            fill="var(--color-primary)"
            stroke="var(--color-text)"
            strokeWidth="1.2"
          />

          {/* Vertical Tail Fin */}
          <path
            d="M30 130 L10 88 C9 86, 12 85, 15 87 L48 122 Z"
            fill="var(--color-primary)"
            stroke="var(--color-text)"
            strokeWidth="1.2"
          />

          {/* Fuselage Lower Half */}
          <path
            d="M45 133 C95 125, 155 107, 183 100 C180 102, 175 105, 160 110 C120 123, 75 135, 40 136 Z"
            fill="var(--color-surface)"
            stroke="var(--color-text)"
            strokeWidth="1.2"
          />

          {/* Fuselage Upper Half */}
          <path
            d="M30 130 C75 105, 135 90, 180 94 C185 95, 187 97, 183 100 C155 107, 95 125, 45 133 Z"
            fill="var(--color-primary)"
            stroke="var(--color-text)"
            strokeWidth="1.2"
          />

          {/* Cockpit Window */}
          <path
            d="M170 96 C173 96.2, 176 96.5, 178 97.5 L173 99.5 Z"
            fill="var(--color-bg)"
            stroke="var(--color-text)"
            strokeWidth="0.8"
          />

          {/* Cabin Windows */}
          <rect x="70" y="112" width="3" height="5" rx="1" transform="rotate(-15 70 112)" fill="var(--color-bg)" />
          <rect x="78" y="110" width="3" height="5" rx="1" transform="rotate(-15 78 110)" fill="var(--color-bg)" />
          <rect x="86" y="108" width="3" height="5" rx="1" transform="rotate(-15 86 108)" fill="var(--color-bg)" />
          <rect x="94" y="106" width="3" height="5" rx="1" transform="rotate(-15 94 106)" fill="var(--color-bg)" />
          <rect x="102" y="104" width="3" height="5" rx="1" transform="rotate(-15 102 104)" fill="var(--color-bg)" />
          <rect x="110" y="102" width="3" height="5" rx="1" transform="rotate(-15 110 102)" fill="var(--color-bg)" />
          <rect x="118" y="100" width="3" height="5" rx="1" transform="rotate(-15 118 100)" fill="var(--color-bg)" />
          <rect x="126" y="98" width="3" height="5" rx="1" transform="rotate(-15 126 98)" fill="var(--color-bg)" />
          <rect x="134" y="96" width="3" height="5" rx="1" transform="rotate(-15 134 96)" fill="var(--color-bg)" />
          <rect x="142" y="94" width="3" height="5" rx="1" transform="rotate(-15 142 94)" fill="var(--color-bg)" />
          <rect x="150" y="92" width="3" height="5" rx="1" transform="rotate(-15 150 92)" fill="var(--color-bg)" />

          {/* Near Horizontal Stabilizer */}
          <path
            d="M42 134 L18 152 C16 153, 19 155, 21 153 L48 135 Z"
            fill="var(--color-primary-highlight)"
            stroke="var(--color-text)"
            strokeWidth="1.2"
          />

          {/* Near Wing */}
          <path
            d="M102 115 L90 178 C89 182, 92 183, 94 181 L132 110 Z"
            fill="var(--color-primary-highlight)"
            stroke="var(--color-text)"
            strokeWidth="1.2"
          />
          {/* Near Wing Flap Details */}
          <path
            d="M102 125 L94 175"
            stroke="var(--color-text)"
            strokeWidth="1"
          />

          {/* Near Engine */}
          <path
            d="M110 140 C105 140, 102 143, 104 148 C106 153, 114 155, 120 152 C125 150, 126 145, 122 142 L110 140 Z"
            fill="var(--color-primary)"
            stroke="var(--color-text)"
            strokeWidth="1.2"
          />
          <path
            d="M116 122 L115 141"
            stroke="var(--color-text)"
            strokeWidth="1.2"
          />
        </svg>

        <div className="intro-trail-far" />
        <div className="intro-trail-near" />
      </div>
    </div>
  );
};

export default IntroAnimation;