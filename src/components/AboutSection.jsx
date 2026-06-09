import React from 'react';
import { Target, Users, Zap, Award, Shield, Lightbulb } from 'lucide-react';
import './AboutSection.css';

const stats = [
  { value: '3–5%',  label: 'Operational uplift delivered' },
  { value: 'AI/ML', label: 'Core engineering stack' },
  { value: 'BLR',   label: 'Bengaluru-based, aviation-obsessed' },
  { value: '100%',  label: 'Domain-driven development' },
];

const values = [
  { icon: <Target size={20} />,    title: 'Precision',     desc: "We measure success in payload utilisation points and manifest processing seconds — not slide deck bullets." },
  { icon: <Lightbulb size={20} />, title: 'Innovation',    desc: "Our university talent ships AI/ML techniques from research to runway. We build what incumbents are still piloting." },
  { icon: <Users size={20} />,     title: 'Collaboration', desc: "Every engagement is a joint operation. Your domain knowledge, our engineering depth — one shared outcome." },
  { icon: <Award size={20} />,     title: 'Impact',        desc: "If it doesn't move a KPI, we don't build it. Every feature traces back to a real operational bottleneck." },
];

const AboutSection = () => (
  <section className="section about-section" id="about">
    <div className="container">
      <div className="about-header">
        <span className="section-eyebrow">Who we are</span>
        <h2 className="section-title">Bengaluru-based.<br />Aviation-obsessed.</h2>
        <p className="section-subtitle">Vahanti Technologies was founded on a clear observation: air cargo operations generate enormous volumes of data — freight manifests, payload allocations, ground handling logs, route yield figures — yet most airlines and terminals still make critical decisions on instinct and spreadsheets. We exist to close that gap.</p>
      </div>
      <div className="about-stats">
        {stats.map((s, i) => <div className="stat-card" key={i}><span className="stat-value">{s.value}</span><span className="stat-label">{s.label}</span></div>)}
      </div>
      <div className="about-narrative">
        <div className="narrative-block">
          <h3 className="narrative-title">The gap we're closing</h3>
          <p>Commercial airlines and air freight operators work at the intersection of razor-thin margins and real-time complexity. A 1% improvement in capacity utilisation on a wide-body freighter route translates directly to bottom-line impact. Yet the software serving this industry has barely evolved — legacy systems, fragmented data silos, and generic analytics tools not built with a freight manifest or load control sheet in mind.</p>
          <p>Our founding team brings direct air cargo industry experience — people who have sat in operations centres, negotiated payload allocations, and watched good decisions get made too slowly because the data wasn't visible in time. We know what a control tower dashboard needs to show at 03:00 when a belly-hold shipment is at risk.</p>
        </div>
        <div className="narrative-block">
          <h3 className="narrative-title">Why the hybrid model wins</h3>
          <p>We pair industry veterans who define the problem with precision against a team of rigorously selected university students and early-career professionals specialising in Data Science, AI/ML, and modern software engineering.</p>
          <p>The veterans set the strategic guardrails: which metrics matter, which integrations are non-negotiable, which edge cases will break a model in production. The student innovators bring the latest techniques — transformer-based NLP for manifest processing, reinforcement learning for resource scheduling, real-time streaming pipelines — without the institutional inertia that slows larger consultancies.</p>
        </div>
      </div>
      <div className="mid-trust">
        <p className="mid-trust-text">Our Bengaluru base gives us access to <strong>India's deepest pool of AI/ML engineering talent</strong> — students and graduates from IITs, NITs, and leading private universities who compete on a global standard. Combined with the operational rigour of our <strong>industry veterans</strong>, this is not a cost advantage. It is a <strong>capability advantage</strong>: faster iteration, newer techniques, and an obsessive focus on aviation outcomes that generalist software firms simply cannot replicate.</p>
        <div className="mid-trust-cta">
          <h3>Ready to see it in action?</h3>
          <p>Book a 30-minute Technical Audit call. We'll map your operational data landscape and propose a concrete roadmap — at no cost, no commitment.</p>
          <a href="#contact" className="btn-primary">Book a Discovery Call</a>
        </div>
      </div>
      <div className="team-framework" id="team">
        <div className="framework-card veterans">
          <div className="framework-badge"><Shield size={15} /> Industry Veterans</div>
          <h3>Strategy &amp; Guardrails</h3>
          <p>Senior professionals with direct experience in airline operations, air freight terminal management, and cargo revenue management. They define the problem space, validate model outputs against operational reality, and ensure every solution meets the compliance and reliability standards that global aviation clients require.</p>
          <ul className="framework-list">
            <li>Define KPIs tied to real cargo operations outcomes</li>
            <li>Domain validation of all AI/ML model outputs before deployment</li>
            <li>Client engagement, requirements architecture, and QA</li>
            <li>Regulatory and operational compliance oversight</li>
          </ul>
        </div>
        <div className="framework-card innovators">
          <div className="framework-badge"><Zap size={15} /> Student Innovators</div>
          <h3>Engineering &amp; Execution</h3>
          <p>Top-tier students and early-career professionals from India's leading engineering institutions, specialising in Data Science, AI/ML, and full-stack software development. Rigorously selected, mentored by veterans, and brought in because they build what incumbents are still roadmapping.</p>
          <ul className="framework-list">
            <li>Predictive models: fuel burn, demand forecasting, delay risk scoring</li>
            <li>NLP pipelines for freight manifest processing and AWB classification</li>
            <li>Real-time control tower dashboards and terminal interfaces</li>
            <li>Data engineering: pipelines, data lakes, and clean cargo APIs</li>
          </ul>
        </div>
      </div>
      <div>
        <span className="section-eyebrow">What drives us</span>
        <div className="values-grid">
          {values.map((v, i) => (
            <div className="pillar-card" key={i}>
              <div className="pillar-icon">{v.icon}</div>
              <h3 className="pillar-title">{v.title}</h3>
              <p className="pillar-desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;