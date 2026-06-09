import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ArrowRight, BarChart2, ArrowLeftRight, Gauge, Brain, PieChart } from 'lucide-react';
import './ProductsPage.css';
import skylinkLogo from '../assets/skylnk-logo.png';

const features = [
  {
    icon: <BarChart2 size={22} />,
    title: 'Reflection of Actuals',
    bullets: [
      <>Comprehensive set of <strong>KPIs</strong> across your cargo operation</>,
      <><strong>Real-time status</strong> of operations — ground truth, not estimates</>,
    ],
  },
  {
    icon: <ArrowLeftRight size={22} />,
    title: 'Impactful Comparisons',
    bullets: [
      <><strong>BI at your fingertips</strong> — compare time frames, airlines, agents</>,
      <>Spot the pattern and <strong>act immediately</strong></>,
      <>Identify opportunities, challenges and <strong>initiate appropriate actions</strong></>,
    ],
  },
  {
    icon: <Gauge size={22} />,
    title: 'Performance Efficiency Monitor',
    bullets: [
      <>Automated efficiency tracker monitoring <strong>operation performance</strong></>,
      <><strong>Rule-based scoring</strong> using key parameters: pieces, weight/volume, expended effort</>,
      <>Ability to <strong>measure performance against benchmark</strong></>,
    ],
  },
  {
    icon: <Brain size={22} />,
    title: 'Prediction Engine',
    bullets: [
      <><strong>Powerful algorithm</strong> to accurately forecast future cargo volumes</>,
      <>Enable <strong>capacity planning, staffing and station operations</strong> in advance</>,
    ],
  },
  {
    icon: <PieChart size={22} />,
    title: 'Business Volume Variance Analysis',
    bullets: [
      <>Identify significant variance in business volume and <strong>understand potential causes</strong></>,
    ],
    wide: true,
  },
];

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="products-page">
      <div className="container">

        {/* ── Back link ── */}
        <Link to="/" className="legal-back">
          <ArrowLeft size={15} /> Back to home
        </Link>

        {/* ── Page header ── */}
        <div className="products-header">
          <span className="section-eyebrow">Our Products</span>
          <h1 className="products-title">Software built for aviation.<br />Not adapted for it.</h1>
          <p className="products-subtitle">
            Vahanti's product suite is purpose-engineered for commercial airlines and air cargo terminals.
            Each product addresses a specific operational gap — no generic dashboards, no retrofitted SaaS.
          </p>
        </div>

        {/* ── Product tab strip ── */}
        <div className="product-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 0}
            className={`product-tab${activeTab === 0 ? ' active' : ''}`}
            onClick={() => setActiveTab(0)}
          >
            <div className="product-tab-inner">
              {/* Skylink SVG logo inline */}
              <img
                src={skylinkLogo}
                alt="Skylink"
                width={20}
                height={20}
                style={{ objectFit: 'contain' }}
                loading="lazy"
                />
              <span>Skylink</span>
            </div>
            <span className="product-tab-tag">Cargo Intelligence Platform</span>
          </button>
          {/* Future products slot — greyed out */}
          <button className="product-tab coming-soon" disabled>
            <div className="product-tab-inner">
              <span className="tab-soon-dot" />
              <span>More coming soon</span>
            </div>
            <span className="product-tab-tag">In development</span>
          </button>
        </div>

        {/* ── Skylink detail panel ── */}
        <div className="product-panel">

          {/* Hero row */}
          <div className="product-hero-row">
            <div className="product-hero-left">
              <div className="skylink-logo-wrap">
              <img
                src={skylinkLogo}
                alt="Skylink logo"
                width={36}
                height={36}
                style={{ objectFit: 'contain' }}
                loading="lazy"
                />
                <span className="skylink-wordmark">Skylink</span>
              </div>
              <p className="product-tagline">
                A synopsis of functionality — from actuals to prediction, in one cargo intelligence platform.
              </p>
              <p className="product-description">
                Skylink is Vahanti's flagship cargo intelligence platform. It gives airline cargo and ground
                operations teams a single, real-time view of their operation — combining KPI dashboards,
                comparative BI, performance scoring, and a predictive engine for capacity and volume forecasting.
                Built for operations managers who need to act on data at gate-close speed, not the next morning.
              </p>
              <div className="product-cta-row">
                <a href="/#contact" className="btn-primary">
                  Request a Demo <ArrowRight size={15} aria-hidden="true" />
                </a>
                <a href="/#contact" className="btn-outline-product">
                  Book Technical Audit
                </a>
              </div>
            </div>
            <div className="product-hero-right">
              <div className="product-stat-stack">
                <div className="product-stat">
                  <span className="product-stat-value">5</span>
                  <span className="product-stat-label">Core capability modules</span>
                </div>
                <div className="product-stat">
                  <span className="product-stat-value">Real-time</span>
                  <span className="product-stat-label">Operational KPI visibility</span>
                </div>
                <div className="product-stat">
                  <span className="product-stat-value">AI-powered</span>
                  <span className="product-stat-label">Volume & capacity forecasting</span>
                </div>
                <div className="product-stat">
                  <span className="product-stat-value">Bespoke</span>
                  <span className="product-stat-label">Deployed to your environment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature grid */}
          <div className="features-section">
            <span className="section-eyebrow">What Skylink does</span>
            <div className="features-grid">
              {features.map((f, i) => (
                <div className={`feature-card${f.wide ? ' wide' : ''}`} key={i}>
                  <div className="feature-icon-wrap">{f.icon}</div>
                  <h3 className="feature-title">{f.title}</h3>
                  <ul className="feature-bullets">
                    {f.bullets.map((b, j) => (
                      <li key={j}>
                        <CheckCircle size={14} className="feature-check" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="product-bottom-cta">
            <div className="product-bottom-cta-text">
              <h2>Ready to see Skylink in your operation?</h2>
              <p>We'll walk you through a live demo tailored to your cargo environment — routes, volumes, team structure. No generic slides.</p>
            </div>
            <a href="/#contact" className="btn-primary">
              Book a Demo Call <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

/* ── Inline SVG logo for Skylink (S mark + red/blue split) ── */
const SkyInkLogo = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-label="Skylink logo">
    <rect x="2" y="2" width="13" height="28" rx="3" fill="#c0392b" />
    <rect x="17" y="2" width="13" height="28" rx="3" fill="#2c3e7a" />
    <path d="M8 10 Q16 16 24 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M8 22 Q16 16 24 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
  </svg>
);

export default ProductsPage;