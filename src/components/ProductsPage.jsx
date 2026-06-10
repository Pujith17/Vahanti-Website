import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  ArrowRight,
  BarChart2,
  ArrowLeftRight,
  Gauge,
  Brain,
  PieChart,
} from 'lucide-react';
import './ProductsPage.css';
import skylinkLogo from '../assets/skylnk-logo.png';

const features = [
  {
    icon: <BarChart2 size={22} />,
    title: 'Real-Time Operations Dashboard',
    bullets: [
      <>Monitor a comprehensive set of <strong>cargo KPIs</strong> across your operation</>,
      <><strong>Live operational visibility</strong> based on actual performance data</>,
    ],
  },
  {
    icon: <ArrowLeftRight size={22} />,
    title: 'Performance Benchmarking',
    bullets: [
      <>Compare airlines, stations, agents and time periods</>,
      <>Identify trends and <strong>take corrective action quickly</strong></>,
      <>Highlight operational strengths and improvement opportunities</>,
    ],
  },
  {
    icon: <Gauge size={22} />,
    title: 'Operational Efficiency Scoring',
    bullets: [
      <>Automated monitoring of <strong>cargo operational performance</strong></>,
      <><strong>Rule-based efficiency scoring</strong> using key operational metrics</>,
      <>Measure performance against benchmarks and targets</>,
    ],
  },
  {
    icon: <Brain size={22} />,
    title: 'Cargo Volume Forecasting',
    bullets: [
      <>AI-powered forecasting of future cargo volumes</>,
      <>Support <strong>capacity planning, staffing and station readiness</strong></>,
    ],
  },
  {
    icon: <PieChart size={22} />,
    title: 'Business Volume Variance Analysis',
    bullets: [
      <>Identify volume fluctuations and <strong>understand underlying causes</strong></>,
    ],
    wide: true,
  },
];

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="products-page">
      <div className="container">

        <Link to="/" className="legal-back">
          <ArrowLeft size={15} /> Back to home
        </Link>

        <div className="products-header">
          <span className="section-eyebrow">Our Products</span>

          <h1 className="products-title">
            Software built for aviation.
            <br />
            Not adapted for it.
          </h1>

          <p className="products-subtitle">
            Designed specifically for airlines, cargo terminals and ground
            handling operations. Vahanti&apos;s products transform operational
            data into actionable intelligence that improves visibility,
            efficiency and decision-making.
          </p>
        </div>

        <div className="product-tabs" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 0}
            className={`product-tab${activeTab === 0 ? ' active' : ''}`}
            onClick={() => setActiveTab(0)}
          >
            <div className="product-tab-inner">
              <img
                src={skylinkLogo}
                alt="Skylink"
                width={20}
                height={20}
                style={{ objectFit: 'contain' }}
                loading="lazy"
              />
              <span>Skylnk</span>
            </div>

            <span className="product-tab-tag">
              Cargo Intelligence Platform
            </span>
          </button>

          <button className="product-tab coming-soon" disabled>
            <div className="product-tab-inner">
              <span className="tab-soon-dot" />
              <span>More coming soon</span>
            </div>

            <span className="product-tab-tag">
              In development
            </span>
          </button>
        </div>

        <div className="product-panel">

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

                <span className="skylink-wordmark">
                  Skylnk
                </span>
              </div>

              <p className="product-tagline">
                Operational intelligence for cargo terminals and airline cargo teams.
              </p>

              <p className="product-description">
                Skylnk transforms cargo operational data into actionable
                intelligence. It provides real-time visibility into performance,
                compares operational outcomes across stations and partners,
                identifies inefficiencies, and forecasts future cargo volumes
                using AI-driven models.
                <br />
                <br />
                Built specifically for commercial airlines and air cargo
                terminals, Skylnk helps operations teams make faster decisions,
                optimize resource allocation, and improve overall business
                performance.
              </p>

              <div className="product-audience">
                <span>Cargo Terminal Managers</span>
                <span>Airline Cargo Teams</span>
                <span>Ground Handling Agents</span>
                <span>Airport Cargo Operators</span>
              </div>

              <div className="product-cta-row">
                <a href="/#contact" className="btn-primary">
                  Request a Demo
                  <ArrowRight size={15} aria-hidden="true" />
                </a>

                <a href="/#contact" className="btn-outline-product">
                  Book Technical Audit
                </a>
              </div>

            </div>

            <div className="product-hero-right">

              <div className="product-stat-stack">

                <div className="product-stat">
                  <span className="product-stat-value">
                    60+
                  </span>

                  <span className="product-stat-label">
                    Operational KPIs monitored
                  </span>
                </div>

                <div className="product-stat">
                  <span className="product-stat-value">
                    3–5%
                  </span>

                  <span className="product-stat-label">
                    Efficiency improvement potential
                  </span>
                </div>

                <div className="product-stat">
                  <span className="product-stat-value">
                    Real-Time
                  </span>

                  <span className="product-stat-label">
                    Cargo operational visibility
                  </span>
                </div>

                <div className="product-stat">
                  <span className="product-stat-value">
                    AI
                  </span>

                  <span className="product-stat-label">
                    Forecasting & capacity planning
                  </span>
                </div>

              </div>

            </div>

          </div>

          <div className="business-outcomes">

            <span className="section-eyebrow">
              Business Outcomes
            </span>

            <div className="outcomes-grid">

              <div className="outcome-card">
                Improve Operational Visibility
              </div>

              <div className="outcome-card">
                Reduce Manual Reporting
              </div>

              <div className="outcome-card">
                Optimize Resource Allocation
              </div>

              <div className="outcome-card">
                Forecast Cargo Demand
              </div>

              <div className="outcome-card">
                Benchmark Performance
              </div>

              <div className="outcome-card">
                Support Faster Decisions
              </div>

            </div>

          </div>

          <div className="features-section">

            <span className="section-eyebrow">
              What Skylnk Does
            </span>

            <div className="features-grid">

              {features.map((feature, index) => (
                <div
                  className={`feature-card${feature.wide ? ' wide' : ''}`}
                  key={index}
                >
                  <div className="feature-icon-wrap">
                    {feature.icon}
                  </div>

                  <h3 className="feature-title">
                    {feature.title}
                  </h3>

                  <ul className="feature-bullets">
                    {feature.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex}>
                        <CheckCircle
                          size={14}
                          className="feature-check"
                        />

                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

            </div>

          </div>

          <div className="product-bottom-cta">

            <div className="product-bottom-cta-text">

              <h2>
                See how Skylnk can improve cargo operational performance.
              </h2>

              <p>
                Schedule a tailored demonstration based on your cargo
                environment, operational workflows and business objectives.
              </p>

            </div>

            <a href="/#contact" className="btn-primary">
              Book a Demo Call
              <ArrowRight size={15} aria-hidden="true" />
            </a>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductsPage;