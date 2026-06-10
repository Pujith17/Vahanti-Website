import React, { useState } from 'react';
import { BarChart2, Brain, Settings, ArrowRight, CheckCircle } from 'lucide-react';
import './ServicesSection.css';

const services = [
  {
    icon: <BarChart2 size={28} />, tag: 'Pillar I',
    title: 'Data Science & Cargo Analytics',
    subtitle: 'From raw terminal data to actionable operational intelligence.',
    features: [
      'Real-time control tower dashboards: throughput, bottlenecks, dwell time',
      'Payload allocation analysis and capacity utilisation tracking by route',
      'Route yield reporting and revenue-per-kilo trend visualisation',
      'Freight manifest anomaly detection and exception flagging',
      'Custom KPI frameworks built around your cargo operation metrics',
    ],
    roi: 'Airlines using our analytics layer reduce ground dwell time by up to 18% and surface revenue leakage within 48 hours of deployment.',
    engagement: 'Project-based or dedicated sprint model. All engagements begin with a 2-week Technical Audit to map your data sources, operational gaps, and highest-impact quick wins.',
  },
  {
    icon: <Brain size={28} />, tag: 'Pillar II',
    title: 'AI/ML Automations',
    subtitle: 'Predictive intelligence trained on aviation-specific data patterns.',
    features: [
      'Predictive fuel consumption models by route, load factor, and fleet type',
      'Demand forecasting for freight capacity planning — 7 to 90-day horizons',
      'NLP-powered freight manifest processing and automated AWB classification',
      'Delay risk scoring: ground handling, slot constraints, and connection chain analysis',
      'Reinforcement learning for ramp resource scheduling optimisation',
    ],
    roi: 'Cargo operators using our AI scheduling models recover 3–5% of previously idle ground equipment capacity — without adding headcount.',
    engagement: 'Dedicated sprint model with 4-week cycles. Model accuracy is benchmarked against your historical operations data before production deployment.',
  },
  {
    icon: <Settings size={28} />, tag: 'Pillar III',
    title: 'Enterprise Aviation Software',
    subtitle: 'Bespoke software built around your operational reality — not generic SaaS.',
    features: [
      'End-to-end cargo management system modules and third-party integrations',
      'API layers connecting legacy DCS, CMS, and ERP systems',
      'Ground handling coordination platforms with live ramp visibility',
      'Cargo revenue management tools: pricing, yield, and overbooking engines',
      'Mobile-first interfaces for ramp supervisors and terminal operators',
    ],
    roi: 'Custom software eliminates the integration tax cargo teams pay daily — reducing manual data entry effort by 60–80%.',
    engagement: 'Full-cycle project engagements from scoping to deployment. Begins with a Technical Audit. Priced transparently per milestone with defined deliverables.',
  },
];

const ServicesSection = () => {
  const [active, setActive] = useState(0);
  const s = services[active];
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="services-header">
          <span className="section-eyebrow">What we build</span>
          <h2 className="section-title">Three capability pillars.<br />One aviation focus.</h2>
          <p className="section-subtitle">Every engagement maps to one of three core pillars — all sharing the same foundation: deep air freight domain knowledge fused with modern AI/ML engineering, validated by people who have operated in the industry, not just consulted to it.</p>
        </div>
        <div className="services-tabs" role="tablist">
          <div
            className="tab-indicator"
            style={{
              transform: `translateX(${active * 100}%)`,
            }}
          />
          {services.map((sv, i) => (
            <button key={i} role="tab" aria-selected={active === i} className={`service-tab${active === i ? ' active' : ''}`} onClick={() => setActive(i)}>
              <span className="tab-tag">{sv.tag}</span>
              <span className="tab-title">{sv.title}</span>
            </button>
          ))}
        </div>
        <div className="service-detail" key={active}>
          <div className="service-detail-left">
            <div className="service-icon-wrap">{s.icon}</div>
            <div className="service-tag-pill">{s.tag}</div>
            <h3 className="service-detail-title">{s.title}</h3>
            <p className="service-detail-subtitle">{s.subtitle}</p>
            <ul className="service-features">
              {s.features.map((f, i) => <li key={i}><CheckCircle size={15} className="check-icon" /><span>{f}</span></li>)}
            </ul>
          </div>
          <div className="service-detail-right">
            <div className="roi-card"><div className="roi-label">Direct ROI</div><p className="roi-text">{s.roi}</p></div>
            <div className="engagement-card">
              <div className="engagement-label">Engagement Model</div>
              <p className="engagement-text">{s.engagement}</p>
              <a href="#contact" className="btn-primary engagement-cta">Request a Technical Audit <ArrowRight size={14} /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;