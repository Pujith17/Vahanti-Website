import React from 'react';
import { Users, BrainCircuit, ShieldCheck } from 'lucide-react';
import './AboutSection.css';

const values = [
  {
    icon: <Users size={22} strokeWidth={2} />,
    title: 'Operational grounding',
    desc: 'We build for live airline and cargo workflows, not abstract transformation decks.',
  },
  {
    icon: <BrainCircuit size={22} strokeWidth={2} />,
    title: 'Modern technical depth',
    desc: 'AI/ML, analytics, and software engineering applied where they create measurable operational leverage.',
  },
  {
    icon: <ShieldCheck size={22} strokeWidth={2} />,
    title: 'Aviation-grade discipline',
    desc: 'Solutions are shaped around reliability, edge cases, compliance expectations, and real operational pressure.',
  },
];

const AboutSection = () => (
  <section className="about-section section" id="about">
    <div className="container">
      <div className="about-header section-heading">
        <span className="section-tag">Who we are</span>
        <h2>
          Built for air cargo operators who need systems that work under pressure.
        </h2>
        <p>
          Air cargo operations generate vast amounts of operational data every day. Yet much of
          this information remains underutilized across airlines and terminals. Vahanti Technologies
          was founded to bridge this gap by transforming operational data into actionable intelligence
          that improves efficiency, visibility, and operational performance.
        </p>
      </div>



      <div className="about-narrative">
        <div className="narrative-block">
          <h3 className="narrative-title">Why we exist</h3>
          <p>
            The air cargo industry generates enormous volumes of operational data every day,
            but much of it remains scattered across disconnected systems, spreadsheets, and
            manual workflows. Valuable insights are often lost in the process. We exist to
            unify this fragmented data landscape and turn operational information into
            actionable intelligence that drives efficiency, visibility, and better business
            outcomes.
          </p>
        </div>

        <div className="narrative-block">
          <h3 className="narrative-title">Why we are different</h3>
          <p>
            We combine aviation domain expertise with modern AI/ML and software engineering.
            Industry veterans define the problem, while experienced builders deliver solutions
            designed for real operational environments—not generic software assumptions.
          </p>
        </div>
      </div>

      <div className="team-framework">
        <div className="framework-card veterans">
          <span className="framework-badge">The veterans</span>
          <h3>Industry operators who define the guardrails.</h3>
          <p>
            Senior professionals with direct experience in airline operations, terminal workflows,
            cargo revenue management, and operational decision-making.
          </p>
          <ul className="framework-list">
            <li>Define the real problem space.</li>
            <li>Validate model outputs against operational reality.</li>
            <li>Ensure reliability and compliance expectations are met.</li>
          </ul>
        </div>

        <div className="framework-card innovators">
          <span className="framework-badge">The builders</span>
          <h3>Modern engineers who ship faster than incumbents can roadmap.</h3>
          <p>
            A multidisciplinary team of aviation professionals, data scientists, software engineers,
            and researchers — selected for technical quality and shaped by real operational context.
          </p>
          <ul className="framework-list">
            <li>Use modern ML, analytics, and software tooling.</li>
            <li>Prototype and iterate quickly.</li>
            <li>Build around measurable aviation outcomes.</li>
          </ul>
        </div>
      </div>

      <div className="values-grid">
        {values.map((value) => (
          <article key={value.title} className="pillar-card">
            <div className="pillar-icon">{value.icon}</div>
            <h3 className="pillar-title">{value.title}</h3>
            <p className="pillar-desc">{value.desc}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;