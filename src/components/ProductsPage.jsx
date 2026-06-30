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
  Sparkles,
} from 'lucide-react';
import './ProductsPage.css';
import skylinkLogo from '../assets/skylnk-logo.png';

const PRODUCTS = [
  {
    id: 'skylnk',
    name: 'Skylnk',
    tagline: 'Operational & Financial Intelligence for Air Cargo',
    platformNote: 'Skylnk combines operational dashboards, business intelligence, predictive analytics, and AI-powered insights into one intelligent cargo platform.',
    description: 'Skylnk unifies operational dashboards, business intelligence, predictive forecasting, and AI-powered insights into a single platform for air cargo operations. Monitor performance, forecast demand, measure station efficiency, and understand operational trends—all from one source of truth.',
    logo: <img src={skylinkLogo} alt="Skylink logo" width={36} height={36} style={{ objectFit: 'contain' }} loading="lazy" />,
    tabLogo: <img src={skylinkLogo} alt="Skylink" width={20} height={20} style={{ objectFit: 'contain' }} loading="lazy" />,
    tag: 'Cargo Intelligence Platform',
    audience: [
      { name: 'Cargo Terminal Managers', benefit: 'Terminal performance & cargo visibility' },
      { name: 'Executive Teams', benefit: 'Track business health & revenue trends' },
      { name: 'Ground Handling Agents', benefit: 'Improve turnaround efficiency' },
      { name: 'Airport Operators', benefit: 'Monitor station operations' }
    ],
    stats: [
      { value: 'Business Intelligence', label: 'Analytics' },
      { value: 'Live Operations', label: 'Monitoring' },
      { value: 'Predictive Forecasting', label: 'AI Models' },
      { value: 'AI Insights', label: 'AI Powered' }
    ],
    outcomes: [
      {
        title: 'Monitor Airline Performance',
        how: 'Tracks airline tonnage, revenue and market share across stations.',
        impact: 'Quickly identify high-performing and underperforming airline operations.'
      },
      {
        title: 'Benchmark Cargo Agents',
        how: 'Compare agent performance, tonnage contribution and growth trends.',
        impact: 'Benchmark partners and support better commercial decisions.'
      },
      {
        title: 'Measure Station Efficiency',
        how: 'Measure station performance using S-Score across landside and airside operations.',
        impact: 'Identify operational inefficiencies and improve station productivity.'
      },
      {
        title: 'Forecast Cargo Demand',
        how: 'Predict manifested cargo weight and shipment pieces for future periods.',
        impact: 'Optimize workforce, warehouse, and capacity planning.'
      },
      {
        title: 'Understand Cargo Trends',
        how: 'AI explains significant cargo rises and dips automatically.',
        impact: 'Reduce investigation time and accelerate root cause analysis.'
      },
      {
        title: 'Improve Operational Decisions',
        how: 'Combine analytics, monitoring, forecasting, and AI insights in one platform.',
        impact: 'Enable faster, data-driven operational decisions.'
      }
    ],
    features: [
      {
        icon: <BarChart2 size={25} />,
        title: 'Business Intelligence & Analytics',
        description: 'Explore airline, agent, commodity, revenue, and tonnage performance with station and regional drill-down analysis.',
        bullets: [
          <>Airline Performance Analytics</>,
          <>Cargo Agent Benchmarking</>,
          <>Commodity Analytics</>,
          <>Regional & Station Drill-downs</>
        ],
      },
      {
        icon: <Gauge size={25} />,
        title: 'Operations Dashboard',
        description: 'Monitor SLA milestones, EDI message health, and warehouse operations in real time.',
        bullets: [
          <>SLA monitoring</>,
          <>EDI message monitoring</>,
          <>Live operational dashboards</>,
          <>Cargo processing visibility</>,
          <>Exception monitoring</>
        ],
      },
      {
        icon: <Brain size={25} />,
        title: 'Predictive Analytics',
        description: 'Forecast future cargo demand using historical operational data.',
        bullets: [
          <>Manifested weight forecasting</>,
          <>Shipment pieces forecasting</>,
          <>Airline demand forecasting</>,
          <>Commodity forecasting</>,
          <>Date and period-based predictions</>
        ],
      },
      {
        icon: <Sparkles size={25} />,
        title: 'AI Operational Insights',
        description: 'Understand why cargo trends change using AI-powered insights.',
        bullets: [
          <>Cargo rise & dip analysis</>,
          <>AI-generated operational explanations</>,
          <>Trend interpretation</>,
          <>Decision support</>,
          <>Faster root cause analysis</>
        ],
      },
      {
        icon: <Layers size={25} />,
        title: 'Station Performance Intelligence',
        description: 'Powered by Skylnk\'s proprietary S-Score framework with drill-down visibility into landside and airside activities.',
        bullets: [
          <>Station efficiency scoring</>,
          <>Landside performance analysis</>,
          <>Airside performance analysis</>,
          <>Activity-level drill-downs</>,
          <>Performance benchmarking</>
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
    audience: [
      { name: 'Cargo Handlers', benefit: 'Streamline breakdown and sorting.' },
      { name: 'Warehouse Operators', benefit: 'Reduce manual effort and track layout.' },
      { name: 'Logistics Teams', benefit: 'Optimize coordination and clearance.' }
    ],
    stats: [
      { value: '99.9%', label: 'Processing Accuracy', icon: <FileCheck size={18} /> },
      { value: '-40%', label: 'Manual Effort', icon: <Boxes size={18} /> },
      { value: '100%', label: 'Cargo Visibility', icon: <Eye size={18} /> },
      { value: 'Real-Time', label: 'Clearance Alerts', icon: <Radar size={18} /> }
    ],
    outcomes: [
      {
        title: 'Accelerate Manifest Processing',
        how: 'Uses automated data extraction and validation rules to parse incoming messages.',
        impact: 'Eliminates manual input errors and lets warehouse staff prep for intake early.'
      },
      {
        title: 'Optimize Shipment Breakdown',
        how: 'Provides digital checklist guiding sorting staff based on cargo weight, shape, and SHCs.',
        impact: 'Reduces damage risks and speeds up availability times.'
      },
      {
        title: 'Automate Billing & Invoicing',
        how: 'Integrates billing engine directly with weight receipt and dwell time tracking.',
        impact: 'Prevents manual billing errors and secures payment before cargo release.'
      },
      {
        title: 'Streamline Customs Clearance',
        how: 'Directly interfaces with local customs systems to query release permissions.',
        impact: 'Prevents delays, reduces storage dwell time, and avoids compliance penalties.'
      },
      {
        title: 'Ensure Smooth Cargo Release',
        how: 'Uses digital gate-passes and barcode scans to confirm identity and payment status.',
        impact: 'Decreases truck waiting times and ensures cargo is delivered to the correct vehicle.'
      },
      {
        title: 'Reduce Manual Warehouse Effort',
        how: 'Replaces clipboards with mobile terminal applications for real-time status updates.',
        impact: 'Increases staff productivity and keeps the warehouse layout clean.'
      }
    ],
    features: [
      {
        icon: <Database size={25} />,
        title: 'Manifest & Cargo Intake',
        bullets: [
          <>Automatically ingest and parse inbound air cargo manifests</>,
          <>Instantly identify data anomalies and mismatched shipping bills</>,
        ],
      },
      {
        icon: <Boxes size={25} />,
        title: 'Shipment Breakdown & Sorting',
        bullets: [
          <>Track physical breakdown of shipments inside the warehouse</>,
          <>Verify piece counts and locate inventory locations</>,
        ],
      },
      {
        icon: <Receipt size={25} />,
        title: 'Automated Billing Engine',
        bullets: [
          <>Calculate accurate handling, storage, and accessorial fees</>,
          <>Generate ready-to-pay invoices directly from operational data</>,
        ],
      },
      {
        icon: <FileCheck size={25} />,
        title: 'Customs Clearance & Compliance',
        bullets: [
          <>Monitor customs release status and clearance paperwork in real-time</>,
          <>Ensure full compliance with airport cargo regulations</>,
        ],
      },
      {
        icon: <Layers size={25} />,
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
    audience: [
      { name: 'Warehouse Teams', benefit: 'Align workforce dynamically with SLAs.' },
      { name: 'Ground Handling Agents', benefit: 'Enforce compliance and audit histories.' },
      { name: 'Airline Operators', benefit: 'Live shared view of milestone statuses.' }
    ],
    stats: [
      { value: '100%', label: 'SLA Alignment', icon: <FileCheck size={18} /> },
      { value: '<5 min', label: 'Alert Latency', icon: <Radar size={18} /> },
      { value: 'Shared', label: 'Stakeholder View', icon: <Eye size={18} /> },
      { value: 'Agentic', label: 'Workforce Engine', icon: <Layers size={18} /> }
    ],
    outcomes: [
      {
        title: 'Establish Live Shared View',
        how: 'Aggregates disparate data systems into a unified status board.',
        impact: 'Replaces constant status phone calls and emails with trustable self-serve metrics.'
      },
      {
        title: 'Enforce SLA Checkpoints',
        how: 'Sounds alerts and highlights shipments as they approach milestone deadlines.',
        impact: 'Avoids costly carrier penalties and builds customer confidence.'
      },
      {
        title: 'Orchestrate Warehouse Workflows',
        how: 'Directs tasks dynamically based on queue sizes and shipment priorities.',
        impact: 'Optimizes labor allocation and improves daily terminal handling capacity.'
      },
      {
        title: 'Predict Critical Bottlenecks',
        how: 'Uses history models to identify queues building at specific work centers.',
        impact: 'Lets managers reallocate resources proactively to keep shipments moving.'
      },
      {
        title: 'Centralize Team Communications',
        how: 'Pins contextual messaging threads directly to shipment records.',
        impact: 'Ensures the entire team shares the same operational context when resolving issues.'
      },
      {
        title: 'Accelerate Handout Milestones',
        how: 'Signals readiness alerts to operators and transport teams automatically.',
        impact: 'Minimizes idle time between logistics legs, improving cargo transit speeds.'
      }
    ],
    features: [
      {
        icon: <Eye size={25} />,
        title: 'Live Shared Visibility',
        bullets: [
          <>A single, <strong>live shared operations view</strong> for all internal and external stakeholders</>,
          <>Instantly sync real-time cargo status across airlines, agents and warehouses</>,
        ],
      },
      {
        icon: <Layers size={25} />,
        title: 'Workflow Orchestration',
        bullets: [
          <>Actively direct workforce assignments to meet operational milestones</>,
          <>Automate chore assignments based on queue length and SLA pressure</>,
        ],
      },
      {
        icon: <Radar size={25} />,
        title: 'Predictive SLA Alerting',
        bullets: [
          <>Surface proactive exception alerts before SLA breaches occur</>,
          <>Identify cargo bottlenecks before they impact terminal performance</>,
        ],
      },
      {
        icon: <CheckCircle size={25} />,
        title: 'Centralized Coordination Hub',
        bullets: [
          <>Keep operators, supervisors and airlines in full alignment</>,
          <>Contextual team communication pinned directly to target shipments</>,
        ],
      },
      {
        icon: <BarChart2 size={25} />,
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
  const [activeOutcomePopover, setActiveOutcomePopover] = useState(null);
  const [popoverAlign, setPopoverAlign] = useState('center');

  const triggerPopover = (el, index) => {
    setActiveOutcomePopover(index);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const spaceOnLeft = rect.left + rect.width / 2;
    const spaceOnRight = screenWidth - (rect.left + rect.width / 2);
    
    if (spaceOnLeft < 170) {
      setPopoverAlign('left');
    } else if (spaceOnRight < 170) {
      setPopoverAlign('right');
    } else {
      setPopoverAlign('center');
    }
  };

  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveOutcomePopover(null);
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

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

              <div className="product-cta-row">
                <a href="/#contact" className="btn-primary">
                  Request a Demo
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="product-hero-right">
              <div className="product-audience-section">
                <span className="section-eyebrow">
                  Ideal For
                </span>
                <div className="product-audience-grid">
                  {activeProduct.audience.map((aud, i) => (
                    <div key={i} className="audience-card">
                      <strong className="audience-name">{aud.name}</strong>
                      <p className="audience-benefit">{aud.benefit}</p>
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
                <div
                  key={i}
                  className={`outcome-card ${activeOutcomePopover === i ? 'active' : ''}`}
                  onMouseEnter={(e) => triggerPopover(e.currentTarget, i)}
                  onMouseLeave={() => setActiveOutcomePopover(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeOutcomePopover === i) {
                      setActiveOutcomePopover(null);
                    } else {
                      triggerPopover(e.currentTarget, i);
                    }
                  }}
                >
                  <div className="outcome-card-clip">
                    <span className="outcome-card-line" />
                  </div>
                  <span className="outcome-card-text">{out.title}</span>

                  {activeOutcomePopover === i && (
                    <div className={`outcome-popover popover-${popoverAlign}`} onClick={(e) => e.stopPropagation()}>
                      <div className="outcome-popover-arrow" />
                      <h4 className="outcome-popover-title">{out.title}</h4>
                      
                      <div className="popover-row">
                        <span className="popover-label">How {activeProduct.name} Helps</span>
                        <span className="popover-value">{out.how}</span>
                      </div>
                      
                      <div className="popover-row">
                        <span className="popover-label">Business Impact</span>
                        <span className="popover-value">{out.impact}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {activeProduct.id === 'skylnk' && (
            <div className="predictive-section">
              <span className="section-eyebrow">Predictive Intelligence</span>
              <div className="predictive-grid">
                <div className="predictive-left">
                  <h2 className="predictive-title">Forecast Future Cargo Demand</h2>
                  <p className="predictive-desc">
                    Skylnk forecasts manifested cargo weight and pieces using historical shipment patterns across airlines, commodities, stations and reporting periods, helping operations teams prepare resources before demand changes.
                  </p>
                </div>
                
                <div className="predictive-groups-container">
                  {[
                    {
                      category: 'Forecasting',
                      icon: <Brain size={20} className="predictive-category-icon" />,
                      items: [
                        { name: 'Airline Forecasting' },
                        { name: 'Commodity Forecasting' },
                        { name: 'Weight Prediction' },
                        { name: 'Pieces Prediction' }
                      ]
                    },
                    {
                      category: 'Resource Planning',
                      icon: <Layers size={20} className="predictive-category-icon" />,
                      items: [
                        { name: 'Warehouse Readiness' },
                        { name: 'Capacity Planning' },
                        { name: 'Manpower Planning' },
                      ]
                    },
                    {
                      category: 'AI Insights',
                      icon: <Radar size={20} className="predictive-category-icon" />,
                      items: [
                        { name: 'Rise/Dip Analysis' },
                        { name: 'AI-Powered Explanations' },
                        { name: 'Trend Detection' },
                        { name: 'Decision Support' }
                      ]
                    }
                  ].map((group, groupIdx) => (
                    <div key={groupIdx} className="predictive-group-card">
                      <h3 className="predictive-group-title">
                        {group.icon}
                        <span>{group.category}</span>
                      </h3>
                      <ul className="predictive-group-list">
                        {group.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="predictive-group-item">
                            <div className="predictive-item-dot" />
                            <div className="predictive-item-content">
                              <strong>{item.name}</strong>
                              {item.desc && <p>{item.desc}</p>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

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

                  {feature.description && (
                    <p className="feature-desc-text">
                      {feature.description}
                    </p>
                  )}

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
                {activeProduct.id === 'skylnk'
                  ? 'Operational Intelligence for Better Cargo Decisions'
                  : `See how ${activeProduct.name} can improve cargo operational performance.`}
              </h2>

              <p>
                {activeProduct.id === 'skylnk'
                  ? 'Discover how Skylnk combines business intelligence, operational monitoring, predictive analytics, and AI-powered insights to help cargo businesses make faster, smarter operational decisions.'
                  : 'Schedule a tailored demonstration based on your cargo environment, operational workflows and business objectives.'}
              </p>
            </div>

            <a href="/#contact" className="btn-primary">
              {activeProduct.id === 'skylnk' ? 'Request a Skylnk Demo' : 'Book a Demo Call'}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;