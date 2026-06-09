import React, { useEffect, useRef, useState } from 'react';
import './IntroAnimation.css';

const IntroAnimation = ({ onComplete }) => {
  const planeRef = useRef(null);
  const [phase, setPhase] = useState('fly'); // 'fly' → 'split' → 'done'

  useEffect(() => {
    const plane = planeRef.current;
    if (!plane) return;

    let start = null;
    let animFrame;
    const flyDuration = 1600;

    // Phase 1: plane flies from far left to center
    const flyIn = (ts) => {
      if (!start) start = ts;
      const raw = Math.min((ts - start) / flyDuration, 1);
      const t = 1 - Math.pow(1 - raw, 3); // cubic ease-out

      const vw = window.innerWidth;
      const x = -vw * 0.6 + vw * 0.6 * t; // -60vw → 0
      const y = 30 - 30 * t;               // slight arc down
      const scale = 0.7 + 0.3 * t;         // grow as it approaches

      plane.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      plane.style.opacity = Math.min(raw * 2.5, 1);

      if (raw < 1) {
        animFrame = requestAnimationFrame(flyIn);
      } else {
        // Brief pause at center, then split
        setTimeout(() => setPhase('split'), 180);
      }
    };

    animFrame = requestAnimationFrame(flyIn);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  useEffect(() => {
    if (phase === 'split') {
      // After CSS split animation finishes, call onComplete
      const t = setTimeout(() => {
        setPhase('done');
        onComplete?.();
      }, 900);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <div className={`intro-overlay ${phase === 'split' ? 'splitting' : ''}`}>
      {/* Left panel */}
      <div className="intro-panel panel-left">
        <div className="panel-logo">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <path d="M4 26 L16 6 L28 26" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 26 L16 15 L22 26" fill="white" opacity="0.35"/>
            <circle cx="16" cy="5.5" r="2" fill="white"/>
          </svg>
          <span>Vahanti<span className="intro-dot">.</span></span>
        </div>
      </div>

      {/* Right panel */}
      <div className="intro-panel panel-right">
        <div className="panel-tagline">Data intelligence for air cargo.</div>
      </div>

      {/* The plane */}
      <div
        className={`intro-plane ${phase === 'split' ? 'plane-exit' : ''}`}
        ref={planeRef}
        style={{ opacity: 0 }}
      >
        <svg width="110" height="110" viewBox="0 0 100 100" fill="none">
          {/* Fuselage */}
          <path d="M10 50 Q38 18 85 36 Q92 39 85 44 Q38 62 10 50Z" fill="white"/>
          {/* Top wing */}
          <path d="M32 47 Q52 28 68 36 Q56 46 38 48Z" fill="white" opacity="0.75"/>
          {/* Bottom wing */}
          <path d="M32 53 Q52 72 68 64 Q56 54 38 52Z" fill="white" opacity="0.75"/>
          {/* Tail fin */}
          <path d="M14 50 Q10 40 17 37 Q20 44 28 47Z" fill="white" opacity="0.9"/>
          {/* Windows */}
          <circle cx="62" cy="43" r="2.5" fill="var(--color-primary)" opacity="0.6"/>
          <circle cx="70" cy="42" r="2" fill="var(--color-primary)" opacity="0.5"/>
          <circle cx="77" cy="41" r="1.8" fill="var(--color-primary)" opacity="0.4"/>
          {/* Engine */}
          <ellipse cx="55" cy="58" rx="6" ry="2.5" fill="white" opacity="0.55"/>
        </svg>
        {/* Motion blur trail */}
        <div className="intro-trail"/>
      </div>
    </div>
  );
};

export default IntroAnimation;