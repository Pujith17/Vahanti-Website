import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

/* --- Animated counter --- */
function Counter({ to, duration = 1800, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    started.current = false;
    setVal(0);
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setVal(Math.round(eased * to));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.05 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* --- Runway Grid (3D CSS perspective) --- */
function RunwayGrid({ scrollY }) {
  const perspectiveShift = Math.min(scrollY * 0.4, 80);
  return (
    <div
      className="runway-grid"
      style={{ '--shift': `${perspectiveShift}px` }}
      aria-hidden="true"
    >
      <div className="runway-grid-inner" />
    </div>
  );
}

/* --- Floating Product Button (HUD-style) --- */
function FloatingProductButton({ label, name, desc, delay = 0, x = 0, y = 0, mouseX = 0, mouseY = 0, to = "/products", className }) {
  return (
    <div className={`hud-card-parallax-wrapper${className ? ` ${className}` : ''}`}>
      <Link
        to={to}
        className="hud-card hud-card--interactive hud-card--product-btn"
        style={{
          '--delay': `${delay}ms`,
        }}
      >
        <span className="hud-label">{label}</span>
        <span className="hud-value" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {name}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="hud-arrow">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="hud-unit">{desc}</span>
      </Link>
    </div>
  );
}

/* --- Moving Flights Background Animation --- */
function MovingFlights() {
  const planesCount = 20;
  return (
    <div className="moving-flights-container" aria-hidden="true">
      {Array.from({ length: planesCount }).map((_, idx) => {
        const id = idx + 1;
        return (
          <div key={id} className={`flight-path-lane lane-${id}`}>
            <div className={`flight-airplane plane-commercial-${id}`}>
              <svg className="airplane-svg" viewBox="0 0 64 64" fill="currentColor">
                <path d="M32 2C30.9 2 30 2.9 30 4v20.18L4.63 36.33c-.76.35-1.12 1.25-.8 2l1.6 3.6c.3.68 1.07.98 1.76.67L30 32.22V52l-8.6 6.45c-.47.35-.67.97-.47 1.52l.8 2.2c.27.75 1.08 1.15 1.83.82L32 60.16l8.44 2.83c.75.33 1.56-.07 1.83-.82l.8-2.2c.2-.55 0-1.17-.47-1.52L34 52V32.22l22.81 10.38c.69.31 1.46.01 1.76-.67l1.6-3.6c.32-.75-.04-1.65-.8-2L34 24.18V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onMouse = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('mousemove', onMouse);
    const t = setTimeout(() => setVisible(true), 100);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
      clearTimeout(t);
    };
  }, []);

  return (
    <section className={`hero-story ${visible ? 'hero-story--visible' : ''}`} id="home">
      {/* 3D runway background */}
      <RunwayGrid scrollY={scrollY} />

      {/* Moving Flights Background Overlay */}
      <MovingFlights />

      {/* Dark gradient overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Floating telemetry HUDs / Interactive Product Button */}
      <div className="hero-huds">
        <FloatingProductButton
          className="hud-skylnk"
          name="Skylnk"
          desc="Cargo Intelligence Platform"
          delay={600}
          x={1.2}
          y={-0.5}
          mouseX={mouse.x}
          mouseY={mouse.y}
          to="/products#skylnk"
        />
        <FloatingProductButton
          className="hud-rfs"
          name="RFS"
          desc="Cargo Operations Platform"
          delay={800}
          x={1.2}
          y={-0.3}
          mouseX={mouse.x}
          mouseY={mouse.y}
          to="/products#rfs"
        />
        <FloatingProductButton
          className="hud-control-tower"
          name="Control Tower"
          desc="Agentic Control Center"
          delay={1000}
          x={1.2}
          y={-0.6}
          mouseX={mouse.x}
          mouseY={mouse.y}
          to="/products#control-tower"
        />
      </div>

      {/* Main content */}
      <div
        className="hero-story-content"
      >


        <h1 className="hero-story-title">
          <span className="hero-word">Intelligent solutions</span>
          <span className="hero-word"><span className="hero-word--accent">built by</span> people who</span>
          <span className="hero-word">understand cargo.</span>
        </h1>

        <p className="hero-story-desc">
          Vahanti builds bespoke software, automation, and intelligence systems for air cargo operations. Where industry veterans define the problem and modern engineers build what actually matters.
        </p>

        <div className="hero-story-actions">
          <a href="#services" className="hero-cta-primary">
            <span>Explore capabilities</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>


      {/* Scroll hint */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="hero-scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
};

export default HeroSection;