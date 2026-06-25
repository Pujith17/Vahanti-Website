import React, { useState, useEffect } from 'react';
import {
  CheckCircle,
  ArrowRight,
  BarChart2,
  ArrowLeftRight,
  Gauge,
  Brain,
  PieChart,
  Info,
  Truck,
  Database,
  Boxes,
  Receipt,
  FileCheck,
  Layers,
  Radar,
  Eye,
} from 'lucide-react';
import './ProductsPage.css';
import skylinkLogo from '../assets/skylnk-logo.png';

const PRODUCTS = [
  {
    id: 'skylnk',
    name: 'Skylnk',
    tagline: 'Operational intelligence for cargo terminals and airline cargo teams.',
    platformNote: 'Skylnk is Vahanti\'s cargo intelligence platform, combining analytics, benchmarking, forecasting and operational monitoring in a single system.',
    description: 'Skylnk combines operational analytics, benchmarking, forecasting, and performance monitoring in a single platform. Monitor cargo performance, compare stations and partners, forecast future volumes, identify inefficiencies, and make faster operational decisions.',
    logo: <img src={skylinkLogo} alt="Skylink logo" width={36} height={36} style={{ objectFit: 'contain' }} loading="lazy" />,
    tabLogo: <img src={skylinkLogo} alt="Skylink" width={20} height={20} style={{ objectFit: 'contain' }} loading="lazy" />,
    tag: 'Cargo Intelligence Platform',
    audience: ['Cargo Terminal Managers', 'Airline Cargo Teams', 'Ground Handling Agents', 'Airport Cargo Operators'],
    stats: [
      { value: '60+', label: 'KPIs Tracked' },
      { value: '3–5%', label: 'Capacity Uplift' },
      { value: '48h', label: 'Leakage Insight' },
      { value: 'AI', label: 'Forecast Engine' }
    ],
    outcomes: [
      'Reduce Cargo Dwell Time',
      'Improve Capacity Utilization',
      'Surface Revenue Leakage',
      'Forecast Cargo Demand',
      'Benchmark Station Performance',
      'Improve Load Planning'
    ],
    features: [
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
      }
    ]
  },
  {
    id: 'rfs',
    name: 'RFS',
    tagline: 'A cargo operations platform that streamlines shipments through the warehouse lifecycle.',
    platformNote: 'RFS is Vahanti\'s cargo operations platform, designed to reduce manual operational effort, improve logistics visibility, and ensure smooth cargo handling across the warehouse lifecycle.',
    description: 'From manifest processing and shipment breakdown to billing, customs clearance, and cargo release, RFS provides a centralized system for managing cargo operations efficiently and accurately.',
    logo: <div className="product-logo-fallback"><Truck size={24} /></div>,
    tabLogo: <div className="tab-icon-fallback"><Truck size={16} /></div>,
    tag: 'Cargo Operations Platform',
    audience: ['Cargo Handlers', 'Warehouse Operators', 'Logistics Teams'],
    stats: [
      { value: '99.9%', label: 'Processing Accuracy' },
      { value: '-40%', label: 'Manual Effort' },
      { value: '100%', label: 'Cargo Visibility' },
      { value: 'Real-Time', label: 'Clearance Alerts' }
    ],
    outcomes: [
      'Accelerate Manifest Processing',
      'Optimize Shipment Breakdown',
      'Automate Billing & Invoicing',
      'Streamline Customs Clearance',
      'Ensure Smooth Cargo Release',
      'Reduce Manual Warehouse Effort'
    ],
    features: [
      {
        icon: <Database size={22} />,
        title: 'Manifest & Cargo Intake',
        bullets: [
          <>Automatically ingest and parse inbound air cargo manifests</>,
          <>Instantly identify data anomalies and mismatched shipping bills</>,
        ],
      },
      {
        icon: <Boxes size={22} />,
        title: 'Shipment Breakdown & Sorting',
        bullets: [
          <>Track physical breakdown of shipments inside the warehouse</>,
          <>Verify piece counts and locate inventory locations</>,
        ],
      },
      {
        icon: <Receipt size={22} />,
        title: 'Automated Billing Engine',
        bullets: [
          <>Calculate accurate handling, storage, and accessorial fees</>,
          <>Generate ready-to-pay invoices directly from operational data</>,
        ],
      },
      {
        icon: <FileCheck size={22} />,
        title: 'Customs Clearance & Compliance',
        bullets: [
          <>Monitor customs release status and clearance paperwork in real-time</>,
          <>Ensure full compliance with airport cargo regulations</>,
        ],
      },
      {
        icon: <Layers size={22} />,
        title: 'Intelligent Cargo Release',
        bullets: [
          <>Manage deliver-to-truck handoffs with digital signature validation</>,
          <>Ensure seamless transfer of custody from warehouse to carrier</>,
        ],
        wide: true,
      }
    ]
  },
  {
    id: 'control-tower',
    name: 'Control Tower',
    tagline: 'An agentic cargo control center that gives stakeholders a live, shared view of operations.',
    platformNote: 'Vahanti\'s Control Tower actively drives the internal workforce toward checkpoints, SLAs, and daily goals, keeping teams aligned from handoff to milestone.',
    description: 'Control Tower combines real-time visibility, workflow orchestration, predictive alerts, and centralized communication so warehouse teams, agents, and airlines stay aligned from the first handoff to the final milestone.',
    logo: <div className="product-logo-fallback"><Radar size={24} /></div>,
    tabLogo: <div className="tab-icon-fallback"><Radar size={16} /></div>,
    tag: 'Agentic Control Center',
    audience: ['Warehouse Teams', 'Ground Handling Agents', 'Airline Operators'],
    stats: [
      { value: '100%', label: 'SLA Alignment' },
      { value: '<5 min', label: 'Alert Latency' },
      { value: 'Shared', label: 'Stakeholder View' },
      { value: 'Agentic', label: 'Workforce Engine' }
    ],
    outcomes: [
      'Establish Live Shared View',
      'Enforce SLA Checkpoints',
      'Orchestrate Warehouse Workflows',
      'Predict Critical Bottlenecks',
      'Centralize Team Communications',
      'Accelerate Handout Milestones'
    ],
    features: [
      {
        icon: <Eye size={22} />,
        title: 'Live Shared Visibility',
        bullets: [
          <>A single, <strong>live shared operations view</strong> for all internal and external stakeholders</>,
          <>Instantly sync real-time cargo status across airlines, agents and warehouses</>,
        ],
      },
      {
        icon: <Layers size={22} />,
        title: 'Workflow Orchestration',
        bullets: [
          <>Actively direct workforce assignments to meet operational milestones</>,
          <>Automate chore assignments based on queue length and SLA pressure</>,
        ],
      },
      {
        icon: <Radar size={22} />,
        title: 'Predictive SLA Alerting',
        bullets: [
          <>Surface proactive exception alerts before SLA breaches occur</>,
          <>Identify cargo bottlenecks before they impact terminal performance</>,
        ],
      },
      {
        icon: <CheckCircle size={22} />,
        title: 'Centralized Coordination Hub',
        bullets: [
          <>Keep operators, supervisors and airlines in full alignment</>,
          <>Contextual team communication pinned directly to target shipments</>,
        ],
      },
      {
        icon: <BarChart2 size={22} />,
        title: 'End-to-End SLA Auditing',
        bullets: [
          <>Comprehensive tracking from first physical handoff to final milestone</>,
          <>Enforce check-in SLA standards dynamically to prevent cargo delays</>,
        ],
        wide: true,
      }
    ]
  }
];

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const activeProduct = PRODUCTS[activeTab];

  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash.slice(1);
      const matchedIdx = PRODUCTS.findIndex(p => p.id === hashId);
      if (matchedIdx !== -1) {
        setActiveTab(matchedIdx);
        setTimeout(() => {
          const el = document.getElementById(hashId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="products-page">
      {/* ── Dark Hero ── */}
      <div className="products-page-hero">
        <div className="products-hero-inner">
          <div className="products-eyebrow">
            <span className="products-eyebrow-dot" />
            Our Products
          </div>
          <h1 className="products-title">
            Software built for aviation.
            <br />
            <span className="products-title-muted">Not adapted for it.</span>
          </h1>
          <p className="products-subtitle">
            Designed specifically for airlines, cargo terminals and ground handling operations.
            Vahanti's products transform operational data into actionable intelligence that
            improves visibility, efficiency and decision-making.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="products-content">
        <div className="product-tabs" role="tablist">
          {PRODUCTS.map((prod, idx) => (
            <button
              key={prod.id}
              role="tab"
              aria-selected={activeTab === idx}
              className={`product-tab${activeTab === idx ? ' active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <div className="product-tab-inner">
                {prod.tabLogo}
                <span>{prod.name}</span>
              </div>

              <span className="product-tab-tag">
                {prod.tag}
              </span>
            </button>
          ))}

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

        <div className="product-panel" id={activeProduct.id}>
          <div className="product-hero-row">
            <div className="product-hero-left">
              <div className="skylink-logo-wrap">
                {activeProduct.logo}
                <span className="skylink-wordmark">
                  {activeProduct.name}
                </span>
              </div>

              <p className="product-tagline">
                {activeProduct.tagline}
              </p>

              <div className="product-platform-note">
                <Info size={18} className="platform-note-icon" />
                <p>
                  {activeProduct.platformNote}
                </p>
              </div>

              <p className="product-description">
                {activeProduct.description}
              </p>

              <div className="product-audience-section">
                <span className="section-eyebrow">
                  Built For
                </span>
                <div className="product-audience">
                  {activeProduct.audience.map((aud, i) => (
                    <span key={i}>{aud}</span>
                  ))}
                </div>
              </div>

              <div className="product-cta-row">
                <a href="/#contact" className="btn-primary">
                  Request a Demo
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="product-hero-right">
              <div className="product-metrics-panel">
                <div className="metrics-panel-header">
                  <span className="metrics-panel-title">
                    {activeProduct.name.toUpperCase()} PERFORMANCE METRICS
                  </span>
                </div>
                <div className="product-stat-stack">
                  {activeProduct.stats.map((stat, i) => (
                    <div key={i} className="product-stat">
                      <span className="product-stat-value">
                        {stat.value}
                      </span>
                      <span className="product-stat-label">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="business-outcomes">
            <span className="section-eyebrow">
              Business Outcomes
            </span>

            <div className="outcomes-grid">
              {activeProduct.outcomes.map((out, i) => (
                <div key={i} className="outcome-card">
                  <span className="outcome-card-line" />
                  <span className="outcome-card-text">{out}</span>
                  <ArrowRight className="outcome-arrow" size={14} />
                </div>
              ))}
            </div>
          </div>

          <div className="features-section">
            <span className="section-eyebrow">
              What {activeProduct.name} Does
            </span>

            <div className="features-grid">
              {activeProduct.features.map((feature, index) => (
                <div
                  className={`feature-card${feature.wide ? ' wide' : ''}`}
                  key={index}
                >
                  <div className="feature-header">
                    <div className="feature-icon-wrap">
                      {feature.icon}
                    </div>

                    <h3 className="feature-title">
                      {feature.title}
                    </h3>
                  </div>

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
                See how {activeProduct.name} can improve cargo operational performance.
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