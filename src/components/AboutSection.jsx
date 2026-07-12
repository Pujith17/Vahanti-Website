import React, { useState, useEffect } from 'react';
import { Users, BrainCircuit, ShieldCheck } from 'lucide-react';
import { useInView } from '../hooks/useScrollProgress';
import { useIsMobile } from '../hooks/useIsMobile';
import './AboutSection.css';

// ─────────────────────────────────────────────────────────────────────────────
// Mobile copy constants
// Desktop copy is the canonical source of truth.
// Mobile versions preserve identical meaning at 35–50% fewer words.
// ─────────────────────────────────────────────────────────────────────────────

const WHO_WE_ARE_COPY = {
  desktop:
    'Air cargo terminals, airline teams, and logistics operators need systems that move physical freight and digital paperwork in lockstep. Vahanti is founded to bridge the gap between technology and real-world operations, delivering the intelligence, execution software, and automation that air cargo teams need to make decisions and move shipments to meet stringent deadlines.',
  mobile:
    'Vahanti bridges the gap between technology and real-world air cargo operations, delivering the intelligence, software, and automation teams need to make decisions and move shipments on time.',
};

const WHY_WE_EXIST_COPY = {
  desktop:
    'The air cargo industry operates under immense pressure, yet cargo teams are often left fighting legacy systems, fragmented spreadsheets, and manual coordination gaps. We exist to build modern software that handles the actual friction of terminal and warehouse operations. Whether it is tracking a shipment breakdown on the warehouse floor, automating complex billing, or auditing SLA bottlenecks in real-time, we create the software backbone that keeps cargo moving.',
  mobile:
    'Cargo teams still fight legacy systems, fragmented spreadsheets, and manual gaps. We build modern software that handles the real friction of terminal and warehouse operations, creating the backbone that keeps cargo moving.',
};

const WHY_DIFFERENT_COPY = {
  desktop:
    'We combine deep aviation industry expertise with modern software engineering, data science, and artificial intelligence to build technology that solves real operational challenges. By bringing together industry experts and experienced technologists, we create practical and scalable solutions designed around how aviation businesses actually operate.',
  mobile:
    'We combine deep aviation expertise with software engineering, data science, and AI to build practical, scalable solutions shaped by how aviation businesses actually operate.',
};

const TEAM_EXPERTS_COPY = {
  desktop:
    'Senior professionals with decades of experience across all major aspects of aviation cargo and the broader supply chain. We bring deep knowledge of the aviation industry, developing and delivering large cargo and supply chain solutions.',
  mobile:
    'Aviation cargo professionals with decades of operational experience across the supply chain.',
};

const TEAM_BUILDERS_COPY = {
  desktop:
    'A multidisciplinary team of aviation professionals, data scientists, software engineers, and researchers delivering quality solutions shaped by real operational context.',
  mobile:
    'Engineers, data scientists, and researchers building solutions grounded in real operational workflows.',
};

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

function FlipCard({ value, delay, isFlipped, onFlip }) {
  const { ref, inView } = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`about-flip-card ${inView ? 'about-flip-card--visible' : ''}`}
      style={{ '--fcd': `${delay}ms` }}
      onClick={onFlip}
    >
      <div className={`about-flip-inner ${isFlipped ? 'is-flipped' : ''}`}>
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
  const isMobile = useIsMobile();

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
            Built for the operators
            <br />
            <span className="about-title-muted">powering modern air cargo.</span>
          </h2>
          <p className="about-story-lead">
            {isMobile ? WHO_WE_ARE_COPY.mobile : WHO_WE_ARE_COPY.desktop}
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
              {isMobile ? WHY_WE_EXIST_COPY.mobile : WHY_WE_EXIST_COPY.desktop}
            </p>
          </div>
          <div className="about-narrative-block about-narrative-block--right">
            <h3>Why we are different</h3>
            <p>
              {isMobile ? WHY_DIFFERENT_COPY.mobile : WHY_DIFFERENT_COPY.desktop}
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
                  {isMobile ? TEAM_EXPERTS_COPY.mobile : TEAM_EXPERTS_COPY.desktop}
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
                  {isMobile ? TEAM_BUILDERS_COPY.mobile : TEAM_BUILDERS_COPY.desktop}
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
  const [activeFlippedIndex, setActiveFlippedIndex] = useState(null);

  useEffect(() => {
    if (activeFlippedIndex === null) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.about-flip-card')) {
        setActiveFlippedIndex(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [activeFlippedIndex]);

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
            <FlipCard
              key={i}
              value={v}
              delay={i * 120}
              isFlipped={activeFlippedIndex === i}
              onFlip={(e) => {
                e.stopPropagation();
                setActiveFlippedIndex(activeFlippedIndex === i ? null : i);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;