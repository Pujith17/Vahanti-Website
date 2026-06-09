import React from 'react';
import { ArrowRight, TrendingUp, TrendingDown, Package } from 'lucide-react';
import './HeroSection.css';

const bars = [42, 61, 54, 78, 67, 85, 72, 90, 83, 95, 88, 100];

const HeroSection = () => (
  <section className="hero" id="home">
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-glow"  aria-hidden="true" />
    <div className="container hero-container">
      <div className="hero-content">
        <div className="hero-badge"><span className="badge-dot" />Aviation AI · Bengaluru</div>
        <h1 className="hero-title">
          Cargo intelligence<br />built by people who<br />
          <span className="hero-accent">understand freight.</span>
        </h1>
        <p className="hero-description">
          Vahanti Technologies builds bespoke Data Science, AI/ML, and enterprise software for commercial airlines
          and air cargo terminals. Industry veterans set the strategy.
          <span className="hero-sub-accent"> Top-tier engineers</span> ship the technology.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary">Book a Discovery Call <ArrowRight size={16} aria-hidden="true" /></a>
          <a href="#services" className="btn-outline">See our capabilities</a>
        </div>
        <div className="hero-proof">
          <div className="proof-item"><span className="proof-number">3–5%</span><span className="proof-label">Capacity uplift</span></div>
          <div className="proof-divider" aria-hidden="true" />
          <div className="proof-item"><span className="proof-number">48h</span><span className="proof-label">Revenue leakage ID</span></div>
          <div className="proof-divider" aria-hidden="true" />
          <div className="proof-item"><span className="proof-number">60%+</span><span className="proof-label">Manual entry reduction</span></div>
        </div>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="plane-wrapper">
          <div className="plane-trail" />
          <div className="idle-float">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5">
              <path d="M22 2L11 13M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
          </div>
        </div>
        <div className="float-badge badge-top"><span className="pulse-dot" />Payload: 94.2% utilised</div>
        <div className="dashboard-card">
          <div className="dash-header">
            <div className="dash-header-left"><span className="dash-dot green" /><span>Cargo Control Tower</span></div>
            <span className="dash-live">● LIVE</span>
          </div>
          <div className="dash-kpis">
            <div className="kpi"><TrendingUp size={14} className="kpi-icon up" /><span className="kpi-value">94.2%</span><span className="kpi-label">Load factor</span></div>
            <div className="kpi"><Package size={14} className="kpi-icon" /><span className="kpi-value">847t</span><span className="kpi-label">Cargo booked</span></div>
            <div className="kpi"><TrendingDown size={14} className="kpi-icon up" /><span className="kpi-value">-18%</span><span className="kpi-label">Dwell time</span></div>
          </div>
          <div className="dash-chart">
            <span className="chart-label">Route yield — last 12 months</span>
            <div className="chart-bars" role="img" aria-label="Route yield trending upward">
              {bars.map((h, i) => (
                <div className="chart-bar-wrap" key={i}>
                  <div className={`chart-bar${i === bars.length - 1 ? ' amber-bar' : ''}`} style={{ height: `${h}%`, animationDelay: `${i * 0.05}s` }} />
                </div>
              ))}
            </div>
          </div>
          <div className="dash-footer">
            <span className="dash-tag">AI-powered · Vahanti</span>
            <span className="dash-time">Updated 2 min ago</span>
          </div>
        </div>
        <div className="float-badge badge-bottom"><span className="pulse-dot" />AWB processed: 1,247 manifests today</div>
      </div>
    </div>
  </section>
);

export default HeroSection;