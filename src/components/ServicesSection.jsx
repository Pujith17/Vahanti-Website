import React, { useState, useEffect } from 'react';
import { BarChart2, Brain, Settings, CheckCircle, ChevronDown } from 'lucide-react';
import { useInView } from '../hooks/useScrollProgress';
import './ServicesSection.css';

const services = [
  {
    id: 'analytics',
    icon: <BarChart2 size={24} />,
    tag: 'Pillar I',
    title: 'Data Science & Cargo Analytics',
    subtitle: 'Visibility, historical performance analysis, and decision support designed for air cargo terminals, warehouse operations, and ground handling teams.',
    features: [
      'Real-time operational dashboards for throughput, lane bottlenecks, dwell time, and SLA compliance',
      'Warehouse capacity utilisation and shipment flow analysis across terminals',
      'Revenue performance, yield analytics, and historical trend reporting',
      'Manifest validation, shipment variance analysis, and operational exception visibility',
      'Custom operational KPI frameworks aligned with your business objectives and air cargo operations',
    ],
    roi: 'Airlines using our analytics layer reduce ground dwell time by up to 18% and surface revenue leakage within 48 hours of deployment.',
    vizType: 'bars',
  },
  {
    id: 'ai',
    icon: <Brain size={24} />,
    tag: 'Pillar II',
    title: 'Operational Intelligence',
    subtitle: 'Operational intelligence solutions designed to transform operational data into planning insights, historical analysis, and decision support.',
    features: [
      'Cargo demand forecasting and capacity planning',
      'Intelligent manifest parsing, OCR document extraction, and automatic operational record creation',
      'Historical performance analysis and operational trend visibility',
      'Shift planning and resource planning based on historical operational performance',
    ],
    roi: 'Cargo operators using our AI scheduling models recover 3–5% of previously idle ground equipment capacity without adding headcount.',
    vizType: 'nodes',
  },
  {
    id: 'software',
    icon: <Settings size={24} />,
    tag: 'Pillar III',
    title: 'Enterprise Aviation Software',
    subtitle: 'Custom execution platforms designed around the realities of air cargo terminal operations.',
    features: [
      'End-to-end air cargo execution platform and operational workflows',
      'API-first architecture designed for enterprise extensibility and future integrations',
      'Ground handling coordination platforms with live terminal visibility',
      'Mobile-first interfaces for ramp supervisors and terminal operators',
    ],
    roi: 'Custom software eliminates the integration tax cargo teams pay daily, reducing manual data entry effort by 60–80%.',
    vizType: 'modules',
  },
];

const ServicesSection = () => {
  const [active, setActive] = useState(0);
  const [activeMobile, setActiveMobile] = useState(0); // Expanded accordion item index
  const [vizActive, setVizActive] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.15 });

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setVizActive(true), 300);
      return () => clearTimeout(t);
    } else {
      setVizActive(false);
    }
  }, [inView, active]);

  // Reset viz on tab change
  const handleSetActive = (i) => {
    setVizActive(false);
    setActive(i);
    setTimeout(() => setVizActive(true), 150);
  };

  const handleToggleMobile = (i) => {
    setActiveMobile(prev => (prev === i ? null : i));
  };

  const s = services[active];

  return (
    <section className="services-story section" id="services" ref={ref}>
      <div className="container">
        {/* Header */}
        <div className={`services-story-header ${inView ? 'services-story-header--visible' : ''}`}>
          <span className="section-eyebrow">What we build</span>
          <h2 className="services-story-title">
            Three pillars.<br />
            <span>One aviation focus.</span>
          </h2>
          <p className="services-story-sub">
            Every engagement maps to one of three core capabilities, all grounded in
            deep air freight domain knowledge fused with AI/ML engineering.
          </p>
        </div>

        {/* Desktop View */}
        <div className="services-desktop-layout">
          {/* Tab switcher */}
          <div className="services-story-tabs" role="tablist">
            {services.map((sv, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={active === i}
                className={`srv-tab ${active === i ? 'srv-tab--active' : ''}`}
                onClick={() => handleSetActive(i)}
              >
                <span className="srv-tab-icon">{sv.icon}</span>
                <span className="srv-tab-body">
                  <span className="srv-tab-tag">{sv.tag}</span>
                  <span className="srv-tab-title">{sv.title}</span>
                </span>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="services-story-panel" key={active}>
            {/* Left: content */}
            <div className="srv-panel-left">
              <div className="srv-icon-badge">{s.icon}</div>
              <h3 className="srv-panel-title">{s.title}</h3>
              <p className="srv-panel-sub">{s.subtitle}</p>
              <ul className="srv-features">
                {s.features.map((f, i) => (
                  <li key={i} style={{ '--fi': i }}>
                    <CheckCircle size={14} className="srv-check" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Accordion View */}
        <div className="services-mobile-accordion">
          {services.map((sv, i) => {
            const isExpanded = activeMobile === i;
            return (
              <div
                key={sv.id}
                className={`srv-accordion-item ${isExpanded ? 'srv-accordion-item--expanded' : ''}`}
              >
                <button
                  className="srv-accordion-header"
                  onClick={() => handleToggleMobile(i)}
                  aria-expanded={isExpanded}
                >
                  <div className="srv-accordion-header-left">
                    <span className="srv-accordion-icon">{sv.icon}</span>
                    <div className="srv-accordion-meta">
                      <span className="srv-accordion-tag">{sv.tag}</span>
                      <span className="srv-accordion-title">{sv.title}</span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`srv-accordion-chevron ${isExpanded ? 'srv-accordion-chevron--rotated' : ''}`}
                    size={16}
                  />
                </button>
                <div
                  className="srv-accordion-content-wrapper"
                  style={{
                    maxHeight: isExpanded ? '600px' : '0px',
                    opacity: isExpanded ? 1 : 0,
                    paddingTop: isExpanded ? '0.75rem' : '0px',
                    paddingBottom: isExpanded ? '1.25rem' : '0px',
                  }}
                >
                  <div className="srv-accordion-card-content">
                    <div className="srv-icon-badge">{sv.icon}</div>
                    <h3 className="srv-panel-title">{sv.title}</h3>
                    <p className="srv-panel-sub">{sv.subtitle}</p>
                    <ul className="srv-features">
                      {sv.features.map((f, idx) => (
                        <li key={idx}>
                          <CheckCircle size={14} className="srv-check" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};


/* --- Live Bar Chart Viz --- */
function BarsViz({ active }) {
  const bars = [
    { label: 'Dwell', pct: 82, delta: '-18%' },
    { label: 'Throughput', pct: 94, delta: '+12%' },
    { label: 'Yield/kg', pct: 71, delta: '+8%' },
    { label: 'Utilisation', pct: 88, delta: '+5%' },
  ];
  return (
    <div className="viz-bars">
      {bars.map((b, i) => (
        <div key={i} className="viz-bar-row">
          <span className="viz-bar-label">{b.label}</span>
          <div className="viz-bar-track">
            <div
              className="viz-bar-fill"
              style={{
                width: active ? `${b.pct}%` : '0%',
                transitionDelay: `${i * 120}ms`,
              }}
            />
          </div>
          <span className="viz-bar-delta">{b.delta}</span>
        </div>
      ))}
    </div>
  );
}

/* --- Neural Net Viz --- */
function NodesViz({ active }) {
  // 3 clear layers: Input → Hidden → Output
  const layers = [
    [{ x: 12, y: 25 }, { x: 12, y: 50 }, { x: 12, y: 75 }],
    [{ x: 42, y: 17 }, { x: 42, y: 38 }, { x: 42, y: 59 }, { x: 42, y: 80 }],
    [{ x: 72, y: 33 }, { x: 72, y: 67 }],
    [{ x: 92, y: 50 }],
  ];
  const conns = [];
  for (let l = 0; l < layers.length - 1; l++) {
    for (const a of layers[l]) {
      for (const b of layers[l + 1]) {
        conns.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
      }
    }
  }
  const allNodes = layers.flat();

  return (
    <svg className="viz-nodes" viewBox="0 0 104 100" preserveAspectRatio="xMidYMid meet">
      <defs>
        <marker id="arrowhead" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
          <polygon points="0 0, 4 2, 0 4" fill="var(--color-primary)" opacity="0.5" />
        </marker>
      </defs>
      {/* Connections */}
      {conns.map((c, i) => (
        <line
          key={i} x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
          stroke="var(--color-primary)" strokeWidth="0.5"
          strokeOpacity={active ? 0.3 : 0}
          style={{ transition: `stroke-opacity 0.6s ease ${i * 30}ms` }}
        />
      ))}
      {/* Animated signal pulses along connections */}
      {active && conns.map((c, i) => {
        let beginDelay = 0;
        if (i >= 12 && i < 20) {
          beginDelay = 0.9 + (i % 3) * 0.3;
        } else if (i >= 20) {
          beginDelay = 1.8 + (i % 2) * 0.4;
        } else {
          beginDelay = (i % 4) * 0.3;
        }
        return (
          <circle key={`pulse-${i}`} r="1.1" fill="var(--color-primary)" opacity="0.85">
            <animateMotion
              dur={`${2.2 + (i % 3) * 0.4}s`}
              repeatCount="indefinite"
              begin={`${beginDelay}s`}
              path={`M${c.x1},${c.y1} L${c.x2},${c.y2}`}
            />
          </circle>
        );
      })}
      {/* Nodes */}
      {allNodes.map((n, i) => {
        const isOutput = i === allNodes.length - 1;
        return (
          <g key={i}>
            <circle
              cx={n.x} cy={n.y} r={isOutput ? 5 : 3.5}
              fill={isOutput ? 'var(--color-primary)' : 'var(--color-bg)'}
              stroke="var(--color-primary)"
              strokeWidth={isOutput ? 0 : 1.2}
              opacity={active ? 1 : 0}
              style={{ transition: `opacity 0.4s ease ${i * 60}ms` }}
            />
            {isOutput && active && (
              <circle cx={n.x} cy={n.y} r="8" fill="var(--color-primary)" opacity="0.15">
                <animate attributeName="r" values="5;10;5" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.15;0.03;0.15" dur="2s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        );
      })}
      {/* Layer labels */}
      {active && ['Input', 'Hidden', 'Output', 'Pred.'].map((label, i) => (
        <text
          key={label}
          x={[12, 42, 72, 92][i]} y="96"
          textAnchor="middle" fontSize="4.5"
          fill="var(--color-text-faint)"
          style={{ transition: `opacity 0.5s ease ${i * 100 + 300}ms` }}
        >
          {label}
        </text>
      ))}
    </svg>
  );
}

/* --- Module Architecture Viz --- */
function ModulesViz({ active }) {
  const modules = [
    { label: 'DCS', x: 8, y: 8, w: 24, h: 14, accent: false },
    { label: 'CMS', x: 72, y: 8, w: 24, h: 14, accent: false },
    { label: 'ERP', x: 8, y: 72, w: 24, h: 14, accent: false },
    { label: 'Mobile', x: 72, y: 72, w: 24, h: 14, accent: false },
    { label: 'API Layer', x: 34, y: 40, w: 36, h: 18, accent: true },
  ];
  const pipes = [
    { x1: 32, y1: 15, x2: 42, y2: 42 },
    { x1: 72, y1: 15, x2: 62, y2: 42 },
    { x1: 32, y1: 79, x2: 42, y2: 57 },
    { x1: 72, y1: 79, x2: 62, y2: 57 },
  ];
  return (
    <svg className="viz-modules" viewBox="0 0 104 94">
      {pipes.map((p, i) => (
        <g key={i}>
          <line
            x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
            stroke="var(--color-primary)" strokeWidth="1.2" strokeDasharray="3 2"
            strokeOpacity={active ? 0.55 : 0}
            style={{ transition: `stroke-opacity 0.5s ease ${i * 80}ms` }}
          />
          {active && (
            <circle r="2" fill="var(--color-primary)" opacity="0.9">
              <animateMotion
                dur={`${1.4 + i * 0.25}s`} repeatCount="indefinite" begin={`${i * 0.35}s`}
                path={`M${p.x1},${p.y1} L${p.x2},${p.y2}`}
              />
            </circle>
          )}
        </g>
      ))}
      {modules.map((m, i) => (
        <g key={i}>
          <rect
            x={m.x} y={m.y} width={m.w} height={m.h} rx="4"
            fill={m.accent ? 'var(--color-primary)' : 'var(--color-surface-2)'}
            stroke={m.accent ? 'transparent' : 'var(--color-divider)'}
            strokeWidth="1"
            opacity={active ? 1 : 0}
            style={{ transition: `opacity 0.5s ease ${i * 90}ms` }}
          />
          <text
            x={m.x + m.w / 2} y={m.y + m.h / 2 + 1.5}
            textAnchor="middle" fontSize={m.accent ? '5.5' : '4.5'}
            fontWeight={m.accent ? '700' : '500'}
            fill={m.accent ? '#d9e3e1' : 'var(--color-text-muted)'}
            opacity={active ? 1 : 0}
            style={{ transition: `opacity 0.5s ease ${i * 90 + 80}ms` }}
          >
            {m.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default ServicesSection;