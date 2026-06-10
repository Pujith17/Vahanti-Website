import React from 'react';
import './HeroSection.css';

const HeroSection = () => (
  <section className="hero" id="home">
    <div className="hero-grid" aria-hidden="true"></div>

    <div className="container hero-container">
      <div className="hero-content">

        <h1 className="hero-title">
          Cargo intelligence
          <br />
          built by people who
          <br />
          understand freight.
        </h1>

        <p className="hero-description">
          Vahanti Technologies builds bespoke Data Science, AI/ML, and enterprise
          software for commercial airlines and air cargo terminals. Industry veterans
          shape the operational logic. Modern engineering teams build what matters.
        </p>

        <div className="hero-actions">
          <a href="#services" className="btn-outline">
            Explore services
          </a>
        </div>

        <div className="hero-proof">
          <div className="proof-item">
            <span className="proof-number">3–5%</span>
            <span className="proof-label">Capacity uplift</span>
          </div>

          <div className="proof-divider" aria-hidden="true"></div>

          <div className="proof-item">
            <span className="proof-number">48h</span>
            <span className="proof-label">Leakage insight window</span>
          </div>

          <div className="proof-divider" aria-hidden="true"></div>

          <div className="proof-item">
            <span className="proof-number">60%+</span>
            <span className="proof-label">Manual entry reduction</span>
          </div>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="hero-panel">
          <div className="hero-panel-top">
            <span className="hero-panel-kicker">Built for</span>

            <p className="hero-panel-lead">
              Airlines and cargo terminals that need clarity, speed, and software grounded in real operations.
            </p>
          </div>

          <div className="hero-panel-divider"></div>

          <div className="hero-panel-bottom">
            <div className="hero-panel-row">
              <span className="hero-meta-label">Base</span>
              <span className="hero-meta-value">Bengaluru, India</span>
            </div>

            <div className="hero-panel-row">
              <span className="hero-meta-label">Focus</span>
              <span className="hero-meta-value">
                AI/ML systems, cargo analytics, enterprise aviation software
              </span>
            </div>

            <div className="hero-panel-row">
              <span className="hero-meta-label">Model</span>
              <span className="hero-meta-value">
                Industry veterans + modern engineering talent
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;