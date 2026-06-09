import React from 'react';
import { Compass, Cpu, Globe } from 'lucide-react';
import './ClaritySection.css';

const cards = [
  {
    icon: <Compass size={20} />, n: '01',
    title: 'Deep Cargo Expertise',
    desc: "Our team has operated inside cargo revenue management, load control, and ground handling — we understand manifests, MAWB chains, and payload allocation trade-offs, not just your data.",
    detail: 'Domain-first, software-second.',
  },
  {
    icon: <Cpu size={20} />, n: '02',
    title: 'Next-Gen Tech Execution',
    desc: "India's sharpest AI/ML graduates, guided by operational veterans. We ship transformer-based NLP, real-time streaming pipelines, and RL-driven scheduling engines — not proof-of-concepts.",
    detail: 'Research-to-runway in weeks.',
  },
  {
    icon: <Globe size={20} />, n: '03',
    title: 'Measurable Aviation Impact',
    desc: "Every engagement is benchmarked against a real operational KPI — payload utilisation, route yield, dwell time, or AWB throughput. We don't consider the work done until the metric moves.",
    detail: 'KPI-anchored delivery.',
  },
];

const ClaritySection = () => (
  <section className="section clarity-section">
    <div className="container">
      <div className="clarity-header">
        <span className="section-eyebrow">Why Vahanti</span>
        <h2 className="section-title">Precision where other firms leave generic.</h2>
      </div>
      <div className="clarity-grid">
        {cards.map((c, i) => (
          <div className="clarity-card" key={i}>
            <div className="clarity-icon">{c.icon}</div>
            <div>
              <span className="clarity-number">{c.n}</span>
              <h3 className="clarity-title">{c.title}</h3>
              <p className="clarity-desc">{c.desc}</p>
            </div>
            <span className="clarity-detail">{c.detail}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ClaritySection;