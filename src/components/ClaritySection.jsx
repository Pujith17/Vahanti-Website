import React from 'react';
import { useInView, useScrollProgress } from '../hooks/useScrollProgress';
import './ClaritySection.css';

const ClaritySection = () => {
  const { ref: sectionRef, progress } = useScrollProgress({ start: 0.95, end: 0.1 });
  const { ref: headRef, inView: headVisible } = useInView({ threshold: 0.2 });

  return (
    <section className="clarity-section" ref={sectionRef} style={{ '--sp': progress }}>
      <div className="container">
        <div
          ref={headRef}
          className={`clarity-story-head ${headVisible ? 'clarity-story-head--visible' : ''}`}
        >
          <span className="clarity-eyebrow">Why Vahanti</span>
          <h2 className="clarity-title">
            Operationally Grounded. <span className="clarity-title-muted">Architected on Leading-Edge Technology.</span>
          </h2>
          <p className="clarity-lead">
          Air cargo operations depend on accurate information, efficient workflows, and timely decisions to keep the global supply chain moving. As operations grow more complex, teams need complete operational visibility and software designed around real-world cargo processes, not generic systems. Vahanti develops intelligent aviation solutions that simplify operations, improve decision making, and deliver measurable operational and business outcomes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClaritySection;