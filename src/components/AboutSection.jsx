import React from 'react';
import { Users, BrainCircuit, ShieldCheck } from 'lucide-react';
import { useInView } from '../hooks/useScrollProgress';
import './AboutSection.css';

const values = [
  {
    icon: <Users size={22} strokeWidth={2} />,
    title: 'Operational grounding',
    desc: 'We build for live airline and cargo workflows, not abstract transformation decks.',
    num: '01',
  },
  {
    icon: <BrainCircuit size={22} strokeWidth={2} />,
    title: 'Practical intelligence',
    desc: 'We apply AI/ML, analytics, and software engineering only where they create measurable operational leverage.',
    num: '02',
  },
  {
    icon: <ShieldCheck size={22} strokeWidth={2} />,
    title: 'Aviation-grade reliability',
    desc: 'Every solution is shaped around reliability, edge cases, compliance expectations, and real operational pressure.',
    num: '03',
  },
];

function FlipCard({ value, delay }) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`about-flip-card ${inView ? 'about-flip-card--visible' : ''}`}
      style={{ '--fcd': `${delay}ms` }}
    >
      <div className="about-flip-inner">
        {/* Front */}
        <div className="about-flip-front">
          <span className="about-flip-num">{value.num}</span>
          <div className="about-flip-icon">{value.icon}</div>
          <h3 className="about-flip-title">{value.title}</h3>
        </div>
        {/* Back */}
        <div className="about-flip-back">
          <h3 className="about-flip-back-title">{value.title}</h3>
          <p className="about-flip-back-desc">{value.desc}</p>
        </div>
      </div>
    </div>
  );
}

const AboutSection = () => {
  const { ref: headRef, inView: headVisible } = useInView({ threshold: 0.2 });
  const { ref: teamRef, inView: teamVisible } = useInView({ threshold: 0.15 });
  const { ref: storyRef, inView: storyVisible } = useInView({ threshold: 0.2 });

  return (
    <section className="about-story section" id="about">
      <div className="container">

        {/* ── Editorial Header ── */}
        <div
          ref={headRef}
          className={`about-story-head ${headVisible ? 'about-story-head--visible' : ''}`}
        >
          <span className="about-eyebrow">Who we are</span>
          <h2 className="about-story-title">
            Built for the operators who
            <br />
            <span className="about-title-muted">need systems that don't fail under pressure.</span>
          </h2>
          <p className="about-story-lead">
            Air cargo terminals, airline teams, and logistics operators need systems that move physical freight and digital paperwork in lockstep.
            Vahanti is founded to bridge the gap between technology and real-world operations, delivering the intelligence, execution software, and automation that air cargo teams need to make decisions and move shipments to meet stringent deadlines.
          </p>
        </div>

        {/* ── Dual Column Narrative ── */}
        <div
          ref={storyRef}
          className={`about-narrative-grid ${storyVisible ? 'about-narrative-grid--visible' : ''}`}
        >
          <div className="about-narrative-block about-narrative-block--left">
            <h3>Why we exist</h3>
            <p>
              The air cargo industry operates under immense pressure, yet cargo teams are often left fighting legacy systems, fragmented spreadsheets, and manual coordination gaps. We exist to build modern software that handles the actual friction of terminal and warehouse operations. Whether it is tracking a shipment breakdown on the warehouse floor, automating complex billing, or auditing SLA bottlenecks in real-time, we create the software backbone that keeps cargo moving.
            </p>
          </div>
          <div className="about-narrative-block about-narrative-block--right">
            <h3>Why we are different</h3>
            <p>
            We combine deep aviation industry expertise with modern software engineering, data science, and artificial intelligence to build technology that solves real operational challenges. By bringing together industry experts and experienced technologists, we create practical and scalable solutions designed around how aviation businesses actually operate.
            </p>
          </div>
        </div>

        {/* ── Team Framework — dark section ── */}
        <div
          ref={teamRef}
          className={`about-team-section ${teamVisible ? 'about-team-section--visible' : ''}`}
        >
          <div className="about-team-inner">
            <span className="about-team-eyebrow">Our team model</span>
            <h3 className="about-team-title">Two forces. One outcome.</h3>

            <div className="about-team-cols">
              <div className="about-team-col about-team-col--veterans">
                <span className="about-team-col-badge">Industry Experts</span>
                <h4>Industry experts who provide the blueprint for modern solutions.</h4>
                <p>
                  Senior professionals with decades of experience across all major aspects of aviation cargo and the broader supply chain. We bring deep knowledge of the aviation industry, developing and delivering large cargo and supply chain solutions.
                </p>
                <ul>
                  <li>Define the real problem space.</li>
                  <li>Validate solutions against operational reality.</li>
                  <li>Ensure reliability and compliance expectations are met.</li>
                </ul>
              </div>

              <div className="about-team-col about-team-col--builders">
                <span className="about-team-col-badge">The Builders</span>
                <h4>Modern engineers who ship faster than businesses can roadmap.</h4>
                <p>
                  A multidisciplinary team of aviation professionals, data scientists, software engineers, and researchers delivering quality solutions shaped by real operational context.
                </p>
                <ul>
                  <li>Use ML, analytics, and software tooling.</li>
                  <li>Prototype and iterate rapidly.</li>
                  <li>Build around measurable business outcomes.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export const PrinciplesSection = () => {
  return (
    <section className="about-story section" id="principles">
      <div className="container">
        {/* ── Values — 3D flip cards ── */}
        <div className="about-values-head">
          <span className="about-eyebrow">Our principles</span>
          <h3 className="about-values-title"> What defines our work.</h3>
        </div>
        <div className="about-values-grid">
          {values.map((v, i) => (
            <FlipCard key={i} value={v} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;